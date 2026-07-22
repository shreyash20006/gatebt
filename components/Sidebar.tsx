'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Category, Subject } from '@/lib/types';
import Logo from './Logo';
import {
  ChevronDown,
  ChevronRight,
  Home,
  FileText,
  Search,
  X,
  HelpCircle,
  BookOpen,
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
      className={`fixed top-0 left-0 bottom-0 z-40 w-64 bg-white border-r border-brand-border flex flex-col transition-transform duration-200 ease-in-out shadow-sm ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Top Header / Logo */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-brand-border bg-slate-50/50">
        <Logo onClick={onMobileClose} showTagline />

        {/* Mobile close button */}
        <button
          onClick={onMobileClose}
          className="md:hidden p-1.5 text-slate-500 hover:text-brand-navy rounded-lg hover:bg-slate-100"
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sidebar Quick Search */}
      <div className="p-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={sidebarSearch}
            onChange={e => setSidebarSearch(e.target.value)}
            placeholder="Search subjects..."
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-brand-navy placeholder:text-slate-400 focus:outline-none focus:border-brand-azure focus:bg-white transition-all font-medium"
          />
        </div>
      </div>

      {/* Navigation Tree */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 text-xs no-scrollbar">
        <Link
          href="/"
          onClick={onMobileClose}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
            isNavActive('/')
              ? 'bg-brand-azure/10 text-brand-navy border border-brand-azure/30 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
          }`}
        >
          <Home className={`w-4 h-4 ${isNavActive('/') ? 'text-brand-azure' : 'text-slate-400'}`} />
          <span>Home</span>
        </Link>

        <Link
          href="/downloads"
          onClick={onMobileClose}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
            isNavActive('/downloads')
              ? 'bg-brand-azure/10 text-brand-navy border border-brand-azure/30 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
          }`}
        >
          <FileText className={`w-4 h-4 ${isNavActive('/downloads') ? 'text-brand-azure' : 'text-slate-400'}`} />
          <span>All Downloads</span>
        </Link>

        <Link
          href="/pyq"
          onClick={onMobileClose}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
            isNavActive('/pyq')
              ? 'bg-brand-azure/10 text-brand-navy border border-brand-azure/30 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
          }`}
        >
          <HelpCircle className={`w-4 h-4 ${isNavActive('/pyq') ? 'text-brand-azure' : 'text-slate-400'}`} />
          <span>PYQs (2019-2024)</span>
        </Link>

        <Link
          href="/resources"
          onClick={onMobileClose}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl font-semibold transition-all ${
            isNavActive('/resources')
              ? 'bg-brand-azure/10 text-brand-navy border border-brand-azure/30 shadow-xs'
              : 'text-slate-600 hover:bg-slate-50 hover:text-brand-navy'
          }`}
        >
          <BookOpen className={`w-4 h-4 ${isNavActive('/resources') ? 'text-brand-azure' : 'text-slate-400'}`} />
          <span>Resource Library</span>
        </Link>

        <div className="pt-3 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Categories & Subjects
        </div>

        {/* Categories Accordion */}
        {categories.map(category => {
          const isExpanded = Boolean(expandedCategories[category.slug]);
          const catSubjects = filteredSubjects(category.id);
          const isCategoryActive = pathname === `/category/${category.slug}`;

          return (
            <div key={category.id} className="space-y-0.5">
              <div className="group flex items-center justify-between">
                <Link
                  href={`/category/${category.slug}`}
                  onClick={onMobileClose}
                  className={`flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-xl font-bold transition-all truncate ${
                    isCategoryActive
                      ? 'bg-brand-azure/10 text-brand-navy'
                      : 'text-brand-navy hover:bg-slate-50'
                  }`}
                >
                  <span className="text-base shrink-0">{category.icon}</span>
                  <span className="truncate text-xs">{category.name}</span>
                </Link>

                <button
                  onClick={() => toggleCategory(category.slug)}
                  className="p-1 text-slate-400 hover:text-brand-navy hover:bg-slate-100 rounded-lg shrink-0 ml-1"
                  aria-label={`Toggle ${category.name}`}
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              </div>

              {isExpanded && (
                <div className="pl-3.5 border-l-2 border-slate-100 ml-3 space-y-0.5 py-1">
                  {catSubjects.map(subject => {
                    const isSubjectActive = pathname === `/subject/${subject.slug}`;
                    return (
                      <Link
                        key={subject.id}
                        href={`/subject/${subject.slug}`}
                        onClick={onMobileClose}
                        className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] transition-all ${
                          isSubjectActive
                            ? 'bg-brand-azure text-white font-bold shadow-xs'
                            : 'text-slate-600 hover:text-brand-navy hover:bg-slate-50 font-medium'
                        }`}
                      >
                        <span className="truncate flex items-center gap-1.5">
                          <span className="text-xs">{subject.icon}</span>
                          <span className="truncate">{subject.name}</span>
                        </span>
                        {subject.subject_code && (
                          <span className={`text-[10px] font-mono shrink-0 ml-1 ${
                            isSubjectActive ? 'text-white/80' : 'text-slate-400'
                          }`}>
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

      {/* Sidebar Footer Badge */}
      <div className="p-3 border-t border-brand-border bg-slate-50 text-[11px] text-slate-500 flex items-center justify-between">
        <span className="font-semibold text-brand-navy">@gatebt_prep</span>
        <span className="px-2 py-0.5 rounded-md bg-brand-gold-light text-amber-800 text-[10px] font-bold">
          IIT Prep 🚀
        </span>
      </div>
    </aside>
  );
}
