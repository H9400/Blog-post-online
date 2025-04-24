
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (formData: { name?: string; email: string; password: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Basic validation
      if (type === 'register' && !name.trim()) {
        toast({
          title: "Error",
          description: "Name is required",
          variant: "destructive",
        });
        return;
      }

      if (!email.trim()) {
        toast({
          title: "Error",
          description: "Email is required",
          variant: "destructive",
        });
        return;
      }

      if (!password.trim() || password.length < 6) {
        toast({
          title: "Error",
          description: "Password must be at least 6 characters",
          variant: "destructive",
        });
        return;
      }

      // Submit form
      if (type === 'register') {
        onSubmit({ name, email, password });
      } else {
        onSubmit({ email, password });
      }

      // Simulate API call
      setTimeout(() => {
        toast({
          title: type === 'login' ? "Logged in!" : "Registration successful!",
          description: type === 'login' 
            ? "Welcome back to PennedPost!" 
            : "Your account has been created successfully.",
        });
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {type === 'login' ? 'Log In' : 'Create an Account'}
        </CardTitle>
        <CardDescription>
          {type === 'login' 
            ? 'Enter your credentials to access your account' 
            : 'Fill in your details to get started with PennedPost'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'register' && (
            <div className="form-input-container">
              <input
                id="name"
                type="text"
                className="form-input"
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
              <label htmlFor="name">Full Name</label>
            </div>
          )}
          
          <div className="form-input-container">
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="email">Email</label>
          </div>
          
          <div className="form-input-container">
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <label htmlFor="password">Password</label>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading
              ? type === 'login' ? 'Logging in...' : 'Signing up...'
              : type === 'login' ? 'Log In' : 'Sign Up'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        {type === 'login' ? (
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blog-primary hover:underline">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blog-primary hover:underline">
              Log in
            </Link>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AuthForm;
