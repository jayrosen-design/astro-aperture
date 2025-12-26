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
 * Extracts the filename from a URL for comparison
 */
function getFilenameFromUrl(url: string): string {
  try {
    // Remove query params and get the path
    const cleanUrl = url.split("?")[0];
    const parts = cleanUrl.split("/");
    const filename = parts[parts.length - 1];
    
    // Remove size suffixes like -1024x768, -scaled, etc.
    return filename.replace(/-\d+x\d+/, "").replace(/-scaled/, "").toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Checks if two image URLs refer to the same image (even with different sizes)
 */
function isSameImage(url1: string, url2: string): boolean {
  if (!url1 || !url2) return false;
  
  // Direct URL match
  if (url1 === url2) return true;
  
  // Compare filenames (handles different sizes of same image)
  const filename1 = getFilenameFromUrl(url1);
  const filename2 = getFilenameFromUrl(url2);
  
  return filename1 === filename2;
}

/**
 * Checks if a media item is a video type
 */
function isVideoType(type: MediaType): boolean {
  return type === "video" || type === "youtube" || type === "vimeo";
}

/**
 * Processes a post to extract all media items from featured image and content
 * Videos are placed first, then featured image, then other images
 */
export function processPostMedia(post: Post): ProcessedPost {
  const videos: MediaItem[] = [];
  const images: MediaItem[] = [];
  const featuredUrl = post.featuredImage?.node?.sourceUrl;

  // Parse media from content first
  if (post.content) {
    const contentMedia = parseMediaFromContent(post.content);
    
    for (const item of contentMedia) {
      if (isVideoType(item.type)) {
        videos.push(item);
      } else if (item.type === "image") {
        // Only add if not a duplicate of featured image
        if (!isSameImage(item.url, featuredUrl || "")) {
          images.push(item);
        }
      }
    }
  }

  // Add featured image after videos
  const featuredImage: MediaItem | null = featuredUrl
    ? {
        type: "image",
        url: featuredUrl,
        alt: post.featuredImage?.node?.altText || post.title,
      }
    : null;

  // Construct final array: [Videos..., FeaturedImage, OtherImages...]
  const mediaItems: MediaItem[] = [
    ...videos,
    ...(featuredImage ? [featuredImage] : []),
    ...images,
  ];

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
