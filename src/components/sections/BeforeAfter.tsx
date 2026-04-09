'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const SERVICES = [
  { id: 'ticks', name: 'Клещи', title: 'Территория без клещей', images: { before: '/images/before-after/ticks-before.png', after: '/images/before-after/ticks-after.png' } },
  { id: 'hogweed', name: 'Борщевик', title: 'Чистый газон', images: { before: '/images/before-after/hogweed-before.png', after: '/images/before-after/hogweed-after.png' } },
  { id: 'moles', name: 'Кроты', title: 'Ровный участок', images: { before: '/images/before-after/moles-before.png', after: '/images/before-after/moles-after.png' } },
  { id: 'bark_beetle', name: 'Короед', title: 'Здоровые деревья', images: { before: '/images/before-after/beetle-before.png', after: '/images/before-after/beetle-after.png' } },
  { id: 'arboristics', name: 'Спил деревьев', title: 'Безопасный участок', images: { before: '/images/before-after/tree-before.png', after: '/images/before-after/tree-after.png' } },
];

export default function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const x = useMotionValue(0);
  const [activeService, setActiveService] = useState(SERVICES[0]);

  // Default to 50%
  useEffect(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
      x.set(width / 2);
    }

    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
        const relative = x.get() / containerWidth;
        x.set(width * (Number.isNaN(relative) ? 0.5 : relative));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [x, containerWidth]);

  const clipPath = useTransform(x, (val) => `inset(0 0 0 ${val}px)`);

  return (
    <section id="comparison" className="relative py-24 lg:py-32 w-full z-10 overflow-hidden">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl mb-8 md:mb-0">
            <ScrollRevealItem baseY={20}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Сравнение
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                Непревзойденный<br />
                <span className="text-black/30">результат</span>
              </h3>
            </ScrollRevealItem>
          </div>

          <ScrollRevealItem baseY={30} className="flex flex-wrap gap-2 md:gap-3 justify-start md:justify-end md:max-w-xl">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s)}
                className={cn(
                  "text-[13px] font-bold tracking-wide px-5 py-2.5 rounded-full transition-all duration-300",
                  activeService.id === s.id 
                    ? "bg-[#1D1D1F] text-white shadow-lg" 
                    : "bg-white text-black/60 hover:text-black hover:bg-black/5 shadow-sm border border-black/5"
                )}
              >
                {s.name}
              </button>
            ))}
          </ScrollRevealItem>
        </div>

        {/* Interactive Slider Container */}
        <ScrollRevealItem baseY={40} className="relative w-full h-[50vh] md:h-[70vh] rounded-[32px] md:rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] bg-zinc-200 overflow-hidden border border-black/5" >
          <div ref={containerRef} className="relative w-full h-full overflow-hidden cursor-ew-resize rounded-[32px] md:rounded-[40px]">
            {/* "Before" Image */}
            <div className="absolute inset-0 bg-black/5 flex items-center justify-center transition-colors duration-500 overflow-hidden">
              <Image
                src={activeService.images.before}
                alt={`${activeService.name} ДО`}
                fill
                sizes="100vw"
                className="object-cover transition-opacity duration-300 pointer-events-none"
              />
              <div className="absolute top-6 left-6 font-bold text-[11px] tracking-widest text-[#1D1D1F] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full uppercase shadow-sm z-10 border border-white/20">
                Было
              </div>
            </div>

            {/* "After" Image (Clipped) */}
            <motion.div 
              className="absolute inset-0 bg-[#F5F5F0] flex items-center justify-center overflow-hidden z-0"
              style={{ clipPath }}
            >
              <Image
                src={activeService.images.after}
                alt={`${activeService.name} ПОСЛЕ`}
                fill
                sizes="100vw"
                className="object-cover transition-opacity duration-300 pointer-events-none"
              />
              <div className="absolute top-6 right-6 font-bold text-[11px] tracking-widest text-white bg-[#2D6A4F]/80 backdrop-blur-md px-4 py-2 rounded-full uppercase shadow-sm z-10 border border-[#2D6A4F]/20">
                Стало
              </div>
              
              {/* Title Overlay on the After side */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={activeService.id}
                className="absolute bottom-6 inset-x-0 mx-auto w-fit z-10"
              >
                <h3 className="text-xl md:text-3xl font-black text-white px-8 py-4 bg-black/30 backdrop-blur-md rounded-full border border-white/10 shadow-xl tracking-tight leading-none text-center">
                  {activeService.title}
                </h3>
              </motion.div>
            </motion.div>

            {/* Slider Handle Loop */}
            <motion.div
              className="absolute top-0 bottom-0 w-[2px] bg-white group z-10 origin-center cursor-ew-resize shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              style={{ x }}
              drag="x"
              dragConstraints={containerRef}
              dragElastic={0}
              dragMomentum={false}
            >
              {/* Pill shaped handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.15)] cursor-ew-resize border border-black/5 hover:scale-110 transition-transform duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" className="text-black/30 w-full px-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l-4 3 4 3m8-6l4 3-4 3" />
                </svg>
              </div>
              <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-[#1D1D1F] -translate-x-1/2" />
            </motion.div>
          </div>
        </ScrollRevealItem>
      </ScrollRevealContainer>
    </section>
  );
}
