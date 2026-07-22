import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold">
                🧬
              </div>
              <span className="text-xl font-bold text-white">GateBT Prep</span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Open-access handwritten study notes, question banks, mind maps, and previous year papers for GATE Biotechnology and B.Pharmacy DBATU students. 100% Free & Direct Downloads.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/category/gate-biotechnology" className="hover:text-emerald-400 transition-colors">
                  🧬 GATE Biotechnology
                </Link>
              </li>
              <li>
                <Link href="/category/b-pharmacy-dbatu" className="hover:text-emerald-400 transition-colors">
                  🎓 B.Pharmacy DBATU
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-emerald-400 transition-colors">
                  📁 All Resources Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">About</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-3">
              Notes are contributed by top rankers and educators for educational reference only. No login or subscription required.
            </p>
            <span className="inline-block px-2.5 py-1 rounded bg-emerald-950/80 text-emerald-400 text-xs border border-emerald-800/50">
              ⚡ Direct PDF Downloads
            </span>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} GateBT Prep. All rights reserved.</p>
          <p className="text-slate-400">Made for Students & Aspirants</p>
        </div>
      </div>
    </footer>
  );
}
