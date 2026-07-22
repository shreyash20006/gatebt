'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Library, FileQuestion, Search, Sparkles, CheckCircle2, Download, Smartphone } from 'lucide-react';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

// Dynamic import 3D DNA canvas with SSR disabled to ensure WebGL safety
const DnaCanvas = dynamic(() => import('@/components/3d/DnaCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-r from-[#0B2A63]/30 to-[#1CA3DC]/10 opacity-30 pointer-events-none" />,
});

export default function ParallaxHero() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 300], [0, -30]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <>
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0B2A63] via-[#071C44] to-[#0D3880] text-white p-6 sm:p-10 md:p-14 shadow-2xl overflow-hidden mb-8 border border-white/10">
        {/* 3D DNA Visual Background */}
        <DnaCanvas />

        {/* Hero Content */}
        <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 max-w-3xl space-y-5">
          {/* Top Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-extrabold text-[#F6B10A] shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>🆓 Free GATE Biotechnology Study Store</span>
          </div>

          {/* Logo & Headings */}
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="p-1.5 bg-white rounded-2xl shadow-md border border-white/20">
                <Image
                  src={OFFICIAL_LOGO_URL}
                  alt="GateBT Prep Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <span className="text-[#1CA3DC] font-extrabold text-lg sm:text-xl tracking-wide uppercase">
                GateBT Prep Hub
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight text-white">
              Your Notes. <span className="text-[#F6B10A] bg-clip-text">Your Success.</span>
            </h1>

            <p className="text-base sm:text-lg font-bold text-[#1CA3DC]">
              Prepare Smart. Get Into IIT.
            </p>

            <p className="text-slate-300 text-xs sm:text-base leading-relaxed max-w-2xl font-normal">
              Download handwritten notes, explore mind maps, practise previous-year questions, and discover trusted resources for GATE Biotechnology &amp; B.Pharmacy students.
            </p>
          </div>

          {/* Interactive Search Bar */}
          <div className="pt-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full max-w-xl flex items-center justify-between px-4 py-3 bg-white/95 hover:bg-white text-slate-800 rounded-2xl shadow-lg border border-slate-100 transition-all text-xs sm:text-sm font-medium group"
            >
              <span className="flex items-center gap-2.5 text-slate-400">
                <Search className="w-4 h-4 text-[#1CA3DC] group-hover:scale-110 transition-transform" />
                <span>Search notes, subjects, PYQs and resources...</span>
              </span>
              <span className="px-2.5 py-1 text-[11px] font-bold bg-[#0B2A63] text-white rounded-xl">
                Search Store
              </span>
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/library"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-[#0B2A63] bg-[#F6B10A] hover:bg-[#e0a008] shadow-md hover:shadow-lg transition-all"
            >
              <Library className="w-4 h-4" />
              <span>Explore Library</span>
            </Link>

            <Link
              href="/pyq"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all"
            >
              <FileQuestion className="w-4 h-4 text-[#1CA3DC]" />
              <span>Practice PYQs</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 border-t border-white/10">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Resources
            </span>
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-[#1CA3DC]" /> Mobile-First Design
            </span>
            <span className="flex items-center gap-1.5">
              <Download className="w-4 h-4 text-[#F6B10A]" /> Direct PDF Downloads
            </span>
          </div>
        </motion.div>
      </div>

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
