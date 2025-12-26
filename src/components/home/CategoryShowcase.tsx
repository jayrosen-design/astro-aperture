import { Link } from "react-router-dom";
import { GALLERY_CATEGORIES } from "@/lib/graphql";

export function CategoryShowcase() {
  return (
    <section className="py-20 lg:py-32">
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

        {/* Categories Grid - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GALLERY_CATEGORIES.map((category, index) => (
            <Link
              key={category.slug}
              to={`/gallery/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl aspect-[16/9] animate-fade-up opacity-0"
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: "forwards",
              }}
            >
              {/* Background Image */}
              <img
                src={category.image}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <h3 className="font-display text-2xl lg:text-3xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
