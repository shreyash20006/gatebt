import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, Library } from 'lucide-react';

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-5">
      <div className="p-3 bg-white rounded-3xl shadow-sm border border-slate-200">
        <Image
          src={OFFICIAL_LOGO_URL}
          alt="GateBT Prep Logo"
          width={64}
          height={64}
          className="object-contain"
        />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black px-3 py-1 rounded-full bg-red-100 text-red-700 uppercase tracking-widest">
          404 — Page Not Found
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0B2A63]">
          Study Resource Not Found
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
          The requested study note or resource page could not be located. It may have been moved or updated.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-2xl bg-[#0B2A63] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
        >
          <Home className="w-4 h-4" /> Go to Home
        </Link>

        <Link
          href="/library"
          className="px-5 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
        >
          <Library className="w-4 h-4 text-[#1CA3DC]" /> Browse Library
        </Link>
      </div>
    </div>
  );
}
