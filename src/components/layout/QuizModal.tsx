'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Check } from 'lucide-react';
import PrivacyModal from '../ui/PrivacyModal';
import { IMaskInput } from 'react-imask';
import { submitLead } from '@/lib/lead-client';

const STEPS = [
  {
    title: 'Что нужно сделать?',
    options: [
      'Уничтожение клещей и комаров', 
      'Борьба с борщевиком / сорняками', 
      'Спил и лечение деревьев', 
      'Защита от кротов и вредителей',
      'Другая проблема (Опишу по телефону)'
    ]
  },
  {
    title: 'Какая площадь?',
    options: ['До 10 соток', 'От 10 до 20 соток', 'От 20 соток до 1 Га', 'Больше 1 Гектара']
  }
];

export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState<{ type: 'error' | 'success', title: string, desc: string } | null>(null);
  
  // 152-FZ Consent States
  const [consentGiven, setConsentGiven] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [shakeConsent, setShakeConsent] = useState(false);

  useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#quiz') {
        setIsOpen(true);
        setStep(0);
        setAnswers([]);
        document.body.style.overflow = 'hidden';
      } else {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
    };
    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => {
      window.removeEventListener('hashchange', handleHash);
      document.body.style.overflow = '';
    };
  }, []);

  const closeModal = () => {
    window.history.pushState(null, '', window.location.pathname + window.location.search);
    const event = new Event('hashchange');
    window.dispatchEvent(event);
  };

  const handleOptionSelect = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    if (step < STEPS.length) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentGiven) {
      setShakeConsent(true);
      setTimeout(() => setShakeConsent(false), 500);
      return;
    }

    if (phone.includes('_') || phone.length < 18) {
      setToastMsg({
        type: 'error',
        title: '[ ОШИБКА ВВОДА ]',
        desc: 'Пожалуйста, введите корректный номер телефона полностью.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitLead({
        source: 'Квиз расчета стоимости',
        phone,
        answers,
      });

      setToastMsg({
        type: 'success',
        title: '[ РАСЧЕТ ОТПРАВЛЕН ]',
        desc: `Заявка №${result.ticketId} принята. Наш инженер свяжется с вами в течение 10 минут.`
      });
      setTimeout(() => {
        closeModal();
      }, 2000);
    } catch (error) {
      setToastMsg({
        type: 'error',
        title: '[ НЕ УДАЛОСЬ ОТПРАВИТЬ ]',
        desc: error instanceof Error ? error.message : 'Попробуйте еще раз или позвоните нам напрямую.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  // react-imask handles formatting constraints

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6 lg:p-8"
        >
          {/* Internal Toast Notification */}
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-8 left-1/2 -translate-x-1/2 p-6 z-[120] flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-full max-w-sm w-full ${toastMsg.type === 'error' ? 'bg-red-50 text-red-900 border border-red-200' : 'bg-[#1D1D1F] text-white'}`}
              >
                {toastMsg.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#2D6A4F]" />}
                <div className="flex flex-col">
                  <span className={`text-[10px] uppercase font-bold tracking-[0.2em] mb-1 ${toastMsg.type === 'error' ? 'text-red-700' : 'text-[#2D6A4F]'}`}>{toastMsg.title}</span>
                  <span className="text-[13px] font-medium leading-tight">{toastMsg.desc}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-[#F5F5F0] rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header Area */}
            <div className="flex items-center justify-between p-6 sm:p-10 border-b border-black/5">
              <div className="flex items-center gap-3">
                <span className="bg-white px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-black/60 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                  Шаг {step + 1} из {STEPS.length + 1}
                </span>
              </div>
              <button 
                onClick={closeModal}
                className="w-10 h-10 bg-white hover:bg-black/5 hover:scale-105 rounded-full flex items-center justify-center transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
              >
                <X size={18} className="text-black/60" />
              </button>
            </div>

            {/* Progress Bar under header */}
            <div className="w-full h-1 bg-black/5">
              <div className="h-full bg-[#2D6A4F] transition-all duration-500 ease-out" style={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }} />
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-10 overflow-y-auto">
              <div className="mb-10 text-center">
                <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-black leading-tight tracking-tighter text-[#1D1D1F]">
                  {step < STEPS.length ? STEPS[step].title : 'Куда прислать расчет?'}
                </h3>
              </div>

              {step < STEPS.length ? (
                <div className="flex flex-col gap-3 max-w-md mx-auto w-full">
                  {STEPS[step].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(option)}
                      className="group flex items-center justify-between px-6 py-4 text-left bg-white border border-black/5 hover:border-black/10 hover:bg-black/[0.02] rounded-2xl hover:-translate-y-[2px] transition-all duration-300 w-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    >
                      <span className="text-[15px] font-bold text-[#1D1D1F] pr-4">{option}</span>
                      <div className="w-8 h-8 rounded-full bg-[#F5F5F0] flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors shrink-0 text-black/30 group-hover:border-transparent">
                        <ArrowRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm mx-auto">
                  <div className="flex flex-col">
                    <label className="text-[11px] font-bold tracking-widest uppercase text-black/40 mb-3 ml-4">
                      ТЕЛЕФОН ИЛИ WHATSAPP
                    </label>
                    <IMaskInput
                      mask="+{7} (000) 000-00-00"
                      type="tel"
                      value={phone}
                      onAccept={(value) => setPhone(value)}
                      className="w-full bg-white border border-black/5 px-6 py-5 rounded-full font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-[#2D6A4F] focus:border-transparent placeholder:text-black/20 text-center transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>

                  {/* 152-FZ Checkbox */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setConsentGiven(!consentGiven)}
                      className="flex items-start gap-3 w-full text-left group"
                    >
                      <motion.div 
                        animate={shakeConsent ? { x: [-5, 5, -5, 5, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 rounded-full border flex items-center justify-center transition-all duration-300 ${consentGiven ? 'bg-[#2D6A4F] border-[#2D6A4F]' : shakeConsent ? 'border-red-500 bg-red-50' : 'border-black/20 bg-white group-hover:border-black/40'}`}
                      >
                        <AnimatePresence>
                          {consentGiven && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                              <Check size={12} className="text-white" strokeWidth={4} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                      <span className={`text-[10px] sm:text-[11px] font-medium leading-[1.4] transition-colors duration-300 ${shakeConsent ? 'text-red-500' : 'text-black/40 group-hover:text-black/60'}`}>
                        Я согласен на обработку персональных данных в соответствии с{' '}
                        <span 
                          onClick={(e) => { e.stopPropagation(); setIsPrivacyOpen(true); }}
                          className="text-[#2D6A4F] underline decoration-black/20 underline-offset-2 hover:decoration-[#2D6A4F]"
                        >
                          Политикой конфиденциальности
                        </span>
                      </span>
                    </button>

                    <button
                      type="submit"
                      disabled={!consentGiven || isSubmitting}
                      className={`w-full py-5 rounded-full text-white font-bold text-[13px] uppercase tracking-wide transition-all duration-300 ${consentGiven ? 'bg-[#2D6A4F] hover:scale-105 shadow-[0_8px_30px_rgba(45,106,79,0.4)] cursor-pointer' : 'bg-black/20 cursor-not-allowed'}`}
                    >
                      {isSubmitting ? 'Отправляем...' : 'Получить расчет'}
                    </button>
                  </div>
                </form>
              )}
            </div>
            
            {/* Footer / Back button */}
            {step > 0 && (
              <div className="p-6 border-t border-black/5 bg-black/[0.02] flex justify-center mt-auto">
                <button 
                  onClick={() => setStep(step - 1)}
                  className="text-[11px] font-bold tracking-widest uppercase text-black/40 hover:text-black transition-colors"
                  disabled={step === STEPS.length && answers.length === 0}
                >
                  ← Назад к шагу {step}
                </button>
              </div>
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>

    <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}
