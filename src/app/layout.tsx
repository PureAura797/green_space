import type { Metadata } from 'next';
import { Onest, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/layout/ScrollProgress';
import QuizModal from '@/components/layout/QuizModal';
import FloatingContact from '@/components/layout/FloatingContact';
import FilmGrain from '@/components/ui/FilmGrain';
import Preloader from '@/components/layout/Preloader';
import CookieBanner from '@/components/ui/CookieBanner';
import { cn } from "@/lib/utils";

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://goslend.ru'),
  title: {
    default: 'КАРБОДЕЗ | Уничтожение клещей, борщевика и арбористика',
    template: '%s | КАРБОДЕЗ',
  },
  description: 'ООО «КАРБОДЕЗ» — профессиональная расчистка участков, уничтожение клещей, кротов, борщевика и безопасный спил аварийных деревьев. Лицензия Роспотребнадзора. Гарантия по договору.',
  keywords: ['уничтожение клещей', 'обработка от клещей', 'уничтожение борщевика', 'спил деревьев', 'удаление кротов', 'арбористика', 'расчистка участка', 'карбодез', 'дезинсекция'],
  authors: [{ name: 'ООО КАРБОДЕЗ', url: 'https://goslend.ru' }],
  creator: 'КАРБОДЕЗ',
  publisher: 'ООО КАРБОДЕЗ',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'КАРБОДЕЗ | Уничтожение клещей и арбористика',
    description: 'ООО «КАРБОДЕЗ» — уничтожение клещей, борщевика и безопасный спил деревьев. Работаем с B2B и частными лицами.',
    url: 'https://goslend.ru',
    siteName: 'КАРБОДЕЗ',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'КАРБОДЕЗ | Расчистка участков',
    description: 'Профессиональные услуги арбористов и дезинсекторов с гарантией.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'HomeAndConstructionBusiness',
      name: 'ООО КАРБОДЕЗ',
      url: 'https://goslend.ru',
      telephone: '+79990000000',
      description: 'Официальная служба по расчистке территорий, уничтожению клещей, борщевика и безопасному спилу деревьев.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'ул. Профессиональная, 1',
        addressLocality: 'Москва',
        addressRegion: 'Москва',
        postalCode: '101000',
        addressCountry: 'RU',
      },
      priceRange: 'От 1500 руб',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Насколько безопасны препараты от клещей для детей и питомцев?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Мы используем сертифицированные инсектоакарицидные препараты 3-4 класса опасности (малоопасные). Уже через 2-3 часа после высыхания раствора на траве, территория абсолютно безопасна для детей и животных.',
          },
        },
        {
          '@type': 'Question',
          name: 'Можно ли спилить дерево, если оно наклонено над крышей дома?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Да, это наша специализация. Мы работаем методом промышленного альпинизма (арбористика). Дерево спиливается частями сверху вниз, каждая ветка аккуратно спускается на веревках.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn("h-full", "antialiased", "scroll-smooth scroll-pt-32 lg:scroll-pt-40", onest.variable, jetbrainsMono.variable, "font-sans")}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#F5F5F0] text-foreground min-h-full flex flex-col">
        <FilmGrain />
        <Preloader />
        <SmoothScroll>
          <ScrollProgress />
          {children}
          <FloatingContact />
          <QuizModal />
          <CookieBanner />
        </SmoothScroll>
      </body>
    </html>
  );
}
