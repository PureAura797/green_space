'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const SERVICES = [
  {
    id: '01',
    shortTitle: 'Клещи',
    title: 'Акарицидная обработка',
    description: 'Уничтожение клещей препаратами IV класса опасности. Безопасно для людей и животных. Действие до 3 месяцев.',
    price: 'от 3 500 ₽',
    image: '/images/services/ticks.png',
  },
  {
    id: '02',
    shortTitle: 'Борщевик',
    title: 'Уничтожение борщевика',
    description: 'Гербицидная обработка корневой системы. Гарантированное уничтожение за 1-2 этапа с предотвращением повторного роста.',
    price: 'от 4 000 ₽',
    image: '/images/services/hogweed.png',
  },
  {
    id: '03',
    shortTitle: 'Кроты',
    title: 'Отлов и отпугивание',
    description: 'Гуманный отлов и установка профессиональных систем отпугивания для защиты газона и корней растений.',
    price: 'от 2 500 ₽',
    image: '/images/services/moles.png',
  },
  {
    id: '04',
    shortTitle: 'Короед',
    title: 'Лечение от короеда',
    description: 'Стволовые инъекции и опрыскивание современными инсектицидами. Спасение хвойных и лиственных пород.',
    price: 'от 3 000 ₽',
    image: '/images/services/beetle.png',
  },
  {
    id: '05',
    shortTitle: 'Арбористика',
    title: 'Обрезка и спил деревьев',
    description: 'Санитарная и формовочная обрезка, удаление аварийных деревьев с использованием альпинистского снаряжения.',
    price: 'от 5 000 ₽',
    image: '/images/services/arboristics.png',
  },
  {
    id: '06',
    shortTitle: 'Лечение деревьев',
    title: 'Фитопатология',
    description: 'Диагностика и лечение болезней деревьев. Обработка ран, дупел, профилактика грибковых поражений.',
    price: 'от 4 000 ₽',
    image: '/images/services/tree_treatment.png',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-16 md:py-24 lg:py-32 border-b border-border bg-background">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 md:mb-0">
          Услуги
        </h2>
        <div className="md:w-1/3">
          <p className="text-foreground/70 text-base md:text-lg font-medium tracking-wide">
            Комплексные решения по защите вашей территории с гарантией результата.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {SERVICES.map((service, index) => (
          <motion.a
            key={service.id}
            href="#contacts"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '100px 0px' }}
            className="group relative flex flex-col border border-border bg-background overflow-hidden hover:border-foreground/30 transition-colors duration-500"
          >
            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              
              {/* Price badge */}
              <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 font-mono text-sm font-bold tracking-wider">
                {service.price}
              </div>

              {/* Number badge */}
              <div className="absolute top-4 left-4 font-mono text-xs tracking-widest text-background/80 bg-foreground/60 backdrop-blur-sm px-2 py-1">
                [{service.id}]
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-6 md:p-8">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tighter mb-2 group-hover:text-foreground transition-colors duration-300">
                {service.shortTitle}
              </h3>
              <p className="font-mono text-xs tracking-widest text-foreground/40 mb-4">
                {service.title}
              </p>
              <p className="text-sm text-foreground/60 leading-relaxed flex-1">
                {service.description}
              </p>

              {/* CTA hint */}
              <div className="mt-6 flex items-center gap-2 text-sm font-bold tracking-wider text-foreground/30 group-hover:text-foreground transition-colors">
                <span>Подробнее</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      </div>
    </section>
  );
}
