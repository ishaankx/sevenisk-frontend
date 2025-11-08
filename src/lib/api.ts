import axios from 'axios';
// FIX: We only import the types that this file actually uses.
// 'Post' has been removed.
import { ContactFormData, CVRequestData, ApiResponse } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sevenisk-api.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// --- DELETED ---
// We deleted getBlogPosts() and getBlogPostBySlug()
// because your blog data now comes from Sanity, not this API.

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