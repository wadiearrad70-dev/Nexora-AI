import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FAQ_ITEMS } from '../data/content';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 bg-[#090D14] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('كل ما يهمك معرفته', 'Frequently Asked Questions')}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {t('الأسئلة الأكثر شيوعاً حول التعاقد والتسليم', 'Everything You Need To Know Before Working With DIEWA')}
          </h2>
          <p className="mt-4 text-base text-slate-400 max-w-2xl mx-auto">
            {t(
              'إجابات شفافة ومباشرة حول التكاليف، ملكية الكود، اتفاقيات مستوى الخدمة، ومنهجية العمل.',
              'Straightforward answers regarding contracts, milestone delivery, code ownership, and warranties.'
            )}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-xl bg-slate-900/40 border border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white">
                    {lang === 'ar' ? item.question.ar : item.question.en}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                    {lang === 'ar' ? item.answer.ar : item.answer.en}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
