import StreamingLayout from '@/layouts/app/streaming-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface GeneralLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    title?: string;
    showNavbar?: boolean;
    className?: string;
}

export default ({ children, breadcrumbs, title, showNavbar = true, className, ...props }: GeneralLayoutProps) => (
    <StreamingLayout 
        breadcrumbs={breadcrumbs} 
        title={title}
        showNavbar={showNavbar}
        className={className}
        {...props}
    >
        {children}
    </StreamingLayout>
);