import { createClient } from '@supabase/supabase-js';

// Use environment variables with fallback values
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://kdhwrlhzevzekoanusbs.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkaHdybGh6ZXZ6ZWtvYW51c2JzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1NTczNDUsImV4cCI6MjA1MzEzMzM0NX0.qAA2en6uQPoTDq9oivjfSHajQjY6VKFQ2ymtwgJAyx8';

// Add more detailed logging for debugging
console.log('Environment:', process.env.NODE_ENV);
console.log('Initializing Supabase client with URL:', supabaseUrl);
console.log('Using Supabase key (first 10 chars):', supabaseAnonKey.substring(0, 10) + '...');

// Create the Supabase client with additional options
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

// Test the connection immediately
const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    const { data, error } = await supabase.from('fence_products').select('count');
    
    if (error) {
      console.error('Supabase connection test failed:', error);
    } else {
      console.log('Supabase connection successful, fence_products table exists');
    }
  } catch (err) {
    console.error('Error testing Supabase connection:', err);
  }
};

// Run the test
testConnection();
