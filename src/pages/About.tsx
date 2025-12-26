import { Layout } from "@/components/layout/Layout";
import { Camera, Telescope, Star, Award } from "lucide-react";

const About = () => {
  const gear = [
    {
      category: "Telescopes",
      items: ["Sky-Watcher Esprit 100ED", "Celestron EdgeHD 8\""],
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
            <h1 className="font-display text-4xl lg:text-5xl font-semibold mb-6">
              About Astro Aperture
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Welcome to my corner of the cosmos. I'm Jay Rosen, an astrophotographer 
              dedicated to capturing the infinite beauty that adorns our night skies.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="container mx-auto px-4 lg:px-8 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold">The Journey</h2>
              <p className="text-muted-foreground leading-relaxed">
                My fascination with the night sky began as a child, gazing up at the 
                stars from my backyard. What started as wonder evolved into a passion, 
                and eventually, a dedicated pursuit of capturing celestial beauty.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Over the years, I've spent countless nights under dark skies, wrestling 
                with equipment, learning the intricacies of image processing, and 
                developing the patience that astrophotography demands. Each image 
                represents hours—sometimes dozens of hours—of careful exposure and 
                meticulous post-processing.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My goal is simple: to share the awe-inspiring beauty of the universe 
                and perhaps inspire others to look up and wonder.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Camera className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">10+ Years</h3>
                <p className="text-sm text-muted-foreground">Experience</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Telescope className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">500+</h3>
                <p className="text-sm text-muted-foreground">Captures</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Star className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">Dark Skies</h3>
                <p className="text-sm text-muted-foreground">Bortle 2-3</p>
              </div>
              <div className="p-6 rounded-xl bg-card border border-border/50 text-center">
                <Award className="w-8 h-8 mx-auto mb-3 text-cosmic-blue" />
                <h3 className="font-semibold mb-1">Featured</h3>
                <p className="text-sm text-muted-foreground">NASA APOD</p>
              </div>
            </div>
          </div>
        </section>

        {/* Gear Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-center mb-12">
              Equipment
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {gear.map((category) => (
                <div
                  key={category.category}
                  className="p-6 rounded-xl bg-background border border-border/50"
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
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-display text-3xl font-semibold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="p-6 rounded-xl bg-card border border-border/50"
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
