import { Layout } from "@/components/layout/Layout";
import planetariumPreview from "@/assets/planetarium-preview.png";
import { useSpaceApps } from "@/hooks/useSpaceApps";
import { AppCard } from "@/components/space-apps/AppCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FlashlightCursor } from "@/components/home/FlashlightCursor";

export default function SpaceApps() {
  const { data, isLoading, error } = useSpaceApps();
  const apps = data?.posts?.nodes || [];

  return (
    <Layout>
      <div data-flashlight-section className="relative pt-24 lg:pt-32 pb-16 lg:pb-24 overflow-hidden">
        <FlashlightCursor color="rgba(239, 68, 68, 0.12)" size={350} />
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              Space Apps
            </h1>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto">
              Software projects and tools for space exploration and astrophotography
            </p>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col gap-12 lg:gap-16 max-w-4xl mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                  <Skeleton className="w-full aspect-video" />
                  <div className="p-6 lg:p-8">
                    <Skeleton className="h-8 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">Failed to load apps. Please try again later.</p>
            </div>
          )}

          {/* Apps List */}
          {!isLoading && !error && apps.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No apps found.</p>
            </div>
          )}

          {!isLoading && !error && apps.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {/* Planetarium Card */}
              <a
                href="https://planetarium-player.lovable.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative z-20 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className="w-full aspect-[642/355] overflow-hidden">
                  <img src={planetariumPreview} alt="Planetarium" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                </div>
                <div className="p-6 lg:p-8">
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Planetarium
                  </h2>
                </div>
              </a>

              {apps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
