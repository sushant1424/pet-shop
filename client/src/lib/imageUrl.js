/**
 * Returns a full image URL.
 * - If the URL is external (starts with http), use as-is.
 * - If local (/uploads/...), prefix with the backend URL.
 * - If null/undefined, return null.
 */
import { SERVER_URL } from './api';

export const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  // If it's already an absolute URL, return it
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  // Otherwise, construct the full URL combining backend and image
  return `${SERVER_URL}${imageUrl}`;
};
