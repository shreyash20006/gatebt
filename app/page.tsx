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
  Dna,
  Pill,
  FileQuestion,
  BookOpen,
  GraduationCap,
  Sparkles,
  ArrowRight,
  BadgeCheck,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'GateBT Prep – Free GATE Biotechnology Notes, PYQs & Mind Maps',
  description:
    'Download free GATE Biotechnology notes and mind maps, practise previous-year questions, and explore curated resources and GATE paper syllabi.',
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

  return (
    <div className="space-y-14">
      {/* 1. Hero Section */}
      <ParallaxHero />

      {/* 2. Scrolling Marquee Band */}
      <Marquee />

      {/* 3. Category Cards Grid */}
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
            icon={Dna}
            description="17 Core subjects including Biochemistry, Bioprocess, rDNA Tech, & Molecular Biology."
            itemCount="17 Subjects"
            href="/category/gate-biotechnology"
          />

          <CategoryCard
            title="B.Pharmacy — DBATU"
            emoji="💊"
            icon={Pill}
            description="Pharmaceutical Chemistry, Medicinal Chemistry, Pharmacognosy, & Biotech."
            itemCount="9 Subjects"
            href="/category/b-pharmacy-dbatu"
          />

          <CategoryCard
            title="Previous Year Questions"
            emoji="📝"
            icon={FileQuestion}
            description="340+ Solved GATE questions (2019-2024) with instant answer key reveals."
            itemCount="349 PYQs"
            href="/pyq"
          />

          <CategoryCard
            title="Resource Library"
            emoji="📚"
            icon={BookOpen}
            description="Curated textbooks, NPTEL videos, NCBI manuals, and website links."
            itemCount="22 Resources"
            href="/resources"
          />

          <CategoryCard
            title="All GATE Papers"
            emoji="🎓"
            icon={GraduationCap}
            description="Official syllabus PDFs, YouTube video playlists, & resources for all 29 papers."
            itemCount="29 Papers"
            href="/papers"
          />

          <CategoryCard
            title="Saved Store Library"
            emoji="❤️"
            icon={BadgeCheck}
            description="Access all your bookmarked study notes, PYQs, and mind maps in one place."
            itemCount="Personalized"
            href="/saved"
          />
        </div>
      </section>

      {/* 4. Featured Downloads Grid */}
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

      {/* 5. PYQ Interactive Preview */}
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

      {/* 6. Resource Library Preview */}
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

      {/* 7. All GATE Papers Preview */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-[#0B2A63] tracking-tight">
              All 29 GATE Papers &amp; Syllabi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Highlighting Biotechnology (BT) as primary paper
            </p>
          </div>
          <Link
            href="/papers"
            className="text-xs font-bold text-[#1CA3DC] hover:underline flex items-center gap-1"
          >
            <span>View All Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <PaperBrowser rows={papers.slice(0, 6)} />
      </section>

      {/* 8. Stats Counter Strip */}
      <section className="bg-gradient-to-r from-[#0B2A63] via-[#0D3880] to-[#1CA3DC] rounded-3xl p-8 sm:p-10 text-white shadow-xl text-center grid grid-cols-2 md:grid-cols-5 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/15">
        <div className="space-y-1">
          <div className="text-3xl sm:text-4xl font-black text-[#F6B10A]">
            <AnimatedCounter target={349} suffix="+" />
          </div>
          <p className="text-xs text-slate-200 font-semibold uppercase tracking-wider">Solved PYQs</p>
        </div>

        <div className="space-y-1 pt-4 md:pt-0">
          <div className="text-3xl sm:text-4xl font-black text-white">
            <AnimatedCounter target={26} />
          </div>
          <p className="text-xs text-slate-200 font-semibold uppercase tracking-wider">Core Subjects</p>
        </div>

        <div className="space-y-1 pt-4 md:pt-0">
          <div className="text-3xl sm:text-4xl font-black text-[#F6B10A]">
            <AnimatedCounter target={22} />
          </div>
          <p className="text-xs text-slate-200 font-semibold uppercase tracking-wider">Curated Resources</p>
        </div>

        <div className="space-y-1 pt-4 md:pt-0">
          <div className="text-3xl sm:text-4xl font-black text-white">
            <AnimatedCounter target={29} />
          </div>
          <p className="text-xs text-slate-200 font-semibold uppercase tracking-wider">GATE Papers</p>
        </div>

        <div className="space-y-1 pt-4 md:pt-0 col-span-2 md:col-span-1">
          <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
          <p className="text-xs text-slate-200 font-semibold uppercase tracking-wider">Free Access</p>
        </div>
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
