import { getResourceLibrary } from '@/lib/data';
import ResourceBrowser from '@/components/ResourceBrowser';
import { Metadata } from 'next';
import { BookOpen, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Curated Resource Library',
  description: 'Hand-picked books, video lectures & references for GATE Biotechnology & B.Pharmacy students.',
};

export const revalidate = 3600;

export default async function ResourcesPage() {
  const resources = await getResourceLibrary();

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-[#0D3880] to-brand-azure p-8 sm:p-10 text-white shadow-pw relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-brand-navy text-xs font-extrabold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Curated References &amp; Textbooks
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Resource Library
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            Hand-picked standard textbooks, NPTEL video lectures, protocols, and reference websites for GATE Biotechnology &amp; B.Pharmacy.
          </p>
        </div>
      </div>

      {/* Interactive Resource Browser */}
      <ResourceBrowser rows={resources} />
    </div>
  );
}
