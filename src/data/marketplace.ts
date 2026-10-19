export interface MarketplaceItem {
  id: string;
  type: 'product' | 'service';
  title: {
    ar: string;
    en: string;
  };
  subtitle: {
    ar: string;
    en: string;
  };
  price: number;
  originalPrice?: number;
  category: 'ai' | 'design' | 'saas' | 'ecommerce' | 'audit';
  categoryLabel: {
    ar: string;
    en: string;
  };
  image: string;
  deliverables: {
    ar: string[];
    en: string[];
  };
  description: {
    ar: string;
    en: string;
  };
  techStack: string[];
  license: {
    ar: string;
    en: string;
  };
  badge?: {
    ar: string;
    en: string;
  };
}

export const MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'ai-agent-framework',
    type: 'product',
    title: {
      ar: 'حزمة إطار عمل الوكلاء الأذكياء (Enterprise AI Agent Kit)',
      en: 'Enterprise AI Agent Framework & Pipeline Kit'
    },
    subtitle: {
      ar: 'كود مصدري كامل لبناء وكلاء أذكياء مع منظومة RAG وقواعد بيانات متجهة',
      en: 'Production-ready starter repository for multi-agent workflows and private enterprise RAG'
    },
    price: 349,
    originalPrice: 499,
    category: 'ai',
    categoryLabel: {
      ar: 'ذكاء اصطناعي وأتمتة',
      en: 'AI & Automation'
    },
    image: '/src/assets/images/diewa_prod_ai_agent_kit_1792434024672.jpg',
    deliverables: {
      ar: [
        'مستودع كود كامل مبني على Python & FastAPI',
        'محرك تكامل مع نماذج Gemini 3.8 Flash و OpenAI',
        'توصيلات مهيأة مع Pinecone و Qdrant و PostgreSQL Vector',
        'توثيق هندسي كامل مع ملفات Docker جاهزة للنشر'
      ],
      en: [
        'Complete typed repository on Python & FastAPI',
        'Orchestration pipeline for Gemini 3.8 and OpenAI models',
        'Preconfigured connectors for Pinecone, Qdrant & pgvector',
        'Full engineering documentation & Docker Compose files'
      ]
    },
    description: {
      ar: 'قالب برمجي احترافي صممه مهندسو DIEWA لتمكين الشركات والمطورين من إطلاق مساعدين وأتمتة ذكية خلال ساعات بدلاً من شهور، مع حماية تامة للبيانات.',
      en: 'A battle-tested production starter kit engineered by DIEWA to help enterprises deploy sovereign multi-agent workflows in hours rather than months.'
    },
    techStack: ['Python', 'FastAPI', 'Gemini SDK', 'Docker', 'pgvector'],
    license: {
      ar: 'ترخيص تجاري غير محدود للشركات',
      en: 'Unrestricted Commercial License'
    },
    badge: {
      ar: 'الأكثر طلباً',
      en: 'Best Seller'
    }
  },
  {
    id: 'helios-design-system',
    type: 'product',
    title: {
      ar: 'نظام تصميم هيليوس المتكامل (Helios UI Design System)',
      en: 'Helios Enterprise UI Design System & Token Kit'
    },
    subtitle: {
      ar: 'مكتبة مكونات Figma ورموز تصميمية رقمية فائقة الدقة متوافقة مع Tailwind v4',
      en: 'Exquisite Figma design system with 400+ production components & auto-layout tokens'
    },
    price: 189,
    originalPrice: 260,
    category: 'design',
    categoryLabel: {
      ar: 'أنظمة التصميم وFigma',
      en: 'Design Systems'
    },
    image: '/src/assets/images/diewa_prod_design_system_1792434026186.jpg',
    deliverables: {
      ar: [
        'ملف Figma رئيسي يحتوي على أكثر من 450 مكون تفاعلي',
        'دعم كامل للوضعين الداكن والفاتح مع تباين WCAG AAA',
        'متغيرات Design Tokens متطابقة 100% مع Tailwind CSS',
        'مكتبة أيقونات متجهة وشاشات لوحات تحكم جاهزة'
      ],
      en: [
        'Master Figma file with 450+ responsive auto-layout components',
        'Flawless dark and light modes compliant with WCAG AAA',
        'Token architecture mirroring Tailwind CSS v4 variables',
        'Curated vector icon set and dashboard screen templates'
      ]
    },
    description: {
      ar: 'أقوى نظام تصميم للمؤسسات والشركات التقنية، مصمم لتسريع فرق التصميم والتطوير وخفض وقت بناء الواجهات بنسبة 70%.',
      en: 'The definitive design architecture for high-growth tech platforms, accelerating product velocity and ensuring design consistency.'
    },
    techStack: ['Figma', 'Tailwind CSS', 'Design Tokens', 'WCAG AAA'],
    license: {
      ar: 'ترخيص فرق العمل والمشاريع غير المحدودة',
      en: 'Unlimited Team & Commercial License'
    }
  },
  {
    id: 'cloud-saas-core',
    type: 'product',
    title: {
      ar: 'قالب معمارية SaaS السحابية (Horizon Multi-Tenant Core)',
      en: 'Horizon Cloud Multi-Tenant SaaS Boilerplate'
    },
    subtitle: {
      ar: 'بنية برمجية متكاملة بـ React 19، Next.js، نظام المصادقة، والاشتراكات السحابية',
      en: 'Full-stack enterprise SaaS foundation with auth, role permissions, and billing rails'
    },
    price: 490,
    originalPrice: 650,
    category: 'saas',
    categoryLabel: {
      ar: 'قوالب برمجية سحابية',
      en: 'SaaS Platforms'
    },
    image: '/src/assets/images/diewa_prod_cloud_saas_core_1792434027007.jpg',
    deliverables: {
      ar: [
        'تطبيق كامل بـ React 19 و Next.js مع معمارية سحابية نظيفة',
        'نظام مصادقة متعدد المستأجرين مع إدارة الأدوار (RBAC)',
        'تكامل كامل مع بوابات الدفع والاشتراكات المتكررة (Stripe)',
        'قواعد بيانات PostgreSQL مع Drizzle ORM وسجلات تدقيق'
      ],
      en: [
        'Production Next.js & React 19 codebase with clean modular layers',
        'Multi-tenant authentication engine with role-based access control',
        'Turnkey Stripe recurring billing and subscription webhooks',
        'PostgreSQL schema with migrations, caching, and audit logs'
      ]
    },
    description: {
      ar: 'اختصر 4 أشهر من العمل الهندسي الشاق وابدأ بيع اشتراكاتك الرقمية خلال أيام مع أقوى بنية برمجية سحابية معتمدة من DIEWA.',
      en: 'Bypass months of foundational boilerplate engineering and launch your subscription product on an ultra-resilient architecture.'
    },
    techStack: ['React 19', 'Next.js', 'PostgreSQL', 'Stripe', 'Docker'],
    license: {
      ar: 'ترخيص كامل لتطوير مشاريعك الخاصة وعملائك',
      en: 'Full Commercial & Client Resell License'
    },
    badge: {
      ar: 'بنية هندسية متكاملة',
      en: 'Enterprise Grade'
    }
  },
  {
    id: 'headless-commerce-engine',
    type: 'product',
    title: {
      ar: 'قالب التجارة الإلكترونية فائق السرعة (Arcane Headless)',
      en: 'Arcane Headless Commerce Storefront Template'
    },
    subtitle: {
      ar: 'متجر فاخر مع سرعة تحميل أقل من ثانية وتجربة شراء سلسة بضغطة واحدة',
      en: 'Sub-second luxury digital storefront optimized for multi-currency high-conversion checkouts'
    },
    price: 380,
    originalPrice: 520,
    category: 'ecommerce',
    categoryLabel: {
      ar: 'تجارة إلكترونية متطورة',
      en: 'E-Commerce'
    },
    image: '/src/assets/images/diewa_prod_ecommerce_engine_1792434026208.jpg',
    deliverables: {
      ar: [
        'واجهة متجر سريعة جداً بدون رأس (Headless Storefront)',
        'محرك بحث وفلاتر لحظية بدون إعادة تحميل الصفحة',
        'صفحة دفع مخصصة ومبسطة تدعم Apple Pay والبطاقات',
        'لوحة إدارة مخزون ومزامنة تلقائية مع Shopify أو API خاص'
      ],
      en: [
        'Edge-rendered headless storefront with instant page transitions',
        'Sub-millisecond instant search and facet filtering',
        'High-converting checkout flow supporting Apple Pay and Stripe',
        'Sync adapters for Shopify, Medusa, and custom backend ERPs'
      ]
    },
    description: {
      ar: 'متجر صُمم لعلامات التجزئة الفاخرة لزيادة معدل التحويل إلى أقصى حد وتوفير تجربة تسوق فارهة على كافة الهواتف والشاشات.',
      en: 'Designed specifically for luxury brands and modern retailers seeking double-digit conversion uplifts and mobile perfection.'
    },
    techStack: ['Next.js Commerce', 'Tailwind', 'Stripe', 'Redis'],
    license: {
      ar: 'ترخيص تجاري مخصص للمتاجر',
      en: 'Commercial Storefront License'
    }
  },
  {
    id: 'service-security-audit',
    type: 'service',
    title: {
      ar: 'خدمة التدقيق البرمجي والأمن السيبراني الشامل',
      en: 'Comprehensive Codebase & Security Forensic Audit'
    },
    subtitle: {
      ar: 'فحص هندسي دقيق للثغرات، الأداء، وجاهزية التوسع مع تقرير تنفيذي رسمي',
      en: 'Rigorous manual and automated code review assessing vulnerabilities, latency, and scaling'
    },
    price: 1250,
    originalPrice: 1800,
    category: 'audit',
    categoryLabel: {
      ar: 'باقات وخدمات هندسية',
      en: 'Engineering Services'
    },
    image: '/src/assets/images/diewa_case_ai_automation_1792429160526.jpg',
    deliverables: {
      ar: [
        'فحص معمق للأكواد البرمجية والمكتبات ضد معايير OWASP',
        'تحليل قياسات الأداء واكتشاف نقاط الاختناق في قواعد البيانات',
        'تقرير استشاري مفصل مع خطة تصحيحية خطوة بخطوة',
        'جلسة نقاش مباشرة لمدة ساعتين مع كبير مهندسي DIEWA'
      ],
      en: [
        'In-depth static & dynamic code inspection against OWASP standards',
        'Database query profiling and concurrency bottleneck discovery',
        'Actionable executive remediation roadmap with exact line references',
        '2-hour live strategy debrief with DIEWA Lead Solutions Architect'
      ]
    },
    description: {
      ar: 'باقة استشارية متخصصة تقدمها DIEWA للشركات قبل الإطلاق الرسمي أو جولات الاستثمار لضمان سلامة الكود واستقراره التام.',
      en: 'An intensive security and architecture evaluation designed for startups and institutions ahead of major funding or public launches.'
    },
    techStack: ['Security Audit', 'Penetration Testing', 'Architecture Review', 'CTO Consultation'],
    license: {
      ar: 'تقرير سرّي معتمد وموقع بموجب NDA',
      en: 'Confidential Certified Audit Report'
    },
    badge: {
      ar: 'خدمة هندسية تنفيذية',
      en: 'Executive Service'
    }
  },
  {
    id: 'service-mvp-sprint',
    type: 'service',
    title: {
      ar: 'سبرنت تسريع إطلاق الـ MVP (14 Days Sprint)',
      en: 'Rapid MVP Acceleration Engineering Pod (14 Days)'
    },
    subtitle: {
      ar: 'فريق هندسي وتصميمي مخصص بالكامل لبناء وإطلاق منتجك الأولي في أسبوعين',
      en: 'Dedicated cross-functional engineering pod to design, code, and deploy your live MVP in 14 days'
    },
    price: 3600,
    originalPrice: 4800,
    category: 'saas',
    categoryLabel: {
      ar: 'باقات وخدمات هندسية',
      en: 'Engineering Services'
    },
    image: '/src/assets/images/diewa_hero_digital_studio_1792429159103.jpg',
    deliverables: {
      ar: [
        'فريق متفرغ (مهندس برمجيات أول + مصمم UI/UX)',
        'تصميم وبناء النسخة التجريبية الأولى بنظام Sprint مكثف',
        'نشر فوري على خوادم سحابية مؤمنة مع اسم نطاقك الخاص',
        'تسليم كافة الأصول والكود المصدري وضمان 45 يوماً'
      ],
      en: [
        'Dedicated squad (Senior Full-Stack Engineer + Product Designer)',
        'Interactive prototype and production frontend/backend engineering',
        'Zero-downtime deployment to secure cloud infra with custom domain',
        'Complete repository handover and 45-day warranty'
      ]
    },
    description: {
      ar: 'أفضل باقة لرواد الأعمال والشركات الناشئة التي تريد اختبار فكرتها في السوق الحقيقي بسرعة قياسية وجودة هندسية فائقة.',
      en: 'The definitive acceleration program for ambitious founders wanting to validate their product in the live market with zero compromises.'
    },
    techStack: ['Dedicated Engineering Pod', 'Next.js', 'React 19', 'PostgreSQL', 'Cloud Native'],
    license: {
      ar: 'ملكية تامة للكود 100% للعميل',
      en: '100% Client Code & IP Ownership'
    },
    badge: {
      ar: 'فريق هندسي مخصص',
      en: 'High Priority'
    }
  }
];
