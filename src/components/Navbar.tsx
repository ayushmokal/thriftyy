import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold">
            Thrift Store
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/sell">
              <Button variant="outline">Sell Item</Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline">Admin</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;