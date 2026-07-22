'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Pyq } from '@/lib/types';
import { Search, HelpCircle, CheckCircle2, Award, Filter, RefreshCw } from 'lucide-react';

const diffColor: Record<string, string> = {
  Easy: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  Medium: 'bg-brand-gold-light text-amber-900 border-amber-200 font-extrabold',
  Hard: 'bg-rose-100 text-rose-800 border-rose-200',
};

function splitOptions(opts: string) {
  return opts
    .split(/\s{2,}(?=[A-D]\))/)
    .map((s) => {
      const m = s.match(/^([A-D])\)\s*([\s\S]*)$/);
      return m ? { k: m[1], t: m[2].trim() } : null;
    })
    .filter(Boolean) as { k: string; t: string }[];
}

export function QuestionCard({ q, index = 0 }: { q: Pyq; index?: number }) {
  const [show, setShow] = useState(false);
  const opts = splitOptions(q.options);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.35, delay: (index % 5) * 0.04 }}
      className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 sm:p-6 hover:shadow-pw transition-all"
    >
      {/* Badges Row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-navy/10 text-brand-navy font-bold">
          {q.subject}
        </span>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-brand-azure/15 text-brand-azure font-bold">
          {q.year}
        </span>
        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-medium">
          {q.marks} mark{q.marks > 1 ? 's' : ''}
        </span>
        <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${diffColor[q.difficulty] ?? 'bg-slate-100'}`}>
          {q.difficulty}
        </span>
      </div>

      {/* Question Text */}
      <p className="font-bold text-slate-800 text-sm sm:text-base leading-relaxed">
        {q.question}
      </p>

      {/* Options List */}
      <ul className="mt-4 space-y-2">
        {opts.map((o) => {
          const correct = show && o.k === q.answer;
          return (
            <li
              key={o.k}
              className={`text-xs sm:text-sm px-3.5 py-2 rounded-xl border transition-all ${
                correct
                  ? 'border-brand-azure bg-brand-azure/10 font-bold text-brand-navy ring-1 ring-brand-azure/30'
                  : 'border-slate-100 hover:border-slate-200 bg-slate-50/50 text-slate-700'
              }`}
            >
              <span className={`font-extrabold mr-1.5 ${correct ? 'text-brand-azure' : 'text-slate-500'}`}>
                {o.k})
              </span>
              {o.t}
            </li>
          );
        })}
      </ul>

      {/* Show / Hide Answer Action Button */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setShow((s) => !s)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-azure hover:text-brand-azure-hover hover:underline transition-all"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{show ? `Hide Answer (Correct: ${q.answer})` : 'Show Answer'}</span>
        </button>

        {show && (
          <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Correct: Option {q.answer}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function PyqBrowser({ rows }: { rows: Pyq[] }) {
  const subjects = useMemo(
    () => ['All', ...Array.from(new Set(rows.map((r) => r.subject))).sort()],
    [rows]
  );
  const years = useMemo(
    () => ['All', ...Array.from(new Set(rows.map((r) => String(r.year)))).sort().reverse()],
    [rows]
  );

  const [subject, setSubject] = useState('All');
  const [year, setYear] = useState('All');
  const [diff, setDiff] = useState('All');
  const [q, setQ] = useState('');

  const filtered = rows.filter(
    (r) =>
      (subject === 'All' || r.subject === subject) &&
      (year === 'All' || String(r.year) === year) &&
      (diff === 'All' || r.difficulty === diff) &&
      (q === '' || r.question.toLowerCase().includes(q.toLowerCase()))
  );

  const selClass =
    'border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-brand-navy bg-white outline-none focus:border-brand-azure transition-all shadow-xs';

  return (
    <div className="mt-6 space-y-6">
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

          {/* Year Dropdown */}
          <select className={selClass} value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="All">All Years (2019–2024)</option>
            {years.filter(y => y !== 'All').map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          {/* Difficulty Dropdown */}
          <select className={selClass} value={diff} onChange={(e) => setDiff(e.target.value)}>
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Search Question Box */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-brand-navy placeholder:text-slate-400 focus:bg-white focus:border-brand-azure outline-none transition-all"
              placeholder="Search question text or keywords..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>

        {/* Counter & Reset */}
        <div className="flex justify-between items-center text-xs font-semibold text-slate-500 pt-1 px-1">
          <span>Showing {filtered.length} questions</span>
          {(subject !== 'All' || year !== 'All' || diff !== 'All' || q !== '') && (
            <button
              onClick={() => { setSubject('All'); setYear('All'); setDiff('All'); setQ(''); }}
              className="text-brand-azure hover:underline flex items-center gap-1 font-bold"
            >
              <RefreshCw className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Question Cards Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-200 rounded-2xl text-slate-500 text-sm">
          No questions found matching active filters.
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((r, idx) => (
            <QuestionCard key={r.id} q={r} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}
