// src/App.js
import React from 'react';
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

const App = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <DoctorProvider>
          <AvailabilityProvider>
            <BookingProvider>
              <div className="app">
                <Navbar />
                <main className="main-content">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/signup" element={<SignupForm />} />
                    <Route path="/services" element={<Services />} />
                    <Route
                      path="/services/health-tips"
                      element={<HealthTips />}
                    />
                    <Route
                      path="/services/self-checkup"
                      element={<SelfCheckup />}
                    />

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
              </div>
            </BookingProvider>
          </AvailabilityProvider>
        </DoctorProvider>
      </NotificationProvider>
    </AuthProvider>
  );
};

export default App;
