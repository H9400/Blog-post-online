
import { BlogPost, ApiResponse } from '@/types';

// Interface for blog post methods
interface BlogMethods {
  getAllPosts: () => Promise<ApiResponse<BlogPost[]>>;
  getPostById: (id: string) => Promise<ApiResponse<BlogPost>>;
  createPost: (postData: Partial<BlogPost>) => Promise<ApiResponse<BlogPost>>;
  updatePost: (id: string, postData: Partial<BlogPost>) => Promise<ApiResponse<BlogPost>>;
  deletePost: (id: string) => Promise<ApiResponse<null>>;
}

// Supabase blog implementation
class SupabaseBlog implements BlogMethods {
  async getAllPosts(): Promise<ApiResponse<BlogPost[]>> {
    try {
      // This would be replaced with actual Supabase client code after integration
      console.log('Supabase: Getting all posts');
      
      // Simulate fetching posts
      const posts = [
        {
          id: 'supabase-post-1',
          title: 'Supabase Post 1',
          content: 'This is a post from Supabase',
          excerpt: 'This is a post excerpt',
          author: {
            id: 'supabase-user-1',
            name: 'Supabase User',
            email: 'user@example.com'
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['supabase', 'tutorial']
        }
      ];
      
      return { success: true, data: posts };
    } catch (error) {
      console.error('Supabase get all posts error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error fetching posts' 
      };
    }
  }

  async getPostById(id: string): Promise<ApiResponse<BlogPost>> {
    try {
      console.log(`Supabase: Getting post with id ${id}`);
      
      // Simulate fetching a post
      const post = {
        id,
        title: `Supabase Post ${id}`,
        content: 'This is a post from Supabase',
        excerpt: 'This is a post excerpt',
        author: {
          id: 'supabase-user-1',
          name: 'Supabase User',
          email: 'user@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['supabase', 'tutorial']
      };
      
      return { success: true, data: post };
    } catch (error) {
      console.error(`Supabase get post ${id} error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error fetching post' 
      };
    }
  }

  async createPost(postData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    try {
      console.log('Supabase: Creating post', postData);
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }
      
      // Simulate creating a post
      const newPost = {
        id: 'supabase-post-' + Date.now(),
        title: postData.title || 'Untitled',
        content: postData.content || '',
        excerpt: postData.excerpt || postData.content?.substring(0, 100) || '',
        author: {
          id: 'supabase-user-1',
          name: 'Supabase User',
          email: 'user@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: postData.coverImage,
        tags: postData.tags || []
      };
      
      return { success: true, data: newPost };
    } catch (error) {
      console.error('Supabase create post error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error creating post' 
      };
    }
  }

  async updatePost(id: string, postData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    try {
      console.log(`Supabase: Updating post ${id}`, postData);
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }
      
      // Simulate updating a post
      const updatedPost = {
        id,
        title: postData.title || 'Untitled',
        content: postData.content || '',
        excerpt: postData.excerpt || postData.content?.substring(0, 100) || '',
        author: {
          id: 'supabase-user-1',
          name: 'Supabase User',
          email: 'user@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: postData.coverImage,
        tags: postData.tags || []
      };
      
      return { success: true, data: updatedPost };
    } catch (error) {
      console.error(`Supabase update post ${id} error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error updating post' 
      };
    }
  }

  async deletePost(id: string): Promise<ApiResponse<null>> {
    try {
      console.log(`Supabase: Deleting post ${id}`);
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }
      
      // Simulate deleting a post
      return { success: true };
    } catch (error) {
      console.error(`Supabase delete post ${id} error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error deleting post' 
      };
    }
  }
}

// MongoDB blog implementation
class MongoDBBlog implements BlogMethods {
  private apiUrl: string;
  
  constructor(apiUrl: string = 'http://localhost:3000/api') {
    this.apiUrl = apiUrl;
  }

  async getAllPosts(): Promise<ApiResponse<BlogPost[]>> {
    try {
      console.log('MongoDB: Getting all posts');
      
      // This would make an actual API call to your MongoDB Express backend
      // const response = await fetch(`${this.apiUrl}/posts`);
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const posts = [
        {
          id: 'mongo-post-1',
          title: 'MongoDB Post 1',
          content: 'This is a post from MongoDB',
          excerpt: 'This is a post excerpt',
          author: {
            id: 'mongo-user-1',
            name: 'MongoDB User',
            email: 'user@example.com'
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tags: ['mongodb', 'tutorial']
        }
      ];
      
      return { success: true, data: posts };
    } catch (error) {
      console.error('MongoDB get all posts error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error fetching posts' 
      };
    }
  }

  async getPostById(id: string): Promise<ApiResponse<BlogPost>> {
    try {
      console.log(`MongoDB: Getting post with id ${id}`);
      
      // This would make an actual API call to your MongoDB Express backend
      // const response = await fetch(`${this.apiUrl}/posts/${id}`);
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const post = {
        id,
        title: `MongoDB Post ${id}`,
        content: 'This is a post from MongoDB',
        excerpt: 'This is a post excerpt',
        author: {
          id: 'mongo-user-1',
          name: 'MongoDB User',
          email: 'user@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: ['mongodb', 'tutorial']
      };
      
      return { success: true, data: post };
    } catch (error) {
      console.error(`MongoDB get post ${id} error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error fetching post' 
      };
    }
  }

  async createPost(postData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    try {
      console.log('MongoDB: Creating post', postData);
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }
      
      // This would make an actual API call to your MongoDB Express backend
      // const response = await fetch(`${this.apiUrl}/posts`, {
      //   method: 'POST',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(postData),
      // });
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const newPost = {
        id: 'mongo-post-' + Date.now(),
        title: postData.title || 'Untitled',
        content: postData.content || '',
        excerpt: postData.excerpt || postData.content?.substring(0, 100) || '',
        author: {
          id: 'mongo-user-1',
          name: 'MongoDB User',
          email: 'user@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: postData.coverImage,
        tags: postData.tags || []
      };
      
      return { success: true, data: newPost };
    } catch (error) {
      console.error('MongoDB create post error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error creating post' 
      };
    }
  }

  async updatePost(id: string, postData: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> {
    try {
      console.log(`MongoDB: Updating post ${id}`, postData);
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }
      
      // This would make an actual API call to your MongoDB Express backend
      // const response = await fetch(`${this.apiUrl}/posts/${id}`, {
      //   method: 'PUT',
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(postData),
      // });
      // const data = await response.json();
      
      // For demonstration, we'll simulate a successful response
      const updatedPost = {
        id,
        title: postData.title || 'Untitled',
        content: postData.content || '',
        excerpt: postData.excerpt || postData.content?.substring(0, 100) || '',
        author: {
          id: 'mongo-user-1',
          name: 'MongoDB User',
          email: 'user@example.com'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        coverImage: postData.coverImage,
        tags: postData.tags || []
      };
      
      return { success: true, data: updatedPost };
    } catch (error) {
      console.error(`MongoDB update post ${id} error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error updating post' 
      };
    }
  }

  async deletePost(id: string): Promise<ApiResponse<null>> {
    try {
      console.log(`MongoDB: Deleting post ${id}`);
      
      // Get token from localStorage
      const token = localStorage.getItem('authToken');
      if (!token) {
        return { success: false, error: 'Authentication required' };
      }
      
      // This would make an actual API call to your MongoDB Express backend
      // await fetch(`${this.apiUrl}/posts/${id}`, {
      //   method: 'DELETE',
      //   headers: { 'Authorization': `Bearer ${token}` },
      // });
      
      return { success: true };
    } catch (error) {
      console.error(`MongoDB delete post ${id} error:`, error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error deleting post' 
      };
    }
  }
}

// Blog provider factory
class BlogProvider {
  static getBlog(): BlogMethods {
    // Check if we have a stored backend type preference
    const backendType = localStorage.getItem('backendType') || 'supabase';
    
    // If Supabase is unreachable, fallback to MongoDB
    const isSupabaseAvailable = navigator.onLine; // Simple check - would be more sophisticated in real app
    
    if (backendType === 'supabase' && isSupabaseAvailable) {
      return new SupabaseBlog();
    } else {
      return new MongoDBBlog();
    }
  }
}

export const blogService = BlogProvider.getBlog();
