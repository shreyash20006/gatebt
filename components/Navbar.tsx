'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Download, Menu, X, FileText, Sparkles, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-academic-600 to-brand-500 flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              🧬
            </div>
            <div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-academic-900 to-academic-600 bg-clip-text text-transparent">
                GateBT Prep
              </span>
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-emerald-600 -mt-1">
                Study Notes Download Hub
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/" className="hover:text-academic-600 transition-colors flex items-center gap-1">
              Home
            </Link>
            <Link href="/category/gate-biotechnology" className="hover:text-academic-600 transition-colors flex items-center gap-1">
              <span>🧬</span> GATE Biotechnology
            </Link>
            <Link href="/category/b-pharmacy-dbatu" className="hover:text-academic-600 transition-colors flex items-center gap-1">
              <span>🎓</span> B.Pharmacy DBATU
            </Link>
            <Link href="/papers" className="hover:text-academic-600 transition-colors flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-academic-500" /> GATE Papers
            </Link>
            <Link href="/downloads" className="hover:text-academic-600 transition-colors flex items-center gap-1">
              <FileText className="w-4 h-4 text-academic-500" /> All Downloads
            </Link>
          </nav>

          {/* Direct CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-academic-600 hover:bg-academic-700 rounded-xl shadow-sm hover:shadow transition-all"
            >
              <Download className="w-4 h-4" /> Direct Notes Hub
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-academic-600"
          >
            Home
          </Link>
          <Link
            href="/category/gate-biotechnology"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-academic-600"
          >
            🧬 GATE Biotechnology
          </Link>
          <Link
            href="/category/b-pharmacy-dbatu"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-academic-600"
          >
            🎓 B.Pharmacy DBATU
          </Link>
          <Link
            href="/papers"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-academic-600"
          >
            🎓 GATE Papers
          </Link>
          <Link
            href="/downloads"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-base font-medium text-gray-800 hover:text-academic-600"
          >
            📄 All Downloads
          </Link>
          <div className="pt-2">
            <Link
              href="/downloads"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-academic-600 rounded-xl"
            >
              <Download className="w-4 h-4" /> Browse All PDFs
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
