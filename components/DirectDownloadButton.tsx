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
  label = 'Download',
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
        // Direct Base64 Data URI download (offline / demo mode)
        const link = document.createElement('a');
        link.href = publicUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Live Supabase URL fetch
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
      // Fallback anchor trigger for cross-origin or bucket downloads
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
    ? 'px-2.5 py-1 text-xs font-medium'
    : 'px-3.5 py-1.5 text-xs font-medium';

  return (
    <motion.button
      type="button"
      onClick={handleDownload}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className={`inline-flex items-center justify-center gap-1.5 bg-notion-blue hover:bg-notion-blue-hover text-white rounded-md transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-notion-blue/40 shadow-xs ${sizeStyle} ${className}`}
      title={`Download ${title}`}
    >
      {state === 'idle' && (
        <span className="flex items-center gap-1.5">
          <motion.span
            animate={{ y: [0, 2, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <Download className="w-3.5 h-3.5" />
          </motion.span>
          <span>{label}</span>
        </span>
      )}

      {state === 'loading' && (
        <span className="flex items-center gap-1.5">
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
          <span>Downloading…</span>
        </span>
      )}

      {state === 'done' && (
        <motion.span
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          className="flex items-center gap-1.5"
        >
          <Check className="w-3.5 h-3.5 text-emerald-200" />
          <span>Done!</span>
        </motion.span>
      )}
    </motion.button>
  );
}
