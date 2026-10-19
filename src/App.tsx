import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { AIWebsiteBuilderSection } from './components/AIWebsiteBuilderSection';
import { MarketplaceSection } from './components/MarketplaceSection';
import { PortfolioSection } from './components/PortfolioSection';
import { BlogSection } from './components/BlogSection';
import { AICommunitySection } from './components/AICommunitySection';
import { EstimatorSection } from './components/EstimatorSection';
import { MethodologySection } from './components/MethodologySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { CertificateSection } from './components/CertificateSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIAssistantWidget } from './components/AIAssistantWidget';

function MainApp() {
  const { lang } = useLanguage();
  const [selectedService, setSelectedService] = useState<string>('');
  const [lockedScope, setLockedScope] = useState<string>('');

  const handleOpenConsultation = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEstimator = () => {
    const estimatorElem = document.getElementById('estimator');
    if (estimatorElem) {
      estimatorElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    handleOpenConsultation();
  };

  const handleApplyEstimate = (estimate: {
    projectType: string;
    scale: string;
    velocity: string;
    support: string;
    estimatedCost: string;
    estimatedWeeks: string;
  }) => {
    const scopeSummary = `${estimate.projectType} · ${estimate.scale} · ${estimate.velocity} · ${estimate.support} · ميزانية تقديرية: ${estimate.estimatedCost} · المدة: ${estimate.estimatedWeeks}`;
    setLockedScope(scopeSummary);
    handleOpenConsultation();
  };

  return (
    <div className="min-h-screen bg-[#090D14] text-slate-100 flex flex-col font-sans selection:bg-amber-400/20 selection:text-amber-200">
      {/* Top Navbar */}
      <Navbar onOpenConsultation={handleOpenConsultation} />

      {/* Main Body */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onStartProject={handleOpenEstimator}
          onExploreWork={() => {
            const portfolioElem = document.getElementById('portfolio');
            if (portfolioElem) {
              portfolioElem.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Services Bento Grid */}
        <ServicesSection onSelectServiceForQuote={handleSelectService} />

        {/* AI Text-to-Website Builder Studio */}
        <AIWebsiteBuilderSection
          onRequestDeploy={(siteName, promptText) => {
            setSelectedService(lang === 'ar' ? `تطوير ونشر موقع كامل: ${siteName}` : `Production Website Deployment: ${siteName}`);
            setLockedScope(promptText);
            handleOpenConsultation();
          }}
        />

        {/* Digital Products & Packaged Services Marketplace */}
        <MarketplaceSection onDirectConsultation={handleSelectService} />

        {/* Proven Case Studies & Proof Metrics */}
        <PortfolioSection onSelectProjectForInquiry={(client) => {
          setSelectedService(lang === 'ar' ? `مشروع مماثل لحالة: ${client}` : `Similar architecture to: ${client}`);
          handleOpenConsultation();
        }} />

        {/* Software Engineering & Digital Transformation SEO Blog */}
        <BlogSection onArticleConsultation={(topicTitle) => {
          setSelectedService(topicTitle);
          handleOpenConsultation();
        }} />

        {/* Dedicated WhatsApp AI Development Community & Inquiries Section */}
        <AICommunitySection />

        {/* AI-Powered Verified Membership & Accreditation Certificate */}
        <CertificateSection />

        {/* Interactive Scope & Cost Estimator */}
        <EstimatorSection onApplyEstimate={handleApplyEstimate} />

        {/* Engineering Methodology */}
        <MethodologySection />

        {/* Testimonials */}
        <TestimonialsSection />

        {/* FAQ Accordion */}
        <FAQSection />

        {/* Contact & Consultation Engine */}
        <ContactSection
          prefilledService={selectedService}
          prefilledScope={lockedScope}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive DIEWA AI Assistant */}
      <AIAssistantWidget
        onOpenEstimator={handleOpenEstimator}
        onOpenContact={handleOpenConsultation}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}
