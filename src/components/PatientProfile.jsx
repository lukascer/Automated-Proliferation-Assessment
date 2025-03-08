import { Card, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';

const PatientProfile = () => {
  // example data
  const patient = {
    name: 'Jan Novák',
    age: 45,
    gender: 'Male',
    contact: 'jan.novak@example.com',
    medicalHistory: ['Type 2 Diabetes', 'Hypertension', 'Allergy: Penicillin'],
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Patient profile
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1">
          <strong>Name:</strong> {patient.name}
        </Typography>
        <Typography variant="body1">
          <strong>Age:</strong> {patient.age}
        </Typography>
        <Typography variant="body1">
          <strong>Gender:</strong> {patient.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {patient.contact}
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Medical history:</Typography>
        {patient.medicalHistory.map((item, index) => (
          <Typography key={index} variant="body2">
            - {item}
          </Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
