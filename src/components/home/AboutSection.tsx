const JAY_PORTRAIT = "https://jayrosen.design/wp-content/uploads/2024/06/selfie-milkyway-web.png";

export function AboutSection() {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Photo */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10">
              <img
                src={JAY_PORTRAIT}
                alt="Jay Rosen - Astrophotographer"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-3xl blur-3xl -z-10 opacity-50" />
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground">
              About <span className="text-gradient-cosmic">Astro Aperture</span>
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Astro Aperture is the creative astrophotography portfolio of Jay Rosen, bridging the gap between fine art and scientific observation to reveal the hidden wonders of our universe.
              </p>
              <p>
                What began as a personal exploration of the night sky has evolved into a dedicated collection of deep-sky astrophotography, capturing everything from the planets of our solar system, distant galaxies, and nebulae.
              </p>
              <p>
                Jay Rosen aims to not only document the sublime beauty of the cosmos but also advocate for environmental conservation, using the power of photography to demonstrate the vital importance of preserving natural dark skies for future generations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
