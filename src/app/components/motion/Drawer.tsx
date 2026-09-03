'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Animated backdrop + slide-in panel for the mobile nav drawer.
 * Wrap the conditional render in <AnimatePresence> from the caller so
 * the exit animation plays before unmount.
 */
export function DrawerBackdrop({
  className,
  onClick,
  children
}: {
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export function DrawerPanel({
  className,
  onClick,
  children
}: {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      onClick={onClick}
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
