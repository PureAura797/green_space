'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import TiltCard from '@/components/ui/TiltCard';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { services } from '@/lib/site-data';

export default function Services() {
  return (
    <section id="services" className="relative pt-4 pb-16 lg:pt-8 lg:pb-24 z-10 overflow-hidden">
      <ScrollRevealContainer className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem baseY={20}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Услуги
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                Что мы умеем<br />
                <span className="text-black/30">делать на 5+</span>
              </h3>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem baseY={30} className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              Аккуратно спилим дерево и сделаем газон полностью безопасным для вас, ваших детей и домашних животных.
            </p>
          </ScrollRevealItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => {
            // Make the second card (Borshchevik/Hogweed) the dark accent card
            const isDark = index === 1;

            return (
              <ScrollRevealItem
                key={service.id}
                className="group h-full w-full"
              >
                <TiltCard intensity={8} className="h-full">
                  <a
                    href="#contacts"
                    className={`relative flex h-full flex-col overflow-hidden rounded-[32px] transition-all duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.02)] ${
                      isDark 
                        ? 'bg-[#1D1D1F] text-white shadow-2xl' 
                        : 'bg-white text-[#1D1D1F]'
                    }`}
                  >
                {/* Top Half: Image */}
                <div className="relative w-full aspect-[5/4] sm:aspect-[4/3] overflow-hidden bg-black/5">
                  <Image
                    src={service.image}
                    alt={service.shortTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Subtle Gradient for legibility */}
                  <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                  
                  {/* Step Number Overlay */}
                  <div className="absolute top-6 left-6 font-mono text-sm tracking-widest text-white mix-blend-overlay opacity-80">
                    {service.id}
                  </div>

                  {/* Circular Arrow Button */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center bg-white/20 backdrop-blur-md text-white border border-white/20 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                    <ArrowUpRight size={22} strokeWidth={2.5} className="group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
                  </div>
                </div>

                {/* Bottom Half: Content */}
                <div className="flex flex-col flex-1 p-6 lg:p-8">
                  <h4 className="text-[28px] leading-[1.1] font-black tracking-tight mb-4">
                    {service.shortTitle}
                  </h4>
                  <p className={`text-base leading-relaxed mb-8 flex-1 font-medium ${isDark ? 'text-white/50' : 'text-black/50'}`}>
                    {service.description}
                  </p>
                  
                  {/* Divider & Price */}
                  <div className={`mt-auto pt-6 border-t flex justify-between items-center ${isDark ? 'border-white/10' : 'border-black/5'}`}>
                    <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>
                      Рассчитать
                    </span>
                    <div className={`px-5 py-2.5 rounded-full text-[13px] font-bold tracking-wide transition-colors ${
                      isDark 
                        ? 'bg-[#2D6A4F] text-white group-hover:bg-[#347B5B]' 
                        : 'bg-[#F5F5F0] text-black group-hover:bg-[#EBEBEB]'
                    }`}>
                      {service.price}
                    </div>
                  </div>
                </div>
                  </a>
                </TiltCard>
              </ScrollRevealItem>
            );
          })}
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
