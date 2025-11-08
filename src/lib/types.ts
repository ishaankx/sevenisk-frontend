export interface Author {
  id: string;
  email: string;
  name?: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  published: boolean;
  imageUrl?: string;
  authorId: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

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