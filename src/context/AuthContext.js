import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const loginUser = (userData, tokenValue) => {
    setUser(userData);
    setToken(tokenValue);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenValue);
  };

  // Le cambié el nombre de logoutUser a logout para que no truene tu Header.jsx
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Creamos la variable isAdmin evaluando el rol del usuario logueado.
  // OJO: Asegúrate de que en tu base de datos el rol se llame exactamente 'admin'.
  const isAdmin = user?.rol === 'admin'; 

  return (
    // Agregamos isAdmin y el nuevo nombre de logout al provider
    <AuthContext.Provider value={{ user, token, loginUser, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}