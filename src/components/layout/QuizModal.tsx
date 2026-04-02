'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STEPS = [
  {
    title: 'ЧТО НУЖНО СДЕЛАТЬ?',
    options: ['Уничтожение клещей', 'Борьба с борщевиком', 'Удаление кротов', 'Спил и лечение деревьев']
  },
  {
    title: 'КАКАЯ ПЛОЩАДЬ?',
    options: ['До 10 соток', 'От 10 до 20 соток', 'От 20 соток до 1 Га', 'Больше 1 Гектара']
  }
];

export default function QuizModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [phone, setPhone] = useState('+7 (___) ___-__-__');
  const [toastMsg, setToastMsg] = useState<{ type: 'error' | 'success', title: string, desc: string } | null>(null);

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('7') || input.startsWith('8')) input = input.slice(1);
    
    let formatted = '+7 (';
    if (input.length > 0) formatted += input.slice(0, 3);
    else formatted += '___';
    
    formatted += ') ';
    if (input.length > 3) formatted += input.slice(3, 6);
    else formatted += '___';
    
    formatted += '-';
    if (input.length > 6) formatted += input.slice(6, 8);
    else formatted += '__';
    
    formatted += '-';
    if (input.length > 8) formatted += input.slice(8, 10);
    else formatted += '__';

    setPhone(formatted);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-4"
        >
          {/* Internal Toast Notification */}
          <AnimatePresence>
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className={`fixed top-8 left-1/2 -translate-x-1/2 p-6 z-[120] flex items-center gap-4 shadow-2xl max-w-sm border w-full ${toastMsg.type === 'error' ? 'bg-red-50 border-red-200 text-red-900' : 'bg-foreground border-foreground text-background'}`}
              >
                <div className="flex flex-col gap-1">
                  <span className={`font-mono text-xs tracking-widest font-bold ${toastMsg.type === 'error' ? 'text-red-700' : 'text-background/60'}`}>{toastMsg.title}</span>
                  <span className="text-sm">{toastMsg.desc}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-[110] text-foreground bg-zinc-200 hover:bg-zinc-300 px-4 py-3 rounded-full font-mono text-xs tracking-widest uppercase transition-colors flex items-center gap-2"
          >
            <span>[</span> Закрыть <span>]</span>
          </button>

          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-2xl bg-white border border-border p-8 md:p-12 shadow-2xl relative"
          >
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 h-1 bg-foreground transition-all duration-500" style={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }} />

            <div className="mb-12">
              <span className="font-mono text-xs tracking-widest text-foreground/50 uppercase block mb-4">
                [ ШАГ {step + 1} ИЗ {STEPS.length + 1} ]
              </span>
              <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">
                {step < STEPS.length ? STEPS[step].title : 'КУДА ПРИСЛАТЬ РАСЧЕТ?'}
              </h3>
            </div>

            {step < STEPS.length ? (
              <div className="flex flex-col gap-4">
                {STEPS[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className="w-full p-6 text-left border border-border hover:border-foreground hover:bg-zinc-50 transition-colors font-mono tracking-widest uppercase text-sm md:text-base font-bold flex justify-between group"
                  >
                    <span>{option}</span>
                    <span className="text-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase text-foreground/50 block mb-3">
                    ТЕЛЕФОН ИЛИ WHATSAPP
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="w-full bg-transparent border-b border-border py-4 font-mono text-xl tracking-widest focus:outline-none focus:border-foreground placeholder:text-foreground/20 transition-colors"
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-6 bg-foreground text-background font-bold tracking-widest uppercase transition-colors hover:bg-zinc-800"
                >
                  [ Получить расчет стоимости ]
                </button>
                <p className="text-xs font-mono text-foreground/40 text-center -mt-4">
                  Оставляя номер, вы даете согласие на обработку перс. данных. // 01
                </p>
              </form>
            )}
            
            {/* Back button */}
            {step > 0 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="mt-8 font-mono text-xs tracking-widest uppercase text-foreground/50 hover:text-foreground transition-colors"
                disabled={step === STEPS.length && answers.length === 0}
              >
                [ ← НАЗАД ]
              </button>
            )}
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
