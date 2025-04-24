
// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Authentication types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  tags?: string[];
}

// For mock data generation
export interface MockBlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  authorId: string;
  authorName: string;
  authorEmail: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  tags?: string[];
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Backend connection types
export interface BackendConfig {
  type: 'supabase' | 'mongodb';
  url: string;
  apiKey?: string;
}
