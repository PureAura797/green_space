'use client';

export default function FixedVideoBackground() {
  return (
    <div 
      className="fixed inset-0 w-full h-full -z-10" 
      aria-hidden="true"
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/hero_poster.jpg"
        className="w-full h-full object-cover"
        style={{ willChange: 'transform' }}
      >
        <source src="/videos/hero_bg.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
