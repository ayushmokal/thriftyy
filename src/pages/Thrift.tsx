import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches";
  color: string;
  size: string;
  brand_name: string;
  product_images: { image_url: string }[];
}

export default function Thrift() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches" | "all">("all");
  const categories = ["all", "Jeans", "Shirts", "Tshirts", "Shoes", "Watches"] as const;

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from("products")
        .select(`
          *,
          product_images (
            image_url
          )
        `);

      if (selectedCategory !== "all") {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="aspect-square overflow-hidden rounded-lg mb-4">
                    <img
                      src={
                        product.product_images?.[0]?.image_url ||
                        "/placeholder.svg"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-2">
                    {product.description?.slice(0, 100)}
                    {product.description?.length > 100 ? "..." : ""}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <span className="text-sm text-gray-500">
                      {product.brand_name}
                    </span>
                  </div>
                  {product.size && (
                    <span className="text-sm text-gray-500 block mt-2">
                      Size: {product.size}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}