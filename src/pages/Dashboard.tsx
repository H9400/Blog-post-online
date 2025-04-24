
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { BlogPost } from '@/types';
import { generateMockPosts } from '@/utils/mockData';

const Dashboard: React.FC = () => {
  // Mock user data - would typically come from auth context
  const user = {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  // Generate mock posts for demonstration
  const [userPosts, setUserPosts] = useState<BlogPost[]>(generateMockPosts(4));
  
  const deleteMockPost = (postId: string) => {
    setUserPosts(userPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* User profile section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-24 h-24 rounded-full" 
            />
            <div>
              <h1 className="text-2xl font-bold text-blog-heading">{user.name}</h1>
              <p className="text-blog-muted mb-4">{user.email}</p>
              <div className="flex gap-4">
                <Link to="/profile/edit">
                  <Button variant="outline">Edit Profile</Button>
                </Link>
                <Link to="/create-post">
                  <Button>New Post</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Posts management section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-blog-heading">Your Posts</h2>
            <Link to="/create-post">
              <Button variant="outline" size="sm">
                Create New Post
              </Button>
            </Link>
          </div>
          
          {userPosts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <h3 className="text-xl font-medium text-blog-heading mb-2">No posts yet</h3>
              <p className="text-blog-text mb-6">Start creating amazing content today!</p>
              <Link to="/create-post">
                <Button>Write Your First Post</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {userPosts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-blog-heading">{post.title}</h3>
                    <p className="text-sm text-blog-muted">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="ghost" size="sm">View</Button>
                    </Link>
                    <Link to={`/edit-post/${post.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => deleteMockPost(post.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
