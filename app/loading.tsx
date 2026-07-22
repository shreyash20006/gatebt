import React from 'react';
import Image from 'next/image';

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

export default function Loading() {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 space-y-4">
      <div className="relative p-2 bg-white rounded-2xl shadow-xs border border-slate-100 animate-bounce">
        <Image
          src={OFFICIAL_LOGO_URL}
          alt="GateBT Prep Loading Logo"
          width={48}
          height={48}
          className="object-contain"
        />
      </div>
      <p className="text-xs font-bold text-[#0B2A63] uppercase tracking-wider animate-pulse">
        Loading Study Store...
      </p>
    </div>
  );
}
