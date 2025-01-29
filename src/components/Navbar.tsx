import { Search, Instagram, Moon, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-xl font-semibold">
          Thrifty
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-primary">
            HOME
          </Link>
          <Link to="/thrift" className="text-sm font-medium hover:text-primary">
            THRIFT
          </Link>
          <Link to="/explore" className="text-sm font-medium hover:text-primary">
            EXPLORE
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-primary">
            ABOUT
          </Link>
          <Link to="/sell" className="text-sm font-medium hover:text-primary">
            SELL
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-6">
          <button className="hover:text-primary">
            <Search className="h-5 w-5" />
          </button>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <Instagram className="h-5 w-5" />
          </a>
          <button className="hover:text-primary">
            <Moon className="h-5 w-5" />
          </button>
          <button className="hover:text-primary">
            <User className="h-5 w-5" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;