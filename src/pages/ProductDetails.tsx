import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

const ProductDetails = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ['product-details', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          nfts (id, image_url, token_id),
          nfc_tags (id, tag_id)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Tables<'products'> & {
        nfts: Tables<'nfts'>[];
        nfc_tags: Tables<'nfc_tags'>[];
      };
    },
    enabled: !!id
  });

  if (isLoading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg text-muted-foreground mb-4">{product.description}</p>
            <p className="text-2xl font-semibold mb-4">${product.price}</p>
            <p className="text-muted-foreground">Category: {product.category}</p>
          </div>

          {product.nfts?.[0] && (
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Product NFT</h2>
              <img
                src={product.nfts[0].image_url}
                alt="Product NFT"
                className="w-full h-auto rounded-lg"
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Token ID: {product.nfts[0].token_id}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;