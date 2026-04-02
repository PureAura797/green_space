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
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-2xl shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl md:text-2xl font-semibold tracking-tight relative z-50">
          ГОС_ЛЕНД
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Contact & CTA */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+79990000000"
            className="text-sm font-mono tracking-wider text-foreground/60 hover:text-foreground transition-colors"
          >
            +7 (999) 000-00-00
          </a>
          <a
            href="#contacts"
            className="text-sm font-semibold tracking-wide bg-foreground text-background px-6 py-2.5 rounded-full hover:bg-foreground/85 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
          >
            Заявка
          </a>
        </div>

        {/* Mobile Burger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative gap-[6px] rounded-full hover:bg-foreground/5 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-transform duration-300 ${
              isOpen ? 'rotate-45 translate-y-[7.5px]' : ''
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-opacity duration-300 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-transform duration-300 ${
              isOpen ? '-rotate-45 -translate-y-[7.5px]' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 w-full h-screen bg-background/95 backdrop-blur-2xl flex flex-col pt-24 px-6 lg:hidden"
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
                    className="block py-4 text-2xl font-semibold text-foreground/90 hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
              >
                <Link
                  href="#contacts"
                  onClick={() => setIsOpen(false)}
                  className="block py-4 text-2xl font-semibold text-foreground/90 hover:text-foreground transition-colors"
                >
                  Контакты
                </Link>
              </motion.div>
            </nav>
            <div className="mt-auto mb-12 flex flex-col gap-5">
              <a href="tel:+79990000000" className="text-xl font-mono tracking-wider text-foreground/60">
                +7 (999) 000-00-00
              </a>
              <Link
                href="#contacts"
                onClick={() => setIsOpen(false)}
                className="w-full py-4 bg-foreground text-background text-center text-sm font-semibold tracking-wide rounded-full hover:bg-foreground/85 transition-colors"
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
