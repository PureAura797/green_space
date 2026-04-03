'use client';

interface DecorativeOvalProps {
  className?: string;
  /** Gradient variant */
  variant?: 'silver' | 'muted' | 'accent';
  /** Size preset */
  size?: 'sm' | 'md' | 'lg';
}

const VARIANTS = {
  silver: 'from-white/[0.08] via-white/[0.04] to-transparent',
  muted: 'from-white/[0.05] via-white/[0.02] to-transparent',
  accent: 'from-emerald-400/[0.06] via-white/[0.03] to-transparent',
};

const SIZES = {
  sm: 'w-[180px] h-[100px]',
  md: 'w-[280px] h-[160px]',
  lg: 'w-[400px] h-[220px]',
};

export default function DecorativeOval({
  className = '',
  variant = 'silver',
  size = 'md',
}: DecorativeOvalProps) {
  return (
    <div
      className={`
        ${SIZES[size]} 
        rounded-[50%] 
        bg-gradient-to-br ${VARIANTS[variant]}
        border border-white/[0.06]
        blur-[1px]
        pointer-events-none
        ${className}
      `}
      aria-hidden="true"
    />
  );
}
