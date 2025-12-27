import astroLogImage from "@/assets/astro-log-about.png";

export function AboutSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <img
            src={astroLogImage}
            alt="Observation Log - Astro Aperture is the astrophotography portfolio of Jay Rosen"
            className="w-full h-auto rounded-lg shadow-2xl shadow-primary/10"
          />
        </div>
      </div>
    </section>
  );
}
