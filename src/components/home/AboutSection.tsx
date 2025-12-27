import astroLogImage from "@/assets/astro-log-about.png";

export function AboutSection() {
  return (
    <section className="relative min-h-screen bg-background flex items-center justify-center py-8">
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <img
          src={astroLogImage}
          alt="Observation Log - Astro Aperture is the astrophotography portfolio of Jay Rosen"
          className="max-h-[90vh] w-auto object-contain rounded-lg shadow-2xl shadow-primary/10"
        />
      </div>
    </section>
  );
}
