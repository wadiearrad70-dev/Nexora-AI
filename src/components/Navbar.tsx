import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation }) => {
  const { lang, toggleLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#services', label: t('الخدمات', 'Services') },
    { href: '#portfolio', label: t('المشاريع', 'Case Studies') },
    { href: '#community', label: t('مجتمع AI', 'AI Community') },
    { href: '#estimator', label: t('حاسبة التكلفة', 'Estimator') },
    { href: '#faq', label: t('الأسئلة الشائعة', 'FAQ') },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#090D14]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/20' 
          : 'bg-transparent border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark in display face */}
        <a 
          href="#" 
          className="text-2xl font-black tracking-wider text-white whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
          aria-label="DIEWA Home"
        >
          DIEWA
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + compact language toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-white/10 rounded-md hover:border-white/20 transition-colors whitespace-nowrap shrink-0"
            title={lang === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'}
          >
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
          </button>

          <button
            onClick={onOpenConsultation}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors shadow-sm whitespace-nowrap shrink-0"
          >
            <span>{t('احجز استشارة رقمية', 'Book Discovery Call')}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#090D14]/95 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-slate-200 hover:text-amber-400 py-1 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
            >
              <span>{t('احجز استشارة رقمية', 'Book Discovery Call')}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
