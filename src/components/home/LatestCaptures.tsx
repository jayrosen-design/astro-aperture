import { Link } from "react-router-dom";
import { Post } from "@/lib/graphql";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface LatestCapturesProps {
  posts: Post[];
  isLoading?: boolean;
}

export function LatestCaptures({ posts, isLoading }: LatestCapturesProps) {
  const latestPosts = posts.slice(0, 6);

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-2">
              Latest Captures
            </h2>
            <p className="text-muted-foreground">
              Fresh from the observatory
            </p>
          </div>
          <Button asChild variant="ghost" className="group">
            <Link to="/gallery">
              View All
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <GalleryGrid posts={latestPosts} isLoading={isLoading} />
      </div>
    </section>
  );
}
