import { createClient } from "@supabase/supabase-js";
import PaperBrowser from "@/components/PaperBrowser";
import { getPaperPlans } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All GATE Papers | Syllabus, YouTube & Resources",
  description: "Syllabus & study resources for all GATE papers including GATE Biotechnology (BT).",
};

export const revalidate = 3600;

export default async function PapersPage() {
  let data = null;
  if (
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("example.supabase.co") &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const res = await supabase
        .from("paper_plans")
        .select("id,paper,code,category,target_year,priority,notes,syllabus_pdf,youtube,pdf_resources")
        .order("code", { ascending: true });
      data = res.data;
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to mock dataset", e);
    }
  }

  const rows = data && data.length > 0 ? data : await getPaperPlans();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#0B2A63]">All GATE Papers</h1>
      <p className="text-slate-500 mt-1">Syllabus &amp; study resources for all 29 GATE papers</p>
      <PaperBrowser rows={rows} />
    </main>
  );
}
