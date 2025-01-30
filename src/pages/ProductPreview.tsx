import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches";
  color: string;
  size: string;
  brand_name: string;
  model_name: string;
  condition: string;
  product_images: { image_url: string }[];
}

export default function ProductPreview() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select(`
            *,
            product_images (
              image_url
            )
          `)
          .eq("id", id)
          .single();

        if (error) throw error;
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              {product.product_images && product.product_images.length > 0 ? (
                <img
                  src={product.product_images[0].image_url}
                  alt={product.name}
                  className="w-full h-auto rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  No image available
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-semibold text-primary">₹{product.price}</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {product.brand_name && (
                    <div>
                      <h3 className="font-medium text-gray-700">Brand</h3>
                      <p>{product.brand_name}</p>
                    </div>
                  )}
                  {product.model_name && (
                    <div>
                      <h3 className="font-medium text-gray-700">Model</h3>
                      <p>{product.model_name}</p>
                    </div>
                  )}
                  {product.category && (
                    <div>
                      <h3 className="font-medium text-gray-700">Category</h3>
                      <p>{product.category}</p>
                    </div>
                  )}
                  {product.size && (
                    <div>
                      <h3 className="font-medium text-gray-700">Size</h3>
                      <p>{product.size}</p>
                    </div>
                  )}
                  {product.color && (
                    <div>
                      <h3 className="font-medium text-gray-700">Color</h3>
                      <p>{product.color}</p>
                    </div>
                  )}
                  {product.condition && (
                    <div>
                      <h3 className="font-medium text-gray-700">Condition</h3>
                      <p>{product.condition}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
}