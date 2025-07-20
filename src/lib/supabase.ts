import { createClient } from '@supabase/supabase-js';
import type { Movie } from './types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Movie operations
export const getMovies = async (): Promise<Movie[]> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getMovieById = async (id: string): Promise<Movie | null> => {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const createMovie = async (movie: Omit<Movie, 'id' | 'created_at' | 'updated_at'>): Promise<Movie> => {
  const { data, error } = await supabase
    .from('movies')
    .insert([movie])
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const updateMovie = async (id: string, updates: Partial<Movie>): Promise<Movie> => {
  const { data, error } = await supabase
    .from('movies')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

export const deleteMovie = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('movies')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
};

// Auth operations
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};