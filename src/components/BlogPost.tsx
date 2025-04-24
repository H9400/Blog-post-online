
import React from 'react';
import { BlogPost as BlogPostType } from '@/types';

interface BlogPostProps {
  post: BlogPostType;
}

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  // Format date to be more readable
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="blog-container my-8">
      {/* Post header */}
      <header className="mb-8">
        <h1 className="blog-title mb-4">{post.title}</h1>
        
        <div className="flex items-center mb-6">
          {post.author.avatar && (
            <img 
              src={post.author.avatar} 
              alt={post.author.name} 
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div>
            <p className="font-medium text-blog-heading">{post.author.name}</p>
            <p className="text-sm text-blog-muted">{formattedDate}</p>
          </div>
        </div>
        
        {post.coverImage && (
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md mb-8" 
          />
        )}
      </header>

      {/* Post content */}
      <div 
        className="prose max-w-none text-blog-text"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      
      {/* Post footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </footer>
    </article>
  );
};

export default BlogPost;
