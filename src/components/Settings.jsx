import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button } from '@mui/material';

const Settings = () => {
  const [email, setEmail] = React.useState('jan.novak@example.com'); 

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Nastavení
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
          fullWidth
        />
        <Button variant="contained" color="primary">
          Uložit nastavení
        </Button>
      </CardContent>
    </Card>
  );
};

export default Settings;
