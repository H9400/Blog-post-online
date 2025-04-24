
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, featured = false }) => {
  // Format date to be more readable
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link to={`/blog/${post.id}`}>
      <Card className={`blog-card h-full flex flex-col ${featured ? 'md:flex-row' : ''}`}>
        {post.coverImage && (
          <div className={`${featured ? 'md:w-2/5' : 'w-full'} overflow-hidden`}>
            <img
              src={post.coverImage}
              alt={post.title}
              className={`w-full h-48 object-cover ${featured ? 'md:h-full' : ''}`}
            />
          </div>
        )}
        <div className={`flex flex-col ${featured ? 'md:w-3/5' : 'w-full'}`}>
          <CardHeader>
            <h3 className="text-xl font-semibold line-clamp-2 text-blog-heading hover:text-blog-primary transition-colors">
              {post.title}
            </h3>
            <div className="flex items-center text-sm text-blog-muted">
              <span>{post.author.name}</span>
              <span className="mx-2">•</span>
              <span>{formattedDate}</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-blog-text line-clamp-3">{post.excerpt}</p>
          </CardContent>
          <CardFooter className="mt-auto pt-4">
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
