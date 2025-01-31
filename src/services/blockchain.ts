import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { ThriftyMarketplace } from '../contracts/types/ThriftyMarketplace';
import ThriftyMarketplaceABI from '../contracts/ThriftyMarketplace.json';

const CONTRACT_ADDRESS = '0xYourDeployedContractAddressHere';

export const createProductNFT = async (
  web3: Web3,
  account: string,
  tokenURI: string,
  price: string
) => {
  try {
    const contract = new web3.eth.Contract(
      ThriftyMarketplaceABI.abi as AbiItem[],
      CONTRACT_ADDRESS
    ) as unknown as ThriftyMarketplace;

    const priceInWei = web3.utils.toWei(price, 'ether');
    
    const result = await contract.methods
      .createProduct(tokenURI, priceInWei)
      .send({ from: account });
      
    return result;
  } catch (error) {
    console.error("Error creating product NFT:", error);
    throw error;
  }
};

export const buyProductNFT = async (
  web3: Web3,
  account: string,
  tokenId: number,
  price: string
) => {
  try {
    const contract = new web3.eth.Contract(
      ThriftyMarketplaceABI.abi as AbiItem[],
      CONTRACT_ADDRESS
    ) as unknown as ThriftyMarketplace;

    const priceInWei = web3.utils.toWei(price, 'ether');
    
    const result = await contract.methods
      .buyProduct(tokenId)
      .send({ from: account, value: priceInWei });
      
    return result;
  } catch (error) {
    console.error("Error buying product NFT:", error);
    throw error;
  }
};

export const uploadToIPFS = async (metadata: any) => {
  try {
    // Here you would implement IPFS upload logic
    // For now, we'll return a mock IPFS hash
    return `ipfs://QmYourIPFSHash`;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    throw error;
  }
};