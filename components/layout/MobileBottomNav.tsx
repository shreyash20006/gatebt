'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Library, FileQuestion, Heart, UserRound } from 'lucide-react';
import { useSavedItems } from '@/lib/saved';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const savedItems = useSavedItems();

  const isActive = (path: string) => pathname === path;

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Library', href: '/library', icon: Library },
    { label: 'PYQs', href: '/pyq', icon: FileQuestion },
    { label: 'Saved', href: '/saved', icon: Heart, badge: savedItems.length },
    { label: 'Profile', href: '/profile', icon: UserRound },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg pb-safe-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] px-2 py-1 rounded-xl transition-all relative ${
                active ? 'text-[#1CA3DC] font-bold scale-105' : 'text-slate-500 font-medium hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? 'text-[#1CA3DC]' : 'text-slate-500'}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
