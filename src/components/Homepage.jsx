import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import DecisionTreeVisualization4 from './DecisionTreeVisualization4';
import EvaluatingForm from './EvaluatingForm';
import MeasurementsTable from './MeasurementsTable';
import Notifications from './Notifications';

const sampleMeasurementInfo = {
  group: 'For extraction',
  dateTime: '2023-03-16 10:30',
  patientName: 'Jan Novák',
};

const Homepage = () => {
  return (
    <Box sx={{ width: '100%', p: 3 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom>
        Data analysis
      </Typography>

      <Grid container spacing={2}>
        {/* Left side: Decision Tree Visualization with fixed/responsive height */}
        <Grid item xs={12} md={6}>
          <Box sx={{ width: '100%', height: { xs: '300px', md: '400px' } }}>
            <DecisionTreeVisualization4 sx={{ maxWidth: '100%', maxHeight: '100%' }} />
          </Box>
        </Grid>

        {/* Right side: Measurements Table */}
        <Grid item xs={12} md={6}>
          {/* Info row above the table */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2,
              p: 1,
              backgroundColor: '#f0f0f0',
              borderRadius: '4px',
            }}
          >
            <Typography variant="subtitle1">
              <strong>Category:</strong> {sampleMeasurementInfo.group}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Date-time:</strong> {sampleMeasurementInfo.dateTime}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Pacient name:</strong> {sampleMeasurementInfo.patientName}
            </Typography>
          </Box>

          <MeasurementsTable />
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Notifications />
      </Box>

      <Box sx={{ mt: 2 }}>
        <EvaluatingForm />
      </Box>

      {/* <Box sx={{ mt: 2 }}>
        <SensorDataFromBackend />
      </Box> */}
    </Box>
  );
};

export default Homepage;
