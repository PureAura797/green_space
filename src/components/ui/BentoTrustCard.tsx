'use client';

import { motion } from 'framer-motion';
import { Shield, Star } from 'lucide-react';

interface BentoTrustCardProps {
  variant: 'guarantee' | 'rating-avito' | 'rating-yandex';
  delay?: number;
  className?: string;
}

const CONFIG = {
  guarantee: {
    icon: Shield,
    iconBg: 'bg-emerald-500/15',
    iconColor: 'text-emerald-400',
    title: 'Гарантия',
    subtitle: 'Результат в договоре',
    value: '100%',
    valueSub: 'фиксация',
  },
  'rating-avito': {
    icon: Star,
    iconBg: 'bg-amber-500/15',
    iconColor: 'text-amber-400',
    title: 'Авито',
    subtitle: 'Рейтинг продавца',
    value: '4.9',
    valueSub: '★★★★★',
  },
  'rating-yandex': {
    icon: Star,
    iconBg: 'bg-blue-500/15',
    iconColor: 'text-blue-400',
    title: 'Яндекс',
    subtitle: 'Отзывы клиентов',
    value: '4.8',
    valueSub: '★★★★★',
  },
};

export default function BentoTrustCard({
  variant,
  delay = 0,
  className = '',
}: BentoTrustCardProps) {
  const c = CONFIG[variant];
  const Icon = c.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, backgroundColor: 'rgba(255,255,255,0.10)' }}
      className={`
        relative overflow-hidden rounded-[22px] p-4
        bg-white/[0.06] backdrop-blur-xl border border-white/[0.08]
        cursor-default transition-shadow duration-300
        hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)]
        ${className}
      `}
    >
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-9 h-9 rounded-full ${c.iconBg} flex items-center justify-center`}>
          <Icon size={16} strokeWidth={1.2} className={c.iconColor} />
        </div>
        <div>
          <p className="text-[13px] font-semibold text-white/90">{c.title}</p>
          <p className="text-[10px] text-white/35 font-medium">{c.subtitle}</p>
        </div>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-[28px] font-bold text-white/90 leading-none tracking-tight">
          {c.value}
        </span>
        <span className="text-[11px] text-white/30">{c.valueSub}</span>
      </div>
    </motion.div>
  );
}
