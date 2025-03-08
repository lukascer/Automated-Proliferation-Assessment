import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import SidebarProvider from './components/SidebarContext';
import './index.css';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </ThemeProvider>
  </BrowserRouter>,
  // </StrictMode>
);
