import React from 'react';
import { Box, Card, CardContent, Typography, Divider } from '@mui/material';

const PatientProfile = () => {
  // example data
  const patient = {
    name: 'Jan Novák',
    age: 45,
    gender: 'Muž',
    contact: 'jan.novak@example.com',
    medicalHistory: [
      'Diabetes typu 2',
      'Hypertenze',
      'Alergie: Penicilin'
    ]
  };

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Profil pacienta
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1"><strong>Jméno:</strong> {patient.name}</Typography>
        <Typography variant="body1"><strong>Věk:</strong> {patient.age}</Typography>
        <Typography variant="body1"><strong>Pohlaví:</strong> {patient.gender}</Typography>
        <Typography variant="body1"><strong>Email:</strong> {patient.contact}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">Zdravotní historie:</Typography>
        {patient.medicalHistory.map((item, index) => (
          <Typography key={index} variant="body2">- {item}</Typography>
        ))}
      </CardContent>
    </Card>
  );
};

export default PatientProfile;
