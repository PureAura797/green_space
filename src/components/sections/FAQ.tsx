'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    id: '01',
    question: 'Опасны ли препараты для домашних животных?',
    answer: 'Мы используем сертифицированные препараты IV класса опасности (малоопасные). После обработки участка и высыхания раствора (обычно 2-3 часа) территория полностью безопасна для людей и питомцев.'
  },
  {
    id: '02',
    question: 'Как подготовить участок к обработке?',
    answer: 'Необходимо убрать детские игрушки, посуду, садовый инвентарь и мангал. Закрыть окна в доме. С животными лучше прогуляться за пределами участка во время распыления и до полного высыхания.'
  },
  {
    id: '03',
    question: 'Через сколько погибнет борщевик?',
    answer: 'Видимые результаты (пожелтение и увядание листьев) появляются на 5-7 день после гербицидной обработки. Полная гибель корневой системы происходит в течение 3-4 недель.'
  },
  {
    id: '04',
    question: 'Есть ли гарантия на ваши услуги?',
    answer: 'Да, мы предоставляем официальную гарантию по договору. На акарицидную обработку — до 3 месяцев (на весь сезон), на уничтожение борщевика — 1 год. При повторном появлении проблемы в гарантийный период выезд специалиста бесплатен.'
  },
  {
    id: '05',
    question: 'Можете ли вы спилить дерево над домом?',
    answer: 'Да, наши арбористы специализируются на удалении деревьев в стесненных условиях. Мы спиливаем дерево по частям, аккуратно спуская каждую ветку на веревках, что исключает повреждение крыши, фасада или забора.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <section id="faq" className="py-16 md:py-24 lg:py-32 border-b border-border bg-background">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 relative">
            FAQ
            <span className="absolute -top-4 -right-4 font-mono text-sm tracking-widest text-foreground/50 hidden md:block">
              [ ВОПРОС-ОТВЕТ ]
            </span>
          </h2>
          <p className="font-mono text-sm tracking-widest text-foreground/60 lg:max-w-xs mt-12">
            Ответы на самые частые вопросы о подготовке участка, гарантиях и безопасности.
          </p>
        </div>

        <div className="lg:w-2/3 border-t border-border">
          {FAQS.map((faq, index) => (
            <div key={faq.id} className="border-b border-border group">
              <button
                className="w-full py-8 flex items-center justify-between text-left hover:text-foreground/70 transition-colors duration-300"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex items-baseline gap-6 pr-8">
                  <span className="font-mono text-xs tracking-widest text-foreground/40 group-hover:text-foreground/60 transition-colors">
                    [{faq.id}]
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">
                    {faq.question}
                  </h3>
                </div>
                <div className="font-mono text-2xl relative w-4 h-4 flex items-center justify-center shrink-0">
                  <span className={cn("absolute bg-foreground w-4 h-[2px] transition-transform duration-300", 
                    openIndex === index ? "rotate-180 bg-foreground" : "")} />
                  <span className={cn("absolute bg-foreground w-[2px] h-4 transition-transform duration-300", 
                    openIndex === index ? "rotate-90 bg-foreground opacity-0" : "")} />
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 pr-12 text-lg text-foreground/70 font-medium leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <div className="mt-16 flex justify-center lg:justify-start">
            <a href="#contacts" className="inline-flex items-center justify-center px-8 py-5 bg-foreground text-background text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors border border-foreground w-full md:w-auto">
              [ Задать свой вопрос → ]
            </a>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
