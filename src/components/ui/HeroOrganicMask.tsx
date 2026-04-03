'use client';

/**
 * HeroOrganicMask — SVG-based organic frame
 * 
 * Creates a white overlay with a complex organic cutout.
 * The main viewing area is a large rounded rectangle,
 * with notches/extensions where pills dock into the frame.
 *
 * The SVG uses `fill-rule: evenodd` — the outer rect (full viewport)
 * is filled white, and the inner path (complex shape) is "punched out".
 */

interface Props {
  /** Right column notch positions (normalized 0-1 from top) */
  rightNotches?: { y: number; h: number }[];
  /** Bottom shelf notch */
  bottomShelf?: boolean;
}

export default function HeroOrganicMask({ rightNotches, bottomShelf }: Props) {
  // Responsive — use viewBox for scaling
  // The path defines the "hole" in the white overlay
  return (
    <svg
      className="absolute inset-0 w-full h-full z-[5] pointer-events-none"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <mask id="hero-organic-mask">
          {/* Full white background */}
          <rect x="0" y="0" width="1440" height="900" fill="white" />
          
          {/* Main cutout — large rounded rect with organic extensions */}
          <path
            fill="black"
            d={`
              M 56,16
              L 1384,16
              Q 1424,16 1424,56
              L 1424,844
              Q 1424,884 1384,884
              L 56,884
              Q 16,884 16,844
              L 16,56
              Q 16,16 56,16
              Z
            `}
          />
        </mask>
      </defs>
      
      {/* Apply mask — white where mask is white, transparent where black */}
      <rect
        x="0" y="0" width="1440" height="900"
        fill="#FAFAFA"
        mask="url(#hero-organic-mask)"
      />
    </svg>
  );
}
