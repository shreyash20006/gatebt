'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category, Subject, Resource } from '@/lib/types';
import SearchBar from './SearchBar';
import DirectDownloadButton from './DirectDownloadButton';
import { RevealCard } from './RevealCard';
import { ArrowRight, BookOpen, Download, Sparkles, Award } from 'lucide-react';

interface HomeClientProps {
  categories: Category[];
  subjects: Subject[];
  resources: Resource[];
}

export default function HomeClient({ categories, subjects, resources }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const featuredResourcesMap = new Map<string, Resource>();
  resources.forEach(r => {
    const key = r.subject_id || r.subject_slug || String(r.id);
    if (!featuredResourcesMap.has(key) || r.is_featured) {
      featuredResourcesMap.set(key, r);
    }
  });

  const filteredSubjects = subjects.filter(subject => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const nameMatch = subject.name.toLowerCase().includes(query);
    const codeMatch = subject.subject_code ? subject.subject_code.toLowerCase().includes(query) : false;
    const descMatch = subject.description ? subject.description.toLowerCase().includes(query) : false;
    return nameMatch || codeMatch || descMatch;
  });

  return (
    <div className="space-y-10">
      {/* Hero Banner (PW Style Navy -> Azure) */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-r from-brand-navy via-[#0D3880] to-brand-azure p-8 sm:p-12 text-white shadow-pw relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-brand-azure/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold text-brand-navy text-xs font-extrabold shadow-sm">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Direct Downloads · No Login Required
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            GateBT Prep <span className="text-brand-gold">— Your Notes. Your Success.</span>
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl">
            High-yield handwritten notes, solved question banks, mind maps, and past paper hubs for <strong className="text-white">GATE Biotechnology</strong> and <strong className="text-white">B.Pharmacy DBATU</strong>.
          </p>

          <div className="pt-2">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>
        </div>
      </motion.section>

      {/* Main Subjects / Categories Grid */}
      {searchQuery ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-brand-navy">
              Search Results ({filteredSubjects.length})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-brand-azure hover:underline font-bold"
            >
              Clear Filter
            </button>
          </div>

          {filteredSubjects.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-500 text-sm">
              No subjects found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredSubjects.map((subject, idx) => {
                const targetRes = featuredResourcesMap.get(String(subject.id)) || featuredResourcesMap.get(subject.slug);
                const filePath = subject.pdf_path || targetRes?.file_path || `notes/${subject.slug}.pdf`;
                const resId = String(targetRes?.id || subject.id);

                return (
                  <RevealCard key={subject.id} index={idx}>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-pw-hover transition-all flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-2xl">{subject.icon || '📚'}</span>
                          <div className="flex items-center gap-1.5 flex-wrap justify-end">
                            {subject.subject_code && (
                              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-brand-navy text-[11px] font-mono font-bold">
                                {subject.subject_code}
                              </span>
                            )}
                            {subject.gate_weightage && (
                              <span className="px-2 py-0.5 rounded-full bg-brand-gold-light text-amber-900 text-[10px] font-extrabold">
                                {subject.gate_weightage}
                              </span>
                            )}
                          </div>
                        </div>

                        <Link
                          href={`/subject/${subject.slug}`}
                          className="font-extrabold text-base text-brand-navy hover:text-brand-azure transition-colors block mb-1.5"
                        >
                          {subject.name}
                        </Link>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                          {subject.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                        <Link
                          href={`/subject/${subject.slug}`}
                          className="text-xs font-bold text-slate-500 hover:text-brand-navy"
                        >
                          View Details
                        </Link>
                        <DirectDownloadButton
                          resourceId={resId}
                          filePath={filePath}
                          title={`${subject.name} Notes`}
                          label="Download"
                          compact
                        />
                      </div>
                    </div>
                  </RevealCard>
                );
              })}
            </div>
          )}
        </section>
      ) : (
        <div className="space-y-12">
          {categories.map((category, catIdx) => {
            const catSubjects = subjects.filter(s => s.category_id === category.id);
            return (
              <RevealCard key={category.id} index={catIdx}>
                <section className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{category.icon}</span>
                      <h2 className="text-xl font-extrabold text-brand-navy">
                        {category.name}
                      </h2>
                      <span className="text-xs text-slate-500 font-semibold">
                        ({catSubjects.length} subjects)
                      </span>
                    </div>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-xs font-bold text-brand-azure hover:underline flex items-center gap-1"
                    >
                      <span>View All</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {catSubjects.map((subject, subIdx) => {
                      const targetRes = featuredResourcesMap.get(String(subject.id)) || featuredResourcesMap.get(subject.slug);
                      const filePath = subject.pdf_path || targetRes?.file_path || `notes/${subject.slug}.pdf`;
                      const resId = String(targetRes?.id || subject.id);

                      return (
                        <div
                          key={subject.id}
                          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-pw-hover transition-all flex flex-col justify-between h-full"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-2xl">{subject.icon || '📚'}</span>
                              <div className="flex items-center gap-1.5 flex-wrap justify-end">
                                {subject.subject_code && (
                                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-brand-navy text-[11px] font-mono font-bold">
                                    {subject.subject_code}
                                  </span>
                                )}
                                {subject.gate_weightage && (
                                  <span className="px-2 py-0.5 rounded-full bg-brand-gold-light text-amber-900 text-[10px] font-extrabold">
                                    {subject.gate_weightage}
                                  </span>
                                )}
                              </div>
                            </div>

                            <Link
                              href={`/subject/${subject.slug}`}
                              className="font-extrabold text-base text-brand-navy hover:text-brand-azure transition-colors block mb-1.5"
                            >
                              {subject.name}
                            </Link>
                            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                              {subject.description}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <Link
                              href={`/subject/${subject.slug}`}
                              className="text-xs font-bold text-slate-500 hover:text-brand-navy"
                            >
                              View Notes
                            </Link>
                            <DirectDownloadButton
                              resourceId={resId}
                              filePath={filePath}
                              title={`${subject.name} Notes`}
                              label="Download"
                              compact
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </RevealCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
