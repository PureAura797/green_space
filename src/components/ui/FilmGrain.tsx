'use client';

export default function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.035] mix-blend-difference overflow-hidden">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
