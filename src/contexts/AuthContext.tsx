/**
 * AuthContext — manages login state across the entire app.
 *
 * Provides: user data, login/logout/register functions, loading state.
 * On mount, checks localStorage for a saved token and fetches user profile.
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { apiGetMe, apiLogin, apiLogout, apiRegister } from '../services/api';
import type { UserData } from '../services/api';

interface AuthContextType {
  user: UserData | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (data: { username: string; email: string; password: string; display_name: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }
    try {
      const res = await apiGetMe();
      setUser(res.data);
    } catch {
      // Token invalid/expired — clean up
      localStorage.removeItem('access_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check for existing token on mount
  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const login = async (username: string, password: string) => {
    const res = await apiLogin(username, password);
    if (res.data) {
      localStorage.setItem('access_token', res.data.access_token);
      await refreshUser();
    }
  };

  const register = async (data: { username: string; email: string; password: string; display_name: string }) => {
    await apiRegister(data);
    // Auto-login after register
    await login(data.username, data.password);
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch {
      // Ignore errors — we're logging out anyway
    }
    localStorage.removeItem('access_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
