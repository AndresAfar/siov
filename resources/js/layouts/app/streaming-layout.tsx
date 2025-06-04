import React from 'react';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import StreamingNavbar from '@/components/general/StreamingNavbar'; // Ajusta la ruta según tu estructura

interface StreamingLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    showNavbar?: boolean;
    className?: string;
}

const StreamingLayout = ({ 
    children, 
    breadcrumbs = [], 
    title,
    showNavbar = true,
    className = '',
    ...props 
}: StreamingLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
            {/* Navbar - Solo se muestra si showNavbar es true */}
            {showNavbar && <StreamingNavbar />}
            
            {/* Main Content Area */}
            <main className={`flex-1 ${className}`}>
                {/* Breadcrumbs - Solo si existen */}
                {breadcrumbs.length > 0 && (
                    <div className="border-b border-gray-800 bg-black/50">
                        <div className="container mx-auto px-4 py-3">
                            <nav className="flex items-center space-x-2 text-sm">
                                {breadcrumbs.map((crumb, index) => (
                                    <React.Fragment key={index}>
                                        {index > 0 && (
                                            <span className="text-gray-500">/</span>
                                        )}
                                        {crumb.href ? (
                                            <a
                                                href={crumb.href}
                                                className="text-gray-400 hover:text-white transition-colors capitalize"
                                            >
                                                {crumb.title}
                                            </a>
                                        ) : (
                                            <span className="text-white capitalize">
                                                {crumb.title}
                                            </span>
                                        )}
                                    </React.Fragment>
                                ))}
                            </nav>
                        </div>
                    </div>
                )}

                {/* Page Title - Solo si se proporciona */}
                {title && (
                    <div className="container mx-auto px-4 py-6">
                        <h1 className="text-3xl font-bold text-white">{title}</h1>
                    </div>
                )}

                {/* Children Content */}
                <div className="flex-1">
                    {children}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-black border-t border-gray-800 py-8 mt-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-white font-bold mb-4">Siov</h3>
                            <p className="text-gray-400 text-sm">
                                Tu plataforma de streaming favorita
                            </p>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Navegación</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="/movies" className="hover:text-white transition-colors">Películas</a></li>
                                <li><a href="/series" className="hover:text-white transition-colors">Series</a></li>
                                <li><a href="/favorites" className="hover:text-white transition-colors">Favoritos</a></li>
                                <li><a href="/watchlist" className="hover:text-white transition-colors">Ver más tarde</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Soporte</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="/help" className="hover:text-white transition-colors">Centro de ayuda</a></li>
                                <li><a href="/contact" className="hover:text-white transition-colors">Contacto</a></li>
                                <li><a href="/terms" className="hover:text-white transition-colors">Términos de uso</a></li>
                                <li><a href="/privacy" className="hover:text-white transition-colors">Privacidad</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Síguenos</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Facebook</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">YouTube</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        <p>© 2025 Siov. Todos los derechos reservados.</p>
                        <p className="mt-2">
                            Desarrollado con ❤️ para los amantes del entretenimiento
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StreamingLayout;