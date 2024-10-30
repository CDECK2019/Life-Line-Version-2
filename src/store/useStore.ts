import { create } from 'zustand';
import { Milestone, TimelineView } from '../types/milestone';
import { supabase } from '../lib/supabase';

interface StoreState {
  birthYear: number | null;
  milestones: Milestone[];
  currentView: TimelineView;
  isLoading: boolean;
  error: string | null;
  userId: string | null;
  setBirthYear: (year: number) => Promise<void>;
  addMilestone: (milestone: Omit<Milestone, 'id'>) => Promise<void>;
  updateMilestone: (milestone: Milestone) => Promise<void>;
  deleteMilestone: (id: string) => Promise<void>;
  setCurrentView: (view: TimelineView) => void;
  initializeStore: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  birthYear: null,
  milestones: [],
  currentView: 'life',
  isLoading: true,
  error: null,
  userId: null,

  initializeStore: async () => {
    try {
      set({ isLoading: true });
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        set({ isLoading: false, userId: null });
        return;
      }

      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('birth_year')
        .eq('id', session.user.id)
        .single();

      if (userError && userError.code !== 'PGRST116') {
        throw userError;
      }

      const { data: milestones, error: milestonesError } = await supabase
        .from('milestones')
        .select(`
          *,
          subtasks (*)
        `)
        .eq('user_id', session.user.id);

      if (milestonesError) throw milestonesError;

      set({
        userId: session.user.id,
        birthYear: userData?.birth_year || null,
        milestones: milestones?.map(m => ({
          ...m,
          date: new Date(m.date),
          subtasks: m.subtasks || []
        })) || [],
        isLoading: false,
        error: null
      });
    } catch (error) {
      set({ 
        error: (error as Error).message, 
        isLoading: false,
        userId: null,
        birthYear: null,
        milestones: []
      });
    }
  },

  setBirthYear: async (year: number) => {
    const { userId } = get();
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('users')
        .upsert({ id: userId, birth_year: year });

      if (error) throw error;
      set({ birthYear: year });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  addMilestone: async (milestone: Omit<Milestone, 'id'>) => {
    const { userId } = get();
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('milestones')
        .insert({
          ...milestone,
          user_id: userId,
          date: milestone.date.toISOString(),
        })
        .select()
        .single();

      if (error) throw error;

      const newMilestone = {
        ...data,
        date: new Date(data.date),
        subtasks: []
      };

      set(state => ({
        milestones: [...state.milestones, newMilestone]
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  updateMilestone: async (milestone: Milestone) => {
    try {
      const { error } = await supabase
        .from('milestones')
        .update({
          ...milestone,
          date: milestone.date.toISOString(),
        })
        .eq('id', milestone.id);

      if (error) throw error;

      set(state => ({
        milestones: state.milestones.map(m =>
          m.id === milestone.id ? milestone : m
        )
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteMilestone: async (id: string) => {
    try {
      const { error } = await supabase
        .from('milestones')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set(state => ({
        milestones: state.milestones.filter(m => m.id !== id)
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  setCurrentView: (view: TimelineView) => set({ currentView: view }),
}));