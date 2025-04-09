import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallback values
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://kdhwrlhzevzekoanusbs.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaHdybGh6ZXZ6ZWtvYW51c2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTczNDUsImV4cCI6MjA1MzEzMzM0NX0.qAA2en6uQPoTDq9oivjfSHajQjY6VKFQ2ymtwgJAyx8';

console.log('Initializing Supabase client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
