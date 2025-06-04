import React, { useState } from 'react';
import { Play, Clock, Calendar, Star, Share2, Heart, Download, ArrowLeft } from 'lucide-react';
import { Head, Link, usePage } from '@inertiajs/react';
import GeneralLayout from '@/layouts/general-layout';
import { type BreadcrumbItem, type Movie } from '@/types';

// Interfaces extendidas para incluir relaciones
interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface Actor {
  id: number;
  name: string;
  bio?: string;
  photo_url?: string;
  pivot?: {
    role_name?: string;
  };
}

interface ExtendedMovie extends Movie {
  genres?: Genre[];
  actors?: Actor[];
}

interface MoviePreviewProps {
  movie: ExtendedMovie;
  relatedMovies?: Movie[];
}

const MoviePreview = () => {
  const { movie, relatedMovies } = usePage<MoviePreviewProps>().props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);

  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Inicio',
      href: '/home',
    },
    {
      title: 'Películas',
      href: '/movies',
    },
    {
      title: movie.title,
      href: `/movies/${movie.slug}`,
    },
  ];

  // Función para verificar si la película es nueva
  const isNewMovie = () => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    const createdDate = new Date(movie.created_at);
    return createdDate >= twoWeeksAgo;
  };

  // Función para formatear la duración
  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'N/A';
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

  const handleWatchMovie = () => {
    // Aquí rediriges a la página del player
    window.location.href = `/watch/${movie.slug}`;
  };

  const handleWatchTrailer = () => {
    if (movie.trailer_url) {
      setShowTrailer(true);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Aquí puedes agregar la lógica para guardar en favoritos
  };

  return (
    <>
      <Head title={`${movie.title} - Siov`} />
      
      <GeneralLayout breadcrumbs={breadcrumbs}>
        {/* Hero Section */}
        <div className="relative min-h-screen">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            {movie.cover_image ? (
              <img 
                src={movie.cover_image} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-900"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-8 min-h-screen lg:items-center">
              {/* Movie Poster */}
              <div className="lg:w-1/3 flex justify-center lg:justify-start">
                <div className="relative w-80 h-[480px] rounded-lg overflow-hidden shadow-2xl">
                  {movie.cover_image ? (
                    <img 
                      src={movie.cover_image} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                      <Play className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                  
                  {/* New Badge */}
                  {isNewMovie() && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                      NUEVO
                    </div>
                  )}
                </div>
              </div>

              {/* Movie Info */}
              <div className="lg:w-2/3 space-y-6">
                {/* Title and Rating */}
                <div className="space-y-4">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                    {movie.title}
                  </h1>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-lg">
                    {movie.year && (
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{movie.year}</span>
                      </div>
                    )}
                    {movie.duration && (
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-5 h-5 mr-2" />
                        <span>{formatDuration(movie.duration)}</span>
                      </div>
                    )}
                    {movie.rating && (
                      <span className={`${getRatingColor(movie.rating)} text-white text-sm font-bold px-3 py-1 rounded-full`}>
                        {movie.rating}
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {movie.genres && movie.genres.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span 
                          key={genre.id}
                          className="bg-gray-700/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-600"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Description */}
                {movie.description && (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-white">Sinopsis</h3>
                    <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
                      {movie.description}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={handleWatchMovie}
                    className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 transition-all duration-200 transform hover:scale-105 shadow-lg"
                  >
                    <Play className="w-6 h-6 fill-current" />
                    Ver Película
                  </button>
                  
                  {movie.trailer_url && (
                    <button 
                      onClick={handleWatchTrailer}
                      className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 transition-all duration-200 border border-gray-600"
                    >
                      <Play className="w-5 h-5" />
                      Ver Tráiler
                    </button>
                  )}
                  
                  <button 
                    onClick={toggleFavorite}
                    className={`px-6 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 transition-all duration-200 border ${
                      isFavorite 
                        ? 'bg-red-600 text-white border-red-600' 
                        : 'bg-transparent text-gray-300 border-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                    {isFavorite ? 'En Favoritos' : 'Favoritos'}
                  </button>
                  
                  <button className="bg-transparent text-gray-300 px-6 py-4 rounded-lg font-semibold text-lg flex items-center gap-3 transition-all duration-200 border border-gray-600 hover:bg-gray-700">
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cast Section */}
        {movie.actors && movie.actors.length > 0 && (
          <section className="py-12 bg-gray-900/50">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8">Reparto</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {movie.actors.slice(0, 6).map((actor) => (
                  <div key={actor.id} className="text-center">
                    <div className="w-full aspect-square rounded-full overflow-hidden mb-3 bg-gray-700">
                      {actor.photo_url ? (
                        <img 
                          src={actor.photo_url} 
                          alt={actor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span className="text-2xl font-bold">
                            {actor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {actor.name}
                    </h4>
                    {actor.pivot?.role_name && (
                      <p className="text-gray-400 text-xs">
                        {actor.pivot.role_name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Movies */}
        {relatedMovies && relatedMovies.length > 0 && (
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-white mb-8">Películas Relacionadas</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {relatedMovies.map((relatedMovie) => (
                  <Link 
                    key={relatedMovie.id} 
                    href={`/movies/${relatedMovie.slug}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] w-full bg-gray-700 rounded-lg overflow-hidden">
                      {relatedMovie.cover_image ? (
                        <img 
                          src={relatedMovie.cover_image} 
                          alt={relatedMovie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <Play className="w-8 h-8" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    <h4 className="text-white text-sm font-medium mt-2 group-hover:text-red-400 transition-colors">
                      {relatedMovie.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Trailer Modal */}
        {showTrailer && movie.trailer_url && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl aspect-video bg-black rounded-lg overflow-hidden">
              <button 
                onClick={() => setShowTrailer(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black/50 rounded-full p-2"
              >
                ✕
              </button>
              <iframe
                src={movie.trailer_url}
                className="w-full h-full"
                allowFullScreen
                title={`${movie.title} - Tráiler`}
              ></iframe>
            </div>
          </div>
        )}
      </GeneralLayout>
    </>
  );
};

export default MoviePreview;