import { WavyBackground } from "@/components/ui/wavy-background";
import { motion } from "framer-motion";
import { GradientButton } from "@/components/ui/gradient-button";

export function Products() {
  return (
    <>
      <WavyBackground 
        className="max-w-4xl mx-auto pb-20"
        colors={["#1a1f2c", "#2a2f3c", "#3a3f4c", "#4a4f5c"]}
        waveWidth={100}
        backgroundFill="#161923"
        blur={5}
        speed="slow"
        waveOpacity={0.3}
      >
        <p className="text-2xl md:text-4xl lg:text-7xl text-white font-bold inter-var text-center">
          Featured Products
        </p>
        <p className="text-base md:text-lg mt-4 text-white font-normal inter-var text-center">
          Discover our curated collection of pre-loved fashion.
        </p>
      </WavyBackground>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: item * 0.1 }}
              className="cyber-card p-6 rounded-xl"
            >
              <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
                <img
                  src={`/product-${item}.jpg`}
                  alt={`Product ${item}`}
                  className="object-cover w-full h-full transform hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-primary/90 text-white px-2 py-1 rounded">
                  ₹999
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 neon-text">Vintage Denim Jacket</h3>
              <p className="text-muted-foreground mb-4">Classic style with modern comfort</p>
              <GradientButton className="w-full">
                View Details
              </GradientButton>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}