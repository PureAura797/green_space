'use client';

import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

interface VelocityTextProps {
  children: React.ReactNode;
  className?: string;       // Usually used for font sizes and styles
  baseVelocity?: number;    // Usually 0, but can be set if you want a constant drift
  skewFactor?: number;      // How deeply it skews (e.g. 5)
}

export default function VelocityText({ 
  children, 
  className = "",
  skewFactor = 4
}: VelocityTextProps) {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth out the raw velocity with a spring so the text doesn't snap abruptly
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  // Map the velocity (-1000 to 1000 range) to a skew angle (-skewFactor to skewFactor)
  // When scrolling down (positive velocity), it skews right
  // When scrolling up (negative velocity), it skews left
  const skew = useTransform(smoothVelocity, [-1500, 1500], [skewFactor, -skewFactor]);
  
  // Map the absolute velocity to a slight stretch
  const scaleY = useTransform(smoothVelocity, [-1500, 0, 1500], [1.1, 1, 1.1]);

  return (
    <motion.div 
      style={{ skewX: skew, scaleY }}
      className={`origin-bottom ${className}`}
    >
      {children}
    </motion.div>
  );
}
