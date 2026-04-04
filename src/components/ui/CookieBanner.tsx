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
          className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-8 sm:left-8 z-[100] max-w-[360px] pointer-events-auto"
        >
          <div className="bg-[#1D1D1F] p-6 lg:p-8 rounded-[32px] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-white/5 flex flex-col gap-4">
            <h4 className="text-white font-black uppercase tracking-[0.15em] text-[11px] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse shadow-[0_0_8px_rgba(45,106,79,1)]" />
              Файлы Cookie
            </h4>
            <p className="text-white/60 text-[13px] leading-relaxed font-medium">
              Мы используем cookie. Они помогают сайту работать быстрее, а нам — собирать обезличенную аналитику для улучшения сервиса (согласно 152-ФЗ).
            </p>
            <div className="flex items-center gap-3 mt-2">
              <button
                onClick={handleAccept}
                className="w-full bg-white hover:bg-[#F5F5F0] text-[#1D1D1F] font-bold text-[12px] lg:text-[13px] uppercase tracking-[0.1em] py-4 rounded-full transition-all active:scale-95 shadow-[0_10px_20px_rgba(255,255,255,0.1)]"
              >
                Принять все
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
