import axios from 'axios';
import download from 'downloadjs';
import { toast } from 'react-toastify';

const downloadFile = async (url: string, fileName: string) =>
  toast.promise(
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then(response => {
        const content = response.headers['content-type'];
        download(response.data, fileName, content);
      }),
    {
      pending: `Downloading ${fileName}...`,
      success: `Finished downloading ${fileName} 👌`,
      error: 'Fuck something happened 🤯',
    },

    { autoClose: 3000 },
  );

export default downloadFile;
