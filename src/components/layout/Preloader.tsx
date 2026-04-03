'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = 'hidden';
    // Ensure we start at top of page so the hero video is loaded in view
    window.scrollTo(0, 0);

    let current = 0;
    const interval = setInterval(() => {
      // Non-linear progress simulation: fast start, slows down near end
      const remaining = 100 - current;
      const step = Math.max(1, Math.floor(remaining * 0.15));
      current += step;
      
      if (current >= 99) {
        current = 100;
        clearInterval(interval);
        
        // Hold at 100% for a beat before starting EXIT sequence
        setTimeout(() => setLoading(false), 400); 
        
        // Restore scroll after the exit animation completes (1.2s)
        setTimeout(() => {
          document.body.style.overflow = '';
        }, 1800);
      }
      setProgress(current);
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          // We keep the container around slightly longer than the hole animation to avoid flashing
          exit={{ opacity: 0, transition: { delay: 1.2, duration: 0.1 } }} 
          className="fixed inset-0 z-[9999] bg-transparent pointer-events-none select-none flex items-center justify-center"
        >
          {/* SVG Mask Layer */}
          <svg width="100%" height="100%" className="absolute inset-0 pointer-events-auto">
            <defs>
              <mask id="pill-mask">
                {/* White background means "keep this opaque" */}
                <rect width="100%" height="100%" fill="white" />
                {/* Black shape means "cut a hole here" */}
                <motion.rect
                  x="50%"
                  y="50%"
                  initial={{ 
                    width: 220, 
                    height: 80, 
                    translateX: "-50%", 
                    translateY: "-50%", 
                    rx: 40 
                  }}
                  animate={{ 
                    width: 220, 
                    height: 80, 
                    translateX: "-50%", 
                    translateY: "-50%", 
                    rx: 40 
                  }} // hold shape
                  exit={{ 
                    width: 4000, 
                    height: 4000, 
                    translateX: "-50%", 
                    translateY: "-50%", 
                    rx: 2000, 
                    transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } 
                  }}
                  fill="black"
                />
              </mask>
            </defs>
            {/* The actual solid cream screen that gets a hole punched in it */}
            <rect width="100%" height="100%" fill="#F5F5F0" mask="url(#pill-mask)" />
          </svg>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 } }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
            className="absolute z-10 flex items-center justify-center w-[220px] h-[80px] rounded-[40px] bg-black/50 backdrop-blur-sm pointer-events-none shadow-[0_0_40px_rgba(0,0,0,0.5)]"
          >
            <div className="font-mono font-medium text-[16px] tracking-[0.3em] text-white tabular-nums flex items-center gap-2 -mr-2">
              <span>{progress.toString().padStart(3, '0')}</span>
              <span className="text-white/40">%</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
