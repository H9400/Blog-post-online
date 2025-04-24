
import React, { createContext, useContext, useState, useEffect } from 'react';
import { blogService } from '@/services/blogService';
import { BlogPost } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface BlogContextType {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  getAllPosts: () => Promise<void>;
  getPostById: (id: string) => Promise<BlogPost | null>;
  createPost: (postData: Partial<BlogPost>) => Promise<BlogPost | null>;
  updatePost: (id: string, postData: Partial<BlogPost>) => Promise<BlogPost | null>;
  deletePost: (id: string) => Promise<boolean>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const getAllPosts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await blogService.getAllPosts();
      
      if (response.success && response.data) {
        setPosts(response.data);
      } else {
        setError(response.error || 'Failed to fetch posts');
        toast({
          title: "Error",
          description: response.error || "Failed to fetch posts",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Get all posts error:", error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getPostById = async (id: string): Promise<BlogPost | null> => {
    try {
      const response = await blogService.getPostById(id);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast({
          title: "Error",
          description: response.error || `Failed to fetch post with id: ${id}`,
          variant: "destructive",
        });
        return null;
      }
    } catch (error) {
      console.error(`Get post by id ${id} error:`, error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  const createPost = async (postData: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await blogService.createPost(postData);
      
      if (response.success && response.data) {
        // Update posts list with the new post
        setPosts(prevPosts => [...prevPosts, response.data]);
        
        toast({
          title: "Success",
          description: "Post created successfully",
        });
        
        return response.data;
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to create post",
          variant: "destructive",
        });
        
        return null;
      }
    } catch (error) {
      console.error("Create post error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  const updatePost = async (id: string, postData: Partial<BlogPost>): Promise<BlogPost | null> => {
    try {
      const response = await blogService.updatePost(id, postData);
      
      if (response.success && response.data) {
        // Update posts list with the updated post
        setPosts(prevPosts => 
          prevPosts.map(post => post.id === id ? response.data : post)
        );
        
        toast({
          title: "Success",
          description: "Post updated successfully",
        });
        
        return response.data;
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to update post",
          variant: "destructive",
        });
        
        return null;
      }
    } catch (error) {
      console.error(`Update post ${id} error:`, error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return null;
    }
  };

  const deletePost = async (id: string): Promise<boolean> => {
    try {
      const response = await blogService.deletePost(id);
      
      if (response.success) {
        // Remove post from posts list
        setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
        
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
        
        return true;
      } else {
        toast({
          title: "Error",
          description: response.error || "Failed to delete post",
          variant: "destructive",
        });
        
        return false;
      }
    } catch (error) {
      console.error(`Delete post ${id} error:`, error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    }
  };

  // Load posts on initial render
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <BlogContext.Provider
      value={{
        posts,
        loading,
        error,
        getAllPosts,
        getPostById,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
