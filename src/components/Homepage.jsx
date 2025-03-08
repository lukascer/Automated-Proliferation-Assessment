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
import EvaluatingForm from './EvaluatingForm';
import Notifications from './Notifications';

const sampleMeasurementInfo = {
  group: 'For extraction',
  dateTime: '2023-03-16 10:30',
  patientName: 'Jan Novák',
};

const sampleMeasurements = [
  { id: 'positive', parameter: 'Positive cells', value: 80, unit: 80 },
  { id: 'mild_active', parameter: '+ Mild Positive', value: 15, unit: 15 },
  { id: 'moderate_active', parameter: '+ Moderate Positive', value: 21, unit: 21 },
  { id: 'strong_active', parameter: '+ Strong Positive', value: 40, unit: 40 },
  { id: 'negative', parameter: 'Negative cells', value: 53, unit: 53 },
];

const thresholdValues = {
  positive: { min: 20, max: 50 },
  mild_active: { min: 0, max: 30 },
  moderate_active: { min: 0, max: 30 },
  strong_active: { min: 0, max: 30 },
  negative: 53,
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
                  <TableCell align="right">No. of cells</TableCell>
                  <TableCell align="right">Ratio (%)</TableCell>
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
        <EvaluatingForm />
      </Box>

      {/* <Box sx={{ mt: 2 }}>
        <SensorDataFromBackend />
      </Box> */}
    </Box>
  );
};

export default Homepage;
