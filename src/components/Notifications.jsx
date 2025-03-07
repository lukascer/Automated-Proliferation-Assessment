import React from 'react';
import { Box, Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

const Notifications = () => {
  // Příkladová data notifikací
  const notifications = [
    { id: 1, message: 'Vysoká hladina glukózy detekována. Kontaktujte lékaře.' },
    { id: 2, message: 'Nové měření krevního tlaku je k dispozici.' },
    { id: 3, message: 'Aktualizace profilu pacienta dokončena.' }
  ];

  return (
    <Card sx={{ m: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Notifikace
        </Typography>
        <List>
          {notifications.map((notification) => (
            <ListItem key={notification.id}>
              <ListItemText primary={notification.message} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Notifications;
