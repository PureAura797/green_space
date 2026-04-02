'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

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
    rating: '5.0 / 5.0',
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
    rating: '5.0 / 5.0',
    text: 'Кроты изрыли весь газон, никакие отпугиватели из магазина не помогали. Специалисты ГОС_ЛЕНД решили проблему за неделю.'
  }
];

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-24 lg:py-32 border-b border-border bg-foreground text-background overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mb-16 flex flex-col md:flex-row justify-between items-end">
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter">
          Отзывы
        </h2>
        <p className="font-mono text-sm tracking-widest text-background/60 mt-6 md:mt-0">
          [ Мнение наших клиентов ]
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full flex overflow-hidden">
        {/* First set */}
        <motion.div 
          className="flex shrink-0 w-max"
          animate={{ x: "-100%" }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
        >
          {REVIEWS.map((review) => (
            <div 
              key={`set1-${review.id}`} 
              className="w-[85vw] md:w-[500px] flex-shrink-0 border border-background/20 p-8 md:p-12 mr-8 flex flex-col justify-between min-h-[300px]"
            >
              <div className="font-serif text-6xl text-background/20 absolute -z-10 -top-4 -left-2">«</div>
              <div className="mb-8 relative z-10 flex-1">
                <div className="font-mono text-background/50 mb-4">{review.rating}</div>
                <p className="text-lg md:text-xl font-medium tracking-tight">
                  {review.text}
                </p>
              </div>
              <div className="flex justify-between items-baseline border-t border-background/20 pt-6 mt-auto">
                <span className="font-bold tracking-wide">{review.name}</span>
                <span className="font-mono text-xs tracking-widest text-background/50">{review.date}</span>
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
              className="w-[85vw] md:w-[500px] flex-shrink-0 border border-background/20 p-8 md:p-12 mr-8 flex flex-col justify-between min-h-[300px]"
            >
              <div className="font-serif text-6xl text-background/20 absolute -z-10 -top-4 -left-2">«</div>
              <div className="mb-8 relative z-10 flex-1">
                <div className="font-mono text-background/50 mb-4">{review.rating}</div>
                <p className="text-lg md:text-xl font-medium tracking-tight">
                  {review.text}
                </p>
              </div>
              <div className="flex justify-between items-baseline border-t border-background/20 pt-6 mt-auto">
                <span className="font-bold tracking-wide">{review.name}</span>
                <span className="font-mono text-xs tracking-widest text-background/50">{review.date}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 mt-20 flex justify-center md:justify-start">
        <a href="#contacts" className="inline-flex items-center justify-center px-8 py-5 bg-background text-foreground text-sm font-bold tracking-widest uppercase hover:bg-zinc-200 transition-colors border border-background w-full md:w-auto relative z-10">
          [ Стать довольным клиентом → ]
        </a>
      </div>

      {/* Decorative vertical lines */}
      <div className="absolute top-0 right-0 w-[1px] h-full bg-background/10 hidden xl:block z-0" style={{ right: 'max(4vw, calc((100vw - 1400px) / 2))' }} />
      <div className="absolute top-0 left-0 w-[1px] h-full bg-background/10 hidden xl:block z-0" style={{ left: 'max(4vw, calc((100vw - 1400px) / 2))' }} />
    </section>
  );
}
