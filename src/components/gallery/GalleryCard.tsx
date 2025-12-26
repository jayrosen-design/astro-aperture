import { ProcessedPost, getMediaCounts } from "@/lib/mediaParser";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

interface GalleryCardProps {
  post: ProcessedPost;
  index: number;
  onClick: () => void;
}

export function GalleryCard({ post, index, onClick }: GalleryCardProps) {
  const imageUrl = post.featuredImage?.node?.sourceUrl;
  const altText = post.featuredImage?.node?.altText || post.title;
  const mediaCounts = getMediaCounts(post);

  if (!imageUrl) return null;

  return (
    <div
      className={cn(
        "gallery-item group cursor-pointer",
        "animate-fade-up opacity-0"
      )}
      style={{
        animationDelay: `${Math.min(index, 12) * 50}ms`,
        animationFillMode: "forwards",
      }}
      onClick={onClick}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={imageUrl}
          alt={altText}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Video indicator - only show if post contains video */}
        {mediaCounts.totalVideos > 0 && (
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm text-foreground text-xs px-2 py-1 rounded-full">
              <Play className="w-3 h-3" />
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <h3 className="font-display text-lg font-medium text-foreground line-clamp-2">
            {post.title}
          </h3>
          {post.tags?.nodes?.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {post.tags.nodes.slice(0, 2).map((tag) => (
                <span
                  key={tag.slug}
                  className="text-xs px-2 py-0.5 bg-muted/70 text-foreground rounded-full"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
