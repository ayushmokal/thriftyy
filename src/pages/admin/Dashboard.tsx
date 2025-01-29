import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-4">
        <Link to="/admin/products">
          <Button className="w-full">Manage Products</Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;