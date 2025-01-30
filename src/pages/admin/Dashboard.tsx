import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type ProductCategory = Database["public"]["Enums"]["product_category"];

type FormData = {
  name: string;
  description: string;
  price: string;
  category: ProductCategory;
  color: string;
  size: string;
  condition: string;
  brand_name: string;
  model_name: string;
};

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    category: "Jeans",
    color: "",
    size: "",
    condition: "",
    brand_name: "",
    model_name: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Insert product
      const { data: product, error: productError } = await supabase
        .from("products")
        .insert([
          {
            ...formData,
            price: parseFloat(formData.price),
          },
        ])
        .select()
        .single();

      if (productError) throw productError;

      if (imageFile && product) {
        const fileExt = imageFile.name.split(".").pop();
        const filePath = `${product.id}-${Math.random()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(filePath, imageFile);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: publicURL } = supabase.storage
          .from("product-images")
          .getPublicUrl(filePath);

        // Insert image reference
        const { error: imageError } = await supabase
          .from("product_images")
          .insert([
            {
              product_id: product.id,
              image_url: publicURL.publicUrl,
              image_type: "main",
            },
          ]);

        if (imageError) throw imageError;
      }

      toast({
        title: "Success",
        description: "Product added successfully",
      });

      // Reset form
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "Jeans",
        color: "",
        size: "",
        condition: "",
        brand_name: "",
        model_name: "",
      });
      setImageFile(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category}
                  onValueChange={(value: ProductCategory) =>
                    setFormData({ ...formData, category: value })
                  }
                  required
                >
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
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Input
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Input
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Condition</label>
                <Input
                  value={formData.condition}
                  onChange={(e) =>
                    setFormData({ ...formData, condition: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Brand Name</label>
                <Input
                  value={formData.brand_name}
                  onChange={(e) =>
                    setFormData({ ...formData, brand_name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Model Name</label>
                <Input
                  value={formData.model_name}
                  onChange={(e) =>
                    setFormData({ ...formData, model_name: e.target.value })
                  }
                />
              </div>

            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Product Image</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImageFile(e.target.files ? e.target.files[0] : null)
                }
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Adding Product..." : "Add Product"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
