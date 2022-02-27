/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { toast } from 'react-toastify';
import { sentenceCase } from 'change-case';
import AdminApi from '../../../services/admin-api';
import type { SideNavigationRoutes, SideNavigationRoutePath } from '../index';

const AdminApiClient = AdminApi.getInstance();

interface FormDialogProps {
  routes: SideNavigationRoutes;
}

const FormDialog: React.FC<FormDialogProps> = ({ routes }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location.search.includes('action=delete')) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [location]);

  const handleClose = () => {
    navigate(location.pathname);
  };

  const [type] = useState(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    return defaultType?.name ?? null;
  });

  const deleteData = async () => {
    let apiCall: any;
    const id = location.search.replace('?action=delete&id=', '');

    switch (type) {
      case 'Lyrics': {
        apiCall = AdminApiClient.deleteLyrics;
        break;
      }
      case 'Recordings': {
        apiCall = AdminApiClient.deleteRecording;
        break;
      }
      case 'Tabs': {
        apiCall = AdminApiClient.deleteTab;
        break;
      }

      default: {
        apiCall = () => null;
      }
    }
    await toast.promise(
      apiCall(id),
      {
        pending: `Deleting ${sentenceCase(type)}...`,
        success: `Finished deleting ${sentenceCase(type)} 👌`,
        error: 'Fuck something happened 🤯',
      },
      { autoClose: 3000 },
    );
    handleClose();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Delete {type}</DialogTitle>
      <DialogContent
        sx={{
          minWidth: '500px',
        }}
      >
        <DialogContentText>
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteData}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
