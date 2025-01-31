export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          category: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches";
          color: string | null;
          size: string | null;
          brand_name: string | null;
          condition: string | null;
          token_id: string;
          nfc_tag_id: string;
          current_owner: string;
          previous_owners: Json[];
          created_at: string;
          updated_at: string;
          approved: boolean;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          category: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches";
          color?: string | null;
          size?: string | null;
          brand_name?: string | null;
          condition?: string | null;
          token_id: string;
          nfc_tag_id: string;
          current_owner: string;
          previous_owners?: Json[];
          created_at?: string;
          updated_at?: string;
          approved?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          category?: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches";
          color?: string | null;
          size?: string | null;
          brand_name?: string | null;
          condition?: string | null;
          token_id?: string;
          nfc_tag_id?: string;
          current_owner?: string;
          previous_owners?: Json[];
          created_at?: string;
          updated_at?: string;
          approved?: boolean;
        };
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          status?: string;
          created_at?: string;
        };
      };
    };
    Enums: {
      product_category: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches";
    };
  };
}