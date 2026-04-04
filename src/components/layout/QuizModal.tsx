'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle2, Check } from 'lucide-react';
import PrivacyModal from '../ui/PrivacyModal';
import { IMaskInput } from 'react-imask';

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

  const handleSubmit = (e: React.FormEvent) => {
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

    // Success
    setToastMsg({
      type: 'success',
      title: '[ РАСЧЕТ ОТПРАВЛЕН ]',
      desc: 'Наш инженер свяжется с вами в течение 10 минут.'
    });
    setTimeout(() => {
      closeModal();
    }, 2000);
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
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            className="w-full max-w-5xl bg-[#1D1D1F] rounded-[32px] sm:rounded-[40px] shadow-[0_30px_80px_rgba(0,0,0,0.6)] relative flex flex-col md:flex-row max-h-[90vh] overflow-hidden border border-white/5"
          >
            {/* Left Side: Interactive UI */}
            <div className="w-full md:w-1/2 flex flex-col h-full overflow-y-auto relative z-10">
              {/* Header Area */}
              <div className="flex items-center justify-between p-6 sm:p-10 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-3">
                  <span className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase text-white/50">
                    Шаг {step + 1} из {STEPS.length + 1}
                  </span>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/5 hover:scale-105 rounded-full flex items-center justify-center transition-all"
                >
                  <X size={18} className="text-white/60" />
                </button>
              </div>

              {/* Progress Bar under header */}
              <div className="w-full h-1 bg-white/5 shrink-0">
                <div className="h-full bg-[#34C759] shadow-[0_0_15px_rgba(52,199,89,0.4)] transition-all duration-500 ease-out relative" style={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }}>
                  <div className="absolute right-0 top-0 bottom-0 w-10 bg-white/30 blur-[2px]" />
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center">
                <div className="mb-10 text-center md:text-left">
                  <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-black leading-[1.1] tracking-tighter text-white">
                    {step < STEPS.length ? STEPS[step].title : 'Куда прислать расчет?'}
                  </h3>
                </div>

                {step < STEPS.length ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                    {STEPS[step].options.map((option) => (
                      <button
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        className="group flex items-center justify-between p-6 text-left bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300"
                      >
                        <span className="text-[14px] font-bold text-white pr-4">{option}</span>
                        <div className="w-8 h-8 rounded-full bg-black/40 border border-white/10 flex items-center justify-center group-hover:bg-[#2D6A4F] group-hover:text-white transition-colors shrink-0 text-white/40 group-hover:border-transparent">
                          <ArrowRight size={16} />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-sm mx-auto md:mx-0 w-full relative z-20">
                    <div className="flex flex-col">
                      <label className="text-[11px] font-bold tracking-widest uppercase text-white/40 mb-3 ml-4">
                        ТЕЛЕФОН ИЛИ WHATSAPP
                      </label>
                      <IMaskInput
                        mask="+{7} (000) 000-00-00"
                        type="tel"
                        value={phone}
                        onAccept={(value) => setPhone(value)}
                        className="w-full h-16 sm:h-20 bg-black/40 border border-white/10 px-8 rounded-full font-bold text-lg tracking-wide focus:outline-none focus:ring-1 focus:ring-white/30 focus:bg-white/5 placeholder:text-white/20 text-white transition-all text-center md:text-left shadow-inner"
                        placeholder="+7 (999) 000-00-00"
                      />
                    </div>

                    {/* 152-FZ Checkbox */}
                    <div className="flex flex-col gap-4">
                      <button
                        type="button"
                        onClick={() => setConsentGiven(!consentGiven)}
                        className="flex items-start gap-3 w-full text-left group pt-2"
                      >
                        <motion.div 
                          animate={shakeConsent ? { x: [-5, 5, -5, 5, 0] } : {}}
                          transition={{ duration: 0.4 }}
                          className={`w-5 h-5 flex-shrink-0 mt-0.5 rounded-full border flex items-center justify-center transition-all duration-300 ${consentGiven ? 'bg-[#2D6A4F] border-[#2D6A4F]' : shakeConsent ? 'border-red-500 bg-red-500/20' : 'border-white/20 bg-black/20 group-hover:border-white/40'}`}
                        >
                          <AnimatePresence>
                            {consentGiven && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                <Check size={12} className="text-white" strokeWidth={4} />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        <span className={`text-[10px] sm:text-[11px] font-medium leading-[1.4] transition-colors duration-300 tracking-wide ${shakeConsent ? 'text-red-400' : 'text-white/40 group-hover:text-white/60'}`}>
                          Я согласен на обработку персональных данных в соответствии с{' '}
                          <span 
                            onClick={(e) => { e.stopPropagation(); setIsPrivacyOpen(true); }}
                            className="text-white/70 underline decoration-white/20 underline-offset-3 hover:text-white hover:decoration-white/50 transition-colors"
                          >
                            Политикой конфиденциальности
                          </span>
                        </span>
                      </button>

                      <button
                        type="submit"
                        className={`w-full h-16 sm:h-20 flex items-center justify-center rounded-full text-white font-bold text-[13px] uppercase tracking-wide transition-all duration-300 ${consentGiven ? 'bg-[#2D6A4F] hover:brightness-110 active:scale-[0.98] shadow-lg cursor-pointer' : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/5'}`}
                      >
                        Получить расчет
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Footer / Back button */}
              {step > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20 shrink-0">
                  <button 
                    onClick={() => setStep(step - 1)}
                    className="text-[11px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors flex items-center gap-2"
                    disabled={step === STEPS.length && answers.length === 0}
                  >
                    <span>←</span> Назад к шагу {step}
                  </button>
                </div>
              )}
            </div>

            {/* Right Side: 3D Image Poster */}
            <div 
              className="hidden md:block w-1/2 bg-[#0F0F10] relative border-l border-white/5"
              style={{
                backgroundImage: 'url(/images/quiz-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat'
              }}
            >
               {/* Inner gradient to seamlessly blend the edge with the dark UI */}
               <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#1D1D1F] to-transparent pointer-events-none" />
               <div className="absolute inset-0 bg-[#2D6A4F] opacity-[0.03] mix-blend-screen pointer-events-none" />
            </div>

          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>

    <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
}
