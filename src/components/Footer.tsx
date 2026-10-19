import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUp, Mail, ShieldCheck, MessageSquare, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  const whatsappUrl = 'https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#05080E] border-t border-white/10 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 py-14">
        
        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a 
              href="#" 
              className="text-2xl font-black tracking-wider text-white hover:text-amber-400 transition-colors inline-block"
            >
              DIEWA
            </a>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t(
                'وكالة DIEWA المتخصصة في هندسة وتطوير البرمجيات السحابية، تصميم واجهات وتجربة المستخدم، والحلول الرقمية المتطورة للشركات والمؤسسات.',
                'DIEWA is a digital engineering & technology studio dedicated to crafting resilient cloud software, high-conversion design systems, and digital enterprise products.'
              )}
            </p>
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>wadiearrad70@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <MessageSquare className="w-3.5 h-3.5" />
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline flex items-center gap-1"
                >
                  <span>{t('جروب واتساب لتطوير الذكاء الاصطناعي والاستفسارات', 'WhatsApp AI Dev & Tech Group')}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Nav Mirrors */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              {t('الخدمات والحلول', 'Solutions')}
            </div>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">{t('تطوير المنصات السحابية', 'Cloud Web Platforms')}</a></li>
              <li><a href="#marketplace" className="text-amber-400 hover:text-amber-300 transition-colors">{t('المتجر الرقمي والمنتجات', 'Digital Marketplace')}</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">{t('المدونة وأبحاث التحول الرقمي', 'Engineering Blog & SEO')}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{t('تصميم واجهات UI/UX', 'Product UI/UX Systems')}</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">{t('أتمتة الأعمال والذكاء الاصطناعي', 'Process Automation & AI')}</a></li>
              <li><a href="#community" className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1">
                <span>{t('مجتمع واتساب للـ AI', 'WhatsApp AI Community')}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a></li>
            </ul>
          </div>

          {/* Governance & Trust */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-white">
              {t('المعايير والضمانات', 'Engineering Guarantees')}
            </div>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('اتفاقيات سرية بيانات العملاء (NDA)', 'Bespoke Confidentiality NDA')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('نقل ملكية الكود المصدري 100%', 'Full IP & Code Transfer')}</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                <span>{t('فترة صيانة مجانية 30-60 يوماً', 'Complimentary Post-Launch Warranty')}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} DIEWA. {t('جميع الحقوق محفوظة.', 'All rights reserved.')}
          </div>

          <div className="flex items-center gap-6">
            <span>{t('تصميم وبرمجة بأعلى المعايير العالمية', 'Crafted with modern web standards')}</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-white/10 text-slate-400 hover:text-white transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
