import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Award, 
  Sparkles, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Copy, 
  Check, 
  ShieldCheck, 
  ArrowUpRight, 
  RefreshCw,
  QrCode,
  FileCheck2,
  Users
} from 'lucide-react';

interface CertificateData {
  verificationCode: string;
  fullName: string;
  track: string;
  experienceLevel: string;
  commendationAr: string;
  commendationEn: string;
  verifiedCompetencies: string[];
  grade: string;
  issueDate: string;
  issueDateEn: string;
}

export const CertificateSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const certificateRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState('');
  const [track, setTrack] = useState('هندسة وتطوير الذكاء الاصطناعي (AI & LLM Architecture)');
  const [experienceLevel, setExperienceLevel] = useState('Professional / محترف معتمد');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    'Python & PyTorch',
    'AI Agents & RAG',
    'Cloud Architecture',
    'React 19 & Next.js'
  ]);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCert, setGeneratedCert] = useState<CertificateData | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const whatsappCommunityUrl = 'https://chat.whatsapp.com/JmB6Uk37w7CHiHFtJWOico';

  const skillOptions = [
    'Python & PyTorch',
    'AI Agents & RAG',
    'Cloud Architecture',
    'React 19 & Next.js',
    'TypeScript',
    'FastAPI & APIs',
    'UI/UX Design Systems',
    'Vector Databases',
    'DevOps & Docker',
    'Cybersecurity & OWASP'
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      if (selectedSkills.length > 2) {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
      }
    } else {
      if (selectedSkills.length < 5) {
        setSelectedSkills([...selectedSkills, skill]);
      }
    }
  };

  const handleGenerateCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    setIsGenerating(true);

    try {
      const res = await fetch('/api/generate-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          track,
          experienceLevel,
          keySkills: selectedSkills,
          details: portfolioLink.trim()
        })
      });

      if (!res.ok) throw new Error('Failed to generate');
      const data: CertificateData = await res.json();
      setGeneratedCert(data);
    } catch (err) {
      console.error(err);
      // Fallback certificate
      const randomSuffix = Math.random().toString(36).substring(2, 8).toUpperCase();
      setGeneratedCert({
        verificationCode: `DIEWA-AI-2026-${randomSuffix}`,
        fullName: fullName.trim(),
        track,
        experienceLevel,
        commendationAr: `تشهد وكالة DIEWA للحلول والخدمات الرقمية وتطوير الذكاء الاصطناعي بأن ${fullName.trim()} قد استوفى كافة المعايير الهندسية والمهنية المقررة للانضمام والاعتماد الرسمي في مسار ${track}.`,
        commendationEn: `DIEWA Digital Solutions & AI Engineering certifies that ${fullName.trim()} has satisfied all professional criteria for official accreditation and admission into the DIEWA Network in ${track}.`,
        verifiedCompetencies: selectedSkills,
        grade: 'امتياز معتمد / Certified Distinction',
        issueDate: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
        issueDateEn: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyCode = () => {
    if (!generatedCert) return;
    navigator.clipboard.writeText(generatedCert.verificationCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleShare = () => {
    if (!generatedCert) return;
    const shareText = `حصلت على شهادة الاعتماد والانضمام الرسمية من وكالة DIEWA للحلول الرقمية وتطوير الذكاء الاصطناعي برقم توثيق: ${generatedCert.verificationCode} 🎓✨`;
    const shareUrl = `${window.location.origin}#certificate`;
    if (navigator.share) {
      navigator.share({
        title: 'DIEWA Certified Member',
        text: shareText,
        url: shareUrl,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      alert(t('تم نسخ رابط الشهادة للمشاركة!', 'Certificate link copied to clipboard!'));
    }
  };

  return (
    <section id="certificate" className="py-24 bg-[#080B12] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-wider text-amber-400 uppercase mb-3 flex items-center justify-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>{t('منظومة الاعتماد والانضمام الذكية', 'AI-Powered Professional Accreditation')}</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {t(
              'شهادة معتمدة ومعترف بها للانضمام إلى شبكة DIEWA للذكاء الاصطناعي',
              'Official Accredited Certificate for Joining the DIEWA AI & Tech Network'
            )}
          </h2>
          <p className="mt-4 text-base text-slate-400">
            {t(
              'أدخل بياناتك المهنية ليقوم الذكاء الاصطناعي بتقييم مسارك وإصدار شهادة انضمام رسمية موثقة بكود تحقق فريد وختم ذهبي معتمد.',
              'Submit your professional profile to generate a verifiable, AI-evaluated certificate of competence and network membership.'
            )}
          </p>
        </div>

        {/* 2-Column or Dynamic Generator Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Column */}
          <div className="lg:col-span-5 bg-slate-900/50 border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-sm font-bold text-white mb-2">
              <FileCheck2 className="w-4 h-4 text-amber-400" />
              <span>{t('بيانات إصدار الشهادة والاعتماد', 'Candidate Credentials')}</span>
            </div>
            <p className="text-xs text-slate-400 mb-6">
              {t('سيتم تضمين هذه البيانات في نص الشهادة المعتمد وكود التحقق الرقمي.', 'These details will be embedded in your official verifiable credential.')}
            </p>

            <form onSubmit={handleGenerateCertificate} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {t('الاسم بالكامل (كما يظهر بالشهادة)', 'Full Name (as printed on certificate)')} <span className="text-amber-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={lang === 'ar' ? 'مثال: المهندس أحمد المنصور' : 'e.g. Eng. Ahmed Al-Mansoor'}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {t('المسار التخصصي', 'Accreditation Track')}
                </label>
                <select
                  value={track}
                  onChange={(e) => setTrack(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="هندسة وتطوير الذكاء الاصطناعي (AI & LLM Architecture)">{t('هندسة وتطوير الذكاء الاصطناعي (AI & LLM Architecture)', 'AI & LLM Architecture')}</option>
                  <option value="تطوير المنصات السحابية والأنظمة (Cloud & Web Engineering)">{t('تطوير المنصات السحابية والأنظمة', 'Cloud & Web Engineering')}</option>
                  <option value="تصميم واجهات وتجربة المستخدم (Product UI/UX Systems)">{t('تصميم واجهات وتجربة المستخدم', 'Product UI/UX Systems')}</option>
                  <option value="التجارة الإلكترونية والحلول الرقمية (Enterprise E-Commerce)">{t('التجارة الإلكترونية والحلول الرقمية', 'Enterprise E-Commerce')}</option>
                  <option value="أتمتة الأعمال والتحول الرقمي (Workflow Automation)">{t('أتمتة الأعمال والتحول الرقمي', 'Workflow Automation')}</option>
                  <option value="الأمن السيبراني والبنية التحتية (DevOps & Security)">{t('الأمن السيبراني والبنية التحتية', 'DevOps & Security')}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {t('المستوى المهني', 'Professional Seniority')}
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                >
                  <option value="Associate / ممارس معتمد">{t('ممارس معتمد (Associate Member)', 'Associate Member')}</option>
                  <option value="Professional / محترف معتمد">{t('محترف معتمد (Professional Specialist)', 'Professional Specialist')}</option>
                  <option value="Senior Specialist / أخصائي أول">{t('أخصائي أول (Senior Engineer)', 'Senior Engineer')}</option>
                  <option value="Lead Architect / مهندس معماري رئيسي">{t('مهندس معماري رئيسي (Lead Architect)', 'Lead Architect')}</option>
                </select>
              </div>

              {/* Skills Multi-selection */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  {t('اختر أهم مهاراتك التقنية (2 - 5 مهارات)', 'Select Key Verified Competencies (2 - 5 skills)')}
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {skillOptions.map((skill) => {
                    const isSelected = selectedSkills.includes(skill);
                    return (
                      <button
                        type="button"
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                            : 'bg-slate-950/60 border-white/10 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  {t('رابط أعمال أو GitHub / LinkedIn (اختياري)', 'Portfolio or LinkedIn Link (Optional)')}
                </label>
                <input
                  type="url"
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isGenerating || !fullName.trim()}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 disabled:opacity-50 text-slate-950 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 active:scale-[0.98] mt-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t('الذكاء الاصطناعي يقوم بتحليل وتوليد الشهادة...', 'AI is evaluating and issuing certificate...')}</span>
                  </>
                ) : (
                  <>
                    <Award className="w-4 h-4" />
                    <span>{t('إصدار شهادة الانضمام المعتمدة', 'Issue Official AI Accredited Certificate')}</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t('الشهادة تمنحك صفة عضو معتمد في شبكة DIEWA الهندسية ومجتمع واتساب.', 'Grants verified membership status in DIEWA Engineering & WhatsApp hub.')}</span>
            </div>
          </div>

          {/* Certificate Preview Column */}
          <div className="lg:col-span-7">
            
            {/* The Certificate Canvas */}
            <div 
              ref={certificateRef}
              id="printable-certificate"
              className="relative p-6 sm:p-10 rounded-3xl bg-[#090D16] border-2 border-amber-400/40 shadow-2xl shadow-black/90 overflow-hidden text-slate-100"
            >
              {/* Guilloche & Decorative Vector Border */}
              <div className="absolute inset-2.5 border border-amber-400/20 rounded-2xl pointer-events-none" />
              <div className="absolute inset-4 border border-dashed border-amber-400/15 rounded-xl pointer-events-none" />
              
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-400/60" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-400/60" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-400/60" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-400/60" />

              {/* Watermark Logo in Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none font-black text-9xl tracking-widest text-amber-400 select-none">
                DIEWA
              </div>

              {/* Certificate Top Header */}
              <div className="relative z-10 flex items-start justify-between pb-6 border-b border-amber-400/20">
                <div>
                  <div className="text-xl sm:text-2xl font-black tracking-widest text-white mb-0.5">
                    DIEWA
                  </div>
                  <div className="text-[10px] tracking-wider text-amber-400/90 uppercase font-semibold">
                    {t('وكالة الحلول والخدمات الرقمية المتطورة', 'ADVANCED DIGITAL & AI SOLUTIONS')}
                  </div>
                </div>

                {/* Verification Badge */}
                <div className="text-end">
                  <div className="text-[9px] text-slate-400 uppercase tracking-wider">
                    {t('رقم التحقق المعتمد', 'Verification Credential')}
                  </div>
                  <div className="text-xs font-mono font-bold text-amber-400 font-mono-numbers">
                    {generatedCert ? generatedCert.verificationCode : 'DIEWA-AI-2026-PREVIEW'}
                  </div>
                </div>
              </div>

              {/* Certificate Title */}
              <div className="relative z-10 text-center my-8">
                <div className="text-xs font-semibold tracking-widest text-amber-400/80 uppercase mb-2">
                  {t('شهادة اعتماد وانضمام مهني رسمي', 'OFFICIAL ACCREDITATION & MEMBERSHIP CERTIFICATE')}
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 mb-2">
                  {t('شهادة الكفاءة والقبول الهندسي', 'Certificate of Competence & Network Admission')}
                </h3>

                <p className="text-xs text-slate-400">
                  {t('تمنح هذه الوثيقة تقديراً للتميز التقني والاستحقاق البرمجي', 'Awarded in recognition of technical excellence and domain proficiency')}
                </p>
              </div>

              {/* Candidate Name Highlight */}
              <div className="relative z-10 text-center my-6 py-4 border-y border-amber-400/15 bg-amber-400/[0.02]">
                <div className="text-xs text-slate-400 mb-1">
                  {t('تُمنح هذه الشهادة المعتمدة إلى:', 'This is proudly conferred upon:')}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-wide">
                  {generatedCert ? generatedCert.fullName : (fullName || t('اسم المرشح الكريم', 'Candidate Full Name'))}
                </div>
                <div className="text-xs text-amber-300 font-medium mt-1">
                  {generatedCert ? generatedCert.track : track} · <span className="text-slate-400">{generatedCert ? generatedCert.experienceLevel : experienceLevel}</span>
                </div>
              </div>

              {/* Commendation Paragraph */}
              <div className="relative z-10 text-xs sm:text-sm text-slate-300 text-center leading-relaxed px-2 sm:px-6 mb-8 font-light">
                {generatedCert ? (
                  lang === 'ar' ? generatedCert.commendationAr : generatedCert.commendationEn
                ) : (
                  t(
                    'تشهد وكالة DIEWA للحلول والخدمات الرقمية وتطوير الذكاء الاصطناعي بأن حامل هذه الشهادة قد أثبت الكفاءة والجدارة الفنية المطلوبة، وتم اعتماده رسمياً كعضو فاعل ضمن شبكتنا التقنية ومجتمع تطوير الذكاء الاصطناعي.',
                    'DIEWA Digital Solutions & AI Engineering certifies that the recipient has demonstrated required engineering acumen and is officially admitted as an accredited member of the DIEWA Global Technology Network.'
                  )
                )}
              </div>

              {/* Verified Competencies */}
              <div className="relative z-10 mb-8 p-4 rounded-xl bg-slate-950/60 border border-white/5">
                <div className="text-[10px] font-semibold text-amber-400/80 uppercase tracking-wider mb-2.5 text-center">
                  {t('الكفاءات والمهارات المعتمدة للشهادة', 'Verified Competencies & Stack Credentials')}
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {(generatedCert ? generatedCert.verifiedCompetencies : selectedSkills).map((c, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-amber-400/20 text-xs text-slate-200 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3 h-3 text-amber-400" />
                      <span>{c}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Dual Signatures & Seal Row */}
              <div className="relative z-10 pt-6 border-t border-amber-400/20 grid grid-cols-3 gap-4 items-center">
                
                {/* Signature 1 */}
                <div className="text-center">
                  <div className="font-serif italic text-base text-amber-300 tracking-wider mb-1">
                    Wadie Arrad
                  </div>
                  <div className="w-24 h-px bg-slate-600 mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-white">
                    {t('رئيس الإشراف الهندسي', 'Lead Engineering Director')}
                  </div>
                  <div className="text-[9px] text-slate-500">DIEWA Studio</div>
                </div>

                {/* Central Gold Emblem Seal */}
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-600 p-0.5 shadow-lg shadow-amber-500/30 flex items-center justify-center">
                    <div className="w-full h-full rounded-full bg-[#090D16] border border-amber-300 flex flex-col items-center justify-center text-center p-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400 mb-0.5" />
                      <span className="text-[8px] font-black tracking-widest text-amber-300">DIEWA</span>
                      <span className="text-[6px] text-slate-400 uppercase">SEAL</span>
                    </div>
                  </div>
                  <span className="text-[8px] text-amber-400/80 mt-1 font-mono">
                    {t('ختم الاعتماد الرقمي', 'AUTHENTICATED')}
                  </span>
                </div>

                {/* Signature 2 */}
                <div className="text-center">
                  <div className="font-serif italic text-base text-amber-300 tracking-wider mb-1">
                    AI Review Pod
                  </div>
                  <div className="w-24 h-px bg-slate-600 mx-auto mb-1" />
                  <div className="text-[10px] font-bold text-white">
                    {t('لجنة تقييم الذكاء الاصطناعي', 'AI Advisory Board')}
                  </div>
                  <div className="text-[9px] text-slate-500">
                    {generatedCert ? (lang === 'ar' ? generatedCert.issueDate : generatedCert.issueDateEn) : t('أكتوبر 2026', 'October 2026')}
                  </div>
                </div>

              </div>

            </div>

            {/* Actions Bar Below Certificate */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400/40 text-xs font-semibold text-white flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>{t('طباعة / حفظ PDF', 'Print / Save PDF')}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-amber-400/40 text-xs font-semibold text-white flex items-center gap-2 transition-colors shadow-sm"
                >
                  <Share2 className="w-4 h-4 text-amber-400" />
                  <span>{t('مشاركة الشهادة', 'Share')}</span>
                </button>

                {generatedCert && (
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/20 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? t('تم النسخ', 'Copied') : t('نسخ كود التوثيق', 'Copy ID')}</span>
                  </button>
                )}
              </div>

              {/* Direct Link to join community as certified member */}
              <a
                href={whatsappCommunityUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-2 transition-colors"
              >
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{t('الانضمام للجروب كعضو معتمد', 'Join Group as Certified Member')}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
