'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { company } from '@/lib/site-data';

const NAV_LINKS = [
  { name: 'Услуги', href: '#services' },
  { name: 'Стоимость', href: '#pricing' },
  { name: 'Команда', href: '#team' },
  { name: 'Отзывы', href: '#reviews' },
  { name: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body scroll lock and broadcast menu state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { isOpen: true } }));
    } else {
      document.body.style.overflow = '';
      document.dispatchEvent(new CustomEvent('mobile-menu-toggle', { detail: { isOpen: false } }));
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out px-4 md:px-8 ${
        scrolled ? 'pt-3' : 'pt-4'
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto relative">
        
        {/* Left Island — Logo */}
        <div className={`transition-all duration-500 ease-out ${scrolled || isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'}`}>
          <Link
            href="/"
            className={`inline-flex flex-col justify-center font-black tracking-tighter leading-[0.9] text-[#1D1D1F] text-[12px] px-6 h-[52px] rounded-full transition-all duration-500 ${
              isOpen 
                ? 'bg-transparent shadow-none border-transparent' 
                : 'bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5'
            }`}
          >
            <span>{company.logoLine1}</span>
            <span>{company.logoLine2}</span>
          </Link>
        </div>

        {/* Center Island — Desktop Nav */}
        <nav 
          className={`hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-[2px] px-2 h-[52px] rounded-full transition-all duration-500 ease-out ${
            scrolled && !isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
          } bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 h-10 flex items-center rounded-full text-[13px] font-semibold text-[#1D1D1F]/55 hover:text-[#1D1D1F] hover:bg-black/[0.04] transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Island — Actions */}
        <div 
          className={`flex items-center gap-1.5 p-1.5 h-[52px] rounded-full transition-all duration-500 ease-out ${
            scrolled || isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
          } ${
            isOpen 
              ? 'bg-transparent shadow-none border-transparent' 
              : 'bg-white/90 backdrop-blur-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5'
          }`}
        >
          {/* Phone — icon pill */}
          <a
            href={`tel:${company.phone}`}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-[#F5F5F7] text-[#1D1D1F]/60 hover:bg-[#E8E8ED]'
                : 'bg-white/10 backdrop-blur-md border border-white/15 text-white/70 hover:bg-white/20'
            }`}
            title={company.phoneDisplay}
          >
            <Phone size={16} strokeWidth={1.5} />
          </a>

          {/* CTA — button pill */}
          <a
            href="#contacts"
            className={`hidden sm:flex items-center justify-center text-[13px] font-bold tracking-wide rounded-full transition-all duration-300 h-10 px-5 ${
              scrolled
                ? 'bg-[#1D1D1F] text-white hover:bg-black'
                : 'bg-white text-[#1D1D1F] hover:bg-white/90'
            }`}
          >
            Рассчитать
          </a>

          {/* Mobile Burger — icon pill */}
          <button
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 flex-shrink-0 ${
              isOpen
                ? 'bg-black/5 text-[#1D1D1F]'
                : scrolled
                  ? 'bg-[#F5F5F7] text-[#1D1D1F]/60'
                  : 'bg-white/10 backdrop-blur-md border border-white/15 text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} strokeWidth={1.5} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 -z-10 bg-[#F5F5F0]/95 flex flex-col px-6 pt-32 lg:hidden w-full h-[100dvh]"
            style={{ position: 'fixed' }}
          >
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-4 text-2xl font-semibold text-[#1D1D1F]/90 hover:text-[#1D1D1F] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto mb-12 flex flex-col gap-5">
              <a href={`tel:${company.phone}`} className="text-xl font-mono tracking-wider text-[#1D1D1F]/50">
                {company.phoneDisplay}
              </a>
              <Link
                href="#contacts"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-[#1D1D1F] text-white text-center text-sm font-semibold tracking-wide rounded-full"
              >
                Заказать звонок
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
