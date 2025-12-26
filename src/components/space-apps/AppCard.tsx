import { Post } from "@/lib/graphql";

interface AppCardProps {
  app: Post;
}

export function AppCard({ app }: AppCardProps) {
  const imageUrl = app.featuredImage?.node?.sourceUrl;
  const altText = app.featuredImage?.node?.altText || app.title;
  
  // Construct the post URL
  const postUrl = `https://jayrosen.design/${app.slug}/`;

  return (
    <a 
      href={postUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block relative z-20 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
    >
      {/* Featured Image - Fixed aspect ratio ~642:355 (roughly 16:9) */}
      {imageUrl && (
        <div className="w-full aspect-[642/355] overflow-hidden">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6 lg:p-8">
        <h2 className="font-display text-xl lg:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
          {app.title}
        </h2>
      </div>
    </a>
  );
}
