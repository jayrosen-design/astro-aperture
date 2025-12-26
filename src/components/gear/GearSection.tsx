import { GearCard } from "./GearCard";
import type { GearProduct } from "@/hooks/useGear";

interface GearSectionProps {
  title: string;
  products: GearProduct[];
}

export function GearSection({ title, products }: GearSectionProps) {
  const isEmpty = products.length === 0;

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {title}
        </h2>
        <div className="flex-1 h-px bg-border" />
      </div>

      {isEmpty ? (
        <div className="rounded-lg border border-border bg-card/50 p-6">
          <p className="text-sm text-muted-foreground">
            No items found in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {products.map((product) => (
            <GearCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
