import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { CategoryPills } from "@/components/gallery/CategoryPills";
import { useInfiniteAstroPosts, useInfinitePostsByTag } from "@/hooks/useAstroPosts";
import { GALLERY_CATEGORIES } from "@/lib/graphql";

const POSTS_PER_PAGE = 24;

const Gallery = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug?: string }>();

  // Backward-compatible URL: /gallery/aircraft -> /gallery/rockets
  useEffect(() => {
    if (slug === "aircraft") {
      navigate("/gallery/rockets", { replace: true });
    }
  }, [slug, navigate]);

  const effectiveSlug = slug === "aircraft" ? "rockets" : slug;

  // Find category info for the slug
  const categoryInfo = GALLERY_CATEGORIES.find((cat) => cat.slug === effectiveSlug);
  const tagToQuery = categoryInfo?.tag ?? effectiveSlug;

  // Fetch all posts or filtered posts based on slug
  const allPostsQuery = useInfiniteAstroPosts(POSTS_PER_PAGE);
  const filteredPostsQuery = useInfinitePostsByTag(tagToQuery || "", POSTS_PER_PAGE);

  const query = effectiveSlug ? filteredPostsQuery : allPostsQuery;


  const posts = useMemo(
    () => query.data?.pages.flatMap((p) => p.posts.nodes) ?? [],
    [query.data]
  );

  const hasMore = !!query.hasNextPage;

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
              {categoryInfo && <span className="mr-3">{categoryInfo.icon}</span>}
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
          {query.error && (
            <div className="text-center py-20">
              <p className="text-destructive mb-2">Failed to load images</p>
              <p className="text-muted-foreground text-sm">
                Please try refreshing the page
              </p>
            </div>
          )}

          {/* Gallery Grid */}
          {!query.error && (
            <GalleryGrid
              posts={posts}
              isLoading={query.isLoading}
              hasMore={hasMore}
              isLoadingMore={query.isFetchingNextPage}
              onLoadMore={() => query.fetchNextPage()}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;

