import React, { useState } from 'react';
import { Grid, List, Filter } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { useMovies } from '../hooks/useMovies';
import { MOVIE_CATEGORIES, GENRE_MAPPING } from '../lib/constants';
import type { Movie } from '../lib/types';

interface HomePageProps {
  onMovieSelect: (movie: Movie) => void;
  selectedCategory: string;
  searchTerm: string;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  onMovieSelect, 
  selectedCategory,
  searchTerm 
}) => {
  const { movies, loading, error } = useMovies();
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'rating' | 'title'>('newest');

  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movie.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    
    const movieCategory = GENRE_MAPPING[movie.genre] || movie.genre.toLowerCase();
    const matchesCategory = movieCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const sortedMovies = [...filteredMovies].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'title':
        return a.title.localeCompare(b.title);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const selectedCategoryName = MOVIE_CATEGORIES.find(cat => cat.id === selectedCategory)?.name || 'Todos';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando filmes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white shadow-lg rounded-xl p-8 max-w-md">
          <p className="text-red-600 mb-4 font-medium">Erro ao carregar filmes</p>
          <p className="text-gray-600 text-sm mb-4">{error}</p>
          <p className="text-gray-500 text-xs">
            Certifique-se de que o Supabase está conectado e configurado corretamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {selectedCategoryName}
            </h1>
            <p className="text-gray-600 mt-1">
              {sortedMovies.length} {sortedMovies.length === 1 ? 'filme' : 'filmes'}
              {searchTerm && ` para "${searchTerm}"`}
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
              >
                <option value="newest">Mais recentes</option>
                <option value="rating">Melhor avaliados</option>
                <option value="title">A-Z</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Layout Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLayout('grid')}
                className={`p-2 rounded-md transition-colors ${
                  layout === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-2 rounded-md transition-colors ${
                  layout === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Movies Grid/List */}
        {sortedMovies.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <p className="text-gray-600 text-lg mb-2">
                {movies.length === 0 
                  ? 'Nenhum filme encontrado' 
                  : searchTerm 
                    ? `Nenhum filme encontrado para "${searchTerm}"`
                    : `Nenhum filme encontrado na categoria "${selectedCategoryName}"`
                }
              </p>
              {movies.length === 0 && (
                <p className="text-gray-500 text-sm">
                  Conecte ao Supabase e adicione alguns filmes para começar!
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className={
            layout === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-8'
              : 'space-y-4 pb-8'
          }>
            {layout === 'list' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                {sortedMovies.map((movie, index) => (
                  <div key={movie.id}>
                    <MovieCard
                      movie={movie}
                      onClick={onMovieSelect}
                      layout="list"
                    />
                    {index < sortedMovies.length - 1 && (
                      <div className="border-b border-gray-100" />
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {layout === 'grid' && sortedMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={onMovieSelect}
                layout="grid"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};