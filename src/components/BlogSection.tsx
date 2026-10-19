import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { 
  BookOpen, 
  Search, 
  ArrowUpRight, 
  Clock, 
  Calendar, 
  User, 
  X, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  Code2, 
  CheckCircle2, 
  MessageSquare,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

interface BlogSectionProps {
  onArticleConsultation?: (topicTitle: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onArticleConsultation }) => {
  const { lang, t } = useLanguage();
  const ArrowIcon = lang === 'ar' ? ChevronLeft : ChevronRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'architecture' | 'ai' | 'transformation' | 'performance'>('all');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [copiedCodeSnippet, setCopiedCodeSnippet] = useState<string | null>(null);
  const [shareFeedback, setShareFeedback] = useState(false);

  const whatsappCommunityUrl = 'https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico';

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      if (!q) return matchesCategory;

      const title = (lang === 'ar' ? post.title.ar : post.title.en).toLowerCase();
      const excerpt = (lang === 'ar' ? post.excerpt.ar : post.excerpt.en).toLowerCase();
      const tags = post.tags.join(' ').toLowerCase();
      const keywords = post.seoKeywords.join(' ').toLowerCase();

      return matchesCategory && (title.includes(q) || excerpt.includes(q) || tags.includes(q) || keywords.includes(q));
    });
  }, [selectedCategory, searchQuery, lang]);

  const featuredPost = BLOG_POSTS[0];

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeSnippet(code);
    setTimeout(() => setCopiedCodeSnippet(null), 2500);
  };

  const handleShareArticle = (post: BlogPost) => {
    const postTitle = lang === 'ar' ? post.title.ar : post.title.en;
    const url = `${window.location.origin}#blog`;
    if (navigator.share) {
      navigator.share({
        title: postTitle,
        text: `${postTitle} - مدونة DIEWA الهندسية`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${postTitle}\n${url}`);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2500);
    }
  };

  return (
    <section id="blog" className="py-24 bg-[#080B13] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{t('مدونة DIEWA للهندسة البرمجية والتحول الرقمي', 'DIEWA SOFTWARE ENGINEERING & ARCHITECTURE JOURNAL')}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {t(
              'أحدث الرؤى والأبحاث الهندسية في بناء الأنظمة السحابية والذكاء الاصطناعي',
              'Engineering Research, Cloud Architecture Patterns & Enterprise Digital Strategy'
            )}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t(
              'مقالات متعمقة ودراسات معمارية كتبها كبار مهندسينا لمساعدة الشركات ورواد الأعمال على اتخاذ قرارات تقنية سليمة وتعزيز الحضور الرقمي.',
              'Peer-reviewed architectural perspectives from senior engineers designed to optimize system scale and search authority.'
            )}
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-white/5">
          
          {/* Category Tabs (functional filter buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar p-1 rounded-xl bg-slate-900/60 border border-white/10">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'all' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('جميع المقالات', 'All Articles')}
            </button>
            <button
              onClick={() => setSelectedCategory('architecture')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'architecture' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('معمارية سحابية', 'Cloud Architecture')}
            </button>
            <button
              onClick={() => setSelectedCategory('ai')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'ai' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('ذكاء اصطناعي وأتمتة', 'AI & Agents')}
            </button>
            <button
              onClick={() => setSelectedCategory('transformation')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'transformation' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('التحول الرقمي', 'Transformation')}
            </button>
            <button
              onClick={() => setSelectedCategory('performance')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === 'performance' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {t('السرعة والأداء', 'Web Performance')}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('ابحث في المقالات أو التقنيات...', 'Search articles, topics or tags...')}
              className="w-full ps-10 pe-4 py-2 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute top-1/2 -translate-y-1/2 end-3 text-slate-500 hover:text-white text-xs"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Featured Marquee Article (Shown when no search is applied) */}
        {!searchQuery && selectedCategory === 'all' && featuredPost && (
          <div className="mb-14 rounded-3xl bg-slate-900/40 border border-white/10 hover:border-amber-400/40 transition-all duration-300 overflow-hidden shadow-2xl group">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              
              {/* Featured Image */}
              <div className="lg:col-span-7 aspect-[16/9] lg:aspect-auto relative overflow-hidden bg-slate-950">
                <img
                  src={featuredPost.coverImage}
                  alt={lang === 'ar' ? featuredPost.title.ar : featuredPost.title.en}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-transparent opacity-60 lg:opacity-30" />
              </div>

              {/* Featured Content Column */}
              <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
                <div>
                  {/* Clean unboxed metadata with dot separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                    <span className="font-semibold text-amber-400">
                      {lang === 'ar' ? featuredPost.categoryLabel.ar : featuredPost.categoryLabel.en}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{lang === 'ar' ? featuredPost.publishedDate.ar : featuredPost.publishedDate.en}</span>
                    <span aria-hidden="true">·</span>
                    <span>{lang === 'ar' ? featuredPost.readTime.ar : featuredPost.readTime.en}</span>
                  </div>

                  <h3 
                    className="text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors leading-tight mb-4"
                    style={{ textWrap: 'balance' }}
                  >
                    {lang === 'ar' ? featuredPost.title.ar : featuredPost.title.en}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-light">
                    {lang === 'ar' ? featuredPost.excerpt.ar : featuredPost.excerpt.en}
                  </p>

                  {/* Clean unboxed tags */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mb-6">
                    {featuredPost.tags.map((tag, i) => (
                      <span key={i}>#{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Author & Read Action */}
                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-center">
                      {featuredPost.author.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">
                        {lang === 'ar' ? featuredPost.author.name.ar : featuredPost.author.name.en}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lang === 'ar' ? featuredPost.author.role.ar : featuredPost.author.role.en}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveArticle(featuredPost)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>{t('قراءة المقال كاملاً', 'Read Full Paper')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center text-slate-500 rounded-2xl bg-slate-900/30 border border-white/5">
            <BookOpen className="w-10 h-10 mx-auto text-slate-600 mb-3" />
            <p className="text-xs text-slate-400">
              {t('لا توجد مقالات مطابقة لبحثك حالياً.', 'No matching engineering articles found.')}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-slate-900/40 border border-white/10 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-lg shadow-black/40"
              >
                <div>
                  {/* Article Thumbnail */}
                  <div className="aspect-[16/10] w-full overflow-hidden relative bg-slate-950">
                    <img
                      src={post.coverImage}
                      alt={lang === 'ar' ? post.title.ar : post.title.en}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090D14] via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    {/* Clean unboxed metadata kicker */}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-2.5">
                      <span className="font-semibold text-amber-400">
                        {lang === 'ar' ? post.categoryLabel.ar : post.categoryLabel.en}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{lang === 'ar' ? post.readTime.ar : post.readTime.en}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug mb-2.5">
                      {lang === 'ar' ? post.title.ar : post.title.en}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                      {lang === 'ar' ? post.excerpt.ar : post.excerpt.en}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{lang === 'ar' ? post.publishedDate.ar : post.publishedDate.en}</span>
                      <span>·</span>
                      <span>{lang === 'ar' ? post.author.name.ar : post.author.name.en}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 truncate max-w-[180px]">
                    <span>#{post.tags[0]}</span>
                    <span>·</span>
                    <span>#{post.tags[1]}</span>
                  </div>

                  <button
                    onClick={() => setActiveArticle(post)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <span>{t('عرض المقال', 'Read')}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>

      {/* Interactive Full Article Reader Modal */}
      {activeArticle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveArticle(null)}
        >
          <div 
            className="w-full max-w-4xl bg-[#0B0F19] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl relative max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close & Share Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="text-amber-400 font-bold">{lang === 'ar' ? activeArticle.categoryLabel.ar : activeArticle.categoryLabel.en}</span>
                <span>·</span>
                <span>{lang === 'ar' ? activeArticle.publishedDate.ar : activeArticle.publishedDate.en}</span>
                <span>·</span>
                <span>{lang === 'ar' ? activeArticle.readTime.ar : activeArticle.readTime.en}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareArticle(activeArticle)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-amber-400/40 text-xs font-medium text-white flex items-center gap-1.5 transition-colors"
                  title="Share Article"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{shareFeedback ? t('تم النسخ', 'Copied') : t('مشاركة', 'Share')}</span>
                </button>

                <button
                  onClick={() => setActiveArticle(null)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Article Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {lang === 'ar' ? activeArticle.title.ar : activeArticle.title.en}
            </h2>

            {/* Author Credential Card */}
            <div className="flex items-center gap-3.5 py-4 mb-8 border-y border-white/5">
              <div className="w-10 h-10 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold flex items-center justify-center">
                {activeArticle.author.avatar}
              </div>
              <div>
                <div className="text-sm font-bold text-white">
                  {lang === 'ar' ? activeArticle.author.name.ar : activeArticle.author.name.en}
                </div>
                <div className="text-xs text-slate-400">
                  {lang === 'ar' ? activeArticle.author.role.ar : activeArticle.author.role.en}
                </div>
              </div>
            </div>

            {/* Hero Cover Frame */}
            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden mb-8 bg-slate-950 border border-white/10">
              <img
                src={activeArticle.coverImage}
                alt={lang === 'ar' ? activeArticle.title.ar : activeArticle.title.en}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Article Sections Prose */}
            <div className="space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed font-light mb-10">
              {activeArticle.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {lang === 'ar' ? sec.heading.ar : sec.heading.en}
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    {lang === 'ar' ? sec.content.ar : sec.content.en}
                  </p>

                  {/* Code Snippet Box if available */}
                  {sec.codeSnippet && (
                    <div className="mt-4 rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                      <div className="p-3 bg-slate-900 border-b border-white/5 flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-400">{sec.codeLang || 'code'}</span>
                        <button
                          onClick={() => handleCopyCode(sec.codeSnippet!)}
                          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
                        >
                          {copiedCodeSnippet === sec.codeSnippet ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCodeSnippet === sec.codeSnippet ? t('تم النسخ', 'Copied') : t('نسخ الكود', 'Copy')}</span>
                        </button>
                      </div>
                      <pre className="p-4 font-mono text-xs text-slate-200 overflow-x-auto">
                        <code>{sec.codeSnippet}</code>
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Key Engineering Takeaways Box */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-amber-400/20 mb-8">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>{t('أهم الخلاصات الهندسية (Key Architecture Takeaways)', 'Key Engineering Takeaways')}</span>
              </div>
              <div className="space-y-2">
                {(lang === 'ar' ? activeArticle.keyTakeaways.ar : activeArticle.keyTakeaways.en).map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Article Footer & Consultation CTA */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="text-slate-500">{t('الكلمات المفتاحية:', 'Keywords:')}</span>
                {activeArticle.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-white/10 text-slate-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>{t('ناقش هذا المقال في مجتمع واتساب', 'Discuss in WhatsApp Group')}</span>
                </a>

                <button
                  onClick={() => {
                    const articleTitle = lang === 'ar' ? activeArticle.title.ar : activeArticle.title.en;
                    setActiveArticle(null);
                    if (onArticleConsultation) {
                      onArticleConsultation(`استشارة فنية بناءً على مقال: ${articleTitle}`);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
                >
                  <span>{t('حجز استشارة مع مهندسي DIEWA', 'Book Architectural Consultation')}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
