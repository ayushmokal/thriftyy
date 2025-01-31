import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';
import { Info } from 'lucide-react';

export function NfcReader() {
  const [nfcSupported, setNfcSupported] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if NFC is supported
    if ('NDEFReader' in window) {
      setNfcSupported(true);
    }
  }, []);

  const handleNfcScan = async () => {
    try {
      const ndef = new (window as any).NDEFReader();
      await ndef.scan();
      
      toast({
        title: "NFC Scanner Active",
        description: "Please tap an NFC tag to read product information",
      });

      ndef.addEventListener("reading", ({ message }: any) => {
        const decoder = new TextDecoder();
        for (const record of message.records) {
          if (record.recordType === "text") {
            const tokenId = decoder.decode(record.data);
            navigate(`/product/${tokenId}`);
          }
        }
      });

    } catch (error) {
      console.error('Error scanning NFC:', error);
      toast({
        title: "Error",
        description: "Failed to start NFC scanner. Please ensure NFC is enabled.",
        variant: "destructive",
      });
    }
  };

  if (!nfcSupported) {
    return (
      <div className="flex items-center gap-2 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <Info className="text-yellow-500" />
        <p className="text-sm text-yellow-700">
          NFC is not supported on this device. Please use a device with NFC capabilities.
        </p>
      </div>
    );
  }

  return (
    <Button 
      onClick={handleNfcScan}
      className="w-full md:w-auto"
    >
      Scan NFC Tag
    </Button>
  );
}