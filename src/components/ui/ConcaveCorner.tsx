'use client';

/**
 * ConcaveCorner
 * Creates an inverted (concave) border-radius at junction points
 * where pills dock to the main container edge.
 *
 * Uses a radial-gradient mask to create the "inverse corner" effect.
 */

interface ConcaveCornerProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  color?: string;
  className?: string;
}

export default function ConcaveCorner({
  position,
  size = 16,
  color = '#FAFAFA',
  className = '',
}: ConcaveCornerProps) {
  const gradientPositions: Record<string, string> = {
    'top-left': 'circle at 0% 0%',
    'top-right': 'circle at 100% 0%',
    'bottom-left': 'circle at 0% 100%',
    'bottom-right': 'circle at 100% 100%',
  };

  return (
    <div
      className={`absolute pointer-events-none z-[6] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(${gradientPositions[position]}, transparent ${size}px, ${color} ${size}px)`,
      }}
    />
  );
}
