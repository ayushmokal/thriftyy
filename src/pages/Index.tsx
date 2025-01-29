import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { Products } from "@/components/home/Products";
import { Collections } from "@/components/home/Collections";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <Products />
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            We provide high quality footwear
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            The epitome of exceptional footwear. At our brand, we pride ourselves on providing nothing but the highest quality
            shoes that elevate your style and comfort. Step into a world where craftsmanship meets durability, where every step
            exudes confidence. Our premium collection is meticulously crafted to deliver unparalleled excellence. Choose us for
            superior footwear that surpasses expectations. Experience the luxury of high-quality footwear.
          </p>
        </div>
      </section>
      <Collections />
      <Testimonials />
      <Newsletter />
    </main>
  );
};

export default Index;