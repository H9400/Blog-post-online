
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CreatePostForm from '@/components/CreatePostForm';
import { useToast } from '@/hooks/use-toast';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreatePost = (formData: { title: string; content: string; coverImage?: string }) => {
    // Here we would typically call an API to create the post
    // For the demo, we'll just simulate a successful creation
    console.log('Create post form data:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to dashboard after successful post creation
      navigate('/dashboard');
    }, 1500);
  };

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
