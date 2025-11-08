// --- NEW TYPES FOR SANITY ---

// Minimal type for a Sanity image
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

// Minimal type for a Sanity slug
export interface SanitySlug {
  _type: 'slug';
  current: string;
}

// Minimal type for Sanity's rich text array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SanityBody = any[]; // 'any' is acceptable for portable text

// This replaces your old 'Post' type.
// This is what our BLOG LIST PAGE query fetches.
export interface SanityPost {
  _id: string;
  title: string;
  slug: SanitySlug; // <-- This was 'string', now it's an object
  mainImage: SanityImage;
  excerpt?: string;
  publishedAt: string; // <-- This was missing
}

// This is what our SINGLE POST PAGE query fetches.
export interface SanityPostDetails {
  _id: string;
  title: string;
  slug: SanitySlug;
  mainImage: SanityImage;
  body: SanityBody;
  publishedAt: string; // <-- This was missing from the old type
  authorName: string;
  authorImage: SanityImage;
}


// --- Your existing types (no change) ---
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface CVRequestData {
  name: string;
  email: string;
}

export interface ApiResponse {
  message: string;
}