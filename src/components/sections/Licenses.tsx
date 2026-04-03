'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import VelocityText from '@/components/ui/VelocityText';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

const LICENSES = [
  { id: 1, src: '/images/licenses/01.png', alt: 'Государственная лицензия №GLC-8840217' },
  { id: 2, src: '/images/licenses/02.png', alt: 'Сертификат соответствия химических препаратов' },
  { id: 3, src: '/images/licenses/03.png', alt: 'Свидетельство допуска к высотным арбористическим работам' },
];

export default function Licenses() {
  return (
    <section id="licenses" className="relative py-24 lg:py-32 w-full z-10">
      <ScrollRevealContainer className="px-4 md:px-8 max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Сертификация
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem>
              <VelocityText skewFactor={4}>
                <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                  Официальные<br />
                  <span className="text-black/30">допуски</span>
                </h3>
              </VelocityText>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              Допуски к работе с пестицидами I-III класса опасности и сертификаты безопасного проведения высотных работ.
            </p>
          </ScrollRevealItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LICENSES.map((license, i) => (
            <ScrollRevealItem
              key={license.id}
              className="group relative flex flex-col items-center justify-center bg-white rounded-[32px] border border-black/5 p-8 md:p-12 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 overflow-hidden"
            >
              <div className="relative w-full aspect-[3/4] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 z-0">
                <Image 
                  src={license.src}
                  alt={license.alt}
                  fill
                  className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                />
              </div>
              
              {/* Subtle Label at bottom */}
              <div className="mt-8 text-center px-4">
                <p className="text-[13px] font-bold tracking-wide text-black/40 uppercase leading-snug">
                  {license.alt}
                </p>
              </div>
            </ScrollRevealItem>
          ))}
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
