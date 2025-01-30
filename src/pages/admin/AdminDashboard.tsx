import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Database } from "@/integrations/supabase/types";

type Product = Database["public"]["Tables"]["products"]["Row"];
type ContactSubmission = Database["public"]["Tables"]["contact_submissions"]["Row"];

const AdminDashboard = () => {
  const [pendingProducts, setPendingProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
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

      // Refresh the products lists
      fetchPendingProducts();
      fetchAllProducts();
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

      // Refresh the products lists
      fetchPendingProducts();
      fetchAllProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleEdit = (productId: string) => {
    navigate(`/admin/dashboard/edit/${productId}`);
  };

  const handleDelete = async (productId: string) => {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Product deleted successfully",
      });

      // Refresh the products list
      fetchAllProducts();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

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

  const fetchAllProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAllProducts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchContactSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContactSubmissions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateSubmissionStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("contact_submissions")
        .update({ status })
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Status updated successfully",
      });

      fetchContactSubmissions();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPendingProducts();
    fetchAllProducts();
    fetchContactSubmissions();
  }, []);

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="sell-requests">Sell Requests</TabsTrigger>
            <TabsTrigger value="manage-products">Manage Products</TabsTrigger>
            <TabsTrigger value="add-product">Add Product</TabsTrigger>
            <TabsTrigger value="contact-submissions">Contact Enquiries</TabsTrigger>
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

          <TabsContent value="manage-products">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Manage Products</h2>
              <div className="space-y-4">
                {allProducts.length === 0 ? (
                  <p className="text-gray-500">No products found</p>
                ) : (
                  allProducts.map((product) => (
                    <div
                      key={product.id}
                      className="border rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            product.approved 
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {product.approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {product.description}
                        </p>
                        <p className="text-sm">
                          Price: ₹{product.price} | Category: {product.category}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          onClick={() => handleEdit(product.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
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

          <TabsContent value="contact-submissions">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Form Submissions</h2>
              <div className="space-y-4">
                {contactSubmissions.length === 0 ? (
                  <p className="text-gray-500">No contact submissions yet</p>
                ) : (
                  contactSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{submission.name}</h3>
                          <p className="text-sm text-gray-600">{submission.email}</p>
                          <p className="mt-2">{submission.message}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            Submitted on: {new Date(submission.created_at).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant={submission.status === 'pending' ? 'default' : 'outline'}
                            onClick={() => updateSubmissionStatus(submission.id, 'pending')}
                            size="sm"
                          >
                            Pending
                          </Button>
                          <Button
                            variant={submission.status === 'in-progress' ? 'default' : 'outline'}
                            onClick={() => updateSubmissionStatus(submission.id, 'in-progress')}
                            size="sm"
                          >
                            In Progress
                          </Button>
                          <Button
                            variant={submission.status === 'completed' ? 'default' : 'outline'}
                            onClick={() => updateSubmissionStatus(submission.id, 'completed')}
                            size="sm"
                          >
                            Completed
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
