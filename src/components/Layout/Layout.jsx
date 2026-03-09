import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isHomePage = location.pathname === '/';  

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header en todas las páginas excepto login */}
      {!isLoginPage && <Header />}
      
      <main style={{ 
        flex: 1,
        // Home ya tiene su propio fondo, no necesitamos sobrescribirlo
        backgroundColor: isHomePage ? 'transparent' : '#ECF0F1'
      }}>
        {children}
      </main>
      
      {/* Footer en todas las páginas excepto login */}
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;