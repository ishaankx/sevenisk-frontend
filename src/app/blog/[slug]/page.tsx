import { getBlogPostBySlug } from '@/lib/api';
import { Post } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';

// Function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// This is also a React Server Component
async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
  let post: Post | null = null;

  try {
    const response = await getBlogPostBySlug(slug);
    post = response.data;
  } catch (error) {
    console.error(`Failed to fetch post: ${slug}`, error);
    notFound(); 
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-5 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-teal">{post.title}</h1>
        
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-dark-text mb-8">
          {post.author && (
            <span className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="mr-2" /> {post.author.name || 'Admin'}
            </span>
          )}
          <span className="flex items-center">
            <FontAwesomeIcon icon={faCalendarDays} className="mr-2" /> {formatDate(post.createdAt)}
          </span>
        </div>

        {post.imageUrl && (
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            width={1200}
            height={600}
            className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8" 
          />
        )}

        {/* Render the blog content. 
          The 'prose' classes come from the @tailwindcss/typography plugin,
          which you'll need to install: npm install -D @tailwindcss/typography
          (Make sure to add it to your tailwind.config.ts or globals.css if using v4)
        */}
        <div
          className="prose prose-invert prose-lg max-w-none
                     prose-h1:text-brand-teal-dark prose-h2:text-brand-teal-dark
                     prose-a:text-brand-teal prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        <Link href="/blog" className="btn inline-block border border-brand-teal-dark py-3 px-8 rounded-md text-white mt-12 transition-all duration-500 hover:bg-brand-teal-dark">
          &larr; Back to Blog
        </Link>
      </div>
    </div>
  );
}

export default BlogPostPage;