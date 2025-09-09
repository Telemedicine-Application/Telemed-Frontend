import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../Components/Navbar.jsx';
import Hero from '../Components/Hero';
import About from '../Components/About';
import Features from '../Components/Features';
import Contact from '../Components/Contact';
import Footer from '../Components/Footer';
import Signup from '../Components/Signup.jsx';
import Login from '../Components/Login.jsx';
import Consultation from '../Components/Consultation.jsx';
//import DoctorLogin from '../Components/DoctorLogin.jsx';
import ProtectedRoute from './Routes/ProtectedRoute.jsx';
import PrescriptionAnalyzer from '../Components/PrescriptionAnalyzer.jsx';
import './index.css';

const AppContent = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        if (window.scrollY > 100) {
          nav.classList.add('shadow-lg');
        } else {
          nav.classList.remove('shadow-lg');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="smooth-scroll bg-light">
      {/* Add Toaster here with your custom styling */}
      <Toaster
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid #f97316',
          },
          success: {
            iconTheme: {
              primary: '#f97316',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {location.pathname !== "/login" && (
        <Navbar
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          scrollToSection={scrollToSection}
        />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero scrollToSection={scrollToSection} />
              <About />
              <Features />
              <Contact />
              <Footer />
            </>
          }
        />
        <Route
          path='/consultation'
          element={<Consultation />}
        />
        <Route
          path='/prescription-analyzer'
          element={<PrescriptionAnalyzer />}
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;