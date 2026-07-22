'use client';

import { useMemo, useState } from 'react';
import {
  FileText,
  Youtube,
  FolderOpen,
  Search,
  BarChart2,
  GraduationCap,
  BadgeCheck,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import AnimatedDownloadButton from '@/components/AnimatedDownloadButton';
import { PaperPlan } from '@/lib/types';

const prio: Record<string, string> = {
  Primary: 'bg-red-100 text-red-700 font-extrabold border border-red-200',
  Secondary: 'bg-[#F6B10A]/20 text-[#9a6e00] font-extrabold border border-[#F6B10A]/30',
  Reference: 'bg-slate-100 text-slate-600 font-semibold',
};

function Card({ p }: { p: PaperPlan }) {
  const isBT = p.code === 'BT';

  return (
    <div
      className={`bg-white rounded-3xl shadow-xs hover:shadow-store-hover transition-all duration-200 p-5 flex flex-col justify-between relative overflow-hidden ${
        isBT
          ? 'border-2 border-[#F6B10A] ring-4 ring-[#F6B10A]/20 bg-gradient-to-b from-amber-50/40 via-white to-white'
          : 'border border-slate-200/80 hover:border-[#1CA3DC]/40'
      }`}
    >
      {isBT && (
        <div className="absolute top-0 right-0 bg-[#F6B10A] text-[#0B2A63] font-black text-[10px] uppercase px-3 py-1 rounded-bl-2xl shadow-xs flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> Primary BT Target Paper
        </div>
      )}

      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-[#0B2A63] text-white tracking-wider shadow-2xs">
              {p.code}
            </span>
            <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
              <BadgeCheck className="w-3 h-3 text-emerald-600" /> Revised 2027
            </span>
          </div>
          <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${prio[p.priority] ?? 'bg-slate-100'}`}>
            {p.priority}
          </span>
        </div>

        <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-[#0B2A63] transition-colors flex items-center gap-1.5">
          <GraduationCap className="w-4 h-4 text-[#0B2A63] shrink-0" />
          <span>{p.paper}</span>
        </h3>

        <div className="flex flex-wrap gap-1.5 mt-2.5">
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#1CA3DC]/10 text-[#0B2A63]">
            {p.category}
          </span>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {p.target_year || 'GATE 2027'}
          </span>
        </div>

        {p.notes && <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{p.notes}</p>}

        <div className="mt-3 pt-2 text-[10px] text-slate-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3 text-emerald-500" />
          <span>Source: Official IIT Madras GATE 2027 PDF</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-5 pt-3.5 border-t border-slate-100">
        <AnimatedDownloadButton
          url={p.syllabus_pdf}
          filename={`${p.code}_GATE2027_Syllabus.pdf`}
          label="Open Official PDF"
          compact={true}
          variant={isBT ? 'secondary' : 'primary'}
        />

        <div className="flex items-center gap-1">
          <a
            href={p.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-xl transition-colors"
          >
            <Youtube size={13} /> Lectures
          </a>

          <a
            href={p.pdf_resources || 'https://gate2027.iitm.ac.in/exam_papers_and_syllabus'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1.5 rounded-xl transition-colors"
            title="Official Portal"
          >
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PaperBrowser({ rows }: { rows: PaperPlan[] }) {
  const categories = useMemo(() => ['All', ...Array.from(new Set(rows.map((r) => r.category))).sort()], [rows]);
  const [category, setCategory] = useState('All');
  const [priority, setPriority] = useState('All');
  const [q, setQ] = useState('');

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    rows.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [rows]);

  const filtered = rows.filter(
    (r) =>
      (category === 'All' || r.category === category) &&
      (priority === 'All' || r.priority === priority) &&
      (q === '' || r.paper.toLowerCase().includes(q.toLowerCase()) || r.code.toLowerCase().includes(q.toLowerCase()))
  );

  const sel =
    'border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold bg-white text-slate-700 focus:outline-none focus:border-[#1CA3DC] shadow-2xs';

  return (
    <div className="mt-6 space-y-6">
      {/* Category Stats Strip */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#1CA3DC]" />
            <span className="text-xs font-black uppercase tracking-wider text-[#0B2A63]">
              Official GATE 2027 Papers Breakdown
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Total Official Test Papers: <strong className="text-[#0B2A63] font-black text-sm ml-1">{rows.length}</strong>
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('All')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              category === 'All'
                ? 'bg-[#0B2A63] text-white shadow-xs'
                : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All 30 Papers</span>
            <span
              className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                category === 'All' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {rows.length}
            </span>
          </button>
          {Object.entries(categoryStats).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? 'All' : cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                category === cat
                  ? 'bg-[#0B2A63] text-white shadow-xs'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#1CA3DC]'
              }`}
            >
              <span>{cat}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  category === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}
              >
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        <select className={sel} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories
            .filter((c) => c !== 'All')
            .map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
        </select>

        <select className={sel} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          {['Primary', 'Secondary', 'Reference'].map((p) => (
            <option key={p} value={p}>
              {p} Priority
            </option>
          ))}
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
          <input
            className={`${sel} w-full pl-10`}
            placeholder="Search papers by code or title (e.g., BT, Life Sciences)..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Results Counter */}
      <div className="flex items-center justify-between text-xs font-medium text-slate-500">
        <span>
          Showing <strong className="text-[#0B2A63] font-bold">{filtered.length}</strong> of {rows.length} test papers
        </span>
        {(category !== 'All' || priority !== 'All' || q !== '') && (
          <button
            onClick={() => {
              setCategory('All');
              setPriority('All');
              setQ('');
            }}
            className="text-xs font-bold text-[#1CA3DC] hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Card key={r.id || r.code} p={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-6">
          <p className="text-slate-700 font-bold text-base">No GATE papers match your filter criteria</p>
          <p className="text-slate-400 text-xs mt-1">Try resetting your search query or dropdown filter selections.</p>
        </div>
      )}

      {/* Official Disclaimer */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 text-[11px] leading-relaxed flex items-start gap-2">
        <ExternalLink className="w-4 h-4 text-[#1CA3DC] shrink-0 mt-0.5" />
        <p>
          <strong>Disclaimer:</strong> GATE 2027 syllabus PDFs and official documents are sourced directly from the official IIT Madras GATE 2027 portal (
          <a
            href="https://gate2027.iitm.ac.in/exam_papers_and_syllabus"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0B2A63] underline font-bold"
          >
            https://gate2027.iitm.ac.in/
          </a>
          ). GateBT Prep provides free direct links to official documents for educational purposes and is not affiliated with IIT Madras or GATE.
        </p>
      </div>
    </div>
  );
}
