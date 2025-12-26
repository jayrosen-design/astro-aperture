import { Layout } from "@/components/layout/Layout";
import { Sparkles, Mail } from "lucide-react";
import { FlashlightCursor } from "@/components/home/FlashlightCursor";

const JAY_PORTRAIT = "https://jayrosen.design/wp-content/uploads/2022/10/milkyway-self-telescope.png";

const About = () => {

  const faqs = [
    {
      question: "Do you offer custom print sizes?",
      answer: "Yes! Contact me directly for custom sizing options not listed in the shop.",
    },
    {
      question: "What is your return policy?",
      answer: "I offer a 30-day satisfaction guarantee on all prints. If you're not happy, I'll make it right.",
    },
    {
      question: "Can I license images for commercial use?",
      answer: "Absolutely. Please reach out via email for licensing inquiries.",
    },
    {
      question: "How long does shipping take?",
      answer: "Most orders ship within 3-5 business days. International shipping times vary by location.",
    },
  ];

  return (
    <Layout>
      <div data-flashlight-section className="relative min-h-screen pt-24 lg:pt-32 overflow-hidden">
        <FlashlightCursor color="rgba(239, 68, 68, 0.12)" size={350} />
        {/* Hero Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Where Art Meets the Cosmos</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-6">
              About Astro Aperture
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              The photographic journey of Jay Rosen, an artist and developer whose work 
              bridges the gap between fine art and scientific discovery.
            </p>
          </div>
        </section>

        {/* The Intersection Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Jay's Portrait */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src={JAY_PORTRAIT}
                  alt="Jay Rosen with telescope under the Milky Way"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-cosmic rounded-full blur-3xl opacity-30" />
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold">The Intersection of Art and Science</h2>
              <p className="text-muted-foreground leading-relaxed">
                Astro Aperture is the creative astrophotography portfolio of Jay Rosen, bridging the gap between fine art and scientific observation to reveal the hidden wonders of our universe.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What began as a personal exploration of the night sky has evolved into a dedicated collection of deep-sky astrophotography, capturing everything from the planets of our solar system, distant galaxies, and nebulae.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Jay Rosen aims to not only document the sublime beauty of the cosmos but also advocate for environmental conservation, using the power of photography to demonstrate the vital importance of preserving natural dark skies for future generations.
              </p>
            </div>
          </div>
        </section>

        {/* The Spark Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-center mb-8">
                The Spark: A Pandemic Pivot
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  The story of Astro Aperture began during the onset of the COVID-19 pandemic. 
                  In early 2020, Jay had prepared to cover the Tokyo Olympics as a photographer, 
                  but when the world shut down, he turned his lens upward.
                </p>
                <p>
                  On March 9, 2020, while attempting to photograph a Super Moon, Jay inadvertently 
                  captured Jupiter and its orbiting moons. This discovery sparked an obsession with 
                  astrophotography. While simultaneously managing his other ventures—manufacturing 
                  PPE through Mirror Visionwear LLC and building crypto infrastructure with Space 
                  Age Mining Corporation—Jay formed Astro Aperture LLC to dedicate a specific space 
                  to his growing portfolio of cosmic imagery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Capturing the Cosmos */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-center mb-8">
                Capturing the Cosmos
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  From the humid backyards of Florida to the dark skies of the Okefenokee Swamp 
                  and Chiefland Astronomy Village, Jay has documented the solar system and deep 
                  sky objects. What began with basic DSLR landscape shots of the Milky Way evolved 
                  into complex deep-sky imaging using star trackers, refractors, and eventually 
                  smart telescopes like the Seestar S50.
                </p>
                <p>
                  A defining tradition of Astro Aperture is the annual photography of the Andromeda 
                  Galaxy; captured every August and September since 2020, these images serve as a 
                  marker of technical growth and a testament to the sublime beauty of the universe.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Advocacy Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl font-semibold text-center mb-8">
                Advocacy and Education
              </h2>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Astro Aperture is more than a photography portfolio; it is a platform for 
                  education and conservation. As a member of the Alachua Astronomy Club, Jay 
                  regularly hosts public stargazing events and teaches others how to capture 
                  the night sky.
                </p>
                <p>
                  His commitment to preserving our view of the cosmos led to his involvement 
                  with the Alachua County Environmental Protection Advisory Committee (EPAC), 
                  where his research and photography are used to advocate for Dark Sky regulations 
                  and mitigate light pollution.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="font-display text-3xl font-semibold mb-8">
                Innovation and the Future
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Jay continues to blend his technical skills with his artistic vision, winning 
                accolades at the NASA Space Apps Challenge for developing educational space 
                exploration games. In 2025, his concept art for the New Worlds Reading AR 
                Expeditions was selected to be laser-etched onto a nano disc aboard the 
                Griffin-1 lunar lander, sending his work to the moon.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Today, through Astro Aperture, Jay aims to complete the Messier catalog and 
                present his work in art exhibitions, hoping to inspire others to simply look 
                up and appreciate the night sky.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl font-semibold mb-6">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-6">
                Have questions about prints, licensing, or collaborations? I'd love to hear from you.
              </p>
              <a
                href="mailto:studio@jayrosen.design"
                className="inline-flex items-center gap-2 text-lg text-primary hover:text-primary/80 transition-colors"
              >
                <Mail className="w-5 h-5" />
                studio@jayrosen.design
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 rounded-xl bg-background border border-border/50"
                >
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
