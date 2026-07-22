'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/brand/Logo';
import {
  Home,
  Library,
  LibraryBig,
  BookOpen,
  FileQuestion,
  GraduationCap,
  Heart,
  UserRound,
  Search,
  Menu,
  X,
  FileText,
} from 'lucide-react';
import { useSavedItems } from '@/lib/saved';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const savedItems = useSavedItems();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Library', href: '/library', icon: LibraryBig },
    { name: 'Subjects', href: '/library?tab=notes', icon: BookOpen },
    { name: 'PYQs', href: '/pyq', icon: FileQuestion },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'GATE Papers', href: '/papers', icon: GraduationCap },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-200 ${
          scrolled ? 'py-2 shadow-xs' : 'py-3.5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Brand Logo */}
            <Logo size={scrolled ? 'sm' : 'md'} showTagline={!scrolled} />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-700">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#0B2A63]/10 text-[#0B2A63] font-extrabold'
                        : 'hover:bg-slate-100 hover:text-[#0B2A63]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-[#1CA3DC]" />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Search Study Store"
              >
                <Search className="w-4 h-4 text-[#1CA3DC]" />
              </button>

              <Link
                href="/saved"
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition-colors"
                aria-label="Saved Library"
              >
                <Heart
                  className={`w-4 h-4 ${
                    savedItems.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-600'
                  }`}
                />
                {savedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {savedItems.length}
                  </span>
                )}
              </Link>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/papers"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0B2A63] text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-200"
                >
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  <span>Download Syllabus</span>
                </Link>

                <Link
                  href="/library"
                  className="px-4 py-2 rounded-xl bg-[#0B2A63] hover:bg-[#06193E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
                >
                  <LibraryBig className="w-3.5 h-3.5 text-[#1CA3DC]" />
                  <span>Explore Free Library</span>
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#0B2A63]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sliding Navigation Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Sliding Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Sheet Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100">
                  <Logo size="sm" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Staggered Navigation Links */}
                <nav className="py-6 space-y-1">
                  {navLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                            isActive(link.href)
                              ? 'bg-[#0B2A63] text-white shadow-xs'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon className="w-4 h-4 text-[#1CA3DC]" />
                          <span>{link.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Full Width CTAs in Mobile Drawer */}
              <div className="pt-6 border-t border-slate-100 space-y-2.5">
                <Link
                  href="/library"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-2xl bg-[#0B2A63] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
                >
                  <LibraryBig className="w-4 h-4 text-[#1CA3DC]" />
                  <span>Explore Free Library</span>
                </Link>

                <Link
                  href="/papers"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 rounded-2xl bg-slate-100 text-[#0B2A63] text-xs font-bold flex items-center justify-center gap-2 border border-slate-200"
                >
                  <FileText className="w-4 h-4 text-red-500" />
                  <span>GATE 2027 Syllabus</span>
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
