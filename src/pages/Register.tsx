
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (formData: { name?: string; email: string; password: string }) => {
    // Here we would typically call an API to register the user
    // For the demo, we'll just simulate a successful registration
    console.log('Registration form data:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to dashboard after successful registration
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blog-heading mb-2">Join PennedPost</h1>
          <p className="text-blog-text">
            Create an account to start sharing your thoughts with the world
          </p>
        </div>
        <AuthForm type="register" onSubmit={handleRegister} />
      </div>
    </div>
  );
};

export default Register;
