'use client';

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
    <section className="py-12 border-b border-border bg-background overflow-hidden relative">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <div className="flex">
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
            will-change: transform;
          }
        `}</style>
        <div className="flex whitespace-nowrap gap-16 md:gap-32 px-8 items-center animate-marquee w-max">
          {/* We repeat the array twice to ensure seamless looping */}
          {[...PARTNERS, ...PARTNERS].map((partner, index) => (
            <div 
              key={`${partner}-${index}`}
              className="font-mono text-2xl md:text-3xl font-bold tracking-widest text-foreground/30 uppercase cursor-default hover:text-foreground transition-colors"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
