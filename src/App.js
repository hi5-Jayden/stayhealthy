// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

// Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { DoctorProvider } from './context/DoctorContext';
import { AvailabilityProvider } from './context/AvailabilityContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthModal from './components/auth/AuthModal';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Services from './pages/Services';
import Appointment from './pages/Appointment';
import Reviews from './pages/Reviews';
import SelfCheckup from './pages/SelfCheckup';
import HealthTips from './pages/HealthTips';
import InstantConsultation from './pages/InstantConsultation';
import AppointmentBooking from './pages/AppointmentBooking';

const App = () => {
  const [authModal, setAuthModal] = useState({ isOpen: false, service: '' });

  const handleProtectedRoute = (service) => {
    setAuthModal({ isOpen: true, service });
  };

  return (
    <AuthProvider>
      <NotificationProvider>
        <DoctorProvider>
          <AvailabilityProvider>
            <Box minH="100vh" display="flex" flexDirection="column">
              <Navbar />
              <Box flex="1">
                <Routes>
                  <Route
                    path="/"
                    element={<Home onProtectedRoute={handleProtectedRoute} />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/appointment" element={<Appointment />} />
                  <Route path="/reviews" element={<Reviews />} />
                  <Route
                    path="/services/self-checkup"
                    element={<SelfCheckup />}
                  />
                  <Route
                    path="/services/health-tips"
                    element={<HealthTips />}
                  />
                  <Route
                    path="/services/instant-consultation"
                    element={<InstantConsultation />}
                  />
                  <Route
                    path="/services/book-appointment"
                    element={<AppointmentBooking />}
                  />
                </Routes>
              </Box>
              <Footer />

              <AuthModal
                isOpen={authModal.isOpen}
                onClose={() => setAuthModal({ isOpen: false, service: '' })}
                service={authModal.service}
              />
            </Box>
          </AvailabilityProvider>
        </DoctorProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
