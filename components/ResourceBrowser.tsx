'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ResourceItem } from '@/lib/types';
import {
  BookOpen,
  FileText,
  Video,
  Globe,
  Star,
  ExternalLink,
  Search,
  Filter,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

const typeStyle: Record<string, { c: string; Icon: any }> = {
  Book: { c: 'bg-amber-100 text-amber-900 border-amber-200 font-extrabold', Icon: BookOpen },
  PDF: { c: 'bg-red-100 text-red-800 border-red-200 font-extrabold', Icon: FileText },
  Video: { c: 'bg-brand-azure/15 text-brand-azure border-brand-azure/30 font-extrabold', Icon: Video },
  Website: { c: 'bg-emerald-100 text-emerald-800 border-emerald-200 font-extrabold', Icon: Globe },
};

export function ResourceLibraryCard({ r, index = 0 }: { r: ResourceItem; index?: number }) {
  const t = typeStyle[r.type] ?? typeStyle.Website;
  const Icon = t.Icon;

  return (
    <motion.a
      href={r.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: (index % 6) * 0.04 }}
      whileHover={{ y: -4 }}
      className="group bg-white rounded-2xl shadow-xs border border-slate-200 p-5 flex flex-col justify-between hover:shadow-pw-hover hover:border-brand-azure/50 transition-all"
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full border ${t.c}`}>
            <Icon size={12} /> {r.type}
          </span>
          {r.rating != null && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-900 bg-brand-gold-light px-2 py-0.5 rounded-full border border-amber-200">
              <Star size={12} className="fill-brand-gold text-brand-gold" /> {r.rating}
            </span>
          )}
        </div>

        <h3 className="font-extrabold text-brand-navy text-sm sm:text-base group-hover:text-brand-azure transition-colors leading-snug">
          {r.name}
        </h3>

        <div className="mt-3">
          <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {r.subject}
          </span>
        </div>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-extrabold text-brand-azure group-hover:text-brand-azure-hover">
        <span>Open Reference</span>
        <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Open <ExternalLink size={14} />
        </span>
      </div>
    </motion.a>
  );
}

export default function ResourceBrowser({ rows }: { rows: ResourceItem[] }) {
  const subjects = useMemo(
    () => ['All', ...Array.from(new Set(rows.map((r) => r.subject))).sort()],
    [rows]
  );

  const [subject, setSubject] = useState('All');
  const [type, setType] = useState('All');
  const [q, setQ] = useState('');

  const filtered = rows.filter(
    (r) =>
      (subject === 'All' || r.subject === subject) &&
      (type === 'All' || r.type === type) &&
      (q === '' || r.name.toLowerCase().includes(q.toLowerCase()))
  );

  // Type stats
  const typeCounts = useMemo(() => {
    const map: Record<string, number> = { Book: 0, PDF: 0, Video: 0, Website: 0 };
    rows.forEach((r) => {
      if (map[r.type] !== undefined) map[r.type]++;
    });
    return map;
  }, [rows]);

  const selClass =
    'border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-brand-navy bg-white outline-none focus:border-brand-azure transition-all shadow-xs';

  return (
    <div className="mt-6 space-y-6">
      {/* Stats Breakdown Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-lg sm:text-2xl font-extrabold text-amber-900">{typeCounts.Book}</div>
          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-600" /> Standard Books
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-lg sm:text-2xl font-extrabold text-red-800">{typeCounts.PDF}</div>
          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <FileText className="w-3.5 h-3.5 text-red-600" /> Guides &amp; PDFs
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-lg sm:text-2xl font-extrabold text-brand-azure">{typeCounts.Video}</div>
          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <Video className="w-3.5 h-3.5 text-brand-azure" /> Video Courses
          </div>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 text-center shadow-xs">
          <div className="text-lg sm:text-2xl font-extrabold text-emerald-800">{typeCounts.Website}</div>
          <div className="text-[11px] font-semibold text-slate-500 flex items-center justify-center gap-1">
            <Globe className="w-3.5 h-3.5 text-emerald-600" /> Web Portals
          </div>
        </div>
      </div>

      {/* Interactive Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-4 h-4 text-brand-azure hidden sm:block" />
            <select className={selClass} value={subject} onChange={(e) => setSubject(e.target.value)}>
              <option value="All">All Subjects</option>
              {subjects.filter(s => s !== 'All').map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Type Dropdown */}
          <select className={selClass} value={type} onChange={(e) => setType(e.target.value)}>
            <option value="All">All Resource Types</option>
            <option value="Book">📚 Books</option>
            <option value="PDF">📄 PDFs &amp; Guides</option>
            <option value="Video">🎥 Video Courses</option>
            <option value="Website">🌐 Websites</option>
          </select>

          {/* Search Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-brand-navy placeholder:text-slate-400 focus:bg-white focus:border-brand-azure outline-none transition-all"
              placeholder="Search resource titles or authors..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 pt-1 px-1">
          <span>Showing {filtered.length} resources</span>
          {(subject !== 'All' || type !== 'All' || q !== '') && (
            <button
              onClick={() => { setSubject('All'); setType('All'); setQ(''); }}
              className="text-brand-azure hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Resource Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-500 text-sm">
          No resources found matching active filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r, idx) => (
            <ResourceLibraryCard key={r.id} r={r} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
