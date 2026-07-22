import { createClient } from "@supabase/supabase-js";
import PaperBrowser from "@/components/PaperBrowser";
import { getPaperPlans } from "@/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GATE 2027 Revised Syllabus PDF – All 30 Papers",
  description: "Official revised GATE 2027 syllabus PDFs for all 30 test papers from IIT Madras.",
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
        .select("id,paper,code,category,target_year,priority,notes,syllabus_pdf,youtube,pdf_resources,source_name,source_url,is_official,syllabus_year,is_revised")
        .order("code", { ascending: true });
      data = res.data;
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to mock dataset", e);
    }
  }

  const rows = data && data.length > 0 ? data : await getPaperPlans();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B2A63]">
          GATE 2027 Revised Syllabus PDF – All 30 Papers
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Official revised syllabus PDFs, lectures, and resources for all 30 test papers from IIT Madras.
        </p>
      </div>
      <PaperBrowser rows={rows} />
    </main>
  );
}
