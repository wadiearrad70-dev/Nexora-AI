import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HERO_IMAGE } from '../data/content';
import { ArrowRight, ArrowLeft, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartProject, onExploreWork }) => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Kicker label without pill box */}
        <div className="mb-6 flex items-center gap-2 text-xs font-semibold tracking-wider text-amber-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t('وكالة DIEWA للحلول والخدمات الرقمية المتطورة', 'DIEWA ADVANCED DIGITAL SOLUTIONS STUDIO')}</span>
        </div>

        {/* 2-Column Split: Editorial Value Prop & Architectural Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading, Subtitle & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-black text-white tracking-tight leading-[1.18] mb-6"
              style={{ textWrap: 'balance' }}
            >
              {lang === 'ar' ? (
                <>
                  نبتكر <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">حلولاً برمجية وتجارب رقمية</span> تصنع ريادة مستدامة لشركتك.
                </>
              ) : (
                <>
                  We engineer <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">resilient digital products</span> built for exponential market scale.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-normal">
              {t(
                'استوديو هندسي متكامل متخصص في تطوير المنصات السحابية عالية الأداء، تصميم واجهات وتجربة المستخدم فائقة الدقة، وأتمتة العمليات المعقدة للمؤسسات والشركات الطموحة.',
                'A dedicated digital engineering studio crafting mission-critical cloud software, high-conversion visual design systems, and automated enterprise workflows.'
              )}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onStartProject}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-all shadow-md shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
              >
                <span>{t('ابدأ مشروعك الرقمي', 'Start Your Digital Project')}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 border border-white/10 rounded-lg transition-all whitespace-nowrap"
              >
                <span>{t('استكشف سابقة الأعمال', 'Explore Case Studies')}</span>
              </button>
            </div>

            {/* Trust Markers without pills */}
            <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 border-t border-white/10 pt-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('ملكية كاملة للكود والأصول', '100% IP & Code Ownership')}</span>
              </div>
              <span className="text-slate-600">·</span>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{t('تسليم تدريجي كل أسبوعين', 'Fortnightly Sprint Handover')}</span>
              </div>
              <span className="text-slate-600">·</span>
              <a 
                href="https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors inline-flex items-center gap-1"
              >
                <span>{t('جروب واتساب لتطوير الذكاء الاصطناعي', 'WhatsApp AI Dev Group')}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-900/50 shadow-2xl shadow-black/60 group">
              
              {/* Image Frame with proper fallback */}
              <div className="aspect-[16/10] sm:aspect-[4/3] w-full relative overflow-hidden bg-slate-950">
                <img
                  src={HERO_IMAGE}
                  alt={t('استوديو DIEWA لتطوير البرمجيات والحلول الرقمية', 'DIEWA Digital Technology Studio')}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Subtle scrim overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-transparent opacity-80" />
              </div>

              {/* Inset metadata highlight at bottom */}
              <div className="p-5 bg-[#090D14]/90 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                    {t('المعمارية الهندسية', 'Architecture Standard')}
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {t('React 19 · Next.js · TypeScript · Cloud Native', 'React 19 · Next.js · TypeScript · Cloud Native')}
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-xs text-amber-400 font-mono-numbers font-medium">
                    SLA 99.99%
                  </div>
                  <div className="text-xs text-slate-400">
                    {t('موثوقية تشغيلية', 'Enterprise Uptime')}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Proof & KPI Strip (Mandatory Claim-to-Proof Adjacency) */}
        <div className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
              +140%
            </span>
            <span className="text-xs font-medium text-slate-400 mt-1">
              {t('متوسط نمو معدل التحويل للعملاء', 'Average client conversion uplift')}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
              42ms
            </span>
            <span className="text-xs font-medium text-slate-400 mt-1">
              {t('متوسط سرعة استجابة المنصات السحابية', 'Average cloud response latency')}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
              100%
            </span>
            <span className="text-xs font-medium text-slate-400 mt-1">
              {t('ملكية الكود وحرية النقل والاستضافة', 'Total code ownership & IP transfer')}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-3xl lg:text-4xl font-extrabold text-white font-mono-numbers tracking-tight">
              30-60
            </span>
            <span className="text-xs font-medium text-slate-400 mt-1">
              {t('يوماً ضمان ودعم فني مجاني بعد الإطلاق', 'Days comprehensive launch warranty')}
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
