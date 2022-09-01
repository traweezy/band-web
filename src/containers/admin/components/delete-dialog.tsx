/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import shallow from 'zustand/shallow';
import { useStore } from '../../../store/local';
import {
  useDeleteRecording,
  useDeleteTab,
  useDeleteLyrics,
  useDeleteImage,
  useDeleteEvent,
} from '../../../store/server';

const DeleteDialog = () => {
  const { routes, deleteDialogIsOpen, idToDelete, closeDeleteDialog } = useStore(
    state => ({
      routes: state.routes,
      deleteDialogIsOpen: state.deleteDialogIsOpen,
      idToDelete: state.idToDelete,
      closeDeleteDialog: state.closeDeleteDialog,
    }),
    shallow,
  );
  const location = useLocation();

  const [type, setType] = useState(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    return defaultType?.name ?? null;
  });

  useEffect(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    setType(defaultType?.name ?? null);
  }, [location]);

  const { mutate: deleteRecording, isLoading: recordingIsDeleting } = useDeleteRecording();
  const { mutate: deleteTab, isLoading: tabIsDeleting } = useDeleteTab();
  const { mutate: deleteLyrics, isLoading: lyricsIsDeleting } = useDeleteLyrics();
  const { mutate: deleteImage, isLoading: imageIsDeleting } = useDeleteImage();
  const { mutate: deleteEvent, isLoading: eventIsDeleting } = useDeleteEvent();

  const deleteData = async () => {
    if (idToDelete) {
      switch (type) {
        case 'Lyrics': {
          deleteLyrics(idToDelete);
          break;
        }
        case 'Recordings': {
          deleteRecording(idToDelete);
          break;
        }
        case 'Tabs': {
          deleteTab(idToDelete);
          break;
        }
        case 'Images': {
          deleteImage(idToDelete);
          break;
        }
        case 'Events': {
          deleteEvent(idToDelete);
          break;
        }
      }
    }
    closeDeleteDialog();
  };

  return (
    <Dialog open={deleteDialogIsOpen} onClose={closeDeleteDialog}>
      <DialogTitle>
        Delete {type.split('').reverse().join('').replace('s', '').split('').reverse().join('')}
      </DialogTitle>
      <DialogContent
        sx={{
          minWidth: '500px',
        }}
      >
        <DialogContentText>Are you sure you want to delete this item?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteDialog}>Cancel</Button>
        <LoadingButton
          onClick={deleteData}
          loading={recordingIsDeleting || tabIsDeleting || lyricsIsDeleting || imageIsDeleting || eventIsDeleting}
          loadingIndicator="Deleting..."
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
