import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background to-accent/20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-white/10 bg-grid-16 [mask-image:radial-gradient(white,transparent_85%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-32 md:py-48">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              NFC<br />Clothing & THRIFTING
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover a new era of thrifting with Thrifty, India's first thrifting site that uses NFC technology to revolutionize how you shop pre-loved fashion.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="rounded-full bg-gradient-to-r from-primary to-purple-600 hover:opacity-90 transition-all duration-300">
                Get Started
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30 animate-pulse" />
            <div className="relative rounded-2xl overflow-hidden">
              <video
                src="https://videos.pexels.com/video-files/5743177/5743177-uhd_2732_1440_25fps.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>
    </section>
  );
}