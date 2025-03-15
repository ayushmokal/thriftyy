
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Home } from "lucide-react";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const sampleNftData = [
  { name: 'Jan', value: 12 },
  { name: 'Feb', value: 19 },
  { name: 'Mar', value: 15 },
  { name: 'Apr', value: 25 },
  { name: 'May', value: 22 },
  { name: 'Jun', value: 30 }
];

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
  materials?: string[];
  seller_address?: string;
  buyer_address?: string;
  product_images: { image_url: string }[];
  token_id?: number;
  contract_address?: string;
  created_at: string;
}

export default function NfcProductPreview() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

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
        toast({
          title: "Error",
          description: "Failed to load product details",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!product) {
    return <div className="flex justify-center items-center min-h-screen">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8 relative cyber-grid">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      </div>

      {/* Home Button */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate('/')}
          className="rounded-full bg-white/90 backdrop-blur-sm hover:bg-white/70"
        >
          <Home className="h-4 w-4 sm:h-5 sm:w-5" />
        </Button>
      </div>

      {/* Centered GooeyText */}
      <div className="w-full mb-6 sm:mb-8 flex justify-center">
        <div className="w-48 sm:w-64">
          <GooeyText
            texts={["THRIFTY", "WEB3", "NFT", "FASHION"]}
            textClassName="font-bold text-primary"
          />
        </div>
      </div>

      <Card className="max-w-4xl mx-auto p-4 sm:p-6 cyber-card">
        <div className="space-y-6 sm:space-y-8">
          {/* Product Images */}
          <div>
            {product.product_images && product.product_images.length > 0 ? (
              <img
                src={product.product_images[0].image_url}
                alt={product.name}
                className="w-full h-48 sm:h-64 object-cover rounded-lg cyber-border"
              />
            ) : (
              <div className="w-full h-48 sm:h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                No image available
              </div>
            )}
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-3 sm:space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
              <Facebook className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
              <Twitter className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
              <Youtube className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </a>
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-3xl font-bold neon-text">{product.name}</h1>
            <p className="text-xl sm:text-2xl font-semibold text-primary">
              {product.price} ETH
            </p>
            <p className="text-base sm:text-lg">
              Status: <span className="text-green-500 font-semibold">Available</span>
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4">
              <div>
                <h3 className="font-medium text-gray-700">Brand</h3>
                <p>{product.brand_name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Model</h3>
                <p>{product.model_name}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Size</h3>
                <p>{product.size}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Color</h3>
                <p>{product.color}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-700">Condition</h3>
                <p>{product.condition}</p>
              </div>
              {product.materials && (
                <div>
                  <h3 className="font-medium text-gray-700">Materials</h3>
                  <p>{product.materials.join(", ")}</p>
                </div>
              )}
            </div>
          </div>

          {/* NFT Image */}
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto">
            <img
              src="/lovable-uploads/d673859c-efb5-4288-8447-10c50d855ceb.png"
              alt="NFT"
              className="w-full h-full object-contain animate-float"
            />
          </div>

          {/* NFT Statistics Chart */}
          <div className="mt-6 sm:mt-8">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 neon-text">NFT Trading Activity</h2>
            <div className="h-48 sm:h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sampleNftData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Product Statistics */}
          <div className="overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Product Details</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell className="font-medium">Detail</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>NFT Token ID</TableCell>
                  <TableCell>{product.token_id || "Not minted"}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Listed Date</TableCell>
                  <TableCell>
                    {new Date(product.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>{product.category}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Ownership Details */}
          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Ownership Details</h2>
            {product.seller_address && (
              <div className="mb-2">
                <h3 className="font-medium text-gray-700">Seller</h3>
                <p className="text-xs sm:text-sm break-all">{product.seller_address}</p>
              </div>
            )}
            {product.buyer_address && (
              <div>
                <h3 className="font-medium text-gray-700">Current Owner</h3>
                <p className="text-xs sm:text-sm break-all">{product.buyer_address}</p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
