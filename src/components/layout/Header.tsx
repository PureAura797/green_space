'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Phone, Menu, X } from 'lucide-react';

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
        scrolled ? 'pt-3 px-4 md:px-6' : 'pt-4 px-4 md:px-8'
      }`}
    >
      <div className="flex justify-center w-full">
        <div
          className={`w-fit flex items-center gap-4 lg:gap-8 transition-all duration-500 ease-out bg-white/90 backdrop-blur-2xl rounded-full pl-6 pr-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] border border-black/5 ${
            scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
        {/* Logo — pill */}
        <Link
          href="/"
          className="font-semibold tracking-tight text-[#1D1D1F] text-base px-5 py-2"
        >
          ГОС_ЛЕНД
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[13px] font-medium text-[#1D1D1F]/55 hover:text-[#1D1D1F] hover:bg-black/[0.04] rounded-full px-4 py-2 transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side — pill buttons */}
        <div className="flex items-center gap-2">
          {/* Phone — icon pill */}
          <a
            href="tel:+79990000000"
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
              scrolled
                ? 'bg-[#F5F5F7] text-[#1D1D1F]/60 hover:bg-[#E8E8ED]'
                : 'bg-white/10 backdrop-blur-md border border-white/15 text-white/70 hover:bg-white/20'
            }`}
            title="+7 (999) 000-00-00"
          >
            <Phone size={16} strokeWidth={1.5} />
          </a>

          {/* CTA — pill */}
          <a
            href="#contacts"
            className={`text-[13px] font-semibold tracking-wide rounded-full transition-all duration-300 ${
              scrolled
                ? 'bg-[#1D1D1F] text-white px-5 py-2.5 hover:bg-[#1D1D1F]/85'
                : 'bg-white text-[#1D1D1F] px-5 py-2.5 hover:bg-white/90'
            }`}
          >
            Заявка
          </a>

          {/* Mobile Burger — pill */}
          <button
            className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${
              isOpen
                ? 'bg-[#F5F5F7] text-[#1D1D1F]'
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
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-20 bg-white/95 backdrop-blur-2xl flex flex-col px-6 pt-8 lg:hidden"
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
