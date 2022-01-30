import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ReactAudioPlayer from 'react-audio-player';
import AdminApi from '../../../services/admin-api';
import PanelGrid from './panel-grid';

const AdminApiClient = AdminApi.getInstance();

interface FooterProps {
  selected: Recording;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Footer: React.JSXElementConstructor<any> = (props: FooterProps) => {
  const [snackOpen, setSnackOpen] = useState(false);

  const handleClick = () => {
    setSnackOpen(true);
  };

  const handleClose = () => {
    setSnackOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleClose}
        message={`${props.selected?.File?.url} copied to clipboard`}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          p: 1,
          float: 'right',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <ReactAudioPlayer
          src={props.selected?.File?.url ?? ''}
          controls
          style={{
            width: '100%',
            background: '#C60C31',
            borderRadius: '4px',
          }}
        />

        <IconButton
          disabled={!props.selected}
          color="primary"
          onClick={() => {
            const a = document.createElement('a');
            a.href = props.selected.File.url;
            a.target = '_blank';
            a.setAttribute('download', props.selected.Title);
            a.click();
            document.body.removeChild(a);
          }}
        >
          <DownloadIcon />
        </IconButton>

        <IconButton
          disabled={!props.selected}
          color="primary"
          onClick={() => {
            navigator.clipboard.writeText(props.selected.File.url);
            handleClick();
          }}
        >
          <ShareIcon />
        </IconButton>
      </Stack>
    </>
  );
};

const columns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', width: 200 },
  { field: 'recordedAt', headerName: 'Recorded At', width: 150 },
  { field: 'File.mime', headerName: 'File Type', width: 150 },
  { field: 'File.provider', headerName: 'File Provider', width: 150 },
  {
    field: 'File.size',
    headerName: 'File Size',
    width: 150,
    renderCell: (params: { value: string }) => params.value + ' KB',
  },
];

const RecordingGrid = () => (
  <PanelGrid
    columns={columns}
    footerComponent={Footer}
    getData={AdminApiClient.getRecordings}
  />
);

export default RecordingGrid;
