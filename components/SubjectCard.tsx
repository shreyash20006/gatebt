import Link from 'next/link';
import { Subject, Resource } from '@/lib/types';
import DirectDownloadButton from './DirectDownloadButton';
import { ArrowRight, FileText, Star } from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  featuredResource?: Resource | null;
}

export default function SubjectCard({ subject, featuredResource }: SubjectCardProps) {
  // Default file path fallback if no specific resource is passed
  const targetFilePath = featuredResource?.file_path || `notes/${subject.slug}.pdf`;
  const targetResourceId = featuredResource?.id || subject.id;

  return (
    <div className="group relative bg-white border border-gray-100 hover:border-emerald-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
            {subject.icon || '📚'}
          </div>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {subject.subject_code && (
              <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                {subject.subject_code}
              </span>
            )}
            {subject.gate_weightage && (
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                <span>⚡</span> {subject.gate_weightage}
              </span>
            )}
          </div>
        </div>

        {/* Title & Description */}
        <Link href={`/subject/${subject.slug}`} className="block group-hover:text-emerald-700 transition-colors">
          <h3 className="text-lg font-bold text-slate-900 leading-snug mb-1.5 flex items-center gap-2">
            {subject.name}
          </h3>
        </Link>
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
          {subject.description}
        </p>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 space-y-2">
        <DirectDownloadButton
          resourceId={targetResourceId}
          filePath={targetFilePath}
          title={`${subject.name} Notes`}
          className="w-full"
          label="Download Notes"
        />

        <div className="flex items-center justify-between text-xs pt-1">
          <Link
            href={`/subject/${subject.slug}`}
            className="text-slate-500 hover:text-emerald-600 font-medium inline-flex items-center gap-1 group/link"
          >
            <span>View all resources</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
          <span className="text-slate-400 text-[11px] flex items-center gap-1">
            <FileText className="w-3 h-3" /> PDF Notes
          </span>
        </div>
      </div>
    </div>
  );
}
