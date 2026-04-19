'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { company } from '@/lib/site-data';

const CHANNELS = [
  {
    id: 'max',
    label: 'MAX',
    href: company.maxUrl,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1000 1000" fill="currentColor">
        <path d="M512.095,308.192c-99.422-5.214-177.007,63.775-194.116,171.753
	c-14.168,89.419,10.952,198.378,32.438,203.862
	c9.113,2.326,31.044-14.448,46.999-29.494c3-2.829,7.536-3.305,11.053-1.154
	c24.872,15.209,53.032,26.638,84.077,28.266
	c102.069,5.352,192.52-74.531,197.866-176.608
	C695.759,402.741,614.163,313.544,512.095,308.192z M345.605,826.578
	c-3.849-2.725-9.153-1.986-12.379,1.455
	c-43.12,45.99-153.474,78.25-158.529,15.48c0-49.18-11.046-90.623-23.208-136.252
	c-14.895-55.885-31.465-118.049-31.465-208.398
	c0-215.448,176.694-377.475,386.194-377.475S879.976,291.325,879.976,500.955
	S710.49,876.337,508.201,876.337C436.434,876.337,401.607,866.228,345.605,826.578z"/>
      </svg>
    ),
  },
  {
    id: 'telegram',
    label: 'Telegram',
    href: company.telegramUrl,
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z"/></svg>
    ),
  },
];

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  // Show after scrolling past Hero (~100vh)
  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsVisible(latest > window.innerHeight * 0.8);
    });
    return () => unsubscribe();
  }, [scrollY]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-floating-contact]')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            data-floating-contact
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 max-md:hidden"
          >
            {/* Expanded menu */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-1 mb-4 bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5 p-2 rounded-[24px]"
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
                      className="flex items-center gap-3 text-[#1D1D1F]/70 hover:text-[#1D1D1F] hover:bg-black/[0.04] px-4 py-3 rounded-[16px] transition-all duration-200 group"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
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

            {/* Main FAB button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`
                relative w-14 h-14 flex items-center justify-center rounded-full
                transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                ${isOpen 
                  ? 'bg-white text-[#1D1D1F] rotate-45' 
                  : 'bg-[#1D1D1F] text-white hover:bg-black hover:scale-105'
                }
              `}
              aria-label="Связаться с нами"
            >
              {/* MAX / Close icon */}
              <div className={`transition-transform duration-300 flex items-center justify-center ${isOpen ? 'rotate-[0deg]' : ''}`}>
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
              </div>

              {/* Pulse ring when closed */}
              {!isOpen && (
                <span className="absolute inset-0 rounded-full animate-ping bg-foreground/20 pointer-events-none" style={{ animationDuration: '2s' }} />
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-6 z-40 max-md:hidden"
          >
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative w-14 h-14 flex items-center justify-center rounded-full bg-white text-[#1D1D1F] hover:bg-[#F5F5F0] transition-colors duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5 active:scale-95"
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
