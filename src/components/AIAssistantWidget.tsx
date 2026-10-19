import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  MessageSquare, 
  ArrowUpRight, 
  RefreshCw,
  User
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  text: string;
  time: string;
}

interface AIAssistantWidgetProps {
  onOpenEstimator?: () => void;
  onOpenContact?: () => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  onOpenEstimator,
  onOpenContact,
}) => {
  const { lang, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const whatsappCommunityUrl = 'https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico';

  const defaultWelcomeText = lang === 'ar'
    ? 'أهلاً بك! أنا "مساعد DIEWA الذكي". يمكنني إجابتك عن أي استفسار حول تطوير المنصات الرقمية، تقدير تكاليف المشاريع، أو الانضمام لمجتمعنا لتطوير الذكاء الاصطناعي على واتساب. كيف أساعدك اليوم؟'
    : 'Welcome! I am the DIEWA AI Assistant. I can help answer your questions regarding enterprise digital platforms, project cost estimations, or joining our AI development community on WhatsApp. How can I assist you today?';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      text: defaultWelcomeText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const quickPrompts = [
    {
      ar: 'أهم مقالات وأبحاث هندسة البرمجيات والتحول الرقمي',
      en: 'Top engineering & digital transformation articles',
    },
    {
      ar: 'كيف أنشئ موقعاً إلكترونياً من خلال كتابة نص فقط؟',
      en: 'How to build a website from text using AI?',
    },
    {
      ar: 'كيف أحصل على شهادة معتمدة للانضمام بالذكاء الاصطناعي؟',
      en: 'How to get an AI accredited certificate to join DIEWA?',
    },
    {
      ar: 'رابط جروب واتساب لتطوير الذكاء الاصطناعي',
      en: 'WhatsApp AI Development Group link',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'usr-' + Date.now(),
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        throw new Error('Server returned an error');
      }

      const data = await res.json();
      const botReply: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        text: data.reply || (lang === 'ar' ? 'يسعدنا خدمتك دائماً.' : 'Happy to assist you.'),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Chat error:', err);
      // Helpful fallback
      const fallbackReply: ChatMessage = {
        id: 'bot-' + Date.now(),
        role: 'assistant',
        text: lang === 'ar'
          ? `شكراً لتواصلك! يمكنك الانضمام فوراً إلى مجموعة واتساب لتطوير الذكاء الاصطناعي والاستفسارات عبر الرابط: ${whatsappCommunityUrl} أو مراسلة المشرف التقني مباشرة على: wadiearrad70@gmail.com`
          : `Thanks for reaching out! You can join our WhatsApp AI Development group directly at: ${whatsappCommunityUrl} or email our technical lead at: wadiearrad70@gmail.com`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Helper to render text with clickable links
  const renderMessageContent = (content: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = content.split(urlRegex);

    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        const isWhatsapp = part.includes('whatsapp.com');
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1 font-bold underline transition-colors ${
              isWhatsapp ? 'text-emerald-400 hover:text-emerald-300' : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            <span>{isWhatsapp ? t('رابط مجموعة واتساب للذكاء الاصطناعي', 'WhatsApp AI Group Link') : part}</span>
            <ArrowUpRight className="w-3 h-3 inline" />
          </a>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 end-6 z-50">
      
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 border border-amber-400/30 text-white shadow-xl shadow-black/60 hover:border-amber-400 hover:scale-105 active:scale-95 transition-all duration-200"
          aria-label="Open DIEWA AI Assistant"
        >
          <div className="w-8 h-8 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center relative">
            <Bot className="w-4 h-4" />
          </div>
          <div className="text-start pe-1">
            <div className="text-xs font-bold text-white flex items-center gap-1">
              <span>{t('مساعد DIEWA الذكي', 'DIEWA AI Assistant')}</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </div>
            <div className="text-[10px] text-slate-400">
              {t('متاح للرد والاستفسارات', 'Instant Answers & Scope')}
            </div>
          </div>
        </button>
      )}

      {/* Chat Window Drawer / Modal */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] rounded-2xl bg-[#090D15]/95 backdrop-blur-2xl border border-white/15 shadow-2xl shadow-black/90 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 text-amber-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{t('مساعد DIEWA الذكي', 'DIEWA AI Assistant')}</span>
                  <span className="text-[10px] text-amber-400 px-1.5 py-0.2 rounded bg-amber-400/10 border border-amber-400/20">
                    AI
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {t('استفسارات وتطوير الذكاء الاصطناعي', 'Project Scoping & AI Tech Q&A')}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Top Quick Actions Bar */}
          <div className="px-4 py-2 bg-emerald-950/30 border-b border-emerald-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-300">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('كروب واتساب للـ AI متاح الآن', 'WhatsApp AI Group Active')}</span>
            </div>
            <a
              href={whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>{t('انضمام', 'Join')}</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-amber-400 text-slate-950 font-medium rounded-ee-none'
                      : 'bg-slate-900/80 border border-white/10 text-slate-200 rounded-es-none'
                  }`}
                >
                  {renderMessageContent(msg.text)}
                  <div
                    className={`text-[9px] mt-1.5 text-end ${
                      msg.role === 'user' ? 'text-slate-800' : 'text-slate-500'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>{t('المساعد الذكي يحلل استفسارك...', 'DIEWA AI is analyzing your inquiry...')}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompts */}
          <div className="p-2.5 bg-slate-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(lang === 'ar' ? p.ar : p.en)}
                className="px-2.5 py-1 rounded-md bg-slate-900 border border-white/10 text-[11px] text-slate-300 hover:text-white hover:border-amber-400/40 whitespace-nowrap shrink-0 transition-colors"
              >
                {lang === 'ar' ? p.ar : p.en}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t('اكتب استفسارك هنا...', 'Ask about digital services or AI...')}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-slate-950 transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
