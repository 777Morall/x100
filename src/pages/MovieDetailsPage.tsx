import React, { useState } from 'react';
import { ArrowLeft, Star, Calendar, Clock, Tag, Play, ThumbsUp, Share2, Download, Eye } from 'lucide-react';
import type { Movie } from '../lib/types';
import { formatViews, formatTimeAgo, getEmbedUrl } from '../lib/constants';

interface MovieDetailsPageProps {
  movie: Movie;
  onBack: () => void;
}

export const MovieDetailsPage: React.FC<MovieDetailsPageProps> = ({ movie, onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  
  const views = movie.views || Math.floor(Math.random() * 1000000) + 10000;
  const likes = movie.likes || Math.floor(Math.random() * 10000) + 100;

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-6 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="aspect-video bg-black relative">
                {!isPlaying ? (
                  <div className="relative w-full h-full">
                    <img
                      src={movie.cover_image_url}
                      alt={movie.title}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <button
                        onClick={() => setIsPlaying(true)}
                        className="bg-red-600 hover:bg-red-700 text-white rounded-full p-6 transition-colors group"
                      >
                        <Play className="h-12 w-12 fill-current group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={getEmbedUrl(movie.embed_url)}
                    title={movie.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>

              {/* Video Info */}
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                  {movie.title}
                </h1>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{formatViews(views)} visualizações</span>
                    </div>
                    <span>•</span>
                    <span>{formatTimeAgo(movie.created_at)}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setLiked(!liked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        liked 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                      <span>{formatViews(likes + (liked ? 1 : 0))}</span>
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      <Share2 className="h-4 w-4" />
                    </button>
                    <button className="p-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors">
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-700 leading-relaxed">
                    {movie.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Movie Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Filme</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avaliação</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{movie.rating}/10</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ano</span>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{movie.release_year}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duração</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{movie.duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Gênero</span>
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4 text-gray-400" />
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm rounded-md font-medium">
                      {movie.genre}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Visualizações</span>
                  <span className="font-medium">{formatViews(views)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Curtidas</span>
                  <span className="font-medium">{formatViews(likes + (liked ? 1 : 0))}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Adicionado em</span>
                  <span className="font-medium">{formatTimeAgo(movie.created_at)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};