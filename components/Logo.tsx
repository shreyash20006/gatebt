import React from 'react';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  onClick?: () => void;
}

export default function Logo({ className = '', showTagline = false, onClick }: LogoProps) {
  return (
    <Link href="/" onClick={onClick} className={`inline-flex items-center gap-2.5 group ${className}`}>
      {/* Brand Icon (DNA + Open Book) */}
      <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-navy via-indigo-900 to-brand-azure p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
        <div className="w-full h-full bg-brand-navy rounded-[14px] flex items-center justify-center relative overflow-hidden">
          <svg className="w-6 h-6 text-brand-azure" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Open Book Base */}
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            {/* DNA Strand Accent */}
            <path d="M6 8c3 2 6 2 9 0" className="text-brand-gold stroke-current" strokeWidth="2.5" />
            <path d="M6 14c3-2 6-2 9 0" className="text-brand-gold stroke-current" strokeWidth="2.5" />
          </svg>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center text-xl font-extrabold tracking-tight">
          <span className="text-brand-navy">GateBT</span>
          <span className="text-brand-azure ml-1">Prep</span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider -mt-1">
            Your Notes. Your Success.
          </span>
        )}
      </div>
    </Link>
  );
}
