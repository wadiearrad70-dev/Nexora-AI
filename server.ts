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
