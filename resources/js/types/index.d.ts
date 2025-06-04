import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}


export interface Genre {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
  // Relations
  movies?: Movie[];
}


export interface Actor {
  id: number;
  name: string;
  bio?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
  initials?: string;
  // Relations
  movies?: Movie[];
  // Pivot data
  pivot?: {
    role_name?: string;
  };
}

export interface BreadcrumbItem {
  title: string;
  href: string;
  active?: boolean;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
};

// Props específicos para páginas
export interface HomePageProps {
  recentMovies: Movie[];
  featuredMovies: Movie[];
  popularMovies: Movie[];
  allMovies: Movie[];
}

export interface MovieIndexProps {
  movies: PaginatedResponse<Movie>;
}

export interface MovieShowProps {
  movie: Movie;
  relatedMovies: Movie[];
}

export interface MovieWatchProps {
  movie: Movie;
}

export interface MovieSearchProps {
  movies: PaginatedResponse<Movie>;
  query: string;
}

export interface GenreShowProps {
  movies: PaginatedResponse<Movie>;
  genre: Genre;
}