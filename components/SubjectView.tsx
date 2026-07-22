'use client';

import { motion } from 'framer-motion';
import { FileText, Brain, Download, BookOpen, Star, HelpCircle, FileCheck2, ArrowRight, Eye, Layers, HelpCircle as QuestionIcon } from 'lucide-react';
import { Subject, Resource, Pyq } from '@/lib/types';
import DirectDownloadButton from './DirectDownloadButton';
import ResourceCard from './ResourceCard';
import { QuestionCard } from './PyqBrowser';
import Link from 'next/link';

interface SubjectViewProps {
  subject: Subject;
  resources: Resource[];
  siblingSubjects?: Subject[];
  pyqs?: Pyq[];
}

export default function SubjectView({
  subject,
  resources,
  siblingSubjects = [],
  pyqs = [],
}: SubjectViewProps) {
  // Find notes PDF and Mind map paths
  const notesResource = resources.find(r => r.type === 'notes_pdf') || resources[0];
  const mindmapResource = resources.find(r => r.type === 'mind_map');

  const notesPath = subject.pdf_path || notesResource?.file_path || `notes/${subject.slug}.pdf`;
  const mindmapPath = subject.mindmap_path || mindmapResource?.file_path || `notes/${subject.slug}-mindmap.pdf`;

  const downloadCards = [
    {
      key: 'notes',
      title: 'Handwritten Notes (PDF)',
      desc: 'Complete high-yield ranker notes in PDF format',
      icon: FileText,
      tint: 'from-brand-azure via-sky-500 to-blue-600',
      badge: '⭐ High-Yield Notes',
      badgeBg: 'bg-brand-azure/10 text-brand-azure border-brand-azure/20',
      path: notesPath,
      resourceId: notesResource?.id || subject.id,
      size: notesResource?.file_size || '12.5 MB',
      downloads: notesResource?.download_count || 1240,
    },
    {
      key: 'mindmap',
      title: 'Mind Map (PDF)',
      desc: 'One-page visual summary & rapid revision mind map',
      icon: Brain,
      tint: 'from-amber-500 via-brand-gold to-orange-500',
      badge: '🧠 1-Page Quick Revision',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      path: mindmapPath,
      resourceId: mindmapResource?.id || `${subject.id}-mindmap`,
      size: mindmapResource?.file_size || '4.2 MB',
      downloads: mindmapResource?.download_count || 890,
      hasThumbnail: true,
    },
  ];

  const totalDownloads = resources.reduce((acc, r) => acc + (r.download_count || 0), 1250);

  return (
    <div className="space-y-8">
      {/* 1. HERO BANNER: Full-Width Gradient Card (Navy -> Azure) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-3xl bg-gradient-to-r from-brand-navy via-[#0D3880] to-brand-azure p-6 sm:p-10 text-white shadow-pw relative overflow-hidden"
      >
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-brand-azure/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-brand-gold/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-3xl">{subject.icon || '📚'}</span>
            {subject.subject_code && (
              <span className="px-3 py-1 rounded-full bg-white/15 text-white font-mono text-xs font-bold border border-white/20">
                {subject.subject_code}
              </span>
            )}
            {subject.gate_weightage && (
              <span className="px-3 py-1 rounded-full bg-brand-gold text-brand-navy text-xs font-extrabold flex items-center gap-1 shadow-xs">
                ⚡ GATE Weightage: {subject.gate_weightage}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {subject.name}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            {subject.tagline || subject.description}
          </p>

          {/* Stats Row */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-200">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Download className="w-4 h-4 text-brand-gold" />
              <span>{totalDownloads.toLocaleString()} Downloads</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <Brain className="w-4 h-4 text-brand-azure" />
              <span>Revision Mind Map Included</span>
            </div>
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10">
              <QuestionIcon className="w-4 h-4 text-emerald-400" />
              <span>{pyqs.length > 0 ? `${pyqs.length} PYQs Available` : 'Handwritten PDF Notes'}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. DOWNLOAD CARDS: Responsive Grid */}
      <section className="space-y-4">
        <h2 className="text-xl font-extrabold text-brand-navy flex items-center gap-2">
          <Download className="w-5 h-5 text-brand-azure" /> Direct PDF Downloads
        </h2>

        <div className="grid gap-6 sm:grid-cols-2">
          {downloadCards.map((c, i) => (
            <motion.div
              key={c.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-pw-hover transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className={`inline-flex rounded-2xl bg-gradient-to-tr ${c.tint} p-3.5 text-white shadow-md group-hover:scale-105 transition-transform`}>
                    <c.icon size={24} />
                  </div>
                  <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full border ${c.badgeBg}`}>
                    {c.badge}
                  </span>
                </div>

                <h3 className="text-lg font-extrabold text-brand-navy">{c.title}</h3>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{c.desc}</p>

                {/* Small Thumbnail Preview Badge for Mind Map */}
                {c.hasThumbnail && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-center gap-2 text-xs text-amber-900 font-medium">
                    <Layers className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>Visual diagram preview available inside PDF</span>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500 font-medium">
                  <span className="font-mono">{c.size}</span> · {c.downloads.toLocaleString()} dl
                </div>
                <DirectDownloadButton
                  resourceId={c.resourceId}
                  filePath={c.path}
                  title={`${subject.name} ${c.title}`}
                  label="Download PDF"
                  compact={false}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PREVIOUS YEAR QUESTIONS (PYQs) SECTION FOR THIS SUBJECT */}
      {pyqs.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-brand-navy flex items-center gap-2">
              <QuestionIcon className="w-5 h-5 text-brand-azure" /> Previous Year Questions ({pyqs.length})
            </h2>
            <Link href="/pyq" className="text-xs font-bold text-brand-azure hover:underline">
              View All PYQs &rarr;
            </Link>
          </div>

          <div className="grid gap-4">
            {pyqs.map((q, idx) => (
              <QuestionCard key={q.id} q={q} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* Additional Resources List if available */}
      {resources.length > 2 && (
        <section className="space-y-4">
          <h3 className="text-base font-extrabold text-brand-navy">Other Materials & Question Banks</h3>
          <div className="space-y-3">
            {resources.slice(2).map((res, idx) => (
              <ResourceCard key={res.id} resource={res} index={idx} />
            ))}
          </div>
        </section>
      )}

      {/* 4. NOTES PREVIEW: Render note_subjects.notes_md */}
      {subject.notes_md ? (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xl font-extrabold text-brand-navy flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-azure" /> Notes Preview & Key Topics
            </h2>
            <span className="text-xs text-brand-muted font-medium">Handwritten Summary</span>
          </div>

          <div className="prose max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80 font-sans text-brand-navy whitespace-pre-line leading-relaxed">
              {subject.notes_md}
            </div>
          </div>
        </motion.section>
      ) : (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-2">
          <h3 className="text-sm font-extrabold text-brand-navy">📖 Topic Coverage Overview</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            These handwritten notes cover the complete syllabus for {subject.name} ({subject.subject_code || 'GATE BT'}), including core numerical problems, formulas, diagrams, and previous year exam questions.
          </p>
        </section>
      )}

      {/* 5. "OTHER SUBJECTS" STRIP: Horizontal scroll of sibling subjects */}
      {siblingSubjects.length > 1 && (
        <section className="space-y-3 pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-brand-navy uppercase tracking-wider">
              More {subject.category?.name || 'Category'} Subjects
            </h3>
            <span className="text-xs text-brand-muted">Scroll to explore &rarr;</span>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 no-scrollbar">
            {siblingSubjects
              .filter(s => s.id !== subject.id)
              .map(sibling => (
                <Link
                  key={sibling.id}
                  href={`/subject/${sibling.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 hover:border-brand-azure hover:bg-brand-azure/5 text-xs font-bold text-brand-navy shadow-xs hover:shadow-sm shrink-0 transition-all"
                >
                  <span className="text-base">{sibling.icon || '📚'}</span>
                  <span>{sibling.name}</span>
                  {sibling.subject_code && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-mono text-slate-500">
                      {sibling.subject_code}
                    </span>
                  )}
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
