'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FileText,
  Download,
  BookOpen,
  Youtube,
  Globe,
  GraduationCap,
  ClipboardCheck,
  Heart,
  Star,
  ExternalLink,
  BadgeCheck,
  ArrowRight,
  BrainCircuit,
} from 'lucide-react';
import { isItemSaved, toggleSaveItem } from '@/lib/saved';
import { handleDirectDownload } from '@/lib/downloads';
import { useState, useEffect } from 'react';

export interface StoreCardProps {
  id: string;
  title: string;
  description?: string | null;
  category?: string;
  resourceType: 'note' | 'mindmap' | 'pyq' | 'resource' | 'paper';
  icon?: string;
  rating?: number | null;
  downloadCount?: number;
  badges?: string[];
  href: string;
  downloadUrl?: string | null;
  externalUrl?: string | null;
  targetYear?: string;
  priority?: string;
  code?: string;
}

export default function StoreCard({
  id,
  title,
  description,
  category,
  resourceType,
  icon,
  rating,
  downloadCount,
  badges = [],
  href,
  downloadUrl,
  externalUrl,
  targetYear,
  priority,
  code,
}: StoreCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(isItemSaved(id));
  }, [id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = toggleSaveItem({
      id,
      type: resourceType,
      title,
      category,
      href,
      downloadUrl: downloadUrl || undefined,
      savedAt: new Date().toISOString(),
    });
    setIsSaved(nowSaved);
  };

  const getActionIcon = () => {
    switch (resourceType) {
      case 'note':
        return <Download className="w-4 h-4" />;
      case 'mindmap':
        return <BrainCircuit className="w-4 h-4" />;
      case 'pyq':
        return <ClipboardCheck className="w-4 h-4" />;
      case 'paper':
        return <GraduationCap className="w-4 h-4" />;
      case 'resource':
        if (externalUrl?.includes('youtube') || externalUrl?.includes('youtu.be')) {
          return <Youtube className="w-4 h-4 text-red-500" />;
        }
        if (externalUrl?.includes('pdf')) {
          return <FileText className="w-4 h-4 text-red-500" />;
        }
        return <Globe className="w-4 h-4 text-[#1CA3DC]" />;
      default:
        return <Download className="w-4 h-4" />;
    }
  };

  const getActionButtonText = () => {
    switch (resourceType) {
      case 'note':
        return 'Download Notes PDF';
      case 'mindmap':
        return 'Download Mind Map';
      case 'pyq':
        return 'Start Practice';
      case 'paper':
        return 'View Syllabus & Papers';
      case 'resource':
        if (externalUrl?.includes('youtube') || externalUrl?.includes('youtu.be')) {
          return 'Watch Video';
        }
        return 'Open Resource';
      default:
        return 'Download';
    }
  };

  const handleMainAction = (e: React.MouseEvent) => {
    if (downloadUrl) {
      e.preventDefault();
      handleDirectDownload(downloadUrl, title, id);
    } else if (externalUrl) {
      e.preventDefault();
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const isBT = code === 'BT' || priority === 'Primary';

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className={`bg-white rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-store-hover transition-all duration-200 relative group border ${
        isBT
          ? 'border-[#F6B10A] ring-2 ring-[#F6B10A]/30 bg-gradient-to-b from-amber-50/20 to-white'
          : 'border-slate-200/80 hover:border-[#1CA3DC]/40'
      }`}
    >
      <div>
        {/* Card Header: Badges & Wishlist Save */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <BadgeCheck className="w-3 h-3 text-emerald-600" /> FREE
            </span>

            {code && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0B2A63] text-white">
                {code}
              </span>
            )}

            {priority && (
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  priority === 'Primary'
                    ? 'bg-red-100 text-red-700 border border-red-200'
                    : priority === 'Secondary'
                    ? 'bg-[#F6B10A]/20 text-[#9a6e00]'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {priority}
              </span>
            )}

            {badges.map((b, idx) => (
              <span
                key={idx}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600"
              >
                {b}
              </span>
            ))}
          </div>

          <button
            onClick={handleSaveClick}
            aria-label={isSaved ? 'Remove from Saved Library' : 'Save to Library'}
            className={`p-2 rounded-xl transition-colors ${
              isSaved
                ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <Link href={href} className="group/title block">
          <h3 className="font-bold text-slate-800 text-base leading-snug group-hover/title:text-[#0B2A63] transition-colors line-clamp-2">
            {icon && <span className="mr-1.5">{icon}</span>}
            {title}
          </h3>
        </Link>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-500">
          {category && (
            <span className="px-2.5 py-0.5 rounded-full bg-[#1CA3DC]/10 text-[#1077a3] font-medium">
              {category}
            </span>
          )}

          {targetYear && (
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
              {targetYear}
            </span>
          )}

          {rating && (
            <span className="inline-flex items-center gap-1 font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {rating} / 10
            </span>
          )}

          {downloadCount !== undefined && downloadCount > 0 && (
            <span className="text-[11px] text-slate-400 font-medium">
              {downloadCount.toLocaleString()} downloads
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-xs text-slate-500 mt-2.5 leading-relaxed line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
        <button
          onClick={handleMainAction || (() => {})}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-[#0B2A63] hover:bg-[#06193E] shadow-xs hover:shadow transition-all group/btn"
        >
          {getActionIcon()}
          <span>{getActionButtonText()}</span>
        </button>

        <Link
          href={href}
          className="w-full text-center py-1 text-[11px] font-semibold text-[#1CA3DC] hover:text-[#1077a3] transition-colors inline-flex items-center justify-center gap-1"
        >
          <span>View Details</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </motion.div>
  );
}
