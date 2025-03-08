import { Box, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const drawerWidth = 170;

const Sidebar = () => {
  const navigacniPolozky = [
    { text: 'Evaluation', path: '/homepage' },
    // { text: 'Dashboard', path: '/dashboard' },
    { text: 'Patient profile', path: '/profil' },
    // { text: 'Senzorová data', path: '/senzorova-data' },
    // { text: 'Notifikace', path: '/notifikace' },
    // { text: 'Nastavení', path: '/nastaveni' },
    { text: 'Image editor', path: '/image-editor' },
  ];

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'relative',
          backgroundColor: '#0d151c',
          color: 'white',
          borderLeft: '1px solid white',
        },
      }}
      sx={{
        display: { xs: 'none', md: 'block' },
        height: '100%',
      }}
    >
      <Box sx={{ overflowY: 'auto' }}>
        <List>
          {navigacniPolozky.map((polozka) => (
            <ListItem key={polozka.text} disablePadding>
              <ListItemButton component={Link} to={polozka.path}>
                <ListItemText primary={polozka.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
