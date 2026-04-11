"use client";

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export default function FadeInWhenVisible({
  children,
  delay = 0,
  y = 20,
  className,
}: FadeInWhenVisibleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
