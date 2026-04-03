'use client';

import { type LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BentoServicePillProps {
  icon: LucideIcon;
  label: string;
  price: string;
  /** horizontal = pill shape, vertical = card shape */
  variant?: 'horizontal' | 'vertical';
  /** Animation delay in seconds */
  delay?: number;
  /** Show inner dot-grid decoration */
  showPattern?: boolean;
  className?: string;
}

export default function BentoServicePill({
  icon: Icon,
  label,
  price,
  variant = 'horizontal',
  delay = 0,
  showPattern = false,
  className = '',
}: BentoServicePillProps) {
  if (variant === 'vertical') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.10)' }}
        className={`
          relative overflow-hidden rounded-[22px] p-5
          bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]
          cursor-default transition-shadow duration-300
          hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]
          ${className}
        `}
      >
        {/* Optional inner dot pattern */}
        {showPattern && (
          <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`pill-dots-${label}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.5" fill="white" opacity="0.12" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#pill-dots-${label})`} />
          </svg>
        )}

        <div className="relative z-10">
          <div className="w-11 h-11 rounded-full bg-white/[0.08] border border-white/[0.06] flex items-center justify-center mb-4">
            <Icon size={20} strokeWidth={1.2} className="text-white/70" />
          </div>
          <p className="text-[15px] font-semibold text-white/90 mb-1">{label}</p>
          <p className="text-[12px] text-white/40 font-medium">{price}</p>
        </div>
      </motion.div>
    );
  }

  // Horizontal pill
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.10)' }}
      className={`
        flex items-center gap-3 rounded-full pl-2 pr-5 py-2
        bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]
        cursor-default transition-shadow duration-300
        hover:shadow-[0_4px_20px_rgba(0,0,0,0.15)]
        ${className}
      `}
    >
      <div className="w-10 h-10 rounded-full bg-white/[0.08] border border-white/[0.06] flex items-center justify-center shrink-0">
        <Icon size={18} strokeWidth={1.2} className="text-white/70" />
      </div>
      <div>
        <p className="text-[13px] font-semibold text-white/90">{label}</p>
        <p className="text-[11px] text-white/40 font-medium">{price}</p>
      </div>
    </motion.div>
  );
}
