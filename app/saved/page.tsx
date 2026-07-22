'use client';

import React from 'react';
import Link from 'next/link';
import { useSavedItems } from '@/lib/saved';
import StoreCard from '@/components/store/StoreCard';
import StoreGrid from '@/components/store/StoreGrid';
import { Heart, Library, ArrowRight } from 'lucide-react';

export default function SavedPage() {
  const savedItems = useSavedItems();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-[#0B2A63] tracking-tight flex items-center gap-2">
            <Heart className="w-7 h-7 text-rose-500 fill-rose-500" /> Saved Library
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your bookmarked study notes, PYQs, mind maps, and GATE papers.
          </p>
        </div>

        <Link
          href="/library"
          className="px-4 py-2 rounded-xl bg-[#0B2A63] text-white text-xs font-bold hover:bg-[#06193E] transition-colors"
        >
          Explore Store
        </Link>
      </div>

      {savedItems.length > 0 ? (
        <StoreGrid columns={3}>
          {savedItems.map((item) => (
            <StoreCard
              key={item.id}
              id={item.id}
              title={item.title}
              category={item.category}
              resourceType={item.type}
              href={item.href}
              downloadUrl={item.downloadUrl}
            />
          ))}
        </StoreGrid>
      ) : (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-500 mx-auto flex items-center justify-center">
            <Heart className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#0B2A63]">Your Saved Library is Empty</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              Click the heart icon on any note, mind map, or PYQ card to save it for offline practice and quick revision.
            </p>
          </div>
          <Link
            href="/library"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B2A63] text-white text-xs font-bold shadow-xs hover:shadow transition-all"
          >
            <Library className="w-4 h-4" /> Browse Store Library
          </Link>
        </div>
      )}
    </div>
  );
}
