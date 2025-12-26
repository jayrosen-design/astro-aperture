import { Product } from "@/lib/graphql";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const imageUrl = product.image?.sourceUrl;
  const altText = product.image?.altText || product.name;

  // Clean price string (WooCommerce returns formatted HTML)
  const cleanPrice = product.price?.replace(/<[^>]*>/g, "") || "";

  return (
    <div
      className="group bg-card rounded-xl overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300 animate-fade-up opacity-0"
      style={{
        animationDelay: `${index * 100}ms`,
        animationFillMode: "forwards",
      }}
    >
      {/* Image */}
      <div className="aspect-square overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-display text-lg font-medium line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {product.onSale && product.regularPrice && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm text-muted-foreground line-through">
              {product.regularPrice.replace(/<[^>]*>/g, "")}
            </span>
            <span className="text-xs px-2 py-0.5 bg-destructive/20 text-destructive rounded-full">
              Sale
            </span>
          </div>
        )}

        <p className="text-lg font-semibold text-primary mb-4">{cleanPrice}</p>

        <Button asChild className="w-full group/btn">
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Product
            <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
}
