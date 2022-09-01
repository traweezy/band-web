/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { FilePond } from 'react-filepond';

interface LyricsFormProps {
  handleSubmitData: (data: { [key: string]: string | number }) => void;
}
const LyricsForm: React.FC<LyricsFormProps> = ({ handleSubmitData }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [version, setVersion] = useState<number>(0);
  const [fileId, setFileId] = useState<number | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const pondEl = useRef<FilePond | null>(null);

  useEffect(() => {
    if (title.length && author.length && version !== null && fileId !== null) {
      handleSubmitData({
        Title: title,
        Author: author,
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
      <TextField
        id="select-author"
        margin="dense"
        select={true}
        label="Author"
        type="text"
        value={author}
        onChange={event => setAuthor(event.target.value)}
        variant="standard"
        required={true}
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
        required={true}
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

export default LyricsForm;
