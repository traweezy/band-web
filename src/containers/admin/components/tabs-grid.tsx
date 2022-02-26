import { useState } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import ShareIcon from '@mui/icons-material/Share';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
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
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <IconButton
          disabled={!props.selected}
          color="primary"
          onClick={() =>
            downloadFile(props.selected.File.url, props.selected.File.name)
          }
        >
          <DownloadIcon />
        </IconButton>
        <IconButton
          disabled={
            !props.selected || !props.selected.File.url.includes('.pdf')
          }
          color="primary"
          onClick={() => window.open(props.selected.File.url, '_blank')}
        >
          <PreviewIcon />
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
  { field: 'Title', headerName: 'Title', width: 200, renderCell: EllipsisCell },
  {
    field: 'Instrument',
    headerName: 'Instrument',
    width: 150,
    renderCell: EllipsisCell,
  },
  {
    field: 'Author',
    headerName: 'Author',
    width: 150,
    renderCell: EllipsisCell,
  },
  {
    field: 'Version',
    headerName: 'Version',
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

interface TabsGridProps {
  open?: boolean;
}

const TabsGrid: React.FC<TabsGridProps> = ({ open }) => (
  <PanelGrid
    columns={columns}
    footerComponent={Footer}
    getData={AdminApiClient.getTabs}
    open={open}
  />
);

export default TabsGrid;
