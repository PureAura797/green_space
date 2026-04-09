'use client';

import { motion } from 'framer-motion';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

const REVIEWS = [
  {
    id: 1,
    name: 'Игорь Дмитриевич',
    date: '12.05.2025',
    rating: '★★★★★',
    text: 'Обработали участок 20 соток от клещей. Работали в костюмах, профессиональным оборудованием. Результат отличный, клещей нет.'
  },
  {
    id: 2,
    name: 'Анна К.',
    date: '28.06.2025',
    rating: '★★★★★',
    text: 'Борщевик заполнял всю заднюю часть двора. Ребята приехали дважды с интервалом в месяц. Сейчас чистый газон, ни одного ростка.'
  },
  {
    id: 3,
    name: 'СНТ «Лесное»',
    date: '15.07.2025',
    rating: '★★★★★',
    text: 'Заключили договор на обслуживание общих территорий. Все четко, по графику, с предоставлением актов выполненных работ.'
  },
  {
    id: 4,
    name: 'Владимир',
    date: '02.08.2025',
    rating: '★★★★★',
    text: 'Вылечили три старые ели от короеда стволовыми инъекциями. Деревья ожили, хвоя перестала осыпаться. Огромное спасибо.'
  },
  {
    id: 5,
    name: 'Елена Маслова',
    date: '10.09.2025',
    rating: '★★★★★',
    text: 'Кроты изрыли весь газон, никакие отпугиватели из магазина не помогали. Специалисты КАРБОДЕЗ решили проблему за неделю.'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="relative py-24 lg:py-32 w-full z-10 overflow-hidden">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8 mb-16 flex flex-col md:flex-row justify-between items-end">
        <div className="max-w-2xl">
          <ScrollRevealItem baseY={20}>
            <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
              Отзывы
            </h2>
          </ScrollRevealItem>
          <ScrollRevealItem baseY={30}>
            <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
              Нам доверяют<br />
              <span className="text-black/30">клиенты</span>
            </h3>
          </ScrollRevealItem>
        </div>
      </ScrollRevealContainer>

      {/* Marquee Container */}
      <ScrollRevealItem baseY={50}>
        <div className="relative w-full flex overflow-hidden mask-image-edges">
          {/* First set */}
        <motion.div 
          className="flex shrink-0 w-max"
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {REVIEWS.map((review) => (
            <div 
              key={`set1-${review.id}`} 
              className="w-[85vw] md:w-[450px] flex-shrink-0 bg-white rounded-[32px] border border-black/5 p-8 md:p-10 mr-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="font-black text-[#2D6A4F] tracking-widest text-lg mb-4">{review.rating}</div>
                <p className="text-[17px] font-medium leading-relaxed text-[#1D1D1F]/80">
                  {review.text}
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-black/5 pt-6 mt-auto">
                <span className="font-bold tracking-tight text-[#1D1D1F]">{review.name}</span>
                <span className="text-[11px] font-bold tracking-widest text-black/40 uppercase">{review.date}</span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Second set for seamless loop */}
        <motion.div 
          className="flex shrink-0 w-max"
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {REVIEWS.map((review) => (
            <div 
              key={`set2-${review.id}`} 
              className="w-[85vw] md:w-[450px] flex-shrink-0 bg-white rounded-[32px] border border-black/5 p-8 md:p-10 mr-6 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="mb-6">
                <div className="font-black text-[#2D6A4F] tracking-widest text-lg mb-4">{review.rating}</div>
                <p className="text-[17px] font-medium leading-relaxed text-[#1D1D1F]/80">
                  {review.text}
                </p>
              </div>
              <div className="flex justify-between items-center border-t border-black/5 pt-6 mt-auto">
                <span className="font-bold tracking-tight text-[#1D1D1F]">{review.name}</span>
                <span className="text-[11px] font-bold tracking-widest text-black/40 uppercase">{review.date}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      </ScrollRevealItem>
      
      {/* Edge Gradients for Marquee */}
      <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#F5F5F0] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#F5F5F0] to-transparent z-10 pointer-events-none" />
    </section>
  );
}
