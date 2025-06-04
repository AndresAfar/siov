import React, { useState, useEffect } from 'react';
import { type BreadcrumbItem, type Movie } from '@/types';
import GeneralLayout from '@/layouts/general-layout';
import { Head, usePage, router } from '@inertiajs/react';
import CardMovie from '@/components/ui/card-movie';
import { Search, Grid, List, X, ArrowLeft } from 'lucide-react';

interface MoviesSearchProps {
    movies: {
        data: Movie[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
    };
    query: string;
}

export default function MoviesSearch() {
    const { movies, query } = usePage<MoviesSearchProps>().props;
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState(query || '');

    // Breadcrumbs dinámicos
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
            title: 'Búsqueda',
            href: '/movies/search',
        },
    ];

    // Actualizar el input cuando cambie la query de la URL
    useEffect(() => {
        setSearchQuery(query || '');
    }, [query]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/movies/search', { q: searchQuery.trim() });
        }
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        router.get('/movies');
    };

    const handlePageChange = (url: string) => {
        router.get(url);
    };

    return (
        <>
            <Head title={`Buscar: ${query} - Siov`} />
            
            <GeneralLayout breadcrumbs={breadcrumbs}>
                {/* Header Section */}
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        {/* Back Button */}
                        <button
                            onClick={() => router.get('/movies')}
                            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-6"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Volver a todas las películas</span>
                        </button>

                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            {/* Title and Search Results */}
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Resultados de búsqueda
                                </h1>
                                {query && (
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-gray-400">Buscando:</span>
                                        <span className="bg-gray-800 px-3 py-1 rounded-full text-white font-medium border border-gray-700">
                                            "{query}"
                                        </span>
                                        <button
                                            onClick={handleClearSearch}
                                            className="text-gray-400 hover:text-white transition-colors"
                                            title="Limpiar búsqueda"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                                <p className="text-gray-400">
                                    {movies.total === 0 
                                        ? 'No se encontraron resultados'
                                        : `${movies.total} ${movies.total === 1 ? 'resultado encontrado' : 'resultados encontrados'}`
                                    }
                                </p>
                            </div>

                            {/* Search and Controls */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                {/* Search Form */}
                                <form onSubmit={handleSearch} className="relative">
                                    <input
                                        type="text"
                                        placeholder="Buscar películas..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 w-full sm:w-64"
                                        autoFocus
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </form>

                                {/* View Mode Toggle - Solo mostrar si hay resultados */}
                                {movies.data.length > 0 && (
                                    <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded transition-colors ${
                                                viewMode === 'grid' 
                                                    ? 'bg-red-600 text-white' 
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            <Grid className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded transition-colors ${
                                                viewMode === 'list' 
                                                    ? 'bg-red-600 text-white' 
                                                    : 'text-gray-400 hover:text-white'
                                            }`}
                                        >
                                            <List className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Search Results */}
                <section className="pb-8">
                    <div className="container mx-auto px-4">
                        {movies.data.length > 0 ? (
                            <>
                                {viewMode === 'grid' ? (
                                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
                                        {movies.data.map((movie) => (
                                            <CardMovie 
                                                key={movie.id} 
                                                movie={movie} 
                                                variant="default"
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-4 mb-8">
                                        {movies.data.map((movie) => (
                                            <CardMovie 
                                                key={movie.id} 
                                                movie={movie} 
                                                variant="horizontal"
                                                showDescription={true}
                                            />
                                        ))}
                                    </div>
                                )}

                                {/* Pagination */}
                                {movies.last_page > 1 && (
                                    <div className="flex justify-center items-center space-x-2">
                                        {movies.links.map((link, index) => {
                                            if (!link.url) {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="px-3 py-2 text-gray-500 cursor-not-allowed"
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => handlePageChange(link.url!)}
                                                    className={`px-3 py-2 rounded transition-colors ${
                                                        link.active
                                                            ? 'bg-red-600 text-white'
                                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                                    }`}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Empty State */
                            <div className="text-center py-16">
                                <div className="mb-6">
                                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-12 h-12 text-gray-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No se encontraron resultados
                                </h3>
                                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                                    {query 
                                        ? `No pudimos encontrar películas que coincidan con "${query}". Intenta con otros términos de búsqueda.`
                                        : 'Ingresa un término de búsqueda para encontrar películas.'
                                    }
                                </p>
                                <div className="space-y-3">
                                    <div className="text-sm text-gray-500 mb-4">
                                        <p className="mb-2">Sugerencias:</p>
                                        <ul className="space-y-1">
                                            <li>• Verifica la ortografía</li>
                                            <li>• Usa términos más generales</li>
                                            <li>• Prueba con palabras clave diferentes</li>
                                        </ul>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                        <button
                                            onClick={handleClearSearch}
                                            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                        >
                                            Ver todas las películas
                                        </button>
                                        <button
                                            onClick={() => setSearchQuery('')}
                                            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors border border-gray-700"
                                        >
                                            Nueva búsqueda
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </GeneralLayout>
        </>
    );
}