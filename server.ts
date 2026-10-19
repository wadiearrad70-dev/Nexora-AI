import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());

// API route for DIEWA AI Assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        reply: `أهلاً بك في وكالة DIEWA للحلول والخدمات الرقمية! 🚀\n\nيسعدنا مساعدتك في الإجابة عن استفساراتك حول المنصات السحابية، تصميم واجهات المستخدم، أو التجارة الإلكترونية.\n\nكما يمكنك الانضمام مباشرة إلى مجتمعنا لتطوير الذكاء الاصطناعي على واتساب: https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico أو مراسلتنا على: wadiearrad70@gmail.com`
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `أنت "مساعد DIEWA الذكي" (DIEWA AI Assistant)، المساعد الرسمي المتخصص لوكالة DIEWA للحلول والخدمات الرقمية المتطورة.
الوكالة متخصصة في:
1. هندسة وتطوير المنصات الرقمية السحابية (React 19, Next.js, Node.js, PostgreSQL).
2. تصميم واجهات وتجربة المستخدم الاستثنائية (Product UI/UX & Design Systems).
3. حلول التجارة الإلكترونية المتقدمة (Headless Commerce, Stripe, Shopify).
4. أتمتة العمليات وحلول الذكاء الاصطناعي للأعمال (Enterprise Automation, RAG).
5. البنية التحتية السحابية والأمن السيبراني (DevOps, AWS, GCP, Cloudflare).
6. الاستشارات التقنية وإشراف CTO (Tech Advisory & Code Audits).

رابط مجموعة واتساب الرسمية لمجتمع تطوير الذكاء الاصطناعي والاستفسارات التقنية:
https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico

البريد المباشر للطلبات والعقود:
wadiearrad70@gmail.com

تعليمات الأسلوب:
- ردودك دقيقة، مهنية، لبقة، ومباشرة.
- شجع المستخدم بلطف على الانضمام إلى مجموعة واتساب الخاصة بتطوير الذكاء الاصطناعي أو حجز استشارة عند مناقشة مشاريعه.
- تحدث باللغة العربية بأسلوب راقٍ ومفهوم، أو بالإنجليزية إذا خاطبك العميل بها.
- لا تبتكر شروطاً أو أسعاراً وهمية، بل قدم تقديرات استرشادية واضحة واطلب منه حجز جلسة استكشافية.`;

    const contents: any[] = [];
    if (Array.isArray(history)) {
      for (const item of history.slice(-8)) { // keep last 8 turns for context
        if (item.text) {
          contents.push({
            role: item.role === 'user' ? 'user' : 'model',
            parts: [{ text: item.text }],
          });
        }
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'مرحباً بك في DIEWA. كيف يمكنني مساعدتك في مشروعك الرقمي اليوم؟';
    res.json({ reply });
  } catch (error: any) {
    console.error('Server chat error:', error);
    res.status(200).json({
      reply: `مرحباً بك في DIEWA! فريقنا الهندسي جاهز لمساعدتك.\n\nيمكنك الانضمام مباشرة إلى مجتمعنا لتطوير الذكاء الاصطناعي على واتساب: https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico أو مراسلة المشرف التقني مباشرة على: wadiearrad70@gmail.com`,
    });
  }
});

// API route for AI Certificate Generation & Accreditation
app.post('/api/generate-certificate', async (req, res) => {
  try {
    const { fullName, track, experienceLevel, keySkills, details } = req.body;
    if (!fullName || !track) {
      return res.status(400).json({ error: 'Full name and track are required' });
    }

    const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
    const verificationCode = `DIEWA-AI-2026-${randomSuffix}`;
    const issueDate = new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const issueDateEn = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback structured certificate
      return res.json({
        verificationCode,
        fullName,
        track,
        experienceLevel: experienceLevel || 'Professional / محترف',
        commendationAr: `تشهد وكالة DIEWA للحلول والخدمات الرقمية بأن ${fullName} قد أتم متطلبات الانضمام والاعتماد المهني في مسار ${track}، مع إثبات الكفاءة في تطبيق أحدث التقنيات وأفضل المعايير الهندسية.`,
        commendationEn: `DIEWA Digital Solutions certifies that ${fullName} has fulfilled the professional accreditation criteria for admission into the DIEWA Engineering & AI Network in the field of ${track}.`,
        verifiedCompetencies: keySkills && keySkills.length ? keySkills : ['هندسة الأنظمة الحديثة', 'أفضل ممارسات البرمجيات', 'التفكير المعماري', 'تطبيق الذكاء الاصطناعي'],
        grade: 'تميز مهني معتمد / Certified Excellence',
        issueDate,
        issueDateEn,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = `أنت اللجنة الأكاديمية والهندسية الرسمية لوكالة DIEWA العالمية للحلول الرقمية وتطوير الذكاء الاصطناعي.
المطلوب إنشاء شهادة اعتماد وانضمام رسمية معترف بها مهنياً باسم:
- الاسم: ${fullName}
- المسار التقني: ${track}
- المستوى: ${experienceLevel || 'Professional'}
- المهارات المعلنة: ${Array.isArray(keySkills) ? keySkills.join(', ') : 'AI & Digital Systems'}
- نبذة إضافية: ${details || 'ممارس متميز يرغب في الانضمام إلى شبكة DIEWA الهندسية'}

أجب بصيغة JSON حصراً بهذا الهيكل:
{
  "commendationAr": "صيغة اعتماد رسمية فخمة باللغة العربية تبدأ بـ 'تشهد وكالة DIEWA للحلول والخدمات الرقمية المتطورة بأن...' تشيد بكفاءته في هذا المسار وقبوله في شبكة المهندسين المعتمدين.",
  "commendationEn": "Official prestigious accreditation statement in English stating that the individual is certified and recognized within the DIEWA Digital & AI Network.",
  "verifiedCompetencies": ["مهارة 1", "مهارة 2", "مهارة 3", "مهارة 4"],
  "grade": "درجة التميز، مثلاً: مرتبة الشرف في هندسة الذكاء الاصطناعي / Distinction with Honors"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    });

    let resultJson: any = {};
    try {
      resultJson = JSON.parse(response.text || '{}');
    } catch {
      resultJson = {};
    }

    res.json({
      verificationCode,
      fullName,
      track,
      experienceLevel: experienceLevel || 'Professional',
      commendationAr: resultJson.commendationAr || `تشهد وكالة DIEWA للحلول والخدمات الرقمية بأن ${fullName} مؤهل ومعتمد رسمياً في ${track}.`,
      commendationEn: resultJson.commendationEn || `DIEWA Digital Solutions certifies that ${fullName} is officially accredited in ${track}.`,
      verifiedCompetencies: resultJson.verifiedCompetencies || ['هندسة الأنظمة', 'أمن البرمجيات', 'أتمتة الذكاء الاصطناعي', 'التصميم المعماري'],
      grade: resultJson.grade || 'اعتماد مهني بامتياز / Distinction with Honors',
      issueDate,
      issueDateEn,
    });
  } catch (error: any) {
    console.error('Certificate generation error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate certificate' });
  }
});

// API route for AI Text-to-Website Generator
app.post('/api/generate-website', async (req, res) => {
  try {
    const { prompt, industry, themeTone, lang } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const isArabic = lang === 'ar' || !lang;

    if (!apiKey) {
      // Fallback generator
      const fallbackSiteName = isArabic ? 'نوفا تيك للحلول الرقمية' : 'NovaTech Digital';
      return res.json({
        siteName: fallbackSiteName,
        tagline: isArabic ? 'نبتكر تجارب رقمية ذكية تصنع الفارق' : 'Engineering Intelligent Digital Experiences',
        colorPalette: {
          primary: '#F59E0B',
          accent: '#10B981',
          background: '#090D16',
          surface: '#111827',
        },
        hero: {
          title: isArabic ? 'المنصة الذكية الرائدة لأعمالك المتنامية' : 'The Intelligent Platform Built For Scale',
          subtitle: isArabic ? `حلول مخصصة تم تصميمها بالذكاء الاصطناعي وفق رغبتك: ${prompt.slice(0, 100)}` : `Tailored solutions engineered by AI: ${prompt.slice(0, 100)}`,
          ctaText: isArabic ? 'ابدأ الآن مجاناً' : 'Get Started Now',
          secondaryCta: isArabic ? 'استكشف المزايا' : 'Explore Features',
          trustBadges: isArabic ? ['موثوقية 99.9%', 'حماية وأمان سحابي', 'دعم فني لحظي'] : ['99.9% SLA', 'Enterprise Security', '24/7 Support'],
        },
        features: [
          {
            title: isArabic ? 'أداء فائق السرعة' : 'Ultra-Fast Performance',
            description: isArabic ? 'معمارية سحابية تضمن تحميل الصفحات في أجزاء من الثانية.' : 'Cloud-native architecture delivering sub-second responses.',
            iconName: 'Zap'
          },
          {
            title: isArabic ? 'تصميم عصري متجاوب' : 'Responsive Modern UI',
            description: isArabic ? 'واجهات متناسقة تبهر المستخدمين عبر الهواتف وكافة الشاشات.' : 'Effortless adaptive experiences across all viewports.',
            iconName: 'Layout'
          },
          {
            title: isArabic ? 'ذكاء اصطناعي مدمج' : 'Embedded AI Intelligence',
            description: isArabic ? 'أتمتة ذكية تسهم في تسريع خدمة العملاء ومضاعفة التحويلات.' : 'Automated pipelines driving exponential conversion gains.',
            iconName: 'Cpu'
          }
        ],
        stats: [
          { value: '+180%', label: isArabic ? 'نمو في المبيعات' : 'Sales Uplift' },
          { value: '45ms', label: isArabic ? 'سرعة الاستجابة' : 'Response Latency' },
          { value: '10k+', label: isArabic ? 'مستخدم نشط' : 'Active Users' }
        ],
        testimonial: {
          quote: isArabic ? 'المنصة غيّرت طريقة إدارة أعمالنا تماماً ووفرت عشرات الساعات أسبوعياً.' : 'This platform revolutionized our daily workflows and saved dozens of engineering hours.',
          author: isArabic ? 'سلطان الناصر' : 'Alex Mercer',
          role: isArabic ? 'الرئيس التنفيذي' : 'Chief Executive Officer'
        },
        faq: [
          {
            q: isArabic ? 'كم يستغرق إطلاق هذا الموقع بالكامل؟' : 'How fast can this website be fully deployed?',
            a: isArabic ? 'فريق DIEWA يستطيع نقل هذا المخطط إلى موقع حقيقي مباشر خلال 3 إلى 7 أيام فقط.' : 'The DIEWA team can deploy this exact production site in 3-7 days.'
          },
          {
            q: isArabic ? 'هل أحصل على الكود المصدري كاملاً؟' : 'Do I receive full source code?',
            a: isArabic ? 'نعم، كود الموقع والأصول ملك لك بنسبة 100%.' : 'Yes, you receive 100% full source code ownership.'
          }
        ],
        generatedHtml: `<!DOCTYPE html>
<html lang="${isArabic ? 'ar' : 'en'}" dir="${isArabic ? 'rtl' : 'ltr'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${fallbackSiteName}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>body { font-family: ${isArabic ? "'Cairo', sans-serif" : "'Plus Jakarta Sans', sans-serif"}; }</style>
</head>
<body class="bg-[#090D16] text-slate-100 antialiased">
  <header class="border-b border-white/10 px-6 py-4 flex items-center justify-between">
    <div class="text-xl font-black text-amber-400">${fallbackSiteName}</div>
    <a href="#contact" class="px-4 py-2 bg-amber-400 text-slate-950 rounded-lg text-xs font-bold">${isArabic ? 'ابدأ الآن' : 'Get Started'}</a>
  </header>
  <main class="max-w-4xl mx-auto px-6 py-20 text-center">
    <h1 class="text-4xl md:text-5xl font-black mb-6 text-white">${isArabic ? 'المنصة الذكية الرائدة لأعمالك المتنامية' : 'The Intelligent Platform Built For Scale'}</h1>
    <p class="text-slate-300 text-base max-w-2xl mx-auto mb-8">${prompt}</p>
    <div class="flex justify-center gap-4">
      <button class="px-6 py-3 bg-amber-400 text-slate-950 font-bold rounded-xl text-sm">${isArabic ? 'ابدأ مجاناً' : 'Start Free'}</button>
    </div>
  </main>
</body>
</html>`
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `أنت مهندس ومصمم مواقع ذكي ومحترف في وكالة DIEWA للحلول والخدمات الرقمية.
مهمتك: تحويل وصف المستخدم إلى هيكل موقع ويب عصري وجذاب، متكامل وواقعي.
لغة الإخراج: ${isArabic ? 'اللغة العربية بأسلوب راقٍ وجذاب' : 'English'}.
المجال: ${industry || 'Digital Product / Service'}.
النبرة والنمط البصري: ${themeTone || 'Modern Dark Luxury with Amber/Gold Accents'}.

الوصف المطلوب تحويله إلى موقع:
"${prompt}"

المطلوب إخراج كائن JSON فقط بهذا الشكل:
{
  "siteName": "اسم براند مبتكر ومناسب",
  "tagline": "شعار تسويقي قصير وقوي",
  "colorPalette": {
    "primary": "#F59E0B",
    "accent": "#10B981",
    "background": "#090D16",
    "surface": "#111827"
  },
  "hero": {
    "title": "عنوان رئيسي جذاب يخاطب حاجة العميل",
    "subtitle": "فقرة شارحة واضحة تبرز القيمة الفريدة للمنتج أو الخدمة",
    "ctaText": "نص زر الدعوة للإجراء الأساسي",
    "secondaryCta": "نص زر الإجراء الثانوي",
    "trustBadges": ["مؤشر ثقة 1", "مؤشر ثقة 2", "مؤشر ثقة 3"]
  },
  "features": [
    { "title": "ميزة 1", "description": "شرح للميزة وكيف تفيد المستخدم", "iconName": "Zap" },
    { "title": "ميزة 2", "description": "شرح للميزة وكيف تفيد المستخدم", "iconName": "Shield" },
    { "title": "ميزة 3", "description": "شرح للميزة وكيف تفيد المستخدم", "iconName": "Cpu" },
    { "title": "ميزة 4", "description": "شرح للميزة وكيف تفيد المستخدم", "iconName": "BarChart" }
  ],
  "stats": [
    { "value": "+140%", "label": "مؤشر قياسي واقعي" },
    { "value": "45ms", "label": "مؤشر قياسي واقعي" },
    { "value": "99.9%", "label": "مؤشر قياسي واقعي" }
  ],
  "testimonial": {
    "quote": "اقتباس مدح حقيقي ومقنع من عميل راضٍ",
    "author": "اسم العميل",
    "role": "المسمى الوظيفي واسم الشركة"
  },
  "faq": [
    { "q": "سؤال شائع 1؟", "a": "إجابة واضحة ومقنعة" },
    { "q": "سؤال شائع 2؟", "a": "إجابة واضحة ومقنعة" }
  ],
  "generatedHtml": "كود صفحة HTML كاملة متجاوبة تستخدم Tailwind CDN وتضم شريط تنقل، هيرو سكشن، شبكة الميزات، الإحصائيات، ونموذج تواصل سريع بألوان متناسقة وفخمة."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    let siteData: any = {};
    try {
      siteData = JSON.parse(response.text || '{}');
    } catch {
      siteData = {};
    }

    res.json(siteData);
  } catch (error: any) {
    console.error('Website generation error:', error);
    res.status(500).json({ error: error?.message || 'Failed to generate website' });
  }
});

// Start Express with Vite dev middleware or static serving
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port: PORT,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`DIEWA Server ready on port ${PORT}`);
  });
}

startServer();
