'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, CheckCircle2, CircleAlert, FileText, Loader2, Sparkles } from 'lucide-react';
import { handleDirectDownload } from '@/lib/downloads';

interface AnimatedDownloadButtonProps {
  url: string;
  filename?: string;
  resourceId?: number | string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  compact?: boolean;
}

type ButtonState = 'idle' | 'preparing' | 'opening' | 'success' | 'error';

export default function AnimatedDownloadButton({
  url,
  filename = 'GATE_Syllabus.pdf',
  resourceId,
  label = 'Download PDF',
  className = '',
  variant = 'primary',
  compact = false,
}: AnimatedDownloadButtonProps) {
  const [btnState, setBtnState] = useState<ButtonState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (btnState !== 'idle' && btnState !== 'error') return;

    if (!url) {
      setBtnState('error');
      setErrorMessage('Syllabus URL unavailable');
      setTimeout(() => setBtnState('idle'), 3000);
      return;
    }

    try {
      // 1. Preparing state (350ms)
      setBtnState('preparing');
      await new Promise((resolve) => setTimeout(resolve, 350));

      // 2. Opening state (450ms)
      setBtnState('opening');
      await new Promise((resolve) => setTimeout(resolve, 450));

      // 3. Success state (500ms)
      setBtnState('success');
      await new Promise((resolve) => setTimeout(resolve, 500));

      // 4. Trigger download or open URL
      if (resourceId) {
        handleDirectDownload(url, filename, String(resourceId));
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }

      // Reset state after brief delay
      setTimeout(() => setBtnState('idle'), 1500);
    } catch (err) {
      setBtnState('error');
      setErrorMessage('Download failed. Retrying...');
      setTimeout(() => setBtnState('idle'), 3000);
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#0B2A63] hover:bg-[#06193E] text-white shadow-md hover:shadow-lg border border-[#0B2A63]';
      case 'secondary':
        return 'bg-[#F6B10A] hover:bg-[#e0a008] text-[#0B2A63] font-black shadow-md border border-[#F6B10A]';
      case 'outline':
        return 'bg-white hover:bg-slate-50 text-[#0B2A63] border border-slate-200 shadow-xs';
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white shadow-xs border border-red-600';
      default:
        return 'bg-[#0B2A63] text-white';
    }
  };

  return (
    <div className="relative inline-flex flex-col items-center">
      <motion.button
        whileHover={{ scale: btnState === 'idle' ? 1.02 : 1 }}
        whileTap={{ scale: btnState === 'idle' ? 0.96 : 0.98 }}
        onClick={handleClick}
        disabled={btnState === 'preparing' || btnState === 'opening' || btnState === 'success'}
        aria-live="polite"
        className={`relative overflow-hidden font-bold rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
          compact ? 'px-3.5 py-2 text-xs min-h-[40px]' : 'px-5 py-3 text-xs sm:text-sm min-h-[48px]'
        } ${btnState === 'success' ? '!bg-emerald-600 !text-white !border-emerald-600' : ''} ${
          btnState === 'error' ? '!bg-red-600 !text-white !border-red-600' : ''
        } ${getVariantStyles()} ${className}`}
      >
        {/* Animated Fill Progress for Opening state */}
        {btnState === 'opening' && (
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.45, ease: 'linear' }}
            className="absolute inset-0 bg-white/20 pointer-events-none"
          />
        )}

        <AnimatePresence mode="wait">
          {btnState === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </motion.span>
          )}

          {btnState === 'preparing' && (
            <motion.span
              key="preparing"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex items-center gap-2"
            >
              <motion.div animate={{ y: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 0.4 }}>
                <FileText className="w-4 h-4" />
              </motion.div>
              <span>Preparing...</span>
            </motion.span>
          )}

          {btnState === 'opening' && (
            <motion.span
              key="opening"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>Opening PDF...</span>
            </motion.span>
          )}

          {btnState === 'success' && (
            <motion.span
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Ready!</span>
            </motion.span>
          )}

          {btnState === 'error' && (
            <motion.span
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2"
            >
              <CircleAlert className="w-4 h-4 shrink-0" />
              <span>Try Again</span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {errorMessage && btnState === 'error' && (
        <span className="text-[10px] text-red-500 font-semibold mt-1 animate-fade-in">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
