export type Database = {
  public: {
    Tables: {
      templates: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          content: object
          is_public: boolean
          user_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          content: object
          is_public?: boolean
          user_id: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          content?: object
          is_public?: boolean
          user_id?: string
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      public_templates: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          user_email: string
          user_display_name: string
        }
      }
    }
    Functions: {
      get_user_templates: {
        Args: { user_id: string }
        Returns: {
          id: string
          name: string
          description: string | null
          created_at: string
          is_public: boolean
        }[]
      }
    }
  }
} 