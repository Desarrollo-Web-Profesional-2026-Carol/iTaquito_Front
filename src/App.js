import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import ProductList from './pages/admin/ProductList';
import ProductForm from './pages/admin/ProductForm';

import { C, FONT, glow } from './styles/designTokens';
import { Utensils, Home as HomeIcon, Package, LogOut, LogIn } from 'lucide-react';

function NavBar() {
  const { user, logoutUser } = useAuth();
  
  return (
    <nav style={{
      background: C.bgAccent,
      borderBottom: `1px solid ${C.border}`,
      padding: '12px 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      fontFamily: FONT,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: `${C.pink}22`, border: `1px solid ${C.pink}55`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: glow(C.pink, "33"),
        }}>
          <Utensils size={20} color={C.pink} />
        </div>
        <span style={{ fontSize: "20px", fontWeight: "800", color: C.pink, letterSpacing: "-0.5px" }}>iTaquito</span>
      </div>

      {/* Navigation Links */}
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Link to="/" style={{
          textDecoration: 'none', color: C.textSecondary, fontWeight: '600', fontSize: '14px',
          padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px',
          transition: 'all 0.2s',
        }} onMouseEnter={e => { e.currentTarget.style.color = C.pink; e.currentTarget.style.background = `${C.pink}11`; }} onMouseLeave={e => { e.currentTarget.style.color = C.textSecondary; e.currentTarget.style.background = 'transparent'; }}>
          <HomeIcon size={16} /> Inicio
        </Link>

        {user?.rol === 'admin' && (
          <Link to="/admin/productos" style={{
            textDecoration: 'none', color: C.textSecondary, fontWeight: '600', fontSize: '14px',
            padding: '8px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px',
            transition: 'all 0.2s',
          }} onMouseEnter={e => { e.currentTarget.style.color = C.orange; e.currentTarget.style.background = `${C.orange}11`; }} onMouseLeave={e => { e.currentTarget.style.color = C.textSecondary; e.currentTarget.style.background = 'transparent'; }}>
            <Package size={16} /> Productos
          </Link>
        )}
      </div>
      
      {/* User Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {user ? (
          <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: C.textPrimary }}>{user.nombre}</span>
              <span style={{ fontSize: '11px', fontWeight: '500', color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{user.rol}</span>
            </div>
            <button onClick={logoutUser} style={{
              background: 'transparent', color: C.textMuted, border: `1px solid ${C.borderBright}`,
              borderRadius: '8px', padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }} title="Cerrar Sessión" onMouseEnter={e => { e.currentTarget.style.color = C.pink; e.currentTarget.style.borderColor = C.pink; }} onMouseLeave={e => { e.currentTarget.style.color = C.textMuted; e.currentTarget.style.borderColor = C.borderBright; }}>
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <button style={{
              background: `${C.teal}15`, color: C.teal, border: `1px solid ${C.teal}44`,
              borderRadius: '8px', padding: '8px 16px', fontFamily: FONT, fontWeight: '700', fontSize: '13px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s'
            }} onMouseEnter={e => { e.currentTarget.style.background = `${C.teal}25`; e.currentTarget.style.boxShadow = glow(C.teal, "22"); }} onMouseLeave={e => { e.currentTarget.style.background = `${C.teal}15`; e.currentTarget.style.boxShadow = 'none'; }}>
              <LogIn size={14} /> Entrar
            </button>
          </Link>
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
        <div>
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