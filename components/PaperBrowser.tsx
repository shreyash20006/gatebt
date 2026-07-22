"use client";

import { useMemo, useState } from "react";
import { FileText, Youtube, FolderOpen, Search, BarChart2 } from "lucide-react";

type Paper = {
  id: number;
  paper: string;
  code: string;
  category: string;
  target_year: string;
  priority: string;
  notes: string | null;
  syllabus_pdf: string;
  youtube: string;
  pdf_resources: string;
};

const prio: Record<string, string> = {
  Primary: "bg-red-100 text-red-700 font-bold border border-red-200",
  Secondary: "bg-[#F6B10A]/20 text-[#9a6e00] font-semibold border border-[#F6B10A]/30",
  Reference: "bg-slate-100 text-slate-600 font-medium",
};

function Card({ p }: { p: Paper }) {
  const isPrimary = p.priority === "Primary" || p.code === "BT";
  return (
    <div
      className={`bg-white rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between ${
        isPrimary
          ? "border-2 border-[#F6B10A] ring-2 ring-[#F6B10A]/30 bg-gradient-to-b from-amber-50/30 to-white"
          : "border border-slate-200/80 hover:border-[#1CA3DC]/40"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-[#0B2A63] text-white tracking-wide shadow-xs">
            {p.code}
          </span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full ${prio[p.priority] ?? "bg-slate-100"}`}>
            {p.priority}
          </span>
        </div>
        <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-[#0B2A63] transition-colors">
          {p.paper}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-2">
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#1CA3DC]/15 text-[#1077a3]">
            {p.category}
          </span>
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {p.target_year}
          </span>
        </div>
        {p.notes && <p className="text-xs text-slate-500 mt-2.5 leading-relaxed">{p.notes}</p>}
      </div>

      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-slate-100">
        <a
          href={p.syllabus_pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#0B2A63] bg-[#0B2A63]/5 hover:bg-[#0B2A63]/10 px-2.5 py-1.5 rounded-xl transition-colors"
        >
          <FileText size={13} /> Syllabus PDF
        </a>
        <a
          href={p.youtube}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1.5 rounded-xl transition-colors"
        >
          <Youtube size={13} /> YouTube
        </a>
        <a
          href={p.pdf_resources}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-semibold text-[#1CA3DC] bg-[#1CA3DC]/10 hover:bg-[#1CA3DC]/20 px-2.5 py-1.5 rounded-xl transition-colors"
        >
          <FolderOpen size={13} /> All Papers
        </a>
      </div>
    </div>
  );
}

export default function PaperBrowser({ rows }: { rows: Paper[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(rows.map((r) => r.category))).sort()], [rows]);
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [q, setQ] = useState("");

  const categoryStats = useMemo(() => {
    const counts: Record<string, number> = {};
    rows.forEach((r) => {
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [rows]);

  const filtered = rows.filter(
    (r) =>
      (category === "All" || r.category === category) &&
      (priority === "All" || r.priority === priority) &&
      (q === "" || r.paper.toLowerCase().includes(q.toLowerCase()) || r.code.toLowerCase().includes(q.toLowerCase()))
  );

  const sel = "border border-slate-200 rounded-xl px-3.5 py-2 text-sm bg-white text-slate-700 font-medium focus:outline-none focus:border-[#1CA3DC] shadow-xs";

  return (
    <div className="mt-6 space-y-6">
      {/* Stats Strip */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#1CA3DC]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B2A63]">Category Breakdown &amp; Stats</span>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total GATE Papers: <strong className="text-[#0B2A63] font-bold text-sm ml-1">{rows.length}</strong>
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              category === "All"
                ? "bg-[#0B2A63] text-white shadow-xs"
                : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>All Categories</span>
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${category === "All" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
              {rows.length}
            </span>
          </button>
          {Object.entries(categoryStats).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => setCategory(category === cat ? "All" : cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                category === cat
                  ? "bg-[#0B2A63] text-white shadow-xs"
                  : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-[#1CA3DC]"
              }`}
            >
              <span>{cat}</span>
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${category === cat ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3">
        <select className={sel} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.filter((c) => c !== "All").map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select className={sel} value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="All">All Priorities</option>
          {["Primary", "Secondary", "Reference"].map((p) => (
            <option key={p} value={p}>
              {p} Priority
            </option>
          ))}
        </select>

        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            className={`${sel} w-full pl-10`}
            placeholder="Search papers by name or code (e.g. BT, Life Sciences)..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-sm text-slate-500">
        <span>
          Showing <strong className="text-[#0B2A63] font-semibold">{filtered.length}</strong> of {rows.length} papers
        </span>
        {(category !== "All" || priority !== "All" || q !== "") && (
          <button
            onClick={() => {
              setCategory("All");
              setPriority("All");
              setQ("");
            }}
            className="text-xs font-semibold text-[#1CA3DC] hover:underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Cards Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <Card key={r.id} p={r} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-200/80 p-6">
          <p className="text-slate-600 font-semibold text-base">No papers found matching your criteria</p>
          <p className="text-slate-400 text-xs mt-1">Try resetting your search query or dropdown filters.</p>
        </div>
      )}
    </div>
  );
}
