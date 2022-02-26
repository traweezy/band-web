/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-toastify';
import { sentenceCase } from 'change-case';
import AdminApi from '../../../services/admin-api';
import type { SideNavigationRoutes, SideNavigationRoutePath } from '../index';
import LyricsForm from './lyrics-form';
import TabsForm from './tabs-form';
import RecordingsForm from './recordings-form';

const AdminApiClient = AdminApi.getInstance();

interface FormDialogProps {
  open?: boolean;
  handleUploadDialogeIsOpen: (isOpen: boolean) => void;
  routes: SideNavigationRoutes;
}

const FormDialog: React.FC<FormDialogProps> = ({
  open,
  handleUploadDialogeIsOpen,
  routes,
}) => {
  const location = useLocation();

  const handleClose = () => {
    handleUploadDialogeIsOpen(false);
  };

  const [type, setType] = useState(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    return defaultType?.name ?? null;
  });

  useEffect(() => {
    const defaultType = routes[location.pathname as SideNavigationRoutePath];
    setType(defaultType?.name ?? null);
  }, [location.pathname]);

  const [submitData, setSubmitData] = useState<{
    [key: string]: string | number;
  }>({});

  const sendData = async () => {
    let apiCall: any;

    switch (type) {
      case 'Lyrics': {
        apiCall = AdminApiClient.postLyrics;
        break;
      }
      case 'Recordings': {
        apiCall = AdminApiClient.postRecording;
        break;
      }
      case 'Tabs': {
        apiCall = AdminApiClient.postTab;
        break;
      }

      default: {
        apiCall = () => null;
      }
    }
    await toast.promise(
      apiCall(submitData),
      {
        pending: `Uploading ${sentenceCase(type)}...`,
        success: `Finished uploading ${sentenceCase(type)} 👌`,
        error: 'Fuck something happened 🤯',
      },
      { autoClose: 3000 },
    );
    handleClose();
  };

  return (
    <Dialog open={open ?? false} onClose={handleClose}>
      <DialogTitle>Upload {type}</DialogTitle>
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
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={type}
              onChange={event => setType(event.target.value)}
              variant="standard"
              margin="dense"
              required
            >
              {Object.values(routes).map(option => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            {type === 'Lyrics' && (
              <LyricsForm handleSubmitData={setSubmitData} />
            )}
            {type === 'Tabs' && <TabsForm handleSubmitData={setSubmitData} />}
            {type === 'Recordings' && (
              <RecordingsForm handleSubmitData={setSubmitData} />
            )}
          </div>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={sendData} disabled={!Object.keys(submitData).length}>
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
