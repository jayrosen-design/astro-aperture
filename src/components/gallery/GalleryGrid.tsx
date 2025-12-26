import { useState } from "react";
import { Post } from "@/lib/graphql";
import { GalleryCard } from "./GalleryCard";
import { Lightbox } from "./Lightbox";

interface GalleryGridProps {
  posts: Post[];
  isLoading?: boolean;
}

export function GalleryGrid({ posts, isLoading }: GalleryGridProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (isLoading) {
    return (
      <div className="masonry-grid">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="masonry-item animate-pulse"
            style={{ height: `${Math.random() * 200 + 200}px` }}
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
      <div className="masonry-grid">
        {posts.map((post, index) => (
          <GalleryCard
            key={post.id}
            post={post}
            index={index}
            onClick={() => setSelectedPost(post)}
          />
        ))}
      </div>

      <Lightbox
        post={selectedPost}
        posts={posts}
        onClose={() => setSelectedPost(null)}
        onNavigate={setSelectedPost}
      />
    </>
  );
}
