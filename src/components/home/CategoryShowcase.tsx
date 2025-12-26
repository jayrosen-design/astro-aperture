import { Link } from "react-router-dom";
import { GALLERY_CATEGORIES } from "@/lib/graphql";
import { ArrowRight } from "lucide-react";

export function CategoryShowcase() {
  // Featured categories to display on homepage
  const featuredCategories = GALLERY_CATEGORIES.slice(0, 6);

  return (
    <section className="py-20 lg:py-32 bg-card/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4">
            Explore by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive into specific realms of the cosmos. Each category holds unique wonders waiting to be discovered.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {featuredCategories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/gallery/${category.slug}`}
              className="group relative p-6 rounded-xl bg-muted/50 border border-border/50 hover:border-primary/50 hover:bg-muted transition-all duration-300 animate-fade-up opacity-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              <div className="text-center">
                <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform">
                  {category.icon}
                </span>
                <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
              <ArrowRight className="absolute bottom-3 right-3 w-4 h-4 opacity-0 group-hover:opacity-100 text-primary transition-opacity" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
