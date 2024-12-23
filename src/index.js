import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';

// Custom theme extending Chakra UI with StayHealthy brand colors
const theme = extendTheme({
  colors: {
    brand: {
      primary: {
        500: '#1678F2',
        gradient: 'linear-gradient(to right, #3A8EF6, #6F3AFA)',
      },
      red: '#963D3D',
      gray: {
        text: '#4A5568',
        border: '#E2E8F0',
        bg: '#F5F7F9',
      },
    },
  },
  fonts: {
    heading: 'Alexandria, sans-serif',
    body: 'Alexandria, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
