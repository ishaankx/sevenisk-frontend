import { sanityClient, urlFor } from '@/lib/sanity.client';
import { SanityPostDetails, SanityImage } from '@/lib/types';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

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

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

interface ImageComponentProps {
  value: SanityImage & { alt?: string };
}

const ptComponents = {
  types: {
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

// PASTE THIS IN src/app/blog/[slug]/page.tsx

export async function generateStaticParams() {
  // 1. Fetch *only* an array of slug strings
  const slugs: string[] = await sanityClient.fetch(`
    *[_type == "post" && defined(slug.current)].slug.current
  `);

  // 2. Map the strings into the object shape Next.js requires
  return slugs.map(slug => ({
    slug: slug,
  }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!params?.slug) {
    console.error('Slug is missing from params');
    notFound();
  }

  const post = await sanityClient.fetch<SanityPostDetails>(postQuery, { slug: params.slug });

  if (!post) {
    notFound();
  }

  const { title, mainImage, body, publishedAt, authorName, authorImage } = post;

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-5 max-w-4xl">
        <Image
          src={urlFor(mainImage).width(1200).height(600).url()}
          alt={title}
          width={1200}
          height={600}
          className="w-full h-auto max-h-[500px] object-cover rounded-lg mb-8"
        />

        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-brand-teal">{title}</h1>

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
            <span>{formatDate(publishedAt)}</span>
          </div>
        </div>

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

export const revalidate = 60;
