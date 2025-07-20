import React, { useState } from 'react';
import { Header } from './components/Header';
import { LoginForm } from './components/LoginForm';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { MovieDetailsPage } from './pages/MovieDetailsPage';
import { useAuth } from './hooks/useAuth';
import type { Movie } from './lib/types';

type Page = 'home' | 'admin' | 'login' | 'movie';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [showAddMovieForm, setShowAddMovieForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { user, loading } = useAuth();

  const handleNavigate = (page: Page) => {
    if (page === 'admin' && !user) {
      setCurrentPage('login');
      return;
    }
    setCurrentPage(page);
    setSelectedMovie(null);
    setShowAddMovieForm(false);
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setCurrentPage('movie');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('admin');
  };

  const handleBackFromMovie = () => {
    setSelectedMovie(null);
    setCurrentPage('home');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchTerm(''); // Clear search when changing category
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term) {
      setSelectedCategory('all'); // Show all categories when searching
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (currentPage === 'login') {
    return (
      <LoginForm
        onSuccess={handleLoginSuccess}
        onCancel={() => setCurrentPage('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        currentPage={currentPage}
        selectedCategory={selectedCategory}
        onNavigate={handleNavigate}
        onCategoryChange={handleCategoryChange}
        onShowAddMovie={() => setShowAddMovieForm(true)}
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
      
      {currentPage === 'home' && (
        <HomePage 
          onMovieSelect={handleMovieSelect}
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
        />
      )}
      
      {currentPage === 'admin' && user && (
        <AdminPage
          showAddForm={showAddMovieForm}
          onShowAddForm={setShowAddMovieForm}
        />
      )}
      
      {currentPage === 'movie' && selectedMovie && (
        <MovieDetailsPage
          movie={selectedMovie}
          onBack={handleBackFromMovie}
        />
      )}
    </div>
  );
}

export default App;