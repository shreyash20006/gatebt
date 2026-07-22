'use client';

import { motion } from 'framer-motion';

interface RevealCardProps {
  children: React.ReactNode;
  index?: number;
  className?: string;
}

export function RevealCard({ children, index = 0, className = '' }: RevealCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
