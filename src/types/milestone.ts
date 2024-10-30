export interface Milestone {
  id: string;
  title: string;
  description: string;
  date: Date;
  completed: boolean;
  category: 'personal' | 'professional' | 'health' | 'education' | 'other';
  subtasks: SubTask[];
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export type TimelineView = 'life' | 'yearly' | 'monthly' | 'weekly';