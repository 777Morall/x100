import React, { useState } from 'react';
import { Film, User, LogOut, Plus, Search, Menu, Bell } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { MOVIE_CATEGORIES } from '../lib/constants';

interface HeaderProps {
  currentPage: 'home' | 'admin' | 'movie';
  selectedCategory: string;
  onNavigate: (page: 'home' | 'admin' | 'login') => void;
  onCategoryChange: (category: string) => void;
  onShowAddMovie?: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentPage, 
  selectedCategory,
  onNavigate, 
  onCategoryChange,
  onShowAddMovie,
  searchTerm,
  onSearchChange
}) => {
  const { user, signOut } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <>
      {/* Main Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div 
              className="flex items-center space-x-2 cursor-pointer group"
              onClick={() => onNavigate('home')}
            >
              <div className="bg-red-600 p-2 rounded-lg">
                <Film className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                CineStream
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8 hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar filmes..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-full px-4 py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-gray-50 border-l border-gray-300 rounded-r-full hover:bg-gray-100 transition-colors">
                  <Search className="h-5 w-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                {user && (
                  <>
                    <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                      <Bell className="h-6 w-6" />
                    </button>
                    
                    {currentPage === 'admin' && onShowAddMovie && (
                      <button
                        onClick={onShowAddMovie}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Adicionar</span>
                      </button>
                    )}

                    <button
                      onClick={() => onNavigate('admin')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        currentPage === 'admin' 
                          ? 'bg-red-100 text-red-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Admin
                    </button>
                  </>
                )}

                {user ? (
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 hidden lg:block">
                        {user.email.split('@')[0]}
                      </span>
                    </div>
                    <button
                      onClick={handleSignOut}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onNavigate('login')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Pesquisar filmes..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full px-4 py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-gray-50 border-l border-gray-300 rounded-r-full">
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      {currentPage === 'home' && (
        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 py-3 overflow-x-auto scrollbar-hide">
              {MOVIE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {user ? (
              <>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{user.email.split('@')[0]}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Painel Admin
                </button>
                <button
                  onClick={() => {
                    handleSignOut();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  onNavigate('login');
                  setShowMobileMenu(false);
                }}
                className="w-full text-left px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Fazer Login
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};