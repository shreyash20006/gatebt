import React from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { Mail, Send, Award, Heart, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white border-t border-brand-navy-dark mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-white/10">
          {/* Column 1: Brand & Tagline */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-2xl">
              <span className="text-xl">🧬</span>
              <span className="text-lg font-extrabold text-white">GateBT <span className="text-brand-azure">Prep</span></span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              &quot;Your Notes. Your Success.&quot;
            </p>
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              Free high-yield handwritten study notes, solved question banks, and revision mind maps for GATE Biotechnology & B.Pharmacy DBATU students.
            </p>
          </div>

          {/* Column 2: Contact & Handle */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">Contact & Connect</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-azure" />
                <a href="mailto:gatebt@outlook.com" className="hover:text-brand-azure transition-colors">
                  gatebt@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400" />
                <a
                  href="https://www.instagram.com/gatebt_prep/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-white hover:text-brand-azure transition-colors"
                >
                  @gatebt_prep
                </a>
              </li>
              <li className="flex items-center gap-2 pt-1 text-slate-300 font-medium">
                <Award className="w-4 h-4 text-brand-gold" />
                <span>Prepare Smart. Get Into IIT.</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-gold">Study Hub</h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <Link href="/category/gate-biotechnology" className="hover:text-brand-azure transition-colors">
                  🧬 GATE Biotechnology Notes
                </Link>
              </li>
              <li>
                <Link href="/category/b-pharmacy-dbatu" className="hover:text-brand-azure transition-colors">
                  🎓 B.Pharmacy DBATU Notes
                </Link>
              </li>
              <li>
                <Link href="/papers" className="hover:text-brand-azure transition-colors">
                  🎓 All GATE Papers
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-brand-azure transition-colors">
                  📄 All PDF Downloads
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 GateBT Prep. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Students & Rankers
          </p>
        </div>
      </div>
    </footer>
  );
}
