import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Phone, Send, CheckCircle2, Copy, Check, Clock, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  prefilledScope?: string;
  prefilledService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  prefilledScope,
  prefilledService,
}) => {
  const { lang, t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: prefilledService || '',
    budgetRange: '$5,000 - $15,000',
    projectBrief: prefilledScope ? `تفاصيل النطاق التقديري:\n${prefilledScope}` : '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState<{
    referenceId: string;
    timestamp: string;
    details: typeof formData;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Update if prefilled changes from outside
  React.useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, serviceInterest: prefilledService }));
    }
  }, [prefilledService]);

  React.useEffect(() => {
    if (prefilledScope) {
      setFormData((prev) => ({
        ...prev,
        projectBrief: `${t('تفاصيل النطاق التقديري المعتمد:', 'Locked Scope Breakdown:')}\n${prefilledScope}\n\n${prev.projectBrief}`,
      }));
    }
  }, [prefilledScope, t]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = t('يرجى إدخال الاسم الكريم', 'Full name is required');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('يرجى إدخال البريد الإلكتروني', 'Email is required');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = t('صيغة البريد الإلكتروني غير صحيحة', 'Valid email format required');
    }
    if (!formData.projectBrief.trim()) {
      newErrors.projectBrief = t('يرجى تقديم نبذة عن متطلبات المشروع', 'Project brief is required');
    } else if (formData.projectBrief.trim().length < 10) {
      newErrors.projectBrief = t('النبذة قصيرة جداً، يرجى كتابة تفاصيل أوضح', 'Please provide a bit more detail (min 10 characters)');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real brief submission
    setTimeout(() => {
      const ref = 'DW-' + Math.floor(100000 + Math.random() * 900000);
      setSubmittedTicket({
        referenceId: ref,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        details: { ...formData },
      });
      setIsSubmitting(false);
    }, 700);
  };

  const handleCopyTicket = () => {
    if (!submittedTicket) return;
    const text = `DIEWA Project Request #${submittedTicket.referenceId}\nClient: ${submittedTicket.details.fullName}\nEmail: ${submittedTicket.details.email}\nService: ${submittedTicket.details.serviceInterest || 'Custom Scope'}\nBudget: ${submittedTicket.details.budgetRange}\nBrief:\n${submittedTicket.details.projectBrief}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 bg-[#070A10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('ابدأ رحلة النجاح مع DIEWA', 'Direct Engineering Access')}</span>
            </div>

            <h2 
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6"
              style={{ textWrap: 'balance' }}
            >
              {t(
                'دعنا نحول رؤيتك إلى منصة رقمية ذات أداء استثنائي',
                'Let us transform your vision into a mission-critical digital reality'
              )}
            </h2>

            <p className="text-base text-slate-400 leading-relaxed mb-8">
              {t(
                'نستجيب لجميع طلبات المشاريع والاستشارات خلال أقل من 4 ساعات عمل مع دراسة مبدئية لجدوى وخطة التنفيذ.',
                'Our principal engineers review every inquiry personally within 4 business hours to evaluate architecture viability.'
              )}
            </p>

            {/* Direct Channels */}
            <div className="space-y-4 mb-8">
              <a
                href="mailto:wadiearrad70@gmail.com"
                className="p-4 rounded-xl bg-slate-900/60 border border-white/10 hover:border-amber-400/30 flex items-center gap-4 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">
                    {t('البريد الإلكتروني المباشر', 'Direct Executive Inquiries')}
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                    wadiearrad70@gmail.com
                  </div>
                </div>
              </a>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-400">
                    {t('زمن الاستجابة المعتمد', 'SLA Response Guarantee')}
                  </div>
                  <div className="text-sm font-bold text-white">
                    {t('خلال 4 ساعات كحد أقصى (أيام العمل)', 'Under 4 hours during business days')}
                  </div>
                </div>
              </div>
            </div>

            {/* Core Commitments List */}
            <div className="p-5 rounded-xl bg-slate-950/80 border border-white/5 space-y-2 text-xs text-slate-400">
              <div className="text-slate-300 font-semibold mb-2">
                {t('ضمانات DIEWA التعاقدية:', 'Contractual Commitments:')}
              </div>
              <div>• {t('اتفاقية سرية عدم إفشاء (NDA) موقعة قبل بدء المشروع', 'Binding Non-Disclosure Agreement (NDA) prior to kickoff')}</div>
              <div>• {t('ملكية الكود والترخيص كاملة باسم شركتك 100%', '100% intellectual property & source code rights in your name')}</div>
              <div>• {t('تأمين بنكي واختبارات اختراق دورية للأمان', 'Continuous OWASP vulnerability auditing')}</div>
            </div>
          </div>

          {/* Right Column: Interactive Form or Success Receipt */}
          <div className="lg:col-span-7 bg-slate-900/40 border border-white/10 rounded-2xl p-6 sm:p-8">
            
            {!submittedTicket ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="text-lg font-bold text-white mb-2">
                  {t('طلب استشارة ودراسة فنية للمشروع', 'Request Technical Consultation & Quote')}
                </div>
                <p className="text-xs text-slate-400 mb-6">
                  {t('يرجى ملء الحقول التالية لتزويدك بمقترح هندسي دقيق وجدول زمني.', 'Fill out your requirements to receive a comprehensive technical proposal.')}
                </p>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      {t('الاسم بالكامل', 'Full Name')} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={lang === 'ar' ? 'مثال: محمد العمري' : 'e.g. Alex Morgan'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                        errors.fullName ? 'border-red-500/80' : 'border-white/10 focus:border-amber-400'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      {t('البريد الإلكتروني للعمل', 'Work Email')} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500/80' : 'border-white/10 focus:border-amber-400'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Phone & Company Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      {t('رقم الهاتف / واتساب', 'Phone / WhatsApp')}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+966 50 000 0000 / +1..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      {t('اسم الشركة أو المشروع', 'Organization / Project Name')}
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={lang === 'ar' ? 'شركة التقنية المتقدمة' : 'Acme Ventures'}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Service Interest & Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      {t('الخدمة المستهدفة', 'Primary Service')}
                    </label>
                    <select
                      value={formData.serviceInterest}
                      onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="">{t('اختر الخدمة المطلوبة...', 'Select service...')}</option>
                      <option value="هندسة وتطوير المنصات الرقمية السحابية">{t('هندسة وتطوير المنصات الرقمية السحابية', 'Web & Cloud Platforms')}</option>
                      <option value="تصميم واجهات وتجربة المستخدم الاستثنائية">{t('تصميم واجهات وتجربة المستخدم', 'Product UI/UX Design')}</option>
                      <option value="حلول التجارة الإلكترونية المتقدمة">{t('التجارة الإلكترونية المتقدمة', 'High-Scale E-Commerce')}</option>
                      <option value="أتمتة العمليات والذكاء الاصطناعي">{t('أتمتة العمليات والذكاء الاصطناعي', 'Process Automation & AI')}</option>
                      <option value="البنية التحتية السحابية والأمان">{t('البنية التحتية والأمن السيبراني', 'Cloud DevOps & Security')}</option>
                      <option value="الاستشارات التقنية والإشراف الهندسي">{t('الاستشارات التقنية وإشراف CTO', 'CTO Tech Advisory')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                      {t('الميزانية التقريبية المقترحة', 'Estimated Budget Bracket')}
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                    >
                      <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                      <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                      <option value="$15,000 - $35,000">$15,000 - $35,000</option>
                      <option value="$35,000+">$35,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                {/* Project Brief */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                    {t('نبذة عن متطلبات المشروع', 'Project Brief & Architecture Goals')} <span className="text-amber-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    placeholder={t(
                      'صف باختصار فكرة المشروع، الجمهور المستهدف، وأهم الميزات المطلوبة...',
                      'Describe your product objectives, core features, expected launch timeframe...'
                    )}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-slate-950/70 border text-xs text-white placeholder:text-slate-600 focus:outline-none transition-colors ${
                      errors.projectBrief ? 'border-red-500/80' : 'border-white/10 focus:border-amber-400'
                    }`}
                  />
                  {errors.projectBrief && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.projectBrief}</p>
                  )}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-amber-400 hover:bg-amber-300 disabled:opacity-60 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <span>{t('جارٍ إرسال وتوثيق الطلب...', 'Transmitting Project Scope...')}</span>
                  ) : (
                    <>
                      <span>{t('إرسال طلب الدراسة الفنية', 'Submit Scope For Engineering Review')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success Receipt Card */
              <div className="p-6 rounded-xl bg-slate-950/80 border border-emerald-500/30 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {t('تم تسجيل طلب مشروعك بنجاح في DIEWA', 'Scope Confirmed & Queued For Engineering Review')}
                    </h3>
                    <div className="text-xs text-slate-400">
                      {t('الرقم المرجعي للملف:', 'Reference Ticket:')}{' '}
                      <span className="font-mono font-bold text-amber-400">{submittedTicket.referenceId}</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {t(
                    'شكراً لثقتك في DIEWA. تم توجيه ملف مشروعك إلى رئيس الفريق التقني، وسيتواصل معك خلال أقل من 4 ساعات لمناقشة خارطة الطريق والجدول الزمني.',
                    'Your architecture brief has been dispatched directly to our lead engineering pod. We will reach out to you within 4 business hours.'
                  )}
                </p>

                {/* Summary Box */}
                <div className="p-4 rounded-lg bg-slate-900/60 border border-white/10 text-xs space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('الاسم:', 'Client:')}</span>
                    <span className="font-semibold text-white">{submittedTicket.details.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('البريد الإلكتروني:', 'Email:')}</span>
                    <span className="font-semibold text-white">{submittedTicket.details.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">{t('الميزانية المبدئية:', 'Budget:')}</span>
                    <span className="font-semibold text-white">{submittedTicket.details.budgetRange}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCopyTicket}
                    className="flex-1 py-2 px-3 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-white/10 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? t('تم نسخ ملخص الطلب', 'Copied to Clipboard') : t('نسخ ملخص الطلب', 'Copy Ticket Summary')}</span>
                  </button>

                  <button
                    onClick={() => setSubmittedTicket(null)}
                    className="py-2 px-4 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                  >
                    {t('تقديم طلب آخر', 'Submit Another Inquiry')}
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
