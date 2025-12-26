import { Layout } from "@/components/layout/Layout";
import { Camera, Telescope, Star, Award, Moon, Sparkles, Globe, BookOpen } from "lucide-react";

const About = () => {
  const milestones = [
    {
      year: "2020",
      title: "The Spark",
      description: "While photographing a Super Moon on March 9, Jay inadvertently captured Jupiter and its moons, igniting an obsession with astrophotography.",
    },
    {
      year: "2020-Present",
      title: "Andromeda Tradition",
      description: "Every August and September, Jay photographs the Andromeda Galaxy—a tradition marking technical growth and celestial beauty.",
    },
    {
      year: "2023",
      title: "Dark Sky Advocacy",
      description: "Joined the Alachua County Environmental Protection Advisory Committee to advocate for Dark Sky regulations.",
    },
    {
      year: "2025",
      title: "To the Moon",
      description: "Concept art for New Worlds Reading AR Expeditions selected to be laser-etched onto a nano disc aboard the Griffin-1 lunar lander.",
    },
  ];

  const gear = [
    {
      category: "Telescopes",
      items: ["Sky-Watcher Esprit 100ED", "Celestron EdgeHD 8\"", "Seestar S50"],
    },
    {
      category: "Cameras",
      items: ["ZWO ASI2600MC Pro", "Canon EOS Ra"],
    },
    {
      category: "Mounts",
      items: ["Sky-Watcher EQ6-R Pro", "iOptron CEM70"],
    },
    {
      category: "Accessories",
      items: ["ZWO EAF", "ASIAIR Pro", "Optolong L-Pro Filter"],
    },
  ];

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
      answer: "Absolutely. Please reach out via the contact page for licensing inquiries.",
    },
    {
      question: "How long does shipping take?",
      answer: "Most orders ship within 3-5 business days. International shipping times vary by location.",
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-24 lg:pt-32">
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
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold">The Intersection of Art and Science</h2>
              <p className="text-muted-foreground leading-relaxed">
                With a Bachelor of Fine Arts from the University of Florida, Jay's creative 
                roots began in mixed media and light installation art. His early works, such 
                as the book <em>Great Barrier Reef</em> and the <em>Mirror Visionwear</em> series, 
                explored themes of astronauts, exploration, and optical perception.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                However, the global lockdown of 2020 shifted his focus from the studio to the 
                stars, transforming a curiosity about the night sky into a dedicated pursuit 
                of capturing the invisible.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Camera className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">BFA</h3>
                <p className="text-sm text-muted-foreground">University of Florida</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Telescope className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">Since 2020</h3>
                <p className="text-sm text-muted-foreground">Astrophotography</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Star className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">Dark Skies</h3>
                <p className="text-sm text-muted-foreground">Conservation</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Moon className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">Griffin-1</h3>
                <p className="text-sm text-muted-foreground">Lunar Lander 2025</p>
              </div>
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

        {/* Timeline */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-center mb-12">
              Journey Milestones
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
                {milestones.map((milestone, index) => (
                  <div
                    key={milestone.year}
                    className={`relative flex items-start gap-6 mb-8 ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    <div className="hidden md:block flex-1" />
                    <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1/2 mt-2" />
                    <div className="flex-1 ml-10 md:ml-0 p-6 rounded-xl bg-background border border-border/50">
                      <span className="text-sm text-primary font-medium">{milestone.year}</span>
                      <h3 className="font-semibold mt-1 mb-2">{milestone.title}</h3>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Advocacy Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6">
                <h2 className="font-display text-3xl font-semibold">Advocacy and Education</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Astro Aperture is more than a photography portfolio; it is a platform for 
                  education and conservation. As a member of the Alachua Astronomy Club, Jay 
                  regularly hosts public stargazing events and teaches others how to capture 
                  the night sky.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  His commitment to preserving our view of the cosmos led to his involvement 
                  with the Alachua County Environmental Protection Advisory Committee (EPAC), 
                  where his research and photography are used to advocate for Dark Sky regulations 
                  and mitigate light pollution.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                  <Globe className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                  <h3 className="font-semibold mb-1">EPAC</h3>
                  <p className="text-sm text-muted-foreground">Committee Member</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                  <h3 className="font-semibold mb-1">Public Events</h3>
                  <p className="text-sm text-muted-foreground">Stargazing Host</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                  <Award className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                  <h3 className="font-semibold mb-1">NASA</h3>
                  <p className="text-sm text-muted-foreground">Space Apps Winner</p>
                </div>
                <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                  <Star className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                  <h3 className="font-semibold mb-1">Messier</h3>
                  <p className="text-sm text-muted-foreground">Catalog in Progress</p>
                </div>
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

        {/* Gear Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-center mb-12">
              Equipment
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {gear.map((category) => (
                <div
                  key={category.category}
                  className="p-6 rounded-xl bg-card border border-border/50"
                >
                  <h3 className="font-semibold mb-4 text-primary">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
