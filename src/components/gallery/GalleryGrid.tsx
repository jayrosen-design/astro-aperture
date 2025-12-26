import { useState } from "react";
import { Post } from "@/lib/graphql";
import { GalleryCard } from "./GalleryCard";
import { Lightbox } from "./Lightbox";
import { Button } from "@/components/ui/button";

interface GalleryGridProps {
  posts: Post[];
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

export function GalleryGrid({ 
  posts, 
  isLoading, 
  hasMore, 
  onLoadMore, 
  isLoadingMore 
}: GalleryGridProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (isLoading) {
    return (
      <div className="gallery-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="gallery-item animate-pulse aspect-[4/3]"
          >
            <div className="w-full h-full bg-muted rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground text-lg">
          No captures found in this category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="gallery-grid">
        {posts.map((post, index) => (
          <GalleryCard
            key={post.id}
            post={post}
            index={index}
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="flex justify-center mt-12 pb-12">
          <Button 
            onClick={onLoadMore} 
            disabled={isLoadingMore}
            variant="outline"
            size="lg"
            className="min-w-[200px]"
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}

      <Lightbox
        post={selectedPost}
        posts={posts}
        onClose={() => setSelectedPost(null)}
        onNavigate={setSelectedPost}
      />
    </>
  );
}
