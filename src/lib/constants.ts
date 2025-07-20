import type { MovieCategory } from './types';

export const MOVIE_CATEGORIES: MovieCategory[] = [
  { id: 'all', name: 'Todos', icon: '🎬' },
  { id: 'action', name: 'Ação', icon: '💥' },
  { id: 'adventure', name: 'Aventura', icon: '🗺️' },
  { id: 'comedy', name: 'Comédia', icon: '😂' },
  { id: 'drama', name: 'Drama', icon: '🎭' },
  { id: 'horror', name: 'Terror', icon: '👻' },
  { id: 'romance', name: 'Romance', icon: '💕' },
  { id: 'sci-fi', name: 'Ficção Científica', icon: '🚀' },
  { id: 'thriller', name: 'Thriller', icon: '🔪' },
  { id: 'documentary', name: 'Documentário', icon: '📹' },
  { id: 'animation', name: 'Animação', icon: '🎨' },
  { id: 'fantasy', name: 'Fantasia', icon: '🧙‍♂️' }
];

export const GENRE_MAPPING: Record<string, string> = {
  'Ação': 'action',
  'Aventura': 'adventure', 
  'Comédia': 'comedy',
  'Drama': 'drama',
  'Horror': 'horror',
  'Terror': 'horror',
  'Romance': 'romance',
  'Ficção Científica': 'sci-fi',
  'Thriller': 'thriller',
  'Documentário': 'documentary',
  'Animação': 'animation',
  'Fantasia': 'fantasy'
};

export const formatViews = (views: number): string => {
  if (views >= 1000000) {
    return `${(views / 1000000).toFixed(1)}M`;
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1)}K`;
  }
  return views.toString();
};

export const formatTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'agora';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} min atrás`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h atrás`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} dias atrás`;
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} meses atrás`;
    return `${Math.floor(diffInSeconds / 31536000)} anos atrás`;
  } catch (error) {
    return 'data inválida';
  }
};

export const getEmbedUrl = (url: string): string => {
  try {
    if (url.includes('youtube.com/watch')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    }
    return url;
  } catch (error) {
    return url;
  }
};