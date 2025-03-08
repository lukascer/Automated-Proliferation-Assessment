import { Box } from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Homepage from './components/Homepage';
import ImageEditor from './components/ImageEditor';
import Notifications from './components/Notifications';
import PatientProfile from './components/PatientProfile';
import SensorData from './components/SensorData';
import Settings from './components/Settings';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Box
      sx={{
        display: 'grid',
        height: '100vh',
        gridTemplateColumns: { xs: '1fr', md: '170px 1fr' },
        gridTemplateRows: { xs: 'auto auto auto', md: 'auto minmax(0, 1fr)' },
        gridTemplateAreas: {
          xs: `
            "header"
            "sidebar"
            "main"
          `,
          md: `
            "header header"
            "sidebar main"
          `,
        },
      }}
    >
      <Box sx={{ gridArea: 'header', zIndex: 2 }}>
        <Header />
      </Box>
      <Box sx={{ gridArea: 'sidebar', overflowY: 'auto' }}>
        <Sidebar />
      </Box>
      <Box component="main" sx={{ gridArea: 'main', p: 3, overflowY: 'auto' }}>
        <Routes>
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profil" element={<PatientProfile />} />
          <Route path="/senzorova-data" element={<SensorData />} />
          <Route path="/notifikace" element={<Notifications />} />
          <Route path="/nastaveni" element={<Settings />} />
          <Route path="/image-editor" element={<ImageEditor />} />
          <Route path="*" element={<Homepage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
