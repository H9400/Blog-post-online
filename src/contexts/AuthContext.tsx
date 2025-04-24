
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';
import { User, AuthState } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  const { toast } = useToast();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await authService.getCurrentUser();
        
        if (response.success && response.data) {
          setAuthState({
            isAuthenticated: true,
            user: response.data,
            loading: false,
          });
        } else {
          setAuthState({
            isAuthenticated: false,
            user: null,
            loading: false,
          });
        }
      } catch (error) {
        console.error("Auth check error:", error);
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.data) {
        setAuthState({
          isAuthenticated: true,
          user: response.data,
          loading: false,
        });
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${response.data.name || response.data.email}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Login failed",
          description: response.error || "Could not authenticate",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      
      toast({
        title: "Login error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const response = await authService.register(name, email, password);
      
      if (response.success && response.data) {
        setAuthState({
          isAuthenticated: true,
          user: response.data,
          loading: false,
        });
        
        toast({
          title: "Registration successful",
          description: `Welcome to PennedPost, ${name}!`,
        });
        
        return true;
      } else {
        toast({
          title: "Registration failed",
          description: response.error || "Could not create account",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      toast({
        title: "Registration error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const response = await authService.logout();
      
      if (response.success) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
        });
        
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
        
        return true;
      } else {
        toast({
          title: "Logout failed",
          description: response.error || "Could not log out",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error("Logout error:", error);
      
      toast({
        title: "Logout error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
