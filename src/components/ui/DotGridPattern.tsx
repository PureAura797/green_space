export default function DotGridPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hero-dot-grid"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="white" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
      </svg>
    </div>
  );
}
