'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StoreGridProps {
  children: React.ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function StoreGrid({ children, columns = 3, className = '' }: StoreGridProps) {
  const colStyles = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`grid gap-4 ${colStyles} ${className}`}
    >
      {children}
    </motion.div>
  );
}
