import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Post } from "@/lib/graphql";

interface HeroProps {
  featuredPost?: Post;
}

const HERO_BACKGROUND = "https://jayrosen.design/wp-content/uploads/2025/05/Panorama-3am-stacked-copy-edit-copy-72-scaled.jpg";

export function Hero({ featuredPost }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={HERO_BACKGROUND}
          alt="Panoramic astrophotography of the Milky Way"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/20 border border-foreground/30 text-foreground text-sm mb-8 animate-fade-up opacity-0" style={{ animationDelay: "100ms", animationFillMode: "forwards" }}>
            <Sparkles className="w-4 h-4" />
            <span>Fine Art Astrophotography</span>
          </div>

          <h1 
            className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-semibold tracking-tight mb-6 animate-fade-up opacity-0"
            style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
          >
            Explore the{" "}
            <span className="text-foreground">Cosmos</span>
          </h1>

          <p 
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-up opacity-0"
            style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
          >
            Bridging the gap between fine art and scientific observation to reveal the hidden 
            wonders of our universe. Capturing distant galaxies, nebulae, and the planets of 
            our solar system while advocating for the preservation of natural dark skies.
          </p>

          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up opacity-0"
            style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
          >
            <Button asChild size="lg" className="text-lg px-8 glow-cosmic">
              <Link to="/gallery">
                View Gallery
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/shop">Shop Prints</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/50 flex justify-center pt-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
