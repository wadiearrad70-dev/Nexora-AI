import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { METHODOLOGY_STEPS } from '../data/content';
import { GitBranch, Shield, Terminal, Rocket } from 'lucide-react';

export const MethodologySection: React.FC = () => {
  const { lang, t } = useLanguage();

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <GitBranch className="w-5 h-5 text-amber-400" />;
      case 1: return <Terminal className="w-5 h-5 text-amber-400" />;
      case 2: return <Shield className="w-5 h-5 text-amber-400" />;
      case 3: return <Rocket className="w-5 h-5 text-amber-400" />;
      default: return <GitBranch className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="methodology" className="py-24 bg-[#090D14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            {t('منهجية العمل الهندسية الصارمة', 'Engineering Discipline & Process')}
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {t(
              'مسار واضح ومنضبط يضمن دقة التسليم وجودة البرمجيات',
              'A structured 4-phase execution framework guaranteeing on-time delivery'
            )}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t(
              'لا نترك شيئاً للصدفة؛ نتبع بروتوكولاً هندسياً يضمن الشفافية الكاملة لكل سبرنت تسليمي مع اختبارات مستمرة.',
              'Every sprint is governed by rigorous automated validation, client transparency, and immutable milestone checklists.'
            )}
          </p>
        </div>

        {/* 4-Step Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {METHODOLOGY_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-xl bg-slate-900/40 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                    {getStepIcon(idx)}
                  </div>
                  <span className="text-xl font-black font-mono text-slate-600">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-2.5">
                  {lang === 'ar' ? step.title.ar : step.title.en}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {lang === 'ar' ? step.desc.ar : step.desc.en}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-amber-400/80">
                <span>{t('المرحلة', 'Phase')} {idx + 1}</span>
                <span>·</span>
                <span>{idx === 0 ? 'W1' : idx === 1 ? 'W2-3' : idx === 2 ? 'W4-6' : 'W7+'}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
