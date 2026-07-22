'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Logo from './Logo';
import { Category, Subject } from '@/lib/types';
import { Menu, FileText } from 'lucide-react';
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
    <div className="min-h-screen bg-brand-bg text-slate-800 flex flex-col">
      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-brand-navy/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Persistent Sleek Sidebar */}
      <Sidebar
        categories={categories}
        subjects={subjects}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 md:pl-64 flex flex-col min-w-0">
        {/* Mobile Header Bar */}
        <header className="md:hidden sticky top-0 z-20 bg-white border-b border-brand-border px-4 h-14 flex items-center justify-between shadow-xs">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 text-brand-navy hover:bg-slate-100 rounded-xl"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-brand-navy" />
          </button>

          <Logo onClick={() => setMobileOpen(false)} />

          <Link
            href="/downloads"
            className="text-xs font-bold text-brand-azure hover:underline flex items-center gap-1"
          >
            <FileText className="w-4 h-4" /> Files
          </Link>
        </header>

        {/* Main Content Container */}
        <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 md:py-10">
          {children}
        </main>

        {/* Global Ed-Tech Footer */}
        <Footer />
      </div>
    </div>
  );
}
