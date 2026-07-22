'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, BookOpen, FileQuestion, GraduationCap, FileText, ArrowRight } from 'lucide-react';
import { MOCK_SUBJECTS_LIST, MOCK_PYQS_LIST, MOCK_RESOURCES_LIST, MOCK_PAPERS_LIST } from '@/lib/search-data';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedSubjects = q
    ? MOCK_SUBJECTS_LIST.filter((s) => s.name.toLowerCase().includes(q) || s.code?.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const matchedPyqs = q
    ? MOCK_PYQS_LIST.filter((p) => p.question.toLowerCase().includes(q) || p.subject.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchedResources = q
    ? MOCK_RESOURCES_LIST.filter((r) => r.name.toLowerCase().includes(q) || r.subject.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const matchedPapers = q
    ? MOCK_PAPERS_LIST.filter((p) => p.paper.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)).slice(0, 3)
    : [];

  const hasResults = matchedSubjects.length > 0 || matchedPyqs.length > 0 || matchedResources.length > 0 || matchedPapers.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-3 bg-slate-50/50">
          <Search className="w-5 h-5 text-[#1CA3DC] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes, subjects, PYQs, resources, GATE papers..."
            className="w-full bg-transparent text-slate-800 text-sm font-medium placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {q === '' ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Type to search across <strong className="text-[#0B2A63]">26 Subjects</strong>, <strong className="text-[#0B2A63]">340+ PYQs</strong>, and <strong className="text-[#0B2A63]">29 GATE Papers</strong>
            </div>
          ) : !hasResults ? (
            <div className="text-center py-10">
              <p className="text-sm font-semibold text-slate-600">No matching items found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for &quot;Biochemistry&quot;, &quot;BT&quot;, or &quot;2024&quot;</p>
            </div>
          ) : (
            <>
              {matchedSubjects.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#1CA3DC]" /> Subjects ({matchedSubjects.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedSubjects.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/subject/${s.slug}`}
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-[#0B2A63]"
                      >
                        <span className="flex items-center gap-2">
                          <span>{s.icon}</span>
                          <span>{s.name}</span>
                        </span>
                        <span className="text-[10px] font-mono bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">{s.code}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedPyqs.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <FileQuestion className="w-3.5 h-3.5 text-amber-500" /> Solved PYQs ({matchedPyqs.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedPyqs.map((p) => (
                      <Link
                        key={p.id}
                        href={`/pyq`}
                        onClick={onClose}
                        className="block p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs text-slate-700"
                      >
                        <div className="font-medium text-slate-800 line-clamp-1">{p.question}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{p.subject} • GATE {p.year}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedPapers.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#0B2A63]" /> GATE Papers ({matchedPapers.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedPapers.map((p) => (
                      <Link
                        key={p.code}
                        href="/papers"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-800"
                      >
                        <span>{p.paper}</span>
                        <span className="text-[10px] font-extrabold bg-[#0B2A63] text-white px-2 py-0.5 rounded-md">{p.code}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {matchedResources.length > 0 && (
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-500" /> Curated Resources ({matchedResources.length})
                  </h4>
                  <div className="space-y-1">
                    {matchedResources.map((r) => (
                      <a
                        key={r.id}
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onClose}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs text-slate-800 font-medium"
                      >
                        <span className="truncate max-w-[80%]">{r.name}</span>
                        <span className="text-[10px] font-semibold text-[#1CA3DC] flex items-center gap-0.5">
                          Open <ArrowRight className="w-3 h-3" />
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
