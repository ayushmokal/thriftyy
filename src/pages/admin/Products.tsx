import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

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

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link to="/admin/products/new">
          <Button>Add New Product</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {products?.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{product.name}</h3>
                <p className="text-muted-foreground">Category: {product.category}</p>
                <p className="text-muted-foreground">Price: {product.price}</p>
              </div>
              <Link to={`/admin/products/${product.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;