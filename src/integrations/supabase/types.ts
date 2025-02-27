export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      nfc_tag_writes: {
        Row: {
          id: string
          nfc_tag_id: string
          product_id: string | null
          write_data: Json | null
          write_date: string | null
          write_method: string
          write_status: string | null
        }
        Insert: {
          id?: string
          nfc_tag_id: string
          product_id?: string | null
          write_data?: Json | null
          write_date?: string | null
          write_method: string
          write_status?: string | null
        }
        Update: {
          id?: string
          nfc_tag_id?: string
          product_id?: string | null
          write_data?: Json | null
          write_date?: string | null
          write_method?: string
          write_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nfc_tag_writes_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          image_type: string
          image_url: string
          product_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_type: string
          image_url: string
          product_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          image_type?: string
          image_url?: string
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          approved: boolean | null
          blockchain_network: string | null
          brand_name: string | null
          category: Database["public"]["Enums"]["product_category"]
          color: string | null
          condition: string | null
          contract_address: string | null
          created_at: string
          description: string | null
          id: string
          manufactured_date: string | null
          materials: string[] | null
          model_name: string | null
          name: string
          nfc_tag_id: string | null
          original_price: number | null
          price: number
          size: string | null
          texture: string | null
          token_id: number | null
          updated_at: string
        }
        Insert: {
          approved?: boolean | null
          blockchain_network?: string | null
          brand_name?: string | null
          category: Database["public"]["Enums"]["product_category"]
          color?: string | null
          condition?: string | null
          contract_address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          manufactured_date?: string | null
          materials?: string[] | null
          model_name?: string | null
          name: string
          nfc_tag_id?: string | null
          original_price?: number | null
          price: number
          size?: string | null
          texture?: string | null
          token_id?: number | null
          updated_at?: string
        }
        Update: {
          approved?: boolean | null
          blockchain_network?: string | null
          brand_name?: string | null
          category?: Database["public"]["Enums"]["product_category"]
          color?: string | null
          condition?: string | null
          contract_address?: string | null
          created_at?: string
          description?: string | null
          id?: string
          manufactured_date?: string | null
          materials?: string[] | null
          model_name?: string | null
          name?: string
          nfc_tag_id?: string | null
          original_price?: number | null
          price?: number
          size?: string | null
          texture?: string | null
          token_id?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      product_category: "Jeans" | "Shirts" | "Tshirts" | "Shoes" | "Watches"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
