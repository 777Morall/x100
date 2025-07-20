import React, { useState } from 'react';
import { Trash2, Edit, Plus } from 'lucide-react';
import { useMovies } from '../hooks/useMovies';
import { AddMovieForm } from '../components/AddMovieForm';
import type { Movie } from '../lib/types';

interface AdminPageProps {
  showAddForm: boolean;
  onShowAddForm: (show: boolean) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ showAddForm, onShowAddForm }) => {
  const { movies, loading, addMovie, removeMovie } = useMovies();

  const handleAddMovie = async (movieData: Omit<Movie, 'id' | 'created_at' | 'updated_at'>) => {
    await addMovie(movieData);
  };

  const handleDeleteMovie = async (id: string, title: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${title}"?`)) {
      await removeMovie(id);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950/10 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando dados...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/10 to-black pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Painel Administrativo</h1>
          <p className="text-gray-400">Gerencie sua coleção de filmes</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">Total de Filmes</h3>
            <p className="text-3xl font-bold text-white">{movies.length}</p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">Gêneros</h3>
            <p className="text-3xl font-bold text-white">
              {new Set(movies.map(m => m.genre)).size}
            </p>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
            <h3 className="text-gray-400 text-sm font-medium">Avaliação Média</h3>
            <p className="text-3xl font-bold text-white">
              {movies.length > 0 
                ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1)
                : '0.0'
              }
            </p>
          </div>
        </div>

        {/* Movies Table */}
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white">Filmes Cadastrados</h2>
              <button
                onClick={() => onShowAddForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Adicionar Filme</span>
              </button>
            </div>
          </div>

          {movies.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-400">Nenhum filme cadastrado ainda.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Filme
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Gênero
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Ano
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Avaliação
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {movies.map((movie) => (
                    <tr key={movie.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <img
                            src={movie.cover_image_url}
                            alt={movie.title}
                            className="h-12 w-8 object-cover rounded mr-4"
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{movie.title}</div>
                            <div className="text-sm text-gray-400 line-clamp-1">{movie.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-red-600/20 text-red-400 text-xs rounded-md font-medium">
                          {movie.genre}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {movie.release_year}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        ⭐ {movie.rating}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteMovie(movie.id, movie.title)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showAddForm && (
        <AddMovieForm
          onSubmit={handleAddMovie}
          onCancel={() => onShowAddForm(false)}
        />
      )}
    </div>
  );
};