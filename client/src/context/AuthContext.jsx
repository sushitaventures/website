import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../services/apiClient.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkSession = async () => {
    // Only query admin session if on an admin route or previously flagged in session
    const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');
    const hasAdminFlag = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('sushita_admin_session') === 'true';

    if (!isAdminRoute && !hasAdminFlag) {
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.get('/admin/auth/me');
      if (res?.data?.user) {
        setUser(res.data.user);
        sessionStorage.setItem('sushita_admin_session', 'true');
      } else {
        setUser(null);
        sessionStorage.removeItem('sushita_admin_session');
      }
    } catch {
      setUser(null);
      sessionStorage.removeItem('sushita_admin_session');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (email, password) => {
    setError(null);
    try {
      const res = await apiClient.post('/admin/auth/login', { email, password });
      if (res?.data?.user) {
        setUser(res.data.user);
        sessionStorage.setItem('sushita_admin_session', 'true');
        return { success: true };
      }
      throw new Error(res?.message || 'Login failed');
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/admin/auth/logout', {});
    } catch {
      // Ignore network errors on logout
    } finally {
      setUser(null);
      sessionStorage.removeItem('sushita_admin_session');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        logout,
        checkSession
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
