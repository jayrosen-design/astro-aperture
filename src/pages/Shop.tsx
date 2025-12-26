import { Layout } from "@/components/layout/Layout";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { useAstroProducts } from "@/hooks/useAstroProducts";

const Shop = () => {
  const { data, isLoading, error } = useAstroProducts(50);
  const products = data?.products?.nodes || [];

  return (
    <Layout>
      <div className="min-h-screen pt-24 lg:pt-32">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-4">
              Shop Prints
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Bring the cosmos into your space. Premium quality prints of stunning 
              astrophotography, ready to frame and display.
            </p>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-20">
              <p className="text-destructive mb-2">Failed to load products</p>
              <p className="text-muted-foreground text-sm">
                Please try refreshing the page
              </p>
            </div>
          )}

          {/* Product Grid */}
          {!error && <ProductGrid products={products} isLoading={isLoading} />}

          {/* Info Banner */}
          <div className="mt-16 p-8 rounded-2xl bg-card/50 border border-border/50 text-center">
            <h3 className="font-display text-xl font-semibold mb-2">
              Secure Checkout
            </h3>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              All purchases are securely processed through our main store. 
              Clicking "View Product" will take you to the full product page 
              where you can select size, frame options, and complete your order.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
