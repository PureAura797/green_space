'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

export default function Footer() {
  // Easter Egg for developers inspecting the console
  useEffect(() => {
    console.log(
      '%c ✨ Design & Code by @asphxdel %c\n%c 🔗 https://t.me/asphxdel ',
      'color: #fff; background: #2D6A4F; font-size: 13px; font-family: monospace; padding: 4px 8px; border-radius: 6px; font-weight: bold; line-height: 2',
      '',
      'color: #2D6A4F; font-size: 11px; font-family: monospace; padding-left: 8px;'
    );
  }, []);

  return (
    <footer className="w-full bg-[#F5F5F0] px-4 md:px-8 pb-8 z-10 relative">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto bg-[#1D1D1F] text-white rounded-[40px] px-8 py-16 md:p-16 lg:p-20 shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 lg:gap-24">
          {/* Col 1 */}
          <ScrollRevealItem baseY={20} className="flex flex-col gap-8 max-w-sm">
            <Link href="/" className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white hover:text-white/80 transition-colors">
              ГОС_ЛЕНД
            </Link>
            <p className="text-white/50 text-base font-medium tracking-tight leading-relaxed">
              Профессиональная защита земельных участков и арбористика. Официальный договор и гарантия.
            </p>
          </ScrollRevealItem>

          {/* Nav & Info Columns */}
          <div className="flex flex-col sm:flex-row gap-16 md:gap-24 flex-1 justify-end">
            {/* Col 2: Nav */}
            <ScrollRevealItem baseY={30} className="flex flex-col gap-6">
              <h4 className="text-[11px] font-bold tracking-widest text-white/30 uppercase">Навигация</h4>
              <div className="flex flex-col gap-4">
                <Link href="#services" className="text-white/80 hover:text-white font-medium transition-colors">Услуги</Link>
                <Link href="#results" className="text-white/80 hover:text-white font-medium transition-colors">Результаты</Link>
                <Link href="#team" className="text-white/80 hover:text-white font-medium transition-colors">Команда</Link>
                <Link href="#reviews" className="text-white/80 hover:text-white font-medium transition-colors">Отзывы</Link>
                <Link href="#faq" className="text-white/80 hover:text-white font-medium transition-colors">FAQ</Link>
              </div>
            </ScrollRevealItem>

            {/* Col 3: Requisites */}
            <ScrollRevealItem baseY={40} className="flex flex-col gap-6">
              <h4 className="text-[11px] font-bold tracking-widest text-white/30 uppercase">Реквизиты</h4>
              <div className="flex flex-col gap-4 text-white/80 font-mono text-sm tracking-wide">
                <p>ИНН: <span className="text-white">7700000000</span></p>
                <p>ОГРН: <span className="text-white">1027700000000</span></p>
                <p>ОКВЭД: <span className="text-white">81.29.1</span></p>
              </div>
            </ScrollRevealItem>
          </div>
        </div>

        {/* Bottom Bar */}
        <ScrollRevealItem baseY={30} className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[12px] font-medium tracking-wider text-white/40 uppercase">
            © 2026 ГОС_ЛЕНД. Все права защищены.
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6 justify-center items-center">
            <Link href="#" className="text-[11px] font-bold tracking-widest text-white/30 hover:text-white uppercase transition-colors">
              Политика конфиденциальности
            </Link>
            <div className="w-1 h-1 rounded-full bg-white/10 hidden md:block" />
            <a 
              href="https://t.me/asphxdel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[11px] font-bold tracking-widest text-white/30 uppercase transition-colors group flex items-center gap-1.5"
            >
              <span>Made by</span>
              <span className="text-white/60 group-hover:text-[#2D6A4F] transition-colors">@asphxdel</span>
            </a>
          </div>
        </ScrollRevealItem>
      </ScrollRevealContainer>
    </footer>
  );
}
