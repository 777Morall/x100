export interface Movie {
  id: string;
  title: string;
  description: string;
  embed_url: string;
  cover_image_url: string;
  genre: string;
  release_year: number;
  duration: string;
  rating: number;
  views?: number;
  likes?: number;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AuthState {
  user: User | null;
  loading: boolean;
}