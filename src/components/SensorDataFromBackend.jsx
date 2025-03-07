import React, { useState } from 'react';
import { Box, Typography, Button, CircularProgress, TextField } from '@mui/material';
import api from '../api';

const SensorDataFromBackend = () => {
  const [data, setData] = useState(null);
  const [loadingFetch, setLoadingFetch] = useState(false);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [error, setError] = useState(null);

  // States for update inputs
  const [glucose, setGlucose] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');

  // Fetch sensor data from backend
  const fetchData = () => {
    setLoadingFetch(true);
    setError(null);
    api
      .get('/sensors')
      .then((response) => {
        setData(response.data);
        setLoadingFetch(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingFetch(false);
      });
  };

  // Update sensor data via backend
  const updateData = () => {
    setLoadingUpdate(true);
    setError(null);

    // Create payload from input values; convert to numbers
    const payload = {
      bloodGlucose: Number(glucose),
      bloodPressure: {
        systolic: Number(systolic),
        diastolic: Number(diastolic),
      },
    };

    // PUT request
    api
      .put('/sensors', payload)
      .then((response) => {
        setData(response.data);
        setLoadingUpdate(false);
      })
      .catch((err) => {
        setError(err);
        setLoadingUpdate(false);
      });
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Data ze senzoru z backendu:
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" color="primary" onClick={fetchData} disabled={loadingFetch} sx={{ mr: 2 }}>
          {loadingFetch ? <CircularProgress size={24} color="inherit" /> : 'Načíst data'}
        </Button>
      </Box>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          Chyba při načítání dat: {error.message}
        </Typography>
      )}
      {data && <pre style={{ marginTop: '16px' }}>{JSON.stringify(data, null, 2)}</pre>}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Aktualizovat data:
        </Typography>
        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth: '400px',
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Glukóza (mg/dl)"
            variant="outlined"
            value={glucose}
            onChange={(e) => setGlucose(e.target.value)}
          />
          <TextField
            label="Systolický tlak (mmHg)"
            variant="outlined"
            value={systolic}
            onChange={(e) => setSystolic(e.target.value)}
          />
          <TextField
            label="Diastolický tlak (mmHg)"
            variant="outlined"
            value={diastolic}
            onChange={(e) => setDiastolic(e.target.value)}
          />
          <Button variant="contained" color="secondary" onClick={updateData} disabled={loadingUpdate}>
            {loadingUpdate ? <CircularProgress size={24} color="inherit" /> : 'Aktualizovat data'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SensorDataFromBackend;
