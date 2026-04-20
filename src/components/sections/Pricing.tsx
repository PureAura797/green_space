'use client';

import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { services } from '@/lib/site-data';

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 z-10 w-full overflow-hidden">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem baseY={20}>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Стоимость
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                Прозрачные<br />
                <span className="text-black/30">тарифы</span>
              </h2>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem baseY={30} className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              Точная стоимость зависит от площади участка и степени заражения. Выезд и осмотр — бесплатно.
            </p>
          </ScrollRevealItem>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((item) => (
            <ScrollRevealItem
              key={item.pricingTitle}
              className="flex flex-col bg-white rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 pb-6 border-b border-black/5">
                <h3 className="text-[28px] font-black tracking-tight text-[#1D1D1F] leading-[1.1] mb-2">
                  {item.pricingTitle}
                </h3>
                <p className="text-[13px] font-bold tracking-wide text-black/40 uppercase">
                  {'pricingSubtitle' in item ? item.pricingSubtitle : item.title}
                </p>
              </div>

              {/* Prices Container */}
              <div className="flex flex-col flex-1 p-8 pt-4 bg-[#F8F8F6]/50">
                {item.pricing.map((price, i) => (
                  <div
                    key={price.area}
                    className={`flex justify-between items-center py-4 ${
                      i < item.pricing.length - 1 ? 'border-b border-black/5' : ''
                    }`}
                  >
                    <span className="text-[15px] font-medium text-black/60 tracking-tight">
                      {price.area}
                    </span>
                    <span className="text-lg font-bold tracking-tight text-[#1D1D1F]">
                      {price.price === 'Договорная' ? price.price : `от ${price.price} ₽`}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollRevealItem>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-6 justify-center">
          <a
            href="#quiz"
            onClick={(e) => {
              e.preventDefault();
              window.history.pushState(null, '', '#quiz');
              window.dispatchEvent(new Event('hashchange'));
            }}
            className="inline-flex items-center justify-center px-8 py-4 bg-[#2D6A4F] text-white text-sm font-bold tracking-widest uppercase rounded-full hover:bg-[#347B5B] transition-colors shadow-xl shadow-[#2D6A4F]/20 w-full md:w-auto"
          >
            Рассчитать для моего участка
          </a>
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
