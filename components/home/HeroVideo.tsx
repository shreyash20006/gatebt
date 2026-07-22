"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { LibraryBig, FileText, Download, FileQuestion, BadgeCheck, Dna } from "lucide-react";
import Logo from "@/components/brand/Logo";

const VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_131516_eca35265-ea66-4fbd-8d52-22aae6e1a503.mp4";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[92svh] flex flex-col">
      <video
        className="absolute inset-0 z-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={VIDEO} type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/40 via-white/50 to-[#F7FAFC]" />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Logo h={40} />
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#192837]">
          <Link href="/library" className="hover:opacity-70 transition-opacity">
            Library
          </Link>
          <Link href="/library?tab=notes" className="hover:opacity-70 transition-opacity">
            Subjects
          </Link>
          <Link href="/pyq" className="hover:opacity-70 transition-opacity">
            PYQs
          </Link>
          <Link href="/resources" className="hover:opacity-70 transition-opacity">
            Resources
          </Link>
          <Link href="/papers" className="hover:opacity-70 transition-opacity">
            GATE Papers
          </Link>
        </div>
      </div>

      <motion.div
        style={{ y: yTitle, opacity }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-5 max-w-3xl mx-auto pb-16"
      >
        <motion.span
          custom={0}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#0B2A63] bg-white/70 border border-[#0B2A63]/10 px-3 py-1.5 rounded-full mb-5"
        >
          <BadgeCheck size={14} className="text-[#1CA3DC]" /> 🆓 India&apos;s Free GATE Biotechnology Study Library
        </motion.span>

        <motion.h1
          custom={1}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="text-[#0B2A63] font-extrabold leading-[1.02] tracking-tight"
          style={{ fontSize: "clamp(2rem, 5.5vw, 4.4rem)" }}
        >
          Master <Dna className="inline align-middle text-[#1CA3DC]" size={34} /> GATE Biotechnology
          <br /> with Notes, PYQs <FileQuestion className="inline align-middle text-[#F6B10A]" size={30} /> &amp; Mind Maps
        </motion.h1>

        <motion.p
          custom={2}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-xl text-[#192837]/80 text-base sm:text-lg leading-relaxed"
        >
          Download revised GATE 2027 syllabi, concise notes and visual mind maps, practise 349 previous-year questions, and explore trusted resources — all in one place.
        </motion.p>

        <motion.div
          custom={3}
          variants={fade}
          initial="hidden"
          animate="visible"
          className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
        >
          <Link
            href="/library"
            className="inline-flex items-center justify-center gap-2 bg-[#0B2A63] text-white font-semibold px-6 py-3.5 rounded-full hover:scale-[1.03] active:scale-95 transition"
          >
            <LibraryBig size={18} /> Explore Free Library
          </Link>
          <Link
            href="/papers"
            className="inline-flex items-center justify-center gap-2 bg-[#F2F2EE] text-[#0B2A63] font-semibold px-6 py-3.5 rounded-full hover:scale-[1.03] active:scale-95 transition"
          >
            <FileText size={18} className="text-red-600" /> <Download size={16} /> GATE 2027 Syllabus
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
