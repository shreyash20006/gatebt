import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Logo({ className = '', showTagline = false, size = 'md', onClick }: LogoProps) {
  const dimensions = {
    sm: { width: 32, height: 32, text: 'text-lg', tagline: 'text-[9px]' },
    md: { width: 40, height: 40, text: 'text-xl', tagline: 'text-[10px]' },
    lg: { width: 52, height: 52, text: 'text-2xl', tagline: 'text-xs' },
  }[size];

  return (
    <Link href="/" onClick={onClick} className={`inline-flex items-center gap-2.5 group ${className}`}>
      <div className="relative shrink-0 flex items-center justify-center p-1 bg-white rounded-xl shadow-xs group-hover:scale-105 transition-transform border border-slate-100">
        <Image
          src={OFFICIAL_LOGO_URL}
          alt="GateBT Prep Logo"
          width={dimensions.width}
          height={dimensions.height}
          className="object-contain w-auto h-auto max-h-10"
          priority
        />
      </div>

      <div className="flex flex-col leading-tight">
        <div className={`font-extrabold tracking-tight ${dimensions.text}`}>
          <span className="text-[#0B2A63]">GateBT</span>
          <span className="text-[#1CA3DC] ml-1">Prep</span>
        </div>
        {showTagline && (
          <span className={`font-semibold text-slate-500 uppercase tracking-wider ${dimensions.tagline}`}>
            Your Notes. Your Success.
          </span>
        )}
      </div>
    </Link>
  );
}
