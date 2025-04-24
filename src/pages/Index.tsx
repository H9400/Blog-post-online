
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import BlogCard from '@/components/BlogCard';
import { BlogPost } from '@/types';
import { generateMockPosts } from '@/utils/mockData';

const Index: React.FC = () => {
  // Generate mock posts for demonstration
  const featuredPosts: BlogPost[] = generateMockPosts(1);
  const recentPosts: BlogPost[] = generateMockPosts(6).slice(1);

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blog-primary to-blog-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to PennedPost
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              A modern platform for readers and writers to connect through the power of words.
              Share your thoughts, stories, and insights with the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="bg-white text-blog-primary hover:bg-gray-100">
                  Start Writing
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Explore Posts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blog-heading mb-8">Featured Post</h2>
          {featuredPosts.map(post => (
            <BlogCard key={post.id} post={post} featured />
          ))}
        </div>
      </section>
      
      {/* Recent Posts Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-blog-heading">Recent Posts</h2>
            <Link to="/blog" className="text-blog-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blog-primary rounded-lg p-8 md:p-12">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Ready to share your story?
              </h2>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Join our community of writers and readers. Create an account to start writing and engage with content that matters to you.
              </p>
              <Link to="/register">
                <Button size="lg" className="bg-white text-blog-primary hover:bg-gray-100">
                  Create an Account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold">PennedPost</h2>
              <p className="text-gray-300">Share your voice with the world</p>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link to="/blog" className="text-gray-300 hover:text-white">Blog</Link>
              <Link to="/login" className="text-gray-300 hover:text-white">Log In</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Sign Up</Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} PennedPost. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
