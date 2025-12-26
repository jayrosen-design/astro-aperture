import { useEffect, useCallback, useState } from "react";
import { ProcessedPost, MediaItem } from "@/lib/mediaParser";
import { X, ChevronLeft, ChevronRight, Calendar, Tag, Images, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface LightboxProps {
  post: ProcessedPost | null;
  posts: ProcessedPost[];
  onClose: () => void;
  onNavigate: (post: ProcessedPost) => void;
}

function MediaRenderer({ item, isActive, shouldAutoplay }: { item: MediaItem; isActive: boolean; shouldAutoplay: boolean }) {
  if (item.type === "youtube") {
    const autoplayParams = shouldAutoplay ? "autoplay=1&mute=1&controls=1&rel=0" : "autoplay=0&controls=1&rel=0";
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-4xl aspect-video">
          {isActive ? (
            <iframe
              src={`${item.url}?${autoplayParams}`}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (item.type === "vimeo") {
    const autoplayParams = shouldAutoplay ? "autoplay=1&muted=1" : "autoplay=0";
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-4xl aspect-video">
          {isActive ? (
            <iframe
              src={`${item.url}?${autoplayParams}`}
              className="w-full h-full rounded-lg"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Vimeo video"
            />
          ) : (
            <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
              <Play className="w-16 h-16 text-muted-foreground" />
            </div>
          )}
        </div>
      </div>
    );
  }

  if (item.type === "video") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <video
          src={item.url}
          controls
          autoPlay={shouldAutoplay}
          muted={shouldAutoplay}
          playsInline
          className="max-w-full max-h-full rounded-lg"
          preload="metadata"
        />
      </div>
    );
  }

  // Default: image
  return (
    <img
      src={item.url}
      alt={item.alt || "Gallery image"}
      className="max-w-full max-h-[55vh] lg:max-h-[calc(100vh-8rem)] w-auto h-auto object-contain rounded-lg animate-scale-in"
    />
  );
}

function ThumbnailStrip({
  items,
  currentIndex,
  onSelect,
}: {
  items: MediaItem[];
  currentIndex: number;
  onSelect: (index: number) => void;
}) {
  if (items.length <= 1) return null;

  return (
    <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-2 px-4 max-w-full">
      {items.map((item, index) => {
        const isVideo = item.type === "video" || item.type === "youtube" || item.type === "vimeo";
        const thumbnailUrl = item.thumbnailUrl || (item.type === "image" ? item.url : null);

        return (
          <button
            key={index}
            onClick={() => onSelect(index)}
            className={cn(
              "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
              currentIndex === index
                ? "border-primary ring-2 ring-primary/50"
                : "border-transparent hover:border-muted-foreground/50"
            )}
          >
            {thumbnailUrl ? (
              <img
                src={thumbnailUrl}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Play className="w-6 h-6 text-muted-foreground" />
              </div>
            )}
            {isVideo && thumbnailUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <Play className="w-6 h-6 text-foreground" />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function Lightbox({ post, posts, onClose, onNavigate }: LightboxProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const currentPostIndex = post ? posts.findIndex((p) => p.id === post.id) : -1;
  const mediaItems = post?.mediaItems || [];

  // Reset media index when post changes
  useEffect(() => {
    setCurrentMediaIndex(0);
  }, [post?.id]);

  const goToPreviousPost = useCallback(() => {
    if (currentPostIndex > 0) {
      onNavigate(posts[currentPostIndex - 1]);
    }
  }, [currentPostIndex, posts, onNavigate]);

  const goToNextPost = useCallback(() => {
    if (currentPostIndex < posts.length - 1) {
      onNavigate(posts[currentPostIndex + 1]);
    }
  }, [currentPostIndex, posts, onNavigate]);

  const goToPreviousMedia = useCallback(() => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    } else if (currentPostIndex > 0) {
      // Go to previous post's last media item
      const prevPost = posts[currentPostIndex - 1];
      onNavigate(prevPost);
      // Media index will reset via useEffect, we want last item
      setTimeout(() => {
        setCurrentMediaIndex(prevPost.mediaItems.length - 1);
      }, 0);
    }
  }, [currentMediaIndex, currentPostIndex, posts, onNavigate]);

  const goToNextMedia = useCallback(() => {
    if (currentMediaIndex < mediaItems.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
    } else if (currentPostIndex < posts.length - 1) {
      // Go to next post's first media item
      onNavigate(posts[currentPostIndex + 1]);
    }
  }, [currentMediaIndex, mediaItems.length, currentPostIndex, posts, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!post) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPreviousMedia();
          break;
        case "ArrowRight":
          goToNextMedia();
          break;
        case "ArrowUp":
          e.preventDefault();
          goToPreviousPost();
          break;
        case "ArrowDown":
          e.preventDefault();
          goToNextPost();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [post, onClose, goToPreviousMedia, goToNextMedia, goToPreviousPost, goToNextPost]);

  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [post]);

  if (!post) return null;

  const currentMedia = mediaItems[currentMediaIndex];
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, "") || "";
  const canGoPrev = currentMediaIndex > 0 || currentPostIndex > 0;
  const canGoNext = currentMediaIndex < mediaItems.length - 1 || currentPostIndex < posts.length - 1;

  return (
    <div
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 hover:bg-muted"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Navigation Arrows */}
      {canGoPrev && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:bg-muted h-12 w-12"
          onClick={(e) => {
            e.stopPropagation();
            goToPreviousMedia();
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
      )}

      {canGoNext && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:bg-muted h-12 w-12"
          onClick={(e) => {
            e.stopPropagation();
            goToNextMedia();
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      )}

      {/* Content */}
      <div
        className="h-full flex flex-col lg:flex-row items-center justify-center p-4 pt-16 pb-24 lg:p-12 lg:pt-16 lg:pb-12 gap-4 lg:gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Media Display */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0 w-full lg:w-auto">
          <div className="flex items-center justify-center w-full">
            {currentMedia && (
              <MediaRenderer 
                item={currentMedia} 
                isActive={true} 
                shouldAutoplay={currentMediaIndex === 0 && (currentMedia.type === "video" || currentMedia.type === "youtube" || currentMedia.type === "vimeo")}
              />
            )}
          </div>
          
          {/* Thumbnail Strip */}
          <ThumbnailStrip
            items={mediaItems}
            currentIndex={currentMediaIndex}
            onSelect={setCurrentMediaIndex}
          />
        </div>

        {/* Details Panel */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-card/50 rounded-lg p-6 max-h-[30vh] lg:max-h-[80vh] overflow-y-auto">
          <h2 className="font-display text-2xl font-semibold mb-4">
            {post.title}
          </h2>

          {post.date && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
            </div>
          )}

          {/* Media count indicator */}
          {mediaItems.length > 1 && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Images className="w-4 h-4" />
              <span>
                {currentMediaIndex + 1} of {mediaItems.length} items
              </span>
            </div>
          )}

          {cleanExcerpt && (
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {cleanExcerpt}
            </p>
          )}

          {post.tags?.nodes?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-muted-foreground" />
              {post.tags.nodes.map((tag) => (
                <span
                  key={tag.slug}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
        Post {currentPostIndex + 1} / {posts.length}
      </div>
    </div>
  );
}
