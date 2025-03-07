// src/components/SensorData.jsx
import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';

// Jednoduchá funkce pro vyhodnocení senzorových dat
function evaluateSensorData(data) {
  if (!data || typeof data.bloodGlucose !== 'number') {
    return 'Data nedostupná';
  }
  const { bloodGlucose, bloodPressure } = data;
  let message = '';

  if (bloodGlucose < 70) {
    message = 'Nízká hladina glukózy – riziko hypoglykemie.';
  } else if (bloodGlucose >= 70 && bloodGlucose <= 140) {
    message = 'Normální hladina glukózy.';
  } else if (bloodGlucose > 140 && bloodGlucose <= 180) {
    message = 'Mírně zvýšená hladina glukózy – doporučeno sledování.';
  } else if (bloodGlucose > 180) {
    message = 'Vysoká hladina glukózy – potenciální hyperglykemie.';
  }

  // Kontrola krevního tlaku (volitelná)
  if (bloodPressure && (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90)) {
    message += ' Navíc byl zjištěn vysoký krevní tlak.';
  }

  return message;
}

const SensorData = () => {
  // Příkladová data ze senzorů
  const [sensorData, setSensorData] = useState({
    bloodGlucose: 150,
    bloodPressure: { systolic: 130, diastolic: 85 }
  });

  const prediction = evaluateSensorData(sensorData);

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Senzorová data
        </Typography>
        <Typography variant="body1">
          <strong>Glukóza:</strong> {sensorData.bloodGlucose} mg/dl
        </Typography>
        <Typography variant="body1">
          <strong>Krevní tlak:</strong> {sensorData.bloodPressure.systolic}/{sensorData.bloodPressure.diastolic} mmHg
        </Typography>
        <Box sx={{ my: 2 }}>
          <Typography variant="subtitle1">Vyhodnocení:</Typography>
          <Typography variant="body2">{prediction}</Typography>
        </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setSensorData({
              bloodGlucose: Math.floor(Math.random() * 250),
              bloodPressure: {
                systolic: 110 + Math.floor(Math.random() * 50),
                diastolic: 70 + Math.floor(Math.random() * 30)
              }
            })
          }
        >
          Simulovat nová data
        </Button>
      </CardContent>
    </Card>
  );
};

export default SensorData;
