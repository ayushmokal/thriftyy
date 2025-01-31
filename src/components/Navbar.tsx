import { useWeb3 } from "@/context/Web3Context";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

const NETWORKS = [
  { name: "Ethereum Mainnet", chainId: "0x1" },
  { name: "Polygon", chainId: "0x89" },
  { name: "BSC", chainId: "0x38" },
  { name: "Avalanche", chainId: "0xa86a" },
];

const Navbar = () => {
  const { 
    connectWallet, 
    disconnectWallet, 
    account, 
    isConnected, 
    chainId,
    switchNetwork 
  } = useWeb3();
  
  const getCurrentNetworkName = () => {
    const network = NETWORKS.find(n => n.chainId === chainId);
    return network ? network.name : "Unknown Network";
  };
  
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
            
            {isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {`${account?.slice(0, 6)}...${account?.slice(-4)}`}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Wallet Connected</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-sm">
                    Current Network: {getCurrentNetworkName()}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Switch Network</DropdownMenuLabel>
                  {NETWORKS.map((network) => (
                    <DropdownMenuItem
                      key={network.chainId}
                      onClick={() => switchNetwork(network.chainId)}
                      className="cursor-pointer"
                    >
                      {network.name}
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={disconnectWallet}
                    className="text-red-600 cursor-pointer"
                  >
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                onClick={connectWallet}
                className="animate-in fade-in duration-300"
              >
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;