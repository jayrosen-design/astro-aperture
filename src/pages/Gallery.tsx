import { useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CategoryPills } from "@/components/gallery/CategoryPills";
import { useAstroPosts, usePostsByTag } from "@/hooks/useAstroPosts";
import { GALLERY_CATEGORIES } from "@/lib/graphql";

const Gallery = () => {
  const { slug } = useParams<{ slug?: string }>();
  
  // Find category info for the slug
  const categoryInfo = GALLERY_CATEGORIES.find((cat) => cat.slug === slug);
  
  // Fetch all posts or filtered posts based on slug
  const allPostsQuery = useAstroPosts(50);
  const filteredPostsQuery = usePostsByTag(slug || "", 50);
  
  // Use filtered query only when slug is provided
  const { data, isLoading, error } = slug ? filteredPostsQuery : allPostsQuery;
  const posts = data?.posts?.nodes || [];

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
          {!error && <GalleryGrid posts={posts} isLoading={isLoading} />}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;
