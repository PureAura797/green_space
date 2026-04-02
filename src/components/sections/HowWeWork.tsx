'use client';

import { motion } from 'framer-motion';

const STEPS = [
  {
    id: '01',
    title: 'Заявка',
    description: 'Оставьте заявку на сайте или позвоните. Ответим в течение 15 минут и согласуем удобное время.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Осмотр',
    description: 'Бесплатный выезд специалиста для оценки состояния участка, объёма работ и подбора препаратов.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Обработка',
    description: 'Проведём обработку в согласованное время сертифицированными препаратами с соблюдением всех стандартов.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Гарантия',
    description: 'Контроль результата через 7 дней. Повторная обработка бесплатно при необходимости в гарантийный период.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-surface py-16 md:py-24 lg:py-32 border-b border-border">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 md:mb-0">
            Как мы работаем
          </h2>
          <div className="md:w-1/3">
            <p className="text-foreground/70 text-base md:text-lg font-medium tracking-wide">
              От заявки до результата — 4 простых шага с гарантией на каждом этапе.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '100px 0px' }}
              className="relative flex flex-col p-6 md:p-8 border border-border bg-background group hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-500"
            >
              {/* Step number */}
              <span className="font-mono text-xs tracking-widest text-foreground/40 group-hover:text-background/50 transition-colors mb-6">
                [{step.id}]
              </span>

              {/* Icon */}
              <div className="text-foreground group-hover:text-background transition-colors mb-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-foreground/60 group-hover:text-background/70 transition-colors leading-relaxed">
                {step.description}
              </p>

              {/* Connector line (desktop only) */}
              {index < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-[1px] w-8 h-[1px] bg-border group-hover:bg-background/30 z-10 transition-colors" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
