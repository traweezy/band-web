import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import UploadIcon from '@mui/icons-material/Upload';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import BandLogo from '../../../assets/band-logo.png';
import RecordingsGrid from './recordings-grid';

const drawerWidth = 200;

const BandLogoContainer = styled('img')`
  height: 100%;
  width: 105px;
  margin-left: 16px;
`;

const Panel = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 77px)' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}
      >
        <Toolbar disableGutters>
          <BandLogoContainer src={BandLogo} alt="Band Logo" />
        </Toolbar>
      </AppBar>
      {!matches && (
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
              <ListItem button>
                <ListItemIcon>
                  <LibraryMusicIcon />
                </ListItemIcon>
                <ListItemText primary="Recordings" />
              </ListItem>
            </List>
          </Box>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Paper elevation={3} sx={{ height: '100%' }}>
          <RecordingsGrid />
        </Paper>
        {/* <DataGrid
          {...data}
          components={{
            Toolbar: GridToolbar,
          }}
          loading={loading}
          checkboxSelection
          disableSelectionOnClick
          initialState={{
            ...data.initialState,
            pinnedColumns: { left: ['__check__', 'desk'] },
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default Panel;
