'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

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
      { type: 'WHATSAPP', link: '#' },
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
      { type: 'WHATSAPP', link: '#' },
    ]
  }
];

export default function Team() {
  return (
    <section id="team" className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-surface border-b border-border">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-6">
            Команда
          </h2>
          <p className="font-mono text-sm tracking-widest text-foreground/50 max-w-xl">
            [ Профильные специалисты с многолетним опытом работы в сфере защиты растений и территорий ]
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: '100px 0px' }}
              className="group relative flex flex-col cursor-pointer"
            >
              {/* Photo */}
              <div className="w-full aspect-[3/4] bg-zinc-100 border border-border overflow-hidden mb-6 relative">
                <Image 
                  src={member.image} 
                  alt={member.name} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out grayscale hover:grayscale-0"
                />
                
                {/* Overlay with contacts */}
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-zinc-950/95 via-zinc-950/70 to-transparent md:translate-y-[120%] md:group-hover:translate-y-0 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500 ease-[0.16,1,0.3,1] flex flex-wrap gap-4 z-10 pointer-events-auto">
                  {member.contacts.map((contact) => (
                    <a 
                      key={contact.type} 
                      href={contact.link}
                      className="font-mono text-xs font-bold tracking-widest text-zinc-100 hover:text-zinc-400 transition-colors uppercase border-b border-zinc-100/30 hover:border-zinc-400 pb-1"
                    >
                      {contact.type}
                    </a>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-bold tracking-tighter">
                  {member.name}
                </h3>
                <p className="font-mono text-sm tracking-widest text-foreground/60">
                  {member.role}
                </p>
              </div>

              {/* Stats */}
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                <span className="font-mono text-xs tracking-widest text-foreground font-bold">
                  {member.experience}
                </span>
                <span className="font-mono text-xs tracking-widest text-foreground/40">
                  {member.projects}
                </span>
              </div>
              <p className="mt-2 text-xs text-foreground/50 font-mono tracking-wider">
                {member.specialization}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 flex justify-center md:justify-start">
          <a href="#contacts" className="inline-flex items-center justify-center px-8 py-5 bg-foreground text-background text-sm font-bold tracking-widest uppercase hover:bg-zinc-800 transition-colors border border-foreground w-full md:w-auto">
            [ Получить консультацию агронома → ]
          </a>
        </div>
      </div>
    </section>
  );
}
