import { Post } from "@/lib/graphql";

interface AppCardProps {
  app: Post;
}

export function AppCard({ app }: AppCardProps) {
  const imageUrl = app.featuredImage?.node?.sourceUrl;
  const altText = app.featuredImage?.node?.altText || app.title;

  // Strip HTML tags from excerpt
  const cleanExcerpt = app.excerpt?.replace(/<[^>]*>/g, "") || "";

  return (
    <article className="group bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
      {/* Featured Image - Full width, original aspect ratio */}
      {imageUrl && (
        <div className="w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
          {app.title}
        </h2>
        
        {cleanExcerpt && (
          <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">
            {cleanExcerpt}
          </p>
        )}
      </div>
    </article>
  );
}
