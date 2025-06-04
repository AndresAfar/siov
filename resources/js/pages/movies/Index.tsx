import React from 'react'
import { type BreadcrumbItem } from '@/types';
import GeneralLayout from '@/layouts/general-layout';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'movies',
        href: '/movies',
    },
];

export default function index() {
  return (
    <GeneralLayout breadcrumbs={breadcrumbs}>

    </GeneralLayout>
  )
}
