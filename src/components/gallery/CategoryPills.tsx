import { Link, useLocation } from "react-router-dom";
import { GALLERY_CATEGORIES } from "@/lib/graphql";
import { cn } from "@/lib/utils";

interface CategoryPillsProps {
  showAll?: boolean;
}

export function CategoryPills({ showAll = true }: CategoryPillsProps) {
  const location = useLocation();
  const currentSlug = location.pathname.split("/").pop();

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {showAll && (
        <Link
          to="/gallery"
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            location.pathname === "/gallery"
              ? "bg-primary text-primary-foreground glow-cosmic"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          All
        </Link>
      )}
      {GALLERY_CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          to={`/gallery/${category.slug}`}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            currentSlug === category.slug
              ? "bg-primary text-primary-foreground glow-cosmic"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
