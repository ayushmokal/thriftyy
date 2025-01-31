import { useWeb3 } from "@/context/Web3Context";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { connectWallet, account, isConnected } = useWeb3();
  
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">Thrifty</Link>
          <div className="flex items-center gap-4">
            <Link to="/thrift" className="text-gray-600 hover:text-gray-900">Thrift</Link>
            <Link to="/sell" className="text-gray-600 hover:text-gray-900">Sell</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
            <Button
              variant={isConnected ? "outline" : "default"}
              onClick={connectWallet}
              className="animate-in fade-in duration-300"
            >
              {isConnected 
                ? `Connected: ${account?.slice(0, 6)}...${account?.slice(-4)}`
                : "Connect Wallet"
              }
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
