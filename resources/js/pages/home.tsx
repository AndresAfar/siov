import React from 'react';
import { type BreadcrumbItem, type Movie } from '@/types';
import GeneralLayout from '@/layouts/general-layout';
import { Head, usePage } from '@inertiajs/react';
import CardMovie from '@/components/ui/card-movie';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Inicio',
        href: '/home',
    },
];

interface HomePageProps {
    recentMovies: Movie[];
    featuredMovies: Movie[];
    popularMovies: Movie[];
    allMovies: Movie[];
}

const HomePage = () => {
    // Obtener datos del backend a través de Inertia
    const { recentMovies, featuredMovies, popularMovies, allMovies } = usePage<HomePageProps>().props;
    return (
        <>
            <Head title="Inicio - Siov" />
            
            <GeneralLayout breadcrumbs={breadcrumbs}>
                {/* Hero Section Container */}
                <section className="relative">
                    <div className="container mx-auto px-4 py-8">
                        <div className="bg-gray-800/50 rounded-lg p-8 mb-8 border border-gray-700">
                            <h1 className="text-4xl font-bold text-white mb-4">
                                Bienvenido a Siov
                            </h1>
                            <p className="text-gray-300 text-lg mb-6">
                                Descubre miles de películas y series en alta calidad
                            </p>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                                Explorar Contenido
                            </button>
                        </div>
                    </div>
                </section>

                {/* Featured Movies Section */}
                {featuredMovies && featuredMovies.length > 0 && (
                    <section className="py-8">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Películas Destacadas</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                                {featuredMovies.map((movie) => (
                                    <CardMovie 
                                        key={movie.id} 
                                        movie={movie} 
                                        variant="featured"
                                        showDescription={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Recently Added Section */}
                {recentMovies && recentMovies.length > 0 && (
                    <section className="py-8">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Agregados Recientemente</h2>
                            <div className="space-y-4">
                                {recentMovies.map((movie) => (
                                    <CardMovie 
                                        key={movie.id} 
                                        movie={movie} 
                                        variant="horizontal"
                                        showDescription={true}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Popular Movies Grid */}
                {popularMovies && popularMovies.length > 0 && (
                    <section className="py-8">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Películas Populares</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {popularMovies.map((movie) => (
                                    <CardMovie 
                                        key={movie.id} 
                                        movie={movie} 
                                        variant="default"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* All Movies Section */}
                {allMovies && allMovies.length > 0 && (
                    <section className="py-8">
                        <div className="container mx-auto px-4">
                            <h2 className="text-2xl font-bold text-white mb-6">Todas las Películas</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {allMovies.map((movie) => (
                                    <CardMovie 
                                        key={movie.id} 
                                        movie={movie} 
                                        variant="default"
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </GeneralLayout>
        </>
    );
};

export default HomePage;