'use client';

import Image from 'next/image';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

const STEPS = [
  {
    id: '01',
    title: 'Быстрая\nзаявка',
    description: 'Оставляете заявку или звоните — перезваниваем в течение 5 минут и согласовываем время.',
    tag: 'до 5 мин',
    image: '/images/how-we-work/01-request.jpeg',
  },
  {
    id: '02',
    title: 'Бесплатный\nосмотр',
    description: 'Инженер приедет в срок, осмотрит участок и честно расскажет, что нужно сделать.',
    tag: '1 день',
    image: '/images/how-we-work/02-inspection.jpeg',
  },
  {
    id: '03',
    title: 'Эко-\nобработка',
    description: 'Специалисты подготовят участок, выполнят работу на 100% и аккуратно уберут за собой.',
    tag: 'от 2 часов',
    image: '/images/how-we-work/03-treatment.jpeg',
  },
  {
    id: '04',
    title: 'Гарантия\nрезультата',
    description: 'Контролируем результат. Бесплатно приедем повторно, если что-то пошло не так.',
    tag: 'по договору',
    image: '/images/how-we-work/04-warranty.jpeg',
    objectPosition: '75% center',
  },
];

export default function HowWeWork() {
  return (
    <section className="relative py-24 lg:py-32 z-10 w-full overflow-hidden">
      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-24">
          <div className="max-w-2xl">
            <ScrollRevealItem baseY={20}>
              <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                Процесс
              </p>
            </ScrollRevealItem>
            <ScrollRevealItem baseY={30}>
              <h2 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F]">
                Прозрачный процесс<br />
                <span className="text-black/30">от А до Я</span>
              </h2>
            </ScrollRevealItem>
          </div>
          <ScrollRevealItem baseY={30} className="md:w-1/3 mt-8 md:mt-0">
            <p className="text-[#1D1D1F]/60 text-base md:text-lg font-medium tracking-tight leading-relaxed">
              От первой заявки до финального результата — 4 простых шага с прозрачной коммуникацией на каждом этапе.
            </p>
          </ScrollRevealItem>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {STEPS.map((step, i) => (
            <ScrollRevealItem
              key={step.id}
              className="group relative flex flex-col bg-white rounded-[32px] overflow-hidden cursor-default transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_80px_rgba(0,0,0,0.08)]"
            >
              {/* Top accent zone — green with full-opacity 3D render */}
              <div className="relative h-[220px] lg:h-[260px] bg-gradient-to-br from-[#2D6A4F] to-[#1B4332] overflow-hidden">
                {/* Full-opacity atmospheric 3D render */}
                <Image
                  src={step.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover pointer-events-none select-none"
                  style={{ objectPosition: step.objectPosition ?? 'center' }}
                  aria-hidden="true"
                />
                {/* Subtle edge vignette — softens edges, unifies across cards without obscuring subject */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(27,67,50,0.5)_100%)] pointer-events-none" />
              </div>

              {/* Bottom content zone */}
              <div className="flex flex-col flex-1 p-7 lg:p-8">
                {/* Title — moved here from green zone so it doesn't overlap the 3D object */}
                <h3 className="text-[24px] lg:text-[26px] font-black text-[#1D1D1F] leading-[1.1] tracking-tight mb-4 whitespace-pre-line">
                  {step.title}
                </h3>
                <p className="text-[14px] font-medium text-black/45 leading-[1.7] mb-8">
                  {step.description}
                </p>
                {/* Tag */}
                <div className="mt-auto flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
                  <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#1D1D1F]">
                    {step.tag}
                  </span>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </div>
      </ScrollRevealContainer>
    </section>
  );
}
