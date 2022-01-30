import * as React from 'react';
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
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import MenuIcon from '@mui/icons-material/Menu';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { styled, useTheme } from '@mui/material/styles';
import useMobileDetect from 'use-mobile-detect-hook';
import { useLocation, Link } from 'react-router-dom';
import BandLogo from '../../../assets/band-logo.png';
import RecordingsGrid from './recordings-grid';
import TabsGrid from './tabs-grid';

const drawerWidth = 200;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

type SideNavigationRoutePath = `/admin/${'recordings' | 'tabs'}`;

type SideNavigationRoutes = {
  [key in SideNavigationRoutePath]: {
    name: string;
    path: SideNavigationRoutePath;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: any;
    Component: React.ComponentType<unknown>;
  };
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
};

const Panel = () => {
  const { isMobile }: MobileDetector = useMobileDetect();
  const location = useLocation();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const { Component } =
    sideNavigationRoutes[location.pathname as SideNavigationRoutePath];
  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 77px)' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/">
            <img
              src={BandLogo}
              alt="Band Logo"
              style={{
                height: '100%',
                width: ' 94px',
              }}
            />
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
      {!isMobile() ? (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button disabled>
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItem>
            </List>
            <Divider />
            <List>
              {Object.values(sideNavigationRoutes).map(
                ({ name, Icon, path }) => (
                  <Link to={path} key={name}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon
                          color={
                            location.pathname === path ? 'primary' : undefined
                          }
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={name}
                        sx={{
                          color:
                            location.pathname === path
                              ? 'primary.main'
                              : 'white',
                        }}
                      />
                    </ListItem>
                  </Link>
                ),
              )}
            </List>
          </Box>
        </Drawer>
      ) : (
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
              {theme.direction === 'rtl' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              <ListItem button disabled>
                <ListItemIcon>
                  <UploadIcon />
                </ListItemIcon>
                <ListItemText primary="Upload" />
              </ListItem>
            </List>
            <Divider />
            <List>
              {Object.values(sideNavigationRoutes).map(
                ({ name, Icon, path }) => (
                  <Link to={path} key={name}>
                    <ListItem button>
                      <ListItemIcon>
                        <Icon
                          color={
                            location.pathname === path ? 'primary' : undefined
                          }
                        />
                      </ListItemIcon>

                      <ListItemText
                        primary={name}
                        sx={{
                          color:
                            location.pathname === path
                              ? 'primary.main'
                              : 'white',
                        }}
                      />
                    </ListItem>
                  </Link>
                ),
              )}
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
          <Component />
        </Paper>
      </Box>
    </Box>
  );
};

export default Panel;
