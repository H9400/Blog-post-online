
import { BlogPost, MockBlogPost } from '@/types';

// Sample content for demonstration
const sampleContent = `
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in vestibulum tortor, vitae venenatis lectus. Praesent gravida dapibus neque sit amet molestie. Morbi blandit eu dolor a luctus. Vestibulum sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien, condimentum ut imperdiet vel, aliquet id ante. In vitae justo et neque vestibulum pharetra. Proin in nulla at ante aliquet mollis. Proin ut neque eleifend, vehicula justo quis, elementum orci.</p>

<p>Nunc condimentum sollicitudin ante, at gravida neque vehicula at. Nunc viverra ornare arcu. Praesent egestas feugiat viverra. Donec vehicula at neque sagittis aliquam. Phasellus nec tempus dui. Vivamus id nulla fringilla, scelerisque magna a, interdum lacus. Pellentesque quis justo feugiat, posuere ante id, pharetra neque.</p>

<h2>Heading Level 2</h2>

<p>Sed consequat sollicitudin ipsum eget tempus. Integer a aliquet velit. In justo nibh, pellentesque non suscipit eget, gravida a metus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus id neque interdum, mollis sapien et, ullamcorper nisi.</p>

<p>Nullam pharetra, arcu vel bibendum dapibus, velit tellus commodo neque, vel blandit felis nibh eget ante. Nulla facilisis, arcu eget euismod auctor, tellus quam suscipit sapien, vitae facilisis leo ipsum a sapien. Phasellus nunc diam, vehicula a turpis vel, porta faucibus sapien.</p>

<h3>Heading Level 3</h3>

<p>Sed auctor congue lorem, non feugiat massa tincidunt eget. Praesent facilisis ut justo vitae convallis. Fusce quis orci ut mi scelerisque ornare quis quis felis. Vestibulum ornare tempor metus, non congue magna volutpat suscipit. Nam et purus ultrices, aliquam dui eget, tincidunt ipsum.</p>

<blockquote>
  <p>This is a blockquote. Morbi blandit eu dolor a luctus. Vestibulum sollicitudin elit ac nunc scelerisque rhoncus. Nulla felis sapien, condimentum ut imperdiet vel, aliquet id ante.</p>
</blockquote>

<p>Praesent ac sapien non eros rutrum hendrerit vel vel est. Suspendisse et ipsum eget est placerat dictum eu ac lorem. Aliquam pulvinar eleifend lectus, quis facilisis metus laoreet et.</p>
`;

// Sample authors
const sampleAuthors = [
  {
    id: '1',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

// Sample titles
const sampleTitles = [
  'The Art of Effective Communication in the Digital Age',
  'How Artificial Intelligence is Reshaping Our World',
  'Sustainable Living: Small Changes with Big Impact',
  'The Science Behind Productive Habits',
  'Exploring the Future of Remote Work',
  'Mindfulness and Mental Health: Finding Balance in a Busy World',
  'Travel Tips for the Budget-Conscious Explorer',
  'Understanding Blockchain Beyond Cryptocurrency',
  'The Evolution of Social Media and Its Impact on Society',
  'Nutrition Myths Debunked: What Science Actually Says',
];

// Sample tags
const sampleTags = [
  'Technology', 'Health', 'Productivity', 'Environment',
  'Travel', 'Business', 'Science', 'Culture', 'Food',
  'Finance', 'Self-improvement', 'Art', 'History', 'Politics',
];

// Sample cover images
const sampleCoverImages = [
  'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
  'https://images.unsplash.com/photo-1542435503-956c469947f6',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
];

// Function to generate random date within the past year
const randomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const timestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  return new Date(timestamp).toISOString();
};

// Function to get random items from an array
const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Function to generate mock blog posts
export const generateMockPosts = (count: number): BlogPost[] => {
  const mockPosts: BlogPost[] = [];

  for (let i = 0; i < count; i++) {
    const author = sampleAuthors[Math.floor(Math.random() * sampleAuthors.length)];
    const title = sampleTitles[Math.floor(Math.random() * sampleTitles.length)];
    const createdAt = randomDate();
    const tags = getRandomItems(sampleTags, Math.floor(Math.random() * 4) + 1);
    const coverImage = sampleCoverImages[Math.floor(Math.random() * sampleCoverImages.length)];

    mockPosts.push({
      id: `post-${i + 1}`,
      title,
      content: sampleContent,
      excerpt: sampleContent.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
      author,
      createdAt,
      updatedAt: createdAt,
      coverImage: Math.random() > 0.2 ? coverImage : undefined, // Some posts without cover image
      tags,
    });
  }

  return mockPosts;
};
