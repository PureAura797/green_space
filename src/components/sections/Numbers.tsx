'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

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
    <section className="bg-foreground text-background py-16 md:py-24 lg:py-32 border-b border-background/10">
      <div ref={ref} className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="flex flex-col gap-3"
            >
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter font-mono text-background">
                <CountUp target={stat.value} suffix={stat.suffix} triggered={isInView} />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm md:text-base font-bold tracking-wider text-background/90">
                  {stat.label}
                </span>
                <span className="font-mono text-xs tracking-widest text-background/40">
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
