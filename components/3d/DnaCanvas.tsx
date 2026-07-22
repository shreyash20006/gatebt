'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function DnaCanvas() {
  const nodes = Array.from({ length: 16 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none">
      {/* Background Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#1CA3DC]/30 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#F6B10A]/20 blur-3xl"
      />

      {/* Floating Animated DNA Particle Helix Strands */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-3">
        {nodes.map((_, i) => {
          const delay = i * 0.15;
          const isLeft = i % 2 === 0;
          return (
            <div key={i} className="flex items-center gap-6 justify-center relative">
              <motion.div
                animate={{
                  x: isLeft ? [-14, 14, -14] : [14, -14, 14],
                  scale: isLeft ? [0.8, 1.2, 0.8] : [1.2, 0.8, 1.2],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
                className="w-3.5 h-3.5 rounded-full bg-[#1CA3DC] shadow-[0_0_10px_#1CA3DC]"
              />

              {/* Connecting DNA Base Pair Line */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scaleX: [0.7, 1.1, 0.7],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
                className="w-16 h-0.5 bg-gradient-to-r from-[#1CA3DC] via-white/40 to-[#F6B10A]"
              />

              <motion.div
                animate={{
                  x: isLeft ? [14, -14, 14] : [-14, 14, -14],
                  scale: isLeft ? [1.2, 0.8, 1.2] : [0.8, 1.2, 0.8],
                  opacity: [0.9, 0.4, 0.9],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay,
                }}
                className="w-3.5 h-3.5 rounded-full bg-[#F6B10A] shadow-[0_0_10px_#F6B10A]"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
