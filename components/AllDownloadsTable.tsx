'use client';

import { useState } from 'react';
import { Resource } from '@/lib/types';
import DirectDownloadButton from './DirectDownloadButton';
import { Search, Star, Filter } from 'lucide-react';
import Link from 'next/link';

interface AllDownloadsTableProps {
  resources: Resource[];
}

export default function AllDownloadsTable({ resources }: AllDownloadsTableProps) {
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredResources = resources.filter(res => {
    const query = search.toLowerCase();
    const titleMatch = res.title.toLowerCase().includes(query);
    const subjectMatch = res.subject ? res.subject.name.toLowerCase().includes(query) : false;
    const codeMatch = res.subject?.subject_code ? res.subject.subject_code.toLowerCase().includes(query) : false;

    if (!titleMatch && !subjectMatch && !codeMatch) return false;
    if (selectedType !== 'all' && res.type !== selectedType) return false;
    if (selectedCategory !== 'all' && res.subject?.category?.slug !== selectedCategory) return false;

    return true;
  });

  return (
    <div className="space-y-4">
      {/* Notion Filter Controls Bar */}
      <div className="bg-white border border-notion-divider rounded-md p-3.5 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-notion-muted absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources, titles, subject codes..."
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-notion-divider rounded-md text-xs text-notion-text placeholder:text-notion-muted focus:outline-none focus:border-notion-blue"
            />
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-notion-muted hidden sm:block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              aria-label="Filter by Category"
              className="py-1.5 px-2 bg-white border border-notion-divider rounded-md text-xs text-notion-text focus:outline-none focus:border-notion-blue font-medium"
            >
              <option value="all">All Categories</option>
              <option value="gate-biotechnology">🧬 GATE Biotechnology</option>
              <option value="b-pharmacy-dbatu">🎓 B.Pharmacy DBATU</option>
            </select>
          </div>
        </div>

        {/* Type Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-notion-divider text-xs">
          {[
            { id: 'all', label: 'All Files' },
            { id: 'notes_pdf', label: 'Handwritten Notes' },
            { id: 'question_bank', label: 'Question Banks' },
            { id: 'mind_map', label: 'Mind Maps' },
            { id: 'paper', label: 'GATE Papers' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedType(tab.id)}
              className={`px-2.5 py-1 rounded text-xs transition-colors ${
                selectedType === tab.id
                  ? 'bg-notion-text text-white font-medium'
                  : 'bg-notion-hover text-notion-muted hover:text-notion-text'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="flex justify-between items-center text-xs text-notion-muted px-1">
        <span>Showing {filteredResources.length} files</span>
        {(search || selectedType !== 'all' || selectedCategory !== 'all') && (
          <button
            onClick={() => { setSearch(''); setSelectedType('all'); setSelectedCategory('all'); }}
            className="text-notion-blue hover:underline font-medium"
          >
            Reset filters
          </button>
        )}
      </div>

      {/* Notion Database Table View */}
      <div className="border border-notion-divider rounded-md bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-notion-hover/70 border-b border-notion-divider text-[11px] font-semibold uppercase tracking-wider text-notion-muted">
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3 hidden md:table-cell">Type</th>
                <th className="py-2.5 px-3 hidden sm:table-cell">Size</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-notion-divider text-xs">
              {filteredResources.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-notion-muted">
                    No resources match your active filters.
                  </td>
                </tr>
              ) : (
                filteredResources.map((res) => (
                  <tr key={res.id} className="hover:bg-notion-hover/50 transition-colors">
                    <td className="py-2.5 px-3 font-medium text-notion-text">
                      <div className="flex items-center gap-1.5">
                        {res.is_featured && (
                          <span title="Featured Note">
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          </span>
                        )}
                        <span className="line-clamp-1">{res.title}</span>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-notion-muted">
                      {res.subject ? (
                        <Link href={`/subject/${res.subject.slug}`} className="hover:text-notion-blue font-medium text-notion-text">
                          {res.subject.name}
                        </Link>
                      ) : (
                        'General'
                      )}
                    </td>
                    <td className="py-2.5 px-3 hidden md:table-cell text-notion-muted">
                      <span className="px-1.5 py-0.5 rounded bg-notion-tag text-[10px] border border-notion-divider font-mono">
                        {res.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-mono text-notion-muted hidden sm:table-cell">
                      {res.file_size || '—'}
                    </td>
                    <td className="py-2.5 px-3 text-right">
                      <DirectDownloadButton
                        resourceId={res.id}
                        filePath={res.file_path}
                        title={res.title}
                        compact
                        label="Download"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
