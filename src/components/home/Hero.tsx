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
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/89f9675e74b214df827b4c3b56215a9a44e8f081c0490e03986b5e82d6fdd3a0?placeholderIfAbsent=true"
            alt="Hero fashion"
            className="w-full h-auto rounded-2xl shadow-xl"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}