'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface ScrubbingTextProps {
  text: string;
  className?: string;
}

export default function ScrubbingText({ 
  text, 
  className = "" 
}: ScrubbingTextProps) {
  const container = useRef<HTMLParagraphElement>(null);
  
  // This calculates how far the container is scrolled into view
  // 'start 85%' means the animation begins when the top of the container hits 85% of the viewport height
  // 'end 40%' means the animation finishes when the bottom of the container hits 40% of the viewport
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 85%", "end 40%"]
  });

  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        // The end is slightly past the start so each word fades in quickly when its mapped progress is reached
        const end = start + (1 / words.length);
        
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ 
  children, 
  progress, 
  range 
}: { 
  children: string; 
  progress: MotionValue<number>; 
  range: [number, number];
}) {
  // Map the global scroll progress of the container to this specific word's opacity
  // So when `progress` hits the `start` value, opacity goes from 0.1 to 1
  const opacity = useTransform(progress, range, [0.1, 1]);
  
  return (
    <span className="relative mr-[0.25em] mb-[0.1em]">
      {/* Background shadow word (dim) */}
      <span className="absolute opacity-[0.15]">{children}</span>
      {/* Foreground word (lit up) */}
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
