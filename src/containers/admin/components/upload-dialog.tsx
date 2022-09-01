/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import shallow from 'zustand/shallow';
import LyricsForm from './lyrics-form';
import TabsForm from './tabs-form';
import ImageForm from './image-form';
import EventForm from './event-form';
import RecordingsForm from './recordings-form';
import { useStore } from '../../../store/local';
import {
  useUploadRecording,
  useUploadLyrics,
  useUploadTab,
  useUploadImage,
  useUploadEvent,
} from '../../../store/server';

const FormDialog = () => {
  const location = useLocation();
  const { routes, uploadDialogIsOpen, closeUploadDialog } = useStore(
    state => ({
      routes: state.routes,
      uploadDialogIsOpen: state.uploadDialogIsOpen,
      closeUploadDialog: state.closeUploadDialog,
    }),
    shallow,
  );

  const [type, setType] = useState(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    return defaultType?.name ?? null;
  });

  useEffect(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    setType(defaultType?.name ?? null);
  }, [location]);

  const [submitData, setSubmitData] = useState<Record<string, string | number>>({});

  const { mutate: uploadRecording, isLoading: recordingIsUploading } = useUploadRecording();
  const { mutate: uploadLyrics, isLoading: lyricsIsUploading } = useUploadLyrics();
  const { mutate: uploadTab, isLoading: tabIsUploading } = useUploadTab();
  const { mutate: uploadImage, isLoading: imageIsUploading } = useUploadImage();
  const { mutate: uploadEvent, isLoading: eventIsUploading } = useUploadEvent();

  const sendData = () => {
    switch (type) {
      case 'Lyrics': {
        uploadLyrics(submitData);
        break;
      }
      case 'Recordings': {
        uploadRecording(submitData);
        break;
      }
      case 'Tabs': {
        uploadTab(submitData);
        break;
      }
      case 'Images': {
        uploadImage(submitData);
        break;
      }
      case 'Events': {
        uploadEvent(submitData);
        break;
      }
    }

    closeUploadDialog();
  };

  return (
    <Dialog open={uploadDialogIsOpen} onClose={closeUploadDialog}>
      <DialogTitle>
        Upload {type.split('').reverse().join('').replace('s', '').split('').reverse().join('')}
      </DialogTitle>
      <DialogContent
        sx={{
          minWidth: '500px',
        }}
      >
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { mt: 1, width: '100%' },
          }}
          noValidate={true}
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-select-currency"
              select={true}
              label="Select"
              value={type}
              onChange={event => setType(event.target.value)}
              variant="standard"
              margin="dense"
              required={true}
            >
              {Object.values(routes).map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            {type === 'Lyrics' && <LyricsForm handleSubmitData={setSubmitData} />}
            {type === 'Tabs' && <TabsForm handleSubmitData={setSubmitData} />}
            {type === 'Recordings' && <RecordingsForm handleSubmitData={setSubmitData} />}
            {type === 'Images' && <ImageForm handleSubmitData={setSubmitData} />}
            {type === 'Events' && <EventForm handleSubmitData={setSubmitData} />}
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeUploadDialog}>Cancel</Button>
        <LoadingButton
          onClick={sendData}
          disabled={!Object.keys(submitData).length}
          loading={recordingIsUploading || lyricsIsUploading || tabIsUploading || imageIsUploading || eventIsUploading}
          loadingIndicator="Uploading..."
        >
          Upload
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
