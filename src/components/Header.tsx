
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, loading, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blog-primary">
              PennedPost
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blog-primary font-medium">
              Home
            </Link>
            <Link to="/blog" className="text-gray-700 hover:text-blog-primary font-medium">
              Blog
            </Link>
            
            {!loading && isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blog-primary font-medium">
                  Dashboard
                </Link>
                <Link to="/create-post" className="text-gray-700 hover:text-blog-primary font-medium">
                  Write
                </Link>
                <Link to="/settings" className="text-gray-700 hover:text-blog-primary font-medium">
                  <Settings size={20} />
                </Link>
                <Button onClick={handleLogout} variant="outline">Sign Out</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blog-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="text-gray-700 hover:text-blog-primary font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              
              {!loading && isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-gray-700 hover:text-blog-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/create-post" 
                    className="text-gray-700 hover:text-blog-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Write
                  </Link>
                  <Link 
                    to="/settings" 
                    className="text-gray-700 hover:text-blog-primary font-medium py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Settings
                  </Link>
                  <Button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    variant="outline" 
                    className="w-full"
                  >
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="outline" className="w-full">Log In</Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="block w-full"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
