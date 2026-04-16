'use client';

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Phone, MessageCircle } from 'lucide-react';

const CHANNELS = [
  {
    id: 'max',
    label: 'MAX',
    href: '#max',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000" fill="currentColor">
        <path d="M512.095,308.192c-99.422-5.214-177.007,63.775-194.116,171.753 c-14.168,89.419,10.952,198.378,32.438,203.862 c9.113,2.326,31.044-14.448,46.999-29.494c3-2.829,7.536-3.305,11.053-1.154 c24.872,15.209,53.032,26.638,84.077,28.266 c102.069,5.352,192.52-74.531,197.866-176.608 C695.759,402.741,614.163,313.544,512.095,308.192z M345.605,826.578 c-3.849-2.725-9.153-1.986-12.379,1.455 c-43.12,45.99-153.474,78.25-158.529,15.48c0-49.18-11.046-90.623-23.208-136.252 c-14.895-55.885-31.465-118.049-31.465-208.398 c0-215.448,176.694-377.475,386.194-377.475S879.976,291.325,879.976,500.955 S710.49,876.337,508.201,876.337C436.434,876.337,401.607,866.228,345.605,826.578z"/>
      </svg>
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: 'https://t.me/goslend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
];

export default function MobileStickyCTA() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Show after scrolling past Hero (roughly 600px)
    if (latest > 600) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
      if (isOpen) setIsOpen(false); // Close menu if we scroll up
    }
  });

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-mobile-dock]')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  // Listen for Header mobile menu toggle
  useEffect(() => {
    const handleMenuToggle = (e: any) => {
      setIsMenuOpen(e.detail.isOpen);
      if (e.detail.isOpen) {
        setIsOpen(false); // Close CTA's own sub-menu if global menu opens
      }
    };
    document.addEventListener('mobile-menu-toggle', handleMenuToggle);
    return () => document.removeEventListener('mobile-menu-toggle', handleMenuToggle);
  }, []);

  return (
    <motion.div
      data-mobile-dock
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: (isVisible && !isMenuOpen) ? 0 : 100,
        opacity: (isVisible && !isMenuOpen) ? 1 : 0
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-4 left-4 right-4 z-[90] md:hidden pointer-events-none"
    >
      <div className="relative pointer-events-auto">
        
        {/* Expanded Chat Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute right-0 bottom-[100%] mb-3 flex flex-col gap-1 bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5 p-2 rounded-[24px]"
            >
              {CHANNELS.map((channel, index) => (
                <motion.a
                  key={channel.id}
                  href={channel.href}
                  target={channel.id !== 'phone' ? '_blank' : undefined}
                  rel={channel.id !== 'phone' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className="flex items-center gap-3 text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-black/[0.04] px-5 py-3 rounded-[16px] transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="opacity-80 transition-all duration-300">
                    {channel.icon}
                  </span>
                  <span className="font-semibold text-[13px] tracking-wide whitespace-nowrap">
                    {channel.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Dock */}
        <div className="flex gap-2 p-1.5 bg-white/70 backdrop-blur-xl border border-black/5 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
          
          {/* Scroll Up Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center justify-center w-14 h-14 bg-white text-[#1D1D1F] rounded-full hover:bg-[#F5F5F0] transition-colors duration-300 shadow-sm border border-black/5 active:scale-95 shrink-0"
            aria-label="Наверх"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="22" 
              height="22" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>
          </button>

          {/* Call CTA */}
          <a 
            href="tel:+79998959989"
            className="flex-1 flex items-center justify-center gap-2 h-14 bg-[#2D6A4F] text-white rounded-full font-bold text-[13px] tracking-wide uppercase hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <Phone strokeWidth={2} className="w-[18px] h-[18px]" />
            <span className="mt-0.5">ПОЗВОНИТЬ</span>
          </a>

          {/* Chat Menu Trigger Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 shrink-0 ${
              isOpen ? 'bg-white text-black rotate-45' : 'bg-[#1D1D1F] text-white hover:bg-black active:scale-[0.98]'
            }`}
          >
            {isOpen ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="22" 
                height="22" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <MessageCircle size={22} className="text-white" />
            )}
          </button>

        </div>
      </div>
    </motion.div>
  );
}
