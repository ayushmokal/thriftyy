export interface ProductOwner {
  address: string;
  social_media?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  ownership_date: string;
}

export interface ProductHistory {
  token_id: string;
  previous_owners: ProductOwner[];
  transfer_dates: string[];
  condition_updates: {
    date: string;
    condition: string;
    notes?: string;
  }[];
}