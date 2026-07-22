'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  LibraryBig,
  FileQuestion,
  Search,
  Sparkles,
  CheckCircle2,
  Download,
  Smartphone,
  BadgeCheck,
  Dna,
  FileText,
  BrainCircuit,
  GraduationCap,
} from 'lucide-react';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';

const OFFICIAL_LOGO_URL =
  'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

const HERO_VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function ParallaxHero() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const { scrollY } = useScroll();

  const yText = useTransform(scrollY, [0, 300], [0, -30]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0.8]);

  return (
    <>
      <div className="relative rounded-3xl overflow-hidden mb-8 border border-slate-200/80 shadow-2xl min-h-[620px] lg:min-h-[680px] flex items-center justify-center">
        {/* Full Viewport Looping Video Background */}
        {!videoError ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onError={() => setVideoError(true)}
            className="absolute inset-0 z-0 h-full w-full object-cover"
          >
            <source src={HERO_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B2A63] via-[#071C44] to-[#0D3880]" />
        )}

        {/* Readability Translucent Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/35 via-white/45 to-[#F7FAFC]" />
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B2A63]/25 via-transparent to-[#1CA3DC]/15" />

        {/* Hero Content */}
        <motion.div
          style={{ y: yText, opacity: opacityText }}
          className="relative z-10 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center flex flex-col items-center justify-center space-y-6"
        >
          {/* 0. Eyebrow Badge */}
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B2A63] text-white shadow-md text-xs font-black tracking-wide"
          >
            <BadgeCheck className="w-4 h-4 text-[#F6B10A]" />
            <span>🆓 India’s Free GATE Biotechnology Study Library</span>
          </motion.div>

          {/* 1. Main Heading */}
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-[760px] space-y-3"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="p-1.5 bg-white rounded-2xl shadow-sm border border-slate-200">
                <Image
                  src={OFFICIAL_LOGO_URL}
                  alt="GateBT Prep Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-[#0B2A63] font-black text-sm uppercase tracking-widest">
                GateBT Prep Hub
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B2A63] tracking-tight leading-[1.02]">
              <span className="inline-flex items-center gap-2 flex-wrap justify-center">
                Master{' '}
                <span className="inline-flex items-center gap-1 text-[#1CA3DC] bg-[#1CA3DC]/10 px-3 py-0.5 rounded-2xl border border-[#1CA3DC]/20">
                  <Dna className="w-7 h-7 text-[#1CA3DC] animate-pulse" />
                  GATE Biotechnology
                </span>
              </span>
              <br />
              <span className="inline-flex items-center gap-2 flex-wrap justify-center text-slate-800 text-2xl sm:text-4xl lg:text-5xl mt-1">
                with Notes, PYQs{' '}
                <FileQuestion className="w-6 h-6 text-[#F6B10A]" /> &amp; Mind Maps
              </span>
            </h1>
          </motion.div>

          {/* 2. Hero Subtext */}
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-[650px] text-sm sm:text-base md:text-lg font-medium text-[#192837]/85 leading-relaxed"
          >
            Download revised GATE 2027 syllabi, concise subject notes and visual mind maps, practise 349 previous-year questions, and explore trusted books, videos and official resources—all in one place.
          </motion.p>

          {/* Interactive Search Launcher */}
          <motion.div custom={2.5} initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-xl">
            <button
              onClick={() => setSearchOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white/95 hover:bg-white text-slate-800 rounded-2xl shadow-lg border border-slate-200 transition-all text-xs sm:text-sm font-medium group cursor-pointer"
            >
              <span className="flex items-center gap-2.5 text-slate-400">
                <Search className="w-4 h-4 text-[#1CA3DC] group-hover:scale-110 transition-transform" />
                <span>Search notes, subjects, PYQs and GATE papers...</span>
              </span>
              <span className="px-3 py-1 text-[11px] font-bold bg-[#0B2A63] text-white rounded-xl">
                Search Store
              </span>
            </button>
          </motion.div>

          {/* 3. CTA Action Buttons */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-md"
          >
            <Link
              href="/library"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-white bg-[#0B2A63] hover:bg-[#06193E] shadow-md hover:shadow-lg transition-all min-h-[48px]"
            >
              <LibraryBig className="w-4 h-4 text-[#1CA3DC]" />
              <span>Explore Free Library</span>
            </Link>

            <Link
              href="/papers"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#0B2A63] bg-white hover:bg-slate-50 border border-slate-200 shadow-xs transition-all min-h-[48px]"
            >
              <FileText className="w-4 h-4 text-red-500" />
              <Download className="w-3.5 h-3.5 text-[#0B2A63]" />
              <span>Download GATE 2027 Syllabus</span>
            </Link>
          </motion.div>

          {/* Optional Third Practice Link */}
          <motion.div custom={3.5} initial="hidden" animate="visible" variants={fadeUp}>
            <Link
              href="/pyq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B2A63] hover:text-[#1CA3DC] underline underline-offset-4 transition-colors"
            >
              <FileQuestion className="w-3.5 h-3.5 text-[#F6B10A]" />
              <span>Start practising 349 PYQs</span>
            </Link>
          </motion.div>

          {/* 4. Trust Row */}
          <motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-extrabold text-[#0B2A63] border-t border-slate-200/80 w-full max-w-2xl"
          >
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Free Resources
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Smartphone className="w-4 h-4 text-[#1CA3DC]" /> Mobile-First Design
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
              <Download className="w-4 h-4 text-[#F6B10A]" /> Direct PDF Access
            </span>
          </motion.div>
        </motion.div>
      </div>

      <GlobalSearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
