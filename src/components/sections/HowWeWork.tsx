'use client';

import { motion } from 'framer-motion';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

const STEPS = [
  {
    id: '01',
    title: 'Быстрая заявка',
    description: 'Оставьте заявку на сайте или позвоните. Ответим в течение 15 минут и сразу же согласуем удобное для вас время.',
    tag: 'до 15 мин',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  },
  {
    id: '02',
    title: 'Бесплатный осмотр',
    description: 'Бесплатный выезд специалиста-агронома для глубокой оценки состояния участка, точного объёма работ и подбора сертифицированных препаратов.',
    tag: '1 день',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
      </svg>
    ),
  },
  {
    id: '03',
    title: 'Эко-обработка',
    description: 'Проведём тщательную обработку в согласованное время премиальными препаратами IV класса с соблюдением абсолютно всех стандартов безопасности.',
    tag: 'от 2 часов',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
      </svg>
    ),
  },
  {
    id: '04',
    title: 'Официальная гарантия',
    description: 'Контроль результата через 7 дней. Бесплатная повторная обработка при любой необходимости в течение всего закрепленного гарантийного периода.',
    tag: 'защита 3 мес',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
  },
];

export default function HowWeWork() {
  return (
    <section className="relative py-24 lg:py-32 z-10 w-full overflow-hidden">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem baseY={20}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Процесс
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                Прозрачный процесс<br />
                <span className="text-black/30">работы</span>
              </h3>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem baseY={30} className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              От первой заявки до финального результата — всего 4 простых шага с прозрачной коммуникацией на каждом этапе.
            </p>
          </ScrollRevealItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {STEPS.map((step, index) => (
            <ScrollRevealItem
              key={step.id}
              className="relative flex flex-col p-6 lg:p-8 bg-white rounded-[32px] border border-black/5 hover:border-black/10 hover:-translate-y-2 transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] h-full"
            >
              {/* Header: Title & Big Number */}
              <div className="flex justify-between items-start mb-10 w-full">
                <h4 className="text-2xl font-black tracking-tight leading-[1.1] text-[#1D1D1F] max-w-[75%]">
                  {step.title}
                </h4>
                <div className="text-4xl lg:text-[44px] leading-none font-black text-black/10 tracking-tighter shrink-0 select-none">
                  {step.id}
                </div>
              </div>

              {/* Description */}
              <p className="text-[15px] font-medium text-black/50 leading-relaxed mb-auto pb-8">
                {step.description}
              </p>

              {/* Footer: Icon & Tag */}
              <div className="mt-8 pt-6 border-t border-black/5 flex justify-between items-center w-full">
                <div className="w-12 h-12 rounded-full bg-[#F5F5F0] flex items-center justify-center text-[#2D6A4F]">
                  {step.icon}
                </div>
                <div className="px-4 py-2 bg-[#F5F5F0] rounded-full text-[11px] font-bold uppercase tracking-widest text-[#1D1D1F]/50">
                  <span className="text-sm font-bold tracking-tight text-[#1D1D1F]">{step.tag}</span>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
