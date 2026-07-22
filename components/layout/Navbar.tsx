'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/brand/Logo';
import {
  Home,
  Library,
  BookOpen,
  FileQuestion,
  GraduationCap,
  Heart,
  UserRound,
  Search,
} from 'lucide-react';
import { useSavedItems } from '@/lib/saved';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const savedItems = useSavedItems();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 ${
          scrolled ? 'py-2 shadow-xs' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Logo size={scrolled ? 'sm' : 'md'} showTagline={!scrolled} />

            {/* Central Search Bar Input Trigger */}
            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-full flex items-center justify-between px-3.5 py-2 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl text-xs font-medium text-slate-400 transition-all shadow-2xs group"
              >
                <span className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#1CA3DC] group-hover:scale-110 transition-transform" />
                  <span>Search notes, subjects, PYQs, resources...</span>
                </span>
                <kbd className="hidden lg:inline-block px-2 py-0.5 text-[10px] font-mono bg-white border border-slate-200 text-slate-400 rounded-md">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-slate-700">
              <Link
                href="/"
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/') ? 'bg-[#1CA3DC]/10 text-[#0B2A63] font-bold' : 'hover:bg-slate-100 hover:text-[#0B2A63]'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>

              <Link
                href="/library"
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/library') ? 'bg-[#1CA3DC]/10 text-[#0B2A63] font-bold' : 'hover:bg-slate-100 hover:text-[#0B2A63]'
                }`}
              >
                <Library className="w-4 h-4 text-[#1CA3DC]" />
                <span>Library</span>
              </Link>

              <Link
                href="/pyq"
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/pyq') ? 'bg-[#1CA3DC]/10 text-[#0B2A63] font-bold' : 'hover:bg-slate-100 hover:text-[#0B2A63]'
                }`}
              >
                <FileQuestion className="w-4 h-4 text-amber-500" />
                <span>PYQs</span>
              </Link>

              <Link
                href="/resources"
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/resources') ? 'bg-[#1CA3DC]/10 text-[#0B2A63] font-bold' : 'hover:bg-slate-100 hover:text-[#0B2A63]'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>Resources</span>
              </Link>

              <Link
                href="/papers"
                className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                  isActive('/papers') ? 'bg-[#1CA3DC]/10 text-[#0B2A63] font-bold' : 'hover:bg-slate-100 hover:text-[#0B2A63]'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-[#0B2A63]" />
                <span>GATE Papers</span>
              </Link>
            </nav>

            {/* Desktop Actions: Saved & Profile */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                aria-label="Search"
              >
                <Search className="w-5 h-5 text-[#1CA3DC]" />
              </button>

              <Link
                href="/saved"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
                aria-label="Saved Items"
              >
                <Heart className={`w-5 h-5 ${savedItems.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
                {savedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in-50">
                    {savedItems.length}
                  </span>
                )}
              </Link>

              <Link
                href="/profile"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="User Profile"
              >
                <UserRound className="w-5 h-5 text-[#0B2A63]" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
