
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (formData: { email: string; password: string }) => {
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Redirect to dashboard will happen automatically due to the useEffect
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    }
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
