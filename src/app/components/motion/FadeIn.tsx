'use client';

import React from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
  as?: 'div' | 'section' | 'header';
}

/**
 * Scroll-reveal fade + slide-up wrapper.
 * Timing follows the UI Pro Max "Scroll Reveal / Subtle" preset (300-400ms, power1.out-equivalent easing).
 * Renders children statically (no animation) when the user prefers reduced motion.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 16,
  className,
  once = true,
  as = 'div'
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.01 : 0.35, delay, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-40px' }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
