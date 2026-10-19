import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { TESTIMONIALS } from '../data/content';
import { Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="py-24 bg-[#070A10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            {t('آراء الشركاء ومسؤولي التقنية', 'Client Testimonials & Outcomes')}
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {t(
              'شهادات موثقة من قيادات تقنية ورواد أعمال اعتمدوا على DIEWA',
              'Concrete feedback from executives and founders who built with DIEWA'
            )}
          </h2>
        </div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-7 rounded-2xl bg-slate-900/40 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all"
            >
              <div>
                <Quote className="w-8 h-8 text-amber-400/40 mb-4" />
                
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  "{lang === 'ar' ? item.quote.ar : item.quote.en}"
                </p>
              </div>

              <div className="pt-5 border-t border-white/5">
                <div className="text-xs font-mono font-bold text-amber-400 mb-2">
                  {item.metricResult}
                </div>
                <div className="font-bold text-sm text-white">
                  {lang === 'ar' ? item.name.ar : item.name.en}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === 'ar' ? item.role.ar : item.role.en} · <span className="text-slate-300">{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
