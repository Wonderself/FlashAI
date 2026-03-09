/**
 * FlashAI v5.0 — MEGA ULTRA PREMIUM
 * Solar System, Interactive Demos, 3D Everything
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initScrollProgress();
    initCustomCursor();
    initScrollReveal();
    initHeader();
    initMobileMenu();
    initCounters();
    initMarquee();
    initServices();
    initHeroTerminal();
    initDemoCRM();
    initDemoDevis();
    initDemoChatbot();
    initDemoDashboard();
    initDemoTabs();
    initComparison();
    initExpertise();
    initMethodTimeline();
    initPortfolio();
    initTestimonials();
    initSolarSystem();
    initToolsMobile();
    initToolsCategories();
    initPricing();
    initROICalculator();
    initFAQ();
    initCTACanvas();
    initCTATimer();
    initContactForm();
    initMagneticBtn();
    initScrollTop();
    initSmoothAnchors();
    initThreeBackground();
    initEasterEggs();
});

/* ========== HELPERS ========== */
function showToast(msg) {
    const c = document.getElementById('toast-container');
    if (!c) return;
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), 3000);
}

/* ========== LOADER ========== */
function initLoader() {
    const loader = document.getElementById('page-loader');
    const boot = document.getElementById('loader-boot');
    const bar = document.getElementById('loader-bar');
    const pct = document.getElementById('loader-percent');
    if (!loader) return;
    document.body.style.overflow = 'hidden';

    const lines = [
        '[INIT] Loading neural network...',
        '[OK] 247 tools connected',
        '[OK] AI Core ready',
        '[OK] Three.js renderer initialized',
        '[OK] Solar system mapped',
        '[LAUNCH] FlashAI v5.0'
    ];

    let progress = 0;
    let lineIdx = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = Math.floor(progress) + '%';

        if (lineIdx < lines.length && progress > (lineIdx + 1) * (100 / lines.length)) {
            if (boot) {
                const span = document.createElement('div');
                span.textContent = lines[lineIdx];
                span.style.opacity = '0';
                span.style.transform = 'translateX(-10px)';
                span.style.transition = 'all 0.3s ease';
                boot.appendChild(span);
                requestAnimationFrame(() => { span.style.opacity = '1'; span.style.transform = 'translateX(0)'; });
            }
            lineIdx++;
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 600);
        }
    }, 200);

    setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 5000);
}

/* ========== SCROLL PROGRESS ========== */
function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (window.scrollY / h * 100) + '%';
    }, { passive: true });
}

/* ========== CUSTOM CURSOR ========== */
function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    (function loop() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        dot.style.left = mx + 'px';
        dot.style.top = my + 'px';
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(loop);
    })();
    document.addEventListener('mouseover', e => {
        const t = e.target.closest('a, button, [data-tilt], .bento-card, .crm-card, input, textarea, select');
        if (t) ring.classList.add('hover');
        else ring.classList.remove('hover');
    });
}

/* ========== SCROLL REVEAL ========== */
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

/* ========== HEADER ========== */
function initHeader() {
    const hdr = document.getElementById('main-header');
    if (!hdr) return;
    const navLinks = hdr.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        hdr.classList.toggle('scrolled', window.scrollY > 50);
        // Active section
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === current));
    }, { passive: true });
}

/* ========== MOBILE MENU ========== */
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('open');
        btn.classList.toggle('menu-open');
        document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.remove('open');
        btn.classList.remove('menu-open');
        document.body.style.overflow = '';
    }));
}

/* ========== COUNTERS ========== */
function initCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const card = e.target;
            const target = parseInt(card.dataset.count);
            const suffix = card.dataset.suffix || '';
            const numEl = card.querySelector('.stat-number');
            if (!numEl) return;
            let start = 0;
            const dur = 2000;
            const startTime = performance.now();
            function tick(now) {
                const p = Math.min((now - startTime) / dur, 1);
                const eased = 1 - Math.pow(1 - p, 4);
                const val = Math.round(eased * target);
                numEl.textContent = val.toLocaleString('fr') + suffix;
                if (p < 1) requestAnimationFrame(tick);
            }
            requestAnimationFrame(tick);
            obs.unobserve(card);
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.stat-card').forEach(c => obs.observe(c));
}

/* ========== MARQUEE ========== */
function initMarquee() {
    const tools1 = ['React','Vue.js','Next.js','Node.js','Python','TypeScript','PostgreSQL','MongoDB','Redis','Docker','AWS','Vercel','Stripe','OpenAI','TailwindCSS','GraphQL'];
    const tools2 = ['Firebase','Supabase','Prisma','tRPC','Cloudflare','Twilio','SendGrid','Zapier','Make','n8n','HubSpot','Slack','Discord','Figma','GitHub','VS Code'];
    const svgIcons = {
        'React': '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/><path d="M12 21.35c-1.1 0-2.13-.27-3.02-.73-.52.12-1.07.18-1.63.18-3.07 0-5.56-1.63-5.56-3.64 0-1.2.83-2.3 2.2-3.16-.08-.5-.12-1-.12-1.5s.04-1 .12-1.5C2.62 10.14 1.79 9.04 1.79 7.84c0-2.01 2.49-3.64 5.56-3.64.56 0 1.11.06 1.63.18C9.87 3.92 10.9 3.65 12 3.65s2.13.27 3.02.73c.52-.12 1.07-.18 1.63-.18 3.07 0 5.56 1.63 5.56 3.64 0 1.2-.83 2.3-2.2 3.16.08.5.12 1 .12 1.5s-.04 1-.12 1.5c1.37.86 2.2 1.96 2.2 3.16 0 2.01-2.49 3.64-5.56 3.64-.56 0-1.11-.06-1.63-.18-.89.46-1.92.73-3.02.73z" opacity=".2"/></svg>',
    };
    function buildRow(id, items) {
        const row = document.getElementById(id);
        if (!row) return;
        const html = items.map(t => `<span class="marquee-pill"><span>${t}</span></span>`).join('');
        row.innerHTML = html + html;
    }
    buildRow('marquee-row-1', tools1);
    buildRow('marquee-row-2', tools2);
}

/* ========== SERVICES ========== */
function initServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    const services = [
        { icon: '🌐', title: 'Sites Web', desc: 'Sites vitrines, landing pages, e-commerce. Design premium, SEO-ready, ultra-rapides.', color: '#00f0ff', anim: 'browser' },
        { icon: '📊', title: 'CRM & ERP', desc: 'Outils de gestion clients et business sur mesure. Tableaux de bord, pipelines, automatisations.', color: '#bf00ff', anim: 'dashboard' },
        { icon: '🤖', title: 'Chatbot IA', desc: 'Assistants virtuels intelligents qui convertissent. Intégration WhatsApp, site, Messenger.', color: '#ff006e', anim: 'chat' },
        { icon: '⚡', title: 'Automatisation', desc: 'Workflows automatisés entre vos outils. Zapier, Make, n8n, scripts custom.', color: '#ff8c00', anim: 'flow' },
        { icon: '🔍', title: 'SEO Technique', desc: 'Audit complet, optimisation on-page, Core Web Vitals. Résultats mesurables en 30 jours.', color: '#00ff87', anim: 'chart' },
        { icon: '🛡️', title: 'Sécurité', desc: 'SSL, WAF, audit de vulnérabilités, RGPD. Protection complète de vos assets digitaux.', color: '#ffd700', anim: 'shield' }
    ];

    grid.innerHTML = services.map((s, i) => `
        <div class="bento-card reveal" style="--card-glow: ${s.color}30; transition-delay: ${i * 0.1}s" data-tilt>
            <div class="bento-card-glow"></div>
            <div class="bento-icon" style="background: ${s.color}15; color: ${s.color}">${s.icon}</div>
            <h3 class="font-display font-bold text-lg mb-2">${s.title}</h3>
            <p class="text-surface-400 text-sm leading-relaxed">${s.desc}</p>
            <div class="bento-mini-anim" id="bento-anim-${s.anim}"></div>
        </div>
    `).join('');

    // Tilt effect
    grid.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
            card.querySelector('.bento-card-glow').style.setProperty('--mouse-x', (e.clientX - r.left) + 'px');
            card.querySelector('.bento-card-glow').style.setProperty('--mouse-y', (e.clientY - r.top) + 'px');
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });

    // Mini animations inside bento cards
    initBentoAnims();
}

function initBentoAnims() {
    // Browser building animation
    const browser = document.getElementById('bento-anim-browser');
    if (browser) {
        browser.innerHTML = '<div style="padding:8px"><div style="height:8px;background:rgba(0,240,255,0.3);border-radius:4px;margin-bottom:6px;width:60%;animation:bento-grow 2s ease infinite"></div><div style="height:40px;background:rgba(0,240,255,0.1);border-radius:4px;margin-bottom:6px;animation:bento-grow 2s ease infinite 0.3s"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px"><div style="height:30px;background:rgba(0,240,255,0.08);border-radius:4px;animation:bento-grow 2s ease infinite 0.6s"></div><div style="height:30px;background:rgba(0,240,255,0.08);border-radius:4px;animation:bento-grow 2s ease infinite 0.9s"></div></div></div>';
    }
    const dashboard = document.getElementById('bento-anim-dashboard');
    if (dashboard) {
        dashboard.innerHTML = '<div style="padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:4px"><div style="height:20px;background:rgba(191,0,255,0.15);border-radius:4px"></div><div style="height:20px;background:rgba(191,0,255,0.1);border-radius:4px"></div><div style="grid-column:span 2;height:50px;background:linear-gradient(90deg,rgba(191,0,255,0.2),rgba(191,0,255,0.05));border-radius:4px;position:relative;overflow:hidden"><div style="position:absolute;bottom:0;left:0;right:0;height:70%;background:rgba(191,0,255,0.15);border-radius:4px;animation:bento-pulse 2s ease infinite"></div></div></div>';
    }
    const chat = document.getElementById('bento-anim-chat');
    if (chat) {
        chat.innerHTML = '<div style="padding:8px;space-y:4px"><div style="display:flex;margin-bottom:6px"><div style="height:12px;background:rgba(255,0,110,0.15);border-radius:8px;padding:4px 8px;max-width:70%;width:60%;animation:bento-grow 3s ease infinite"></div></div><div style="display:flex;justify-content:flex-end;margin-bottom:6px"><div style="height:12px;background:rgba(255,0,110,0.25);border-radius:8px;padding:4px 8px;max-width:60%;width:50%;animation:bento-grow 3s ease infinite 0.5s"></div></div><div style="display:flex"><div style="height:12px;background:rgba(255,0,110,0.1);border-radius:8px;padding:4px 8px;max-width:75%;width:70%;animation:bento-grow 3s ease infinite 1s"></div></div></div>';
    }
    const flow = document.getElementById('bento-anim-flow');
    if (flow) {
        flow.innerHTML = '<div style="padding:12px;display:flex;align-items:center;justify-content:center;gap:8px;height:100%"><div style="width:20px;height:20px;border-radius:50%;background:rgba(255,140,0,0.3);animation:bento-pulse 1.5s ease infinite"></div><div style="width:20px;height:2px;background:rgba(255,140,0,0.3)"></div><div style="width:20px;height:20px;border-radius:50%;background:rgba(255,140,0,0.3);animation:bento-pulse 1.5s ease infinite 0.3s"></div><div style="width:20px;height:2px;background:rgba(255,140,0,0.3)"></div><div style="width:20px;height:20px;border-radius:50%;background:rgba(255,140,0,0.3);animation:bento-pulse 1.5s ease infinite 0.6s"></div></div>';
    }
    const chart = document.getElementById('bento-anim-chart');
    if (chart) {
        chart.innerHTML = '<svg viewBox="0 0 200 80" style="width:100%;height:100%;padding:8px"><polyline points="10,70 40,50 70,55 100,30 130,35 160,15 190,20" fill="none" stroke="rgba(0,255,135,0.5)" stroke-width="2" stroke-dasharray="300" stroke-dashoffset="300" style="animation:bento-draw 3s ease infinite"><animate attributeName="stroke-dashoffset" from="300" to="0" dur="2s" repeatCount="indefinite"/></polyline></svg>';
    }
    const shield = document.getElementById('bento-anim-shield');
    if (shield) {
        shield.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%"><div style="width:40px;height:50px;border:2px solid rgba(255,215,0,0.3);border-radius:0 0 20px 20px;position:relative;animation:bento-pulse 2s ease infinite"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;background:rgba(255,215,0,0.4);border-radius:50%"></div></div></div>';
    }

    // Add keyframes
    if (!document.getElementById('bento-keyframes')) {
        const style = document.createElement('style');
        style.id = 'bento-keyframes';
        style.textContent = `
            @keyframes bento-grow { 0%,100% { opacity:0.5; transform:scaleX(0.8); } 50% { opacity:1; transform:scaleX(1); } }
            @keyframes bento-pulse { 0%,100% { opacity:0.4; transform:scale(0.9); } 50% { opacity:1; transform:scale(1.1); } }
            @keyframes bento-draw { 0% { stroke-dashoffset:300; } 50% { stroke-dashoffset:0; } 100% { stroke-dashoffset:0; } }
        `;
        document.head.appendChild(style);
    }
}

/* ========== HERO TERMINAL ========== */
function initHeroTerminal() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const sequences = [
        { cmd: '$ flashai create --type website --name "MonSite"', lines: [
            { t: '<span class="t-blue">→</span> Initialisation du projet...', d: 400 },
            { t: '<span class="t-green">✓</span> Template premium chargé', d: 300 },
            { t: '<span class="t-green">✓</span> Design responsive configuré', d: 300 },
            { t: '<span class="t-green">✓</span> SEO optimisé (meta, sitemap, schema)', d: 300 },
            { t: '<span class="t-yellow">⚡</span> Build en cours... <span class="t-gray">[████████████] 100%</span>', d: 500 },
            { t: '<span class="t-green t-bold">✨ Site déployé → monsite.flashai.dev</span>', d: 400 }
        ]},
        { cmd: '$ flashai add crm --pipeline --contacts --analytics', lines: [
            { t: '<span class="t-blue">→</span> Ajout du module CRM...', d: 400 },
            { t: '<span class="t-green">✓</span> Pipeline de vente configuré (5 étapes)', d: 300 },
            { t: '<span class="t-green">✓</span> Base contacts initialisée', d: 250 },
            { t: '<span class="t-green">✓</span> Dashboard analytics connecté', d: 300 },
            { t: '<span class="t-green">✓</span> Notifications temps réel activées', d: 250 },
            { t: '<span class="t-green t-bold">🎯 CRM opérationnel</span>', d: 400 }
        ]},
        { cmd: '$ flashai add chatbot --ai gpt-4 --channels web,whatsapp', lines: [
            { t: '<span class="t-blue">→</span> Configuration du chatbot IA...', d: 400 },
            { t: '<span class="t-green">✓</span> GPT-4 connecté avec contexte métier', d: 350 },
            { t: '<span class="t-green">✓</span> Canal web intégré', d: 250 },
            { t: '<span class="t-green">✓</span> Canal WhatsApp Business activé', d: 300 },
            { t: '<span class="t-green">✓</span> Formation sur vos données... <span class="t-gray">[████████████] 100%</span>', d: 500 },
            { t: '<span class="t-green t-bold">🤖 Chatbot en ligne — 24/7</span>', d: 400 }
        ]},
        { cmd: '$ flashai generate devis --client "Acme Corp" --auto', lines: [
            { t: '<span class="t-blue">→</span> Analyse des besoins...', d: 400 },
            { t: '<span class="t-green">✓</span> 3 services identifiés', d: 300 },
            { t: '<span class="t-green">✓</span> Calcul du tarif optimal', d: 300 },
            { t: '<span class="t-yellow">💰</span> Devis généré : <span class="t-green t-bold">2 490 €</span>', d: 400 },
            { t: '<span class="t-green">✓</span> PDF envoyé au client', d: 300 },
            { t: '<span class="t-green t-bold">📋 Devis #2024-087 créé</span>', d: 400 }
        ]},
        { cmd: '$ flashai deploy --env production --region eu-west', lines: [
            { t: '<span class="t-blue">→</span> Déploiement en production...', d: 400 },
            { t: '<span class="t-green">✓</span> Tests automatisés : <span class="t-green">47/47 passed</span>', d: 350 },
            { t: '<span class="t-green">✓</span> Build optimisé (98/100 Lighthouse)', d: 300 },
            { t: '<span class="t-green">✓</span> CDN configuré (23 edge locations)', d: 300 },
            { t: '<span class="t-green">✓</span> SSL/TLS activé', d: 250 },
            { t: '<span class="t-green">✓</span> Monitoring 24/7 en place', d: 300 },
            { t: '<span class="t-green t-bold">🚀 En production — Temps de réponse : 47ms</span>', d: 400 }
        ]},
        { cmd: '$ flashai analytics --report weekly', lines: [
            { t: '<span class="t-blue">→</span> Génération du rapport...', d: 400 },
            { t: '<span class="t-yellow">📊</span> Visiteurs : <span class="t-green">+247%</span> vs semaine dernière', d: 300 },
            { t: '<span class="t-yellow">📊</span> Conversions : <span class="t-green">+180%</span>', d: 300 },
            { t: '<span class="t-yellow">📊</span> Temps moyen : <span class="t-green">4min 32s</span>', d: 300 },
            { t: '<span class="t-yellow">📊</span> Satisfaction client : <span class="t-green">100%</span>', d: 300 },
            { t: '<span class="t-green t-bold">✅ Rapport envoyé par email</span>', d: 400 }
        ]}
    ];

    let seqIdx = 0;

    async function runSequence() {
        const seq = sequences[seqIdx % sequences.length];
        // Type command
        const cmdLine = document.createElement('div');
        cmdLine.className = 't-green';
        output.appendChild(cmdLine);
        for (let i = 0; i < seq.cmd.length; i++) {
            cmdLine.textContent += seq.cmd[i];
            await new Promise(r => setTimeout(r, 25));
        }
        output.scrollTop = output.scrollHeight;

        // Show output lines
        for (const line of seq.lines) {
            await new Promise(r => setTimeout(r, line.d));
            const div = document.createElement('div');
            div.innerHTML = line.t;
            div.style.opacity = '0';
            div.style.transform = 'translateX(-5px)';
            div.style.transition = 'all 0.2s ease';
            output.appendChild(div);
            requestAnimationFrame(() => { div.style.opacity = '1'; div.style.transform = 'translateX(0)'; });
            output.scrollTop = output.scrollHeight;
        }

        await new Promise(r => setTimeout(r, 2000));

        // Add separator
        const sep = document.createElement('div');
        sep.innerHTML = '<br>';
        output.appendChild(sep);

        seqIdx++;
        // Keep only last 30 lines
        while (output.children.length > 30) output.removeChild(output.firstChild);
        runSequence();
    }

    setTimeout(runSequence, 2500);
}

/* ========== DEMO TABS ========== */
function initDemoTabs() {
    const tabs = document.querySelectorAll('.demo-tab');
    const panels = document.querySelectorAll('.demo-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById('demo-' + tab.dataset.demo);
            if (panel) panel.classList.add('active');
        });
    });
}

/* ========== DEMO CRM ========== */
function initDemoCRM() {
    const container = document.getElementById('demo-crm');
    if (!container) return;

    const contacts = [
        { name: 'Marie Dupont', email: 'marie@acme.fr', value: '4 200 €', status: 'prospect', avatar: 'MD' },
        { name: 'Jean Martin', email: 'jean@startup.io', value: '8 500 €', status: 'prospect', avatar: 'JM' },
        { name: 'Sophie Bernard', email: 'sophie@tech.com', value: '12 000 €', status: 'encours', avatar: 'SB' },
        { name: 'Lucas Petit', email: 'lucas@digital.fr', value: '3 800 €', status: 'encours', avatar: 'LP' },
        { name: 'Emma Leroy', email: 'emma@design.co', value: '6 500 €', status: 'client', avatar: 'EL' },
        { name: 'Thomas Moreau', email: 'thomas@web.fr', value: '15 000 €', status: 'client', avatar: 'TM' },
    ];

    const columns = { prospect: 'Prospects', encours: 'En cours', client: 'Clients' };

    function render(filter = '') {
        const filtered = contacts.filter(c =>
            c.name.toLowerCase().includes(filter) || c.email.toLowerCase().includes(filter)
        );

        container.innerHTML = `
            <div class="crm-header">
                <h3 class="font-display font-bold text-lg">Mini CRM</h3>
                <input type="text" class="crm-search" placeholder="Rechercher un contact..." id="crm-search-input" value="${filter}">
            </div>
            <div class="crm-columns">
                ${Object.entries(columns).map(([key, label]) => {
                    const items = filtered.filter(c => c.status === key);
                    return `<div class="crm-column" data-col="${key}">
                        <div class="crm-col-header">
                            <span style="color:${key === 'prospect' ? '#ff8c00' : key === 'encours' ? '#00f0ff' : '#00ff87'}">${label}</span>
                            <span class="crm-col-count">${items.length}</span>
                        </div>
                        ${items.map(c => `
                            <div class="crm-card" draggable="true" data-name="${c.name}">
                                <div class="crm-card-name">${c.name}</div>
                                <div class="crm-card-email">${c.email}</div>
                                <div class="crm-card-value">${c.value}</div>
                                <div class="crm-card-actions">
                                    <button class="crm-action-btn" onclick="showToast('Appel vers ${c.name}...')">📞 Appeler</button>
                                    <button class="crm-action-btn" onclick="showToast('Email envoyé à ${c.email}')">✉️ Email</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>`;
                }).join('')}
            </div>
        `;

        // Search
        const searchInput = document.getElementById('crm-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', e => render(e.target.value.toLowerCase()));
            searchInput.focus();
        }

        // Drag & Drop
        container.querySelectorAll('.crm-card').forEach(card => {
            card.addEventListener('dragstart', e => {
                e.dataTransfer.setData('text/plain', card.dataset.name);
                card.classList.add('dragging');
            });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });
        container.querySelectorAll('.crm-column').forEach(col => {
            col.addEventListener('dragover', e => e.preventDefault());
            col.addEventListener('drop', e => {
                e.preventDefault();
                const name = e.dataTransfer.getData('text/plain');
                const contact = contacts.find(c => c.name === name);
                if (contact) {
                    contact.status = col.dataset.col;
                    render(filter);
                    showToast(`${name} déplacé vers ${columns[col.dataset.col]}`);
                }
            });
        });
    }

    render();
}

/* ========== DEMO DEVIS ========== */
function initDemoDevis() {
    const container = document.getElementById('demo-devis');
    if (!container) return;

    const state = { step: 1, type: null, features: [], total: 0 };

    const types = [
        { id: 'vitrine', name: 'Site Vitrine', icon: '🌐', price: 990 },
        { id: 'ecommerce', name: 'E-Commerce', icon: '🛒', price: 2490 },
        { id: 'crm', name: 'CRM / ERP', icon: '📊', price: 1990 },
        { id: 'chatbot', name: 'Chatbot IA', icon: '🤖', price: 1490 },
        { id: 'dashboard', name: 'Dashboard', icon: '📈', price: 1790 },
        { id: 'auto', name: 'Automatisation', icon: '⚡', price: 890 },
    ];

    const features = [
        { name: 'Design premium', price: 490 },
        { name: 'SEO avancé', price: 390 },
        { name: 'Multilingue', price: 290 },
        { name: 'Analytics', price: 190 },
        { name: 'Chatbot intégré', price: 590 },
        { name: 'API custom', price: 490 },
        { name: 'Paiement en ligne', price: 390 },
        { name: 'CRM intégré', price: 690 },
        { name: 'Automatisations', price: 490 },
        { name: 'Support prioritaire', price: 290 },
    ];

    function calcTotal() {
        const base = state.type ? types.find(t => t.id === state.type)?.price || 0 : 0;
        const feat = state.features.reduce((sum, f) => sum + (features.find(x => x.name === f)?.price || 0), 0);
        state.total = base + feat;
    }

    function render() {
        calcTotal();
        const stepsHtml = [1,2,3,4].map(s => `
            <div class="devis-step ${s === state.step ? 'active' : ''} ${s < state.step ? 'completed' : ''}">
                <span class="devis-step-num">${s < state.step ? '✓' : s}</span>
                <span>${['Projet','Options','Style','Résumé'][s-1]}</span>
            </div>
        `).join('');

        let bodyHtml = '';
        if (state.step === 1) {
            bodyHtml = `<div class="devis-options">${types.map(t => `
                <div class="devis-option ${state.type === t.id ? 'selected' : ''}" data-type="${t.id}">
                    <div class="devis-option-icon">${t.icon}</div>
                    <div class="devis-option-name">${t.name}</div>
                    <div class="devis-option-price">À partir de ${t.price} €</div>
                </div>
            `).join('')}</div>`;
        } else if (state.step === 2) {
            bodyHtml = `<div class="devis-features">${features.map(f => `
                <div class="devis-feature ${state.features.includes(f.name) ? 'checked' : ''}" data-feat="${f.name}">
                    <div class="devis-feature-check">${state.features.includes(f.name) ? '✓' : ''}</div>
                    <span>${f.name}</span>
                    <span style="margin-left:auto;color:#00ff87;font-size:0.75rem">+${f.price}€</span>
                </div>
            `).join('')}</div>`;
        } else if (state.step === 3) {
            bodyHtml = `<div class="devis-options">
                ${['Minimaliste','Moderne','Audacieux','Classique'].map((s,i) => `
                    <div class="devis-option" style="border-color:${['#00f0ff','#bf00ff','#ff006e','#ffd700'][i]}30">
                        <div class="devis-option-icon">${['🎨','💎','🔥','✨'][i]}</div>
                        <div class="devis-option-name">${s}</div>
                    </div>
                `).join('')}
            </div>`;
        } else {
            const typeName = types.find(t => t.id === state.type)?.name || 'Non défini';
            bodyHtml = `
                <div style="text-align:center">
                    <div style="font-size:0.85rem;color:#94a3b8;margin-bottom:1rem">Récapitulatif du devis</div>
                    <div style="font-size:1rem;margin-bottom:0.5rem"><strong>Projet :</strong> ${typeName}</div>
                    <div style="font-size:0.85rem;color:#94a3b8;margin-bottom:1rem">${state.features.length} option${state.features.length > 1 ? 's' : ''} sélectionnée${state.features.length > 1 ? 's' : ''}</div>
                    <div class="devis-total">
                        <div class="devis-total-label">Prix total estimé</div>
                        <div class="devis-total-price">${state.total.toLocaleString('fr')} €</div>
                    </div>
                    <div style="margin-top:1rem;display:flex;gap:0.5rem;justify-content:center;flex-wrap:wrap">
                        <button class="btn-glow" onclick="showToast('📋 Devis téléchargé !')"><span>Télécharger le devis</span></button>
                        <button class="btn-outline" onclick="showToast('📧 Devis envoyé par email !')"><span>Envoyer par email</span></button>
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="devis-steps">${stepsHtml}</div>
            <div class="devis-body">${bodyHtml}</div>
            <div class="devis-total" style="margin-top:1rem">
                <div class="devis-total-label">Estimation en cours</div>
                <div class="devis-total-price">${state.total.toLocaleString('fr')} €</div>
            </div>
            <div class="devis-nav-btns">
                ${state.step > 1 ? '<button class="btn-outline" id="devis-prev"><span>← Retour</span></button>' : ''}
                ${state.step < 4 ? '<button class="btn-glow" id="devis-next"><span>Suivant →</span></button>' : ''}
            </div>
        `;

        // Events
        container.querySelectorAll('.devis-option[data-type]').forEach(opt => {
            opt.addEventListener('click', () => { state.type = opt.dataset.type; render(); });
        });
        container.querySelectorAll('.devis-feature').forEach(feat => {
            feat.addEventListener('click', () => {
                const name = feat.dataset.feat;
                if (state.features.includes(name)) state.features = state.features.filter(f => f !== name);
                else state.features.push(name);
                render();
            });
        });
        const prev = container.querySelector('#devis-prev');
        const next = container.querySelector('#devis-next');
        if (prev) prev.addEventListener('click', () => { state.step--; render(); });
        if (next) next.addEventListener('click', () => { state.step++; render(); });
    }

    render();
}

/* ========== DEMO CHATBOT ========== */
function initDemoChatbot() {
    const container = document.getElementById('demo-chatbot');
    if (!container) return;

    const botResponses = {
        'prix': 'Nos tarifs commencent à 890€ pour une automatisation simple, et à 990€ pour un site vitrine. Chaque projet est sur mesure, donc le prix dépend de vos besoins spécifiques. Voulez-vous un devis gratuit ?',
        'delai': 'En moyenne, nous livrons en 5 jours ouvrés. Les projets plus complexes (CRM, e-commerce) prennent entre 7 et 14 jours. On travaille vite, mais bien !',
        'services': 'Nous proposons : sites web, CRM/ERP, chatbots IA, dashboards, automatisations, SEO technique et sécurité web. Tout est construit sur mesure, jamais de templates !',
        'contact': 'Vous pouvez nous contacter à contact@flashai.dev ou remplir le formulaire en bas de page. On répond en moins de 2 heures !',
        'technologie': 'Nous utilisons les technologies les plus modernes : React, Next.js, Node.js, Python, PostgreSQL, et plus de 200 APIs connectées (Stripe, OpenAI, AWS, etc.).',
        'garantie': 'Oui ! Nous offrons une garantie satisfait ou remboursé à 100%. Si le résultat ne vous convient pas, on vous rembourse intégralement.',
        'israel': 'FlashAI est née au cœur de la Startup Nation, à Tel Aviv. L\'écosystème tech israélien est le plus dynamique au monde, et nous en profitons pour vous offrir le meilleur de l\'innovation.',
        'default': 'Merci pour votre message ! Je suis l\'assistant FlashAI. Je peux vous renseigner sur nos services, tarifs, délais ou technologies. Que souhaitez-vous savoir ?'
    };

    const suggestions = ['Quels sont vos prix ?', 'Quel est le délai ?', 'Quels services ?', 'Garantie ?', 'Technologies ?'];

    let messages = [
        { from: 'bot', text: 'Bonjour ! 👋 Je suis l\'assistant FlashAI. Comment puis-je vous aider aujourd\'hui ?' }
    ];

    function getResponse(text) {
        const lower = text.toLowerCase();
        for (const [key, resp] of Object.entries(botResponses)) {
            if (key !== 'default' && lower.includes(key)) return resp;
        }
        if (lower.includes('bonjour') || lower.includes('salut') || lower.includes('hello'))
            return 'Bonjour ! Ravi de vous accueillir. Comment puis-je vous aider ? 😊';
        if (lower.includes('merci'))
            return 'Avec plaisir ! N\'hésitez pas si vous avez d\'autres questions. 🙏';
        return botResponses.default;
    }

    function render() {
        container.innerHTML = `
            <div class="chatbot-container">
                <div class="chatbot-messages" id="chat-messages">
                    ${messages.map(m => `
                        <div class="chat-msg ${m.from}">
                            <div class="chat-avatar">${m.from === 'bot' ? '🤖' : '👤'}</div>
                            <div class="chat-bubble">${m.text}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="chat-suggestions" id="chat-suggestions">
                    ${suggestions.map(s => `<button class="chat-suggestion">${s}</button>`).join('')}
                </div>
                <div class="chat-input-wrap">
                    <input type="text" class="chat-input" id="chat-input" placeholder="Tapez votre message...">
                    <button class="chat-send" id="chat-send">Envoyer</button>
                </div>
            </div>
        `;

        const msgContainer = document.getElementById('chat-messages');
        if (msgContainer) msgContainer.scrollTop = msgContainer.scrollHeight;

        // Events
        const input = document.getElementById('chat-input');
        const send = document.getElementById('chat-send');

        function sendMessage(text) {
            if (!text.trim()) return;
            messages.push({ from: 'user', text });
            render();

            // Show typing
            setTimeout(() => {
                const msgEl = document.getElementById('chat-messages');
                if (msgEl) {
                    const typing = document.createElement('div');
                    typing.className = 'chat-msg bot';
                    typing.id = 'chat-typing';
                    typing.innerHTML = '<div class="chat-avatar">🤖</div><div class="chat-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>';
                    msgEl.appendChild(typing);
                    msgEl.scrollTop = msgEl.scrollHeight;
                }

                setTimeout(() => {
                    const typingEl = document.getElementById('chat-typing');
                    if (typingEl) typingEl.remove();
                    messages.push({ from: 'bot', text: getResponse(text) });
                    render();
                }, 1200);
            }, 400);
        }

        if (send) send.addEventListener('click', () => { sendMessage(input?.value || ''); });
        if (input) input.addEventListener('keydown', e => { if (e.key === 'Enter') sendMessage(input.value); });
        document.querySelectorAll('.chat-suggestion').forEach(btn => {
            btn.addEventListener('click', () => sendMessage(btn.textContent));
        });
    }

    render();
}

/* ========== DEMO DASHBOARD ========== */
function initDemoDashboard() {
    const container = document.getElementById('demo-dashboard');
    if (!container) return;

    const periods = { '7j': 7, '30j': 30, '90j': 90 };
    let activePeriod = '30j';

    function genData(n) { return Array.from({ length: n }, () => Math.floor(Math.random() * 800 + 200)); }

    function drawLineChart(canvas, data, color) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.offsetWidth * 2;
        const h = canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        ctx.clearRect(0, 0, cw, ch);

        const max = Math.max(...data) * 1.1;
        const step = cw / (data.length - 1);

        // Gradient fill
        const grad = ctx.createLinearGradient(0, 0, 0, ch);
        grad.addColorStop(0, color + '30');
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(0, ch);
        data.forEach((v, i) => {
            const x = i * step;
            const y = ch - (v / max * ch * 0.85) - 10;
            if (i === 0) ctx.lineTo(x, y);
            else {
                const px = (i - 1) * step;
                const py = ch - (data[i-1] / max * ch * 0.85) - 10;
                const cx1 = px + step * 0.4;
                const cx2 = x - step * 0.4;
                ctx.bezierCurveTo(cx1, py, cx2, y, x, y);
            }
        });
        ctx.lineTo(cw, ch);
        ctx.fillStyle = grad;
        ctx.fill();

        // Line
        ctx.beginPath();
        data.forEach((v, i) => {
            const x = i * step;
            const y = ch - (v / max * ch * 0.85) - 10;
            if (i === 0) ctx.moveTo(x, y);
            else {
                const px = (i - 1) * step;
                const py = ch - (data[i-1] / max * ch * 0.85) - 10;
                ctx.bezierCurveTo(px + step * 0.4, py, x - step * 0.4, y, x, y);
            }
        });
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    function drawBarChart(canvas, data, colors) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.offsetWidth * 2;
        const h = canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        ctx.clearRect(0, 0, cw, ch);
        const max = Math.max(...data.map(d => d.value)) * 1.2;
        const barW = cw / data.length * 0.6;
        const gap = cw / data.length;
        data.forEach((d, i) => {
            const x = i * gap + (gap - barW) / 2;
            const barH = (d.value / max) * (ch - 30);
            const y = ch - barH - 15;
            ctx.fillStyle = colors[i % colors.length];
            ctx.beginPath();
            ctx.roundRect(x, y, barW, barH, 4);
            ctx.fill();
            ctx.fillStyle = '#64748b';
            ctx.font = '9px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(d.label, x + barW / 2, ch - 2);
        });
    }

    function drawDonut(canvas, data, colors) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width = canvas.offsetWidth * 2;
        const h = canvas.height = canvas.offsetHeight * 2;
        ctx.scale(2, 2);
        const cw = canvas.offsetWidth;
        const ch = canvas.offsetHeight;
        const cx = cw / 2;
        const cy = ch / 2;
        const r = Math.min(cx, cy) - 10;
        const total = data.reduce((s, d) => s + d.value, 0);
        let angle = -Math.PI / 2;
        data.forEach((d, i) => {
            const slice = (d.value / total) * Math.PI * 2;
            ctx.beginPath();
            ctx.arc(cx, cy, r, angle, angle + slice);
            ctx.arc(cx, cy, r * 0.6, angle + slice, angle, true);
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            angle += slice;
        });
    }

    function render() {
        const n = periods[activePeriod];
        const kpis = [
            { label: 'Visiteurs', value: (Math.random() * 5000 + 1000).toFixed(0), change: '+' + (Math.random() * 30 + 5).toFixed(1) + '%', up: true, color: '#00f0ff' },
            { label: 'Conversions', value: (Math.random() * 200 + 50).toFixed(0), change: '+' + (Math.random() * 20 + 10).toFixed(1) + '%', up: true, color: '#00ff87' },
            { label: 'CA généré', value: (Math.random() * 50000 + 10000).toFixed(0) + '€', change: '+' + (Math.random() * 40 + 15).toFixed(1) + '%', up: true, color: '#bf00ff' },
            { label: 'Satisfaction', value: (Math.random() * 5 + 95).toFixed(1) + '%', change: '+' + (Math.random() * 3).toFixed(1) + '%', up: true, color: '#ffd700' },
        ];

        container.innerHTML = `
            <div class="dash-kpis">
                ${kpis.map(k => `
                    <div class="dash-kpi">
                        <div class="dash-kpi-label">${k.label}</div>
                        <div class="dash-kpi-value" style="color:${k.color}">${k.value}</div>
                        <div class="dash-kpi-change up">${k.change}</div>
                    </div>
                `).join('')}
            </div>
            <div class="dash-period-tabs">
                ${Object.keys(periods).map(p => `<button class="dash-period-tab ${p === activePeriod ? 'active' : ''}" data-period="${p}">${p}</button>`).join('')}
            </div>
            <div class="dash-charts">
                <div class="dash-chart-card">
                    <div class="dash-chart-title">Trafic</div>
                    <canvas id="dash-line-chart" style="width:100%;height:150px"></canvas>
                </div>
                <div>
                    <div class="dash-chart-card" style="margin-bottom:1rem">
                        <div class="dash-chart-title">Sources</div>
                        <canvas id="dash-bar-chart" style="width:100%;height:100px"></canvas>
                    </div>
                    <div class="dash-chart-card">
                        <div class="dash-chart-title">Répartition</div>
                        <canvas id="dash-donut-chart" style="width:100%;height:100px"></canvas>
                    </div>
                </div>
            </div>
        `;

        // Period tabs
        container.querySelectorAll('.dash-period-tab').forEach(tab => {
            tab.addEventListener('click', () => { activePeriod = tab.dataset.period; render(); showToast('Période : ' + tab.dataset.period); });
        });

        // Draw charts after DOM update
        requestAnimationFrame(() => {
            const lineCanvas = document.getElementById('dash-line-chart');
            if (lineCanvas) drawLineChart(lineCanvas, genData(n), '#00f0ff');

            const barCanvas = document.getElementById('dash-bar-chart');
            if (barCanvas) drawBarChart(barCanvas,
                [{ label: 'Direct', value: 35 }, { label: 'SEO', value: 45 }, { label: 'Social', value: 25 }, { label: 'Email', value: 20 }],
                ['#00f0ff', '#00ff87', '#bf00ff', '#ff8c00']
            );

            const donutCanvas = document.getElementById('dash-donut-chart');
            if (donutCanvas) drawDonut(donutCanvas,
                [{ value: 40 }, { value: 30 }, { value: 20 }, { value: 10 }],
                ['#00f0ff', '#00ff87', '#bf00ff', '#ff8c00']
            );
        });
    }

    render();
}

/* ========== COMPARISON ========== */
function initComparison() {
    const ct = document.getElementById('comparison-timeline');
    if (!ct) return;

    const items = [
        { old: { title: '📅 Délai : 3-6 mois', desc: 'Réunions interminables, allers-retours, validations multiples...' }, new: { title: '⚡ Délai : 5-14 jours', desc: 'Process agile, itérations rapides, livraison continue.' } },
        { old: { title: '💰 Budget : 10-50K €', desc: 'Cahier des charges rigide, devis à rallonge, surcoûts fréquents.' }, new: { title: '💰 Budget : 990-4990 €', desc: 'Prix transparent, tout inclus, pas de surprises.' } },
        { old: { title: '🔧 Stack : imposée', desc: 'Technologies choisies par l\'agence, pas forcément les meilleures.' }, new: { title: '🔧 Stack : optimale', desc: '200+ outils, on choisit les meilleurs pour VOTRE projet.' } },
        { old: { title: '📞 Support : bureau 9h-17h', desc: 'Ticket envoyé le vendredi ? Réponse lundi... peut-être.' }, new: { title: '📞 Support : 24/7 réactif', desc: 'Réponse en 2h max. Toujours disponibles.' } },
        { old: { title: '🐌 Résultat', desc: 'Un site qui ressemble à tous les autres.' }, new: { title: '🚀 Résultat', desc: 'Un outil sur mesure qui impressionne et convertit.' } },
    ];

    ct.innerHTML = `
        <div class="comp-side">
            ${items.map((item, i) => `<div class="comp-item" style="transition-delay:${i * 0.15}s"><div class="comp-item-card old"><div class="comp-item-title comp-old-title">${item.old.title}</div><div style="color:#94a3b8;font-size:0.8rem">${item.old.desc}</div></div></div>`).join('')}
        </div>
        <div class="comp-center"></div>
        <div class="comp-side">
            ${items.map((item, i) => `<div class="comp-item" style="transition-delay:${i * 0.15 + 0.1}s"><div class="comp-item-card new"><div class="comp-item-title comp-new-title">${item.new.title}</div><div style="color:#94a3b8;font-size:0.8rem">${item.new.desc}</div></div></div>`).join('')}
        </div>
    `;

    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.2 });
    ct.querySelectorAll('.comp-item').forEach(el => obs.observe(el));
}

/* ========== EXPERTISE ========== */
function initExpertise() {
    const ct = document.getElementById('expertise-carousel');
    if (!ct) return;

    const cards = [
        { icon: '🔍', title: 'SEO Technique', desc: 'Audit complet et optimisation', stat: '98/100', statLabel: 'Score Lighthouse moyen', barWidth: '98%', barColor: '#00ff87', backDesc: 'Core Web Vitals, Schema.org, Sitemap XML, meta tags optimisés, audit de backlinks, stratégie de contenu.' },
        { icon: '🛡️', title: 'Sécurité', desc: 'Protection de niveau bancaire', stat: '0', statLabel: 'Failles en production', barWidth: '100%', barColor: '#00f0ff', backDesc: 'SSL/TLS, WAF, audit OWASP, protection DDoS, conformité RGPD, chiffrement des données, monitoring 24/7.' },
        { icon: '⚡', title: 'Performance', desc: 'Vitesse extrême garantie', stat: '47ms', statLabel: 'Temps de réponse moyen', barWidth: '95%', barColor: '#bf00ff', backDesc: 'CDN mondial, lazy loading, code splitting, compression Brotli, cache intelligent, optimisation images WebP/AVIF.' },
        { icon: '🔄', title: 'Automatisation', desc: 'Zéro tâche répétitive', stat: '200+', statLabel: 'Workflows automatisés', barWidth: '90%', barColor: '#ff8c00', backDesc: 'Zapier, Make, n8n, scripts Python custom, webhooks, CRON jobs, alertes intelligentes, sync bi-directionnelle.' },
    ];

    ct.innerHTML = cards.map((c, i) => `
        <div class="expertise-card reveal" style="transition-delay:${i * 0.15}s">
            <div class="expertise-card-inner">
                <div class="expertise-card-front">
                    <div class="expertise-icon">${c.icon}</div>
                    <div class="expertise-title">${c.title}</div>
                    <div class="expertise-desc">${c.desc}</div>
                    <div class="expertise-bar"><div class="expertise-bar-fill" style="background:${c.barColor};--bar-width:${c.barWidth}"></div></div>
                </div>
                <div class="expertise-card-back">
                    <div class="expertise-stat" style="color:${c.barColor}">${c.stat}</div>
                    <div class="expertise-stat-label">${c.statLabel}</div>
                    <p style="font-size:0.8rem;color:#94a3b8;margin-top:1rem;text-align:left">${c.backDesc}</p>
                </div>
            </div>
        </div>
    `).join('');

    // Animate bars on scroll
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.querySelectorAll('.expertise-bar-fill').forEach(bar => {
                    bar.style.width = bar.style.getPropertyValue('--bar-width');
                });
            }
        });
    }, { threshold: 0.3 });
    ct.querySelectorAll('.expertise-card').forEach(c => obs.observe(c));
}

/* ========== METHOD TIMELINE ========== */
function initMethodTimeline() {
    const ct = document.getElementById('method-timeline');
    if (!ct) return;

    const steps = [
        { num: 1, icon: '🎯', title: 'Briefing', desc: 'Appel de 30 min pour comprendre vos besoins, objectifs et contraintes.', time: '30 min' },
        { num: 2, icon: '📐', title: 'Prototype', desc: 'Maquette interactive en 48h. Vous validez avant le développement.', time: '48h' },
        { num: 3, icon: '💻', title: 'Développement', desc: 'Construction agile avec démo quotidienne. Vous suivez en temps réel.', time: '3-10 jours' },
        { num: 4, icon: '🚀', title: 'Lancement', desc: 'Déploiement, formation, et suivi. Vous êtes opérationnel en minutes.', time: '1 jour' },
    ];

    ct.innerHTML = steps.map((s, i) => `
        <div class="method-step reveal" style="transition-delay:${i * 0.2}s">
            <div class="method-step-num">${s.num}</div>
            <div class="method-step-icon">${s.icon}</div>
            <div class="method-step-title">${s.title}</div>
            <div class="method-step-desc">${s.desc}</div>
            <div class="method-step-time">${s.time}</div>
        </div>
    `).join('');
}

/* ========== PORTFOLIO ========== */
function initPortfolio() {
    const ct = document.getElementById('portfolio-carousel');
    const dotsEl = document.getElementById('portfolio-dots');
    if (!ct) return;

    const projects = [
        { name: 'Le Gourmet Parisien', sector: 'Restaurant haut de gamme', result: '+180% de réservations', tags: ['Next.js','Stripe','SEO'], color: '#ff8c00', url: 'legourmet.fr', screen: 'restaurant' },
        { name: 'Cabinet Durand & Associés', sector: 'Cabinet d\'avocats', result: '+95% de prises de contact', tags: ['React','CRM','RGPD'], color: '#00f0ff', url: 'durand-avocats.fr', screen: 'avocats' },
        { name: 'ModaChic', sector: 'E-commerce mode', result: '+320% de ventes en ligne', tags: ['Shopify','Stripe','Analytics'], color: '#ff006e', url: 'modachic.com', screen: 'ecommerce' },
        { name: 'Bijouterie Élégance', sector: 'Bijouterie artisanale', result: '+250% de trafic organique', tags: ['WordPress','SEO','Schema'], color: '#ffd700', url: 'elegance-bijoux.fr', screen: 'bijouterie' },
        { name: 'NovaTech SaaS', sector: 'Startup SaaS B2B', result: '+400% de leads qualifiés', tags: ['React','Node.js','API'], color: '#bf00ff', url: 'novatech.io', screen: 'saas' },
        { name: 'Immobilière du Parc', sector: 'Agence immobilière', result: '+150% de mandats signés', tags: ['Vue.js','Maps','CRM'], color: '#00ff87', url: 'immo-parc.fr', screen: 'immo' },
        { name: 'FitLife Studio', sector: 'Salle de sport premium', result: '+210% d\'inscriptions', tags: ['React','Paiement','Planning'], color: '#06b6d4', url: 'fitlife-studio.com', screen: 'fitness' },
        { name: 'TechConsult Pro', sector: 'Cabinet de conseil IT', result: '+175% de conversions', tags: ['Next.js','Dashboard','CRM'], color: '#8b5cf6', url: 'techconsult.pro', screen: 'consulting' },
    ];

    let current = 0;

    function getScreenHTML(type, color) {
        const c = color + '20';
        const c2 = color + '40';
        switch(type) {
            case 'restaurant': return `<div style="padding:12px"><div style="height:80px;background:linear-gradient(135deg,${c},${c2});border-radius:8px;margin-bottom:8px"></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px">${[1,2,3].map(() => `<div style="height:50px;background:${c};border-radius:6px"></div>`).join('')}</div><div style="height:12px;background:${c};border-radius:4px;margin-top:8px;width:60%"></div><div style="height:8px;background:${c};border-radius:4px;margin-top:6px;width:80%"></div></div>`;
            case 'avocats': return `<div style="padding:12px"><div style="display:flex;gap:8px;margin-bottom:8px"><div style="width:60px;height:60px;border-radius:50%;background:${c2}"></div><div style="flex:1"><div style="height:10px;background:${c};border-radius:4px;margin-bottom:6px;width:70%"></div><div style="height:8px;background:${c};border-radius:4px;width:50%"></div></div></div><div style="height:40px;background:${c};border-radius:6px;margin-bottom:6px"></div><div style="height:40px;background:${c};border-radius:6px"></div></div>`;
            case 'ecommerce': return `<div style="padding:12px"><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">${[1,2,3,4].map(() => `<div style="background:${c};border-radius:6px;padding:8px"><div style="height:45px;background:${c2};border-radius:4px;margin-bottom:4px"></div><div style="height:6px;background:${c2};border-radius:2px;width:60%"></div><div style="height:8px;background:${color}50;border-radius:2px;width:40%;margin-top:4px"></div></div>`).join('')}</div></div>`;
            default: return `<div style="padding:12px"><div style="height:50px;background:linear-gradient(135deg,${c},${c2});border-radius:8px;margin-bottom:8px"></div><div style="height:8px;background:${c};border-radius:4px;width:70%;margin-bottom:6px"></div><div style="height:8px;background:${c};border-radius:4px;width:50%;margin-bottom:8px"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><div style="height:60px;background:${c};border-radius:6px"></div><div style="height:60px;background:${c};border-radius:6px"></div></div></div>`;
        }
    }

    function render() {
        ct.innerHTML = projects.map((p, i) => {
            const offset = i - current;
            let transform, opacity, zIndex;
            if (offset === 0) {
                transform = 'translate(-50%, -50%) scale(1) rotateY(0deg)';
                opacity = 1; zIndex = 10;
            } else if (Math.abs(offset) === 1) {
                transform = `translate(${offset > 0 ? '0%' : '-100%'}, -50%) scale(0.85) rotateY(${offset * -15}deg)`;
                opacity = 0.6; zIndex = 5;
            } else if (Math.abs(offset) === 2) {
                transform = `translate(${offset > 0 ? '50%' : '-150%'}, -50%) scale(0.7) rotateY(${offset * -20}deg)`;
                opacity = 0.3; zIndex = 2;
            } else {
                transform = `translate(-50%, -50%) scale(0.5)`;
                opacity = 0; zIndex = 0;
            }
            return `
                <div class="portfolio-card-3d" style="transform:${transform};opacity:${opacity};z-index:${zIndex}">
                    <div class="portfolio-mockup">
                        <div class="portfolio-mockup-bar">
                            <div class="portfolio-mockup-dot" style="background:#ef4444"></div>
                            <div class="portfolio-mockup-dot" style="background:#eab308"></div>
                            <div class="portfolio-mockup-dot" style="background:#22c55e"></div>
                            <div class="portfolio-mockup-url">${p.url}</div>
                        </div>
                        <div class="portfolio-mockup-screen">${getScreenHTML(p.screen, p.color)}</div>
                        <div class="portfolio-info">
                            <div class="portfolio-info-name">${p.name}</div>
                            <div class="portfolio-info-sector">${p.sector}</div>
                            <div class="portfolio-info-result">${p.result}</div>
                            <div class="portfolio-tags">${p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}</div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Dots
        if (dotsEl) {
            dotsEl.innerHTML = projects.map((_, i) => `<div class="portfolio-dot ${i === current ? 'active' : ''}" data-idx="${i}"></div>`).join('');
            dotsEl.querySelectorAll('.portfolio-dot').forEach(d => {
                d.addEventListener('click', () => { current = parseInt(d.dataset.idx); render(); });
            });
        }
    }

    render();

    const prev = document.getElementById('portfolio-prev');
    const next = document.getElementById('portfolio-next');
    if (prev) prev.addEventListener('click', () => { current = (current - 1 + projects.length) % projects.length; render(); });
    if (next) next.addEventListener('click', () => { current = (current + 1) % projects.length; render(); });

    // Auto rotate
    setInterval(() => { current = (current + 1) % projects.length; render(); }, 5000);
}

/* ========== TESTIMONIALS ========== */
function initTestimonials() {
    const ct = document.getElementById('testimonials-container');
    if (!ct) return;

    const testimonials = [
        { text: 'FlashAI a transformé notre présence en ligne. Notre site génère maintenant 3x plus de leads qu\'avant, et le CRM intégré nous fait gagner 10h par semaine.', name: 'Marie Dupont', role: 'CEO, Dupont Consulting', avatar: 'MD', color: '#00f0ff' },
        { text: 'Incroyable rapport qualité/prix. En 5 jours, on avait un site e-commerce complet avec paiement, gestion de stock et dashboard analytics. Impensable avec une agence classique.', name: 'Thomas Martin', role: 'Fondateur, ModaChic', avatar: 'TM', color: '#bf00ff' },
        { text: 'Le chatbot IA a révolutionné notre service client. Il gère 80% des demandes automatiquement et nos clients adorent la rapidité de réponse. ROI positif dès le premier mois.', name: 'Sophie Bernard', role: 'Directrice, TechConsult Pro', avatar: 'SB', color: '#ff006e' },
        { text: 'L\'équipe FlashAI comprend vraiment les enjeux business. Pas juste des développeurs, mais de vrais partenaires qui pensent conversion et croissance.', name: 'Lucas Petit', role: 'CMO, NovaTech SaaS', avatar: 'LP', color: '#00ff87' },
        { text: 'La meilleure décision de l\'année. Notre ancien site nous coûtait 2000€/mois avec une agence, FlashAI nous a livré un site 10x mieux pour un quart du prix.', name: 'Emma Leroy', role: 'Gérante, Immobilière du Parc', avatar: 'EL', color: '#ffd700' },
    ];

    ct.innerHTML = testimonials.map(t => `
        <div class="testimonial-card reveal">
            <div class="testimonial-quote">"</div>
            <div class="testimonial-text">${t.text}</div>
            <div class="testimonial-author">
                <div class="testimonial-avatar" style="background:${t.color}20;color:${t.color}">${t.avatar}</div>
                <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-role">${t.role}</div>
                    <div class="testimonial-stars">${'★'.repeat(5).split('').map(s => `<span class="testimonial-star">${s}</span>`).join('')}</div>
                </div>
            </div>
        </div>
    `).join('');
}

/* ========== SOLAR SYSTEM (TOOLS) ========== */
function initSolarSystem() {
    const canvas = document.getElementById('solar-canvas');
    const container = document.getElementById('solar-system');
    const infoPanel = document.getElementById('solar-info');
    if (!canvas || !container) return;

    const orbits = [
        { name: 'Paiement', color: '#00ff87', tools: [
            { name: 'Stripe', desc: 'Paiements en ligne sécurisés', emoji: '💳' },
            { name: 'PayPal', desc: 'Paiements internationaux', emoji: '🅿️' },
            { name: 'Square', desc: 'Terminal de paiement', emoji: '⬜' },
            { name: 'Mollie', desc: 'Paiements européens', emoji: '💶' },
        ]},
        { name: 'Communication', color: '#00f0ff', tools: [
            { name: 'Slack', desc: 'Messagerie d\'équipe', emoji: '💬' },
            { name: 'Discord', desc: 'Communauté et support', emoji: '🎮' },
            { name: 'WhatsApp', desc: 'Messagerie business', emoji: '📱' },
            { name: 'Twilio', desc: 'SMS et appels API', emoji: '📞' },
            { name: 'SendGrid', desc: 'Emails transactionnels', emoji: '📧' },
        ]},
        { name: 'Cloud & Data', color: '#bf00ff', tools: [
            { name: 'AWS', desc: 'Infrastructure cloud', emoji: '☁️' },
            { name: 'Firebase', desc: 'Backend as a Service', emoji: '🔥' },
            { name: 'MongoDB', desc: 'Base NoSQL flexible', emoji: '🍃' },
            { name: 'PostgreSQL', desc: 'Base SQL robuste', emoji: '🐘' },
            { name: 'Redis', desc: 'Cache haute performance', emoji: '⚡' },
            { name: 'Supabase', desc: 'Alternative open-source Firebase', emoji: '⚡' },
        ]},
        { name: 'Automatisation', color: '#ff8c00', tools: [
            { name: 'Zapier', desc: 'Automatisation no-code', emoji: '⚡' },
            { name: 'Make', desc: 'Workflows visuels', emoji: '🔧' },
            { name: 'n8n', desc: 'Automatisation open-source', emoji: '🔗' },
            { name: 'GitHub Actions', desc: 'CI/CD automatisé', emoji: '🔄' },
            { name: 'Webhooks', desc: 'Events en temps réel', emoji: '🪝' },
            { name: 'CRON', desc: 'Tâches planifiées', emoji: '⏰' },
            { name: 'Puppeteer', desc: 'Web scraping intelligent', emoji: '🤖' },
        ]},
        { name: 'IA & ML', color: '#ff006e', tools: [
            { name: 'OpenAI', desc: 'GPT-4, DALL·E, Whisper', emoji: '🧠' },
            { name: 'Claude', desc: 'IA conversationnelle avancée', emoji: '🤖' },
            { name: 'Hugging Face', desc: 'Modèles open-source', emoji: '🤗' },
            { name: 'TensorFlow', desc: 'Machine learning', emoji: '📊' },
            { name: 'Pinecone', desc: 'Base vectorielle', emoji: '🌲' },
            { name: 'LangChain', desc: 'Orchestration LLM', emoji: '🔗' },
            { name: 'Vercel AI', desc: 'SDK streaming IA', emoji: '▲' },
            { name: 'Replicate', desc: 'Modèles en API', emoji: '🔁' },
        ]},
        { name: 'Marketing', color: '#ffd700', tools: [
            { name: 'HubSpot', desc: 'CRM & marketing automation', emoji: '🎯' },
            { name: 'Mailchimp', desc: 'Email marketing', emoji: '📮' },
            { name: 'Google Ads', desc: 'Publicité search', emoji: '🔍' },
            { name: 'Meta Ads', desc: 'Publicité sociale', emoji: '📘' },
            { name: 'Google Analytics', desc: 'Analyse de trafic', emoji: '📈' },
            { name: 'Hotjar', desc: 'Heatmaps et recordings', emoji: '🔥' },
            { name: 'Segment', desc: 'Customer data platform', emoji: '📊' },
            { name: 'Mixpanel', desc: 'Product analytics', emoji: '🔬' },
            { name: 'Ahrefs', desc: 'SEO et backlinks', emoji: '🔗' },
        ]},
    ];

    const ctx = canvas.getContext('2d');
    let width, height, cx, cy;
    let hoveredTool = null;
    let mouseX = 0, mouseY = 0;
    let time = 0;

    function resize() {
        const rect = container.getBoundingClientRect();
        width = canvas.width = rect.width * 2;
        height = canvas.height = rect.height * 2;
        ctx.scale(2, 2);
        cx = rect.width / 2;
        cy = rect.height / 2;
    }

    resize();
    window.addEventListener('resize', () => { ctx.setTransform(1,0,0,1,0,0); resize(); });

    container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    container.addEventListener('mouseleave', () => {
        hoveredTool = null;
        if (infoPanel) infoPanel.style.display = 'none';
    });

    function draw() {
        ctx.setTransform(2, 0, 0, 2, 0, 0);
        ctx.clearRect(0, 0, width, height);
        time += 0.003;
        hoveredTool = null;
        let closestDist = 30;

        orbits.forEach((orbit, oi) => {
            const r = 80 + oi * 50;
            const speed = 0.2 + oi * 0.05;

            // Draw orbit ring
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = orbit.color + '15';
            ctx.lineWidth = 1;
            ctx.stroke();

            // Draw tools
            orbit.tools.forEach((tool, ti) => {
                const angle = time * speed + (ti / orbit.tools.length) * Math.PI * 2;
                const x = cx + Math.cos(angle) * r;
                const y = cy + Math.sin(angle) * r;

                const dist = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
                const isHovered = dist < closestDist;
                if (isHovered) {
                    hoveredTool = { ...tool, orbit: orbit.name, color: orbit.color };
                    closestDist = dist;
                }

                const size = isHovered ? 18 : 12;

                // Glow
                if (isHovered) {
                    ctx.beginPath();
                    ctx.arc(x, y, 25, 0, Math.PI * 2);
                    ctx.fillStyle = orbit.color + '20';
                    ctx.fill();

                    // Line to center
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = orbit.color + '30';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }

                // Circle
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = isHovered ? orbit.color : orbit.color + '60';
                ctx.fill();

                // Emoji
                ctx.font = `${isHovered ? 14 : 10}px sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(tool.emoji, x, y);
            });
        });

        // Update info panel
        if (infoPanel) {
            if (hoveredTool) {
                infoPanel.style.display = 'block';
                document.getElementById('solar-info-name').textContent = hoveredTool.name;
                document.getElementById('solar-info-desc').textContent = hoveredTool.desc;
                document.getElementById('solar-info-integration').innerHTML = `<span style="color:${hoveredTool.color}">${hoveredTool.orbit}</span> — Intégration FlashAI`;
            } else {
                infoPanel.style.display = 'none';
            }
        }

        // Data particles
        for (let i = 0; i < 20; i++) {
            const angle = time * 2 + i * 0.31;
            const r = 60 + (i * 17) % 300;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99,102,241,0.3)';
            ctx.fill();
        }

        requestAnimationFrame(draw);
    }

    draw();

    // Search filter
    const search = document.getElementById('tools-search');
    if (search) {
        search.addEventListener('input', e => {
            const q = e.target.value.toLowerCase();
            // Could highlight matching tools - for now just a toast
            if (q.length > 2) {
                const all = orbits.flatMap(o => o.tools);
                const matches = all.filter(t => t.name.toLowerCase().includes(q));
                if (matches.length > 0) showToast(`${matches.length} outil${matches.length > 1 ? 's' : ''} trouvé${matches.length > 1 ? 's' : ''}`);
            }
        });
    }
}

/* ========== TOOLS MOBILE GRID ========== */
function initToolsMobile() {
    const grid = document.getElementById('tools-mobile-grid');
    if (!grid) return;

    const allTools = [
        { name: 'Stripe', emoji: '💳' }, { name: 'OpenAI', emoji: '🧠' }, { name: 'AWS', emoji: '☁️' },
        { name: 'Slack', emoji: '💬' }, { name: 'Zapier', emoji: '⚡' }, { name: 'HubSpot', emoji: '🎯' },
        { name: 'Firebase', emoji: '🔥' }, { name: 'Discord', emoji: '🎮' }, { name: 'MongoDB', emoji: '🍃' },
        { name: 'Twilio', emoji: '📞' }, { name: 'Make', emoji: '🔧' }, { name: 'Analytics', emoji: '📈' },
        { name: 'Redis', emoji: '⚡' }, { name: 'Claude', emoji: '🤖' }, { name: 'WhatsApp', emoji: '📱' },
        { name: 'PayPal', emoji: '🅿️' }, { name: 'Vercel', emoji: '▲' }, { name: 'n8n', emoji: '🔗' },
    ];

    grid.innerHTML = allTools.map(t => `
        <div class="tools-mobile-item">
            <span class="tool-emoji">${t.emoji}</span>
            <span>${t.name}</span>
        </div>
    `).join('');
}

/* ========== TOOLS CATEGORIES ========== */
function initToolsCategories() {
    const ct = document.getElementById('tools-categories');
    if (!ct) return;
    const cats = [
        { name: 'Paiement', color: '#00ff87' },
        { name: 'Communication', color: '#00f0ff' },
        { name: 'Cloud & Data', color: '#bf00ff' },
        { name: 'Automatisation', color: '#ff8c00' },
        { name: 'IA & ML', color: '#ff006e' },
        { name: 'Marketing', color: '#ffd700' },
    ];
    ct.innerHTML = cats.map(c => `
        <span class="tool-cat-pill" style="--cat-color:${c.color};--cat-glow:${c.color}30">${c.name}</span>
    `).join('');
}

/* ========== PRICING ========== */
function initPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;

    const plans = [
        { name: 'Starter', price: '990', suffix: '€', desc: 'Parfait pour démarrer avec un site vitrine professionnel.', badge: null, featured: false,
          features: ['Site vitrine responsive', 'Design premium', 'SEO de base', 'Formulaire de contact', 'Hébergement 1 an', 'Support email'] },
        { name: 'Business', price: '2 490', suffix: '€', desc: 'La solution complète pour développer votre activité.', badge: 'Populaire', featured: true,
          features: ['Tout Starter +', 'CRM intégré', 'Chatbot IA basique', 'Analytics avancés', 'Paiement en ligne', 'SEO avancé', 'Support prioritaire', '3 mois de maintenance'] },
        { name: 'Premium', price: '4 990', suffix: '€', desc: 'Le package ultime pour dominer votre marché.', badge: null, featured: false,
          features: ['Tout Business +', 'Dashboard custom', 'Automatisations avancées', 'API sur mesure', 'Chatbot IA avancé', 'Formation équipe', 'Support 24/7', '6 mois de maintenance'] },
        { name: 'Enterprise', price: 'Sur mesure', suffix: '', desc: 'Pour les projets ambitieux qui nécessitent une solution dédiée.', badge: null, featured: false,
          features: ['Solution 100% custom', 'Architecture dédiée', 'SLA garanti 99.9%', 'Account manager dédié', 'Audit sécurité mensuel', 'Support 24/7 prioritaire', 'Formation continue', 'Évolutions illimitées'] },
    ];

    grid.innerHTML = plans.map(p => `
        <div class="pricing-card ${p.featured ? 'featured' : ''} reveal">
            <div class="pricing-holo"></div>
            ${p.badge ? `<div class="pricing-badge">${p.badge}</div>` : ''}
            <div class="pricing-name">${p.name}</div>
            <div class="pricing-price">${p.price}<span class="pricing-price-suffix">${p.suffix}</span></div>
            <div class="pricing-desc">${p.desc}</div>
            <ul class="pricing-features">
                ${p.features.map(f => `<li>${f}</li>`).join('')}
            </ul>
            <a href="#contact" class="btn-glow w-full justify-center ${p.featured ? '' : 'btn-outline'}" style="${p.featured ? '' : 'background:transparent;border:1.5px solid rgba(255,255,255,0.2)'}">
                <span>${p.price === 'Sur mesure' ? 'Nous contacter' : 'Choisir ce plan'}</span>
            </a>
        </div>
    `).join('');

    // Holographic effect
    grid.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const r = card.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            const holo = card.querySelector('.pricing-holo');
            if (holo) holo.style.background = `radial-gradient(circle at ${x*100}% ${y*100}%, rgba(0,240,255,0.08), rgba(191,0,255,0.05), rgba(255,0,110,0.03), transparent 60%)`;
        });
    });
}

/* ========== ROI CALCULATOR ========== */
function initROICalculator() {
    const budget = document.getElementById('roi-budget');
    const leads = document.getElementById('roi-leads');
    const conv = document.getElementById('roi-conv');
    if (!budget || !leads || !conv) return;

    function calc() {
        const b = parseFloat(budget.value);
        const l = parseFloat(leads.value);
        const c = parseFloat(conv.value);

        document.getElementById('roi-budget-val').textContent = b.toLocaleString('fr') + ' €';
        document.getElementById('roi-leads-val').textContent = l;
        document.getElementById('roi-conv-val').textContent = c + '%';

        const currentRevenue = l * (c / 100) * 200;
        const improvedRevenue = l * 1.5 * ((c * 1.8) / 100) * 200;
        const roi = Math.round(((improvedRevenue - currentRevenue) / (b || 1)) * 100);
        const savings = Math.round(improvedRevenue - currentRevenue);

        document.getElementById('roi-number').textContent = '+' + roi + '%';
        document.getElementById('roi-detail').textContent = 'Revenu additionnel estimé : ' + savings.toLocaleString('fr') + ' €/mois';

        // Draw mini chart
        const canvas = document.getElementById('roi-chart');
        if (canvas) {
            const ctx = canvas.getContext('2d');
            const w = canvas.width;
            const h = canvas.height;
            ctx.clearRect(0, 0, w, h);

            // Before bar
            const barW = 60;
            const beforeH = (currentRevenue / (improvedRevenue || 1)) * (h - 40);
            const afterH = h - 40;

            ctx.fillStyle = '#ef444440';
            ctx.beginPath();
            ctx.roundRect(w/2 - barW - 10, h - beforeH - 20, barW, beforeH, 6);
            ctx.fill();
            ctx.fillStyle = '#94a3b8';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText('Avant', w/2 - barW/2 - 10, h - 5);

            // After bar
            ctx.fillStyle = '#00ff8740';
            ctx.beginPath();
            ctx.roundRect(w/2 + 10, h - afterH - 20, barW, afterH, 6);
            ctx.fill();
            ctx.fillStyle = '#00ff87';
            ctx.fillText('Après', w/2 + barW/2 + 10, h - 5);
        }
    }

    [budget, leads, conv].forEach(el => el.addEventListener('input', calc));
    calc();
}

/* ========== FAQ ========== */
function initFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    const faqs = [
        { q: 'Quels types de projets réalisez-vous ?', a: 'Nous créons des sites web, CRM, dashboards, chatbots IA, automatisations, et tout outil digital sur mesure. Chaque projet est unique et construit de zéro selon vos besoins spécifiques.', cat: 'general' },
        { q: 'Combien coûte un projet ?', a: 'Nos tarifs commencent à 890€ pour une automatisation et 990€ pour un site vitrine. Le prix dépend de la complexité du projet. Nous fournissons toujours un devis détaillé et transparent avant de commencer.', cat: 'business' },
        { q: 'Quel est le délai de livraison ?', a: 'En moyenne 5 jours ouvrés pour un site vitrine, 7-14 jours pour un projet complexe (CRM, e-commerce). Nous travaillons en sprints courts avec des démos quotidiennes.', cat: 'general' },
        { q: 'Quelles technologies utilisez-vous ?', a: 'React, Next.js, Vue.js, Node.js, Python, PostgreSQL, MongoDB, et plus de 200 APIs (Stripe, OpenAI, AWS, Firebase, etc.). On choisit toujours la stack optimale pour votre projet.', cat: 'technique' },
        { q: 'Proposez-vous du SEO ?', a: 'Oui ! Chaque site est optimisé SEO par défaut (meta tags, schema.org, sitemap, Core Web Vitals). On propose aussi un audit SEO complet et une stratégie de contenu avancée.', cat: 'technique' },
        { q: 'Comment gérez-vous la sécurité ?', a: 'SSL/TLS, WAF, protection DDoS, audit OWASP, conformité RGPD, chiffrement des données, et monitoring 24/7. Zéro compromis sur la sécurité.', cat: 'technique' },
        { q: 'Y a-t-il une garantie ?', a: 'Oui, garantie satisfait ou remboursé à 100%. Si le résultat ne vous convient pas, on vous rembourse intégralement. Sans conditions ni délai.', cat: 'business' },
        { q: 'Proposez-vous de la maintenance ?', a: 'Oui ! Nos plans incluent de la maintenance (1 à 6 mois selon le plan). Au-delà, nous proposons des forfaits de maintenance mensuels à partir de 99€/mois.', cat: 'support' },
        { q: 'Comment se passe le process de travail ?', a: '4 étapes simples : 1) Briefing de 30 min, 2) Prototype en 48h, 3) Développement avec démos quotidiennes, 4) Lancement et formation. Vous êtes impliqué à chaque étape.', cat: 'general' },
        { q: 'Peut-on intégrer des outils existants ?', a: 'Absolument ! Nous avons plus de 247 intégrations possibles : Stripe, Slack, HubSpot, Zapier, OpenAI, et bien d\'autres. Si un outil a une API, on peut l\'intégrer.', cat: 'technique' },
        { q: 'Travaillez-vous avec des entreprises hors d\'Israël ?', a: 'Oui, nous travaillons principalement avec des clients en France, Belgique, Suisse, Luxembourg et Canada. Tout se fait à distance avec des outils de communication modernes.', cat: 'general' },
        { q: 'Comment fonctionne l\'automatisation ?', a: 'On connecte vos outils entre eux pour supprimer les tâches répétitives. Par exemple : un lead remplit un formulaire → CRM mis à jour → email de bienvenue → notification Slack → suivi planifié. Tout automatiquement.', cat: 'technique' },
        { q: 'Quel support proposez-vous ?', a: 'Support email avec réponse en 2h max. Les plans Business et Premium incluent un support prioritaire. Le plan Enterprise inclut un support 24/7 avec account manager dédié.', cat: 'support' },
        { q: 'Peut-on faire évoluer le projet après livraison ?', a: 'Bien sûr ! Nos solutions sont conçues pour évoluer. On peut ajouter des fonctionnalités, intégrer de nouveaux outils, ou scaler l\'infrastructure à tout moment.', cat: 'support' },
        { q: 'Vous faites aussi des chatbots IA ?', a: 'Oui ! Nos chatbots sont alimentés par GPT-4 ou Claude, formés sur vos données métier. Ils gèrent les questions fréquentes, qualifient les leads, et peuvent même prendre des rendez-vous. Intégration web, WhatsApp, Messenger.', cat: 'technique' },
        { q: 'Pourquoi FlashAI est basé en Israël ?', a: 'Israël est la Startup Nation — le pays avec le plus de startups par habitant au monde. Notre écosystème tech est le plus dynamique de la planète. On s\'en inspire chaque jour pour innover et livrer des solutions qui dépassent les attentes. 🇮🇱', cat: 'general' },
        { q: 'Comment gérez-vous les données personnelles (RGPD) ?', a: 'Nous sommes 100% conformes RGPD. Hébergement en Europe, chiffrement des données, politique de confidentialité, consentement cookies, et droit à l\'effacement intégré dans tous nos outils.', cat: 'technique' },
        { q: 'Proposez-vous des formations ?', a: 'Oui ! Chaque livraison inclut une formation complète pour utiliser votre outil. Les plans Premium et Enterprise incluent des sessions de formation supplémentaires pour toute l\'équipe.', cat: 'support' },
        { q: 'Pouvez-vous gérer de gros volumes de trafic ?', a: 'Absolument. Nos solutions sont déployées sur des infrastructures cloud scalables (AWS, Vercel, Cloudflare). CDN mondial, mise en cache intelligente, et auto-scaling pour gérer les pics de trafic.', cat: 'technique' },
        { q: 'Comment être sûr de la qualité ?', a: 'Tests automatisés, revue de code, score Lighthouse > 95, audit de sécurité, et surtout : vous validez chaque étape avant qu\'on avance. Et si ça ne vous convient pas, on vous rembourse.', cat: 'business' },
    ];

    let activeCat = 'all';
    let searchQuery = '';

    function render() {
        const filtered = faqs.filter(f => {
            const catMatch = activeCat === 'all' || f.cat === activeCat;
            const searchMatch = !searchQuery || f.q.toLowerCase().includes(searchQuery) || f.a.toLowerCase().includes(searchQuery);
            return catMatch && searchMatch;
        });

        list.innerHTML = filtered.map((f, i) => `
            <div class="faq-item" data-idx="${i}">
                <button class="faq-question">
                    <span class="faq-num">${String(i + 1).padStart(2, '0')}</span>
                    <span>${f.q}</span>
                    <span class="faq-icon-wrap">+</span>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-text">${f.a}</div>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.closest('.faq-item');
                const wasOpen = item.classList.contains('open');
                list.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
                if (!wasOpen) item.classList.add('open');
            });
        });
    }

    // Tabs
    document.querySelectorAll('.faq-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeCat = tab.dataset.cat;
            render();
        });
    });

    // Search
    const search = document.getElementById('faq-search');
    if (search) {
        search.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            render();
        });
    }

    render();
}

/* ========== CTA CANVAS (VORTEX) ========== */
function initCTACanvas() {
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
        w = canvas.width = canvas.offsetWidth * 2;
        h = canvas.height = canvas.offsetHeight * 2;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 100; i++) {
        particles.push({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 300 + 100,
            speed: Math.random() * 0.01 + 0.005,
            size: Math.random() * 2 + 0.5,
            color: ['#00f0ff', '#bf00ff', '#ff006e', '#00ff87', '#ffd700'][Math.floor(Math.random() * 5)]
        });
    }

    function draw() {
        ctx.setTransform(2, 0, 0, 2, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const cx = canvas.offsetWidth / 2;
        const cy = canvas.offsetHeight / 2;

        particles.forEach(p => {
            p.angle += p.speed;
            p.radius -= 0.15;
            if (p.radius < 5) { p.radius = Math.random() * 300 + 100; p.angle = Math.random() * Math.PI * 2; }

            const x = cx + Math.cos(p.angle) * p.radius;
            const y = cy + Math.sin(p.angle) * p.radius;

            ctx.beginPath();
            ctx.arc(x, y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '60';
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) draw();
    }, { threshold: 0.1 });
    obs.observe(canvas);
}

/* ========== CTA TIMER ========== */
function initCTATimer() {
    const el = document.getElementById('cta-timer');
    if (!el) return;
    let h = 23, m = 59, s = 42;
    setInterval(() => {
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

/* ========== CONTACT FORM ========== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', e => {
        showToast('Message envoyé avec succès ! 🚀');
    });
}

/* ========== MAGNETIC BUTTON ========== */
function initMagneticBtn() {
    const btn = document.getElementById('magnetic-cta');
    if (!btn) return;
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
}

/* ========== SCROLL TOP ========== */
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ========== SMOOTH ANCHORS ========== */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ========== THREE.JS BACKGROUND ========== */
function initThreeBackground() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particles
    const count = 600;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [[0, 0.94, 1], [0.75, 0, 1], [1, 0, 0.43], [0, 1, 0.53], [1, 0.55, 0]];

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        const c = palette[Math.floor(Math.random() * palette.length)];
        colors[i * 3] = c[0];
        colors[i * 3 + 1] = c[1];
        colors[i * 3 + 2] = c[2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        sizeAttenuation: true,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);
    camera.position.z = 8;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    function animate() {
        requestAnimationFrame(animate);
        points.rotation.y += 0.0005;
        points.rotation.x += 0.0002;
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

    animate();
}

/* ========== EASTER EGGS ========== */
function initEasterEggs() {
    // Konami code
    const konami = [38,38,40,40,37,39,37,39,66,65];
    let konamiIdx = 0;
    document.addEventListener('keydown', e => {
        if (e.keyCode === konami[konamiIdx]) {
            konamiIdx++;
            if (konamiIdx === konami.length) {
                konamiIdx = 0;
                fireConfetti();
                showToast('🎉 Easter egg trouvé ! Vous êtes un vrai geek !');
            }
        } else konamiIdx = 0;
    });

    // Type "flashai"
    let typed = '';
    document.addEventListener('keypress', e => {
        typed += e.key.toLowerCase();
        if (typed.includes('flashai')) {
            typed = '';
            document.body.style.transition = 'filter 0.3s';
            let count = 0;
            const disco = setInterval(() => {
                document.body.style.filter = `hue-rotate(${count * 60}deg)`;
                count++;
                if (count > 15) { clearInterval(disco); document.body.style.filter = ''; }
            }, 200);
            showToast('🕺 Mode disco activé !');
        }
        if (typed.length > 20) typed = typed.slice(-10);
    });

    // Console art
    console.log('%c⚡ FlashAI v5.0', 'font-size:24px;font-weight:bold;background:linear-gradient(135deg,#00f0ff,#bf00ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;');
    console.log('%cStartup Nation — Tel Aviv 🇮🇱', 'font-size:14px;color:#94a3b8;');
    console.log('%cOn recrute ! → contact@flashai.dev', 'font-size:12px;color:#00ff87;');
}

function fireConfetti() {
    for (let i = 0; i < 80; i++) {
        const c = document.createElement('div');
        c.style.cssText = `position:fixed;top:50%;left:50%;width:8px;height:8px;border-radius:${Math.random()>0.5?'50%':'0'};background:${['#00f0ff','#bf00ff','#ff006e','#00ff87','#ffd700','#ff8c00'][Math.floor(Math.random()*6)]};pointer-events:none;z-index:99999;`;
        document.body.appendChild(c);
        const angle = Math.random() * Math.PI * 2;
        const vel = Math.random() * 400 + 200;
        const vx = Math.cos(angle) * vel;
        const vy = Math.sin(angle) * vel - 200;
        let x = window.innerWidth / 2, y = window.innerHeight / 2, opacity = 1;
        const start = performance.now();
        function tick(now) {
            const t = (now - start) / 1000;
            x += vx * 0.016;
            y += vy * 0.016 + 500 * t * 0.016;
            opacity -= 0.015;
            c.style.transform = `translate(${x - window.innerWidth/2}px, ${y - window.innerHeight/2}px) rotate(${t*360}deg)`;
            c.style.opacity = Math.max(0, opacity);
            if (opacity > 0) requestAnimationFrame(tick);
            else c.remove();
        }
        requestAnimationFrame(tick);
    }
}
