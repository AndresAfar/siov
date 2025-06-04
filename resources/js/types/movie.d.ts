export interface Movie {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  description?: string;
  cover_image?: string;
  trailer_url?: string;
  video_url?: string;
  year?: number;
  duration?: number;
  language: string;
  rating?: 'G' | 'PG' | 'PG-13' | 'R' | 'NC-17';
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface HomePageProps {
  recentMovies: Movie[];
  featuredMovies: Movie[];
  popularMovies: Movie[];
  allMovies: Movie[];
}