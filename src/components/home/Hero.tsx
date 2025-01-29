import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            NFC<br />Clothing & THRIFTING
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover a new era of thrifting with Thrifty, India's first thrifting site that uses NFC technology to revolutionize how you shop pre-loved fashion.
          </p>
          <Button size="lg" className="rounded-full">
            Get Started
          </Button>
        </div>
        <div className="relative">
          <video
            src="https://videos.pexels.com/video-files/5743177/5743177-uhd_2732_1440_25fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-auto rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}