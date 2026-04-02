import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 px-4 md:px-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Col 1 */}
        <div className="flex flex-col gap-8 max-w-sm">
          <Link href="/" className="text-3xl font-bold tracking-tighter uppercase">
            ГОС_ЛЕНД
          </Link>
          <p className="font-mono text-sm tracking-widest text-background/60 leading-relaxed">
            Профессиональная защита земельных участков и арбористика. Официальный договор и гарантия.
          </p>
        </div>

        {/* Col 2: Nav */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs tracking-widest text-background/50 uppercase mb-4">[ Навигация ]</h4>
          <Link href="#services" className="text-sm tracking-wide hover:underline underline-offset-4">Услуги</Link>
          <Link href="#results" className="text-sm tracking-wide hover:underline underline-offset-4">Результаты</Link>
          <Link href="#team" className="text-sm tracking-wide hover:underline underline-offset-4">Команда</Link>
          <Link href="#reviews" className="text-sm tracking-wide hover:underline underline-offset-4">Отзывы</Link>
          <Link href="#faq" className="text-sm tracking-wide hover:underline underline-offset-4">FAQ</Link>
        </div>

        {/* Col 3: Requisites */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs tracking-widest text-background/50 uppercase mb-4">[ Реквизиты ]</h4>
          <p className="font-mono text-sm tracking-widest text-background/80">ИНН: 7700000000</p>
          <p className="font-mono text-sm tracking-widest text-background/80">ОГРН: 1027700000000</p>
          <p className="font-mono text-sm tracking-widest text-background/80">ОКВЭД: 81.29.1</p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto mt-24 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs tracking-widest text-background/40">
          © 2026 ГОС_ЛЕНД. ВСЕ ПРАВА ЗАЩИЩЕНЫ.
        </p>
        <div className="flex gap-6">
          <Link href="#" className="font-mono text-xs tracking-widest text-background/40 hover:text-background transition-colors">
            ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
          </Link>
          <Link href="#" className="font-mono text-xs tracking-widest text-background/40 hover:text-background transition-colors">
            ПУБЛИЧНАЯ ОФЕРТА
          </Link>
        </div>
      </div>
    </footer>
  );
}
