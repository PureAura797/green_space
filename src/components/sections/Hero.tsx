'use client';

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-end overflow-hidden">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-hero-1 { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards; opacity: 0; }
        .animate-hero-2 { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.55s forwards; opacity: 0; }
        .animate-hero-3 { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards; opacity: 0; }
      `}</style>

      {/* Video background — fully visible */}
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

      {/* Gradient — darker at bottom where text is, light at top where video shows */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Content */}
      <div className="relative z-10 px-4 md:px-8 max-w-[1400px] mx-auto w-full pb-10 md:pb-14 lg:pb-16 pt-32">
        
        {/* ═══ ГРУППА 1: Заголовок ═══ */}
        <div className="mb-10 md:mb-12 animate-hero-1">
          {/* Badge — читаемый */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/70"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>
            <span className="text-[12px] text-white/70 font-medium tracking-wide">
              Официальный подрядчик
            </span>
          </div>

          {/* Заголовок */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[100px] font-semibold leading-[0.92] tracking-tight text-white" style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}>
            Защита <br />
            вашей <br />
            территории
          </h1>

          {/* Теги — текст, разделители точками */}
          <p className="mt-6 md:mt-8 text-sm md:text-base text-white/50 font-medium tracking-wide" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}>
            Клещи
            <span className="mx-2.5 text-white/20">·</span>
            Борщевик
            <span className="mx-2.5 text-white/20">·</span>
            Кроты
            <span className="mx-2.5 text-white/20">·</span>
            Короед
            <span className="mx-2.5 text-white/20">·</span>
            Арбористика
          </p>
        </div>

        {/* ═══ ГРУППА 2: Trust ═══ */}
        <div className="flex flex-col sm:flex-row gap-x-6 gap-y-2.5 mb-8 md:mb-10 animate-hero-2">
          {[
            'Гарантия в договоре',
            'Выезд в день обращения',
            'Безопасно для детей и животных',
          ].map((text) => (
            <div key={text} className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="text-[13px] text-white/60 font-medium" style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}>
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* ═══ ГРУППА 3: CTA ═══ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 animate-hero-3">
          <a
            href="#contacts"
            className="group inline-flex items-center justify-center gap-2.5 px-8 py-4 md:px-10 md:py-[18px] bg-white text-[#1D1D1F] text-[15px] font-semibold rounded-2xl hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)] hover:-translate-y-0.5 transition-all duration-300 text-center"
          >
            Оставить заявку
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </a>
          <a
            href="#quiz"
            className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-[18px] text-white/80 text-[15px] font-medium rounded-2xl border border-white/20 hover:border-white/35 hover:text-white transition-all duration-300 text-center"
          >
            Рассчитать стоимость
          </a>
        </div>
      </div>
    </section>
  );
}
