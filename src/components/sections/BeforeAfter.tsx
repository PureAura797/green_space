'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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
    <section id="comparison" className="relative py-16 md:py-24 lg:py-32 px-4 md:px-8 border-b border-border bg-background overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-8 md:mb-0">
            Результаты
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-4 md:max-w-2xl justify-start md:justify-end">
            {SERVICES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveService(s)}
                className={cn(
                  "font-mono text-xs md:text-sm tracking-widest px-4 py-2 border transition-colors",
                  activeService.id === s.id 
                    ? "bg-foreground text-background border-foreground/30" 
                    : "bg-background text-foreground border-border hover:border-foreground/30"
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <p className="font-mono text-sm tracking-widest text-foreground/50 mb-8">
          [ {activeService.name} — до и после обработки ]
        </p>

        <div 
          ref={containerRef}
          className="relative w-full h-[50vh] md:h-[70vh] border border-border bg-zinc-200 overflow-hidden cursor-ew-resize"
        >
          {/* "Before" Image */}
          <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center transition-colors duration-500 overflow-hidden">
            <Image
              src={activeService.images.before}
              alt={`${activeService.name} ДО`}
              fill
              className="object-cover transition-opacity duration-300 pointer-events-none"
            />
            <div className="absolute top-6 left-6 font-mono text-xs tracking-widest bg-background/80 backdrop-blur px-3 py-2 uppercase z-10">
              ДО
            </div>
          </div>

          {/* "After" Image (Clipped) */}
          <motion.div 
            className="absolute inset-0 bg-background flex items-center justify-center border-l-0 overflow-hidden z-0"
            style={{ clipPath }}
          >
            <Image
              src={activeService.images.after}
              alt={`${activeService.name} ПОСЛЕ`}
              fill
              className="object-cover transition-opacity duration-300 pointer-events-none"
            />
            <div className="absolute top-6 right-6 font-mono text-xs tracking-widest bg-foreground text-background px-3 py-2 uppercase z-10">
              ПОСЛЕ
            </div>
            
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={activeService.id}
              className="absolute text-2xl md:text-4xl font-bold text-background uppercase tracking-tighter text-center px-4 bg-foreground/60 backdrop-blur-md py-4 w-full bottom-0 left-0"
            >
              {activeService.title}
            </motion.h3>
          </motion.div>

          {/* Slider Handle */}
          <motion.div
            className="absolute top-0 bottom-0 w-[2px] bg-foreground group z-10 origin-center"
            style={{ x }}
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0}
            dragMomentum={false}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-16 bg-foreground flex items-center justify-center gap-[2px] cursor-ew-resize">
              <span className="w-[1px] h-6 bg-background opacity-50 block" />
              <span className="w-[1px] h-6 bg-background opacity-50 block" />
              <span className="w-[1px] h-6 bg-background opacity-50 block" />
            </div>
          </motion.div>
        </div>

        <div className="mt-16 flex justify-center md:justify-start">
          <a href="#quiz" className="inline-flex items-center justify-center px-8 py-5 bg-foreground text-background text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors border border-foreground w-full md:w-auto">
            [ Рассчитать стоимость онлайн → ]
          </a>
        </div>
      </div>
    </section>
  );
}
