import { sanityClient, urlFor } from '@/lib/sanity.client';
import { SanityPostDetails, SanityImage } from '@/lib/types'; // <-- Import new types
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// This query fetches the single post
const postQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  body,
  publishedAt,
  "authorName": author->name,
  "authorImage": author->image
}`;

// Function to format dates
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// --- FIX: Strongly type the 'value' prop ---
interface ImageComponentProps {
  value: SanityImage & { alt?: string };
}

// Define component for rendering images in the blog body
const ptComponents = {
  types: {
    // FIX: value is now strongly typed
    image: ({ value }: ImageComponentProps) => ( 
      <Image
        src={urlFor(value).url()}
        alt={value.alt || 'Blog Post Image'}
        width={1000}
        height={600}
        className="rounded-lg my-8"
      />
    ),
  },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  // FIX: Fetch with the correct type
  const post = await sanityClient.fetch<SanityPostDetails>(postQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }
  
  // FIX: Destructure the new properties, which are now valid
  const { title, mainImage, body, publishedAt, authorName, authorImage } = post;

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-5 max-w-4xl">
        {/* Header Image */}
        <Image
          src={urlFor(mainImage).width(1200).height(600).url()}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
        />
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-teal">{title}</h1>
        
        {/* Author Byline */}
        <div className="flex items-center mb-8">
          {authorImage && (
            <Image
              src={urlFor(authorImage).width(50).height(50).url()}
              alt={authorName}
              width={50}
              height={50}
              className="rounded-full mr-4"
            />
          )}
          <div className="text-dark-text">
            <span>By {authorName}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(publishedAt)}</span> {/* <-- FIX: This now works */}
          </div>
        </div>

        {/* Main Content */}
        <div className="prose prose-invert prose-lg max-w-none
                        prose-h1:text-brand-teal-dark prose-h2:text-brand-teal-dark
                        prose-a:text-brand-teal prose-strong:text-white
                        prose-blockquote:border-l-brand-teal">
          <PortableText value={body} components={ptComponents} />
        </div>
      </div>
    </div>
  );
}

// Revalidate the page every 60 seconds on vercel
export const revalidate = 60;