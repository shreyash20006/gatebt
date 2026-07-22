import { supabase } from "@/lib/supabase";
import HeroVideo from "@/components/home/HeroVideo";
import Marquee from "@/components/animation/Marquee";
import Reveal from "@/components/animation/Reveal";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import { getPaperPlans } from "@/lib/data";
import PaperCard from "@/components/papers/PaperCard";
import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";
import type { Paper } from "@/lib/types";

export const revalidate = 3600;

export default async function Home() {
  const [{ count: pyqCount }, { count: subCount }, { count: resCount }, { count: paperCount }, { data: paperData }] =
    await Promise.all([
      supabase.from("pyqs").select("*", { count: "exact", head: true }),
      supabase.from("note_subjects").select("*", { count: "exact", head: true }),
      supabase.from("resource_library").select("*", { count: "exact", head: true }),
      supabase.from("paper_plans").select("*", { count: "exact", head: true }),
      supabase.from("paper_plans").select("*").order("code", { ascending: true }).limit(6),
    ]);

  const notes = subCount ?? 26;
  const total = (pyqCount ?? 0) + notes * 2 + (resCount ?? 0) + (paperCount ?? 0);
  const featuredPapers: Paper[] =
    paperData && paperData.length > 0
      ? (paperData as Paper[])
      : ((await getPaperPlans()) as Paper[]).slice(0, 6);

  return (
    <main className="space-y-12 pb-16">
      <HeroVideo />
      <Marquee />

      <section className="max-w-5xl mx-auto px-4 py-6">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-xs">
            <AnimatedCounter to={pyqCount ?? 349} label="Practice Questions" />
            <AnimatedCounter to={notes * 2} label="Study Downloads" />
            <AnimatedCounter to={resCount ?? 22} label="Curated Resources" />
            <AnimatedCounter to={paperCount ?? 30} label="Official GATE Papers" />
          </div>
          <p className="text-center mt-6 text-lg font-bold text-[#0B2A63]">{total}+ Learning Items · 100% Free</p>
        </Reveal>
      </section>

      <section className="max-w-6xl mx-auto px-4 space-y-4">
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
          <Link href="/papers" className="text-xs font-bold text-[#1CA3DC] hover:underline flex items-center gap-1">
            <span>View All 30 Papers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredPapers.map((p) => (
            <PaperCard key={p.id || p.code} p={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
