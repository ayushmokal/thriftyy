import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

const PRODUCT_CATEGORIES = ["Jeans", "Shirts", "Tshirts", "Shoes", "Watches"] as const;

const AdminProducts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          nfts (id, image_url),
          nfc_tags (id, tag_id),
          product_images (id, image_url, image_type)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as (Tables<'products'> & {
        nfts: Tables<'nfts'>[];
        nfc_tags: Tables<'nfc_tags'>[];
        product_images: Tables<'product_images'>[];
      })[];
    }
  });

  const approveProductMutation = useMutation({
    mutationFn: async (productId: string) => {
      const { error } = await supabase
        .from('products')
        .update({ approved: true })
        .eq('id', productId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-products'] });
      toast({
        title: "Success",
        description: "Product has been approved and added to the thrift section",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to approve product: " + error.message,
        variant: "destructive",
      });
    },
  });

  if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  // Group products by category
  const productsByCategory = PRODUCT_CATEGORIES.reduce((acc, category) => {
    acc[category] = products?.filter(product => product.category === category) || [];
    return acc;
  }, {} as Record<typeof PRODUCT_CATEGORIES[number], typeof products>);

  const handleApprove = (productId: string) => {
    approveProductMutation.mutate(productId);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {PRODUCT_CATEGORIES.map((category) => (
          <AccordionItem key={category} value={category} className="border rounded-lg">
            <AccordionTrigger className="px-4">
              <div className="flex justify-between items-center w-full">
                <span>{category}</span>
                <span className="text-sm text-muted-foreground">
                  ({productsByCategory[category]?.length || 0} products)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="grid gap-4">
                {productsByCategory[category]?.map((product) => (
                  <div key={product.id} className="border p-4 rounded-lg">
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{product.name}</h3>
                          <p className="text-muted-foreground">Price: ${product.price}</p>
                          <div className="flex gap-2 mt-2">
                            {!product.approved && (
                              <Badge variant="destructive">Pending Approval</Badge>
                            )}
                            {product.nfts?.length > 0 && (
                              <Badge variant="secondary">NFT Attached</Badge>
                            )}
                            {product.nfc_tags?.length > 0 && (
                              <Badge variant="outline">
                                NFC Tag: {product.nfc_tags[0].tag_id}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!product.approved && (
                            <Button
                              onClick={() => handleApprove(product.id)}
                              variant="default"
                              size="sm"
                            >
                              Approve
                            </Button>
                          )}
                          <Link to={`/admin/products/${product.id}/edit`}>
                            <Button variant="outline" size="sm">Edit</Button>
                          </Link>
                        </div>
                      </div>
                      
                      {/* Product Images */}
                      {product.product_images && product.product_images.length > 0 && (
                        <div className="grid grid-cols-3 gap-4">
                          {product.product_images.map((image) => (
                            <div key={image.id} className="relative aspect-square">
                              <img
                                src={image.image_url}
                                alt={`${product.name} - ${image.image_type}`}
                                className="object-cover w-full h-full rounded-md"
                              />
                              <span className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                                {image.image_type}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Additional Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        {product.brand_name && (
                          <p><span className="font-medium">Brand:</span> {product.brand_name}</p>
                        )}
                        {product.size && (
                          <p><span className="font-medium">Size:</span> {product.size}</p>
                        )}
                        {product.condition && (
                          <p><span className="font-medium">Condition:</span> {product.condition}</p>
                        )}
                        {product.materials && (
                          <p><span className="font-medium">Materials:</span> {product.materials.join(', ')}</p>
                        )}
                        {product.manufactured_date && (
                          <p><span className="font-medium">Manufactured:</span> {new Date(product.manufactured_date).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {(!productsByCategory[category] || productsByCategory[category].length === 0) && (
                  <p className="text-muted-foreground text-center py-4">
                    No products in this category
                  </p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default AdminProducts;