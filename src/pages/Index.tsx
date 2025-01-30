import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Products } from "@/components/home/Products";
import { Collections } from "@/components/home/Collections";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      <main className="min-h-screen">
        <Hero />
        <Features />
        <Products />
        <Collections />
        <Testimonials />
        <Newsletter />
      </main>
    </Layout>
  );
};

export default Index;