import Link from 'next/link';
import Image from 'next/image';
import { sanityClient, urlFor } from '@/lib/sanity.client';
import { SanityPost } from '@/lib/types'; // <-- Import the new type

// This is the GROQ query to fetch posts from Sanity
const postsQuery = `*[_type == "post" && publishedAt < now()] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
}`;

// Helper function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export default async function BlogPage() {
  // Use the new SanityPost type to strongly type our fetched data
  const posts: SanityPost[] = await sanityClient.fetch(postsQuery);

  return (
    <div className="pt-32 pb-20 min-h-screen">
      <div className="container mx-auto px-5">
        <h1 className="sub-title mb-12">The Blog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {posts.map((post) => (
            <Link 
              href={`/blog/${post.slug.current}`} // <-- FIX: Use post.slug.current
              key={post._id}
            >
              {/* Impressive Card Component */}
              <div className="bg-dark-card rounded-lg overflow-hidden group h-full flex flex-col">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(400).height(300).url()}
                    alt={post.title}
                    fill // 'fill' is better than layout="fill" in Next 14
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-brand-teal transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-dark-text text-sm mb-4 grow"> {/* FIX: 'grow' is the v4 class */}
                    {post.excerpt}
                  </p>
                  <span className="text-xs text-dark-text">
                    {formatDate(post.publishedAt)} {/* <-- FIX: This now works */}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Revalidate the page every 60 seconds
export const revalidate = 60;