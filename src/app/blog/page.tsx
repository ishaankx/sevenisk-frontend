import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/api';
import { Post } from '@/lib/types';

// Helper function to create a simple text snippet
const createSnippet = (htmlContent: string, length = 150): string => {
  if (!htmlContent) return '';
  const text = htmlContent.replace(/<[^>]+>/g, ''); // Strip HTML tags
  return text.length > length ? text.substring(0, length) + '...' : text;
};

// This is a React Server Component
async function BlogPage() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    const response = await getBlogPosts();
    posts = response.data;
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    error = "Failed to load blog posts. Please try again later.";
  }

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-5">
        <h1 className="sub-title mb-12">Blog</h1>

        {error && (
          <div className="text-center text-red-400 text-lg">
            <p>{error}</p>
          </div>
        )}

        {!error && posts.length === 0 && (
          <div className="text-center text-dark-text text-lg">
            <p>No blog posts found. Check back soon!</p>
          </div>
        )}

        {!error && posts.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id}>
                <div className="bg-dark-card p-6 rounded-lg h-full flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
                  <div>
                    {post.imageUrl && (
                      <Image 
                        src={post.imageUrl} 
                        alt={post.title} 
                        width={600}
                        height={400}
                        className="w-full h-48 object-cover rounded-md mb-4" 
                      />
                    )}
                    <h3 className="text-2xl font-semibold mb-3 text-white">{post.title}</h3>
                    <p className="text-dark-text mb-4">
                      {createSnippet(post.content)}
                    </p>
                  </div>
                  <span className="text-brand-teal-hover font-semibold">
                    Read more &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPage;