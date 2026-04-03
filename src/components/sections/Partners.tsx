'use client';

import { motion } from 'framer-motion';

const PARTNERS = [
  'МУП «ГОРЗЕЛЕНХОЗ»',
  'КП «БАРВИХА ХИЛЛС»',
  'АДМИНИСТРАЦИЯ ГО',
  'ПАРК ИМЕНИ ГОРЬКОГО',
  'САНАТОРИЙ «СОСНОВЫЙ БОР»',
  'ГОЛЬФ-КЛУБ «ПЕСТОВО»',
  'ПАНСИОНАТ «ЗАРЯ»',
  'ГК «САМОЛЕТ» (ПОДРЯД)'
];

  export default function Partners() {
    return (
      <section className="py-16 md:py-24 bg-[#1D1D1F] overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#1D1D1F] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#1D1D1F] to-transparent z-10 pointer-events-none" />
        
        <div className="flex">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 35
            }}
            className="flex whitespace-nowrap gap-16 md:gap-32 px-8 items-center w-max will-change-transform"
          >
            {/* We repeat the array twice to ensure seamless looping */}
            {[...PARTNERS, ...PARTNERS].map((partner, index) => (
              <div 
                key={`${partner}-${index}`}
                className="font-black text-3xl md:text-[40px] tracking-tighter text-white/10 uppercase cursor-default hover:text-white/30 transition-colors py-2"
                style={{ WebkitTransform: 'translateZ(0)' }}
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }
