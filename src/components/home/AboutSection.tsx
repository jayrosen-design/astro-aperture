import astroLogImage from "@/assets/astro-log-about.png";
import { FlashlightCursor } from "./FlashlightCursor";

export function AboutSection() {
  return (
    <section 
      data-flashlight-section 
      className="relative min-h-screen bg-background flex items-center justify-center py-8"
    >
      {/* More intense flashlight for this section */}
      <FlashlightCursor color="rgba(239, 68, 68, 0.35)" size={400} />
      {/* Dark overlay for flashlight effect */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none z-[5]" />
      <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-[1]">
        <img
          src={astroLogImage}
          alt="Observation Log - Astro Aperture is the astrophotography portfolio of Jay Rosen"
          className="max-h-[90vh] w-auto object-contain rounded-lg shadow-2xl shadow-primary/10"
        />
      </div>
    </section>
  );
}
