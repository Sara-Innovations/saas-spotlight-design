import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  customername: string;
  customeremail: string;
  customermobile: string;
  user_roll_type: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  handleSSOToDashboard: () => Promise<void>;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  isLoginModalOpen: boolean;
  openRegisterModal: () => void;
  closeRegisterModal: () => void;
  isRegisterModalOpen: boolean;
  register: (userData: any) => Promise<{ success: boolean; message?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = import.meta.env.VITE_BARGAIN_URL || 'http://bargainshop.test';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('bargain_token');
    const storedUser = localStorage.getItem('bargain_user');
    
    // Defensive check: Clear "undefined" or malformed strings from localStorage
    if (storedToken === 'undefined' || !storedToken) {
      localStorage.removeItem('bargain_token');
      localStorage.removeItem('bargain_user');
      setToken(null);
      setUser(null);
    } else if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('bargain_token');
        localStorage.removeItem('bargain_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);

      const response = await fetch(`${API_BASE_URL}/api/Api_auth/login`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      // Technical check: Ensure response is actually JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Non-JSON response received:', text);
        return { success: false, message: 'Server error: Invalid response format' };
      }

      const data = await response.json();

      if (data.status === 'success' && data.token) {
        const receivedToken = data.token;
        
        // Store in localStorage
        localStorage.setItem('bargain_token', receivedToken);
        
        // Create user object from response with full metadata for immediate UI update
        const userData: User = {
          id: data.customer_id || '',
          username: data.username || email,
          customername: data.customername || '',
          customeremail: data.customeremail || email,
          customermobile: data.customermobile || '',
          user_roll_type: data.user_roll_type || 'user',
        };
        
        localStorage.setItem('bargain_user', JSON.stringify(userData));
        setToken(receivedToken);
        setUser(userData);
        
        return { success: true };
      } else {
        return { success: false, message: data.msg || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const register = async (userData: any): Promise<{ success: boolean; message?: string }> => {
    try {
      const formData = new FormData();
      formData.append('fname', userData.fname);
      formData.append('lname', userData.lname);
      formData.append('email', userData.email);
      formData.append('mobile', userData.mobile);
      formData.append('password', userData.password);

      const response = await fetch(`${API_BASE_URL}/api/Api_auth/register`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Non-JSON response received:', text);
        return { success: false, message: 'Server error: Invalid response format' };
      }

      const data = await response.json();

      if (data.status === 'success') {
        return { success: true, message: data.msg };
      } else {
        return { success: false, message: data.msg || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error. Please try again.' };
    }
  };

  const handleSSOToDashboard = async () => {
    if (!token || token === 'undefined') {
      console.warn('Cannot perform SSO: Token is missing or invalid');
      localStorage.removeItem('bargain_token');
      setToken(null);
      openLoginModal();
      return;
    }

    // Direct Browser-to-Backend Handshake:
    // We navigate directly to the SSO bridge endpoint with the token.
    window.location.href = `${API_BASE_URL}/api/Api_auth/sso?token=${token}`;
  };

  const logout = () => {
    localStorage.removeItem('bargain_token');
    localStorage.removeItem('bargain_user');
    setToken(null);
    setUser(null);
    
    // Call backend logout
    fetch(`${API_BASE_URL}/login/logout`, { credentials: 'include' }).catch(console.error);
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };
  const closeRegisterModal = () => setIsRegisterModalOpen(false);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    logout,
    handleSSOToDashboard,
    openLoginModal,
    closeLoginModal,
    isLoginModalOpen,
    openRegisterModal,
    closeRegisterModal,
    isRegisterModalOpen,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
