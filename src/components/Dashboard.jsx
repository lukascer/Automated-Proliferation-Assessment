import React from 'react';
import { Box, Typography } from '@mui/material';
import PatientProfile from './PatientProfile';
import SensorData from './SensorData';
import Notifications from './Notifications';
import Settings from './Settings';
import SensorDataFromBackend from './SensorDataFromBackend';
import DecisionTreeVisualization from './DecisionTreeVisualization';
import DecisionTreeVisualization2 from './DecisionTreeVisualization2';
import DecisionTreeVisualization3 from './DecisionTreeVisualization3';
import DecisionTreeVisualization4 from './DecisionTreeVisualization4';
import DecisionTreeVisualization5 from './DecisionTreeVisualization5';

const Dashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <PatientProfile />
      <SensorData />
      <DecisionTreeVisualization />
      <DecisionTreeVisualization2 />
      {/* <DecisionTreeVisualization3 /> */}
      <DecisionTreeVisualization4 />
      <DecisionTreeVisualization5 />
      <Notifications />
      <Settings />
      <SensorDataFromBackend />
    </Box>
  );
};

export default Dashboard;
