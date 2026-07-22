"use client";
import { GraduationCap, Youtube, ExternalLink } from "lucide-react";
import AnimatedDownloadButton from "@/components/store/AnimatedDownloadButton";
import type { Paper } from "@/lib/types";

const prio: Record<string, string> = {
  Primary: "bg-red-100 text-red-700",
  Secondary: "bg-[#F6B10A]/20 text-[#9a6e00]",
  Reference: "bg-slate-100 text-slate-600",
};

export default function PaperCard({ p }: { p: Paper }) {
  const isBT = p.code === "BT";
  return (
    <div
      className={`bg-white rounded-2xl shadow-xs border p-5 flex flex-col justify-between ${
        isBT ? "border-[#F6B10A] ring-1 ring-[#F6B10A]/40" : "border-slate-100"
      }`}
    >
      <div>
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <GraduationCap size={18} className="text-[#0B2A63]" />
          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#0B2A63] text-white">{p.code}</span>
          {isBT && <span className="text-xs px-2 py-0.5 rounded-full bg-red-100 text-red-700">Primary Paper</span>}
          {p.is_revised && (
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#1CA3DC]/15 text-[#1077a3]">Revised 2027</span>
          )}
        </div>
        <h3 className="font-semibold text-slate-800">{p.paper}</h3>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">{p.category}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${prio[p.priority] ?? "bg-slate-100"}`}>{p.priority}</span>
        </div>
        {p.notes && <p className="text-xs text-slate-500 mt-2">{p.notes}</p>}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
        <AnimatedDownloadButton url={p.syllabus_pdf} label="Open Official PDF" />
        <div className="flex gap-2">
          <a
            href={p.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 py-2 rounded-lg transition-colors"
          >
            <Youtube size={13} /> YouTube
          </a>
          <a
            href={p.pdf_resources || "https://gate2027.iitm.ac.in/exam_papers_and_syllabus"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1 text-xs font-semibold text-[#1CA3DC] bg-[#1CA3DC]/10 hover:bg-[#1CA3DC]/20 py-2 rounded-lg transition-colors"
          >
            <ExternalLink size={13} /> Official
          </a>
        </div>
      </div>
    </div>
  );
}
