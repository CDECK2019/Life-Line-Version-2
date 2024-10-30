import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = 'https://ekejtepqvnjmkunscylv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrZWp0ZXBxdm5qbWt1bnNjeWx2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzMTY5MzYsImV4cCI6MjA0NTg5MjkzNn0.HfTmU7uacd2-dOzamZNt5Odw25kajhFPDWr4MzTd6_E';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});