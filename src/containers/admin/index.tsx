import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtValid from 'jwt-valid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '@rehooks/local-storage';
import type {} from '@mui/x-data-grid/themeAugmentation';
import Background from './components/background';
import Login from './components/login';
import Panel from './components/panel';

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
    if (jwtValid(jwtToken)) {
      setIsValid(true);
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
        {isValidated && <Panel />}
      </div>
    </ThemeProvider>
  );
};

export default Admin;
