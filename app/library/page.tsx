import React from 'react';
import { getSubjects, getPyqs, getResources, getPaperPlans, getCategories } from '@/lib/data';
import LibraryClient from './LibraryClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catalogue Library | Free GATE Biotechnology & B.Pharmacy Study Store',
  description:
    'Browse and download free handwritten notes, mind maps, solved PYQs, curated books, videos, and GATE papers.',
};

export const revalidate = 3600;

export default async function LibraryPage() {
  const [categories, subjects, pyqs, resources, papers] = await Promise.all([
    getCategories(),
    getSubjects(),
    getPyqs(),
    getResources(),
    getPaperPlans(),
  ]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-[#0B2A63] tracking-tight">
          Catalogue Library &amp; Study Store
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Search, filter, and download notes, mind maps, solved PYQs, standard books, and official GATE papers.
        </p>
      </div>

      <LibraryClient
        categories={categories}
        subjects={subjects}
        pyqs={pyqs}
        resources={resources}
        papers={papers}
      />
    </div>
  );
}
