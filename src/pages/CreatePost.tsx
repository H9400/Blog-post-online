
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CreatePostForm from '@/components/CreatePostForm';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { createPost } = useBlog();
  const { isAuthenticated, loading } = useAuth();
  const { toast } = useToast();

  // Check if user is authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "You must be logged in to create a post",
        variant: "destructive",
      });
      navigate('/login');
    }
  }, [isAuthenticated, loading, navigate, toast]);

  const handleCreatePost = async (formData: { title: string; content: string; coverImage?: string }) => {
    try {
      // Generate excerpt from content
      const excerpt = formData.content.substring(0, 150) + (formData.content.length > 150 ? '...' : '');
      
      const post = await createPost({
        title: formData.title,
        content: formData.content,
        excerpt,
        coverImage: formData.coverImage,
      });
      
      if (post) {
        // Navigate to post detail page
        navigate(`/blog/${post.id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  // If still loading auth state, don't render form yet
  if (loading) {
    return (
      <div className="min-h-screen bg-blog-background">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blog-heading mb-2">Create a New Post</h1>
          <p className="text-blog-text">
            Share your thoughts and ideas with the world
          </p>
        </div>
        <CreatePostForm onSubmit={handleCreatePost} />
      </div>
    </div>
  );
};

export default CreatePost;
