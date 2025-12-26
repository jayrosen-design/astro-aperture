import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { LatestCaptures } from "@/components/home/LatestCaptures";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { useAstroPosts } from "@/hooks/useAstroPosts";

const Index = () => {
  const { data, isLoading } = useAstroPosts(12);
  const posts = data?.posts?.nodes || [];
  const featuredPost = posts[0];

  return (
    <Layout>
      <Hero featuredPost={featuredPost} />
      <LatestCaptures posts={posts} isLoading={isLoading} />
      <CategoryShowcase />
    </Layout>
  );
};

export default Index;
