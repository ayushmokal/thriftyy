export interface ThriftyMarketplace {
  methods: {
    createProduct(tokenURI: string, price: string): {
      send(options: { from: string }): Promise<any>;
    };
    buyProduct(tokenId: number): {
      send(options: { from: string; value: string }): Promise<any>;
    };
  };
}