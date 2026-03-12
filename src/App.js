import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';     
import Tables from './pages/Tables';           
import Cooks from './pages/CooksPage';  
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
            {/* Rutas protegidas */}
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/tables" 
              element={<ProtectedRoute><Tables /></ProtectedRoute>} 
            />
            <Route 
              path="/cooks" 
              element={<ProtectedRoute><Cooks /></ProtectedRoute>} 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin/productos" 
              element={<ProtectedRoute adminOnly={true}><ProductList /></ProtectedRoute>} 
            />
            <Route 
              path="/admin/productos/nuevo" 
              element={<ProtectedRoute adminOnly={true}><ProductForm /></ProtectedRoute>} 
            />
            <Route 
              path="/admin/productos/editar/:id" 
              element={<ProtectedRoute adminOnly={true}><ProductForm /></ProtectedRoute>} 
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;