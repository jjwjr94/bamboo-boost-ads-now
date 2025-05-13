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
      chat_conversations: {
        Row: {
          conversation_id: string | null
          id: string
          ip_address: string | null
          last_message_at: string | null
          started_at: string | null
          user_agent: string | null
        }
        Insert: {
          conversation_id?: string | null
          id?: string
          ip_address?: string | null
          last_message_at?: string | null
          started_at?: string | null
          user_agent?: string | null
        }
        Update: {
          conversation_id?: string | null
          id?: string
          ip_address?: string | null
          last_message_at?: string | null
          started_at?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          conversation_id: string
          id: string
          message: string
          sender: string
          timestamp: string | null
        }
        Insert: {
          conversation_id: string
          id?: string
          message: string
          sender: string
          timestamp?: string | null
        }
        Update: {
          conversation_id?: string
          id?: string
          message?: string
          sender?: string
          timestamp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "chat_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      org_marketing_profiles: {
        Row: {
          ad_history: Json | null
          channel_priority: string[] | null
          company_description: string | null
          company_name: string | null
          competitors: string[] | null
          created_at: string
          current_tools: string[] | null
          geo_markets: string[] | null
          id: number
          industry: string | null
          monthly_ad_budget: string | null
          org_id: string
          primary_audiences: string[] | null
          priority_marketing_objectives: string[] | null
          product_descriptions: Json | null
          products: string[] | null
          regulatory_notes: string | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          ad_history?: Json | null
          channel_priority?: string[] | null
          company_description?: string | null
          company_name?: string | null
          competitors?: string[] | null
          created_at?: string
          current_tools?: string[] | null
          geo_markets?: string[] | null
          id?: never
          industry?: string | null
          monthly_ad_budget?: string | null
          org_id: string
          primary_audiences?: string[] | null
          priority_marketing_objectives?: string[] | null
          product_descriptions?: Json | null
          products?: string[] | null
          regulatory_notes?: string | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          ad_history?: Json | null
          channel_priority?: string[] | null
          company_description?: string | null
          company_name?: string | null
          competitors?: string[] | null
          created_at?: string
          current_tools?: string[] | null
          geo_markets?: string[] | null
          id?: never
          industry?: string | null
          monthly_ad_budget?: string | null
          org_id?: string
          primary_audiences?: string[] | null
          priority_marketing_objectives?: string[] | null
          product_descriptions?: Json | null
          products?: string[] | null
          regulatory_notes?: string | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      settings: {
        Row: {
          created_at: string | null
          id: string
          key: string
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          key: string
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          key?: string
          value?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
