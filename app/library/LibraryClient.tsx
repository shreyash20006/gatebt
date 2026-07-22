'use client';

import React, { useState, useMemo } from 'react';
import StoreCard from '@/components/store/StoreCard';
import StoreGrid from '@/components/store/StoreGrid';
import { Category, Subject, Pyq, Resource, PaperPlan } from '@/lib/types';
import { Search, SlidersHorizontal, X, Sparkles, Filter } from 'lucide-react';

interface LibraryClientProps {
  categories: Category[];
  subjects: Subject[];
  pyqs: Pyq[];
  resources: Resource[];
  papers: PaperPlan[];
}

export default function LibraryClient({
  categories,
  subjects,
  pyqs,
  resources,
  papers,
}: LibraryClientProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'notes' | 'mindmaps' | 'pyqs' | 'resources' | 'papers'>('all');
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Combine data items into unified store cards
  const allStoreItems = useMemo(() => {
    const items: Array<{
      id: string;
      title: string;
      description?: string | null;
      category: string;
      resourceType: 'note' | 'mindmap' | 'pyq' | 'resource' | 'paper';
      icon?: string;
      href: string;
      downloadUrl?: string | null;
      externalUrl?: string | null;
      rating?: number | null;
      downloadCount?: number;
      badges?: string[];
      code?: string;
      priority?: string;
    }> = [];

    // 1. Subject Notes & Mind Maps
    subjects.forEach((s) => {
      items.push({
        id: `note-${s.id}`,
        title: `${s.name} — Complete Study Notes`,
        description: s.description || undefined,
        category: s.category?.name || 'GATE Biotechnology',
        resourceType: 'note',
        icon: s.icon || undefined,
        href: `/subject/${s.slug}`,
        downloadUrl: s.pdf_path || undefined,
        code: s.subject_code || undefined,
        badges: s.gate_weightage ? [`Weightage: ${s.gate_weightage}`] : [],
        priority: s.slug === 'biochemistry' || s.slug === 'bioprocess-engineering' ? 'Primary' : undefined,
      });

      if (s.mindmap_path) {
        items.push({
          id: `mindmap-${s.id}`,
          title: `${s.name} — Revision Mind Map`,
          description: `Visual mind map and quick summary formula sheet for ${s.name}.`,
          category: s.category?.name || 'GATE Biotechnology',
          resourceType: 'mindmap',
          icon: '🧠',
          href: `/subject/${s.slug}`,
          downloadUrl: s.mindmap_path,
          code: s.subject_code || undefined,
        });
      }
    });

    // 2. PYQs
    pyqs.forEach((p) => {
      items.push({
        id: `pyq-${p.id}`,
        title: `GATE ${p.year} (${p.subject}): ${p.question}`,
        description: `Solved Question with Answer Key (${p.marks} Mark${p.marks > 1 ? 's' : ''}, Difficulty: ${p.difficulty})`,
        category: 'Previous Year Questions',
        resourceType: 'pyq',
        icon: '📝',
        href: `/pyq`,
        badges: [`Year: ${p.year}`, `Difficulty: ${p.difficulty}`],
      });
    });

    // 3. Resources
    resources.forEach((r) => {
      const subjectName = typeof r.subject === 'object' ? r.subject.name : (r.subject || 'Biotechnology');
      items.push({
        id: `res-${r.id}`,
        title: r.title || r.name || 'Resource',
        description: `Subject Resource for ${subjectName}`,
        category: 'Resource Library',
        resourceType: 'resource',
        icon: '📚',
        href: `/resources`,
        downloadUrl: r.type === 'notes_pdf' ? r.file_path : undefined,
        externalUrl: r.type !== 'notes_pdf' ? r.file_path : undefined,
        downloadCount: r.download_count,
        badges: [r.type],
      });
    });

    // 4. GATE Papers
    papers.forEach((p) => {
      items.push({
        id: `paper-${p.id}`,
        title: `GATE ${p.paper} (${p.code}) — Syllabus & Resources`,
        description: p.notes || `Official Syllabus PDF and study playlists for GATE ${p.paper}`,
        category: p.category,
        resourceType: 'paper',
        icon: '🎓',
        href: `/papers`,
        downloadUrl: p.syllabus_pdf,
        externalUrl: p.youtube,
        code: p.code,
        priority: p.priority,
      });
    });

    return items;
  }, [subjects, pyqs, resources, papers]);

  // Filter items
  const filteredItems = useMemo(() => {
    return allStoreItems.filter((item) => {
      // Tab filter
      if (activeTab === 'notes' && item.resourceType !== 'note') return false;
      if (activeTab === 'mindmaps' && item.resourceType !== 'mindmap') return false;
      if (activeTab === 'pyqs' && item.resourceType !== 'pyq') return false;
      if (activeTab === 'resources' && item.resourceType !== 'resource') return false;
      if (activeTab === 'papers' && item.resourceType !== 'paper') return false;

      // Category filter
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;

      // Query search
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q) || false;
        const matchCode = item.code?.toLowerCase().includes(q) || false;
        if (!matchTitle && !matchDesc && !matchCode) return false;
      }

      return true;
    });
  }, [allStoreItems, activeTab, selectedCategory, query]);

  const clearFilters = () => {
    setActiveTab('all');
    setQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-200">
        {[
          { id: 'all', label: 'All Items', emoji: '🛍️' },
          { id: 'notes', label: 'Notes PDFs', emoji: '📄' },
          { id: 'mindmaps', label: 'Mind Maps', emoji: '🧠' },
          { id: 'pyqs', label: 'Solved PYQs', emoji: '📝' },
          { id: 'resources', label: 'Resources', emoji: '📚' },
          { id: 'papers', label: 'GATE Papers', emoji: '🎓' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === tab.id
                ? 'bg-[#0B2A63] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{tab.emoji}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search library notes, PYQs, GATE codes (e.g. BT)..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#1CA3DC] shadow-2xs"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="hidden md:block px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-medium focus:outline-none focus:border-[#1CA3DC]"
        >
          <option value="All">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setFilterDrawerOpen(true)}
          className="md:hidden px-3.5 py-2.5 bg-white border border-slate-200 rounded-2xl text-xs font-bold text-slate-700 flex items-center gap-1.5 shadow-2xs"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#1CA3DC]" /> Filters
        </button>
      </div>

      {/* Status Strip & Result Count */}
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing <strong className="text-[#0B2A63] font-bold">{filteredItems.length}</strong> of {allStoreItems.length} items
        </span>

        {(activeTab !== 'all' || selectedCategory !== 'All' || query !== '') && (
          <button onClick={clearFilters} className="font-bold text-[#1CA3DC] hover:underline flex items-center gap-1">
            <X className="w-3.5 h-3.5" /> Clear Filters
          </button>
        )}
      </div>

      {/* Product Catalogue Grid */}
      {filteredItems.length > 0 ? (
        <StoreGrid columns={4}>
          {filteredItems.map((item) => (
            <StoreCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              category={item.category}
              resourceType={item.resourceType}
              icon={item.icon}
              href={item.href}
              downloadUrl={item.downloadUrl}
              externalUrl={item.externalUrl}
              badges={item.badges}
              code={item.code}
              priority={item.priority}
            />
          ))}
        </StoreGrid>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
          <p className="text-base font-bold text-slate-700">No items match your selected filters</p>
          <p className="text-xs text-slate-400">Try clearing your search text or switching category tabs.</p>
          <button
            onClick={clearFilters}
            className="mt-3 px-5 py-2 rounded-xl bg-[#0B2A63] text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Mobile Bottom Filter Sheet Drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end md:hidden animate-in fade-in duration-200">
          <div className="bg-white rounded-t-3xl p-6 space-y-5 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#0B2A63] text-base flex items-center gap-2">
                <Filter className="w-4 h-4 text-[#1CA3DC]" /> Store Filters
              </h3>
              <button onClick={() => setFilterDrawerOpen(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="w-full py-3 rounded-2xl bg-[#0B2A63] text-white text-xs font-bold"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
