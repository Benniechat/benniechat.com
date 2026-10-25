/**
 * BennieChat TechWealth Solutions - Main Application JavaScript
 * "Technology That Improves Business"
 * Corporate Profile 2026 Edition Interactive Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroCanvas();
    initHeroRefTabs();
    initScrollHeader();
    initAnimatedCounters();
    initRoiSimulator();
    initCapabilityExplorer();
    initPipelineLifecycle();
    initIndustryCockpit();
    initVentureModals();
    initFounderCarousel();
    initProjectEstimator();
    initCacModal();
    initBackToTop();
    initMobileBottomNav();
});

/* ==========================================================================
   Clean Navigation & Mobile Toggle
   ========================================================================== */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            const isOpen = navLinks.classList.contains('active');
            menuToggle.innerHTML = isOpen ? '✕' : '☰';
            menuToggle.setAttribute('aria-expanded', isOpen);
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '☰';
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) {
            if (!navLinks.contains(e.target) && menuToggle && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.innerHTML = '☰';
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
}

function initScrollHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* ==========================================================================
   Hero Canvas Interactive Constellation & Mesh
   ========================================================================== */
function initHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    let height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : 500;

    window.addEventListener('resize', () => {
        width = canvas.width = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
        height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : 500;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 65);

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.7;
            this.vy = (Math.random() - 0.5) * 0.7;
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.4 ? 'rgba(0, 242, 254, ' : 'rgba(139, 92, 246, ';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.baseAlpha + ')';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    let mouse = { x: null, y: null, maxDist: 130 };

    window.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();

            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0, 242, 254, ${0.18 * (1 - dist / 110)})`;
                    ctx.lineWidth = 0.7;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            // Connect to mouse cursor
            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.maxDist) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.4 * (1 - dist / mouse.maxDist)})`;
                    ctx.lineWidth = 1.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* ==========================================================================
   Hero Reference Showcase Tabs (Explaining Deliverables visually)
   ========================================================================== */
function initHeroRefTabs() {
    const tabBtns = document.querySelectorAll('.hero-ref-tab-btn');
    const panels = document.querySelectorAll('.hero-ref-panel');

    if (!tabBtns.length || !panels.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

/* ==========================================================================
   Animated Counters
   ========================================================================== */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                const prefix = counter.getAttribute('data-prefix') || '';
                let current = 0;
                const increment = Math.max(1, target / 50);

                const update = () => {
                    if (current < target) {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = prefix + target.toLocaleString() + suffix;
                        } else {
                            counter.innerText = prefix + Math.ceil(current).toLocaleString() + suffix;
                            requestAnimationFrame(update);
                        }
                    }
                };
                update();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.3 });

    counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   Interactive Business Economics ROI Simulator
   ========================================================================== */
function initRoiSimulator() {
    const teamSlider = document.getElementById('teamSizeSlider');
    const hoursSlider = document.getElementById('hoursLostSlider');
    const rateSlider = document.getElementById('hourlyRateSlider');

    const teamVal = document.getElementById('teamSizeVal');
    const hoursVal = document.getElementById('hoursLostVal');
    const rateVal = document.getElementById('hourlyRateVal');

    const totalHoursOutput = document.getElementById('roiHoursSaved');
    const totalSavingsOutput = document.getElementById('roiCapitalSaved');
    const velocityOutput = document.getElementById('roiVelocity');
    const errorReductionOutput = document.getElementById('roiErrorReduction');

    if (!teamSlider || !hoursSlider || !rateSlider) return;

    function recalculateEconomics() {
        const team = parseInt(teamSlider.value, 10);
        const weeklyHours = parseInt(hoursSlider.value, 10);
        const rate = parseInt(rateSlider.value, 10);

        teamVal.textContent = team + (team === 1 ? ' member' : ' members');
        hoursVal.textContent = weeklyHours + ' hrs/wk';
        rateVal.textContent = '₦' + rate.toLocaleString() + '/hr';

        // BennieChat automation typically recovers ~70% of manual administrative hours
        const weeklyHoursSaved = team * weeklyHours * 0.70;
        const annualHoursSaved = Math.round(weeklyHoursSaved * 52);
        const annualCapitalUnlocked = Math.round(annualHoursSaved * rate);

        totalHoursOutput.textContent = annualHoursSaved.toLocaleString() + ' hrs';
        totalSavingsOutput.textContent = '₦' + (annualCapitalUnlocked >= 1000000 
            ? (annualCapitalUnlocked / 1000000).toFixed(1) + 'M+' 
            : annualCapitalUnlocked.toLocaleString());

        // Velocity gain scales with team size
        const velocityMultiplier = Math.min(8.5, 3.2 + (team * 0.05)).toFixed(1);
        velocityOutput.textContent = '+' + velocityMultiplier + 'x';
        
        // Error reduction
        errorReductionOutput.textContent = '-85%';
    }

    teamSlider.addEventListener('input', recalculateEconomics);
    hoursSlider.addEventListener('input', recalculateEconomics);
    rateSlider.addEventListener('input', recalculateEconomics);

    recalculateEconomics();
}

/* ==========================================================================
   10 Capabilities Explorer & Specification Modals
   ========================================================================== */
const CAPABILITY_DATABASE = {
    'cap-01': {
        title: 'Website Design & Development',
        num: '01',
        category: 'Web & SaaS',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Working business assets engineered to establish credibility and capture customers.',
        summary: 'BennieChat provides website design and development services for businesses, organisations, entrepreneurs, and professional service providers. We treat the website as a working commercial asset rather than a static digital brochure.',
        deliverables: [
            'Corporate and institutional websites, business portals, and professional service portfolios',
            'E-commerce websites and online stores with secure multi-currency payment workflows',
            'Website redesign, modernization, and mobile-first responsive optimization across devices',
            'Content management systems (CMS), contact and multi-stage client enquiry workflows',
            'Domain registration, cloud hosting architecture, and managed maintenance services'
        ],
        techStack: 'HTML5, Modern CSS3, JavaScript, Next.js, Headless CMS, REST APIs, Cloudflare, AWS/Vercel',
        evidence: 'Beam Dynamic Solutions Limited (beamdsl.com), Mekadyne Oil and Gas (mekadyneoilandgas.org.ng), Harper\'s Concept (harpersconceptltd.com)'
    },
    'cap-02': {
        title: 'WordPress & No-Code Development',
        num: '02',
        category: 'Web & SaaS',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Practical rapid delivery combining proven CMS ecosystems with enterprise customization.',
        summary: 'Supports organisations seeking rapid, cost-effective digital deployment without reinventing every component from scratch. Scoped per security, speed, and governance requirements.',
        deliverables: [
            'Bespoke WordPress theme and custom block builder implementation',
            'Plugin selection, custom PHP development, and third-party API integration',
            'Membership, subscription, and restricted-access portal functionality',
            'High-converting landing pages and automated lead capture funnels',
            'Security hardening, speed optimization, and ongoing core/database maintenance'
        ],
        techStack: 'WordPress Core, Advanced Custom Fields, WooCommerce, PHP, Elementor/Gutenberg, Stripe/Paystack',
        evidence: '7+ years documented freelance & client website development track record'
    },
    'cap-03': {
        title: 'Software & Web Application Development',
        num: '03',
        category: 'Web & SaaS',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Custom browser-based business applications built around unique operational logic.',
        summary: 'We build web-based software solutions to solve operational bottlenecks, streamline multi-user data collection, and provide actionable management dashboards.',
        deliverables: [
            'Browser-based business applications, administrative portals, and client dashboards',
            'Internal operational management tools and staff workflow systems',
            'Multi-tier user registration, role-based access control (RBAC), and authentication',
            'Data-entry, record-management, and structured audit logs',
            'Minimum Viable Products (MVPs) for testing and launching new business models'
        ],
        techStack: 'Node.js, Python/Django, React, TypeScript, PostgreSQL, MongoDB, Docker, REST/GraphQL',
        evidence: 'Proprietary internal systems and documented client web applications'
    },
    'cap-04': {
        title: 'SaaS & Digital Product Development',
        num: '04',
        category: 'Web & SaaS',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Multi-tenant subscription software concepts and scalable product architectures.',
        summary: 'Turning domain expertise into subscription-based software. We assist founders and enterprises through product architecture, prototyping, MVP deployment, and scaling.',
        deliverables: [
            'Subscription-based software architecture and billing logic integration',
            'Multi-tenant database structures and organization workspace management',
            'Digital service marketplaces and automated order fulfilment applications',
            'User dashboards, metrics reporting, and usage-based account governance',
            'Product roadmap planning, technical backlog sequencing, and MVP delivery'
        ],
        techStack: 'Next.js, Tailwind/Vanilla CSS, Supabase, Stripe Billing, Node.js microservices, Redis',
        evidence: 'GetiDone, ROSCA AI™, HotelShield™, Zonita TV internal venture developments'
    },
    'cap-05': {
        title: 'Digital Transformation & Process Improvement',
        num: '05',
        category: 'Automation & Process',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Transitioning manual, fragmented operations into structured digital ecosystems.',
        summary: 'We do not introduce technology for its own sake. We assess your physical or spreadsheet workflows to determine how digitisation can genuinely eliminate bottlenecks and improve economics.',
        deliverables: [
            'Comprehensive audit of manual workflows, physical forms, and paper-trail bottlenecks',
            'Digitisation of forms, document submission queues, and searchable record archives',
            'Information architecture redesign for cross-departmental data accessibility',
            'Elimination of administrative duplication and manual WhatsApp/Email workarounds',
            'Standard Operating Procedure (SOP) documentation and team onboarding guidance'
        ],
        techStack: 'Airtable, PostgreSQL, Custom Web Forms, Google Workspace Automation, Digital Signatures',
        evidence: 'Engineering and industrial documentation workflows, VATEX profile content'
    },
    'cap-06': {
        title: 'Workflow Automation & Integration',
        num: '06',
        category: 'Automation & Process',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Connecting disparate tools so your business functions on autopilot without data loss.',
        summary: 'Eliminate repetitive manual data entry. We engineer automated communication, record syncing, status tracking, and notification pipelines that save hundreds of human hours.',
        deliverables: [
            'Automated form submission handling, multi-channel instant notifications (Email, SMS, WhatsApp)',
            'Approval and escalation workflows across managers, supervisors, and finance',
            'Automated report compilation, PDF generation, and periodic executive digests',
            'API integrations bridging CRM, accounting, inventory, and payment systems',
            'Exception handling, audit logging, and automated failure alerts'
        ],
        techStack: 'Zapier, Make/Integromat, Python Scripts, Webhooks, REST APIs, WhatsApp Business Cloud API',
        evidence: 'Automated Bin Card Inventory Workflow, client notification bridges'
    },
    'cap-07': {
        title: 'Artificial Intelligence & Data Solutions',
        num: '07',
        category: 'Advanced & AI',
        status: 'Developing Capability',
        statusType: 'developing',
        tagline: 'Practical machine intelligence and data-driven decision support systems.',
        summary: 'We distinguish carefully between AI concepts, prototypes, and production models. Claims are made with absolute integrity, focusing on practical business decision support rather than hype.',
        deliverables: [
            'AI-assisted digital services and intelligent document/text processing',
            'Predictive analytics concepts and data-driven decision support architectures',
            'Intelligent search, customer FAQ triage, and conversational agent prototyping',
            'Statistical analysis, historical performance analysis, and data visualization',
            'AI product feasibility planning, prompt engineering, and LLM API integrations'
        ],
        techStack: 'OpenAI API, Google Gemini API, LangChain, Python, Pandas, Scikit-learn, Vector DBs',
        evidence: 'ROSCA AI™ initiative, AI Football Prediction concept model'
    },
    'cap-08': {
        title: 'Blockchain & Web3 Solutions',
        num: '08',
        category: 'Advanced & AI',
        status: 'Developing Capability',
        statusType: 'developing',
        tagline: 'Decentralized platforms and Blockchain-as-a-Service (BaaS) concept exploration.',
        summary: 'Exploring decentralized ledgers, Web3 community platforms, and cryptographic verification. Every engagement is scoped with rigorous feasibility, regulatory, and risk assessment.',
        deliverables: [
            'Blockchain as a Service (BaaS) architectural concept formulation',
            'Web3-oriented digital community platforms and identity governance',
            'Integration between conventional web applications and decentralized ledgers',
            'Smart contract interaction logic and cryptographic verification workflows',
            'Technical feasibility studies, risk profiling, and tokenomics model reviews'
        ],
        techStack: 'Solidity, Ethers.js, IPFS, Polygon/Ethereum testnets, Web3Auth, Node.js',
        evidence: 'AI, Blockchain & Cryptocurrency Social Platform concept initiative'
    },
    'cap-09': {
        title: 'E-Commerce & Digital Commerce',
        num: '09',
        category: 'Enterprise & Commerce',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Commercial digital storefronts engineered for smooth customer transactions.',
        summary: 'Powering retail and digital sales through robust product catalogues, frictionless checkout flows, secure payment gateways, and automated customer order notifications.',
        deliverables: [
            'High-speed digital product catalogues and filterable merchandise storefronts',
            'Shopping cart workflows, one-click checkout, and guest/account order flows',
            'Multi-currency payment integration (Paystack, Flutterwave, Stripe) with automated webhooks',
            'Customer accounts, order tracking, order receipts, and commission/referral tracking',
            'Inventory stock level alerts, coupon engines, and WhatsApp checkout integration'
        ],
        techStack: 'WooCommerce, Shopify, Custom React/Next.js Storefronts, Paystack, Flutterwave, Stripe',
        evidence: 'Tabit Clothing & Accessories, IfyGold Collections commercial contexts'
    },
    'cap-10': {
        title: 'Technology Consulting & Training',
        num: '10',
        category: 'Advisory & Training',
        status: 'Established Experience',
        statusType: 'established',
        tagline: 'Strategic advisory and hands-on guidance from initial scoping to execution.',
        summary: 'We advise leadership on technology selection, procurement feasibility, and digital roadmaps. We also provide practical training to empower internal teams to manage their digital assets.',
        deliverables: [
            'Requirements gathering, digital project planning, and architectural scoping',
            'Technology stack evaluation and vendor selection advisory',
            'Practical training for administrative teams on content management and digital tools',
            'Digital transformation roadmaps with phased investment sequencing',
            'Procurement readiness reviews, technical proposal preparation, and tender advisory'
        ],
        techStack: 'Agile & Waterfall Project Management, Jira, Notion, Process Mapping, Technical Writing',
        evidence: 'PMI-aligned methodology, International Association of Project Managers affiliation'
    }
};

function initCapabilityExplorer() {
    const filterButtons = document.querySelectorAll('.cap-filter-btn');
    const cards = document.querySelectorAll('.capability-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            cards.forEach(card => {
                const cardCat = card.getAttribute('data-category');
                if (category === 'all' || cardCat === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Modal Trigger Buttons
    document.querySelectorAll('.cap-view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const capId = btn.getAttribute('data-cap');
            openCapabilityModal(capId);
        });
    });
}

function openCapabilityModal(capId) {
    const data = CAPABILITY_DATABASE[capId];
    if (!data) return;

    const modal = document.getElementById('capabilityModal');
    const titleEl = document.getElementById('modalCapTitle');
    const numEl = document.getElementById('modalCapNum');
    const badgeEl = document.getElementById('modalCapBadge');
    const descEl = document.getElementById('modalCapDesc');
    const deliverablesListEl = document.getElementById('modalCapDeliverables');
    const techEl = document.getElementById('modalCapTech');
    const evidenceEl = document.getElementById('modalCapEvidence');

    titleEl.textContent = data.title;
    numEl.textContent = 'SERVICE ' + data.num;
    badgeEl.textContent = data.status;
    badgeEl.className = 'cap-status-pill ' + data.statusType;
    descEl.textContent = data.summary;

    deliverablesListEl.innerHTML = '';
    data.deliverables.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        deliverablesListEl.appendChild(li);
    });

    techEl.textContent = data.techStack;
    evidenceEl.textContent = data.evidence;

    modal.classList.add('active');
}

/* ==========================================================================
   5-Step Structured Delivery Lifecycle Pipeline
   ========================================================================== */
const PIPELINE_DATABASE = {
    1: {
        title: 'Phase 01: Requirements Definition',
        scope: 'We establish a rigorous understanding of the business problem, target audience, existing technical infrastructure, constraints, and measurable economic objectives before proposing any technology.',
        deliverables: [
            'Business Problem Statement & Desired Economics Matrix',
            'Stakeholder & Target User Persona Profiles',
            'Existing Systems & Data Sources Inventory',
            'Defined Functional Deliverables & Constraints'
        ],
        quality: 'Requirements Matrix signed off; ensures technology follows outcome, not trend.'
    },
    2: {
        title: 'Phase 02: Scope & Planning',
        scope: 'We organize the agreed activities, milestones, and responsibilities. Larger engagements incorporate a structured Work Breakdown Structure (WBS), risk register, and phased rollout timeline.',
        deliverables: [
            'Work Breakdown Structure (WBS) & Milestones Schedule',
            'Technical Architecture & Database Schema Outline',
            'Project Risk Register & Mitigation Strategy',
            'Roles, Responsibilities & Handover Criteria'
        ],
        quality: 'PMI-aligned scheduling; Waterfall or Agile sequencing tailored to project scale.'
    },
    3: {
        title: 'Phase 03: Design & Implementation',
        scope: 'We engineer the solution according to specifications — whether building a bespoke corporate web presence, custom web application, automated workflow, or interactive digital platform.',
        deliverables: [
            'UI/UX Responsive Layouts & Design System Tokens',
            'Clean, Modular Source Code with Version Control (Git)',
            'Database Models, REST/GraphQL APIs & Integrations',
            'Automated Form, Notification & Security Pipelines'
        ],
        quality: 'Modular architecture, strict credential management, and responsive device testing.'
    },
    4: {
        title: 'Phase 04: Validation & Review',
        scope: 'We validate the delivered solution against the agreed scope — executing functional tests, responsive audits across viewport sizes, form submission validation, integration checks, and security controls.',
        deliverables: [
            'Functional Verification & Cross-Browser Test Report',
            'Responsive Layout Audit (Mobile, Tablet, Desktop)',
            'Form Validation, Payment Gateway & API Integration Checks',
            'Scope Alignment Verification & Issue Resolution Log'
        ],
        quality: 'Rigorous pre-deployment acceptance criteria; documented defect correction.'
    },
    5: {
        title: 'Phase 05: Handover & Support',
        scope: 'We complete the engagement through formal handover — transferring administrative access, deployment guides, user training, system documentation, and agreed post-launch maintenance.',
        deliverables: [
            'Administrative Credentials & Access Control Handover',
            'Deployment Information & Production Environment Setup',
            'System Operations Guide & Administrative Guidance',
            'Contracted Maintenance & SLA Support Terms'
        ],
        quality: 'Complete knowledge transfer ensuring the client maintains full operational ownership.'
    }
};

function initPipelineLifecycle() {
    const stepNodes = document.querySelectorAll('.pipeline-step-node');
    const titleEl = document.getElementById('pipelinePhaseTitle');
    const descEl = document.getElementById('pipelinePhaseDesc');
    const listEl = document.getElementById('pipelinePhaseList');
    const qualityEl = document.getElementById('pipelinePhaseQuality');

    if (!stepNodes.length || !titleEl) return;

    stepNodes.forEach(node => {
        node.addEventListener('click', () => {
            stepNodes.forEach(n => n.classList.remove('active'));
            node.classList.add('active');

            const stepNum = node.getAttribute('data-step');
            const data = PIPELINE_DATABASE[stepNum];
            if (!data) return;

            titleEl.textContent = data.title;
            descEl.textContent = data.scope;
            qualityEl.textContent = data.quality;

            listEl.innerHTML = '';
            data.deliverables.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                listEl.appendChild(li);
            });
        });
    });
}

/* ==========================================================================
   Industry Cockpit Interactive Tabs
   ========================================================================== */
const INDUSTRY_DATABASE = {
    'oilgas': {
        title: 'Oil & Gas Sector',
        challenges: 'Complex operations, stringent procurement audits, requirement for professional international credibility, technical service presentation, and safety compliance demonstration.',
        solution: 'High-credibility corporate websites, digital presentation of technical service capabilities, inquiry portals, administrative record management, and material tracking solutions.',
        reference: 'Work associated with Mekadyne Oil and Gas Limited, Beam Dynamic Solutions Limited. (Note: Technology solutions provider; physical oilfield contracting kept distinct).'
    },
    'engineering': {
        title: 'Engineering & Industrial Services',
        challenges: 'Tracking fabrication materials, communicating diverse civil/mechanical capabilities, disorganized job specifications, and reliance on manual paper bin cards.',
        solution: 'Automated inventory workflows (e.g. Bin Card tracking for beams, plates, purlins), digital company profiles, material tracking tools, and internal management dashboards.',
        reference: 'VATEX Engineering Services corporate profile work; Kwale GPP-2 & industrial project environment exposure.'
    },
    'government': {
        title: 'Government & Public-Sector Institutions',
        challenges: 'Rigorous procurement requirements, need for verified corporate CAC registration, high transparency, citizen access, and structured recordkeeping.',
        solution: 'Institutional web portals, automated digital application workflows, public document management, citizen inquiry channels, and staff technology training.',
        reference: 'CAC Reg. 9373701 (CAMA 2020), tax compliance readiness, tailored tender submission capabilities.'
    },
    'education': {
        title: 'Education & Academic Institutions',
        challenges: 'Fragmented student registration, manual matriculation number assignments, chaotic admission letter handling, and disconnected remote lecture schedules.',
        solution: 'Comprehensive Learning Management Systems (LMS), automated matriculation generation, Zoom lecture integration, exam registration, customisable forms, and ID-card generation.',
        reference: 'Mountain-Top Theological Seminary LMS Concept (Envisioned comprehensive university-operations platform).'
    },
    'fashion': {
        title: 'Fashion, Retail & E-Commerce',
        challenges: 'Managing inventory across multiple social channels, lost customer orders via WhatsApp, lack of automated receipts, and difficulty showcasing product variants.',
        solution: 'Filterable product catalogues, automated checkout and order notification pipelines, tutorial & masterclass platforms, and referral feature planning.',
        reference: 'Tabit Clothing & Accessories, IfyGold Collections associated business contexts.'
    },
    'hospitality': {
        title: 'Hospitality & Digital Services',
        challenges: 'Manual guest check-in bottlenecks, double booking hazards, lack of verified guest security workflows, and disconnected facility billing.',
        solution: 'Integrated hospitality management suites, room access governance, customer booking verification, and digital service portals.',
        reference: 'HotelShield™ proprietary technology initiative (tailored to hospitality operational specifications).'
    },
    'startups': {
        title: 'Technology Startups & Entrepreneurs',
        challenges: 'Navigating technical debt, prioritizing MVP feature backlogs, high development agency costs, and difficulty turning a raw idea into a working first release.',
        solution: 'Agile MVP planning and development, SaaS product architecture, user dashboards, automated Stripe/Paystack billing integration, and rapid market validation.',
        reference: 'Internal venture methodologies developed across GetiDone, ROSCA AI™, and Zonita TV.'
    }
};

function initIndustryCockpit() {
    const tabButtons = document.querySelectorAll('.industry-tab-btn');
    const titleEl = document.getElementById('indDisplayTitle');
    const challengesEl = document.getElementById('indChallengesText');
    const solutionEl = document.getElementById('indSolutionText');
    const refEl = document.getElementById('indRefText');

    if (!tabButtons.length || !titleEl) return;

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const indKey = btn.getAttribute('data-industry');
            const data = INDUSTRY_DATABASE[indKey];
            if (!data) return;

            titleEl.textContent = data.title;
            challengesEl.textContent = data.challenges;
            solutionEl.textContent = data.solution;
            refEl.textContent = data.reference;
        });
    });
}

/* ==========================================================================
   Proprietary Innovation Lab Venture Modals (Corrected to Zonita TV)
   ========================================================================== */
const VENTURE_DATABASE = {
    'zonita': {
        title: 'Zonita TV',
        category: 'Digital Media · Television-Platform Initiative',
        status: 'Concept & Functional Direction',
        summary: 'A digital television-platform initiative exploring a continuous, channel-based viewing experience using content originating from YouTube. Designed to mimic the familiarity of conventional television where viewers select a channel and encounter a continuous sequence of curated programmes rather than picking videos one by one.',
        features: [
            'Continuous stream playback engine with seamless programme transitions',
            'Curated thematic channel scheduling and TV-guide navigation',
            'Embedding compatibility and platform rights governance',
            'Distinguished channel identity and immersive lean-back viewing flow'
        ],
        statusNote: 'Official spelling confirmed as Zonita TV. Available project history establishes the concept and functional direction. Implementation stage (prototype/deployed product) is confirmed before any formal proposal.'
    },
    'getidone': {
        title: 'GetiDone',
        category: 'Proprietary Digital Venture · Productivity',
        status: 'Internal Venture',
        summary: 'GetiDone is a proprietary digital venture associated with BennieChat TechWealth Solutions and founder Wada Oluwapelumi Benedict. It addresses the friction of task execution, team accountability, and workflow milestone completion.',
        features: [
            'Milestone-driven task execution and progress verification',
            'Multi-user team accountability boards with automated reminders',
            'Document and deliverable attachment validation',
            'Cross-platform accessibility designed for remote-first workgroups'
        ],
        statusNote: 'Feature set, live status, and available demonstrations are maintained in corporate records and verified for partner collaboration.'
    },
    'rosca': {
        title: 'ROSCA AI™',
        category: 'Proprietary AI-Oriented Venture · FinTech',
        status: 'Internal Venture · AI Direction',
        summary: 'ROSCA AI™ is a proprietary technology initiative exploring machine intelligence applied to Rotating Savings and Credit Associations (ROSCAs). It investigates automated contribution monitoring, community trust scoring, and predictive financial pooling.',
        features: [
            'AI-assisted contribution scheduling and payout sequence optimization',
            'Anomaly detection and risk profiling for community saving circles',
            'Automated notification and receipt dispatch via mobile channels',
            'Algorithmic decision support for informal community banking'
        ],
        statusNote: 'Forms part of the company\'s AI-oriented product development direction, demonstrating capability beyond conventional client websites.'
    },
    'hotelshield': {
        title: 'HotelShield™',
        category: 'Proprietary Technology Initiative · Hospitality',
        status: 'Internal Venture · Hospitality',
        summary: 'HotelShield™ is a substantial product initiative exploring security, access governance, and digital operational efficiency within hospitality and accommodation establishments.',
        features: [
            'Front-desk check-in verification and digital guest registry',
            'Room status synchronisation and housekeeping dispatch',
            'Security incident reporting and visitor access validation',
            'Centralized management dashboard for multi-facility operations'
        ],
        statusNote: 'Hospitality-specific functionality is based on actual specifications rather than assumptions about generic hotel software.'
    },
    'seminary': {
        title: 'Mountain-Top Theological Seminary LMS',
        category: 'Proposed System · Education',
        status: 'Proposed System Concept',
        summary: 'Planning work on a proposed WordPress-based Learning Management System (LMS) and comprehensive university operations solution designed for higher educational and theological institutions.',
        features: [
            'Student, lecturer, and administrative tier dashboards',
            'Automatic matriculation-number generation and admission-letter automation',
            'Progress tracking and online lecture integration via Zoom APIs',
            'Exam registration, ID-card generation, and student reward system'
        ],
        statusNote: 'Documented proposed system concept; clearly distinguished from an executed or delivered client engagement.'
    },
    'football': {
        title: 'AI Football Match Prediction Engine',
        category: 'Concept · AI & Sports Analytics',
        status: 'Concept & Analytics Model',
        summary: 'An AI web-application concept analysing football matches from historical performance, form metrics, and statistical probability across 5 to 10 previous match sequences.',
        features: [
            'Probability distribution across match outcomes, Double Chance, and BTTS',
            'Over/Under goal markets and team scoring form calibration',
            '80% confidence-threshold display as a design objective',
            'Out-of-sample historical validation testing framework'
        ],
        statusNote: 'The 80% confidence threshold is a design objective, not evidence of historical achieved accuracy.'
    }
};

function initVentureModals() {
    const triggers = document.querySelectorAll('.venture-modal-trigger');
    const modal = document.getElementById('ventureModal');
    const titleEl = document.getElementById('modalVentureTitle');
    const categoryEl = document.getElementById('modalVentureCategory');
    const badgeEl = document.getElementById('modalVentureBadge');
    const summaryEl = document.getElementById('modalVentureSummary');
    const featuresListEl = document.getElementById('modalVentureFeatures');
    const statusNoteEl = document.getElementById('modalVentureStatusNote');

    if (!triggers.length || !modal) return;

    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const ventureKey = btn.getAttribute('data-venture');
            const data = VENTURE_DATABASE[ventureKey];
            if (!data) return;

            titleEl.textContent = data.title;
            categoryEl.textContent = data.category;
            badgeEl.textContent = data.status;
            summaryEl.textContent = data.summary;
            statusNoteEl.textContent = data.statusNote;

            featuresListEl.innerHTML = '';
            data.features.forEach(feat => {
                const li = document.createElement('li');
                li.textContent = feat;
                featuresListEl.appendChild(li);
            });

            modal.classList.add('active');
        });
    });
}

/* ==========================================================================
   Founder Portrait Carousel in Leadership Profile
   ========================================================================== */
function initFounderCarousel() {
    const track = document.getElementById('founderCarouselTrack');
    const prevBtn = document.getElementById('founderPrevBtn');
    const nextBtn = document.getElementById('founderNextBtn');
    const dots = document.querySelectorAll('.carousel-dot');
    const slides = document.querySelectorAll('.carousel-slide');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, i) => {
            if (i === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoplay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoplay();
        });
    }

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetAutoplay();
        });
    });

    function startAutoplay() {
        autoPlayTimer = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 5000);
    }

    function resetAutoplay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        startAutoplay();
    }

    // Pause on hover
    const carouselContainer = document.querySelector('.founder-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        });
        carouselContainer.addEventListener('mouseleave', () => {
            startAutoplay();
        });

        // Touch swipe support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            if (autoPlayTimer) clearInterval(autoPlayTimer);
        }, { passive: true });

        carouselContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diffX = touchStartX - touchEndX;
            if (Math.abs(diffX) > 40) {
                if (diffX > 0) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(currentIndex - 1);
                }
            }
            startAutoplay();
        }, { passive: true });
    }

    startAutoplay();
}

/* ==========================================================================
   CAC Certificate Modal
   ========================================================================== */
function initCacModal() {
    const triggers = document.querySelectorAll('.open-cac-modal');
    const modal = document.getElementById('cacModal');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            if (modal) modal.classList.add('active');
        });
    });

    // Close buttons for all modals
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        });
    });

    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // ESC key close
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
        }
    });
}

/* ==========================================================================
   Interactive Project Scoping & Quote Estimator (RFP Engine)
   ========================================================================== */
function initProjectEstimator() {
    const serviceBtns = document.querySelectorAll('.est-service-btn');
    const industryBtns = document.querySelectorAll('.est-industry-btn');
    const timelineBtns = document.querySelectorAll('.est-timeline-btn');
    const descInput = document.getElementById('estimatorProjectDesc');
    const previewEl = document.getElementById('estimatorBriefOutput');
    const waBtn = document.getElementById('estimatorWhatsAppBtn');
    const emailBtn = document.getElementById('estimatorEmailBtn');

    let selectedService = 'Corporate Website & Digital Presence';
    let selectedIndustry = 'Energy, Oil & Gas';
    let selectedTimeline = 'Standard Delivery (4 - 6 Weeks)';

    function updateSelection(group, callback) {
        group.forEach(btn => {
            btn.addEventListener('click', () => {
                group.forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                callback(btn.getAttribute('data-value'));
                generateBrief();
            });
        });
    }

    updateSelection(serviceBtns, (val) => { selectedService = val; });
    updateSelection(industryBtns, (val) => { selectedIndustry = val; });
    updateSelection(timelineBtns, (val) => { selectedTimeline = val; });

    if (descInput) {
        descInput.addEventListener('input', generateBrief);
    }

    function generateBrief() {
        const customDesc = (descInput && descInput.value.trim()) 
            ? descInput.value.trim() 
            : 'Looking to establish robust digital presence and streamline business operations with verifiable economic outcomes.';

        const briefText = `PROJECT SCOPE & CAPABILITY INQUIRY
To: BennieChat TechWealth Solutions (CAC Reg: 9373701)
Operating Location: Ughelli North, Delta State, Nigeria

------------------------------
1. SERVICE REQUIRED: ${selectedService}
2. INDUSTRY CONTEXT: ${selectedIndustry}
3. TARGET TIMELINE:  ${selectedTimeline}
4. PROJECT SCOPE & OBJECTIVES:
"${customDesc}"

Delivery Model: Remote-First Technology Provider
Contact Email: benniechatsystems@gmail.com
Phone/WhatsApp: +234 810 181 1993
------------------------------
Please review and advise on initial scoping, milestone breakdown, and formal proposal.`;

        if (previewEl) {
            previewEl.textContent = briefText;
        }

        // WhatsApp direct link
        const encodedWa = encodeURIComponent(briefText);
        if (waBtn) {
            waBtn.href = `https://wa.me/2348101811993?text=${encodedWa}`;
        }

        // Email direct link
        const emailSubject = encodeURIComponent(`Project Scoping Inquiry - ${selectedService} (${selectedIndustry})`);
        const emailBody = encodeURIComponent(briefText);
        if (emailBtn) {
            emailBtn.href = `mailto:benniechatsystems@gmail.com?subject=${emailSubject}&body=${emailBody}`;
        }
    }

    generateBrief();
}

/* ==========================================================================
   Back To Top Button
   ========================================================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ==========================================================================
   Stitch Mobile Bottom App Tab Navigation
   ========================================================================== */
function initMobileBottomNav() {
    const tabs = document.querySelectorAll('.mobile-nav-tab');
    if (!tabs.length) return;

    const targetSections = [
        { id: 'hero', tabTarget: 'hero' },
        { id: 'capabilities', tabTarget: 'capabilities' },
        { id: 'portfolio', tabTarget: 'portfolio' },
        { id: 'procurement', tabTarget: 'procurement' }
    ];

    // Smooth scroll on tab click
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            const targetId = tab.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
            }
        });
    });

    // Update active tab on scroll
    let isTicking = false;
    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(() => {
                const scrollPos = window.scrollY + 200;
                let activeTarget = 'hero';

                targetSections.forEach(item => {
                    const el = document.getElementById(item.id);
                    if (el && el.offsetTop <= scrollPos) {
                        activeTarget = item.tabTarget;
                    }
                });

                tabs.forEach(tab => {
                    if (tab.getAttribute('data-target') === activeTarget) {
                        tab.classList.add('active');
                    } else {
                        tab.classList.remove('active');
                    }
                });
                isTicking = false;
            });
            isTicking = true;
        }
    }, { passive: true });
}
