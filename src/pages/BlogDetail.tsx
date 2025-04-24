
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import BlogPost from '@/components/BlogPost';
import { BlogPost as BlogPostType } from '@/types';
import { generateMockPosts } from '@/utils/mockData';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get the post by ID
    const fetchPost = () => {
      setLoading(true);
      
      setTimeout(() => {
        // For demo, generate a mock post with the requested ID
        const mockPosts = generateMockPosts(1);
        if (mockPosts.length > 0) {
          const mockPost = { ...mockPosts[0], id: id || '1' };
          setPost(mockPost);
        }
        setLoading(false);
      }, 500);
    };

    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen bg-blog-background">
      <Header />
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blog-primary"></div>
        </div>
      ) : post ? (
        <BlogPost post={post} />
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-blog-heading mb-4">Post Not Found</h2>
          <p className="text-blog-text">The post you're looking for doesn't exist or has been removed.</p>
        </div>
      )}
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <hr className="my-8" />
        
        {/* Add comment section or related posts here */}
        <div className="text-center text-blog-muted">
          End of article
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
