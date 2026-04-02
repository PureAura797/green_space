'use client';

import { motion } from 'framer-motion';

const PRICING = [
  {
    service: 'Клещи',
    subtitle: 'Акарицидная обработка',
    prices: [
      { area: 'до 10 соток', price: '3 500' },
      { area: '10 — 30 соток', price: '5 000' },
      { area: '30+ соток', price: '8 000' },
    ],
  },
  {
    service: 'Борщевик',
    subtitle: 'Гербицидная обработка',
    prices: [
      { area: 'до 10 соток', price: '4 000' },
      { area: '10 — 30 соток', price: '7 000' },
      { area: '30+ соток', price: '12 000' },
    ],
  },
  {
    service: 'Кроты',
    subtitle: 'Отлов и отпугивание',
    prices: [
      { area: '1 нора', price: '2 500' },
      { area: 'Весь участок', price: '5 000' },
      { area: 'Комплексно', price: '8 000' },
    ],
  },
  {
    service: 'Короед',
    subtitle: 'Стволовые инъекции',
    prices: [
      { area: '1 дерево', price: '3 000' },
      { area: '3 — 5 деревьев', price: '7 500' },
      { area: '5+ деревьев', price: 'Договорная' },
    ],
  },
  {
    service: 'Арбористика',
    subtitle: 'Обрезка и спил',
    prices: [
      { area: 'Обрезка', price: '5 000' },
      { area: 'Спил дерева', price: '15 000' },
      { area: 'Корчевание', price: '8 000' },
    ],
  },
  {
    service: 'Лечение деревьев',
    subtitle: 'Фитопатология',
    prices: [
      { area: '1 дерево', price: '4 000' },
      { area: '3 — 5 деревьев', price: '10 000' },
      { area: '5+ деревьев', price: 'Договорная' },
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-foreground text-background py-16 md:py-24 lg:py-32 border-b border-background/10">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-6 md:mb-0">
            Стоимость
          </h2>
          <div className="md:w-1/3">
            <p className="font-mono text-sm tracking-widest text-background/50">
              [ Точная стоимость зависит от площади участка и степени заражения. Цены указаны в рублях. ]
            </p>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRICING.map((item, index) => (
            <motion.div
              key={item.service}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '100px 0px' }}
              className="flex flex-col border border-background/15 bg-background/5 backdrop-blur-sm hover:bg-background/10 transition-colors"
            >
              {/* Header */}
              <div className="p-6 md:p-8 border-b border-background/10">
                <h3 className="text-2xl md:text-3xl font-bold tracking-tighter">
                  {item.service}
                </h3>
                <p className="font-mono text-xs tracking-widest text-background/40 mt-2">
                  {item.subtitle}
                </p>
              </div>

              {/* Prices */}
              <div className="flex flex-col flex-1">
                {item.prices.map((price, i) => (
                  <div
                    key={price.area}
                    className={`flex justify-between items-center px-6 md:px-8 py-4 ${
                      i < item.prices.length - 1 ? 'border-b border-background/10' : ''
                    }`}
                  >
                    <span className="text-sm text-background/60 tracking-wide">
                      {price.area}
                    </span>
                    <span className="font-mono text-lg md:text-xl font-bold tracking-tight">
                      {price.price === 'Договорная' ? price.price : `от ${price.price} ₽`}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-6">
          <a
            href="#quiz"
            className="inline-flex items-center justify-center px-8 py-5 bg-background text-foreground text-sm font-bold tracking-widest uppercase hover:bg-background/90 transition-colors border border-background w-full md:w-auto"
          >
            [ Точный расчёт за 2 минуты → ]
          </a>
          <span className="font-mono text-xs tracking-widest text-background/30">
            Или позвоните: +7 (999) 000-00-00
          </span>
        </div>
      </div>
    </section>
  );
}
