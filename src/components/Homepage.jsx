import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React from 'react';
import DecisionTreeVisualization4 from './DecisionTreeVisualization4';
import Notifications from './Notifications';
import SensorDataFromBackend from './SensorDataFromBackend';

const sampleMeasurementInfo = {
  group: 'For extraction',
  dateTime: '2023-03-16 10:30',
  patientName: 'Jan Novák',
};

const sampleMeasurements = [
  { id: 'ratio', parameter: 'Cells ratio', value: 80, unit: '%' },
  { id: 'distribution', parameter: 'Distribution', value: 'center', unit: '' },
  { id: 'size', parameter: 'Distribution size', value: 5, unit: 'mm2' },
];

const thresholdValues = {
  ratio: { min: 20, max: 50 },
  distribution: { min: 50, max: 150 },
  size: { min: 0, max: 2 },
};

const checkTreshold = (id, value) => {
  const minMax = thresholdValues[id];

  if (minMax.min > value) {
    return 'lowValue';
  }

  if (minMax.max < value) {
    return 'highValue';
  }
  return null;
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

          {/* Table with measurements */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Parameter</TableCell>
                  <TableCell align="right">Value</TableCell>
                  <TableCell align="right">Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleMeasurements.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.parameter}</TableCell>
                    <TableCell
                      align="right"
                      className={checkTreshold(row.id, row.value)}
                      sx={{
                        '&.lowValue': {
                          backgroundColor: 'rgba(255,255,0,0.3)',
                        },
                        '&.highValue': {
                          backgroundColor: 'rgba(255,0,0,0.3)',
                        },
                      }}
                    >
                      {row.value}
                    </TableCell>
                    <TableCell align="right">{row.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

      <Box sx={{ mt: 2 }}>
        <Notifications />
      </Box>

      <Box sx={{ mt: 2 }}>
        <SensorDataFromBackend />
      </Box>
    </Box>
  );
};

export default Homepage;
