import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/context/Web3Context";
import { buyProductNFT, uploadToIPFS } from "@/services/blockchain";

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
  token_id?: number;
}

export default function ProductPreview() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const { toast } = useToast();
  const { web3, account, isConnected } = useWeb3();

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

  const handleBuyNow = async () => {
    if (!product || !web3 || !account) return;
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to purchase this item.",
        variant: "destructive",
      });
      return;
    }

    try {
      setPurchasing(true);
      
      // Create metadata for IPFS
      const metadata = {
        name: product.name,
        description: product.description,
        image: product.product_images[0]?.image_url,
        attributes: [
          { trait_type: "Category", value: product.category },
          { trait_type: "Brand", value: product.brand_name },
          { trait_type: "Condition", value: product.condition },
          { trait_type: "Size", value: product.size },
          { trait_type: "Color", value: product.color }
        ]
      };

      // Upload metadata to IPFS
      const tokenURI = await uploadToIPFS(metadata);

      // Purchase the NFT
      await buyProductNFT(
        web3,
        account,
        product.token_id!,
        product.price.toString()
      );

      toast({
        title: "Purchase Successful!",
        description: "The item has been purchased and NFT transferred to your wallet.",
      });

      // Update product status in Supabase
      const { error } = await supabase
        .from("products")
        .update({ 
          buyer_address: account,
          approved: false  // Set to false since it's been purchased
        })
        .eq("id", product.id);

      if (error) throw error;

    } catch (error: any) {
      console.error("Error processing purchase:", error);
      toast({
        title: "Purchase Failed",
        description: error.message || "Failed to process the purchase",
        variant: "destructive",
      });
    } finally {
      setPurchasing(false);
    }
  };

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
                <p className="text-2xl font-semibold text-primary mb-4">
                  {web3?.utils.fromWei(product.price.toString(), 'ether')} ETH
                </p>
                <Button 
                  className="w-full mb-6" 
                  size="lg"
                  onClick={handleBuyNow}
                  disabled={purchasing || !isConnected}
                >
                  {purchasing ? "Processing..." : "Buy Now with ETH"}
                </Button>
                {!isConnected && (
                  <p className="text-sm text-muted-foreground text-center">
                    Connect your wallet to purchase this item
                  </p>
                )}
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
