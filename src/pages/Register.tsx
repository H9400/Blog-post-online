
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (formData: { name?: string; email: string; password: string }) => {
    try {
      if (!formData.name) {
        toast({
          title: "Error",
          description: "Name is required",
          variant: "destructive",
        });
        return;
      }

      const success = await register(formData.name, formData.email, formData.password);
      
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
