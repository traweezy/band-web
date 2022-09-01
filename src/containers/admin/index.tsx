import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtValid from 'jwt-valid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '@rehooks/local-storage';
import jwtDecode from 'jwt-decode';

import Background from './components/background';
import Login from './components/login';
import Panel from './components/panel';
import UploadDialog from './components/upload-dialog';
import DeleteDialog from './components/delete-dialog';
import ImagePreview from './components/image-preview';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#C60C31',
    },
    secondary: {
      main: '#f61115',
    },
  },
  typography: {
    fontFamily: [
      'Metal Mania',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

const Admin = () => {
  const [jwtToken] = useLocalStorage<string>('jwt_token');
  const [isValidated, setIsValid] = useState(jwtValid(jwtToken));

  useEffect(() => {
    if (jwtToken) {
      const { exp } = jwtDecode<{
        id: number;
        iat: number;
        exp: number;
      }>(jwtToken);
      if (Date.now() >= exp * 1000) {
        setIsValid(false);
      } else {
        setIsValid(true);
      }
    }
  }, [jwtToken]);

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/recordings');
    }
  }, [jwtToken]);

  return (
    <ThemeProvider theme={theme}>
      <div className="font-metal-mania">
        <Background />
        <Login show={!isValidated} />
        {isValidated && (
          <>
            <Panel />
            <UploadDialog />
            <DeleteDialog />
            <ImagePreview />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Admin;
