import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { useAstroPosts } from "@/hooks/useAstroPosts";
import { Mail, Moon, Globe } from "lucide-react";
import { FlashlightCursor } from "@/components/home/FlashlightCursor";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data } = useAstroPosts(1);
  const posts = data?.posts?.nodes || [];
  const featuredPost = posts[0];

  return (
    <Layout>
      <Hero featuredPost={featuredPost} />
      
      {/* Sections with flashlight effect */}
      <div data-flashlight-section className="relative overflow-hidden">
        <FlashlightCursor color="rgba(239, 68, 68, 0.12)" size={350} />
        <AboutSection />

        {/* Dark Sky Week & Planetarium CTA */}
        <section className="py-20 bg-card/30 border-y border-border/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl lg:text-4xl font-semibold mb-4">
                Explore &amp; Advocate
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Discover the wonders of the night sky and join the movement to protect it.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8 glow-cosmic">
                  <a
                    href="https://docs.google.com/presentation/d/10vOWrC6cwEKWSiSfBJWxQNBBBDd0eOCf6NycTMDpOhU/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Moon className="w-5 h-5 mr-2" />
                    International Dark Sky Week
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <a
                    href="https://planetarium-player.lovable.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Planetarium
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CategoryShowcase />
        
        {/* Contact Section */}
        <section className="py-20 bg-card/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl font-semibold mb-4">
                Get in Touch
              </h2>
              <p className="text-muted-foreground mb-6">
                Questions about prints, licensing, or collaborations?
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
      </div>
    </Layout>
  );
};

export default Index;
