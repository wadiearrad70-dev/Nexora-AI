import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Wand2, 
  Sparkles, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Code2, 
  Eye, 
  Download, 
  Copy, 
  Check, 
  RefreshCw, 
  ArrowUpRight, 
  Layers,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

interface GeneratedSite {
  siteName: string;
  tagline: string;
  colorPalette: {
    primary: string;
    accent: string;
    background: string;
    surface: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    secondaryCta: string;
    trustBadges: string[];
  };
  features: Array<{
    title: string;
    description: string;
    iconName: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
  faq: Array<{
    q: string;
    a: string;
  }>;
  generatedHtml: string;
}

interface AIWebsiteBuilderSectionProps {
  onRequestDeploy: (siteName: string, promptText: string) => void;
}

export const AIWebsiteBuilderSection: React.FC<AIWebsiteBuilderSectionProps> = ({ onRequestDeploy }) => {
  const { lang, t } = useLanguage();

  const [promptText, setPromptText] = useState('');
  const [industry, setIndustry] = useState('تجارة إلكترونية فاخرة');
  const [themeTone, setThemeTone] = useState('Dark Obsidian & Gold Foil');
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'preview' | 'blueprint' | 'code'>('preview');
  const [copiedCode, setCopiedCode] = useState(false);

  const [generatedSite, setGeneratedSite] = useState<GeneratedSite | null>({
    siteName: 'AURA LUXE',
    tagline: 'تجربة تسوق رقمية فاخرة للمنتجات الراقية',
    colorPalette: {
      primary: '#F59E0B',
      accent: '#10B981',
      background: '#090D16',
      surface: '#111827',
    },
    hero: {
      title: 'الأناقة الرقمية التي تعيد تعريف التسوق الفاخر',
      subtitle: 'مجموعة مقتناة من الأزياء والمقتنيات الفارهة مع تجربة شراء سلسة وتوصيل فوري حول العالم.',
      ctaText: 'استكشف التشكيلة الجديدة',
      secondaryCta: 'قصة العلامة التجارية',
      trustBadges: ['شحن دولي مؤمن', 'ضمان الأصالة 100%', 'استرجاع مجاني خلال 14 يوماً'],
    },
    features: [
      {
        title: 'قطع حصرية محدودة',
        description: 'تصاميم فريدة يتم إنتاجها بكميات مرقمة لضمان التفرد والتميز.',
        iconName: 'Sparkles',
      },
      {
        title: 'تجربة شراء سريعة',
        description: 'دفع بضغطة واحدة مع دعم Apple Pay والبطاقات العالمية.',
        iconName: 'Zap',
      },
      {
        title: 'خدمة كونسيرج خاصة',
        description: 'مستشار أزياء شخصي متفرغ لمساعدتك في اختيار المقاسات والتنسيق.',
        iconName: 'Users',
      },
      {
        title: 'تغليف هدايا فاخر',
        description: 'صناديق جلدية مصنعة يدوياً مع بطاقة إهداء مخصصة.',
        iconName: 'Gift',
      },
    ],
    stats: [
      { value: '+99.2%', label: 'نسبة رضا العملاء' },
      { value: '45+', label: 'دولة حول العالم' },
      { value: '24/7', label: 'دعم وكونسيرج خاص' },
    ],
    testimonial: {
      quote: 'التجربة فاقت كل التوقعات، من سرعة التوصيل إلى جودة التغليف والتصميم الراقي.',
      author: 'نورة الهذلول',
      role: 'مؤسس استوديو إبداعي',
    },
    faq: [
      { q: 'ما هي مدة التوصيل المعتادة؟', a: 'يتم التوصيل المحلي خلال 24 ساعة، والشحن الدولي خلال 3-5 أيام عمل.' },
      { q: 'هل المنتجات أصلية ومضمونة؟', a: 'نعم، جميع القطع تأتي مع شهادة أصالة ورقم تسلسلي موثق.' },
    ],
    generatedHtml: `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AURA LUXE - تسوق فاخر</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
  <style>body { font-family: 'Cairo', sans-serif; }</style>
</head>
<body class="bg-[#090D16] text-slate-100 antialiased selection:bg-amber-400 selection:text-black">
  <header class="border-b border-white/10 px-8 py-5 flex items-center justify-between">
    <div class="text-2xl font-black tracking-widest text-white">AURA<span class="text-amber-400">.</span></div>
    <nav class="hidden md:flex items-center gap-6 text-sm text-slate-300">
      <a href="#" class="hover:text-amber-400">التشكيلة</a>
      <a href="#" class="hover:text-amber-400">الإصدارات</a>
      <a href="#" class="hover:text-amber-400">الكونسيرج</a>
    </nav>
    <button class="px-5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300">تسوق الآن</button>
  </header>
  <main class="max-w-6xl mx-auto px-6 py-20 text-center">
    <div class="inline-block text-xs font-semibold text-amber-400 uppercase tracking-widest mb-4">حصري لموسم 2026</div>
    <h1 class="text-4xl md:text-6xl font-black text-white leading-tight mb-6">الأناقة الرقمية التي تعيد تعريف التسوق الفاخر</h1>
    <p class="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">مجموعة مقتناة من الأزياء والمقتنيات الفارهة مع تجربة شراء سلسة وتوصيل فوري حول العالم.</p>
    <div class="flex flex-wrap justify-center gap-4 mb-16">
      <button class="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-sm shadow-lg shadow-amber-500/20">استكشف التشكيلة الجديدة</button>
      <button class="px-8 py-3.5 bg-slate-900 border border-white/10 text-white font-semibold rounded-xl text-sm">قصة العلامة</button>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-start">
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
        <div class="text-amber-400 font-bold text-lg mb-2">قطع حصرية محدودة</div>
        <div class="text-slate-400 text-sm">تصاميم فريدة يتم إنتاجها بكميات مرقمة لضمان التفرد والتميز.</div>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
        <div class="text-amber-400 font-bold text-lg mb-2">تجربة شراء سريعة</div>
        <div class="text-slate-400 text-sm">دفع بضغطة واحدة مع دعم Apple Pay والبطاقات العالمية.</div>
      </div>
      <div class="p-6 rounded-2xl bg-slate-900/60 border border-white/10">
        <div class="text-amber-400 font-bold text-lg mb-2">خدمة كونسيرج خاصة</div>
        <div class="text-slate-400 text-sm">مستشار أزياء شخصي متفرغ لمساعدتك في اختيار المقاسات والتنسيق.</div>
      </div>
    </div>
  </main>
</body>
</html>`,
  });

  const promptSuggestions = [
    {
      ar: 'متجر عطور وبخور فاخر بتصميم داكن ولمسات ذهبية فخمة ودفع بـ Apple Pay',
      en: 'Luxury perfume & oud boutique with dark obsidian aesthetic and Apple Pay',
    },
    {
      ar: 'منصة سحابية لإدارة العيادات الطبية وحجز المواعيد مع تنبيهات واتساب وسجلات المرضى',
      en: 'Cloud clinic management platform with appointment booking & WhatsApp reminders',
    },
    {
      ar: 'موقع شركة استشارات مالية وقانونية مع حاسبة أتعاب وحجز استشارات أونلاين',
      en: 'Financial & legal advisory firm with fee calculator and booking engine',
    },
    {
      ar: 'منصة تسويق عقاري للمشاريع السكنية الفاخرة مع جولات تفاعلية ومخططات ثلاثية الأبعاد',
      en: 'Luxury real estate agency portal with 3D virtual tour walk-throughs',
    },
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim()) return;

    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-website', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText.trim(),
          industry,
          themeTone,
          lang: lang,
        }),
      });

      if (!res.ok) throw new Error('Generation error');
      const data: GeneratedSite = await res.json();
      setGeneratedSite(data);
      setActiveTab('preview');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyCode = () => {
    if (!generatedSite) return;
    navigator.clipboard.writeText(generatedSite.generatedHtml);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleDownloadHtml = () => {
    if (!generatedSite) return;
    const blob = new Blob([generatedSite.generatedHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${generatedSite.siteName.toLowerCase().replace(/\s+/g, '-')}-index.html`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="ai-builder" className="py-24 bg-[#070A11] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center justify-center gap-1.5">
            <Wand2 className="w-4 h-4" />
            <span>{t('تقنية توليد المواقع بالنصوص', 'AI PROMPT-TO-WEBSITE ENGINE')}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {t(
              'أنشئ موقعاً إلكترونياً متكاملاً من خلال كتابة نص فقط بالذكاء الاصطناعي',
              'Generate a Complete, Production-Ready Website from Plain Text in Seconds'
            )}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t(
              'اكتب فكرة مشروعك أو نشاطك التجاري؛ وسيقوم الذكاء الاصطناعي ببناء الهوية البصرية، العناوين، الأقسام، والكود البرمجي الكامل مع معاينة حية فورية.',
              'Describe your business concept in simple words. Our AI engine synthesizes full brand copy, visual tokens, responsive layout, and clean HTML.'
            )}
          </p>
        </div>

        {/* Builder Studio Container */}
        <div className="space-y-10">
          
          {/* Input Box Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl relative overflow-hidden">
            <form onSubmit={handleGenerate} className="space-y-5">
              
              {/* Textarea */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2 flex items-center justify-between">
                  <span>{t('صف موقعك أو فكرتك بالتفصيل (Prompt):', 'Describe your dream website (Prompt):')}</span>
                  <span className="text-[11px] text-amber-400">{t('يدعم العربية والإنجليزية', 'Arabic & English supported')}</span>
                </label>
                <textarea
                  rows={3}
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder={t(
                    'مثال: متجر لبيع الملابس الفاخرة المستدامة، مع واجهة داكنة راقية، زر دفع سريع، وشريط مؤشرات ثقة للشحن الدولي...',
                    'e.g. Modern fintech platform for real estate investors with interactive ROI calculator and sleek dark charts...'
                  )}
                  className="w-full p-4 rounded-2xl bg-slate-950/80 border border-white/10 text-xs sm:text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              {/* Suggestions chips */}
              <div>
                <div className="text-[11px] text-slate-500 mb-2">
                  {t('أفكار سريعة للتجربة:', 'Quick prompt inspirations:')}
                </div>
                <div className="flex flex-wrap gap-2">
                  {promptSuggestions.map((item, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setPromptText(lang === 'ar' ? item.ar : item.en)}
                      className="px-3 py-1.5 rounded-lg bg-slate-950 border border-white/5 hover:border-amber-400/40 text-[11px] text-slate-300 hover:text-white transition-colors text-start"
                    >
                      {lang === 'ar' ? item.ar : item.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                    {t('المجال أو قطاع النشاط:', 'Industry Sector:')}
                  </label>
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="تجارة إلكترونية فاخرة">{t('تجارة إلكترونية فاخرة', 'Luxury E-Commerce')}</option>
                    <option value="تطبيقات سحابية وSaaS">{t('تطبيقات سحابية وSaaS', 'Cloud SaaS & Software')}</option>
                    <option value="استشارات وأعمال">{t('استشارات وخدمات مهنية', 'Professional Consulting')}</option>
                    <option value="رعاية صحية وعيادات">{t('رعاية صحية وعيادات طبية', 'Healthcare & Clinics')}</option>
                    <option value="عقارات ومشاريع">{t('عقارات ومشاريع سكنية', 'Real Estate & Properties')}</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                    {t('النمط البصري المطلوب:', 'Visual Aesthetics & Tone:')}
                  </label>
                  <select
                    value={themeTone}
                    onChange={(e) => setThemeTone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Dark Obsidian & Gold Foil">{t('داكن ملكي مع لمسات ذهبية (Dark Luxury)', 'Dark Luxury & Gold')}</option>
                    <option value="Cyber Sapphire & Neon">{t('تقني مستقبلي مع أزرق سحابي (Cyber Tech)', 'Cyber Blue & Slate')}</option>
                    <option value="Minimalist Clean White">{t('مينيمال ناصع وبسيط (Minimalist Modern)', 'Minimalist Clean')}</option>
                    <option value="Warm Emerald & Earth">{t('أخضر زمردي دافئ وطبيعي (Organic Emerald)', 'Emerald & Organic')}</option>
                  </select>
                </div>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={isGenerating || !promptText.trim()}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('الذكاء الاصطناعي يقوم ببناء الموقع وهندسة الأقسام...', 'AI is architecting and generating website layout...')}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('توليد وإنشاء الموقع بالذكاء الاصطناعي', 'Generate Live Website with AI')}</span>
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Result Showcase & Interactive Workspace */}
          {generatedSite && (
            <div className="rounded-3xl bg-slate-900/40 border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Workspace Top Toolbar */}
              <div className="p-4 bg-slate-950 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                
                {/* Brand name preview */}
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-sm">
                    {generatedSite.siteName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>{generatedSite.siteName}</span>
                      <span className="text-[10px] text-amber-400 font-normal px-2 py-0.5 rounded bg-amber-400/10 border border-amber-400/20">
                        AI Generated
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate max-w-xs">{generatedSite.tagline}</p>
                  </div>
                </div>

                {/* Viewport Switcher */}
                <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/10">
                  <button
                    onClick={() => setViewportMode('desktop')}
                    className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                      viewportMode === 'desktop' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Desktop (100%)"
                  >
                    <Monitor className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('حاسوب', 'Desktop')}</span>
                  </button>

                  <button
                    onClick={() => setViewportMode('tablet')}
                    className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                      viewportMode === 'tablet' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Tablet (768px)"
                  >
                    <Tablet className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('تابلت', 'Tablet')}</span>
                  </button>

                  <button
                    onClick={() => setViewportMode('mobile')}
                    className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                      viewportMode === 'mobile' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                    title="Mobile (375px)"
                  >
                    <Smartphone className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('جوال', 'Mobile')}</span>
                  </button>
                </div>

                {/* Mode Tabs */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('preview')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      activeTab === 'preview' ? 'bg-slate-800 text-white border border-white/10' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('معاينة حية', 'Live Preview')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('blueprint')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      activeTab === 'blueprint' ? 'bg-slate-800 text-white border border-white/10' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('المخطط المعماري', 'Blueprint')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                      activeTab === 'code' ? 'bg-slate-800 text-white border border-white/10' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>{t('الكود البرمجي', 'Source Code')}</span>
                  </button>
                </div>

              </div>

              {/* Tab 1: Live Interactive Viewport */}
              {activeTab === 'preview' && (
                <div className="p-4 sm:p-8 bg-[#05080E] flex justify-center min-h-[500px]">
                  <div 
                    className={`transition-all duration-300 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 flex flex-col ${
                      viewportMode === 'desktop' ? 'w-full max-w-full' :
                      viewportMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
                    }`}
                  >
                    {/* Simulated browser bar */}
                    <div className="bg-slate-900 px-4 py-2 border-b border-white/10 flex items-center gap-2 text-xs text-slate-400">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                      </div>
                      <div className="flex-1 mx-3 px-3 py-1 rounded-md bg-slate-950 text-[11px] font-mono text-slate-400 truncate">
                        https://{generatedSite.siteName.toLowerCase().replace(/\s+/g, '')}.diewa.app
                      </div>
                    </div>

                    {/* Live iframe */}
                    <iframe
                      srcDoc={generatedSite.generatedHtml}
                      title="AI Generated Website Preview"
                      className="w-full h-[580px] border-none bg-[#090D16]"
                      sandbox="allow-scripts"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Blueprint Architecture */}
              {activeTab === 'blueprint' && (
                <div className="p-6 sm:p-8 space-y-6 bg-slate-950/90 text-xs sm:text-sm">
                  
                  {/* Hero Specs */}
                  <div className="p-5 rounded-2xl bg-slate-900/60 border border-white/10">
                    <div className="text-amber-400 font-bold mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>{t('قسم الواجهة الرئيسية (Hero Section)', 'Hero Section Blueprint')}</span>
                    </div>
                    <div className="space-y-1.5 text-slate-300">
                      <div><strong className="text-white">{t('العنوان:', 'Headline:')}</strong> {generatedSite.hero.title}</div>
                      <div><strong className="text-white">{t('الوصف:', 'Subheadline:')}</strong> {generatedSite.hero.subtitle}</div>
                      <div><strong className="text-white">{t('زر الإجراء الأساسي:', 'Primary CTA:')}</strong> {generatedSite.hero.ctaText}</div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <div className="text-white font-bold mb-3 uppercase tracking-wider text-xs">
                      {t('الميزات والخدمات المصممة (Features & Value Propositions):', 'Configured Features:')}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {generatedSite.features.map((feat, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                          <div className="font-bold text-amber-300 mb-1">{feat.title}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{feat.description}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/40 border border-white/10 text-center">
                    {generatedSite.stats.map((st, i) => (
                      <div key={i}>
                        <div className="text-xl font-black text-amber-400 font-mono-numbers">{st.value}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{st.label}</div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* Tab 3: Complete HTML Code */}
              {activeTab === 'code' && (
                <div className="p-4 sm:p-6 bg-slate-950">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs">
                    <span className="font-mono text-slate-400">index.html (HTML5 + Tailwind CSS)</span>
                    <button
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium flex items-center gap-1.5"
                    >
                      {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCode ? t('تم النسخ', 'Copied') : t('نسخ الكود كاملاً', 'Copy Full Code')}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-xl bg-[#070A11] border border-white/5 text-slate-300 font-mono text-xs overflow-x-auto max-h-[450px]">
                    <code>{generatedSite.generatedHtml}</code>
                  </pre>
                </div>
              )}

              {/* Bottom Actions Bar */}
              <div className="p-5 bg-slate-950/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDownloadHtml}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400/30 text-xs font-semibold text-white flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4 text-amber-400" />
                    <span>{t('تنزيل ملف HTML جاهز', 'Download index.html')}</span>
                  </button>

                  <button
                    onClick={handleCopyCode}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedCode ? t('تم النسخ', 'Copied') : t('نسخ الكود', 'Copy Code')}</span>
                  </button>
                </div>

                {/* Direct Action to let DIEWA build and launch it */}
                <button
                  onClick={() => onRequestDeploy(generatedSite.siteName, promptText)}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 active:scale-95 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{t('طلب تطوير ونشر هذا الموقع مع فريق DIEWA', 'Have DIEWA Engineer & Deploy This Live')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
};
