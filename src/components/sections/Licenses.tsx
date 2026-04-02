'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const LICENSES = [
  { id: 1, src: '/images/licenses/01.png', alt: 'Государственная лицензия №GLC-8840217' },
  { id: 2, src: '/images/licenses/02.png', alt: 'Сертификат соответствия химических препаратов' },
  { id: 3, src: '/images/licenses/03.png', alt: 'Свидетельство допуска к высотным арбористическим работам' },
];

export default function Licenses() {
  return (
    <section id="licenses" className="py-16 md:py-24 lg:py-32 border-b border-border bg-background">
      <div className="px-4 md:px-8 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-6">
            Лицензии
          </h2>
          <p className="font-mono text-sm tracking-widest text-foreground/50">
            [ Официальные допуски к работе с пестицидами I-III класса опасности и сертификаты безопасного проведения высотных работ ]
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {LICENSES.map((license, i) => (
          <motion.div
            key={license.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: '100px 0px' }}
            className="group relative aspect-[3/4] bg-zinc-100 border border-border p-4 md:p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-200 transition-colors"
          >
            <div className="relative w-full h-full shadow-lg group-hover:scale-105 transition-transform duration-500 bg-white">
              <Image 
                src={license.src}
                alt={license.alt}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Hover description */}
            <div className="mt-6 md:absolute md:inset-0 md:bg-foreground/90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 md:flex md:items-center md:justify-center p-6 text-center z-10">
              <p className="font-mono text-xs md:text-sm tracking-widest text-foreground md:text-background font-bold">
                {license.alt}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      </div>
    </section>
  );
}
