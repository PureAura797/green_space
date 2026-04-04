'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when the modal is open
  useEffect(() => {
    if (!isOpen) return;
    
    // Save original overflow
    const originalStyle = window.getComputedStyle(document.body).overflow;  
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-md p-4 sm:p-6 lg:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            // We use standard white/cream layout to match the Bento system
            className="w-full max-w-3xl bg-[#F5F5F0] rounded-[32px] md:rounded-[40px] shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between p-6 sm:p-10 border-b border-black/5 bg-white">
              <h3 className="text-xl sm:text-2xl font-black tracking-tight text-[#1D1D1F]">
                Политика конфиденциальности
              </h3>
              <button 
                onClick={onClose}
                className="w-10 h-10 bg-[#F5F5F0] hover:bg-black/5 hover:scale-105 rounded-full flex items-center justify-center transition-all shadow-[0_2px_10px_rgba(0,0,0,0.02)] shrink-0"
              >
                <X size={18} className="text-black/60" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-6 sm:p-10 overflow-y-auto bg-white flex-1 text-sm sm:text-base text-black/70 font-medium leading-relaxed space-y-6">
              <p>
                Настоящая Политика конфиденциальности персональных данных (далее – Политика) действует в отношении всей информации, которую сайт <strong>ГОС_ЛЕНД</strong> может получить о Пользователе во время использования сайта, программ и продуктов.
              </p>

              <div>
                <h4 className="text-black font-bold mb-2">1. Определение терминов</h4>
                <p>1.1. В настоящей Политике используются следующие термины:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><strong>«Администрация сайта»</strong> — уполномоченные сотрудники на управление сайтом (ИП Иванов И.И., ИНН 1234567890).</li>
                  <li><strong>«Персональные данные»</strong> — любая информация, относящаяся к прямо или косвенно определенному или определяемому физическому лицу.</li>
                  <li><strong>«Обработка персональных данных»</strong> — любое действие с персональными данными, совершаемое с использованием средств автоматизации или без таковых (сбор, запись, хранение, уточнение, использование, удаление).</li>
                </ul>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">2. Предмет политики конфиденциальности</h4>
                <p>2.1. Настоящая Политика устанавливает обязательства Администрации сайта по неразглашению и обеспечению режима защиты конфиденциальности персональных данных, которые Пользователь предоставляет:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Фамилия, Имя, Отчество;</li>
                  <li>Контактный телефон;</li>
                  <li>Адрес электронной почты (e-mail);</li>
                  <li>IP-адрес и данные файлов cookies.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">3. Цели сбора персональной информации</h4>
                <p>3.1. Персональные данные Пользователя Администрация сайта может использовать в целях:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Установления с Пользователем обратной связи, включая направление уведомлений, запросов, касающихся использования Сайта, оказания услуг.</li>
                  <li>Определения места нахождения Пользователя для обеспечения безопасности, предотвращения мошенничества.</li>
                  <li>Предоставления Пользователю эффективной клиентской и технической поддержки.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">4. Сроки и способы обработки</h4>
                <p>
                  4.1. Обработка персональных данных Пользователя осуществляется без ограничения срока (до достижения целей обработки), любым законным способом.
                </p>
                <p className="mt-2">
                  4.2. Пользователь может в любой момент отозвать свое согласие, направив письменное уведомление на email: <strong>info@goslend.ru</strong>.
                </p>
              </div>

              <div>
                <h4 className="text-black font-bold mb-2">5. Использование файлов Cookie</h4>
                <p>
                  5.1. Сайт собирает и обрабатывает файлы cookie (данные о пользовательских сессиях, источниках перехода, IP-адресе и другие технические метрики) с целью обеспечения корректной работы сайта и проведения статистических исследований с помощью систем аналитики (в том числе «Яндекс.Метрика»).
                </p>
                <p className="mt-2 text-[#2D6A4F] font-bold">
                  5.2. Продолжая использовать данный Сайт без изменения настроек браузера, Пользователь выражает свое безусловное согласие на сбор и обработку файлов cookie. В случае несогласия с данным пунктом Пользователь обязан немедленно прекратить использование Сайта.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 shrink-0 border-t border-black/5 bg-[#F5F5F0] flex justify-center mt-auto">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-[#1D1D1F] text-white rounded-full font-bold text-[13px] uppercase tracking-wide hover:scale-105 transition-all shadow-lg"
              >
                Понятно, закрыть
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
