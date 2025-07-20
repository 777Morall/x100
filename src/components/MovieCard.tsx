import React from 'react';
import { Play, Clock, Eye } from 'lucide-react';
import type { Movie } from '../lib/types';
import { formatViews, formatTimeAgo } from '../lib/constants';

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
  layout?: 'grid' | 'list';
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick, layout = 'grid' }) => {
  const views = movie.views || Math.floor(Math.random() * 1000000) + 10000;
  
  if (layout === 'list') {
    return (
      <div 
        className="flex space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors group"
        onClick={() => onClick(movie)}
      >
        <div className="relative flex-shrink-0">
          <div className="w-40 h-24 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={movie.cover_image_url}
              alt={movie.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          </div>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 rounded-lg flex items-center justify-center">
            <Play className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 fill-current" />
          </div>
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {movie.duration}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500">
            <span>{formatViews(views)} visualizações</span>
            <span>•</span>
            <span>{formatTimeAgo(movie.created_at)}</span>
          </div>
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {movie.description}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              {movie.genre}
            </span>
            <span className="text-xs text-gray-500">⭐ {movie.rating}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group cursor-pointer"
      onClick={() => onClick(movie)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden mb-3">
        <img
          src={movie.cover_image_url}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200 flex items-center justify-center">
          <Play className="h-12 w-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 fill-current" />
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {movie.duration}
        </div>
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md font-medium">
          ⭐ {movie.rating}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="h-4 w-4" />
          <span>{formatViews(views)} visualizações</span>
          <span>•</span>
          <span>{formatTimeAgo(movie.created_at)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
            {movie.genre}
          </span>
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>{movie.release_year}</span>
          </div>
        </div>
      </div>
    </div>
  );
};