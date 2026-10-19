import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { 
  Code2, 
  Layout, 
  ShoppingBag, 
  Cpu, 
  ShieldCheck, 
  Compass, 
  ArrowUpRight, 
  Check, 
  X,
  Clock,
  Layers
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForQuote }) => {
  const { lang, t } = useLanguage();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return <Code2 className="w-5 h-5 text-amber-400" />;
      case 'Layout': return <Layout className="w-5 h-5 text-amber-400" />;
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-amber-400" />;
      default: return <Code2 className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#070A10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3">
            {t('خدماتنا الرقمية المتطورة', 'Core Engineering Capabilities')}
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {t(
              'منظومة تقنية شاملة صُممت لنقل أعمالك إلى مصاف الشركات الرائدة',
              'Disciplined digital capabilities designed to accelerate sustainable market growth'
            )}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t(
              'نجمع بين عمق الهندسة البرمجية وجمال التصميم لتقديم منتجات رقمية متكاملة تحقق عائداً ملموساً على استثمارك.',
              'We unify rigorous backend architecture with bespoke interface design to craft digital systems that scale reliably.'
            )}
          </p>
        </div>

        {/* Bento-style Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={`p-7 rounded-xl bg-slate-900/40 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between group ${
                index === 0 ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-slate-900/70 to-slate-950/60' : ''
              }`}
            >
              <div>
                {/* Header: Editorial Index & Icon */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center">
                      {getServiceIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {service.number}
                    </span>
                  </div>
                  
                  {/* Subtle Timeline text metadata without pill badge */}
                  <span className="text-xs text-slate-400 font-mono-numbers">
                    {lang === 'ar' ? service.timeline.ar : service.timeline.en}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-3">
                  {lang === 'ar' ? service.title.ar : service.title.en}
                </h3>

                {/* Short Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {lang === 'ar' ? service.shortDesc.ar : service.shortDesc.en}
                </p>

                {/* Deliverables snippet */}
                <div className="space-y-2 mb-6">
                  {(lang === 'ar' ? service.deliverables.ar : service.deliverables.en).slice(0, index === 0 ? 3 : 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                {/* Clean unboxed tech tags with dot separator */}
                <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate max-w-[200px]">
                  <span>{service.techStack[0]}</span>
                  <span>·</span>
                  <span>{service.techStack[1]}</span>
                  {service.techStack[2] && (
                    <>
                      <span>·</span>
                      <span>{service.techStack[2]}</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setActiveModalService(service)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{t('تفاصيل الخدمة', 'Explore Scope')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Service Detail Modal */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="w-full max-w-2xl bg-[#0F1420] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-bold text-amber-400">
                {activeModalService.number}
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                {t('نطاق الخدمة الهندسية', 'Service Scope')}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {lang === 'ar' ? activeModalService.title.ar : activeModalService.title.en}
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
              {lang === 'ar' ? activeModalService.fullDesc.ar : activeModalService.fullDesc.en}
            </p>

            {/* Key Deliverables */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>{t('المخرجات والتسليمات المعتمدة', 'Key Deliverables')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(lang === 'ar' ? activeModalService.deliverables.ar : activeModalService.deliverables.en).map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-slate-900/60 border border-white/5 flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack and Timeline */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-white/10 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-slate-400 block mb-1">
                  {t('التقنيات المستخدمة', 'Engineering Stack')}
                </span>
                <span className="text-xs font-medium text-slate-200">
                  {activeModalService.techStack.join(' · ')}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-400 block mb-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('الجدول الزمني المعتاد', 'Typical Timeline')}</span>
                </span>
                <span className="text-xs font-medium text-slate-200 font-mono-numbers">
                  {lang === 'ar' ? activeModalService.timeline.ar : activeModalService.timeline.en}
                </span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                {t('إغلاق', 'Dismiss')}
              </button>
              <button
                onClick={() => {
                  const title = lang === 'ar' ? activeModalService.title.ar : activeModalService.title.en;
                  setActiveModalService(null);
                  onSelectServiceForQuote(title);
                }}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{t('طلب دراسة هذا المشروع', 'Request Scope For This Service')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
