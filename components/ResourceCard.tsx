'use client';

import { motion } from 'framer-motion';
import { Resource } from '@/lib/types';
import DirectDownloadButton from './DirectDownloadButton';
import { Star, FileText } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
  index?: number;
}

export default function ResourceCard({ resource, index = 0 }: ResourceCardProps) {
  const getTypeBadgeLabel = (type: string) => {
    switch (type) {
      case 'notes_pdf':
        return 'Handwritten Notes';
      case 'mind_map':
        return 'Mind Map';
      case 'question_bank':
        return 'Question Bank';
      case 'paper':
        return 'Previous Year Paper';
      default:
        return 'Study Resource';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={`p-4 rounded-md border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        resource.is_featured
          ? 'bg-amber-50/30 border-amber-200/90 shadow-xs'
          : 'bg-white border-notion-divider hover:border-slate-300'
      }`}
    >
      <div className="space-y-1.5 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          {resource.is_featured && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-800 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-200">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> Featured Notes
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-notion-tag text-[11px] font-medium text-notion-text border border-notion-divider">
            {getTypeBadgeLabel(resource.type)}
          </span>
          {resource.file_size && (
            <span className="text-[11px] text-notion-muted font-mono">
              {resource.file_size}
            </span>
          )}
          {resource.download_count > 0 && (
            <span className="text-[11px] text-notion-muted">
              • {resource.download_count.toLocaleString()} downloads
            </span>
          )}
        </div>

        <h3 className="text-sm font-semibold text-notion-text flex items-center gap-2">
          <FileText className="w-4 h-4 text-notion-muted shrink-0" />
          <span>{resource.title}</span>
        </h3>
      </div>

      <div className="shrink-0 self-end sm:self-auto">
        <DirectDownloadButton
          resourceId={resource.id}
          filePath={resource.file_path}
          title={resource.title}
          label="Download PDF"
          compact={false}
        />
      </div>
    </motion.div>
  );
}
