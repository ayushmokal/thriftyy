import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

// Simple NFT Contract ABI (you would need to deploy this contract separately)
const NFT_ABI: AbiItem[] = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintNFT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const mintProductNFT = async (web3: Web3, account: string, productData: any) => {
  try {
    // This would be your deployed NFT contract address
    const contractAddress = '0xYourContractAddressHere';
    const contract = new web3.eth.Contract(NFT_ABI, contractAddress);

    // Create metadata for the NFT
    const metadata = {
      name: productData.name,
      description: productData.description,
      image: productData.image,
      attributes: [
        {
          trait_type: "Category",
          value: productData.category
        },
        {
          trait_type: "Brand",
          value: productData.brand_name
        },
        {
          trait_type: "Condition",
          value: productData.condition
        }
      ]
    };

    // In a real application, you would upload this metadata to IPFS
    // and use the IPFS hash as the tokenURI
    const tokenURI = JSON.stringify(metadata);

    // Mint the NFT
    const result = await contract.methods.mintNFT(tokenURI).send({ from: account });
    return result;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};