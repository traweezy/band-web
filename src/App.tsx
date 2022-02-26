import { memo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './containers/admin';
import Website from './containers/website';
import { registerPlugin } from 'react-filepond';
import DateAdapter from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import 'react-toastify/dist/ReactToastify.css';
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const App = () => (
  <LocalizationProvider dateAdapter={DateAdapter}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Website />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
      <ToastContainer theme="dark" />
    </HashRouter>
  </LocalizationProvider>
);

export default memo(App);
