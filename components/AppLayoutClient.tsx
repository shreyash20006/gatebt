'use client';

import React from 'react';
import Navbar from './layout/Navbar';
import MobileBottomNav from './layout/MobileBottomNav';
import Footer from './layout/Footer';
import OnboardingModal from './onboarding/OnboardingModal';
import { AuthProvider } from '@/lib/auth-context';
import { usePathname } from 'next/navigation';
import { Category, Subject } from '@/lib/types';

interface AppLayoutClientProps {
  categories: Category[];
  subjects: Subject[];
  children: React.ReactNode;
}

export default function AppLayoutClient({ children }: AppLayoutClientProps) {
  const pathname = usePathname();
  const isFullWidthPage = pathname === '/' || pathname === '/gate-ce' || pathname === '/gate-3d';

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#1CA3DC] selection:text-slate-950">
        {/* First Visit Onboarding Modal */}
        <OnboardingModal />

        {/* Persistent Desktop & Mobile Navbar */}
        <Navbar />

        {/* Main Content Viewport */}
        <main className={`flex-1 w-full ${isFullWidthPage ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 pb-20 md:pb-10'}`}>
          {children}
        </main>

        {/* Mobile Bottom Navigation (Visible below md) */}
        <MobileBottomNav />

        {/* Global E-Commerce Store Footer */}
        <Footer />
      </div>
    </AuthProvider>
  );
}
