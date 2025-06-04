import React, { useState } from 'react';
import { type BreadcrumbItem, type Movie } from '@/types';
import GeneralLayout from '@/layouts/general-layout';
import { Head, usePage, router } from '@inertiajs/react';
import CardMovie from '@/components/ui/card-movie';
import { Search, Filter, Grid, List } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/home',
    },
    {
        title: 'Películas',
        href: '/movies',
    },
];

interface MoviesIndexProps {
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
}

export default function MoviesIndex() {
    const { movies } = usePage<MoviesIndexProps>().props;
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/movies/search', { q: searchQuery });
        }
    };

    const handlePageChange = (url: string) => {
        router.get(url);
    };

    return (
        <>
            <Head title="Películas - Siov" />
            
            <GeneralLayout breadcrumbs={breadcrumbs}>
                {/* Header Section */}
                <section className="py-8">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
                            {/* Title and Stats */}
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    Todas las Películas
                                </h1>
                                <p className="text-gray-400">
                                    {movies.total} {movies.total === 1 ? 'película encontrada' : 'películas encontradas'}
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
                                    />
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </form>

                                {/* View Mode Toggle */}
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
                            </div>
                        </div>
                    </div>
                </section>

                {/* Movies Grid/List */}
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
                                <div className="mb-4">
                                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Search className="w-12 h-12 text-gray-600" />
                                    </div>
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">
                                    No se encontraron películas
                                </h3>
                                <p className="text-gray-400 mb-6">
                                    Intenta ajustar tus criterios de búsqueda o explora nuestro catálogo completo.
                                </p>
                                <button
                                    onClick={() => router.get('/movies')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                                >
                                    Ver todas las películas
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </GeneralLayout>
        </>
    );
}