import { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './containers/admin';
import Website from './containers/website';
import { registerPlugin } from 'react-filepond';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'react-toastify/dist/ReactToastify.css';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { queryClient } from './store/server';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Website />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
        <ToastContainer theme="dark" />
      </BrowserRouter>
    </LocalizationProvider>
  </QueryClientProvider>
);

export default memo(App);
