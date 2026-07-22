"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LibraryBig, FileQuestion, Heart, UserRound } from "lucide-react";

const items = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/library", label: "Library", Icon: LibraryBig },
  { href: "/pyq", label: "PYQs", Icon: FileQuestion },
  { href: "/saved", label: "Saved", Icon: Heart },
  { href: "/profile", label: "Profile", Icon: UserRound },
];

export default function MobileBottomNav() {
  const path = usePathname();
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 bg-white border-t border-slate-100 flex md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {items.map(({ href, label, Icon }) => {
        const active = path === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center py-2 text-[11px] ${
              active ? "text-[#1CA3DC] font-bold" : "text-slate-400"
            }`}
          >
            <Icon size={22} strokeWidth={active ? 2.5 : 2} /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
