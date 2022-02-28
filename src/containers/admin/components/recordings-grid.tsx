import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ReactAudioPlayer from 'react-audio-player';
import AdminApi from '../../../services/admin-api';
import PanelGrid from './panel-grid';
import downloadFile from '../../../services/download-file';
import EllipsisCell from './ellipsis-cell';

const AdminApiClient = AdminApi.getInstance();

interface FooterProps {
  selected: Recording;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Footer: React.JSXElementConstructor<any> = (props: FooterProps) => {
  const [snackOpen, setSnackOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          }}
        />

        <IconButton
          disabled={!props.selected}
          color="primary"
          onClick={() =>
            downloadFile(props.selected.File.url, props.selected.File.name)
          }
        >
          <Tooltip title="Download">
            <DownloadIcon />
          </Tooltip>
        </IconButton>

        <IconButton
          disabled={!props.selected}
          color="primary"
          onClick={() => {
            navigator.clipboard.writeText(props.selected.File.url);
            handleClick();
          }}
        >
          <Tooltip title="Share">
            <ShareIcon />
          </Tooltip>
        </IconButton>
        <IconButton
          disabled={!props.selected}
          color="primary"
          onClick={() => {
            navigate(
              `${location.pathname}?action=delete&id=${props.selected.id}`,
            );
          }}
        >
          <Tooltip title="Delete">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      </Stack>
    </>
  );
};

const columns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', width: 200, renderCell: EllipsisCell },
  {
    field: 'recordedAt',
    headerName: 'Recorded At',
    width: 150,
    renderCell: EllipsisCell,
  },
  {
    field: 'File.mime',
    headerName: 'File Type',
    width: 150,
    renderCell: EllipsisCell,
  },
  {
    field: 'File.provider',
    headerName: 'File Provider',
    width: 150,
    renderCell: EllipsisCell,
  },
  {
    field: 'File.size',
    headerName: 'File Size',
    width: 150,
    renderCell: (params: { value: string }) => params.value + ' KB',
  },
];

const RecordingGrid: React.FC = () => (
  <PanelGrid
    columns={columns}
    footerComponent={Footer}
    getData={AdminApiClient.getRecordings}
  />
);

export default RecordingGrid;
