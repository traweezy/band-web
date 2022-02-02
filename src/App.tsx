import { memo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Admin from './containers/admin';
import Website from './containers/website';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Website />} />
      <Route path="/admin/*" element={<Admin />} />
    </Routes>
    <ToastContainer theme="dark" />
  </HashRouter>
);

export default memo(App);
