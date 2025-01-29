import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { useToast } from "@/components/ui/use-toast";

type ProductFormData = {
  name: string;
  description: string;
  price: string; // Changed to string for form handling
  category: Tables<'products'>['category'];
  nft_image_url?: string;
  nfc_tag_id?: string;
};

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ProductFormData>();

  const { data: product, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          nfts (id, image_url),
          nfc_tags (id, tag_id)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id
  });

  const createProduct = useMutation({
    mutationFn: async (data: ProductFormData) => {
      // Convert price to number and validate
      const numericPrice = parseFloat(data.price);
      if (isNaN(numericPrice)) {
        throw new Error('Invalid price value');
      }

      // First create the product
      const { data: product, error: productError } = await supabase
        .from('products')
        .insert([{
          name: data.name,
          description: data.description,
          price: numericPrice, // Send as number
          category: data.category,
        }])
        .select()
        .single();

      if (productError) throw productError;

      // If NFT image URL is provided, create NFT
      if (data.nft_image_url) {
        const { error: nftError } = await supabase
          .from('nfts')
          .insert([{
            product_id: product.id,
            image_url: data.nft_image_url,
            token_id: `TOKEN_${Date.now()}`
          }]);

        if (nftError) throw nftError;
      }

      // If NFC tag ID is provided, create NFC tag
      if (data.nfc_tag_id) {
        const { error: nfcError } = await supabase
          .from('nfc_tags')
          .insert([{
            product_id: product.id,
            tag_id: data.nfc_tag_id
          }]);

        if (nfcError) throw nfcError;
      }

      return product;
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product created successfully",
      });
      navigate('/admin/products');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create product: " + error.message,
        variant: "destructive",
      });
    }
  });

  const updateProduct = useMutation({
    mutationFn: async (data: ProductFormData) => {
      if (!id) throw new Error('No product ID provided');

      // Convert price to number and validate
      const numericPrice = parseFloat(data.price);
      if (isNaN(numericPrice)) {
        throw new Error('Invalid price value');
      }

      // Update product
      const { error: productError } = await supabase
        .from('products')
        .update({
          name: data.name,
          description: data.description,
          price: numericPrice, // Send as number
          category: data.category,
        })
        .eq('id', id);

      if (productError) throw productError;

      // Update or create NFT if image URL is provided
      if (data.nft_image_url) {
        const { error: nftError } = await supabase
          .from('nfts')
          .upsert([{
            product_id: id,
            image_url: data.nft_image_url,
            token_id: `TOKEN_${Date.now()}`
          }]);

        if (nftError) throw nftError;
      }

      // Update or create NFC tag if tag ID is provided
      if (data.nfc_tag_id) {
        const { error: nfcError } = await supabase
          .from('nfc_tags')
          .upsert([{
            product_id: id,
            tag_id: data.nfc_tag_id
          }]);

        if (nfcError) throw nfcError;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      navigate('/admin/products');
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update product: " + error.message,
        variant: "destructive",
      });
    }
  });

  const onSubmit = (data: ProductFormData) => {
    if (id) {
      updateProduct.mutate(data);
    } else {
      createProduct.mutate(data);
    }
  };

  if (id && isLoadingProduct) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        {id ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            {...register('name', { required: true })}
            defaultValue={product?.name}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            defaultValue={product?.description || ''}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            {...register('price', { 
              required: true,
              validate: value => !isNaN(parseFloat(value)) || "Please enter a valid number"
            })}
            defaultValue={product?.price}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            onValueChange={(value) => setValue('category', value as Tables<'products'>['category'])}
            defaultValue={product?.category}
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
          <Label htmlFor="nft_image_url">NFT Image URL</Label>
          <Input
            id="nft_image_url"
            {...register('nft_image_url')}
            defaultValue={product?.nfts?.[0]?.image_url}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nfc_tag_id">NFC Tag ID</Label>
          <Input
            id="nfc_tag_id"
            {...register('nfc_tag_id')}
            defaultValue={product?.nfc_tags?.[0]?.tag_id}
          />
        </div>

        <Button type="submit" className="w-full">
          {id ? 'Update Product' : 'Create Product'}
        </Button>
      </form>
    </div>
  );
};

export default ProductForm;