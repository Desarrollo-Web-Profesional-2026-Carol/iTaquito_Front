import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Home from './pages/Home';       
import Tables from './pages/Tables';
import Dashboard from './pages/Dashboard';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#ECF0F1',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid #E83E8C',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" />;
};

function AppContent() {
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Ruta Home - Pública */}
        <Route path="/" element={<Home />} />
        
        {/* Rutas protegidas */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/tables"
          element={
            <PrivateRoute>
              <Tables />
            </PrivateRoute>
          }
        />
        
        {/* Redirección por defecto (opcional, ya tenemos Home en "/") */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;