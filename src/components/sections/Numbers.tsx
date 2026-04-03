'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrubbingText from '@/components/ui/ScrubbingText';

const STATS = [
  { value: 1500, suffix: '+', label: 'Участков обработано', description: 'За всё время работы' },
  { value: 12, suffix: '', label: 'Лет опыта', description: 'На рынке с 2014 года' },
  { value: 98, suffix: '%', label: 'Довольных клиентов', description: 'Возвращаются к нам снова' },
  { value: 4.9, suffix: '', label: 'Средний рейтинг', description: 'На Яндекс и Google' },
];

function CountUp({ target, suffix, triggered }: { target: number; suffix: string; triggered: boolean }) {
  const [count, setCount] = useState(0);
  const isDecimal = target % 1 !== 0;

  useEffect(() => {
    if (!triggered) return;

    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      // easeOutExpo curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      current = target * progress;

      if (step >= steps) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [triggered, target]);

  const display = isDecimal ? count.toFixed(1) : Math.floor(count).toLocaleString('ru-RU');

  return (
    <span className="tabular-nums">
      {display}{suffix}
    </span>
  );
}

export default function Numbers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '100px 0px' });

  return (
    <section className="relative z-10 w-full px-4 md:px-8 max-w-[1400px] mx-auto py-16 lg:py-24">
      <div ref={ref} className="bg-[#1D1D1F] rounded-[32px] sm:rounded-[48px] p-8 md:p-16 lg:p-20 text-white overflow-hidden shadow-2xl relative">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        
        <div className="mb-20 max-w-4xl relative z-10">
          <ScrubbingText 
            text="Мы удаляем проблему, а не симптомы. Комплексная зачистка территорий от клещей, короеда, ос, комаров, кротов и борщевика с гарантией на весь сезон по ГОСТ 12.1.007-76."
            className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative z-10">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="text-[56px] sm:text-[64px] lg:text-[80px] font-black tracking-tighter text-white leading-none mb-4">
                <CountUp target={stat.value} suffix={stat.suffix} triggered={isInView} />
              </div>
              <div className="flex flex-col gap-2 border-t border-white/20 pt-4 mt-auto">
                <span className="text-sm md:text-base font-bold tracking-tight text-white">
                  {stat.label}
                </span>
                <span className="text-xs font-medium tracking-wide text-white/50">
                  {stat.description}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
