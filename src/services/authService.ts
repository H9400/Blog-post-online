
import { User, ApiResponse } from '@/types';

// Interface for authentication methods
interface AuthMethods {
  login: (email: string, password: string) => Promise<ApiResponse<User>>;
  register: (name: string, email: string, password: string) => Promise<ApiResponse<User>>;
  logout: () => Promise<ApiResponse<null>>;
  getCurrentUser: () => Promise<ApiResponse<User>>;
}

// Supabase authentication implementation
class SupabaseAuth implements AuthMethods {
  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      // This would be replaced with actual Supabase client code after integration
      console.log('Supabase login with:', { email, password });
      
      // Simulate successful login
      const user = {
        id: 'supabase-user-123',
        name: 'Supabase User',
        email,
      };
      
      // Store auth token in localStorage
      localStorage.setItem('authToken', 'mock-supabase-token');
      localStorage.setItem('backendType', 'supabase');
      
      return { success: true, data: user };
    } catch (error) {
      console.error('Supabase login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during login' 
      };
    }
  }

  async register(name: string, email: string, password: string): Promise<ApiResponse<User>> {
    try {
      // This would be replaced with actual Supabase client code after integration
      console.log('Supabase register with:', { name, email, password });
      
      // Simulate successful registration
      const user = {
        id: 'supabase-user-' + Date.now(),
        name,
        email,
      };
      
      // Store auth token in localStorage
      localStorage.setItem('authToken', 'mock-supabase-token');
      localStorage.setItem('backendType', 'supabase');
      
      return { success: true, data: user };
    } catch (error) {
      console.error('Supabase registration error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during registration' 
      };
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      // This would be replaced with actual Supabase client code after integration
      console.log('Supabase logout');
      
      // Clear auth data from localStorage
      localStorage.removeItem('authToken');
      
      return { success: true };
    } catch (error) {
      console.error('Supabase logout error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during logout' 
      };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // This would be replaced with actual Supabase client code after integration
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return { success: false, error: 'No authenticated user' };
      }
      
      // Simulate getting user data
      const user = {
        id: 'supabase-user-123',
        name: 'Supabase User',
        email: 'user@example.com',
      };
      
      return { success: true, data: user };
    } catch (error) {
      console.error('Supabase get current user error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error getting current user' 
      };
    }
  }
}

// MongoDB authentication implementation
class MongoDBAuth implements AuthMethods {
  private apiUrl: string;
  
  constructor(apiUrl: string = 'http://localhost:3000/api') {
    this.apiUrl = apiUrl;
  }

  async login(email: string, password: string): Promise<ApiResponse<User>> {
    try {
      console.log('MongoDB login with:', { email, password });
      
      // This would make an actual API call to your MongoDB Express backend
      // const response = await fetch(`${this.apiUrl}/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const user = {
        id: 'mongo-user-123',
        name: 'MongoDB User',
        email,
      };
      
      // Store auth token in localStorage
      localStorage.setItem('authToken', 'mock-mongodb-token');
      localStorage.setItem('backendType', 'mongodb');
      
      return { success: true, data: user };
    } catch (error) {
      console.error('MongoDB login error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during login' 
      };
    }
  }

  async register(name: string, email: string, password: string): Promise<ApiResponse<User>> {
    try {
      console.log('MongoDB register with:', { name, email, password });
      
      // This would make an actual API call to your MongoDB Express backend
      // const response = await fetch(`${this.apiUrl}/auth/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password }),
      // });
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const user = {
        id: 'mongo-user-' + Date.now(),
        name,
        email,
      };
      
      // Store auth token in localStorage
      localStorage.setItem('authToken', 'mock-mongodb-token');
      localStorage.setItem('backendType', 'mongodb');
      
      return { success: true, data: user };
    } catch (error) {
      console.error('MongoDB registration error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during registration' 
      };
    }
  }

  async logout(): Promise<ApiResponse<null>> {
    try {
      console.log('MongoDB logout');
      
      // Clear auth data from localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('backendType');
      
      return { success: true };
    } catch (error) {
      console.error('MongoDB logout error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error during logout' 
      };
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        return { success: false, error: 'No authenticated user' };
      }
      
      // This would make an actual API call to your MongoDB Express backend with the token
      // const response = await fetch(`${this.apiUrl}/auth/me`, {
      //   headers: { 'Authorization': `Bearer ${token}` },
      // });
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const user = {
        id: 'mongo-user-123',
        name: 'MongoDB User',
        email: 'user@example.com',
      };
      
      return { success: true, data: user };
    } catch (error) {
      console.error('MongoDB get current user error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error getting current user' 
      };
    }
  }
}

// Auth provider factory
class AuthProvider {
  static getAuth(): AuthMethods {
    // Check if we have a stored backend type preference
    const backendType = localStorage.getItem('backendType') || 'supabase';
    
    // If Supabase is unreachable, fallback to MongoDB
    const isSupabaseAvailable = navigator.onLine; // Simple check - would be more sophisticated in real app
    
    if (backendType === 'supabase' && isSupabaseAvailable) {
      return new SupabaseAuth();
    } else {
      return new MongoDBAuth();
    }
  }
}

export const authService = AuthProvider.getAuth();
