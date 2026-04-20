'use client';

import Image from 'next/image';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import VelocityText from '@/components/ui/VelocityText';
import { company } from '@/lib/site-data';

export default function Licenses() {
  return (
    <section id="licenses" className="relative py-24 lg:py-32 w-full z-10">
      <ScrollRevealContainer className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Сертификация
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <VelocityText skewFactor={4}>
                <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                  Официальные<br />
                  <span className="text-black/30">допуски</span>
                </h2>
              </VelocityText>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              Лицензия Роспотребнадзора на осуществление деятельности по дезинфекции, дезинсекции и дератизации.
            </p>
          </ScrollRevealItem>
        </div>

        {/* ═══ UNIFIED BENTO CARD ═══ */}
        <ScrollRevealItem>
          <div className="relative bg-white rounded-[32px] md:rounded-[40px] border border-black/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1fr]">
              
              {/* Left: Certificate Image */}
              <div 
                className="relative p-8 md:p-10 lg:p-12 flex items-center justify-center bg-[#F5F5F0]/50 overflow-hidden min-h-[400px] lg:min-h-0"
                onContextMenu={(e) => e.preventDefault()}
              >
                {/* Decorative dot grid */}
                <div 
                  className="absolute inset-0 opacity-[0.03]" 
                  style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} 
                />
                
                {/* Certificate with controlled tilt */}
                <div className="relative w-[75%] max-w-[300px] aspect-[595/842] select-none transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group">
                  <Image
                    src="/images/licenses/certificate-preview.png"
                    alt="Лицензия Роспотребнадзора"
                    fill
                    sizes="(max-width: 1024px) 75vw, 300px"
                    className="object-contain rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.12)] group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.18)] transition-shadow duration-700"
                    draggable={false}
                  />
                  {/* Bottom gradient mask — hides lower portion */}
                  <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#F5F5F0] via-[#F5F5F0]/90 to-transparent rounded-b-lg pointer-events-none" />
                  {/* Diagonal watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none rotate-[-30deg] opacity-[0.06]">
                    <span className="text-[42px] md:text-[56px] font-black text-black tracking-[0.12em] whitespace-nowrap">{company.brandName}</span>
                  </div>
                </div>
                
              </div>

              {/* Right: License Info */}
              <div className="p-8 md:p-10 lg:p-12 flex flex-col justify-center gap-10">
                {/* License Number — Hero Typography */}
                <div>
                  <p className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase mb-3">Номер лицензии</p>
                  <p className="text-[24px] sm:text-[28px] md:text-[36px] lg:text-[42px] font-black tracking-tight text-[#1D1D1F] font-mono leading-[1.1]">
                    77.01.13.003<span className="text-black/20">.Л.</span>0000<span className="text-black/20">••</span>.02.25
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase mb-2">Дата выдачи</p>
                    <p className="text-lg font-bold text-[#1D1D1F]">07.02.2025</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase mb-2">Статус</p>
                    <p className="text-lg font-bold text-[#2D6A4F]">Действующая</p>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <p className="text-[10px] font-black tracking-[0.2em] text-black/30 uppercase mb-2">Выдана</p>
                    <p className="text-base font-bold text-[#1D1D1F] leading-snug">Роспотребнадзор<br className="hidden md:block" /> по г. Москве</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-black/5" />

                {/* Company Info — Dark Inline Card */}
                <div className="bg-[#1D1D1F] rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.2em] text-white/30 uppercase mb-2">Лицензиат</p>
                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-white">
                      {company.legalName}
                    </h3>
                  </div>
                  <div className="flex gap-8 font-mono text-sm">
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">ИНН</p>
                      <p className="text-white/80">9713023085</p>
                    </div>
                    <div>
                      <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">КПП</p>
                      <p className="text-white/80">771301001</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealItem>
      </ScrollRevealContainer>
    </section>
  );
}
