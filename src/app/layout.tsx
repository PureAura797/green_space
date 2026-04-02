import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Geist } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollProgress from '@/components/layout/ScrollProgress';
import MobileStickyCTA from '@/components/layout/MobileStickyCTA';
import QuizModal from '@/components/layout/QuizModal';
import FloatingContact from '@/components/layout/FloatingContact';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://goslend.ru'),
  title: {
    default: 'ГОС_ЛЕНД | Уничтожение клещей, борщевика и арбористика',
    template: '%s | ГОС_ЛЕНД',
  },
  description: 'Официальная служба по профессиональной расчистке участков, уничтожению клещей, кротов, борщевика и безопасному спилу аварийных деревьев. Гарантия по договору.',
  keywords: ['уничтожение клещей', 'обработка от клещей', 'уничтожение борщевика', 'спил деревьев', 'удаление кротов', 'арбористика', 'расчистка участка'],
  authors: [{ name: 'Инженеры ГОС_ЛЕНД', url: 'https://goslend.ru' }],
  creator: 'ГОС_ЛЕНД',
  publisher: 'ГОС_ЛЕНД',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ГОС_ЛЕНД | Уничтожение клещей и арбористика',
    description: 'Официальная служба по уничтожению клещей, борщевика и безопасному спилу деревьев. Работаем с B2B и частными лицами.',
    url: 'https://goslend.ru',
    siteName: 'Служба ГОС_ЛЕНД',
    locale: 'ru_RU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ГОС_ЛЕНД | Расчистка участков',
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
      name: 'Служба ГОС_ЛЕНД',
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
      className={cn("h-full", "antialiased", "scroll-smooth", inter.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-background text-foreground min-h-full flex flex-col">
        <SmoothScroll>
          <ScrollProgress />
          {children}
          <MobileStickyCTA />
          <FloatingContact />
          <QuizModal />
        </SmoothScroll>
      </body>
    </html>
  );
}
