import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

const Header = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar>
        <Typography variant="h6" component="div">
          Automated Proliferation Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
