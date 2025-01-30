import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];

const AdminDashboard = () => {
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  useEffect(() => {
    fetchPendingProducts();
  }, []);

  const fetchPendingProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("approved", false);

      if (error) throw error;
      setPendingProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .update({ approved: true })
        .eq("id", productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product approved successfully",
      });

      fetchPendingProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleReject = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product rejected and removed",
      });

      fetchPendingProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Tabs defaultValue="sell-requests" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sell-requests">Sell Requests</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sell-requests">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Pending Sell Requests</h2>
              <div className="space-y-4">
                {pendingProducts.length === 0 ? (
                  <p className="text-gray-500">No pending products to review</p>
                ) : (
                  pendingProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                        <p className="text-sm">
                          Price: ₹{product.price} | Category: {product.category}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          onClick={() => handleApprove(product.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleReject(product.id)}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="add-product">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
              <Button onClick={() => navigate("/admin/dashboard/add")}>
                Add New Product
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;