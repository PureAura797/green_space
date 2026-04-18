'use client';

import { useEffect } from 'react';
import { Send, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { company } from '@/lib/site-data';

const SERVICES = [
  { label: 'Клещи', desc: 'от 3 500 ₽' },
  { label: 'Борщевик', desc: 'от 4 000 ₽' },
  { label: 'Кроты', desc: 'от 4 000 ₽' },
  { label: 'Короед', desc: 'от 6 000 ₽' },
  { label: 'Комары', desc: 'от 3 500 ₽' },
];

type HeroService = typeof SERVICES[number];

const ACCENT = '#2D6A4F';
const FRAME_BG = '#F5F5F0';

/* ═══ ANIMATIONS ═══ */
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};
const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

/* ═══ GEOMETRY: FILLET CORNERS ═══ */
function Fillet({ position, size = 32, className = '', color = '#F5F5F0' }: { position: 'tl' | 'tr' | 'bl' | 'br'; size?: number; className?: string; color?: string }) {
  const gradients: Record<string, string> = {
    tl: `radial-gradient(circle at 100% 100%, transparent ${size}px, ${color} ${size}px)`,
    tr: `radial-gradient(circle at 0% 100%, transparent ${size}px, ${color} ${size}px)`,
    bl: `radial-gradient(circle at 100% 0%, transparent ${size}px, ${color} ${size}px)`,
    br: `radial-gradient(circle at 0% 0%, transparent ${size}px, ${color} ${size}px)`,
  };
  return (
    <div
      className={`absolute pointer-events-none z-[10] ${className}`}
      style={{ width: size, height: size, background: gradients[position] }}
    />
  );
}

function FloatingPointer({
  service,
  className = '',
  lineClass,
  reverse = false,
}: {
  service: HeroService;
  className?: string;
  lineClass?: string;
  reverse?: boolean;
}) {
  return (
    <motion.div
      variants={fadeScale}
      className={`relative z-[10] flex items-center gap-3 group cursor-pointer pointer-events-auto ${reverse ? 'flex-row-reverse' : ''} ${className}`}
    >
      <div className="flex items-center gap-2.5 bg-white px-4 py-2.5 rounded-full transition-all duration-300 group-hover:bg-[#F5F5F0] group-hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        {/* Minimalist Accent Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
        <span className="text-[#1D1D1F] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.15em] whitespace-nowrap">
          {service.label} <span className="opacity-40 font-bold ml-1">{service.desc}</span>
        </span>
      </div>
      <div className={`h-[1.5px] bg-white transition-colors group-hover:bg-white/70 ${lineClass}`} style={{ boxShadow: '0 0 8px rgba(0,0,0,0.2)' }} />
      <div className={`w-2 h-2 rounded-full bg-white transition-transform group-hover:scale-150 shadow-md`} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HERO SECTION — GLITCH REFERENCE 1:1
   ═══════════════════════════════════════════ */
export default function Hero() {
  // Deferred video load: set src AFTER page paint, then autoplay
  useEffect(() => {
    const video = document.getElementById('hero-bg-video') as HTMLVideoElement;
    if (!video) return;

    const loadAndPlay = () => {
      if (!video.src || !video.src.includes('hero_bg')) {
        video.src = '/videos/hero_bg.mp4';
      }
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    // Delay video load slightly so the UI paints first
    const timerId = window.setTimeout(loadAndPlay, 800);

    // Also try on first interaction (iOS Low Power Mode fallback)
    window.addEventListener('scroll', loadAndPlay, { once: true, passive: true });
    window.addEventListener('touchstart', loadAndPlay, { once: true, passive: true });
    window.addEventListener('click', loadAndPlay, { once: true, passive: true });

    return () => {
      window.clearTimeout(timerId);
      window.removeEventListener('scroll', loadAndPlay);
      window.removeEventListener('touchstart', loadAndPlay);
      window.removeEventListener('click', loadAndPlay);
    };
  }, []);

  return (
    <section className="relative w-full h-[100svh] p-4 lg:p-6 overflow-hidden flex flex-col" style={{ backgroundColor: FRAME_BG }}>
      {/* 
        MAIN CONTAINER (The "Black" Video Area)
        Everything is mapped inside this perfectly rounded container 
      */}
      <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-[#111] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
        
        {/* Z-0: Poster background (instant paint) + deferred video */}
        <div 
          className="absolute inset-0 w-full h-full z-0 opacity-90 pointer-events-none bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/videos/01_ticks.png)' }}
          dangerouslySetInnerHTML={{
            __html: `<video id="hero-bg-video" class="w-full h-full object-cover" poster="/images/videos/01_ticks.png" autoplay loop muted playsinline preload="metadata"></video>`
          }}
        />
        
        {/* Z-1: Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[1]" />

        {/* ═══════════════════════════════════════════
            WHITE PROTRUSIONS (Bento Cavities)
            ═══════════════════════════════════════════ */}

        {/* 1. TOP-LEFT: Logo / Branding Area */}
        <div className="absolute top-0 left-0 rounded-br-[32px] h-[72px] lg:h-[100px] flex items-center pl-6 pr-8 z-[10]" style={{ backgroundColor: FRAME_BG }}>
           <span className="text-xl lg:text-3xl font-black tracking-tighter text-[#1D1D1F] flex flex-col leading-[0.85] lg:leading-[0.85]">
             <span>{company.logoLine1}</span>
             <span>{company.logoLine2}</span>
           </span>
           <Fillet position="tl" size={32} className="-bottom-[32px] left-0" color={FRAME_BG} />
           <Fillet position="tl" size={32} className="top-0 -right-[32px]" color={FRAME_BG} />
        </div>

        {/* 2. TOP-RIGHT: Navigation & Contact Pill */}
        <div className="absolute top-0 right-0 rounded-bl-[32px] h-[72px] lg:h-[100px] flex items-center px-4 lg:px-8 gap-3 lg:gap-4 z-[10]" style={{ backgroundColor: FRAME_BG }}>
           <div className="hidden lg:flex items-center gap-7 mr-2 text-[13px] font-semibold tracking-wide uppercase text-black/60">
             <a href="#services" className="hover:text-black transition-colors">Услуги</a>
             <a href="#about" className="hover:text-black transition-colors">О нас</a>
             <a href="#faq" className="hover:text-black transition-colors">Вопросы</a>
           </div>
           
           <a href={company.telegramUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:scale-105 hover:bg-[#111] transition-transform shrink-0 shadow-lg">
             <Send className="w-[18px] h-[18px] -ml-0.5" />
           </a>

           <a href={company.maxUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center w-12 h-12 bg-black text-white rounded-full hover:scale-105 hover:bg-[#111] transition-transform shrink-0 shadow-lg">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1000 1000" fill="currentColor">
                <path d="M512.095,308.192c-99.422-5.214-177.007,63.775-194.116,171.753 c-14.168,89.419,10.952,198.378,32.438,203.862 c9.113,2.326,31.044-14.448,46.999-29.494c3-2.829,7.536-3.305,11.053-1.154 c24.872,15.209,53.032,26.638,84.077,28.266 c102.069,5.352,192.52-74.531,197.866-176.608 C695.759,402.741,614.163,313.544,512.095,308.192z M345.605,826.578 c-3.849-2.725-9.153-1.986-12.379,1.455 c-43.12,45.99-153.474,78.25-158.529,15.48c0-49.18-11.046-90.623-23.208-136.252 c-14.895-55.885-31.465-118.049-31.465-208.398 c0-215.448,176.694-377.475,386.194-377.475S879.976,291.325,879.976,500.955 S710.49,876.337,508.201,876.337C436.434,876.337,401.607,866.228,345.605,826.578z"/>
             </svg>
           </a>
           
           <a href={`tel:${company.phone}`} className="hidden sm:flex items-center justify-center h-12 px-7 text-white rounded-full text-[14px] font-bold tracking-wider hover:brightness-110 transition-all shadow-lg" style={{ backgroundColor: ACCENT }}>
             {company.phoneDisplay}
           </a>
           
           <Fillet position="tr" size={32} className="-bottom-[32px] right-0" color={FRAME_BG} />
           <Fillet position="tr" size={32} className="top-0 -left-[32px]" color={FRAME_BG} />
        </div>

        {/* 3. BOTTOM-RIGHT: Trust Badges - PURE TYPOGRAPHY AESTHETIC */}
        <div className="hidden lg:flex absolute bottom-0 right-0 rounded-tl-[32px] p-6 lg:p-8 flex-col gap-5 w-[360px] z-[10]" style={{ backgroundColor: FRAME_BG }}>
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: ACCENT }}>
             Рейтинг подрядчика
           </h3>
           
           {/* Pure Typography Trust Badge 1 */}
           <div className="relative overflow-hidden flex flex-col justify-center gap-1.5 px-6 py-5 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-transform hover:-translate-y-1 h-[110px]">
              <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] relative z-10 w-full flex justify-between items-center">
                 Рейтинг Авито
                 <div className="flex gap-0.5 opacity-80">
                   {[1, 2, 3, 4, 5].map((i) => (
                     <svg key={i} className={`w-3.5 h-3.5 ${i === 5 ? 'text-black/10' : 'text-[#2D6A4F]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                   ))}
                 </div>
              </span>
              <div className="flex items-end gap-2 relative z-10">
                 <span className="text-[48px] font-black text-[#1D1D1F] leading-[0.85] tracking-tight">4.9</span>
                 <span className="text-xs font-bold text-black/20 pb-1 mb-0.5">/ 5.0</span>
              </div>
           </div>

           {/* Pure Typography Trust Badge 2 */}
           <div className="relative overflow-hidden flex flex-col justify-center gap-1.5 px-6 py-5 bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-black/[0.03] transition-transform hover:-translate-y-1 h-[110px]">
              <span className="text-[10px] font-black text-black/40 uppercase tracking-[0.2em] relative z-10 w-full flex justify-between items-center">
                 Рейтинг Яндекс
                 <div className="flex gap-0.5 opacity-80">
                   {[1, 2, 3, 4, 5].map((i) => (
                     <svg key={i} className={`w-3.5 h-3.5 ${i === 5 ? 'text-black/10' : 'text-[#2D6A4F]'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                   ))}
                 </div>
              </span>
              <div className="flex items-end gap-2 relative z-10">
                 <span className="text-[48px] font-black text-[#1D1D1F] leading-[0.85] tracking-tight">4.8</span>
                 <span className="text-xs font-bold text-black/20 pb-1 mb-0.5">/ 5.0</span>
              </div>
           </div>

           <Fillet position="br" size={32} className="-top-[32px] right-0" color={FRAME_BG} />
           <Fillet position="br" size={32} className="bottom-0 -left-[32px]" color={FRAME_BG} />
        </div>

        {/* ═══════════════════════════════════════════
            MAIN CONTENT (Center-Left)
            ═══════════════════════════════════════════ */}
        <motion.div 
          variants={stagger} 
          initial="hidden" 
          animate="visible" 
          className="absolute left-4 right-4 lg:right-auto lg:left-16 bottom-[4%] lg:bottom-auto lg:top-[calc(50%+48px)] lg:-translate-y-1/2 z-[10] max-w-3xl pointer-events-none"
        >
           <motion.div variants={fadeUp} className="mb-3 lg:mb-6 pointer-events-auto flex flex-wrap gap-2 lg:gap-3">
             <div className="inline-flex items-center bg-white shadow-xl rounded-full px-4 py-2 transition-transform hover:scale-[1.02]">
               <span className="text-[10px] lg:text-[11px] text-[#1D1D1F] font-black tracking-[0.15em] lg:tracking-[0.2em] uppercase">
                 Москва и Область
               </span>
             </div>
             <div className="inline-flex items-center bg-[#1D1D1F] border-2 border-white/10 shadow-xl rounded-full px-4 py-2 transition-transform hover:scale-[1.02]">
               <span className="text-[10px] lg:text-[11px] text-white font-black tracking-[0.15em] lg:tracking-[0.2em] uppercase">
                 Выезд за 2 часа
               </span>
             </div>
           </motion.div>

           <motion.h1 
             variants={fadeUp} 
             className="text-[36px] min-[375px]:text-[42px] sm:text-[68px] lg:text-[96px] font-black text-white leading-[1.05] tracking-[-0.03em] mb-3 lg:mb-6 break-words hyphens-auto"
             style={{ textShadow: '0 4px 60px rgba(0,0,0,0.5)' }}
           >
             Безопасность<br/>вашего<br/>
             <span className="text-transparent bg-clip-text pr-2" style={{ backgroundImage: 'linear-gradient(to right, #ffffff, rgba(255,255,255,0.5))' }}>
               участка<span style={{ color: ACCENT }}>.</span>
             </span>
           </motion.h1>

           <motion.p
             variants={fadeUp}
             className="text-white/80 text-[14px] sm:text-[18px] max-w-[480px] leading-relaxed font-medium mb-4 lg:mb-10"
             style={{ textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
           >
             Профессиональная защита территорий. 
             Фиксируем цену в договоре <span className="text-white font-bold">от 3 500 ₽</span>{' '}
             с гарантией результата до 3 лет.
           </motion.p>


            {/* Phone number — prominent for elderly users */}
            <motion.a
              variants={fadeUp}
              href={`tel:${company.phone}`}
              className="inline-flex items-center gap-3 text-white/90 hover:text-white text-[18px] sm:text-[24px] font-bold tracking-wide mb-4 lg:mb-8 pointer-events-auto transition-colors duration-300 group"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
            >
              <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center shrink-0 group-hover:bg-white/25 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              {company.phoneDisplay}
            </motion.a>
           <motion.div variants={fadeUp} className="bg-white/95 backdrop-blur-xl p-2 sm:p-2.5 rounded-[32px] sm:rounded-full shadow-[0_20px_80px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pointer-events-auto sm:w-fit w-full">
             <a 
               href="#contacts"
               className="group relative overflow-hidden flex items-center justify-between h-[52px] lg:h-[68px] pl-6 pr-2 lg:pl-8 lg:pr-2.5 rounded-full bg-[#2D6A4F] text-white font-bold text-[13px] lg:text-[15px] uppercase tracking-[0.1em] transition-all hover:bg-[#245640] active:scale-95 sm:w-auto w-full" 
             >
               {/* Rolling Text Wrapper */}
               <div className="relative overflow-hidden inline-flex items-center h-[20px] mr-6">
                 <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                   Рассчитать стоимость
                 </span>
                 <span className="absolute inset-0 flex items-center justify-start translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" aria-hidden="true">
                   Рассчитать стоимость
                 </span>
               </div>
               <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] rounded-full bg-white flex items-center justify-center shrink-0 shadow-md transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45">
                 <ArrowUpRight className="w-5 h-5 text-[#2D6A4F]" strokeWidth={2.5} />
               </div>
             </a>
             <a 
               href="#services"
               className="group relative overflow-hidden flex items-center justify-between h-[52px] lg:h-[68px] pl-6 pr-2 lg:pl-8 lg:pr-2.5 rounded-full bg-[#1D1D1F] text-white font-bold text-[13px] lg:text-[15px] uppercase tracking-[0.1em] transition-all hover:bg-black active:scale-95 sm:w-auto w-full"
             >
               {/* Rolling Text Wrapper */}
               <div className="relative overflow-hidden inline-flex items-center h-[20px] mr-6">
                 <span className="block transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                   Наши цены
                 </span>
                 <span className="absolute inset-0 flex items-center justify-start translate-y-[120%] transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0" aria-hidden="true">
                   Наши цены
                 </span>
               </div>
               <div className="w-[44px] h-[44px] lg:w-[48px] lg:h-[48px] rounded-full bg-white/10 flex items-center justify-center shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-45 group-hover:bg-white">
                 <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#1D1D1F] transition-colors duration-300" strokeWidth={2.5} />
               </div>
             </a>
           </motion.div>
        </motion.div>

         <div className="hidden lg:flex absolute top-[15vh] right-[5%] lg:right-[8%] z-[5] pointer-events-none flex-col gap-10 items-end">
             <FloatingPointer service={SERVICES[0]} lineClass="w-12" />
             <FloatingPointer service={SERVICES[1]} lineClass="w-[80px]" />
             <FloatingPointer service={SERVICES[2]} lineClass="w-16" />
             <FloatingPointer service={SERVICES[3]} lineClass="w-[100px]" />
             <FloatingPointer service={SERVICES[4]} lineClass="w-[60px]" />
         </div>

      </div>
    </section>
  );
}
