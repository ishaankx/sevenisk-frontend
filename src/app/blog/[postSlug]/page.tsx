// src/app/blog/[postSlug]/page.tsx

import { sanityClient, urlFor } from '@/lib/sanity.client';
import { SanityPostDetails, SanityImage } from '@/lib/types';
import {
  PortableText,
  PortableTextComponents,
  PortableTextBlockComponent,
} from '@portabletext/react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

// --- QUERY ---
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

// --- HELPERS ---
const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

// --- IMAGE PROPS ---
interface ImageComponentProps {
  value: SanityImage & { alt?: string };
}

// --- BLOCK PROPS ---
interface BlockComponentProps {
  children: React.ReactNode;
  value: { alignment?: 'center' | 'right' | 'justify' | 'left' };
}

// --- PORTABLE TEXT COMPONENTS ---
const ptComponents: PortableTextComponents = {
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

  block: {
    normal: (({ children, value }) => {
      const alignment = (value as { alignment?: 'center' | 'right' | 'justify' }).alignment;
      let alignmentClass = '';

      if (alignment === 'center') alignmentClass = 'text-center';
      else if (alignment === 'right') alignmentClass = 'text-right';
      else if (alignment === 'justify') alignmentClass = 'text-justify';

      return <p className={alignmentClass}>{children}</p>;
    }) as PortableTextBlockComponent, // ✅ Correct type cast
  },
};

// --- STATIC PARAMS ---
export async function generateStaticParams() {
  const slugs: string[] = await sanityClient.fetch(`
    *[_type == "post" && defined(slug.current)].slug.current
  `);
  return slugs.map((slug) => ({
    postSlug: slug,
  }));
}

// --- PAGE COMPONENT ---
export default async function BlogPostPage(props: { params: { postSlug: string } }) {
  console.log('BlogPostPage raw props:', JSON.stringify(props, null, 2));

  const slug = props?.params?.postSlug;

  if (!slug) notFound();

  const post = await sanityClient.fetch<SanityPostDetails>(postQuery, { slug });

  if (!post) notFound();

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

        <div
          className="prose prose-invert prose-lg max-w-none
                        prose-h1:text-brand-teal-dark prose-h2:text-brand-teal-dark
                        prose-a:text-brand-teal prose-strong:text-white
                        prose-blockquote:border-l-brand-teal"
        >
          <PortableText value={body} components={ptComponents} />
        </div>
      </div>
    </div>
  );
}

export const revalidate = 60;
