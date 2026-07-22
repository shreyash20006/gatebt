'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Loader2, Check } from 'lucide-react';
import { getPublicDownloadUrl } from '@/lib/supabase/client';

interface DirectDownloadButtonProps {
  resourceId: string;
  filePath: string;
  title: string;
  className?: string;
  label?: string;
  compact?: boolean;
}

export default function DirectDownloadButton({
  resourceId,
  filePath,
  title,
  className = '',
  label = 'Download PDF',
  compact = false,
}: DirectDownloadButtonProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');
  const publicUrl = getPublicDownloadUrl(filePath);

  async function handleDownload(e: React.MouseEvent) {
    e.preventDefault();
    if (state === 'loading') return;

    setState('loading');

    // Non-blocking download tracking API call
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId }),
      }).catch(() => {});
    } catch (err) {
      // Ignore tracking errors
    }

    const filename = (title.replace(/[^a-zA-Z0-9_-]/g, '_') || 'notes') + '.pdf';

    try {
      if (publicUrl.startsWith('data:')) {
        const link = document.createElement('a');
        link.href = publicUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        const res = await fetch(publicUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      const link = document.createElement('a');
      link.href = publicUrl;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setState('done');
    setTimeout(() => setState('idle'), 2500);
  }

  const sizeStyle = compact
    ? 'px-3 py-1.5 text-xs font-semibold'
    : 'px-5 py-2.5 text-xs font-bold uppercase tracking-wider';

  return (
    <motion.button
      type="button"
      onClick={handleDownload}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.95 }}
      className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-azure to-sky-500 hover:from-brand-azure-hover hover:to-sky-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-azure/50 ${sizeStyle} ${className}`}
      title={`Download ${title}`}
    >
      {state === 'idle' && (
        <span className="flex items-center gap-2">
          <motion.span
            animate={{ y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <Download className="w-4 h-4" />
          </motion.span>
          <span>{label}</span>
        </span>
      )}

      {state === 'loading' && (
        <span className="flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Downloading…</span>
        </span>
      )}

      {state === 'done' && (
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-2 text-white"
        >
          <Check className="w-4 h-4 text-emerald-300" />
          <span>Downloaded!</span>
        </motion.span>
      )}
    </motion.button>
  );
}
