import { Post } from "@/lib/graphql";

export type MediaType = "image" | "video" | "youtube" | "vimeo";

export interface MediaItem {
  type: MediaType;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
}

export interface ProcessedPost extends Post {
  mediaItems: MediaItem[];
}

/**
 * Extracts a YouTube video ID from various YouTube URL formats
 */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Extracts a Vimeo video ID from various Vimeo URL formats
 */
function extractVimeoId(url: string): string | null {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

/**
 * Parses HTML content to extract all media items (images, videos, embeds)
 */
export function parseMediaFromContent(content: string): MediaItem[] {
  const mediaItems: MediaItem[] = [];
  
  if (!content) return mediaItems;

  // Extract images from <img> tags
  const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?[^>]*>/gi;
  let match;
  
  while ((match = imgRegex.exec(content)) !== null) {
    const url = match[1];
    const alt = match[2] || "";
    
    // Skip placeholder images and tiny images
    if (!url.includes("placeholder") && !url.includes("emoji")) {
      mediaItems.push({
        type: "image",
        url,
        alt,
      });
    }
  }

  // Extract YouTube iframes
  const youtubeIframeRegex = /<iframe[^>]+src=["']([^"']*(?:youtube\.com|youtu\.be)[^"']*)["'][^>]*>/gi;
  while ((match = youtubeIframeRegex.exec(content)) !== null) {
    const url = match[1];
    const videoId = extractYouTubeId(url);
    if (videoId) {
      mediaItems.push({
        type: "youtube",
        url: `https://www.youtube.com/embed/${videoId}`,
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      });
    }
  }

  // Extract Vimeo iframes
  const vimeoIframeRegex = /<iframe[^>]+src=["']([^"']*vimeo\.com[^"']*)["'][^>]*>/gi;
  while ((match = vimeoIframeRegex.exec(content)) !== null) {
    const url = match[1];
    const videoId = extractVimeoId(url);
    if (videoId) {
      mediaItems.push({
        type: "vimeo",
        url: `https://player.vimeo.com/video/${videoId}`,
      });
    }
  }

  // Extract HTML5 video tags
  const videoRegex = /<video[^>]*>[\s\S]*?<source[^>]+src=["']([^"']+)["'][^>]*>[\s\S]*?<\/video>/gi;
  while ((match = videoRegex.exec(content)) !== null) {
    mediaItems.push({
      type: "video",
      url: match[1],
    });
  }

  // Also check for direct video src on video tags
  const videoDirectRegex = /<video[^>]+src=["']([^"']+)["'][^>]*>/gi;
  while ((match = videoDirectRegex.exec(content)) !== null) {
    mediaItems.push({
      type: "video",
      url: match[1],
    });
  }

  return mediaItems;
}

/**
 * Processes a post to extract all media items from featured image and content
 */
export function processPostMedia(post: Post): ProcessedPost {
  const mediaItems: MediaItem[] = [];

  // Start with featured image
  if (post.featuredImage?.node?.sourceUrl) {
    mediaItems.push({
      type: "image",
      url: post.featuredImage.node.sourceUrl,
      alt: post.featuredImage.node.altText || post.title,
    });
  }

  // Parse additional media from content
  if (post.content) {
    const contentMedia = parseMediaFromContent(post.content);
    
    // Filter out duplicates (featured image might be in content too)
    const featuredUrl = post.featuredImage?.node?.sourceUrl;
    const uniqueMedia = contentMedia.filter(
      (item) => item.url !== featuredUrl
    );
    
    mediaItems.push(...uniqueMedia);
  }

  return {
    ...post,
    mediaItems,
  };
}

/**
 * Processes an array of posts to add media items to each
 */
export function processPostsMedia(posts: Post[]): ProcessedPost[] {
  return posts.map(processPostMedia);
}

/**
 * Returns count info about media in a processed post
 */
export function getMediaCounts(post: ProcessedPost): {
  totalImages: number;
  totalVideos: number;
  hasMultiple: boolean;
} {
  const images = post.mediaItems.filter((m) => m.type === "image").length;
  const videos = post.mediaItems.filter(
    (m) => m.type === "video" || m.type === "youtube" || m.type === "vimeo"
  ).length;

  return {
    totalImages: images,
    totalVideos: videos,
    hasMultiple: post.mediaItems.length > 1,
  };
}
