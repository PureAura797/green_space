'use client';

import { useRef, useState } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({
  children,
  className = "",
  intensity = 10, // Max rotation angle
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // -1 to 1 normalized mouse position (-1 is left/top edge, 0 is center, 1 is right/bottom)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Smooth the mouse values
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  // Map mouse positions to rotation angles
  const rotateX = useTransform(springY, [-1, 1], [intensity, -intensity]);
  const rotateY = useTransform(springX, [-1, 1], [-intensity, intensity]);

  // Map mouse position to glare/highlight position
  const glareX = useTransform(springX, [-1, 1], ["0%", "100%"]);
  const glareY = useTransform(springY, [-1, 1], ["0%", "100%"]);
  
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Normalize to -1 to 1
    const xPct = (mouseX / rect.width) * 2 - 1;
    const yPct = (mouseY / rect.height) * 2 - 1;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Reset back to 0 (flat)
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => setIsHovered(true);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000
      }}
      className={`relative rounded-[inherit] ${className}`}
    >
      <div 
        className="w-full h-full rounded-[inherit] overflow-hidden" 
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </div>

      {/* Dynamic Specular Glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-50 rounded-[inherit] mix-blend-soft-light transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.8 : 0,
          background: glareBackground,
        }}
      />
    </motion.div>
  );
}
