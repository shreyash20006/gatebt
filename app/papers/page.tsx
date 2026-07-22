import { supabase } from "@/lib/supabase";
import PaperCard from "@/components/papers/PaperCard";
import type { Paper } from "@/lib/types";
import { getPaperPlans } from "@/lib/data";

export const revalidate = 3600;
export const metadata = { title: "GATE 2027 Revised Syllabus PDF – All Papers | GateBT Prep" };

export default async function PapersPage() {
  let papers: Paper[] = [];
  try {
    const { data, error } = await supabase
      .from("paper_plans")
      .select("*")
      .order("code", { ascending: true });
    if (!error && data && data.length > 0) {
      papers = data as Paper[];
    } else {
      papers = await getPaperPlans();
    }
  } catch (e) {
    papers = await getPaperPlans();
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 pb-24 space-y-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2A63]">🎓 Latest GATE 2027 Revised Syllabi</h1>
        <p className="text-slate-500 mt-1">All official test papers — open the latest IIT Madras syllabus PDFs directly.</p>
        <p className="text-xs text-slate-400 mt-1">
          Syllabus links point to the official GATE 2027 IIT Madras website. GateBT Prep is not affiliated with IIT Madras or GATE.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {papers.map((p) => (
          <PaperCard key={p.id || p.code} p={p} />
        ))}
      </div>
    </main>
  );
}
