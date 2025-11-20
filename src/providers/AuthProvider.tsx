import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      const email = authService.getCurrentUser();
      setIsAuthenticated(authenticated);
      setUserEmail(email);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const response = await authService.sendOtp(email);
      if (response.success) {
        // OTP sent, user needs to verify
        setIsLoading(false);
      } else {
        throw new Error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const verifyOtp = async (otp: string) => {
    setIsLoading(true);
    try {
      const response = await authService.verifyOtp(otp);
      if (response.success && response.token) {
        const email = sessionStorage.getItem('userEmail');
        setIsAuthenticated(true);
        setUserEmail(email);
        setIsLoading(false);
      } else {
        throw new Error(response.message || 'Invalid OTP');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await authService.googleAuth();
      if (response.success) {
        setIsAuthenticated(true);
        setUserEmail(response.email || null);
        setIsLoading(false);
      } else {
        throw new Error(response.message || 'Google authentication failed');
      }
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userEmail,
        isLoading,
        login,
        verifyOtp,
        googleLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
