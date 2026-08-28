import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../api/client.js';

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('lms_token'));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem('lms_token');
    return t ? decodeToken(t) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('lms_token', token);
      setUser(decodeToken(token));
    } else {
      localStorage.removeItem('lms_token');
      setUser(null);
    }
  }, [token]);

  async function login(email, password) {
    const data = await api.login({ email, password });
    setToken(data.access_token);
    return data;
  }

  async function register(payload) {
    return api.register(payload);
  }

  function logout() {
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
