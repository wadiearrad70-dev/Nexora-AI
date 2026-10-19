import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Calculator, Clock, CalendarCheck, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface EstimatorSectionProps {
  onApplyEstimate: (estimateSummary: {
    projectType: string;
    scale: string;
    velocity: string;
    support: string;
    estimatedCost: string;
    estimatedWeeks: string;
  }) => void;
}

export const EstimatorSection: React.FC<EstimatorSectionProps> = ({ onApplyEstimate }) => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ArrowLeft : ArrowRight;

  const [projectType, setProjectType] = useState<'web' | 'ecommerce' | 'mobile' | 'uiux' | 'ai'>('web');
  const [scale, setScale] = useState<'mvp' | 'growth' | 'enterprise'>('growth');
  const [velocity, setVelocity] = useState<'standard' | 'fast'>('standard');
  const [support, setSupport] = useState<'included' | 'extended'>('included');

  const projectTypeOptions = [
    { id: 'web', labelAr: 'منصة ويب سحابية / SaaS', labelEn: 'Cloud Web Platform / SaaS', baseCost: 4500, baseWeeks: 6 },
    { id: 'ecommerce', labelAr: 'متجر تجارة إلكترونية متطور', labelEn: 'Advanced E-Commerce Store', baseCost: 3800, baseWeeks: 5 },
    { id: 'mobile', labelAr: 'تطبيق هاتف ذكي (iOS & Android)', labelEn: 'Mobile App (iOS & Android)', baseCost: 5200, baseWeeks: 7 },
    { id: 'uiux', labelAr: 'تصميم واجهات ونظام Design System', labelEn: 'UI/UX & Design System', baseCost: 2600, baseWeeks: 3 },
    { id: 'ai', labelAr: 'أتمتة أعمال ونماذج ذكاء اصطناعي', labelEn: 'AI & Workflow Automation', baseCost: 3400, baseWeeks: 4 }
  ];

  const scaleMultiplier = {
    mvp: { multiplier: 0.8, weeksDiff: -1, labelAr: 'إطلاق أولي (MVP)', labelEn: 'Core MVP Launch' },
    growth: { multiplier: 1.25, weeksDiff: 1, labelAr: 'نمو متسارع وتوسع', labelEn: 'Growth & High Scalability' },
    enterprise: { multiplier: 2.1, weeksDiff: 4, labelAr: 'مؤسسي بمواصفات أمنية بنكية', labelEn: 'Enterprise Grade & Compliance' }
  };

  const calculation = useMemo(() => {
    const selectedBase = projectTypeOptions.find((p) => p.id === projectType) || projectTypeOptions[0];
    const scaleData = scaleMultiplier[scale];

    let total = selectedBase.baseCost * scaleData.multiplier;
    let weeks = Math.max(3, selectedBase.baseWeeks + scaleData.weeksDiff);

    if (velocity === 'fast') {
      total *= 1.3;
      weeks = Math.max(2, Math.round(weeks * 0.65));
    }

    if (support === 'extended') {
      total += 1200;
    }

    const minCost = Math.round(total * 0.9 / 100) * 100;
    const maxCost = Math.round(total * 1.15 / 100) * 100;

    return {
      minCost,
      maxCost,
      weeks,
      typeName: lang === 'ar' ? selectedBase.labelAr : selectedBase.labelEn,
      scaleName: lang === 'ar' ? scaleData.labelAr : scaleData.labelEn,
      velocityName: velocity === 'fast' 
        ? t('مسار سريع ومكثف', 'Fast-Track Sprint') 
        : t('الوتيرة القياسية المنتظمة', 'Standard Cadence'),
      supportName: support === 'extended' 
        ? t('ضمان ودعم ممتد 6 أشهر', '6-Month Retainer') 
        : t('ضمان مجاني 45 يوماً', 'Standard 45-Day Warranty')
    };
  }, [projectType, scale, velocity, support, lang]);

  const handleApply = () => {
    onApplyEstimate({
      projectType: calculation.typeName,
      scale: calculation.scaleName,
      velocity: calculation.velocityName,
      support: calculation.supportName,
      estimatedCost: `$${calculation.minCost.toLocaleString()} - $${calculation.maxCost.toLocaleString()}`,
      estimatedWeeks: `${calculation.weeks} ${t('أسابيع', 'weeks')}`
    });
  };

  return (
    <section id="estimator" className="py-24 bg-[#090D14] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center justify-center gap-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>{t('الشفافية الهندسية والميزانية', 'Transparent Engineering Scope')}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            {t('حاسبة تقدير ميزانية ونطاق مشروعك الرقمي', 'Interactive Digital Project Cost & Timeline Estimator')}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t(
              'حدد مواصفات مشروعك للحصول على تقدير استرشادي فوري للجدول الزمني والميزانية دون أي التزام.',
              'Configure your technical requirements to generate an instantaneous scope and schedule estimate.'
            )}
          </p>
        </div>

        {/* Calculator Body: 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Column */}
          <div className="lg:col-span-7 space-y-8 bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8">
            
            {/* 1. Project Type Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                1. {t('نوع المنظومة الرقمية المطلوبة', 'Project Classification')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {projectTypeOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setProjectType(opt.id as any)}
                    className={`p-3.5 text-start rounded-xl border text-xs font-medium transition-all ${
                      projectType === opt.id
                        ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                        : 'bg-slate-900/80 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold">{lang === 'ar' ? opt.labelAr : opt.labelEn}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Scale & Architecture */}
            <div>
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
                2. {t('نطاق التوسع والتعقيد الهندسي', 'Scale & Architectural Density')}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {(['mvp', 'growth', 'enterprise'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setScale(s)}
                    className={`p-3.5 text-center rounded-xl border text-xs font-medium transition-all ${
                      scale === s
                        ? 'bg-amber-400/10 border-amber-400 text-white shadow-sm'
                        : 'bg-slate-900/80 border-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold mb-1">
                      {lang === 'ar' ? scaleMultiplier[s].labelAr : scaleMultiplier[s].labelEn}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Velocity & Support Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
                  3. {t('سرعة التسليم', 'Engineering Velocity')}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setVelocity('standard')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      velocity === 'standard'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-slate-900/60 border-white/5 text-slate-400'
                    }`}
                  >
                    {t('قياسي منتظم', 'Standard Cadence')}
                  </button>
                  <button
                    onClick={() => setVelocity('fast')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      velocity === 'fast'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-slate-900/60 border-white/5 text-slate-400'
                    }`}
                  >
                    {t('مكثف وسريع (+30%)', 'Fast-Track Sprint')}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2.5">
                  4. {t('خدمات ما بعد الإطلاق', 'Post-Launch Retainer')}
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSupport('included')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      support === 'included'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-slate-900/60 border-white/5 text-slate-400'
                    }`}
                  >
                    {t('ضمان 45 يوماً', 'Included 45 Days')}
                  </button>
                  <button
                    onClick={() => setSupport('extended')}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      support === 'extended'
                        ? 'bg-amber-400/10 border-amber-400 text-white'
                        : 'bg-slate-900/60 border-white/5 text-slate-400'
                    }`}
                  >
                    {t('دعم 6 أشهر', '6-Mo SLA Support')}
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Result Card Column */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-white/15 rounded-2xl p-6 sm:p-8 shadow-xl relative sticky top-28">
            <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
              {t('الملخص التقديري للمشروع', 'Live Scope Breakdown')}
            </div>
            
            {/* Price Output */}
            <div className="mt-3 mb-6 pb-6 border-b border-white/10">
              <div className="text-xs text-slate-400 mb-1">
                {t('نطاق الميزانية التقديرية', 'Estimated Investment Range')}
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono-numbers">
                ${calculation.minCost.toLocaleString()} - ${calculation.maxCost.toLocaleString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {lang === 'ar' ? 'قابلة للتقسيط وفق مراحل الإنجاز المعتمدة' : 'Structured in transparent milestone tranches'}
              </div>
            </div>

            {/* Timeline Output */}
            <div className="space-y-4 mb-8 text-xs text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('المدة المتوقعة للإطلاق:', 'Estimated Timeline:')}</span>
                </span>
                <span className="font-semibold text-white font-mono-numbers">
                  ~{calculation.weeks} {t('أسابيع هندسية', 'development weeks')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('تسليم أول نسخة تفاعلية:', 'First Interactive Sprint:')}</span>
                </span>
                <span className="font-semibold text-white font-mono-numbers">
                  {t('بعد 14 يوماً فقط', 'Within 14 days')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('حقوق الكود:', 'IP & Code Rights:')}</span>
                </span>
                <span className="font-semibold text-amber-300">
                  {t('ملكية تامة 100% للعميل', '100% Client Ownership')}
                </span>
              </div>
            </div>

            {/* Transfer to consultation CTA */}
            <button
              onClick={handleApply}
              className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
            >
              <span>{t('اعتماد هذا النطاق وحجز جلسة استكشافية', 'Lock Scope & Book Discovery Call')}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-slate-500 text-center mt-3">
              {t(
                'التقدير استرشادي، وسيتم تثبيت السعر النهائي الدقيق في العقد بعد جلسة النقاش التقني.',
                'Formal quote finalized after the technical discovery session with zero hidden fees.'
              )}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
