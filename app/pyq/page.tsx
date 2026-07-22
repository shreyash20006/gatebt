import { getPyqs } from '@/lib/data';
import PyqBrowser from '@/components/PyqBrowser';
import { Metadata } from 'next';
import { HelpCircle, Award, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Previous Year Questions (PYQ) 2019-2024',
  description: 'Practice 340+ GATE Biotechnology & B.Pharmacy previous year questions with answer keys and difficulty filters.',
};

export const revalidate = 3600;

export default async function PyqPage() {
  const pyqs = await getPyqs();

  return (
    <div className="space-y-6">
      {/* Hero Header */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-navy via-[#0D3880] to-brand-azure p-8 sm:p-10 text-white shadow-pw relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold text-brand-navy text-xs font-extrabold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" /> Solved Questions &amp; Answer Keys
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Previous Year Questions (PYQ)
          </h1>
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
            GATE Biotechnology &amp; core pharmaceutical subjects — 2019 to 2024 solved questions with instant answer reveals.
          </p>
        </div>
      </div>

      {/* Interactive PYQ Browser */}
      <PyqBrowser rows={pyqs} />
    </div>
  );
}
