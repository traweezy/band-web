import type { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import ReactAudioPlayer from 'react-audio-player';
import { GridFooterContainer, GridFooter } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import PreviewIcon from '@mui/icons-material/Preview';
import downloadFile from '../../../services/download-file';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { toast } from 'react-toastify';
import ReactPlayer from 'react-player';
import { useStore } from '../../../store/local';

import EllipsisCell from './ellipsis-cell';

export const recordingsColumns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', minWidth: 200, flex: 1, renderCell: EllipsisCell },
  {
    field: 'recordedAt',
    headerName: 'Recorded At',
    minWidth: 150,
    flex: 1,
    renderCell: EllipsisCell,
  },
  {
    field: 'File.ext',
    headerName: 'File Type',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'File.size',
    headerName: 'File Size',
    minWidth: 150,
    flex: 1,
    renderCell: (params: GridRenderCellParams) => `${params.value} KB`,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <>
          <IconButton color="primary" onClick={() => downloadFile(row['File.url'], row.Title)}>
            <Tooltip title="Download">
              <DownloadIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(row['File.url']);
              toast.success('Copied url to clipboard');
            }}
          >
            <Tooltip title="Share">
              <ShareIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            disabled={!row}
            color="primary"
            onClick={() => {
              const { openDeleteDialog } = useStore.getState();
              openDeleteDialog(row.id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      );
    },
  },
];

export const lyricsColumns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', minWidth: 200, flex: 1, renderCell: EllipsisCell },
  {
    field: 'Author',
    headerName: 'Author',
    minWidth: 150,
    flex: 1,
    renderCell: EllipsisCell,
  },
  {
    field: 'Version',
    headerName: 'Version',
    minWidth: 150,
    flex: 1,
    renderCell: EllipsisCell,
  },
  {
    field: 'File.ext',
    headerName: 'File Type',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <>
          <IconButton
            color="primary"
            disabled={!row?.['File.url']?.includes('.pdf')}
            onClick={() => window.open(row['File.url'], '_blank')}
          >
            <Tooltip title="View">
              <PreviewIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="primary" onClick={() => downloadFile(row['File.url'], row.Title)}>
            <Tooltip title="Download">
              <DownloadIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(row['File.url']);
              toast.success('Copied url to clipboard');
            }}
          >
            <Tooltip title="Share">
              <ShareIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            disabled={!row}
            color="primary"
            onClick={() => {
              const { openDeleteDialog } = useStore.getState();
              openDeleteDialog(row.id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      );
    },
  },
];

export const tabsColumns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', minWidth: 200, flex: 1, renderCell: EllipsisCell },
  {
    field: 'Author',
    headerName: 'Author',
    minWidth: 150,
    flex: 1,
    renderCell: EllipsisCell,
  },
  {
    field: 'Version',
    headerName: 'Version',
    minWidth: 150,
    flex: 1,
    renderCell: EllipsisCell,
  },
  {
    field: 'File.ext',
    headerName: 'File Type',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <>
          <IconButton
            color="primary"
            disabled={!row?.['File.url']?.includes('.pdf')}
            onClick={() => window.open(row['File.url'], '_blank')}
          >
            <Tooltip title="View">
              <PreviewIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="primary" onClick={() => downloadFile(row['File.url'], `${row.Title}${row['File.ext']}`)}>
            <Tooltip title="Download">
              <DownloadIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(row['File.url']);
              toast.success('Copied url to clipboard');
            }}
          >
            <Tooltip title="Share">
              <ShareIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            disabled={!row}
            color="primary"
            onClick={() => {
              const { openDeleteDialog } = useStore.getState();
              openDeleteDialog(row.id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      );
    },
  },
];

export const imagesColumns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', minWidth: 200, flex: 1, renderCell: EllipsisCell },
  {
    field: 'File.ext',
    headerName: 'File Type',
    minWidth: 150,
    flex: 1,
  },
  {
    field: 'Actions',
    headerName: 'Actions',
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              const { openImagePreview } = useStore.getState();
              openImagePreview(row['File.url']);
            }}
          >
            <Tooltip title="View">
              <PreviewIcon />
            </Tooltip>
          </IconButton>
          <IconButton color="primary" onClick={() => downloadFile(row['File.url'], `${row.Title}${row['File.ext']}`)}>
            <Tooltip title="Download">
              <DownloadIcon />
            </Tooltip>
          </IconButton>

          <IconButton
            color="primary"
            onClick={() => {
              navigator.clipboard.writeText(row['File.url']);
              toast.success('Copied url to clipboard');
            }}
          >
            <Tooltip title="Share">
              <ShareIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            disabled={!row}
            color="primary"
            onClick={() => {
              const { openDeleteDialog } = useStore.getState();
              openDeleteDialog(row.id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      );
    },
  },
];

export const eventsColumns: GridColDef[] = [
  { field: 'Title', headerName: 'Title', flex: 1, renderCell: EllipsisCell },
  { field: 'Date', headerName: 'Date', flex: 1, renderCell: EllipsisCell },
  { field: 'LocationName', headerName: 'Location Name', flex: 1, renderCell: EllipsisCell },
  { field: 'LocationUrl', headerName: 'Location URL', flex: 1, renderCell: EllipsisCell },
  { field: 'TicketsUrl', headerName: 'Tickets URL', flex: 1, renderCell: EllipsisCell },
  // { field: 'Title', headerName: 'Title', flex: 1, renderCell: EllipsisCell },
  // { field: 'Title', headerName: 'Title', minWidth: 200, flex: 1, renderCell: EllipsisCell },
  {
    field: 'Actions',
    headerName: 'Actions',
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }: GridRenderCellParams) => {
      return (
        <>
          <IconButton
            disabled={!row}
            color="primary"
            onClick={() => {
              const { openDeleteDialog } = useStore.getState();
              openDeleteDialog(row.id);
            }}
          >
            <Tooltip title="Delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      );
    },
  },
];

export const getFooter = (type: string, isMobile: boolean, selected: Recording) => {
  if (!isMobile && type !== 'Recordings') {
    return (
      <GridFooterContainer>
        <GridFooter
          sx={{
            minWidth: '100%',
            border: 'none',
          }}
        />
      </GridFooterContainer>
    );
  } else if (!isMobile && type === 'Recordings') {
    return (
      <GridFooterContainer>
        <ReactAudioPlayer
          style={{
            minWidth: '100%',
          }}
          src={selected?.File?.url ?? ''}
          controls={true}
        />
        <GridFooter
          sx={{
            minWidth: '100%',
            border: 'none',
          }}
        />
      </GridFooterContainer>
    );
  }
};
