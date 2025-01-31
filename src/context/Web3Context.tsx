import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { useToast } from "@/hooks/use-toast";

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  chainId: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  isConnected: boolean;
  switchNetwork: (chainId: string) => Promise<void>;
  addToken: (tokenAddress: string, symbol: string, decimals: number, image?: string) => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | null>(null);

const SUPPORTED_CHAINS = {
  ETH_MAINNET: '0x1',
  POLYGON: '0x89',
  BSC: '0x38',
  AVALANCHE: '0xa86a'
};

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setAccount(null);
      setIsConnected(false);
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
        variant: "destructive",
      });
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
    }
  };

  const handleChainChanged = (chainId: string) => {
    setChainId(chainId);
    window.location.reload();
  };

  const initWeb3 = async () => {
    try {
      const provider = await detectEthereumProvider();
      
      if (provider) {
        const web3Instance = new Web3(provider as any);
        setWeb3(web3Instance);
        
        // Check if already connected
        const accounts = await web3Instance.eth.getAccounts();
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        }

        // Get current chain
        const chainId = await web3Instance.eth.getChainId();
        setChainId('0x' + chainId.toString(16));

        // Setup event listeners
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);

        return () => {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        };
      } else {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask to use this feature",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
      toast({
        title: "Error",
        description: "Failed to initialize Web3",
        variant: "destructive",
      });
    }
  };

  const connectWallet = async () => {
    try {
      if (!web3) {
        await initWeb3();
        return;
      }

      if (typeof window.ethereum !== 'undefined') {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setAccount(accounts[0]);
        setIsConnected(true);
        
        toast({
          title: "Wallet Connected",
          description: "Your wallet has been successfully connected!",
        });
      } else {
        toast({
          title: "MetaMask Required",
          description: "Please install MetaMask to connect your wallet",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = async () => {
    try {
      setAccount(null);
      setIsConnected(false);
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast({
        title: "Error",
        description: "Failed to disconnect wallet",
        variant: "destructive",
      });
    }
  };

  const switchNetwork = async (chainId: string) => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");
      
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });

      toast({
        title: "Network Changed",
        description: "Successfully switched network",
      });
    } catch (error: any) {
      // If the chain hasn't been added to MetaMask
      if (error.code === 4902) {
        toast({
          title: "Network Not Found",
          description: "This network needs to be added to your MetaMask",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to switch network",
          variant: "destructive",
        });
      }
    }
  };

  const addToken = async (
    tokenAddress: string,
    symbol: string,
    decimals: number,
    image?: string
  ) => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not installed");

      await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: tokenAddress,
            symbol: symbol,
            decimals: decimals,
            image: image,
          },
        },
      });

      toast({
        title: "Token Added",
        description: `Successfully added ${symbol} token to MetaMask`,
      });
    } catch (error) {
      console.error("Error adding token:", error);
      toast({
        title: "Error",
        description: "Failed to add token to MetaMask",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <Web3Context.Provider 
      value={{ 
        web3, 
        account, 
        chainId,
        connectWallet, 
        disconnectWallet,
        isConnected,
        switchNetwork,
        addToken
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};