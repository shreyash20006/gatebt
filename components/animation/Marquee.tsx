'use client';

import React from 'react';
import { Star } from 'lucide-react';

interface MarqueeProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  '349 Solved PYQs',
  '26 Core Subjects',
  'Free Handwritten Notes',
  'Interactive Mind Maps',
  'Resource Library',
  'All 29 GATE Papers',
  'Direct PDF Downloads',
  '100% Mobile Friendly',
];

export default function Marquee({ items = DEFAULT_ITEMS }: MarqueeProps) {
  // Duplicate for seamless infinite loop
  const list = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-[#0B2A63] text-white py-3 overflow-hidden border-y border-white/10 select-none">
      <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] transition-all">
        {list.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 px-6 text-xs font-semibold tracking-wider uppercase text-slate-200">
            <span>{item}</span>
            <Star className="w-3.5 h-3.5 fill-[#F6B10A] text-[#F6B10A] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
