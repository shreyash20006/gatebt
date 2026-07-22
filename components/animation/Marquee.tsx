"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "349 PYQs",
  "26 Subject Notes",
  "26 Mind Maps",
  "22 Curated Resources",
  "30 Official GATE Papers",
  "Revised 2027 Syllabus",
  "Direct PDF Access",
  "100% Free",
];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-[#1CA3DC] py-3 overflow-hidden">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, ease: "linear", repeat: Infinity }}
      >
        {row.map((t, i) => (
          <span key={i} className="text-white font-semibold text-sm flex items-center gap-8">
            {t} <span className="text-[#F6B10A]">★</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
