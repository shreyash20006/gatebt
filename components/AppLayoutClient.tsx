'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import { Category, Subject } from '@/lib/types';
import { Menu, BookOpen } from 'lucide-react';
import Link from 'next/link';

interface AppLayoutClientProps {
  categories: Category[];
  subjects: Subject[];
  children: React.ReactNode;
}

export default function AppLayoutClient({
  categories,
  subjects,
  children,
}: AppLayoutClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-notion-text flex">
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Persistent Left Sidebar */}
      <Sidebar
        categories={categories}
        subjects={subjects}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-notion-divider px-4 h-12 flex items-center justify-between">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 text-notion-text hover:bg-notion-hover rounded-md"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5 text-notion-text" />
          </button>

          <Link href="/" className="flex items-center gap-1.5 text-sm font-semibold text-notion-text">
            <span>🧬</span> GateBT Prep
          </Link>

          <Link
            href="/downloads"
            className="text-xs font-medium text-notion-blue hover:underline"
          >
            Downloads
          </Link>
        </header>

        {/* Notion-style Document Content Container (max-width ~820px) */}
        <main className="flex-1 w-full max-w-[820px] mx-auto px-4 sm:px-8 py-8 md:py-12">
          {children}
        </main>

        {/* Minimal Footer */}
        <footer className="w-full max-w-[820px] mx-auto px-4 sm:px-8 py-6 border-t border-notion-divider text-xs text-notion-muted flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {new Date().getFullYear()} GateBT Prep — Open Access Study Notes Hub</p>
          <div className="flex items-center gap-4">
            <Link href="/downloads" className="hover:text-notion-text hover:underline">
              All Files
            </Link>
            <span>•</span>
            <span className="text-emerald-600 font-medium">Direct Downloads Active</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
