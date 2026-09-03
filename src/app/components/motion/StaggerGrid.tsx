'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  staggerDelay?: number;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.02 }
  })
};

/**
 * Wraps a grid/list of cards with a staggered entrance (UI Pro Max
 * "Stagger List / Subtle" preset: ~250-350ms per item, gentle ease-out).
 * Each direct child is animated individually via StaggerItem.
 */
export default function StaggerGrid({ children, className, style, staggerDelay = 0.045 }: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={containerVariants}
      custom={shouldReduceMotion ? 0 : staggerDelay}
    >
      {children}
    </motion.div>
  );
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
};

export function StaggerItem({
  children,
  className,
  style
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div className={className} style={style} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
