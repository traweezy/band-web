/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import InputLabel from '@mui/material/InputLabel';
import { FilePond } from 'react-filepond';
import dayjs from 'dayjs';

interface TabsFormProps {
  handleSubmitData: (data: { [key: string]: string | number }) => void;
}
const TabsForm: React.FC<TabsFormProps> = ({ handleSubmitData }) => {
  const [title, setTitle] = useState('');
  const [fileId, setFileId] = useState<number | null>(null);
  const [recordedAt, setRecordedAt] = useState<string>('');
  const [files, setFiles] = useState<any[]>([]);
  const pondEl = useRef<FilePond | null>(null);

  useEffect(() => {
    if (title.length && fileId !== null) {
      handleSubmitData({
        Title: title,
        recordedAt: dayjs(recordedAt).toISOString(),
        File: fileId,
      });
    } else {
      handleSubmitData({});
    }
  }, [title, fileId]);

  return (
    <>
      <TextField
        autoFocus={true}
        margin="dense"
        id="title"
        label="Title"
        type="text"
        fullWidth={true}
        value={title}
        onChange={event => setTitle(event.target.value)}
        variant="standard"
        required={true}
      />
      <DesktopDatePicker
        label="Recorded at"
        inputFormat="MM/DD/YYYY"
        value={recordedAt}
        onChange={(value: any) => setRecordedAt(value)}
        renderInput={(params: any) => (
          <TextField {...params} variant="standard" required={true} autoFocus={false} margin="dense" fullWidth={true} />
        )}
      />
      <div style={{ marginTop: '1em' }}>
        <InputLabel required={true}>File</InputLabel>
        <FilePond
          ref={pondEl}
          files={files}
          allowMultiple={false}
          maxFiles={1}
          instantUpload={true}
          server={{
            process: {
              url: 'https://envoys-cms.herokuapp.com/upload',
              headers: {
                authorization: `Bearer ${window.localStorage.jwt_token}`,
              },
              onload: res => {
                const [file] = JSON.parse(res);
                setFileId(file.id);
                return res;
              },
            },
          }}
          name="files"
          onupdatefiles={(fileItems: any[]) => {
            setFiles(fileItems.map(fileItem => fileItem.file));
          }}
        />
      </div>
    </>
  );
};

export default TabsForm;