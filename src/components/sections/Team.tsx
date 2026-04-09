'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TiltCard from '@/components/ui/TiltCard';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

const TEAM = [
  {
    id: 1,
    name: 'Александр Иванов',
    role: 'Главный агроном',
    experience: '14 лет стажа',
    projects: '700+ объектов',
    specialization: 'Акарицидная обработка, фитопатология',
    image: '/images/team/agronomist.png',
    contacts: [
      { type: 'ТЕЛЕФОН', link: 'tel:+79990000000' },
      { type: 'EMAIL', link: 'mailto:info@goslend.ru' },
      { type: 'TELEGRAM', link: '#' },
    ]
  },
  {
    id: 2,
    name: 'Михаил Смирнов',
    role: 'Ведущий арборист',
    experience: '11 лет стажа',
    projects: '500+ деревьев',
    specialization: 'Промальп, аварийные деревья',
    image: '/images/team/arborist.png',
    contacts: [
      { type: 'ТЕЛЕФОН', link: 'tel:+79990000000' },
      { type: 'EMAIL', link: 'mailto:info@goslend.ru' },
      { type: 'MAX', link: '#' },
    ]
  },
  {
    id: 3,
    name: 'Евгений Романов',
    role: 'Специалист по дезинсекции',
    experience: '8 лет стажа',
    projects: '400+ участков',
    specialization: 'Борщевик, кроты, грызуны',
    image: '/images/team/pest_control.png',
    contacts: [
      { type: 'ТЕЛЕФОН', link: 'tel:+79990000000' },
      { type: 'TELEGRAM', link: '#' },
      { type: 'MAX', link: '#' },
    ]
  }
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 lg:py-32 w-full z-10 overflow-hidden">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem baseY={20}>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Команда
              </h2>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                Профильные<br />
                <span className="text-black/30">специалисты</span>
              </h3>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem baseY={30} className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              Многолетний опыт работы в сфере защиты растений, территорий и арбористики. Дезинсекторы с высшим образованием.
            </p>
          </ScrollRevealItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEAM.map((member, index) => (
            <ScrollRevealItem
              key={member.id}
              className="h-full w-full"
            >
              <TiltCard intensity={5} className="h-full">
                <div className="group bg-white rounded-[32px] border border-black/5 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all duration-500 overflow-hidden flex flex-col h-full">
                  {/* Photo Area */}
                  <div className="w-full aspect-[4/5] bg-black/5 relative overflow-hidden">
                    <Image 
                      src={member.image} 
                      alt={member.name} 
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] saturate-50 group-hover:saturate-100"
                    />
                    
                    {/* Floating Contacts Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-[120%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex gap-2 z-10 justify-center">
                      {member.contacts.map((contact) => (
                        <a 
                          key={contact.type} 
                          href={contact.link}
                          className="px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold tracking-widest text-white hover:bg-white hover:text-black transition-colors uppercase border border-white/20"
                        >
                          {contact.type}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Info Area */}
                  <div className="p-8 flex flex-col flex-1">
                    <h3 className="text-2xl font-black tracking-tight text-[#1D1D1F] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[13px] font-bold tracking-wide text-black/40 uppercase mb-6">
                      {member.role}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-4 border-t border-black/5 pt-4">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold tracking-wider text-black/40 uppercase">Опыт</span>
                        <span className="font-medium text-[#1D1D1F]">{member.experience}</span>
                      </div>
                      <div className="flex flex-col border-l border-black/5 pl-4">
                        <span className="text-[11px] font-bold tracking-wider text-black/40 uppercase">Проекты</span>
                        <span className="font-medium text-[#1D1D1F]">{member.projects}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm font-medium text-black/60 leading-relaxed mt-auto border-t border-black/5 pt-4">
                      {member.specialization}
                    </p>
                  </div>
                </div>
              </TiltCard>
            </ScrollRevealItem>
          ))}
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
