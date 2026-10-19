import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { MessageSquare, Users, Cpu, ArrowUpRight, Copy, Check, Sparkles, Code2, Flame } from 'lucide-react';

export const AICommunitySection: React.FC = () => {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const communityUrl = 'https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(communityUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const communityPillars = [
    {
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      titleAr: 'تطوير وتدريب نماذج الذكاء الاصطناعي',
      titleEn: 'AI & LLM Architecture Development',
      descAr: 'نقاشات تقنية معمقة حول بناء وتطوير الوكلاء الأذكياء (AI Agents)، وتقنيات RAG، وتكامل واجهات النماذج اللغوية الكبيرة.',
      descEn: 'In-depth engineering discussions on building autonomous AI agents, private RAG pipelines, and LLM orchestration.'
    },
    {
      icon: <MessageSquare className="w-5 h-5 text-emerald-400" />,
      titleAr: 'حل الاستفسارات البرمجية والهندسية',
      titleEn: 'Real-time Engineering Q&A',
      descAr: 'مساحة مفتوحة للإجابة المباشرة عن التحديات التقنية، تدقيق المعماريات السحابية، وتبادل الحلول بين الخبراء.',
      descEn: 'An open technical channel for troubleshooting system roadblocks, reviewing cloud schemas, and peer consultation.'
    },
    {
      icon: <Code2 className="w-5 h-5 text-emerald-400" />,
      titleAr: 'أتمتة الأعمال وسير العمل الذكي',
      titleEn: 'Business Automation & Workflows',
      descAr: 'استعراض أحدث أدوات الأتمتة وربط قواعد البيانات والأنظمة لتسريع إنتاجية الشركات الناشئة والمؤسسات.',
      descEn: 'Showcasing modern automation protocols and API synchronizations to amplify operational throughput.'
    }
  ];

  return (
    <section id="community" className="py-24 bg-[#080C14] border-t border-white/5 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Main Card Frame */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#0C121D]/90 to-slate-950/90 border border-emerald-500/20 shadow-2xl shadow-black/80">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Heading and Community Value */}
            <div className="lg:col-span-7">
              
              {/* Kicker */}
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-4">
                <Users className="w-4 h-4" />
                <span>{t('مجتمع DIEWA الرسمي على واتساب', 'OFFICIAL DIEWA WHATSAPP COMMUNITY')}</span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{t('مجموعة تفاعلية مفتوحة', 'Live Open Group')}</span>
                </span>
              </div>

              <h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-5"
                style={{ textWrap: 'balance' }}
              >
                {lang === 'ar' ? (
                  <>
                    انضم إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">مجتمع تطوير الذكاء الاصطناعي</span> والاستفسارات التقنية.
                  </>
                ) : (
                  <>
                    Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">AI Development & Tech Hub</span> on WhatsApp.
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8">
                {t(
                  'مساحة تجمع نخبة من المطورين، رواد الأعمال، والمهتمين بالذكاء الاصطناعي التوليدي، مع إجابة مباشرة عن الاستفسارات التقنية ومشاركة أحدث مسارات العمل البرمجي مع فريق DIEWA.',
                  'A collaborative hub uniting builders, AI practitioners, and startup founders for real-time engineering exchange, workflow automation, and direct guidance from the DIEWA team.'
                )}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href={communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t('انضم الآن إلى مجموعة واتساب', 'Join WhatsApp Group Now')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-white/10 rounded-xl transition-colors whitespace-nowrap"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t('تم نسخ الرابط بنجاح', 'Link Copied!') : t('نسخ رابط المجموعة', 'Copy Invite Link')}</span>
                </button>
              </div>

              {/* Trust & Access Rules */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-6 border-t border-white/10">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t('انضمام فوري مجاني 100%', '100% Free Instant Access')}</span>
                </div>
                <span>·</span>
                <div>{t('إشراف هندسي مباشر', 'Moderated by Senior Engineers')}</div>
                <span>·</span>
                <div>{t('محتوى تقني ونقاشات مفيدة بدون إعلانات', 'Strictly Technical & Noise-Free')}</div>
              </div>

            </div>

            {/* Right Column: Key Community Pillars */}
            <div className="lg:col-span-5 space-y-4">
              {communityPillars.map((item, idx) => (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-950/70 border border-white/10 hover:border-emerald-500/30 transition-all flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">
                      {lang === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {lang === 'ar' ? item.descAr : item.descEn}
                    </p>
                  </div>
                </div>
              ))}

              {/* Instant WhatsApp Direct Card */}
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>{t('رابط الجروب المباشر:', 'Direct Group URL:')}</span>
                  <span className="font-mono text-emerald-300 truncate max-w-[170px] sm:max-w-xs">
                    chat.whatsapp.com/JmB6...
                  </span>
                </div>
                <a
                  href={communityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
                >
                  {t('فتح', 'Open')}
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
