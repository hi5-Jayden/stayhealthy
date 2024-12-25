// src/App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Providers
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import { DoctorProvider } from './context/DoctorContext';
import { BookingProvider } from './context/BookingContext';
import { AvailabilityProvider } from './context/AvailabilityContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import FloatingNotification from './components/notifications/FloatingNotification';

// Auth Components
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Reviews from './pages/Reviews';
import DoctorSearch from './pages/DoctorSearch';
import DoctorProfile from './pages/DoctorProfile';
import AppointmentBooking from './pages/AppointmentBooking';
import InstantConsultation from './pages/InstantConsultation';
import ConsultationChat from './pages/ConsultationChat';
import HealthTips from './pages/HealthTips';
import SelfCheckup from './pages/SelfCheckup';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // In a real app, fetch appointments from an API
      // For now using sample data
      setAppointments([
        {
          doctorName: 'Dr. Doctor Name',
          specialty: 'SPECIALTY',
          experience: '5',
          rating: 5,
          patientName: 'Placeholder for input name',
          phone: '0123456789',
          date: '28/12/2024',
          time: '10:00 AM',
        },
      ]);
    }
  }, [isAuthenticated]);

  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/health-tips" element={<HealthTips />} />
          <Route path="/services/self-checkup" element={<SelfCheckup />} />

          {/* Protected Routes - Require Authentication */}
          <Route
            path="/services/instant-consultation"
            element={
              <ProtectedRoute>
                <InstantConsultation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultation/chat"
            element={
              <ProtectedRoute>
                <ConsultationChat />
              </ProtectedRoute>
            }
          />
          <Route
            path="/services/book-appointment"
            element={
              <ProtectedRoute>
                <AppointmentBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors"
            element={
              <ProtectedRoute>
                <DoctorSearch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/doctors/:id"
            element={
              <ProtectedRoute>
                <DoctorProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reviews"
            element={
              <ProtectedRoute>
                <Reviews />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/*"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      {isAuthenticated && appointments.length > 0 && (
        <FloatingNotification appointments={appointments} />
      )}
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <DoctorProvider>
          <AvailabilityProvider>
            <BookingProvider>
              <AppContent />
            </BookingProvider>
          </AvailabilityProvider>
        </DoctorProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
