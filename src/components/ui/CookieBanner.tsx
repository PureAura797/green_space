'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem('goslend_cookie_consent');
    if (!consent) {
      // Delay to avoid blocking the initial impression of the Hero section
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('goslend_cookie_consent', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-1/2 sm:bottom-6 z-[100] w-[calc(100%-16px)] sm:w-auto max-w-2xl pointer-events-auto"
          style={{ x: '-50%' }}
        >
          <div className="bg-[#1D1D1F]/90 backdrop-blur-xl p-3 sm:pr-3 sm:pl-6 rounded-2xl sm:rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-white/10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
            <div className="flex items-center gap-3 text-left w-full sm:w-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34C759] animate-pulse shrink-0" />
              <p className="text-white/70 text-[11px] sm:text-[12px] leading-snug font-medium line-clamp-2 sm:line-clamp-1">
                Мы используем файлы cookie (согласно 152-ФЗ) для улучшения работы сайта.
              </p>
            </div>
            
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto shrink-0 bg-white hover:bg-neutral-200 text-[#1D1D1F] font-bold text-[10px] sm:text-[11px] uppercase tracking-widest px-6 py-2.5 rounded-xl sm:rounded-full transition-all active:scale-95 whitespace-nowrap"
            >
              Хорошо
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
