import { memo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Admin from './containers/admin';
import Website from './containers/website';

const App = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<Website />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </HashRouter>
);

export default memo(App);
