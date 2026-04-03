'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import VelocityText from '@/components/ui/VelocityText';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

const FAQS = [
  {
    id: '01',
    question: 'Вредна ли обработка от клещей для моей собаки или кота?',
    answer: 'Нет, мы используем современные премиальные препараты. Уже через 2 часа после высыхания раствора по траве можно смело бегать босиком, а питомцам — безопасно играть на газоне.'
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
    question: 'Если аварийное дерево нависает прямо над крышей дома?',
    answer: 'Мы работаем методом промышленного альпинизма. Дерево спиливается по небольшим частям сверху вниз, и каждая ветка аккуратно спускается на веревках. Ваша крыша, провода и газон будут в полной безопасности. Весь риск возможного ущерба мы берем на себя по договору.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  return (
    <section id="faq" className="relative py-24 lg:py-32 w-full z-10 overflow-hidden">
      <ScrollRevealContainer className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Header Column */}
          <div className="lg:w-1/3">
            <ScrollRevealItem baseY={20}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                FAQ
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <VelocityText skewFactor={4}>
                <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F] mb-6">
                  Частые<br />
                  <span className="text-black/30">вопросы</span>
                </h3>
              </VelocityText>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={40}>
              <p className="text-[#1D1D1F]/60 text-base font-medium tracking-tight leading-relaxed max-w-sm mb-12 lg:mb-0">
                Постарались ответить на самые важные вопросы о подготовке участка, гарантиях и безопасности для вас и ваших близких.
              </p>
            </ScrollRevealItem>
          </div>

          {/* Accordion Bento Block */}
          <ScrollRevealItem baseY={40} className="lg:w-2/3 bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 p-6 md:p-12 overflow-hidden">
            {FAQS.map((faq, index) => (
              <div key={faq.id} className="border-b border-black/5 last:border-0 group">
                <button
                  className="w-full py-6 md:py-8 flex items-start md:items-center justify-between text-left transition-colors duration-300"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-start md:items-center gap-4 md:gap-8 pr-6 md:pr-8">
                    <span className="text-[10px] font-bold tracking-widest text-[#2D6A4F] bg-[#2D6A4F]/10 px-3 py-1.5 rounded-full shrink-0">
                      Q {faq.id}
                    </span>
                    <h3 className={cn("text-[19px] md:text-2xl font-black tracking-tight leading-tight transition-colors", openIndex === index ? "text-[#1D1D1F]" : "text-[#1D1D1F]/80 group-hover:text-[#1D1D1F]")}>
                      {faq.question}
                    </h3>
                  </div>
                  
                  <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 border transition-all duration-500", openIndex === index ? "bg-[#1D1D1F] border-[#1D1D1F] text-white rotate-45" : "bg-transparent border-black/10 text-black/40 group-hover:border-black/30")}>
                    <Plus size={20} />
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
                      <div className="pb-8 pt-2 md:pl-24 pr-4 md:pr-16">
                        <p className="text-base md:text-lg text-black/60 font-medium leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </ScrollRevealItem>
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
