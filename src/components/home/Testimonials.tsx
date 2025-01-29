import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          What <span className="text-primary">our customer</span> says
        </h2>
        <p className="text-lg text-muted-foreground">
          Hear from our customers. Discover their testimonials and experiences. 
          Find out why they love us. Explore the voices of satisfaction.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8 text-center">
          <blockquote className="text-lg mb-6">
            "Thrifting at Thrift ID has been an incredible experience! Their selection of pre-loved gems is unparalleled. 
            I've found unique and stylish pieces at amazing prices. The quality and service are exceptional. 
            Thrift ID is a must-visit for eco-conscious fashion enthusiasts. Highly recommended for affordable and sustainable fashion finds!"
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/f80ab571bd6a965a497abf98f25820bffcd784130bcdba487f5ef9603383daef?placeholderIfAbsent=true" alt="Scarlett Thomas" />
            </Avatar>
            <div className="text-left">
              <p className="font-semibold">Scarlett Thomas</p>
              <p className="text-sm text-muted-foreground">Singapore</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}