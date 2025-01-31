import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface NfcTagWriterProps {
  productId: string;
  tokenId?: number;
  contractAddress?: string;
}

export const NfcTagWriter = ({ productId, tokenId, contractAddress }: NfcTagWriterProps) => {
  const [nfcTagId, setNfcTagId] = useState("");
  const [writeMethod, setWriteMethod] = useState<"url" | "raw" | "contract">("url");
  const [isWriting, setIsWriting] = useState(false);
  const { toast } = useToast();

  const generateWriteData = () => {
    switch (writeMethod) {
      case "url":
        return {
          url: `https://etherscan.io/token/${contractAddress}`,
        };
      case "raw":
        return {
          contract: contractAddress,
          tokenId: tokenId,
          network: "Ethereum",
        };
      case "contract":
        return {
          type: "transfer",
          contract: contractAddress,
          tokenId: tokenId,
        };
      default:
        return {};
    }
  };

  const handleWrite = async () => {
    if (!nfcTagId) {
      toast({
        title: "Error",
        description: "Please enter an NFC tag ID",
        variant: "destructive",
      });
      return;
    }

    setIsWriting(true);
    try {
      const writeData = generateWriteData();
      
      const { error } = await supabase
        .from("nfc_tag_writes")
        .insert({
          product_id: productId,
          nfc_tag_id: nfcTagId,
          write_method: writeMethod,
          write_data: writeData,
          write_status: "pending",
        });

      if (error) throw error;

      // Update product with NFC tag ID
      const { error: updateError } = await supabase
        .from("products")
        .update({ nfc_tag_id: nfcTagId })
        .eq("id", productId);

      if (updateError) throw updateError;

      toast({
        title: "Success",
        description: "NFC tag write request created successfully",
      });

      setNfcTagId("");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsWriting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Write NFC Tag</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">NFC Tag ID</label>
          <Input
            value={nfcTagId}
            onChange={(e) => setNfcTagId(e.target.value)}
            placeholder="Enter NFC tag ID"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Write Method</label>
          <Select value={writeMethod} onValueChange={(value: "url" | "raw" | "contract") => setWriteMethod(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select write method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="url">URL Link</SelectItem>
              <SelectItem value="raw">Raw Data</SelectItem>
              <SelectItem value="contract">Smart Contract</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          onClick={handleWrite} 
          disabled={isWriting || !nfcTagId}
          className="w-full"
        >
          {isWriting ? "Writing..." : "Write NFC Tag"}
        </Button>
      </CardContent>
    </Card>
  );
};