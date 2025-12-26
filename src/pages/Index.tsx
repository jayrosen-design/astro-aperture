import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { useAstroPosts } from "@/hooks/useAstroPosts";

const Index = () => {
  const { data } = useAstroPosts(1);
  const posts = data?.posts?.nodes || [];
  const featuredPost = posts[0];

  return (
    <Layout>
      <Hero featuredPost={featuredPost} />
      <AboutSection />
      <CategoryShowcase />
    </Layout>
  );
};

export default Index;
