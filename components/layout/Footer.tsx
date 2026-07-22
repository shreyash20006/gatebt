import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Send, Award, Heart, Youtube, ExternalLink, Instagram } from 'lucide-react';

const OFFICIAL_LOGO_URL = 'https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B2A63] text-white border-t border-[#06193E] mt-20 pb-20 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-3 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 bg-white/10 px-3.5 py-2 rounded-2xl border border-white/10">
              <Image
                src={OFFICIAL_LOGO_URL}
                alt="GateBT Prep Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-lg font-extrabold text-white">
                GateBT <span className="text-[#1CA3DC]">Prep</span>
              </span>
            </Link>

            <p className="text-xs text-[#F6B10A] font-bold tracking-wide">
              &quot;Your Notes. Your Success.&quot;
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              Free high-yield handwritten study notes, solved question banks, mind maps, and syllabus resources for GATE Biotechnology &amp; B.Pharmacy students.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F6B10A]">Study Store</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/library" className="hover:text-[#1CA3DC] transition-colors">
                  📚 Catalogue Library
                </Link>
              </li>
              <li>
                <Link href="/pyq" className="hover:text-[#1CA3DC] transition-colors">
                  📝 Solved PYQs (2019–2024)
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#1CA3DC] transition-colors">
                  🌐 Recommended Resources
                </Link>
              </li>
              <li>
                <Link href="/papers" className="hover:text-[#1CA3DC] transition-colors">
                  🎓 All 29 GATE Papers
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-[#1CA3DC] transition-colors">
                  ❤️ Saved Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F6B10A]">Categories</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/category/gate-biotechnology" className="hover:text-[#1CA3DC] transition-colors">
                  🧬 GATE Biotechnology Notes
                </Link>
              </li>
              <li>
                <Link href="/category/b-pharmacy-dbatu" className="hover:text-[#1CA3DC] transition-colors">
                  💊 B.Pharmacy DBATU Notes
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-[#1CA3DC] transition-colors">
                  📄 Direct PDF Downloads
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#F6B10A]">Contact &amp; Connect</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#1CA3DC]" />
                <a href="mailto:gatebt@outlook.com" className="hover:text-[#1CA3DC] transition-colors">
                  gatebt@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <a
                  href="https://www.instagram.com/gatebt_prep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-[#1CA3DC] transition-colors inline-flex items-center gap-1"
                >
                  <span>@gatebt_prep</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors inline-flex items-center gap-1">
                  <span>YouTube Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Award className="w-4 h-4 text-[#F6B10A]" />
                <span className="font-medium text-[#F6B10A]">Prepare Smart. Get Into IIT.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {currentYear} GateBT Prep. All rights reserved. 100% Free Study Resource Store.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for GATE Biotechnology Aspirants
          </p>
        </div>
      </div>
    </footer>
  );
}
