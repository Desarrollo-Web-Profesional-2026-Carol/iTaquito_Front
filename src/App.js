import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './Home';
import Login from './pages/Login';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';

function NavBar() {
  const { user, logoutUser } = useAuth();
  
  return (
    <nav style={{ padding: '10px', background: '#eee', display: 'flex', gap: '15px' }}>
      <Link to="/">Inicio</Link>
      {user?.rol === 'admin' && <Link to="/admin/productos">Panel Productos</Link>}
      
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Hola, {user.nombre}</span>
            <button onClick={logoutUser}>Salir</button>
          </>
        ) : (
          <Link to="/login">Login Admin</Link>
        )}
      </div>
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            
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
        </div>
      </Router>
    </AuthProvider>
  );
}