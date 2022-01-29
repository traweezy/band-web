import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import DownloadIcon from '@mui/icons-material/Download';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import flatten from 'flat';
import AdminApi from '../../../services/admin-api';
import ReactAudioPlayer from 'react-audio-player';
const AdminApiClient = AdminApi.getInstance();

export function CustomFooterStatusComponent(props: {
  selectedRecording: Recording;
}) {
  return (
    <>
      <Stack
        direction="row"
        spacing={2}
        sx={{ p: 1, float: 'right', width: '100%' }}
      >
        <ReactAudioPlayer
          src={props.selectedRecording?.File?.url ?? ''}
          controls
          style={{
            width: '84%',
            background: '#C60C31',
          }}
        />

        <Button
          disabled={!props.selectedRecording}
          variant="contained"
          endIcon={<DownloadIcon />}
          onClick={() => {
            const a = document.createElement('a');
            a.href = props.selectedRecording.File.url;
            a.setAttribute('download', props.selectedRecording.File.url);
            a.click();
          }}
        >
          Download
        </Button>
      </Stack>
    </>
  );
}

const enum RecordingGridState {
  INITIAL,
  READY,
  PENDING,
  ERROR,
}

const columns = [
  { field: 'Title', headerName: 'Title', width: 200 },
  { field: 'recordedAt', headerName: 'Recorded At', width: 150 },
  { field: 'File.mime', headerName: 'File Type', width: 150 },
  { field: 'File.provider', headerName: 'File Provider', width: 150 },
  {
    field: 'File.size',
    headerName: 'File Size',
    width: 150,
    renderCell: (params: any) => params.value + ' KB',
  },
];

const RecordingGrid = () => {
  const [data, setData] = useState<Recording[]>([]);
  const [recordingGridState, setRecordingGridState] =
    useState<RecordingGridState>(RecordingGridState.INITIAL);

  useEffect(() => {
    if (recordingGridState === RecordingGridState.INITIAL) {
      try {
        setRecordingGridState(RecordingGridState.PENDING);
        AdminApiClient.getRecordings().then(res => {
          setData(res);
          setRecordingGridState(RecordingGridState.READY);
        });
      } catch (error) {
        setRecordingGridState(RecordingGridState.ERROR);
      }
    }
  }, [recordingGridState]);

  const [selectedRecording, setSelectedRecording] = useState<Recording | null>(
    null,
  );

  return (
    <>
      <DataGrid
        loading={
          recordingGridState === RecordingGridState.PENDING ||
          recordingGridState === RecordingGridState.INITIAL
        }
        rows={data.map(flatten)}
        columns={columns}
        onSelectionModelChange={(newSelectionModel: number[]) => {
          const [index] = newSelectionModel;
          const foundRecording = data.find(({ id }) => id === index);
          setSelectedRecording(foundRecording ?? null);
        }}
        components={{
          Footer: CustomFooterStatusComponent,
        }}
        componentsProps={{
          footer: { selectedRecording },
        }}
      />
    </>
  );
};

export default RecordingGrid;
