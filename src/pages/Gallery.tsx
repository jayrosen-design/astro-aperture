import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CategoryPills } from "@/components/gallery/CategoryPills";
import { useAstroPosts, usePostsByTag } from "@/hooks/useAstroPosts";
import { GALLERY_CATEGORIES } from "@/lib/graphql";

const POSTS_PER_PAGE = 12;

const Gallery = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [displayCount, setDisplayCount] = useState(POSTS_PER_PAGE);
  
  // Reset display count when category changes
  useEffect(() => {
    setDisplayCount(POSTS_PER_PAGE);
  }, [slug]);
  
  // Find category info for the slug
  const categoryInfo = GALLERY_CATEGORIES.find((cat) => cat.slug === slug);
  
  // Fetch all posts or filtered posts based on slug
  const allPostsQuery = useAstroPosts(100);
  const filteredPostsQuery = usePostsByTag(slug || "", 100);
  
  // Use filtered query only when slug is provided
  const { data, isLoading, error } = slug ? filteredPostsQuery : allPostsQuery;
  const allPosts = data?.posts?.nodes || [];
  const visiblePosts = allPosts.slice(0, displayCount);
  const hasMore = displayCount < allPosts.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + POSTS_PER_PAGE);
  };

  const pageTitle = categoryInfo ? categoryInfo.name : "Gallery";
  const pageDescription = categoryInfo
    ? `Explore stunning ${categoryInfo.name.toLowerCase()} astrophotography`
    : "Browse the complete collection of astrophotography captures";

  return (
    <Layout>
      <div className="min-h-screen pt-24 lg:pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
              {categoryInfo && (
                <span className="mr-3">{categoryInfo.icon}</span>
              )}
              {pageTitle}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {pageDescription}
            </p>
          </div>

          {/* Category Pills */}
          <div className="mb-12">
            <CategoryPills />
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-destructive mb-2">Failed to load images</p>
              <p className="text-muted-foreground text-sm">
                Please try refreshing the page
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          {!error && (
            <GalleryGrid 
              posts={visiblePosts} 
              isLoading={isLoading}
              hasMore={hasMore}
              onLoadMore={handleLoadMore}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
