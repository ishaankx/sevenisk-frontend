import axios from 'axios';
import { Post, ContactFormData, CVRequestData, ApiResponse } from './types';

const api = axios.create({
  baseURL: 'https://sevenisk-api.onrender.com', // Your deployed Nest.js backend
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all published blog posts
 */
export const getBlogPosts = () => api.get<Post[]>('/blog');

/**
 * Fetches a single blog post by its slug
 * (Assuming your API route is /blog/slug/:slug based on your backend files)
 */
export const getBlogPostBySlug = (slug: string) => api.get<Post>(`/blog/slug/${slug}`);

/**
 * Submits the contact form
 * (Assuming a /contact endpoint on your backend)
 */
export const submitContactForm = (data: ContactFormData) => 
  api.post<ApiResponse>('/contact', data);

/**
 * Submits a request for the CV
 */
export const requestCV = (data: CVRequestData) => 
  api.post<ApiResponse>('/cv/request', data); // Your /cv/request endpoint

export default api;