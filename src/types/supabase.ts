export interface Database {
  public: {
    Tables: {
      milestones: {
        Row: {
          id: string;
          title: string;
          description: string;
          date: string;
          completed: boolean;
          category: 'personal' | 'professional' | 'health' | 'education' | 'other';
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['milestones']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['milestones']['Insert']>;
      };
      subtasks: {
        Row: {
          id: string;
          milestone_id: string;
          title: string;
          completed: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['subtasks']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['subtasks']['Insert']>;
      };
      users: {
        Row: {
          id: string;
          birth_year: number;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
    };
  };
}