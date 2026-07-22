'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Category, Subject, Resource } from '@/lib/types';
import SearchBar from './SearchBar';
import DirectDownloadButton from './DirectDownloadButton';
import { RevealCard } from './RevealCard';
import { ArrowRight } from 'lucide-react';

interface HomeClientProps {
  categories: Category[];
  subjects: Subject[];
  resources: Resource[];
}

export default function HomeClient({ categories, subjects, resources }: HomeClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // Map resources for fast lookup of featured notes per subject
  const featuredResourcesMap = new Map<string, Resource>();
  resources.forEach(r => {
    if (!featuredResourcesMap.has(r.subject_id) || r.is_featured) {
      featuredResourcesMap.set(r.subject_id, r);
    }
  });

  // Filter subjects by search query
  const filteredSubjects = subjects.filter(subject => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    const nameMatch = subject.name.toLowerCase().includes(query);
    const codeMatch = subject.subject_code ? subject.subject_code.toLowerCase().includes(query) : false;
    const descMatch = subject.description.toLowerCase().includes(query);
    return nameMatch || codeMatch || descMatch;
  });

  const headerVariants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="space-y-8">
      {/* Notion Page Header with Staggered Entrance */}
      <motion.header
        initial="hidden"
        animate="show"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.08 } },
        }}
        className="space-y-3 pb-4 border-b border-notion-divider"
      >
        <motion.div variants={headerVariants} className="flex items-center gap-2">
          <span className="text-3xl">🧬</span>
          <h1 className="text-3xl font-extrabold text-notion-text tracking-tight">
            GateBT Prep
          </h1>
        </motion.div>

        <motion.p variants={headerVariants} className="text-sm text-notion-muted max-w-2xl leading-relaxed">
          Open study notes repository for GATE Biotechnology & B.Pharmacy DBATU. Direct PDF download, no login required.
        </motion.p>

        {/* Search Bar */}
        <motion.div variants={headerVariants} className="pt-2">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </motion.div>
      </motion.header>

      {/* Search Results View or Category List Views */}
      {searchQuery ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-notion-muted">
              Search Results ({filteredSubjects.length})
            </h2>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-notion-blue hover:underline font-medium"
            >
              Clear Filter
            </button>
          </div>

          {filteredSubjects.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-notion-divider rounded-md text-notion-muted text-sm">
              No subjects found matching &quot;{searchQuery}&quot;.
            </div>
          ) : (
            <div className="border border-notion-divider rounded-md divide-y divide-notion-divider bg-white">
              {filteredSubjects.map((subject, idx) => {
                const targetRes = featuredResourcesMap.get(subject.id);
                const filePath = subject.pdf_path || targetRes?.file_path || `notes/${subject.slug}.pdf`;
                const resId = targetRes?.id || subject.id;

                return (
                  <RevealCard key={subject.id} index={idx}>
                    <div className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-notion-hover/60 transition-all hover:-translate-y-0.5">
                      <div className="flex items-start sm:items-center gap-3 min-w-0">
                        <span className="text-xl shrink-0 mt-0.5 sm:mt-0">{subject.icon || '📚'}</span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Link
                              href={`/subject/${subject.slug}`}
                              className="font-medium text-sm text-notion-text hover:text-notion-blue transition-colors truncate"
                            >
                              {subject.name}
                            </Link>
                            {subject.subject_code && (
                              <span className="px-1.5 py-0.5 rounded bg-notion-tag text-[10px] font-mono text-notion-muted border border-notion-divider">
                                {subject.subject_code}
                              </span>
                            )}
                            {subject.gate_weightage && (
                              <span className="text-[11px] text-emerald-700 font-medium hidden sm:inline">
                                • {subject.gate_weightage}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-notion-muted line-clamp-1 mt-0.5">
                            {subject.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <Link
                          href={`/subject/${subject.slug}`}
                          className="text-xs text-notion-muted hover:text-notion-text px-2 py-1 hover:bg-notion-hover rounded transition-colors"
                        >
                          View resources
                        </Link>
                        <DirectDownloadButton
                          resourceId={resId}
                          filePath={filePath}
                          title={`${subject.name} Notes`}
                          label="Download PDF"
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
        /* Categories Notion-Database-List Sections */
        <div className="space-y-10">
          {categories.map((category, catIdx) => {
            const catSubjects = subjects.filter(s => s.category_id === category.id);
            return (
              <RevealCard key={category.id} index={catIdx}>
                <section className="space-y-3">
                  {/* Category Header Row */}
                  <div className="flex items-center justify-between pb-1 border-b border-notion-divider">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{category.icon}</span>
                      <h2 className="text-base font-bold text-notion-text">
                        {category.name}
                      </h2>
                      <span className="text-xs text-notion-muted font-normal">
                        ({catSubjects.length})
                      </span>
                    </div>
                    <Link
                      href={`/category/${category.slug}`}
                      className="text-xs font-medium text-notion-blue hover:underline flex items-center gap-1"
                    >
                      <span>View category page</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  {/* Notion Database List Row View */}
                  <div className="border border-notion-divider rounded-md divide-y divide-notion-divider bg-white">
                    {catSubjects.map((subject, subIdx) => {
                      const targetRes = featuredResourcesMap.get(subject.id);
                      const filePath = subject.pdf_path || targetRes?.file_path || `notes/${subject.slug}.pdf`;
                      const resId = targetRes?.id || subject.id;

                      return (
                        <div
                          key={subject.id}
                          className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-notion-hover/60 transition-all hover:-translate-y-0.5"
                        >
                          <div className="flex items-start sm:items-center gap-3 min-w-0">
                            <span className="text-lg shrink-0 mt-0.5 sm:mt-0">{subject.icon || '📚'}</span>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <Link
                                  href={`/subject/${subject.slug}`}
                                  className="font-medium text-sm text-notion-text hover:text-notion-blue transition-colors truncate"
                                >
                                  {subject.name}
                                </Link>
                                {subject.subject_code && (
                                  <span className="px-1.5 py-0.5 rounded bg-notion-tag text-[10px] font-mono text-notion-muted border border-notion-divider">
                                    {subject.subject_code}
                                  </span>
                                )}
                                {subject.gate_weightage && (
                                  <span className="text-[11px] text-emerald-700 font-medium">
                                    • {subject.gate_weightage}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-notion-muted line-clamp-1 mt-0.5">
                                {subject.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                            <Link
                              href={`/subject/${subject.slug}`}
                              className="text-xs text-notion-muted hover:text-notion-text px-2 py-1 hover:bg-notion-hover rounded transition-colors"
                            >
                              View
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
