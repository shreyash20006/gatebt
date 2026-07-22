import Logo from "@/components/brand/Logo";
import { Youtube, Instagram, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0B2A63] text-white mt-16">
      <div className="max-w-6xl mx-auto px-5 py-10 grid gap-6 sm:grid-cols-3">
        <div>
          <div className="bg-white inline-block rounded-lg p-2">
            <Logo h={40} />
          </div>
          <p className="mt-3 text-sm text-white/70">Your Notes. Your Success.</p>
          <p className="text-sm text-[#F6B10A]">Prepare Smart. Get Into IIT.</p>
        </div>
        <div className="text-sm space-y-2">
          <p className="font-semibold text-[#1CA3DC]">Explore</p>
          <a href="/library" className="block text-white/80 hover:text-white transition-colors">
            Library
          </a>
          <a href="/pyq" className="block text-white/80 hover:text-white transition-colors">
            PYQs
          </a>
          <a href="/resources" className="block text-white/80 hover:text-white transition-colors">
            Resources
          </a>
          <a href="/papers" className="block text-white/80 hover:text-white transition-colors">
            GATE Papers
          </a>
        </div>
        <div className="text-sm space-y-3">
          <p className="font-semibold text-[#1CA3DC]">Connect</p>
          <a
            href="mailto:gatebt@outlook.com"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <Mail size={16} /> gatebt@outlook.com
          </a>
          <div className="flex items-center gap-3">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-red-400 transition-colors"
            >
              <Youtube size={20} />
            </a>
            <a
              href="https://www.instagram.com/gatebt_prep/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-pink-400 transition-colors"
            >
              <Instagram size={20} />
            </a>
          </div>
          <p className="text-white/60">@gatebt_prep</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {new Date().getFullYear()} GateBT Prep · Made for GATE Biotechnology aspirants
      </div>
    </footer>
  );
}
