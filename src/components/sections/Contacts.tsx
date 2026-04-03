'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import VelocityText from '@/components/ui/VelocityText';
import PrivacyModal from '@/components/ui/PrivacyModal';
import { ScrollRevealContainer, ScrollRevealItem } from '@/components/ui/ScrollReveal';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState<{ show: boolean, message: string } | null>(null);

  const [consentGiven, setConsentGiven] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [shakeConsent, setShakeConsent] = useState(false);

  useEffect(() => {
    if (toast?.show) {
      const timer = setTimeout(() => setToast(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.startsWith('7') || val.startsWith('8')) val = val.slice(1);
    
    let formatted = '+7';
    if (val.length > 0) formatted += ` (${val.substring(0, 3)}`;
    if (val.length >= 4) formatted += `) ${val.substring(3, 6)}`;
    if (val.length >= 7) formatted += `-${val.substring(6, 8)}`;
    if (val.length >= 9) formatted += `-${val.substring(8, 10)}`;
    
    setFormData({ ...formData, phone: formatted });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { name: '', phone: '' };

    if (!formData.name.trim()) {
      newErrors.name = 'ОШИБКА: Укажите ваше имя';
      valid = false;
    }
    if (formData.phone.length < 18) {
      newErrors.phone = 'ОШИБКА: Некорректный номер телефона';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consentGiven) {
      setShakeConsent(true);
      setTimeout(() => setShakeConsent(false), 500);
      return;
    }

    if (validate()) {
      const ticketId = Math.floor(100 + Math.random() * 900);
      setToast({ show: true, message: `Заявка №${ticketId} принята. Ожидайте звонка.` });
      setFormData({ name: '', phone: '' });
    }
  };

  return (
    <section id="contacts" className="relative py-24 lg:py-32 w-full z-10 overflow-hidden">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-4 md:right-8 bg-[#1D1D1F] text-white rounded-[24px] p-6 z-50 flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] max-w-sm"
          >
            <span className="font-bold tracking-widest text-[#2D6A4F] text-[10px] uppercase bg-[#2D6A4F]/20 px-3 py-1.5 rounded-full shrink-0">Успех</span>
            <span className="font-medium tracking-tight text-[15px] leading-tight">{toast.message}</span>
            <button type="button" onClick={() => setToast(null)} className="ml-2 font-mono text-xl opacity-50 hover:opacity-100 transition-opacity">×</button>
          </motion.div>
        )}
      </AnimatePresence>

      <ScrollRevealContainer className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between">
          
          {/* Contact Info Header Column */}
          <div className="lg:w-1/2 flex flex-col justify-between">
            <div>
              <ScrollRevealItem baseY={20}>
                <h2 className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#2D6A4F] mb-6">
                  Связаться
                </h2>
              </ScrollRevealItem>
              <ScrollRevealItem baseY={30}>
                <VelocityText skewFactor={4}>
                  <h3 className="text-4xl md:text-5xl lg:text-[64px] font-black leading-[0.9] tracking-tighter text-[#1D1D1F] mb-12 lg:mb-16">
                    Решим вашу<br />
                    <span className="text-black/30">проблему</span>
                  </h3>
                </VelocityText>
              </ScrollRevealItem>
              
              <ScrollRevealItem baseY={40} className="flex flex-col gap-10">
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-black/40 uppercase mb-2">Телефон</p>
                  <a href="tel:+79990000000" className="text-2xl md:text-3xl font-black tracking-tighter hover:text-[#2D6A4F] transition-colors leading-none block">
                    +7 (999) 000-00-00
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-black/40 uppercase mb-2">Email</p>
                  <a href="mailto:info@goslend.ru" className="text-xl md:text-2xl font-bold tracking-tight hover:text-[#2D6A4F] transition-colors leading-none block">
                    info@goslend.ru
                  </a>
                </div>
                <div>
                  <p className="text-[11px] font-bold tracking-widest text-black/40 uppercase mb-2">Адрес</p>
                  <p className="text-xl md:text-2xl font-bold tracking-tight leading-none block">
                    г. Москва, ул. Профессиональная, 1
                  </p>
                </div>
              </ScrollRevealItem>

              {/* Trust badges - Pill tags style */}
              <ScrollRevealItem baseY={50} className="mt-12 md:mt-16 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-[#1D1D1F]/5 rounded-full px-4 py-2 text-[#1D1D1F]/60 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                  <span className="font-bold text-[12px] tracking-wide uppercase">Договор</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1D1D1F]/5 rounded-full px-4 py-2 text-[#1D1D1F]/60 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><polyline points="22 4 12 14.01 9 11.01"/></svg>
                  <span className="font-bold text-[12px] tracking-wide uppercase">Гарантия</span>
                </div>
                <div className="flex items-center gap-2 bg-[#1D1D1F]/5 rounded-full px-4 py-2 text-[#1D1D1F]/60 px-5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span className="font-bold text-[12px] tracking-wide uppercase">Конфиденциально</span>
                </div>
              </ScrollRevealItem>
            </div>
          </div>

          {/* Form Bento Block */}
          <ScrollRevealItem baseY={40} className="lg:w-1/2 w-full mt-12 lg:mt-0">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 md:gap-10 bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 p-8 sm:p-10 md:p-16 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-black/[0.01] to-transparent pointer-events-none" />
              
              <div className="flex flex-col gap-3 relative z-10">
                <label htmlFor="name" className="text-[12px] font-bold tracking-widest text-[#1D1D1F]/40 uppercase ml-4">
                  Ваше имя
                </label>
                <input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-black/5 rounded-2xl border border-transparent px-6 py-5 outline-none focus:border-black/20 focus:bg-transparent transition-all duration-300 font-bold text-lg text-[#1D1D1F] placeholder-black/20"
                  placeholder="Иван Иванов"
                />
                {errors.name && <span className="text-[12px] font-bold text-red-500 ml-4">{errors.name}</span>}
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <label htmlFor="phone" className="text-[12px] font-bold tracking-widest text-[#1D1D1F]/40 uppercase ml-4">
                  Телефон
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className="bg-black/5 rounded-2xl border border-transparent px-6 py-5 outline-none focus:border-black/20 focus:bg-transparent transition-all duration-300 font-mono font-bold text-lg text-[#1D1D1F] placeholder-black/20"
                  placeholder="+7 (999) 000-00-00"
                  maxLength={18}
                />
                {errors.phone && <span className="text-[12px] font-bold text-red-500 ml-4">{errors.phone}</span>}
              </div>

              <div className="flex flex-col gap-4 relative z-10 mt-4 md:mt-6">
                {/* 152-FZ Checkbox */}
                <button
                  type="button"
                  onClick={() => setConsentGiven(!consentGiven)}
                  className="flex items-start gap-3 w-full text-left group"
                >
                  <motion.div 
                    animate={shakeConsent ? { x: [-5, 5, -5, 5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 rounded-full border flex items-center justify-center transition-all duration-300 ${consentGiven ? 'bg-[#2D6A4F] border-[#2D6A4F]' : shakeConsent ? 'border-red-500 bg-red-50' : 'border-[#1D1D1F]/20 bg-transparent group-hover:border-[#1D1D1F]/40'}`}
                  >
                    <AnimatePresence>
                      {consentGiven && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                          <Check size={12} className="text-white" strokeWidth={4} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <span className={`text-[10px] sm:text-[11px] font-medium leading-[1.4] transition-colors duration-300 ${shakeConsent ? 'text-red-500' : 'text-[#1D1D1F]/40 group-hover:text-[#1D1D1F]/60'}`}>
                    Я согласен на обработку персональных данных в соответствии с{' '}
                    <span 
                      onClick={(e) => { e.stopPropagation(); setIsPrivacyOpen(true); }}
                      className="text-[#2D6A4F] underline decoration-[#1D1D1F]/10 underline-offset-3 hover:decoration-[#2D6A4F]"
                    >
                      Политикой конфиденциальности
                    </span>
                  </span>
                </button>

                <button
                  type="submit"
                  disabled={!consentGiven}
                  className={`w-full py-5 px-8 rounded-full font-bold text-[13px] tracking-widest uppercase transition-all duration-300 ${consentGiven ? 'bg-[#1D1D1F] text-white hover:bg-black hover:scale-[1.02] shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-95 cursor-pointer' : 'bg-black/10 text-black/40 cursor-not-allowed'}`}
                >
                  Оставить заявку
                </button>
              </div>
            </form>
          </ScrollRevealItem>
        </div>
      </ScrollRevealContainer>

      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </section>
  );
}
