'use client';

import { motion } from 'framer-motion';
import { FileText, Brain, Download, BookOpen, Star, HelpCircle, FileCheck2 } from 'lucide-react';
import { Subject, Resource } from '@/lib/types';
import DirectDownloadButton from './DirectDownloadButton';
import ResourceCard from './ResourceCard';

interface SubjectViewProps {
  subject: Subject;
  resources: Resource[];
}

export default function SubjectView({ subject, resources }: SubjectViewProps) {
  // Find notes PDF and Mind map paths
  const notesResource = resources.find(r => r.type === 'notes_pdf') || resources[0];
  const mindmapResource = resources.find(r => r.type === 'mind_map');

  const notesPath = subject.pdf_path || notesResource?.file_path || `notes/${subject.slug}.pdf`;
  const mindmapPath = subject.mindmap_path || mindmapResource?.file_path;

  const downloadCards = [
    {
      key: 'notes',
      title: 'Handwritten Notes',
      desc: 'Complete high-yield subject handwritten notes (PDF)',
      icon: FileText,
      tint: 'from-blue-600 to-indigo-600',
      path: notesPath,
      resourceId: notesResource?.id || subject.id,
    },
    {
      key: 'mindmap',
      title: 'Mind Map',
      desc: 'One-page quick revision mind map (PDF)',
      icon: Brain,
      tint: 'from-purple-600 to-pink-600',
      path: mindmapPath,
      resourceId: mindmapResource?.id || `${subject.id}-mindmap`,
    },
  ].filter(c => Boolean(c.path));

  const featuredResources = resources.filter(r => r.is_featured);
  const otherResources = resources.filter(r => !r.is_featured);

  return (
    <div className="space-y-8">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-8 text-white shadow-xl relative overflow-hidden"
      >
        <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
          <BookOpen size={15} className="text-emerald-400" />
          <span>{subject.category?.name || 'Study Resource'}</span>
          {subject.subject_code && (
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-mono text-[11px] ml-2">
              {subject.subject_code}
            </span>
          )}
          {subject.gate_weightage && (
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] ml-1">
              GATE: {subject.gate_weightage}
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <span>{subject.icon || '📚'}</span>
          <span>{subject.name}</span>
        </h1>

        <p className="mt-3 max-w-2xl text-slate-300 text-sm sm:text-base leading-relaxed">
          {subject.tagline || subject.description}
        </p>
      </motion.div>

      {/* Direct Animated Download Cards Grid */}
      <div className="grid gap-5 sm:grid-cols-2">
        {downloadCards.map((c, i) => (
          <motion.div
            key={c.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="group rounded-2xl border border-notion-divider bg-white p-6 shadow-xs transition hover:shadow-md flex flex-col justify-between"
          >
            <div>
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${c.tint} p-3 text-white shadow-sm`}>
                <c.icon size={22} />
              </div>
              <h3 className="mt-4 text-lg font-bold text-notion-text">{c.title}</h3>
              <p className="mt-1 text-xs text-notion-muted leading-relaxed">{c.desc}</p>
            </div>

            <div className="mt-5 pt-3 border-t border-notion-divider flex items-center justify-between">
              <span className="text-xs text-notion-muted font-medium">PDF File</span>
              <DirectDownloadButton
                resourceId={c.resourceId}
                filePath={c.path!}
                title={`${subject.name} ${c.title}`}
                label="Download PDF"
                compact
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* All Available Subject Resources */}
      {resources.length > 0 && (
        <section className="space-y-4 pt-4 border-t border-notion-divider">
          <h2 className="text-sm font-bold text-notion-text uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-notion-blue" />
            <span>All Subject Files & Papers ({resources.length})</span>
          </h2>

          <div className="space-y-3">
            {featuredResources.map((resource, idx) => (
              <ResourceCard key={resource.id} resource={resource} index={idx} />
            ))}
            {otherResources.map((resource, idx) => (
              <ResourceCard key={resource.id} resource={resource} index={idx + featuredResources.length} />
            ))}
          </div>
        </section>
      )}

      {/* Notes Markdown Preview / Summary Section */}
      {subject.notes_md && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-slate max-w-none rounded-2xl border border-notion-divider bg-white p-6 sm:p-8 space-y-4"
        >
          <h3 className="text-base font-bold text-notion-text border-b border-notion-divider pb-2">
            📖 Notes Quick Summary
          </h3>
          <div className="text-xs text-notion-text leading-relaxed whitespace-pre-line font-mono bg-notion-hover p-4 rounded-lg">
            {subject.notes_md}
          </div>
        </motion.div>
      )}
    </div>
  );
}
