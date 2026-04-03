'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  baseY?: number;
  once?: boolean;
}

export function ScrollRevealContainer({ 
  children, 
  className, 
  staggerChildren = 0.1, 
  delay = 0,
  once = true 
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay,
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({ 
  children, 
  className, 
  baseY = 40 
}: ScrollRevealProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: baseY, filter: 'blur(4px)' },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          transition: { type: "spring", stiffness: 100, damping: 20 } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0,
  baseY = 50,
  once = true 
}: ScrollRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10%" }}
      variants={{
        hidden: { opacity: 0, y: baseY, filter: 'blur(4px)' },
        visible: { 
          opacity: 1, 
          y: 0, 
          filter: 'blur(0px)',
          transition: { type: "spring", stiffness: 100, damping: 20, delay } 
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
