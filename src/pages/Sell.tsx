import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useWeb3 } from "@/context/Web3Context";
import { createProductNFT, uploadToIPFS } from "@/services/blockchain";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Database } from "@/integrations/supabase/types";

type ProductCategory = Database["public"]["Enums"]["product_category"];

const Sell = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<ProductCategory>("Jeans");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [condition, setCondition] = useState("");
  const [brandName, setBrandName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { web3, account, isConnected } = useWeb3();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to list an item.",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Create metadata for IPFS
      const metadata = {
        name,
        description,
        attributes: [
          { trait_type: "Category", value: category },
          { trait_type: "Brand", value: brandName },
          { trait_type: "Condition", value: condition },
          { trait_type: "Size", value: size },
          { trait_type: "Color", value: color }
        ]
      };

      // Upload metadata to IPFS
      const tokenURI = await uploadToIPFS(metadata);

      if (!web3 || !account) throw new Error("Web3 not initialized");

      // Create NFT
      const result = await createProductNFT(
        web3,
        account,
        tokenURI,
        web3.utils.toWei(price, 'ether')
      );

      // Save to Supabase
      const { error } = await supabase.from("products").insert({
        name,
        description,
        price: web3.utils.toWei(price, 'ether'),
        category,
        color,
        size,
        condition,
        brand_name: brandName,
        token_id: result.events.Transfer.returnValues.tokenId,
        seller_address: account,
        approved: false,
      });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your product has been listed and submitted for review",
      });

      // Reset form and redirect
      navigate("/");
    } catch (error: any) {
      console.error("Error listing product:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to list product",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">List Your Item as NFT</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (in ETH)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={(value: ProductCategory) => setCategory(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Jeans">Jeans</SelectItem>
                  <SelectItem value="Shirts">Shirts</SelectItem>
                  <SelectItem value="Tshirts">T-shirts</SelectItem>
                  <SelectItem value="Shoes">Shoes</SelectItem>
                  <SelectItem value="Watches">Watches</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="condition">Condition</Label>
              <Input
                id="condition"
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={loading || !isConnected}
            >
              {loading ? "Creating NFT..." : "List Item as NFT"}
            </Button>

            {!isConnected && (
              <p className="text-sm text-muted-foreground text-center">
                Connect your wallet to list an item
              </p>
            )}
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sell;
