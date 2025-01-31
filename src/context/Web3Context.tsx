import React, { createContext, useContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';
import { useToast } from "@/hooks/use-toast";

interface Web3ContextType {
  web3: Web3 | null;
  account: string | null;
  connectWallet: () => Promise<void>;
  isConnected: boolean;
}

const Web3Context = createContext<Web3ContextType | null>(null);

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

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
      } else {
        toast({
          title: "MetaMask not detected",
          description: "Please install MetaMask to use this feature",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error initializing Web3:", error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!web3) {
        await initWeb3();
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      setAccount(accounts[0]);
      setIsConnected(true);
      
      toast({
        title: "Wallet Connected",
        description: "Your wallet has been successfully connected!",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    initWeb3();
  }, []);

  return (
    <Web3Context.Provider value={{ web3, account, connectWallet, isConnected }}>
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