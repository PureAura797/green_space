'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Услуги', href: '#services' },
  { name: 'Стоимость', href: '#pricing' },
  { name: 'Результаты', href: '#results' },
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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? 'px-4 md:px-6 pt-3' : 'px-0 pt-0'
      }`}
    >
      {/* Floating pill — centered, max-width constrained */}
      <div
        className={`max-w-[1400px] mx-auto transition-all duration-500 ease-out ${
          scrolled
            ? 'rounded-2xl bg-white/85 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)]'
            : 'rounded-none'
        }`}
      >
        <div className="px-5 md:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-lg md:text-xl font-semibold tracking-tight relative z-50 transition-colors duration-500 ${
              scrolled ? 'text-[#1D1D1F]' : 'text-white'
            }`}
          >
            ГОС_ЛЕНД
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-[13px] font-medium transition-colors duration-300 ${
                  scrolled
                    ? 'text-[#1D1D1F]/60 hover:text-[#1D1D1F]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Contact & CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href="tel:+79990000000"
              className={`text-[13px] font-mono tracking-wider transition-colors duration-300 ${
                scrolled ? 'text-[#1D1D1F]/45 hover:text-[#1D1D1F]' : 'text-white/50 hover:text-white'
              }`}
            >
              +7 (999) 000-00-00
            </a>
            <a
              href="#contacts"
              className={`text-[13px] font-semibold tracking-wide px-5 py-2 rounded-full transition-all duration-300 ${
                scrolled
                  ? 'bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/85'
                  : 'bg-white/15 backdrop-blur-sm text-white border border-white/20 hover:bg-white/25'
              }`}
            >
              Заявка
            </a>
          </div>

          {/* Mobile Burger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative gap-[5px]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={`block w-5 h-[1.5px] transition-all duration-300 ${
                  isOpen ? 'bg-[#1D1D1F]' : scrolled ? 'bg-[#1D1D1F]' : 'bg-white'
                } ${i === 0 && isOpen ? 'rotate-45 translate-y-[6.5px]' : ''}
                  ${i === 1 && isOpen ? 'opacity-0' : ''}
                  ${i === 2 && isOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-white/95 backdrop-blur-2xl flex flex-col pt-24 px-6 lg:hidden"
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
              <a href="tel:+79990000000" className="text-xl font-mono tracking-wider text-[#1D1D1F]/50">
                +7 (999) 000-00-00
              </a>
              <Link
                href="#contacts"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-[#1D1D1F] text-white text-center text-sm font-semibold tracking-wide rounded-2xl"
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
