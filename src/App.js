import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Page Components
import Home from './pages/Home';
import Services from './pages/Services';
import Appointment from './pages/Appointment';
import Reviews from './pages/Reviews';
import DoctorSearch from './pages/DoctorSearch';
import AppointmentBooking from './pages/AppointmentBooking';
import SelfCheckup from './pages/SelfCheckup';
import HealthTips from './pages/HealthTips';

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />} />
              <Route path="/doctors" element={<DoctorSearch />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/signup" element={<SignupForm />} />
              <Route path="/services/self-checkup" element={<SelfCheckup />} />
              <Route path="/services/health-tips" element={<HealthTips />} />

              {/* Protected Routes */}
              <Route
                path="/appointment/book"
                element={
                  <ProtectedRoute>
                    <AppointmentBooking />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
