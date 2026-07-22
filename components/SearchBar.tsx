'use client';

import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Filter subjects by name or subject code (e.g. Biochemistry, BP202T)...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-notion-muted absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-8 py-2 bg-white text-notion-text placeholder:text-notion-muted border border-notion-divider rounded-md text-sm focus:outline-none focus:border-notion-blue focus:ring-1 focus:ring-notion-blue transition-colors"
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute right-2.5 p-0.5 text-notion-muted hover:text-notion-text rounded-sm"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
