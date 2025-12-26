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
 * Extracts the base filename from a URL for comparison (without size suffixes)
 */
function getBaseFilename(url: string): string {
  try {
    const cleanUrl = url.split("?")[0];
    const parts = cleanUrl.split("/");
    const filename = parts[parts.length - 1];
    // Remove size suffixes like -1024x768, -scaled, etc. and extension
    return filename
      .replace(/-\d+x\d+/g, "")
      .replace(/-scaled/g, "")
      .replace(/\.[^.]+$/, "")
      .toLowerCase();
  } catch {
    return url.toLowerCase();
  }
}

/**
 * Extracts dimensions from URL if present (e.g., -1024x768)
 */
function getImageDimensions(url: string): { width: number; height: number } | null {
  const match = url.match(/-(\d+)x(\d+)/);
  if (match) {
    return { width: parseInt(match[1], 10), height: parseInt(match[2], 10) };
  }
  return null;
}

/**
 * Gets the "size" of an image from URL for comparison
 */
function getImageSize(url: string): number {
  const dims = getImageDimensions(url);
  if (dims) return dims.width * dims.height;
  // If no dimensions in URL, assume it's full size (highest priority)
  if (url.includes("-scaled")) return 1000000; // scaled is usually large
  return 10000000; // No size suffix = likely original/full size
}

/**
 * Checks if two image URLs refer to the same image (even with different sizes)
 */
function isSameImage(url1: string, url2: string): boolean {
  if (!url1 || !url2) return false;
  if (url1 === url2) return true;
  
  const base1 = getBaseFilename(url1);
  const base2 = getBaseFilename(url2);
  
  return base1 === base2;
}

/**
 * Given a list of image URLs that are the same image at different sizes,
 * return only the largest version
 */
function keepLargestVersion(urls: string[]): string {
  if (urls.length === 0) return "";
  if (urls.length === 1) return urls[0];
  
  let largest = urls[0];
  let largestSize = getImageSize(urls[0]);
  
  for (let i = 1; i < urls.length; i++) {
    const size = getImageSize(urls[i]);
    if (size > largestSize) {
      largestSize = size;
      largest = urls[i];
    }
  }
  
  return largest;
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
  const featuredUrl = post.featuredImage?.node?.sourceUrl || "";

  // Collect all image URLs (featured + content) for deduplication
  const allImageUrls: string[] = [];
  if (featuredUrl) {
    allImageUrls.push(featuredUrl);
  }

  // Parse media from content
  if (post.content) {
    const contentMedia = parseMediaFromContent(post.content);
    
    for (const item of contentMedia) {
      if (isVideoType(item.type)) {
        videos.push(item);
      } else if (item.type === "image") {
        allImageUrls.push(item.url);
      }
    }
  }

  // Group images by their base filename
  const imageGroups = new Map<string, string[]>();
  for (const url of allImageUrls) {
    const base = getBaseFilename(url);
    if (!imageGroups.has(base)) {
      imageGroups.set(base, []);
    }
    imageGroups.get(base)!.push(url);
  }

  // Keep only the largest version of each unique image
  const uniqueImages: MediaItem[] = [];
  const addedBases = new Set<string>();
  
  for (const [base, urls] of imageGroups) {
    if (addedBases.has(base)) continue;
    addedBases.add(base);
    
    const largestUrl = keepLargestVersion(urls);
    uniqueImages.push({
      type: "image",
      url: largestUrl,
      alt: isSameImage(largestUrl, featuredUrl) 
        ? (post.featuredImage?.node?.altText || post.title)
        : undefined,
    });
  }

  // Sort: featured image first among images (if it was kept)
  uniqueImages.sort((a, b) => {
    const aIsFeatured = isSameImage(a.url, featuredUrl);
    const bIsFeatured = isSameImage(b.url, featuredUrl);
    if (aIsFeatured && !bIsFeatured) return -1;
    if (!aIsFeatured && bIsFeatured) return 1;
    return 0;
  });

  // Construct final array: [Videos..., Images...]
  const mediaItems: MediaItem[] = [...videos, ...uniqueImages];

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
