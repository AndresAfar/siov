import React from 'react';
import { Play, Clock, Calendar, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface Movie {
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

interface CardMovieProps {
  movie: Movie;
  variant?: 'default' | 'horizontal' | 'featured';
  showDescription?: boolean;
}

const CardMovie: React.FC<CardMovieProps> = ({ 
  movie, 
  variant = 'default',
  showDescription = false 
}) => {
  // Función para verificar si la película es nueva (creada en las últimas 2 semanas)
  const isNewMovie = () => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const createdDate = new Date(movie.created_at);
    return createdDate >= twoWeeksAgo;
  };

  // Función para formatear la duración
  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Función para obtener el color de la clasificación
  const getRatingColor = (rating?: string) => {
    switch (rating) {
      case 'G': return 'bg-green-500';
      case 'PG': return 'bg-blue-500';
      case 'PG-13': return 'bg-yellow-500';
      case 'R': return 'bg-orange-500';
      case 'NC-17': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  // Renderizado para variante horizontal
  if (variant === 'horizontal') {
    return (
      <Link href={`/movies/${movie.slug}`}>
        <div className="group flex space-x-4 bg-gray-800/50 rounded-lg p-4 mb-2 hover:bg-gray-700/50 transition-all duration-300 cursor-pointer border border-gray-700/50 hover:border-gray-600">
          {/* Imagen */}
          <div className="relative w-20 h-28 flex-shrink-0">
            <div className="w-full h-full bg-gray-600 rounded-lg overflow-hidden">
              {movie.cover_image ? (
                <img 
                  src={movie.cover_image} 
                  alt={movie.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Play className="w-6 h-6" />
                </div>
              )}
            </div>
            
            {/* Indicador de Nuevo */}
            {isNewMovie() && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                NUEVO
              </div>
            )}
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-white font-semibold text-lg group-hover:text-red-400 transition-colors truncate">
                {movie.title}
              </h3>
              {movie.rating && (
                <span className={`${getRatingColor(movie.rating)} text-white text-xs font-bold px-2 py-1 rounded ml-2 flex-shrink-0`}>
                  {movie.rating}
                </span>
              )}
            </div>
            
            {/* Metadatos */}
            <div className="flex items-center space-x-4 text-sm text-gray-400 mb-2">
              {movie.year && (
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
              )}
              {movie.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatDuration(movie.duration)}</span>
                </div>
              )}
            </div>

            {/* Descripción */}
            {showDescription && movie.description && (
              <p className="text-gray-300 text-sm line-clamp-2 mb-2">
                {movie.description}
              </p>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // Renderizado para variante featured
  if (variant === 'featured') {
    return (
      <Link href={`/movies/${movie.slug}`}>
        <div className="group relative bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300">
          {/* Imagen de fondo */}
          <div className="aspect-video w-full bg-gray-700">
            {movie.cover_image ? (
              <img 
                src={movie.cover_image} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <Play className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Overlay con contenido */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-6">
            {/* Indicador de Nuevo */}
            {isNewMovie() && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                NUEVO
              </div>
            )}

            <div className="space-y-2">
              <h3 className="text-white font-bold text-xl group-hover:text-red-400 transition-colors">
                {movie.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                {movie.year && <span>{movie.year}</span>}
                {movie.duration && <span>{formatDuration(movie.duration)}</span>}
                {movie.rating && (
                  <span className={`${getRatingColor(movie.rating)} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {movie.rating}
                  </span>
                )}
              </div>

              {movie.description && (
                <p className="text-gray-300 text-sm line-clamp-2">
                  {movie.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Renderizado por defecto (card vertical)
  return (
    <Link href={`/movies/${movie.slug}`}>
      <div className="group relative bg-gray-800/50 rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-700/50 hover:border-gray-600">
        {/* Imagen */}
        <div className="relative aspect-[2/3] w-full bg-gray-700">
          {movie.cover_image ? (
            <img 
              src={movie.cover_image} 
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Play className="w-8 h-8" />
            </div>
          )}
          
          {/* Overlay con botón de reproducir */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
              <div className="bg-red-600 hover:bg-red-700 rounded-full p-3 cursor-pointer">
                <Play className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
          </div>

          {/* Indicador de Nuevo */}
          {isNewMovie() && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
              NUEVO
            </div>
          )}

          {/* Clasificación */}
          {movie.rating && (
            <div className="absolute top-2 left-2">
              <span className={`${getRatingColor(movie.rating)} text-white text-xs font-bold px-2 py-1 rounded`}>
                {movie.rating}
              </span>
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-red-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
            <span>{movie.year || 'N/A'}</span>
            {movie.duration && (
              <span>{formatDuration(movie.duration)}</span>
            )}
          </div>

          {showDescription && movie.description && (
            <p className="text-gray-300 text-sm line-clamp-2">
              {movie.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CardMovie;