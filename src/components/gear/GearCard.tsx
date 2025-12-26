import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GearProduct } from "@/hooks/useGear";

interface GearCardProps {
  product: GearProduct;
}

export function GearCard({ product }: GearCardProps) {
  const handleClick = () => {
    if (product.externalUrl) {
      window.open(product.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
      onClick={handleClick}
    >
      {/* Image */}
      <div className="aspect-square bg-muted/50 p-4">
        {product.image?.sourceUrl ? (
          <img
            src={product.image.sourceUrl}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {product.price && (
          <p className="text-sm text-muted-foreground">{product.price}</p>
        )}

        {product.externalUrl && (
          <Button
            size="sm"
            className="w-full gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            {product.buttonText || "View on Amazon"}
            <ExternalLink className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
