import { Card, CardContent } from "@/components/ui/card";

export function Products() {
  const products = [
    {
      name: "Pigment Dyed College",
      price: "1600rs",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0a75f102b5dfd9f67ea45dc66abb3f6920a28dcd6c50ec12071e8a8ce6bb2c32?placeholderIfAbsent=true"
    },
    {
      name: "Converse Tropical",
      price: "1600rs",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/53dc01e8d40432f1d013ab1331a41135b13f95a6d1d082a231b806233b389aef?placeholderIfAbsent=true"
    },
    {
      name: "Wool-blend Baseball",
      price: "16000rs",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/4395b03b1d969c1f035391151c1c31fbe9c7bab4da580cd8696b6b9581816e7e?placeholderIfAbsent=true"
    }
  ];

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          A <span className="text-primary">top-selling</span> product
        </h2>
        <p className="text-lg text-muted-foreground">
          Introducing our top-selling product. Experience excellence like never before. 
          Elevate your lifestyle with this must-have item. Don't miss out. Order now!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg mb-4"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-muted-foreground">{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}