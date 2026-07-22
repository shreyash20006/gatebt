"use client";
import React from 'react';
import AnimatedDownloadButton from '@/components/store/AnimatedDownloadButton';

export interface LegacyAnimatedDownloadButtonProps {
  url?: string | null;
  filePath?: string | null;
  filename?: string;
  resourceId?: number | string;
  label?: string;
  className?: string;
  variant?: string;
  compact?: boolean;
  onTrack?: () => void;
}

export default function LegacyAnimatedDownloadButton({
  url,
  filePath,
  label = "Download PDF",
  onTrack,
}: LegacyAnimatedDownloadButtonProps) {
  const targetUrl = url || filePath || null;
  return <AnimatedDownloadButton url={targetUrl} label={label} onTrack={onTrack} />;
}
