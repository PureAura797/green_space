'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contacts() {
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [errors, setErrors] = useState({ name: '', phone: '' });
  const [toast, setToast] = useState<{ show: boolean, message: string } | null>(null);

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
      newErrors.name = '[ ОШИБКА: Укажите ваше имя ]';
      valid = false;
    }
    if (formData.phone.length < 18) {
      newErrors.phone = '[ ОШИБКА: Некорректный номер телефона ]';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const ticketId = Math.floor(100 + Math.random() * 900);
      setToast({ show: true, message: `Заявка №${ticketId} принята. Ожидайте звонка.` });
      setFormData({ name: '', phone: '' });
    }
  };

  return (
    <section id="contacts" className="bg-background text-foreground py-16 md:py-24 lg:py-32 px-4 md:px-8 relative border-b border-border">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-4 md:right-8 bg-foreground text-background p-6 z-50 flex items-center gap-4 shadow-2xl max-w-sm"
          >
            <span className="font-mono text-xs text-background/70 shrink-0 whitespace-nowrap border border-background/20 px-2 py-1">[ УСПЕХ ]</span>
            <span className="font-bold tracking-tight leading-tight">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-2 font-mono text-xl opacity-50 hover:opacity-100 transition-opacity">×</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 md:gap-16 justify-between">
        
        {/* Contact Info */}
        <div className="lg:w-1/2 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase tracking-tighter mb-8 md:mb-12 text-balance">
              Оставить <br />заявку
            </h2>
            <div className="flex flex-col gap-6 md:gap-8">
              <div>
                <p className="font-mono text-xs tracking-widest text-foreground/40 uppercase mb-2">[ Телефон ]</p>
                <a href="tel:+79990000000" className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                  +7 (999) 000-00-00
                </a>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-foreground/40 uppercase mb-2">[ Email ]</p>
                <a href="mailto:info@goslend.ru" className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                  info@goslend.ru
                </a>
              </div>
              <div>
                <p className="font-mono text-xs tracking-widest text-foreground/40 uppercase mb-2">[ Адрес ]</p>
                <p className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">
                  г. Москва, ул. Профессиональная, 1
                </p>
              </div>
            </div>

            {/* Trust badges */}
            <div className="mt-8 md:mt-12 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 border border-foreground/20 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
                <span className="font-mono text-xs tracking-widest text-foreground/50">Договор</span>
              </div>
              <div className="flex items-center gap-2 border border-foreground/20 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                <span className="font-mono text-xs tracking-widest text-foreground/50">Гарантия</span>
              </div>
              <div className="flex items-center gap-2 border border-foreground/20 px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground/50"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                <span className="font-mono text-xs tracking-widest text-foreground/50">Конфиденциально</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:w-1/2 max-w-xl w-full">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8 bg-surface border border-border p-6 sm:p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute inset-0 border-2 border-transparent group-focus-within:border-foreground/10 transition-colors pointer-events-none" />
            
            <div className="flex flex-col gap-2 relative z-10">
              <label htmlFor="name" className="font-mono text-sm tracking-widest text-foreground/50">
                Ваше имя
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-transparent border-b border-foreground/20 py-4 outline-none focus:border-foreground transition-colors font-medium text-lg text-foreground rounded-none"
                placeholder="Иван Иванов"
              />
              {errors.name && <span className="font-mono text-xs text-red-600 mt-2">{errors.name}</span>}
            </div>

            <div className="flex flex-col gap-2 relative z-10">
              <label htmlFor="phone" className="font-mono text-sm tracking-widest text-foreground/50">
                Телефон
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handlePhoneChange}
                className="bg-transparent border-b border-foreground/20 py-4 outline-none focus:border-foreground transition-colors font-mono text-lg text-foreground rounded-none"
                placeholder="+7 (999) 000-00-00"
                maxLength={18}
              />
              {errors.phone && <span className="font-mono text-xs text-red-600 mt-2">{errors.phone}</span>}
            </div>

            <button
              type="submit"
              className="mt-4 md:mt-8 relative z-10 bg-foreground text-background py-5 md:py-6 font-bold tracking-widest uppercase hover:bg-foreground/80 transition-colors border border-foreground w-full flex justify-center items-center gap-4"
            >
              [ Отправить заявку ]
            </button>
            <p className="font-mono text-xs text-foreground/30 text-center mt-2 relative z-10">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности. // 01
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
