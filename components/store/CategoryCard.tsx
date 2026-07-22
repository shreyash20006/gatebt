'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  emoji?: string;
  icon: LucideIcon;
  description: string;
  itemCount?: string;
  href: string;
  accentColor?: string;
}

export default function CategoryCard({
  title,
  emoji,
  icon: Icon,
  description,
  itemCount,
  href,
}: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className="block bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-store-hover hover:border-[#1CA3DC]/40 transition-all duration-200 group h-full flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B2A63]/5 text-[#0B2A63] flex items-center justify-center group-hover:bg-[#0B2A63] group-hover:text-white transition-colors">
              <Icon className="w-5 h-5" />
            </div>
            {itemCount && (
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                {itemCount}
              </span>
            )}
          </div>

          <h3 className="font-bold text-slate-800 text-base group-hover:text-[#0B2A63] transition-colors flex items-center gap-1.5">
            {emoji && <span>{emoji}</span>}
            <span>{title}</span>
          </h3>

          <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1CA3DC] group-hover:text-[#0B2A63] transition-colors">
          <span>Explore Store Category</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
