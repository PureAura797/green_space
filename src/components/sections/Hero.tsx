'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-hero-1 { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .animate-hero-2 { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards; opacity: 0; }
        .animate-hero-3 { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.7s forwards; opacity: 0; }
        .animate-hero-4 { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards; opacity: 0; }
      `}</style>

      {/* Video background — only in Hero, not fixed */}
      <div className="absolute inset-0 -z-10" style={{ willChange: 'transform', transform: 'translateZ(0)' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        >
          <source src="/videos/hero_bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Soft dark overlay — gradient instead of flat */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/40 to-foreground/70" />

      {/* Content — positioned at the bottom */}
      <div className="relative z-10 px-4 md:px-8 max-w-[1400px] mx-auto w-full pb-16 md:pb-20 lg:pb-24 pt-32">
        
        <div className="w-full flex flex-col lg:flex-row justify-between items-end pb-8 md:pb-12">
          <div className="max-w-4xl">
            <div className="mb-8 animate-hero-1">
              <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-background/80 text-xs md:text-sm font-medium tracking-wide px-4 py-2 rounded-full mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
                Официальный подрядчик
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-semibold leading-[0.95] tracking-tight text-balance text-background">
                Защита <br />
                вашей <br />
                территории
              </h1>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3 mt-8 md:mt-10 animate-hero-2">
              {['Клещи', 'Борщевик', 'Кроты', 'Короед', 'Арбористика'].map((item) => (
                <span
                  key={item}
                  className="bg-white/10 backdrop-blur-sm text-background/90 text-sm md:text-base font-medium px-4 py-2 rounded-full border border-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* USP Bullets — pill badges */}
        <div className="w-full mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-hero-3">
          {[
            { icon: '✓', text: 'Гарантия в договоре' },
            { icon: '✓', text: 'Выезд в день обращения' },
            { icon: '✓', text: 'Безопасно для детей и животных' },
          ].map((usp) => (
            <div key={usp.text} className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2.5">
              <span className="w-5 h-5 rounded-full bg-accent flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {usp.icon}
              </span>
              <span className="text-xs md:text-sm font-medium text-background/80 tracking-wide">
                {usp.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Buttons — capsule shape */}
        <div className="w-full mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 md:gap-5 animate-hero-4">
          <a
            href="#contacts"
            className="w-full sm:w-auto px-8 py-4 bg-background text-foreground text-sm font-semibold tracking-wide rounded-full hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            Оставить заявку →
          </a>
          <a
            href="#quiz"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center px-8 py-4 bg-white/15 backdrop-blur-md text-background text-sm font-semibold tracking-wide rounded-full border border-white/20 hover:bg-white/25 hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            Рассчитать стоимость
          </a>
        </div>
      </div>
    </section>
  );
}
