import { Layout } from "@/components/layout/Layout";
import { GearSection } from "@/components/gear/GearSection";
import { useGear } from "@/hooks/useGear";
import { Loader2 } from "lucide-react";

export default function Gear() {
  const { data, isLoading, error } = useGear();

  const sections = [
    { key: "cameras", title: "Cameras" },
    { key: "lenses", title: "Camera Lenses" },
    { key: "cameraAccessories", title: "Camera Accessories" },
    { key: "telescopes", title: "Telescopes" },
    { key: "telescopeAccessories", title: "Telescope Accessories" },
  ] as const;

  return (
    <Layout>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Photography Gear
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The equipment I use to capture the cosmos
            </p>
          </div>

          {/* Affiliate Disclaimer */}
          <div className="mb-12 p-4 rounded-lg bg-muted/50 border border-border text-center">
            <p className="text-sm text-muted-foreground">
              Some links on this page are affiliate links to Amazon and eBay. I may receive a commission if you purchase through these links, at no additional cost to you.
            </p>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-destructive">Failed to load gear. Please try again later.</p>
            </div>
          ) : data ? (
            <div className="space-y-12">
              {sections.map(({ key, title }) => (
                <GearSection
                  key={key}
                  title={title}
                  products={data[key]?.nodes || []}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
}
