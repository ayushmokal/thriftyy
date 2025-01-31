// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ThriftyMarketplace is ERC721, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    struct Product {
        uint256 tokenId;
        address payable seller;
        uint256 price;
        bool sold;
    }
    
    mapping(uint256 => Product) public products;
    
    event ProductListed(uint256 tokenId, address seller, uint256 price);
    event ProductSold(uint256 tokenId, address seller, address buyer, uint256 price);
    
    constructor() ERC721("ThriftyNFT", "TNFT") {}
    
    function createProduct(string memory tokenURI, uint256 price) public returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        products[newTokenId] = Product(
            newTokenId,
            payable(msg.sender),
            price,
            false
        );
        
        emit ProductListed(newTokenId, msg.sender, price);
        return newTokenId;
    }
    
    function buyProduct(uint256 tokenId) public payable nonReentrant {
        Product storage product = products[tokenId];
        require(!product.sold, "Product already sold");
        require(msg.value == product.price, "Incorrect price");
        
        product.sold = true;
        _transfer(product.seller, msg.sender, tokenId);
        product.seller.transfer(msg.value);
        
        emit ProductSold(tokenId, product.seller, msg.sender, product.price);
    }
}