'use client';

import { PhoneCall, Check } from 'lucide-react';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PrivacyModal from '@/components/ui/PrivacyModal';
import { IMaskInput } from 'react-imask';

export default function LeadCapture() {
  const [consentGiven, setConsentGiven] = useState(false);
  const [shakeConsent, setShakeConsent] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consentGiven) {
      setShakeConsent(true);
      setTimeout(() => setShakeConsent(false), 400);
      return;
    }
    // Handle form submission logic here
  };

  return (
    <section 
      className="pt-28 pb-20 lg:py-32 w-full z-10 relative overflow-hidden bg-[#1D1D1F] text-white rounded-[40px] lg:rounded-[80px] mx-2 max-w-[calc(100%-16px)] lg:max-w-[calc(100%-32px)] xl:max-w-[1400px] xl:mx-auto mb-16 shadow-2xl"
      style={{
        backgroundImage: 'url(/images/lead-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: '100% center', // Anchor image to the right
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Dark overlay gradients for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1D1D1F] via-[#1D1D1F]/90 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1D1D1F] to-transparent pointer-events-none z-0 sm:hidden" />

      <ScrollRevealContainer className="px-6 md:px-12 lg:px-20 relative z-10 flex flex-col items-start text-left">
        
        <ScrollRevealItem baseY={20}>
           <div className="inline-flex items-center gap-2.5 bg-white shadow-xl rounded-full px-4 py-2 mb-8 transition-transform hover:scale-[1.02]">
             <div className="w-2 h-2 rounded-full bg-[#34C759] animate-pulse" />
             <span className="text-[10px] lg:text-[11px] font-black tracking-[0.2em] uppercase text-[#1D1D1F]">
               Связь без посредников
             </span>
           </div>
        </ScrollRevealItem>

        <ScrollRevealItem baseY={30} delay={0.1}>
          <h2 className="text-[36px] md:text-[56px] lg:text-[72px] font-black leading-[1] tracking-tight mb-8">
            Остались <span className="text-[#2D6A4F]">сомнения?</span>
          </h2>
        </ScrollRevealItem>

        <ScrollRevealItem baseY={30} delay={0.2} className="max-w-xl mb-12">
          <p className="text-lg lg:text-xl text-white/70 font-medium">
            Оставьте телефон — наш технический директор перезвонит вам сам через 3 минуты и бесплатно проконсультирует по вашей задаче. Никакого навязывания.
          </p>
        </ScrollRevealItem>

        <ScrollRevealItem baseY={30} delay={0.3} className="w-full max-w-xl relative z-20 flex flex-col items-start">
          <form className="flex flex-col sm:flex-row gap-3 w-full" onSubmit={handleSubmit}>
            <IMaskInput
              mask="+{7} (000) 000-00-00"
              placeholder="+7 (999) 000-00-00"
              type="tel"
              className="w-full sm:flex-1 h-14 sm:h-16 appearance-none bg-white/5 border border-white/10 rounded-full px-8 text-lg font-medium text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-center sm:text-left shadow-inner"
              required
            />
            <button 
              type="submit"
              className={`w-full sm:w-auto h-14 sm:h-16 rounded-full px-10 font-bold text-[14px] tracking-wide uppercase transition-all flex items-center justify-center gap-3 shrink-0 relative ${consentGiven ? 'bg-[#2D6A4F] text-white hover:brightness-110 active:scale-[0.98] shadow-lg group overflow-hidden' : 'bg-white/10 text-white/40 cursor-not-allowed'}`}
            >
              {consentGiven && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />}
              <PhoneCall strokeWidth={2} className="w-5 h-5 relative z-10" />
              <span className="relative z-10 mt-0.5">Жду звонка</span>
            </button>
          </form>

          {/* 152-FZ Checkbox */}
          <button
            type="button"
            onClick={() => setConsentGiven(!consentGiven)}
            className="flex items-center justify-start gap-3 w-full text-left group mt-6"
          >
            <motion.div 
              animate={shakeConsent ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${consentGiven ? 'bg-[#2D6A4F] border-[#2D6A4F]' : shakeConsent ? 'border-red-500 bg-red-500/10' : 'border-white/20 bg-transparent group-hover:border-white/40'}`}
            >
              <AnimatePresence>
                {consentGiven && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                    <Check size={12} className="text-white" strokeWidth={4} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <span className={`text-[10px] sm:text-[11px] font-medium leading-[1.4] transition-colors duration-300 tracking-wide text-left ${shakeConsent ? 'text-red-400' : 'text-white/40 group-hover:text-white/60'}`}>
              Я согласен на обработку персональных данных в соответствии с{' '}
              <a 
                href="#"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsPrivacyOpen(true); }}
                className="text-white/70 underline decoration-white/20 underline-offset-3 hover:text-white hover:decoration-white/70 transition-colors"
              >
                Политикой конфиденциальности
              </a>
            </span>
          </button>
        </ScrollRevealItem>

      </ScrollRevealContainer>
      
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </section>
  );
}
