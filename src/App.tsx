import { memo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './containers/admin';
import Website from './containers/website';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Website />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);

export default memo(App);
