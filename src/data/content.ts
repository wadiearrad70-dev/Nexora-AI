import { ServiceItem, CaseStudy, Testimonial, FAQItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/diewa_hero_digital_studio_1792429159103.jpg';

export const SERVICES: ServiceItem[] = [
  {
    id: 'web-platforms',
    number: '01',
    title: {
      ar: 'هندسة وتطوير المنصات الرقمية السحابية',
      en: 'Enterprise Web & Cloud Platforms Engineering'
    },
    shortDesc: {
      ar: 'بناء تطبيقات ويب متكاملة وقابلة للتوسع بأعلى معايير الأداء والسرعة، متوافقة مع الأنظمة السحابية الحديثة.',
      en: 'Architecting scalable, ultra-responsive web applications with mission-critical reliability and cloud-native resilience.'
    },
    fullDesc: {
      ar: 'نصمم ونبني منصات برمجية مخصصة للشركات والمؤسسات بالاعتماد على أحدث أطر العمل (React 19، Next.js، Node.js، PostgreSQL). نضمن استجابة فائقة السرعة، أماناً بنكياً، وبنية تحتية تتحمل ملايين الزيارات دون انقطاع.',
      en: 'We engineer bespoke software platforms for enterprise scale using modern frameworks (React 19, Next.js, Node.js, PostgreSQL). We ensure sub-second response times, bank-grade encryption, and architectures built for sustained high traffic.'
    },
    deliverables: {
      ar: [
        'بنية معمارية قابلة للتوسع (Microservices / Modular Monolith)',
        'واجهات برمجية API متطورة وسريعة (REST & GraphQL)',
        'لوحات تحكم إدارية متقدمة مع تحليلات لحظية',
        'اختبارات آلية شاملة وأمان سيبراني متقدم'
      ],
      en: [
        'Scalable Architecture (Microservices & Modular Monolith)',
        'High-Throughput APIs (RESTful & GraphQL)',
        'Executive Analytics Dashboards & Data Pipelines',
        'End-to-End Automated Testing & Security Hardening'
      ]
    },
    techStack: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    timeline: {
      ar: '4 - 8 أسابيع للنسخة الأولية المتكاملة',
      en: '4 - 8 weeks to production MVP'
    },
    iconName: 'Code2'
  },
  {
    id: 'ui-ux-design',
    number: '02',
    title: {
      ar: 'تصميم واجهات وتجربة المستخدم الاستثنائية',
      en: 'Product UI/UX & Digital Brand Design'
    },
    shortDesc: {
      ar: 'تصميم نظم بصرية فريدة وواجهات رقمية سلسة تعزز معدل التحويل وتمنح المستخدم تجربة تفاعلية لا تُنسى.',
      en: 'Creating distinctive visual design systems and effortless user journeys engineered to maximize conversion and brand prestige.'
    },
    fullDesc: {
      ar: 'نحوّل الأفكار المعقدة إلى واجهات رقمية بديهية وفاتنة. نعتمد على أبحاث سلوك المستخدم العميقة، ونبني أنظمة تصميم شاملة (Design Systems) في Figma تضمن تناغم وتوحيد هوية علامتك التجارية عبر جميع الشاشات والأجهزة.',
      en: 'We distill complex business workflows into intuitive, striking visual interfaces. Grounded in behavioral analytics, we construct scalable Figma design systems that unify your digital presence across every screen size.'
    },
    deliverables: {
      ar: [
        'أبحاث المستخدم ورسم خرائط الرحلات الرقمية (User Journeys)',
        'نظام تصميم موحد وشامل (Design System & Tokens)',
        'نماذج تفاعلية عالية الدقة (High-Fidelity Prototypes)',
        'اختبارات سهولة الاستخدام واقتطاع معدلات التخلي'
      ],
      en: [
        'Behavioral Research & Detailed Journey Mapping',
        'Enterprise Design Systems & Design Tokens',
        'Interactive High-Fidelity Prototypes in Figma',
        'Usability Testing & Conversion Rate Optimization'
      ]
    },
    techStack: ['Figma', 'Design Systems', 'Tailwind CSS', 'Framer Motion', 'Accessibility WCAG'],
    timeline: {
      ar: '2 - 4 أسابيع للنظام التصميمي المتكامل',
      en: '2 - 4 weeks for complete Design System'
    },
    iconName: 'Layout'
  },
  {
    id: 'ecommerce',
    number: '03',
    title: {
      ar: 'حلول التجارة الإلكترونية المتقدمة',
      en: 'High-Scale E-Commerce Architectures'
    },
    shortDesc: {
      ar: 'متاجر رقمية متطورة مصممة لمضاعفة المبيعات، مع بوابات دفع دولية وإدارة مخزون ذكية.',
      en: 'Next-generation commerce platforms engineered for checkout speed, multi-currency payment routing, and inventory sync.'
    },
    fullDesc: {
      ar: 'نبني منصات التجارة الإلكترونية بدون رأس (Headless Commerce) أو المخصصة، التي تضمن سرعة تحميل فائقة وتجربة دفع بنقرة واحدة. ندعم تكاملات بوابات الدفع العالمية والمحلية، وأنظمة الشحن التلقائية، وبرامج الولاء المتقدمة.',
      en: 'We build headless and custom commerce engines with sub-second page loads and one-click checkout flows. Supporting multi-currency gateways, automated shipping webhooks, ERP integrations, and high-retention loyalty mechanisms.'
    },
    deliverables: {
      ar: [
        'تجربة تسوق بدون رأس (Headless Storefronts)',
        'تكامل بوابات الدفع (Stripe، Mada، Apple Pay، PayPal)',
        'ربط لحظي مع مستودعات الشحن وERP',
        'محرك توصيات المنتجات الذكي لرفع متوسط قيمة السلة'
      ],
      en: [
        'Headless Storefront with Instant Page Transitions',
        'Global Payment Gateways (Stripe, Apple Pay, Local Rails)',
        'Real-time Logistics & ERP Synchronization',
        'AOV Optimization & Smart Recommendation Engine'
      ]
    },
    techStack: ['Next.js Commerce', 'Shopify Plus / Medusa', 'Stripe', 'Redis', 'PostgreSQL'],
    timeline: {
      ar: '3 - 6 أسابيع للإطلاق التجاري',
      en: '3 - 6 weeks to live store launch'
    },
    iconName: 'ShoppingBag'
  },
  {
    id: 'automation-ai',
    number: '04',
    title: {
      ar: 'أتمتة العمليات وحلول الذكاء الاصطناعي للأعمال',
      en: 'Business Process Automation & Applied AI'
    },
    shortDesc: {
      ar: 'ربط الأنظمة وتوظيف النماذج الذكية لتقليص الأخطاء البشرية وأتمتة المهام اليومية المتكررة.',
      en: 'Integrating intelligent agents and automated pipelines to reduce operational bottlenecks and accelerate execution.'
    },
    fullDesc: {
      ar: 'نساعد الشركات على توفير مئات الساعات التشغيلية عبر ربط الأنظمة غير المتوافقة، واستخراج البيانات الذكية، وبناء روبوتات مساعدة ذكية متخصصة تعتمد على قواعد بيانات الشركة دون تسريب أي بيانات حساسة.',
      en: 'We eliminate manual friction by orchestrating enterprise API integrations, intelligent document extraction, and private knowledge-base agents that empower teams without exposing sensitive data.'
    },
    deliverables: {
      ar: [
        'خطوط أتمتة تدفق العمليات (Workflows & Webhooks)',
        'مساعدات ذكاء اصطناعي مخصصة لبيانات الشركة (Private RAG)',
        'استخراج وتصنيف المستندات والعقود آلياً',
        'تنبيهات استباقية لمؤشرات الأداء التشغيلي'
      ],
      en: [
        'Automated Workflow Pipelines & Event Webhooks',
        'Private Enterprise Knowledge RAG Assistants',
        'Automated Document Processing & Extraction',
        'Predictive Operational Alerts & Anomaly Audits'
      ]
    },
    techStack: ['Python', 'FastAPI', 'Vector Databases', 'OpenAI / Gemini', 'Celery', 'Docker'],
    timeline: {
      ar: '2 - 5 أسابيع حسب تعقيد مسار العمليات',
      en: '2 - 5 weeks depending on workflow complexity'
    },
    iconName: 'Cpu'
  },
  {
    id: 'cloud-security',
    number: '05',
    title: {
      ar: 'البنية التحتية السحابية وهندسة الحماية',
      en: 'Cloud DevOps & High-Availability Infrastructure'
    },
    shortDesc: {
      ar: 'إعداد وإدارة خوادم سحابية ذات جاهزية 99.99%، مع حماية استباقية ضد التهديدات والنسخ الاحتياطي اللحظي.',
      en: 'Configuring and managing 99.99% uptime cloud architectures with proactive DDoS mitigation and continuous backups.'
    },
    fullDesc: {
      ar: 'نهيئ بنية تحتية آمنة على AWS وGoogle Cloud وCloudflare مع تطبيق أفضل ممارسات البنية التحتية البرمجية (IaC). نضمن تعافي الأنظمة من الكوارث في ثوانٍ، وتدفق عمليات النشر المؤتمت (CI/CD) بدون أي توقف للخدمة.',
      en: 'We architect resilient infrastructure across AWS, Google Cloud, and Cloudflare using Infrastructure as Code (Terraform). Ensuring zero-downtime CI/CD deployments and instant disaster recovery protocols.'
    },
    deliverables: {
      ar: [
        'إعداد البنية التحتية ككود (Terraform / IaC)',
        'أنابيب النشر المستمر (CI/CD Pipelines) بدون توقف',
        'مراقبة الأداء اللحظي وسجلات الأمان الشاملة',
        'تأمين خوادم قواعد البيانات والنسخ التلقائي'
      ],
      en: [
        'Infrastructure as Code (Terraform / Kubernetes)',
        'Zero-Downtime Continuous Deployment Pipelines',
        'Real-time Monitoring & Observability Stacks',
        'Database Hardening & Automated Snapshot Vaults'
      ]
    },
    techStack: ['AWS', 'Google Cloud', 'Cloudflare', 'Docker', 'Kubernetes', 'Terraform'],
    timeline: {
      ar: '1 - 3 أسابيع للإعداد الشامل',
      en: '1 - 3 weeks for complete deployment'
    },
    iconName: 'ShieldCheck'
  },
  {
    id: 'tech-consulting',
    number: '06',
    title: {
      ar: 'الاستشارات التقنية والإشراف الهندسي المباشر',
      en: 'CTO Advisory & Digital Strategy Consulting'
    },
    shortDesc: {
      ar: 'توجيه هندسي استراتيجي لاختيار أفضل التقنيات، تدقيق الأكواد، وحوكمة المشاريع الرقمية.',
      en: 'Strategic engineering guidance for technology selection, codebase architecture audits, and digital roadmap execution.'
    },
    fullDesc: {
      ar: 'نعمل كذراع تقني استراتيجي (Fractional CTO) للمؤسسات والشركات الناشئة. نقوم بفحص البنية الحالية للأنظمة، وتقييم جودة الأكواد البرمجية، ووضع خطط التوسع التقني المستقبلية لتقليل تكاليف التطوير والصيانة على المدى الطويل.',
      en: 'We partner with enterprise leaders and funded startups as Fractional CTOs. We perform codebase forensic audits, structure hiring roadmaps, and engineer technical blueprints that prevent costly legacy rewrites.'
    },
    deliverables: {
      ar: [
        'تدقيق شامل للأكواد البرمجية والأمان (Code & Security Audit)',
        'خارطة طريق تقنية لـ 12 شهراً قادمة',
        'تقييم واختيار مزودي الحلول السحابية وحزم البرمجيات',
        'جلسات إشراف وتوجيه أسبوعية مع كبار المهندسين'
      ],
      en: [
        'Comprehensive Codebase & Vulnerability Audit',
        '12-Month Technical Architecture Roadmap',
        'Cloud Vendor & Stack Due Diligence',
        'Weekly Engineering Leadership & Mentorship'
      ]
    },
    techStack: ['System Architecture', 'Security Review', 'Tech Diligence', 'Team Scaling'],
    timeline: {
      ar: 'عقود ربع سنوية أو استشارات مخصصة',
      en: 'Quarterly retainers or sprint-based reviews'
    },
    iconName: 'Compass'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aura-capital',
    client: 'Aura Capital',
    category: 'web',
    categoryLabel: {
      ar: 'منصة استثمارية سحابية',
      en: 'Fintech & Investment Platform'
    },
    title: {
      ar: 'منصة التحليلات المالية وإدارة الصناديق الاستثمارية',
      en: 'High-Frequency Financial Analytics & Fund Engine'
    },
    summary: {
      ar: 'هندسة منصة سحابية تفاعلية لعرض المؤشرات الاستثمارية اللحظية مع خفض زمن الاستجابة إلى 42 ملي ثانية وزيادة حجم التداول.',
      en: 'Architected a reactive institutional analytics dashboard reducing query latency to 42ms and driving +140% in user trade volume.'
    },
    impactMetric: {
      value: '+140%',
      label: {
        ar: 'نمو العمليات المنفذة في أول 6 أشهر',
        en: 'Transaction volume in 6 months'
      }
    },
    secondaryMetric: {
      value: '42ms',
      label: {
        ar: 'متوسط زمن استجابة الاستعلامات',
        en: 'Average query response latency'
      }
    },
    imagePath: '/src/assets/images/diewa_case_fintech_platform_1792429159521.jpg',
    tags: ['React 19', 'TypeScript', 'Tailwind', 'PostgreSQL', 'WebSockets'],
    deliverables: {
      ar: ['لوحة تحكم استثمارية في الوقت الفعلي', 'نظام تنبيهات فوري لتقلبات السوق', 'محفظة إدارة أصول مشفرة وآمنة'],
      en: ['Real-time streaming portfolio dashboard', 'Sub-second market alert engine', 'Bank-grade encrypted asset manager']
    },
    challenge: {
      ar: 'كانت المنصة القديمة تعاني من بطء تحديث البيانات عند وصول آلاف المستثمرين في نفس اللحظة مع صعوبة قراءة الرسوم البيانية.',
      en: 'The legacy client system struggled with high concurrency during market open spikes, causing chart freezes and user drop-off.'
    },
    solution: {
      ar: 'إعادة بناء المعمارية بالكامل عبر اتصالات WebSockets سريعة، وتقسيم المكونات التفاعلية باستخدام React 19 مع تخزين مؤقت على Redis.',
      en: 'Full architectural redesign utilizing low-latency WebSockets, React 19 concurrent rendering, and Redis caching layers.'
    }
  },
  {
    id: 'moderne-luxe',
    client: 'Moderne Luxe Studio',
    category: 'ecommerce',
    categoryLabel: {
      ar: 'متجر فاخر وتجارة إلكترونية',
      en: 'Luxury E-Commerce Storefront'
    },
    title: {
      ar: 'تجربة تسوق رقمية فائقة السرعة للمنتجات الراقية',
      en: 'Sub-Second Headless Commerce Experience'
    },
    summary: {
      ar: 'تصميم وبناء متجر إلكتروني ذو هوية راقية وسرعة استثنائية أسهم في رفع معدل إتمام الشراء بنسبة +215%.',
      en: 'Engineered an editorial luxury storefront delivering instant transitions, boosting checkout completion by +215%.'
    },
    impactMetric: {
      value: '+215%',
      label: {
        ar: 'ارتفاع في معدل إتمام عمليات الشراء',
        en: 'Checkout conversion rate increase'
      }
    },
    secondaryMetric: {
      value: '0.8s',
      label: {
        ar: 'سرعة التحميل الإجمالية للصفحات',
        en: 'Complete page load benchmark'
      }
    },
    imagePath: '/src/assets/images/diewa_case_ecommerce_luxury_1792429160243.jpg',
    tags: ['Next.js', 'Headless Commerce', 'Stripe', 'Figma', 'Edge CDN'],
    deliverables: {
      ar: ['واجهة شراء بدون رأس Headless', 'بوابة دفع عالمية بضغطة واحدة', 'تصميم متوافق 100% مع الهواتف الذكية'],
      en: ['Headless Edge storefront', 'One-click global checkout integration', 'Bespoke mobile-first catalog layout']
    },
    challenge: {
      ar: 'معدل الارتداد العالي وبطء تحميل صور المنتجات عالية الدقة كان يتسبب في خسارة أكثر من 45% من المبيعات المحتملة.',
      en: 'High bounce rates caused by 4-second page loads on heavy photography were bleeding nearly half of targeted organic ad traffic.'
    },
    solution: {
      ar: 'تطبيق معمارية Edge مع ضغط ذكي للأصول الرقمية وبناء تدفق شراء مبسّط لا يتجاوز شاشتين.',
      en: 'Deployed an edge-cached Next.js infrastructure with responsive WebP image pipelines and a frictionless two-step checkout flow.'
    }
  },
  {
    id: 'flowmesh-core',
    client: 'FlowMesh Technologies',
    category: 'automation',
    categoryLabel: {
      ar: 'أتمتة سحابية وتكامل بيانات',
      en: 'Cloud Automation & Pipeline Engine'
    },
    title: {
      ar: 'منظومة تدفق البيانات الذكية وأتمتة مسارات العمل',
      en: 'Automated Multi-Node Cloud Ingestion Pipeline'
    },
    summary: {
      ar: 'بناء خطوط معالجة سحابية ذاتية الإدارة خفّضت التكاليف التشغيلية بنسبة 35% وألغت الأخطاء اليدوية في إدخال البيانات تماماً.',
      en: 'Constructed an event-driven serverless pipeline slashing recurring operational costs by 35% with zero manual sync errors.'
    },
    impactMetric: {
      value: '35%',
      label: {
        ar: 'انخفاض في تكاليف البنية التحتية الشهرية',
        en: 'Reduction in monthly cloud infrastructure overhead'
      }
    },
    secondaryMetric: {
      value: '99.99%',
      label: {
        ar: 'موثوقية تشغيلية بدون أي توقف',
        en: 'Sustained platform uptime SLA'
      }
    },
    imagePath: '/src/assets/images/diewa_case_ai_automation_1792429160526.jpg',
    tags: ['Python', 'FastAPI', 'Docker', 'AWS Lambda', 'PostgreSQL'],
    deliverables: {
      ar: ['محرك أتمتة متعدد النقاط', 'لوحة مراقبة للأخطاء والتدفق', 'تكامل آلي مع 14 نظاماً داخلياً'],
      en: ['Event-driven ingestion coordinator', 'Observability & retry console', 'Automated webhooks with 14 third-party SaaS']
    },
    challenge: {
      ar: 'فريق العمل كان يقضي 30 ساعة أسبوعياً في نقل ومعالجة البيانات بين أنظمة المحاسبة والمخزون والمبيعات يدوياً.',
      en: 'The client spent 30+ manual engineering hours each week reconciling mismatched data between CRM, billing, and inventory.'
    },
    solution: {
      ar: 'أتمتة كاملة لدورة حياة البيانات مع خوارزميات للتحقق من الاتساق وتنبيه المشرفين عند وجود حالات استثنائية فقط.',
      en: 'Orchestrated automated serverless microservices with schema validation, idempotency guards, and instant exception alerts.'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: {
      ar: 'م. طارق السعيد',
      en: 'Eng. Tarek El-Saeed'
    },
    role: {
      ar: 'الرئيس التنفيذي للتقنية',
      en: 'Chief Technology Officer'
    },
    company: 'FinNova Labs',
    quote: {
      ar: 'فريق DIEWA نقل معايير التطوير في شركتنا إلى مستوى آخر. التزامهم بالدقة وسرعة التسليم والأمان جعلهم شريكنا الاستراتيجي الدائم.',
      en: 'DIEWA elevated our product development standards exponentially. Their discipline in speed, security, and precision makes them an invaluable technical ally.'
    },
    metricResult: '+140% Qualified User Growth'
  },
  {
    id: 't2',
    name: {
      ar: 'سارة المنصوري',
      en: 'Sarah Al-Mansouri'
    },
    role: {
      ar: 'مديرة العمليات والنمو الرقمي',
      en: 'VP of Digital Operations'
    },
    company: 'Apex Retail Group',
    quote: {
      ar: 'التصميم العصري وتجربة المستخدم التي طورتها DIEWA لمتجرنا رفعت معدل التحويل بمقدار الضعف خلال أول 90 يوماً من الإطلاق.',
      en: 'The digital flagship experience created by DIEWA doubled our e-commerce conversion rates within the first 90 days post-launch.'
    },
    metricResult: '+215% Conversion Rate'
  },
  {
    id: 't3',
    name: {
      ar: 'د. يوسف النجار',
      en: 'Dr. Youssef Al-Najjar'
    },
    role: {
      ar: 'مؤسس وشريك إداري',
      en: 'Managing Founder'
    },
    company: 'CogniHealth Systems',
    quote: {
      ar: 'من النادر أن تجد وضوحاً هندسياً وإتقاناً في التنفيذ كما وجدناه مع DIEWA. كود نظيف، توثيق احترافي، ودعم مستمر لا يتوقف.',
      en: 'Finding engineering rigor matched with exceptional aesthetic polish is rare. Clean code, comprehensive documentation, and unflinching reliability.'
    },
    metricResult: '45ms Average Latency'
  }
];

export const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: {
      ar: 'الاكتشاف والتحليل المعماري',
      en: 'Discovery & System Blueprint'
    },
    desc: {
      ar: 'ندرس أهداف عملك بعمق، ونحلل المتطلبات الفنية، ونضع المخطط الهندسي الدقيق للبنية وقواعد البيانات قبل كتابة أي سطر كود.',
      en: 'We dissect your core business objectives, map architectural bottlenecks, and establish a bulletproof technical blueprint before engineering starts.'
    }
  },
  {
    step: '02',
    title: {
      ar: 'التصميم التفاعلي وهندسة الواجهات',
      en: 'Interactive Prototyping & UX Systems'
    },
    desc: {
      ar: 'نصمم رحلات المستخدم ونظام المكونات الرقمية بدقة عالية، مع محاكاة كاملة للتجربة على كافة الشاشات لضمان انسيابية تامة.',
      en: 'We craft frictionless user journeys and high-fidelity interactive Figma prototypes with design token systems for seamless frontend parity.'
    }
  },
  {
    step: '03',
    title: {
      ar: 'التطوير البرمجي واختبارات الجودة',
      en: 'Agile Sprints & Automated QA'
    },
    desc: {
      ar: 'برمجة دقيقة بأحدث التقنيات مع كتابة اختبارات آلية شاملة، ومراجعات أمان صارمة تضمن استقرار النظام تحت أعلى درجات الضغط.',
      en: 'Modern full-stack implementation using typed code, automated integration suites, and security audits ensuring absolute stability under peak load.'
    }
  },
  {
    step: '04',
    title: {
      ar: 'الإطلاق السحابي والتحسين المستمر',
      en: 'Continuous Deployment & Growth'
    },
    desc: {
      ar: 'نشر البنية على الخوادم السحابية المؤتمتة، تدريب فريقك، وتسليم كافة الأصول والكود المصدري مع مراقبة أداء لحظية.',
      en: 'Zero-downtime cloud provisioning, complete code repository handover, staff walk-throughs, and real-time observability telemetry.'
    }
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    question: {
      ar: 'كيف تبدأ خطوة العمل الأولى مع DIEWA؟',
      en: 'How does our initial collaboration begin?'
    },
    answer: {
      ar: 'نبدأ بجلسة استكشافية مركزة (Discovery Call) نناقش فيها أهداف مشروعك، النطاق الزمني، والميزانية المقترحة. بعدها نقدم مقترحاً هندسياً مفصلاً يحتوي على خطة العمل، جدول التسليم، والتكلفة الدقيقة.',
      en: 'We initiate with a structured Discovery Call to unpack your operational scope, target milestones, and budget. Within 48 hours, we present an exhaustive technical roadmap with guaranteed milestone schedules.'
    }
  },
  {
    id: 'faq-2',
    question: {
      ar: 'من يملك الكود المصدري والأصول الرقمية للمشروع؟',
      en: 'Who owns the intellectual property and codebase?'
    },
    answer: {
      ar: 'أنت تملك 100% من الكود المصدري، التصاميم، قواعد البيانات، والتراخيص فور إتمام المشروع. نسلمك مستودعات Git منظمة وموثقة بالكامل دون أي شروط احتكارية.',
      en: 'You retain 100% full intellectual property ownership. Upon milestone sign-off, all clean Git repositories, Figma design assets, and database schemas are transferred directly to your organization.'
    }
  },
  {
    id: 'faq-3',
    question: {
      ar: 'ما هي منهجية الدفع وتوزيع المراحل؟',
      en: 'What are the payment terms and milestone structures?'
    },
    answer: {
      ar: 'نعتمد نظام الدفعات المرتبطة بمراحل الإنجاز الفعلية (Milestone-Based). عادة ما تقسم إلى 3 أو 4 مراحل تبدأ بدفعة مبدئية، تليها دفعات بعد اعتماد التصاميم والنسخ التجريبية، ودفعة نهائية عند الإطلاق الرسمي.',
      en: 'We utilize a transparent milestone-governed payment schedule typically partitioned across 3 to 4 tranches: kickoff deposit, design & architecture approval, beta sprint sign-off, and final production handover.'
    }
  },
  {
    id: 'faq-4',
    question: {
      ar: 'هل توفرون الصيانة والدعم الفني بعد الإطلاق؟',
      en: 'Do you provide post-launch maintenance and engineering support?'
    },
    answer: {
      ar: 'نعم، يتضمن كل مشروع فترة ضمان وصيانة مجانية لمدة 30 إلى 60 يوماً بعد الإطلاق. كما نوفر باقات دعم فني مستمرة تشمل التحديثات الأمنية، مراقبة الخوادم، وتطوير الميزات الجديدة.',
      en: 'Every engagement includes a complimentary 30-to-60-day post-launch warranty period covering security patches and performance optimization, followed by flexible ongoing engineering retainers.'
    }
  },
  {
    id: 'faq-5',
    question: {
      ar: 'ما الذي يميز DIEWA عن الشركات التقليدية؟',
      en: 'What sets DIEWA apart from conventional agencies?'
    },
    answer: {
      ar: 'في DIEWA، لا نستخدم القوالب الجاهزة أو الحلول السطحية. نحن مهندسون ومصممون نبني برمجيات مخصصة ذات معمارية سحابية نظيفة، وتصاميم عصرية جذابة تخدم أهدافك التجارية المباشرة وتقيس نتائجها بالأرقام.',
      en: 'We refuse generic templates and superficial workarounds. We are software craftsmen and product designers building bespoke, high-performance cloud architectures engineered specifically for your measurable business growth.'
    }
  }
];
