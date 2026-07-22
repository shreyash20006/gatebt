"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export default function AnimatedCounter({
  to,
  target,
  label,
  suffix = "",
}: {
  to?: number;
  target?: number;
  label?: string;
  suffix?: string;
}) {
  const finalValue = to ?? target ?? 0;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let cur = 0;
    const step = Math.max(1, finalValue / 40);
    const id = setInterval(() => {
      cur += step;
      if (cur >= finalValue) {
        setN(finalValue);
        clearInterval(id);
      } else {
        setN(Math.floor(cur));
      }
    }, 25);
    return () => clearInterval(id);
  }, [inView, finalValue]);

  return (
    <div ref={ref} className="text-center inline-block">
      <span className="text-3xl sm:text-4xl font-extrabold text-[#0B2A63]">
        {n}
        {suffix}
      </span>
      {label && <p className="text-xs sm:text-sm text-slate-500 mt-1">{label}</p>}
    </div>
  );
}
