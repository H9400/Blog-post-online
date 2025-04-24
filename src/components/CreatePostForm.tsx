
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CreatePostFormProps {
  onSubmit: (formData: { title: string; content: string; coverImage?: string }) => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Content is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit form
      onSubmit({
        title,
        content,
        coverImage: coverImage || undefined,
      });

      // Simulate API call
      setTimeout(() => {
        toast({
          title: "Success!",
          description: "Your post has been created successfully.",
        });
        setIsSubmitting(false);
      }, 1500);

    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Post Title
            </label>
            <input
              id="title"
              type="text"
              className="form-input"
              placeholder="Enter your post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image URL (optional)
            </label>
            <input
              id="coverImage"
              type="text"
              className="form-input"
              placeholder="https://example.com/image.jpg"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Post Content
            </label>
            <textarea
              id="content"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-primary/20 focus:border-blog-primary min-h-[300px]"
              placeholder="Write your post content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : 'Publish Post'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
