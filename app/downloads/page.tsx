'use client';

import { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FileText, Brain, Download, Search, Sparkles } from 'lucide-react';
import Tilt3DCard from '@/components/Tilt3DCard';
import DirectDownloadButton from '@/components/DirectDownloadButton';
import { getSubjects, getResources } from '@/lib/data';
import { Subject, Resource } from '@/lib/types';
import Link from 'next/link';

// Dynamically import 3D DNAHero with SSR disabled for optimal performance
const DNAHero = dynamic(() => import('@/components/DNAHero'), {
  ssr: false,
  loading: () => (
    <div className="h-[280px] w-full flex items-center justify-center text-white/50 text-xs font-semibold animate-pulse">
      🧬 Loading 3D Biotech Model...
    </div>
  ),
});

export default function DownloadsPage() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [q, setQ] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    Promise.all([getSubjects(), getResources()]).then(([subs, res]) => {
      setSubjects(subs);
      setResources(res);
    });
  }, []);

  // Map resources by subject for quick access to mindmap and notes PDF
  const resourcesBySubject = useMemo(() => {
    const map = new Map<string, { notes?: Resource; mindmap?: Resource }>();
    resources.forEach(r => {
      const key = r.subject_id || r.subject_slug || String(r.id);
      const existing = map.get(key) || {};
      if (r.type === 'notes_pdf' && !existing.notes) existing.notes = r;
      if (r.type === 'mind_map' && !existing.mindmap) existing.mindmap = r;
      map.set(key, existing);
    });
    return map;
  }, [resources]);

  const filteredSubjects = useMemo(() => {
    return subjects.filter(s => {
      const query = q.toLowerCase();
      const matchName = s.name.toLowerCase().includes(query);
      const matchCode = s.subject_code ? s.subject_code.toLowerCase().includes(query) : false;
      const matchCategory = selectedCategory === 'all' || s.category?.slug === selectedCategory || (selectedCategory === 'gate-biotechnology' && s.category_id === 'cat-1') || (selectedCategory === 'b-pharmacy-dbatu' && s.category_id === 'cat-2');

      return (matchName || matchCode) && matchCategory;
    });
  }, [subjects, q, selectedCategory]);

  return (
    <div className="space-y-8">
      {/* 1. 3D Rotating DNA Hero Banner */}
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-[#0D3880] to-brand-azure px-6 pt-8 text-white shadow-pw relative">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold text-brand-navy text-xs font-extrabold shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free Open Access
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            All Downloads Hub
          </h1>
          <p className="mt-2 text-slate-200 text-sm sm:text-base leading-relaxed">
            Direct PDF downloads for handwritten notes &amp; mind maps across all GATE Biotechnology &amp; B.Pharmacy subjects.
          </p>
        </div>

        {/* 3D Rotating DNA Canvas */}
        <DNAHero />
      </div>

      {/* 2. Sticky Search & Category Filter */}
      <div className="sticky top-4 z-20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 backdrop-blur-md p-3 shadow-md">
        <div className="flex-1 flex items-center gap-2 px-2">
          <Search size={18} className="text-brand-azure shrink-0" />
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Search subjects, codes (e.g. Biochemistry, BP202T)..."
            className="w-full bg-transparent outline-none placeholder:text-slate-400 text-xs sm:text-sm font-medium text-brand-navy"
          />
        </div>

        <div className="flex items-center gap-2 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-brand-navy outline-none focus:border-brand-azure"
          >
            <option value="all">All Categories</option>
            <option value="gate-biotechnology">🧬 GATE Biotechnology</option>
            <option value="b-pharmacy-dbatu">🎓 B.Pharmacy DBATU</option>
          </select>
        </div>
      </div>

      {/* Results counter */}
      <div className="flex justify-between items-center text-xs font-semibold text-slate-500 px-1">
        <span>Showing {filteredSubjects.length} subjects</span>
        {(q || selectedCategory !== 'all') && (
          <button
            onClick={() => { setQ(''); setSelectedCategory('all'); }}
            className="text-brand-azure hover:underline font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* 3. 3D Tilt Download Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSubjects.map((s, i) => {
          const resPair = resourcesBySubject.get(s.id);
          const pdfPath = s.pdf_path || resPair?.notes?.file_path || `notes/${s.slug}.pdf`;
          const mindmapPath = s.mindmap_path || resPair?.mindmap?.file_path;

          return (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.4 }}
            >
              <Tilt3DCard>
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-pw-hover transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="rounded-full bg-brand-gold-light px-2.5 py-0.5 text-[11px] font-extrabold text-amber-900">
                        {s.category?.name || 'Subject'}
                      </span>
                      {s.subject_code && (
                        <span className="font-mono text-[11px] font-bold text-brand-navy bg-slate-100 px-2 py-0.5 rounded-full">
                          {s.subject_code}
                        </span>
                      )}
                    </div>

                    <Link
                      href={`/subject/${s.slug}`}
                      className="mt-2 text-base font-extrabold text-brand-navy hover:text-brand-azure transition-colors block flex items-center gap-1.5"
                    >
                      <span>{s.icon || '📚'}</span>
                      <span>{s.name}</span>
                    </Link>

                    <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Dual 3D Download Action Buttons */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-brand-navy flex items-center gap-1.5">
                        <FileText size={14} className="text-brand-azure" /> Notes PDF
                      </span>
                      <DirectDownloadButton
                        resourceId={resPair?.notes?.id || s.id}
                        filePath={pdfPath}
                        title={`${s.name} Notes`}
                        label="Download"
                        compact
                      />
                    </div>

                    {mindmapPath && (
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-50">
                        <span className="text-xs font-semibold text-brand-navy flex items-center gap-1.5">
                          <Brain size={14} className="text-purple-600" /> Mind Map
                        </span>
                        <DirectDownloadButton
                          resourceId={resPair?.mindmap?.id || `${s.id}-mindmap`}
                          filePath={mindmapPath}
                          title={`${s.name} Mind Map`}
                          label="Download"
                          compact
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Tilt3DCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
