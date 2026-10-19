import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CASE_STUDIES } from '../data/content';
import { CaseStudy } from '../types';
import { ArrowUpRight, Check, X, Sparkles, Layers } from 'lucide-react';

interface PortfolioSectionProps {
  onSelectProjectForInquiry: (projectName: string) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProjectForInquiry }) => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'web' | 'ecommerce' | 'automation'>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  const filteredProjects = filter === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[#070A10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('سابقة الأعمال والنتائج المقاسة', 'Documented Proof & Case Studies')}</span>
            </div>
            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
              style={{ textWrap: 'balance' }}
            >
              {t(
                'مشاريع حقيقية حققت نتائج استثنائية ونمواً قياسياً لعملائنا',
                'Measurable outcomes delivered for fast-growing companies and institutions'
              )}
            </h2>
          </div>

          {/* Functional filter control (tabs permitted by Section 1.A) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900/80 border border-white/10 rounded-lg shrink-0">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'all' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('جميع المشاريع', 'All Work')}
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'web' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('منصات ويب', 'Web Apps')}
            </button>
            <button
              onClick={() => setFilter('ecommerce')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'ecommerce' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('تجارة إلكترونية', 'E-Commerce')}
            </button>
            <button
              onClick={() => setFilter('automation')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                filter === 'automation' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('ذكاء اصطناعي وأتمتة', 'Automation')}
            </button>
          </div>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-slate-900/40 border border-white/10 overflow-hidden flex flex-col justify-between hover:border-amber-400/40 transition-all duration-300"
            >
              <div>
                {/* Visual Frame */}
                <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-950">
                  <img
                    src={project.imagePath}
                    alt={lang === 'ar' ? project.title.ar : project.title.en}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D14]/90 via-transparent to-transparent opacity-60" />
                </div>

                {/* Content Box */}
                <div className="p-6">
                  {/* Clean unboxed metadata kicker */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span className="font-semibold text-slate-200">{project.client}</span>
                    <span>·</span>
                    <span>{lang === 'ar' ? project.categoryLabel.ar : project.categoryLabel.en}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {lang === 'ar' ? project.title.ar : project.title.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {lang === 'ar' ? project.summary.ar : project.summary.en}
                  </p>

                  {/* Impact Proof Metric Box */}
                  <div className="p-3.5 rounded-xl bg-slate-950/60 border border-white/5 flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-black text-amber-400 font-mono-numbers">
                        {project.impactMetric.value}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lang === 'ar' ? project.impactMetric.label.ar : project.impactMetric.label.en}
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="text-base font-bold text-white font-mono-numbers">
                        {project.secondaryMetric.value}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lang === 'ar' ? project.secondaryMetric.label.ar : project.secondaryMetric.label.en}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate max-w-[190px]">
                  <span>{project.tags[0]}</span>
                  <span>·</span>
                  <span>{project.tags[1]}</span>
                  {project.tags[2] && (
                    <>
                      <span>·</span>
                      <span>{project.tags[2]}</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setSelectedCase(project)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap shrink-0"
                >
                  <span>{t('دراسة الحالة', 'Read Study')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedCase && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCase(null)}
        >
          <div 
            className="w-full max-w-3xl bg-[#0F1420] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCase(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Frame */}
            <div className="aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 bg-slate-950">
              <img
                src={selectedCase.imagePath}
                alt={lang === 'ar' ? selectedCase.title.ar : selectedCase.title.en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex items-center gap-2 text-xs text-amber-400 mb-2">
              <span className="font-bold">{selectedCase.client}</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{lang === 'ar' ? selectedCase.categoryLabel.ar : selectedCase.categoryLabel.en}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              {lang === 'ar' ? selectedCase.title.ar : selectedCase.title.en}
            </h3>

            {/* 2-Column Metrics */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-950/70 border border-white/10 mb-6">
              <div>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono-numbers block">
                  {selectedCase.impactMetric.value}
                </span>
                <span className="text-xs text-slate-400">
                  {lang === 'ar' ? selectedCase.impactMetric.label.ar : selectedCase.impactMetric.label.en}
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black text-white font-mono-numbers block">
                  {selectedCase.secondaryMetric.value}
                </span>
                <span className="text-xs text-slate-400">
                  {lang === 'ar' ? selectedCase.secondaryMetric.label.ar : selectedCase.secondaryMetric.label.en}
                </span>
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="font-bold text-white mb-1">
                  {t('التحدي الهندسي:', 'The Engineering Challenge:')}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {lang === 'ar' ? selectedCase.challenge.ar : selectedCase.challenge.en}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                <div className="font-bold text-amber-300 mb-1">
                  {t('الحل المعماري والتنفيذ:', 'Architectural Solution & Handover:')}
                </div>
                <p className="text-slate-400 leading-relaxed">
                  {lang === 'ar' ? selectedCase.solution.ar : selectedCase.solution.en}
                </p>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-6">
              <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('المخرجات المعتمدة لهذا المشروع', 'Engineered Deliverables')}</span>
              </div>
              <div className="space-y-1.5">
                {(lang === 'ar' ? selectedCase.deliverables.ar : selectedCase.deliverables.en).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                {t('إغلاق', 'Dismiss')}
              </button>
              <button
                onClick={() => {
                  const client = selectedCase.client;
                  setSelectedCase(null);
                  onSelectProjectForInquiry(client);
                }}
                className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors flex items-center gap-2"
              >
                <span>{t('طلب مشروع مشابه لهذا الإنجاز', 'Request Similar Architecture')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
