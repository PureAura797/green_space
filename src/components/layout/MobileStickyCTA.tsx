'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Phone } from 'lucide-react';

export default function MobileStickyCTA() {
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Intersection Observer to detect #contacts
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsContactVisible(entry.isIntersecting);
        }
      },
      { 
        rootMargin: "0px 0px 100px 0px", // Trigger slightly before it fully appears
        threshold: 0.1 
      }
    );

    // Give the DOM a moment to render #contacts if needed
    setTimeout(() => {
      const contactEl = document.getElementById('contacts');
      if (contactEl) observer.observe(contactEl);
    }, 1000);

    return () => observer.disconnect();
  }, []);

  // Show only after scrolling past the 500px mark 
  const opacity = useTransform(scrollY, [0, 400, 500], [0, 0, 1]);
  // Use a hack for pointer-events since useTransform doesn't perfectly type string values in all Framer Motion versions
  const y = useTransform(scrollY, [0, 400, 500], [100, 100, 0]);

  if (!isMounted) return null;

  return (
    <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out pointer-events-none ${isContactVisible ? 'translate-y-[120%] opacity-0' : 'translate-y-0 opacity-100'}`}>
      <motion.div 
        style={{ opacity, y }} 
        className="px-4 pb-6 pt-10 bg-gradient-to-t from-background/90 via-background/60 to-transparent pointer-events-none"
      >
        <a 
          href="#contacts" 
          className="flex flex-row items-center justify-between w-full py-2.5 pl-8 pr-2.5 bg-[#1D1D1F] text-white text-[13px] font-bold tracking-widest uppercase rounded-[32px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] pointer-events-auto active:scale-[0.98] transition-transform"
        >
          <span>[ Оставить заявку ]</span>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <Phone size={16} className="text-white opacity-80" strokeWidth={1.5} />
          </div>
        </a>
      </motion.div>
    </div>
  );
}
