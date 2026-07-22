import React from 'react';
import Link from 'next/link';
import ParallaxHero from '@/components/home/ParallaxHero';
import Marquee from '@/components/animation/Marquee';
import AnimatedCounter from '@/components/animation/AnimatedCounter';
import CategoryCard from '@/components/store/CategoryCard';
import StoreCard from '@/components/store/StoreCard';
import StoreGrid from '@/components/store/StoreGrid';
import PyqBrowser from '@/components/PyqBrowser';
import PaperBrowser from '@/components/PaperBrowser';
import ResourceBrowser from '@/components/ResourceBrowser';
import { getSubjects, getPyqs, getResources, getPaperPlans, getResourceLibrary } from '@/lib/data';
import { Metadata } from 'next';
import {
  Sparkles,
  ArrowRight,
  BadgeCheck,
  FileQuestion,
  GraduationCap,
  BookOpen,
  Download,
  Layers,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'GateBT Prep – Free GATE 2027 Biotechnology Notes, PYQs & Syllabus',
  description:
    'Download free GATE Biotechnology notes and mind maps, practise 349 PYQs, and access the latest official GATE 2027 revised syllabus PDFs.',
};

export const revalidate = 3600;

export default async function HomePage() {
  const [subjects, pyqs, resources, papers, resourceItems] = await Promise.all([
    getSubjects(),
    getPyqs(),
    getResources(),
    getPaperPlans(),
    getResourceLibrary(),
  ]);

  const featuredSubjects = subjects.slice(0, 6);
  const samplePyqs = pyqs.slice(0, 3);
  const sampleResources = resourceItems.slice(0, 4);

  // Dynamic calculated stats
  const totalPyqs = pyqs.length; // 349
  const totalSubjects = subjects.length; // 26
  const totalResources = resourceItems.length; // 22
  const totalPapers = papers.length; // 30
  const totalNotesDownloads = subjects.filter((s) => s.pdf_path).length; // 26
  const totalMindmapDownloads = subjects.filter((s) => s.mindmap_path).length; // 26
  const totalStudyDownloads = totalNotesDownloads + totalMindmapDownloads; // 52
  const aggregateItems = totalPyqs + totalStudyDownloads + totalResources + totalPapers; // 453

  return (
    <div className="space-y-14">
      {/* 1. Video Hero Section */}
      <ParallaxHero />

      {/* 2. Scrolling Marquee Band */}
      <Marquee />

      {/* 3. Rich Material Stats Summary */}
      <section className="bg-gradient-to-r from-[#0B2A63] via-[#0D3880] to-[#1CA3DC] rounded-3xl p-6 sm:p-10 text-white shadow-xl text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-widest text-[#F6B10A]">
          <Layers className="w-4 h-4 text-[#F6B10A]" />
          <span>{aggregateItems}+ Learning Items Available</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/15">
          <div className="space-y-1 pt-2 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-[#F6B10A]">
              <AnimatedCounter target={totalPyqs} suffix="+" />
            </div>
            <p className="text-[11px] text-slate-200 font-extrabold uppercase tracking-wider">Practice Questions</p>
          </div>

          <div className="space-y-1 pt-2 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-white">
              <AnimatedCounter target={totalStudyDownloads} />
            </div>
            <p className="text-[11px] text-slate-200 font-extrabold uppercase tracking-wider">Study Downloads</p>
          </div>

          <div className="space-y-1 pt-2 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-white">
              <AnimatedCounter target={totalSubjects} />
            </div>
            <p className="text-[11px] text-slate-200 font-extrabold uppercase tracking-wider">Subject Notes</p>
          </div>

          <div className="space-y-1 pt-2 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-white">
              <AnimatedCounter target={totalSubjects} />
            </div>
            <p className="text-[11px] text-slate-200 font-extrabold uppercase tracking-wider">Visual Mind Maps</p>
          </div>

          <div className="space-y-1 pt-2 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-[#F6B10A]">
              <AnimatedCounter target={totalResources} />
            </div>
            <p className="text-[11px] text-slate-200 font-extrabold uppercase tracking-wider">Curated Resources</p>
          </div>

          <div className="space-y-1 pt-2 sm:pt-0">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              <AnimatedCounter target={totalPapers} />
            </div>
            <p className="text-[11px] text-slate-200 font-extrabold uppercase tracking-wider">GATE 2027 Papers</p>
          </div>
        </div>
      </section>

      {/* 4. Latest GATE 2027 Syllabus Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 mb-1">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" /> Updated for GATE 2027
            </div>
            <h2 className="text-2xl font-black text-[#0B2A63] tracking-tight">
              🎓 Latest GATE 2027 Revised Syllabi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse all 30 official test papers and open the latest IIT Madras syllabus PDFs directly.
            </p>
          </div>
          <Link
            href="/papers"
            className="text-xs font-bold text-[#1CA3DC] hover:underline flex items-center gap-1"
          >
            <span>View All 30 Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <PaperBrowser rows={papers.slice(0, 6)} />
      </section>

      {/* 5. Category Cards Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0B2A63] tracking-tight">
              Explore Store Categories
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Browse study notes, PYQ solution banks, and GATE syllabi
            </p>
          </div>
          <Link
            href="/library"
            className="text-xs font-bold text-[#1CA3DC] hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            title="GATE Biotechnology"
            emoji="🧬"
            iconType="dna"
            description="17 Core subjects including Biochemistry, Bioprocess, rDNA Tech, & Molecular Biology."
            itemCount="17 Subjects"
            href="/category/gate-biotechnology"
          />

          <CategoryCard
            title="B.Pharmacy — DBATU"
            emoji="💊"
            iconType="pill"
            description="Pharmaceutical Chemistry, Medicinal Chemistry, Pharmacognosy, & Biotech."
            itemCount="9 Subjects"
            href="/category/b-pharmacy-dbatu"
          />

          <CategoryCard
            title="Previous Year Questions"
            emoji="📝"
            iconType="pyq"
            description="340+ Solved GATE questions (2019-2024) with instant answer key reveals."
            itemCount="349 PYQs"
            href="/pyq"
          />

          <CategoryCard
            title="Resource Library"
            emoji="📚"
            iconType="resource"
            description="Curated textbooks, NPTEL videos, NCBI manuals, and website links."
            itemCount="22 Resources"
            href="/resources"
          />

          <CategoryCard
            title="All GATE Papers"
            emoji="🎓"
            iconType="paper"
            description="Official syllabus PDFs, YouTube video playlists, & resources for all 30 papers."
            itemCount="30 Papers"
            href="/papers"
          />

          <CategoryCard
            title="Saved Store Library"
            emoji="❤️"
            iconType="saved"
            description="Access all your bookmarked study notes, PYQs, and mind maps in one place."
            itemCount="Personalized"
            href="/saved"
          />
        </div>
      </section>

      {/* 6. Featured Study Downloads Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F6B10A]/20 text-[#9a6e00] text-[11px] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> High-Yield Study Notes
            </div>
            <h2 className="text-2xl font-black text-[#0B2A63] tracking-tight">
              Featured Study Downloads
            </h2>
          </div>
          <Link
            href="/library"
            className="text-xs font-bold text-[#1CA3DC] hover:underline flex items-center gap-1"
          >
            <span>Browse Store</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <StoreGrid columns={3}>
          {featuredSubjects.map((s) => (
            <StoreCard
              key={s.id}
              id={s.id}
              title={s.name}
              description={s.description}
              category={s.category?.name || 'GATE Biotechnology'}
              resourceType="note"
              icon={s.icon}
              code={s.subject_code || undefined}
              badges={s.gate_weightage ? [`Weightage: ${s.gate_weightage}`] : []}
              href={`/subject/${s.slug}`}
              downloadUrl={s.pdf_path || undefined}
              priority={s.slug === 'biochemistry' || s.slug === 'bioprocess-engineering' ? 'Primary' : undefined}
            />
          ))}
        </StoreGrid>
      </section>

      {/* 7. PYQ Interactive Practice Preview */}
      <section className="space-y-4 bg-slate-50 border border-slate-200/80 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1CA3DC]/15 text-[#1077a3] text-[11px] font-bold mb-1">
              <FileQuestion className="w-3.5 h-3.5" /> Instant Answer Reveals
            </div>
            <h2 className="text-2xl font-black text-[#0B2A63] tracking-tight">
              Practice Solved PYQs
            </h2>
          </div>
          <Link
            href="/pyq"
            className="px-4 py-2 rounded-xl bg-[#0B2A63] text-white text-xs font-bold hover:bg-[#06193E] transition-all shadow-xs"
          >
            View All 349 PYQs
          </Link>
        </div>

        <PyqBrowser rows={samplePyqs} />
      </section>

      {/* 8. Resource Library Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0B2A63] tracking-tight">
              Recommended Books &amp; Videos
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified standard textbooks, NPTEL courses, and official web portals
            </p>
          </div>
          <Link
            href="/resources"
            className="text-xs font-bold text-[#1CA3DC] hover:underline flex items-center gap-1"
          >
            <span>Explore All Resources</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <ResourceBrowser rows={sampleResources} />
      </section>

      {/* 9. Bottom CTA Banner */}
      <section className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-12 text-center space-y-4 shadow-store relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
          <BadgeCheck className="w-4 h-4 text-emerald-600" /> Start Learning Free Today
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-[#0B2A63] tracking-tight">
          Ready to Ace Your GATE Biotechnology Exam?
        </h2>

        <p className="text-slate-500 text-xs sm:text-base max-w-xl mx-auto">
          Download handwritten notes, test your concepts with solved PYQs, and prepare with standard textbook resources.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/library"
            className="px-6 py-3 rounded-2xl bg-[#0B2A63] hover:bg-[#06193E] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            Explore Full Store Library
          </Link>
          <Link
            href="/pyq"
            className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all"
          >
            Start PYQ Practice
          </Link>
        </div>
      </section>
    </div>
  );
}
