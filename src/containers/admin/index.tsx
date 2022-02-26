import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtValid from 'jwt-valid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocalStorage } from '@rehooks/local-storage';
import type {} from '@mui/x-data-grid/themeAugmentation';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import RecordingsGrid from './components/recordings-grid';
import TabsGrid from './components/tabs-grid';
import LyricsGrid from './components/lyrics-grid';
import Background from './components/background';
import Login from './components/login';
import Panel from './components/panel';
import UploadDialog from './components/upload-dialog';

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

export type SideNavigationRoutePath = `/admin/${
  | 'recordings'
  | 'tabs'
  | 'lyrics'}`;

export type Route = {
  name: string;
  path: SideNavigationRoutePath;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  Component: React.ComponentType<unknown>;
};

export type SideNavigationRoutes = {
  [key in SideNavigationRoutePath]: Route;
};

const sideNavigationRoutes: SideNavigationRoutes = {
  '/admin/recordings': {
    name: 'Recordings',
    path: '/admin/recordings',
    Icon: LibraryMusicIcon,
    Component: RecordingsGrid,
  },
  '/admin/tabs': {
    name: 'Tabs',
    path: '/admin/tabs',
    Icon: TextSnippetIcon,
    Component: TabsGrid,
  },
  '/admin/lyrics': {
    name: 'Lyrics',
    path: '/admin/lyrics',
    Icon: NoteAltIcon,
    Component: LyricsGrid,
  },
};

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

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="font-metal-mania">
        <Background />
        <Login show={!isValidated} />
        {isValidated && (
          <>
            <Panel
              handleUploadDialogeIsOpen={setIsUploadDialogOpen}
              routes={sideNavigationRoutes}
              dialogOpen={isUploadDialogOpen}
            />
            <UploadDialog
              open={isUploadDialogOpen}
              handleUploadDialogeIsOpen={setIsUploadDialogOpen}
              routes={sideNavigationRoutes}
            />
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Admin;
