'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '@/components/brand/Logo';
import {
  Home,
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
  Shield,
  KeyRound,
  LogOut,
} from 'lucide-react';
import { useSavedItems } from '@/lib/saved';
import { useAuth } from '@/lib/auth-context';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';
import AuthModal from '@/components/auth/AuthModal';

export default function Navbar() {
  const pathname = usePathname();
  const savedItems = useSavedItems();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
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
    { name: 'Profile', href: '/profile', icon: UserRound },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 transition-all duration-200 ${
          scrolled ? 'py-2 shadow-xl' : 'py-3.5'
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3">
            {/* Left: Brand Logo */}
            <Logo size={scrolled ? 'sm' : 'md'} showTagline={!scrolled} />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-xs font-bold text-slate-300">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
                      active
                        ? 'bg-[#1CA3DC] text-slate-950 font-extrabold shadow-md shadow-cyan-500/20'
                        : 'hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${active ? 'text-slate-950' : 'text-[#1CA3DC]'}`} />
                    <span>{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
                aria-label="Search Study Store"
              >
                <Search className="w-4 h-4 text-[#1CA3DC]" />
              </button>

              <Link
                href="/saved"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-900 relative transition-colors"
                aria-label="Saved Library"
              >
                <Heart
                  className={`w-4 h-4 ${
                    savedItems.length > 0 ? 'text-rose-500 fill-rose-500' : 'text-slate-400'
                  }`}
                />
                {savedItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {savedItems.length}
                  </span>
                )}
              </Link>

              {/* Student Profile Link */}
              <Link
                href="/profile"
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-2 transition-all shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#1CA3DC] text-slate-950 text-[10px] font-black flex items-center justify-center">
                  {user?.email ? user.email.charAt(0).toUpperCase() : 'G'}
                </div>
                <span className="hidden sm:inline text-cyan-300">My Setup</span>
              </Link>

              {/* Desktop CTAs */}
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  href="/papers"
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors border border-slate-800"
                >
                  <FileText className="w-3.5 h-3.5 text-red-500" />
                  <span>GATE Syllabus</span>
                </Link>

                <Link
                  href="/library"
                  className="px-4 py-2 rounded-xl bg-[#1CA3DC] hover:bg-cyan-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
                >
                  <LibraryBig className="w-3.5 h-3.5 text-slate-950" />
                  <span>Explore Library</span>
                </Link>
              </div>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-slate-900"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-5 h-5 text-[#1CA3DC]" />
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
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            />

            {/* Sliding Sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-xs bg-slate-900 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-slate-800"
            >
              <div>
                {/* Sheet Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <Logo size="sm" />
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
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
                              ? 'bg-[#1CA3DC] text-slate-950 shadow-md'
                              : 'text-slate-300 hover:bg-slate-800'
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
              <div className="pt-6 border-t border-slate-800 space-y-2.5">
                {user ? (
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                      <div className="truncate">
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Signed in as</div>
                        <div className="font-bold text-cyan-300 truncate">{user.email}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        signOut();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-bold flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthModalOpen(true);
                    }}
                    className="w-full py-3 rounded-2xl bg-[#1CA3DC] text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Student Login</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Search Modal */}
      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Supabase Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
}
