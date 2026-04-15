// Auto-generated from Supabase – run: npx supabase gen types typescript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          level: string
          streak: number
          total_xp: number
          plan: string
          plan_expires_at: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          level: string
          total_lessons: number
          thumbnail_emoji: string
          banner_gradient: string
          is_free: boolean
          tags: string[]
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'created_at'>
        Update: Partial<Database['public']['Tables']['courses']['Insert']>
      }
      user_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          completed_lessons: number
          last_accessed: string
        }
        Insert: Omit<Database['public']['Tables']['user_progress']['Row'], 'id'>
        Update: Partial<Database['public']['Tables']['user_progress']['Insert']>
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}
