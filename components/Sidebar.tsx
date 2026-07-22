'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category, Subject } from '@/lib/types';
import {
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Search,
  Menu,
  X,
  BookOpen,
  Folder,
} from 'lucide-react';

interface SidebarProps {
  categories: Category[];
  subjects: Subject[];
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  categories,
  subjects,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  // Expanded categories state in sidebar (default both expanded)
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'gate-biotechnology': true,
    'b-pharmacy-dbatu': true,
  });

  const [sidebarSearch, setSidebarSearch] = useState('');

  const toggleCategory = (slug: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [slug]: !prev[slug],
    }));
  };

  const isNavActive = (path: string) => pathname === path;

  // Filter subjects for search inside sidebar
  const filteredSubjects = (catId: string) => {
    const list = subjects.filter(s => s.category_id === catId);
    if (!sidebarSearch.trim()) return list;
    const q = sidebarSearch.toLowerCase();
    return list.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        (s.subject_code && s.subject_code.toLowerCase().includes(q))
    );
  };

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-notion-sidebar border-r border-notion-divider flex flex-col transition-transform duration-200 ease-in-out ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Top Header / Workspace Title */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-notion-divider/60">
        <Link
          href="/"
          onClick={onMobileClose}
          className="flex items-center gap-2 text-sm font-semibold text-notion-text hover:bg-notion-hover px-2 py-1 rounded-md transition-colors"
        >
          <span className="text-base">🧬</span>
          <span className="font-semibold tracking-tight">GateBT Prep</span>
        </Link>

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="md:hidden p-1 text-notion-muted hover:text-notion-text rounded-md"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Quick Filter Search */}
      <div className="p-3 pb-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-notion-muted absolute left-2.5 top-2.5" />
          <input
            type="text"
            value={sidebarSearch}
            onChange={e => setSidebarSearch(e.target.value)}
            placeholder="Quick search subjects..."
            className="w-full pl-8 pr-2.5 py-1.5 bg-white border border-notion-divider rounded-md text-xs text-notion-text placeholder:text-notion-muted focus:outline-none focus:border-notion-blue"
          />
        </div>
      </div>

      {/* Scrollable Navigation Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 text-xs notion-scrollbar">
        {/* Main Nav Items */}
        <Link
          href="/"
          onClick={onMobileClose}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
            isNavActive('/')
              ? 'bg-notion-active text-notion-blue font-semibold'
              : 'text-notion-text hover:bg-notion-hover'
          }`}
        >
          <Home className="w-4 h-4 text-notion-muted shrink-0" />
          <span>Home</span>
        </Link>

        <Link
          href="/downloads"
          onClick={onMobileClose}
          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md font-medium transition-colors ${
            isNavActive('/downloads')
              ? 'bg-notion-active text-notion-blue font-semibold'
              : 'text-notion-text hover:bg-notion-hover'
          }`}
        >
          <FileText className="w-4 h-4 text-notion-muted shrink-0" />
          <span>All Downloads</span>
        </Link>

        <div className="pt-3 pb-1 px-2.5 text-[11px] font-semibold uppercase tracking-wider text-notion-muted">
          Categories & Subjects
        </div>

        {/* Dynamic Categories & Subjects Accordion Tree */}
        {categories.map(category => {
          const isExpanded = Boolean(expandedCategories[category.slug]);
          const catSubjects = filteredSubjects(category.id);
          const isCategoryActive = pathname === `/category/${category.slug}`;

          return (
            <div key={category.id} className="space-y-0.5">
              {/* Category Parent Item */}
              <div className="group flex items-center justify-between">
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onMobileClose}
                  className={`flex-1 flex items-center gap-1.5 px-2 py-1.5 rounded-md font-semibold transition-colors truncate ${
                    isCategoryActive
                      ? 'bg-notion-active text-notion-blue'
                      : 'text-notion-text hover:bg-notion-hover'
                  }`}
                >
                  <span className="text-sm shrink-0">{category.icon}</span>
                  <span className="truncate">{category.name}</span>
                </Link>

                <button
                  onClick={() => toggleCategory(category.slug)}
                  className="p-1 text-notion-muted hover:text-notion-text hover:bg-notion-hover rounded-md shrink-0 ml-1"
                  aria-label={`Toggle ${category.name}`}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              {/* Sub-list of Subjects */}
              {isExpanded && (
                <div className="pl-4 border-l border-notion-divider/70 ml-3.5 space-y-0.5">
                  {catSubjects.map(subject => {
                    const isSubjectActive = pathname === `/subject/${subject.slug}`;
                    return (
                      <Link
                        key={subject.id}
                        href={`/subject/${subject.slug}`}
                        onClick={onMobileClose}
                        className={`flex items-center justify-between px-2 py-1 rounded-md text-[12.5px] transition-colors ${
                          isSubjectActive
                            ? 'bg-notion-active text-notion-blue font-semibold'
                            : 'text-notion-muted hover:text-notion-text hover:bg-notion-hover'
                        }`}
                      >
                        <span className="truncate flex items-center gap-1.5">
                          <span className="text-xs">{subject.icon}</span>
                          <span className="truncate">{subject.name}</span>
                        </span>
                        {subject.subject_code && (
                          <span className="text-[10px] font-mono text-notion-muted opacity-80 shrink-0 ml-1">
                            {subject.subject_code}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-3 border-t border-notion-divider/80 text-[11px] text-notion-muted flex items-center justify-between">
        <span>GateBT Prep v1.0</span>
        <span className="px-1.5 py-0.5 rounded bg-notion-tag text-notion-text">Direct Download</span>
      </div>
    </aside>
  );
}
