import { Card, CardContent, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react';

const Notifications = () => {
  // Příkladová data notifikací
  const notifications = [
    { id: 1, message: 'Organ donor.' },
    { id: 2, message: 'Previous sample available.' },
    { id: 3, message: 'New sample available.' },
  ];

  return (
    <Card sx={{ mb: 2, mt: 2, p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Notification
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
