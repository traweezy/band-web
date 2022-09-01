import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UploadIcon from '@mui/icons-material/Upload';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, useTheme } from '@mui/material/styles';
import useMobileDetect from 'use-mobile-detect-hook';
import { useLocation, Link } from 'react-router-dom';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import ImageIcon from '@mui/icons-material/Image';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import EventIcon from '@mui/icons-material/Event';
import { AspectRatio } from 'react-aspect-ratio';
import shallow from 'zustand/shallow';
import BandLogo from '../../../assets/band-logo.png';
import { useStore } from '../../../store/local';
import Grid from './grid';

const drawerWidth = 200;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const icons: Record<keyof SideNavigationRoutes, any> = {
  '/admin/recordings': LibraryMusicIcon,
  '/admin/tabs': TextSnippetIcon,
  '/admin/lyrics': NoteAltIcon,
  '/admin/events': EventIcon,
  '/admin/images': ImageIcon,
};

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Panel = () => {
  const { routes, openUploadDialog } = useStore(
    state => ({ routes: state.routes, openUploadDialog: state.openUploadDialog }),
    shallow,
  );

  const { isMobile } = useMobileDetect();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 77px)' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/">
            <AspectRatio ratio="3/4">
              <img
                src={BandLogo}
                alt="Band Logo"
                style={{
                  width: ' 94px',
                }}
              />
            </AspectRatio>
          </Link>

          {isMobile() && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && isMobile() && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      {isMobile() ? (
        <Drawer
          sx={{
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
            },
            zIndex: theme => theme.zIndex.drawer + 2,
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button={true} disabled={true}>
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItem>
            </List>
            <Divider />
            <List>
              {Object.values(routes).map(({ name, path }) => {
                const Icon = icons[path];

                return (
                  <Link to={path} key={name}>
                    <ListItem button={true}>
                      <ListItemIcon>
                        <Icon color={location.pathname === path ? 'primary' : undefined} />
                      </ListItemIcon>

                      <ListItemText
                        primary={name}
                        sx={{
                          color: location.pathname === path ? 'primary.main' : 'white',
                        }}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Box>
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            ['& .MuiDrawer-paper']: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button={true} onClick={() => openUploadDialog()}>
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItem>
            </List>
            <Divider />
            <List>
              {Object.values(routes).map(({ name, path }) => {
                const Icon = icons[path];
                return (
                  <Link to={path} key={name}>
                    <ListItem button={true}>
                      <ListItemIcon>
                        <Icon color={location.pathname === path ? 'primary' : undefined} />
                      </ListItemIcon>

                      <ListItemText
                        primary={name}
                        sx={{
                          color: location.pathname === path ? 'primary.main' : 'white',
                        }}
                      />
                    </ListItem>
                  </Link>
                );
              })}
            </List>
          </Box>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: isMobile() ? 0 : 3 }}>
        <Toolbar />
        <Paper
          elevation={3}
          sx={{
            height: isMobile() ? 'calc(100vh - 56px)' : '100%',
          }}
        >
          <Grid />
        </Paper>
      </Box>
    </Box>
  );
};

export default Panel;
