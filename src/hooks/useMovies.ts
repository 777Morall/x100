import { useState, useEffect } from 'react';
import { getMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../lib/supabase';
import type { Movie } from '../lib/types';

export const useMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getMovies();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const addMovie = async (movieData: Omit<Movie, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const newMovie = await createMovie(movieData);
      setMovies(prev => [newMovie, ...prev]);
      return newMovie;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to add movie');
    }
  };

  const editMovie = async (id: string, updates: Partial<Movie>) => {
    try {
      const updatedMovie = await updateMovie(id, updates);
      setMovies(prev => prev.map(movie => movie.id === id ? updatedMovie : movie));
      return updatedMovie;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update movie');
    }
  };

  const removeMovie = async (id: string) => {
    try {
      await deleteMovie(id);
      setMovies(prev => prev.filter(movie => movie.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete movie');
    }
  };

  return {
    movies,
    loading,
    error,
    fetchMovies,
    addMovie,
    editMovie,
    removeMovie,
  };
};

export const useMovie = (id: string) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieById(id);
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, loading, error };
};