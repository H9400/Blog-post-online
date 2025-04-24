
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (formData: { email: string; password: string }) => {
    // Here we would typically call an API to authenticate the user
    // For the demo, we'll just simulate a successful login
    console.log('Login form data:', formData);
    
    // Simulate API call delay
    setTimeout(() => {
      // Redirect to dashboard after successful login
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blog-heading mb-2">Welcome Back</h1>
          <p className="text-blog-text">
            Log in to your account to continue your journey with PennedPost
          </p>
        </div>
        <AuthForm type="login" onSubmit={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
