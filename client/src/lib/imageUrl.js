/**
 * Returns a full image URL.
 * - If the URL is external (starts with http), use as-is.
 * - If local (/uploads/...), prefix with the backend URL.
 * - If null/undefined, return null.
 */
export function getImageUrl(imageUrl) {
  if (!imageUrl) return null;
  if (imageUrl.startsWith('http')) return imageUrl;
  return `http://localhost:5000${imageUrl}`;
}
