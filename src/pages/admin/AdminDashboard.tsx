import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Plus, RefreshCw } from "lucide-react";
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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => {
                fetchPendingProducts();
                fetchAllProducts();
                fetchContactSubmissions();
              }}
              className="animate-in fade-in duration-300"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="flex items-center gap-2 animate-in fade-in duration-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="sell-requests" className="w-full space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-12">
            <TabsTrigger value="sell-requests" className="text-sm">Sell Requests</TabsTrigger>
            <TabsTrigger value="manage-products" className="text-sm">Manage Products</TabsTrigger>
            <TabsTrigger value="add-product" className="text-sm">Add Product</TabsTrigger>
            <TabsTrigger value="nfc-tags" className="text-sm">NFC Tags</TabsTrigger>
            <TabsTrigger value="contact-submissions" className="text-sm">Contact Enquiries</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sell-requests" className="space-y-6 animate-in fade-in duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Pending Sell Requests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingProducts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No pending products to review</p>
                ) : (
                  pendingProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex justify-between items-start p-6">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>₹{product.price}</span>
                            <span>{product.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => handleApprove(product.id)}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleReject(product.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage-products" className="space-y-6 animate-in fade-in duration-300">
            <Card>
              <CardHeader>
                <CardTitle>All Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allProducts.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No products found</p>
                ) : (
                  allProducts.map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="flex justify-between items-start p-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{product.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              product.approved 
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                            }`}>
                              {product.approved ? "Approved" : "Pending"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>₹{product.price}</span>
                            <span>{product.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(product.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(product.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="add-product" className="animate-in fade-in duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
              </CardHeader>
              <CardContent className="py-6">
                <Button 
                  onClick={() => navigate("/admin/dashboard/add")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add New Product
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nfc-tags" className="space-y-6 animate-in fade-in duration-300">
            <Card>
              <CardHeader>
                <CardTitle>NFC Tag Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {allProducts.filter(p => !p.nfc_tag_id).map((product) => (
                  <Card key={product.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="space-y-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.description}</p>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <span>₹{product.price}</span>
                            <span>{product.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <NfcTagWriter 
                          productId={product.id} 
                          tokenId={product.token_id} 
                          contractAddress={product.contract_address}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {allProducts.filter(p => !p.nfc_tag_id).length === 0 && (
                  <p className="text-muted-foreground text-center py-8">No products need NFC tags</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact-submissions" className="space-y-6 animate-in fade-in duration-300">
            <Card>
              <CardHeader>
                <CardTitle>Contact Form Submissions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactSubmissions.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No contact submissions yet</p>
                ) : (
                  contactSubmissions.map((submission) => (
                    <Card key={submission.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="font-semibold">{submission.name}</h3>
                            <p className="text-sm text-muted-foreground">{submission.email}</p>
                            <p className="mt-2 text-sm">{submission.message}</p>
                            <p className="text-xs text-muted-foreground">
                              Submitted on: {new Date(submission.created_at).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant={submission.status === 'pending' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSubmissionStatus(submission.id, 'pending')}
                              className="min-w-[80px]"
                            >
                              Pending
                            </Button>
                            <Button
                              variant={submission.status === 'in-progress' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSubmissionStatus(submission.id, 'in-progress')}
                              className="min-w-[80px]"
                            >
                              In Progress
                            </Button>
                            <Button
                              variant={submission.status === 'completed' ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => updateSubmissionStatus(submission.id, 'completed')}
                              className="min-w-[80px]"
                            >
                              Completed
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
