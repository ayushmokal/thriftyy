import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import Navbar from "@/components/Navbar";

type ProductCategory = Tables<'products'>['category'];

const SellPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [category, setCategory] = useState<ProductCategory | ''>('');
  const [images, setImages] = useState<{ [key: string]: File | null }>({
    front: null,
    back: null,
    closeup: null,
  });
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brandName: '',
    size: '',
    materials: '',
    condition: '',
    modelName: '',
    manufacturedDate: '',
  });

  const handleImageChange = (type: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImages(prev => ({ ...prev, [type]: e.target.files![0] }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const uploadImage = async (file: File, type: string) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${crypto.randomUUID()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);

      // Upload images
      const imageUrls: { [key: string]: string } = {};
      for (const [type, file] of Object.entries(images)) {
        if (file) {
          imageUrls[type] = await uploadImage(file, type);
        }
      }

      // Create product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([{
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category,
          brand_name: formData.brandName,
          size: formData.size,
          materials: formData.materials.split(',').map(m => m.trim()),
          condition: formData.condition,
          model_name: formData.modelName,
          manufactured_date: formData.manufacturedDate || null,
          approved: false,
        }])
        .select()
        .single();

      if (productError) throw productError;

      // Create product images
      const imageInserts = Object.entries(imageUrls).map(([type, url]) => ({
        product_id: product.id,
        image_url: url,
        image_type: type,
      }));

      const { error: imagesError } = await supabase
        .from('product_images')
        .insert(imageInserts);

      if (imagesError) throw imagesError;

      toast({
        title: "Success",
        description: "Your item has been submitted for review",
      });
      navigate('/');
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

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sell Your Item</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
          <div>
            <Label htmlFor="category">Category</Label>
            <Select onValueChange={(value) => setCategory(value as ProductCategory)}>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="frontImage">Front Image</Label>
              <Input
                id="frontImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange('front')}
                required
              />
            </div>
            <div>
              <Label htmlFor="backImage">Back Image</Label>
              <Input
                id="backImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange('back')}
                required
              />
            </div>
            <div>
              <Label htmlFor="closeupImage">Close-up Image</Label>
              <Input
                id="closeupImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange('closeup')}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="name">Item Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <Label htmlFor="brandName">Brand Name</Label>
            <Input
              id="brandName"
              name="brandName"
              value={formData.brandName}
              onChange={handleInputChange}
              required
            />
          </div>

          {category !== 'Watches' && (
            <>
              <div>
                <Label htmlFor="size">Size</Label>
                <Input
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="materials">Materials (comma-separated)</Label>
                <Input
                  id="materials"
                  name="materials"
                  value={formData.materials}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          {category === 'Watches' && (
            <>
              <div>
                <Label htmlFor="modelName">Model Name</Label>
                <Input
                  id="modelName"
                  name="modelName"
                  value={formData.modelName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="manufacturedDate">Manufactured Date</Label>
                <Input
                  id="manufacturedDate"
                  name="manufacturedDate"
                  type="date"
                  value={formData.manufacturedDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}

          <div>
            <Label htmlFor="condition">Condition</Label>
            <Select onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Like New">Like New</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit for Review"}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SellPage;