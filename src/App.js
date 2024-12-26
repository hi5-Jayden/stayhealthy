// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Appointment from './pages/Appointment';
import Reviews from './pages/Reviews';

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Box minH="100vh" display="flex" flexDirection="column">
          <Navbar />
          <Box flex="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
