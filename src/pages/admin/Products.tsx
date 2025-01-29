import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const PRODUCT_CATEGORIES = ["Jeans", "Shirts", "Tshirts", "Shoes", "Watches"] as const;

const AdminProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          nfts (id, image_url),
          nfc_tags (id, tag_id)
        `);
      
      if (error) throw error;
      return data as (Tables<'products'> & {
        nfts: Tables<'nfts'>[];
        nfc_tags: Tables<'nfc_tags'>[];
      })[];
    }
  });

  if (isLoading) return <div>Loading...</div>;

  // Group products by category
  const productsByCategory = PRODUCT_CATEGORIES.reduce((acc, category) => {
    acc[category] = products?.filter(product => product.category === category) || [];
    return acc;
  }, {} as Record<typeof PRODUCT_CATEGORIES[number], typeof products>);

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
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{product.name}</h3>
                        <p className="text-muted-foreground">Price: ${product.price}</p>
                        {product.nfts?.length > 0 && (
                          <p className="text-sm text-green-600">NFT Attached</p>
                        )}
                        {product.nfc_tags?.length > 0 && (
                          <p className="text-sm text-blue-600">NFC Tag: {product.nfc_tags[0].tag_id}</p>
                        )}
                      </div>
                      <Link to={`/admin/products/${product.id}/edit`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
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