import { useState } from "react";
import { useForm } from "react-hook-form";
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

type ProductFormData = {
  name: string;
  description: string;
  price: string;
  category: Tables<'products'>['category'];
  brand_name: string;
  model_name?: string;
  size?: string;
  materials?: string[];
  manufactured_date?: string;
  condition: string;
};

type ImageType = 'front' | 'back' | 'closeup';

const SellItem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [imageFiles, setImageFiles] = useState<Record<ImageType, File | null>>({
    front: null,
    back: null,
    closeup: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProductFormData>();
  const selectedCategory = watch('category');

  const handleImageChange = (type: ImageType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFiles(prev => ({
        ...prev,
        [type]: e.target.files![0]
      }));
    }
  };

  const uploadImage = async (file: File, productId: string, type: ImageType) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `${productId}/${type}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    await supabase.from('product_images').insert({
      product_id: productId,
      image_url: publicUrl,
      image_type: type
    });

    return publicUrl;
  };

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      // Validate images
      if (!imageFiles.front || !imageFiles.back || !imageFiles.closeup) {
        toast({
          title: "Error",
          description: "Please upload all required images",
          variant: "destructive",
        });
        return;
      }

      // Create product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert({
          name: data.name,
          description: data.description,
          price: parseFloat(data.price),
          category: data.category,
          brand_name: data.brand_name,
          model_name: data.model_name,
          size: data.size,
          materials: data.materials,
          manufactured_date: data.manufactured_date,
          condition: data.condition,
          approved: false
        })
        .select()
        .single();

      if (productError) throw productError;

      // Upload images
      await Promise.all([
        uploadImage(imageFiles.front, product.id, 'front'),
        uploadImage(imageFiles.back, product.id, 'back'),
        uploadImage(imageFiles.closeup, product.id, 'closeup'),
      ]);

      toast({
        title: "Success",
        description: "Your item has been submitted for approval",
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Sell Your Item</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label htmlFor="category">Category *</Label>
          <Select
            onValueChange={(value) => setValue('category', value as Tables<'products'>['category'])}
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
          <Label htmlFor="name">Item Name *</Label>
          <Input
            id="name"
            {...register('name', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description *</Label>
          <Textarea
            id="description"
            {...register('description', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { required: true })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="brand_name">Brand Name *</Label>
          <Input
            id="brand_name"
            {...register('brand_name', { required: true })}
          />
        </div>

        {selectedCategory === 'Watches' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="model_name">Model Name *</Label>
              <Input
                id="model_name"
                {...register('model_name', { required: true })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="manufactured_date">Manufactured Date *</Label>
              <Input
                id="manufactured_date"
                type="date"
                {...register('manufactured_date', { required: true })}
              />
            </div>
          </>
        )}

        {['Jeans', 'Shirts', 'Tshirts'].includes(selectedCategory || '') && (
          <div className="space-y-2">
            <Label htmlFor="size">Size *</Label>
            <Input
              id="size"
              {...register('size', { required: true })}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="condition">Condition *</Label>
          <Select onValueChange={(value) => setValue('condition', value)}>
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

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Product Images *</h3>
          
          <div className="space-y-2">
            <Label htmlFor="front-image">Front View</Label>
            <Input
              id="front-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange('front')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="back-image">Back View</Label>
            <Input
              id="back-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange('back')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="closeup-image">Close-up View</Label>
            <Input
              id="closeup-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange('closeup')}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit for Approval"}
        </Button>
      </form>
    </div>
  );
};

export default SellItem;