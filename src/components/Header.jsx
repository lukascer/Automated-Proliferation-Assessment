import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';

import headerBg from './../assets/header.jpg';

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: 'primary.main', backgroundImage: `url(${headerBg})`, backgroundRepeat: 'repeat-x' }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ textDecorationShadow: '0px 0px 3px black' }}>
          Automated Proliferation Assessment
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
