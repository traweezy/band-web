/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FilePond } from 'react-filepond';

interface TabsFormProps {
  handleSubmitData: (data: { [key: string]: string | number }) => void;
}
const TabsForm: React.FC<TabsFormProps> = ({ handleSubmitData }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [instrument, setInstrument] = useState('');
  const [version, setVersion] = useState<number>(0);
  const [fileId, setFileId] = useState<number | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const pondEl = useRef<FilePond | null>(null);

  useEffect(() => {
    if (title.length && author.length && version !== null && fileId !== null) {
      handleSubmitData({
        Title: title,
        Author: author,
        Instrument: instrument,
        Version: version,
        File: fileId,
      });
    } else {
      handleSubmitData({});
    }
  }, [title, author, version, fileId]);
  return (
    <>
      <TextField
        autoFocus
        margin="dense"
        id="title"
        label="Title"
        type="text"
        fullWidth
        value={title}
        onChange={event => setTitle(event.target.value)}
        variant="standard"
        required
      />
      <TextField
        id="select-author"
        margin="dense"
        select
        label="Instrument"
        type="text"
        value={instrument}
        onChange={event => setInstrument(event.target.value)}
        variant="standard"
        required
      >
        <MenuItem value="Lead">Lead</MenuItem>
        <MenuItem value="Rhythm">Rhythm</MenuItem>
        <MenuItem value="Bass">Bass</MenuItem>
        <MenuItem value="Drums">Drums</MenuItem>
      </TextField>
      <TextField
        id="select-author"
        margin="dense"
        select
        label="Author"
        type="text"
        value={author}
        onChange={event => setAuthor(event.target.value)}
        variant="standard"
        required
      >
        <MenuItem value="Kyle">Kyle</MenuItem>
        <MenuItem value="Tyler">Tyler</MenuItem>
        <MenuItem value="Jordan">Jordan</MenuItem>
        <MenuItem value="Matt">Matt</MenuItem>
      </TextField>
      <TextField
        id="version"
        margin="dense"
        label="Version"
        type="number"
        value={version}
        onChange={event => setVersion(Number(event.target.value))}
        variant="standard"
        required
      />
      <div style={{ marginTop: '1em' }}>
        <InputLabel required>File</InputLabel>
        <FilePond
          ref={pondEl}
          files={files}
          allowMultiple={false}
          maxFiles={1}
          instantUpload
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
