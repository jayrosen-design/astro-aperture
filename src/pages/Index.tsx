import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { useAstroPosts } from "@/hooks/useAstroPosts";
import { Mail } from "lucide-react";

const Index = () => {
  const { data } = useAstroPosts(1);
  const posts = data?.posts?.nodes || [];
  const featuredPost = posts[0];

  return (
    <Layout>
      <Hero featuredPost={featuredPost} />
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
    </Layout>
  );
};

export default Index;
