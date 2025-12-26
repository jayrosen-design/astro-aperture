import { useEffect, useCallback } from "react";
import { Post } from "@/lib/graphql";
import { X, ChevronLeft, ChevronRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface LightboxProps {
  post: Post | null;
  posts: Post[];
  onClose: () => void;
  onNavigate: (post: Post) => void;
}

export function Lightbox({ post, posts, onClose, onNavigate }: LightboxProps) {
  const currentIndex = post ? posts.findIndex((p) => p.id === post.id) : -1;

  const goToPrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(posts[currentIndex - 1]);
    }
  }, [currentIndex, posts, onNavigate]);

  const goToNext = useCallback(() => {
    if (currentIndex < posts.length - 1) {
      onNavigate(posts[currentIndex + 1]);
    }
  }, [currentIndex, posts, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!post) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [post, onClose, goToPrevious, goToNext]);

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

  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const altText = post.featuredImage?.node?.altText || post.title;

  // Strip HTML tags from excerpt
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, "") || "";

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
      {currentIndex > 0 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hover:bg-muted h-12 w-12"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
      )}

      {currentIndex < posts.length - 1 && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hover:bg-muted h-12 w-12"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      )}

      {/* Content */}
      <div
        className="h-full flex flex-col lg:flex-row items-center justify-center p-4 lg:p-12 gap-6 lg:gap-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="flex-1 flex items-center justify-center max-h-[60vh] lg:max-h-[80vh] overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            className="max-w-full max-h-full object-contain rounded-lg animate-scale-in"
          />
        </div>

        {/* Details Panel */}
        <div className="w-full lg:w-80 flex-shrink-0 bg-card/50 rounded-lg p-6 max-h-[35vh] lg:max-h-[80vh] overflow-y-auto">
          <h2 className="font-display text-2xl font-semibold mb-4">
            {post.title}
          </h2>

          {post.date && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(post.date), "MMMM d, yyyy")}</span>
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
        {currentIndex + 1} / {posts.length}
      </div>
    </div>
  );
}
