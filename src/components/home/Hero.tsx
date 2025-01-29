import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full">
            <span className="text-primary font-semibold">SELL</span>
          </div>
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
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop"
            alt="Stylish clothing rack with organized fashion items"
            className="w-full h-auto rounded-2xl shadow-xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}