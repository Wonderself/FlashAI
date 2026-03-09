/**
 * FlashAI v5.5 — MEGA ULTRA PREMIUM UPGRADE
 * Sparkle Cursor, Galaxy, 3D Pricing, Smart Form, Knowledge Base FAQ
 */
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initScrollProgress();
    initSparkleCursor();
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
    initGalaxy();
    initToolsMobile();
    initGalaxyCategories();
    initPricing();
    initROICalculator();
    initFAQ();
    initCTACanvas();
    initCTATimer();
    initSmartForm();
    initMagneticBtn();
    initScrollTop();
    initSmoothAnchors();
    initThreeBackground();
    initEasterEggs();
});

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
    const lines = ['[INIT] Loading neural network...','[OK] 247 tools connected','[OK] AI Core ready','[OK] Galaxy renderer initialized','[OK] Sparkle engine loaded','[LAUNCH] FlashAI v5.5'];
    let progress = 0, lineIdx = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress > 100) progress = 100;
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = Math.floor(progress) + '%';
        if (lineIdx < lines.length && progress > (lineIdx + 1) * (100 / lines.length)) {
            if (boot) { const s = document.createElement('div'); s.textContent = lines[lineIdx]; s.style.cssText = 'opacity:0;transform:translateX(-10px);transition:all 0.3s'; boot.appendChild(s); requestAnimationFrame(() => { s.style.opacity = '1'; s.style.transform = 'translateX(0)'; }); }
            lineIdx++;
        }
        if (progress >= 100) { clearInterval(interval); setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 600); }
    }, 200);
    setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 5000);
}

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => { bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%'; }, { passive: true });
}

/* ========== SPARKLE CURSOR ========== */
function initSparkleCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, mx = 0, my = 0, pmx = 0, pmy = 0;
    const particles = [];
    const colors = ['#ff006e','#bf00ff','#ff69b4','#00f0ff','#ffd700','#ff8c00','#00ff87','#e879f9','#f472b6'];

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    class Sparkle {
        constructor(x, y) {
            this.x = x + (Math.random() - 0.5) * 20;
            this.y = y + (Math.random() - 0.5) * 20;
            this.vx = (Math.random() - 0.5) * 3;
            this.vy = (Math.random() - 0.5) * 3 - 1;
            this.life = 1;
            this.decay = Math.random() * 0.02 + 0.015;
            this.size = Math.random() * 4 + 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.type = Math.random() > 0.3 ? 'star' : 'circle';
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.03;
            this.life -= this.decay;
            this.rotation += this.rotSpeed;
            this.size *= 0.995;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.life * 0.8;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            if (this.type === 'star') {
                ctx.beginPath();
                for (let i = 0; i < 5; i++) {
                    const a = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                    const r = i % 2 === 0 ? this.size : this.size * 0.4;
                    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
                }
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.size * 3;
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.size * 4;
                ctx.fill();
            }
            ctx.restore();
        }
    }

    let frame = 0;
    function loop() {
        ctx.clearRect(0, 0, w, h);
        const dx = mx - pmx, dy = my - pmy;
        const speed = Math.sqrt(dx * dx + dy * dy);
        const spawnCount = Math.min(Math.floor(speed * 0.5) + 1, 8);

        if (speed > 2 && frame % 2 === 0) {
            for (let i = 0; i < spawnCount; i++) {
                particles.push(new Sparkle(mx, my));
            }
        }

        // Main cursor glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 30);
        grad.addColorStop(0, 'rgba(255, 0, 110, 0.15)');
        grad.addColorStop(0.5, 'rgba(191, 0, 255, 0.05)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.arc(mx, my, 30, 0, Math.PI * 2);
        ctx.fill();

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].life <= 0) particles.splice(i, 1);
        }

        pmx = mx; pmy = my;
        frame++;
        requestAnimationFrame(loop);
    }
    loop();
}

function initScrollReveal() {
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

function initHeader() {
    const hdr = document.getElementById('main-header');
    if (!hdr) return;
    const navLinks = hdr.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
        hdr.classList.toggle('scrolled', window.scrollY > 50);
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 200) current = s.id; });
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-section') === current));
    }, { passive: true });
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn'), menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => { const o = menu.classList.toggle('open'); btn.classList.toggle('menu-open'); document.body.style.overflow = o ? 'hidden' : ''; });
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { menu.classList.remove('open'); btn.classList.remove('menu-open'); document.body.style.overflow = ''; }));
}

function initCounters() {
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (!e.isIntersecting) return; const card = e.target, target = parseInt(card.dataset.count), suffix = card.dataset.suffix || '', numEl = card.querySelector('.stat-number'); if (!numEl) return; const startTime = performance.now(); function tick(now) { const p = Math.min((now - startTime) / 2000, 1); numEl.textContent = Math.round((1 - Math.pow(1 - p, 4)) * target).toLocaleString('fr') + suffix; if (p < 1) requestAnimationFrame(tick); } requestAnimationFrame(tick); obs.unobserve(card); }); }, { threshold: 0.3 });
    document.querySelectorAll('.stat-card').forEach(c => obs.observe(c));
}

function initMarquee() {
    const t1 = ['React','Vue.js','Next.js','Node.js','Python','TypeScript','PostgreSQL','MongoDB','Redis','Docker','AWS','Vercel','Stripe','OpenAI','TailwindCSS','GraphQL'];
    const t2 = ['Firebase','Supabase','Prisma','tRPC','Cloudflare','Twilio','SendGrid','Zapier','Make','n8n','HubSpot','Slack','Discord','Figma','GitHub','VS Code'];
    function build(id, items) { const r = document.getElementById(id); if (!r) return; r.innerHTML = items.map(t => `<span class="marquee-pill">${t}</span>`).join('') + items.map(t => `<span class="marquee-pill">${t}</span>`).join(''); }
    build('marquee-row-1', t1); build('marquee-row-2', t2);
}

function initServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    const svcs = [
        { icon: '🌐', title: 'Sites Web', desc: 'Sites vitrines, landing pages, e-commerce. Design premium, SEO-ready, ultra-rapides.', color: '#00f0ff', anim: 'browser' },
        { icon: '📊', title: 'CRM & ERP', desc: 'Outils de gestion clients sur mesure. Pipelines, automatisations, dashboards.', color: '#bf00ff', anim: 'dashboard' },
        { icon: '🤖', title: 'Chatbot IA', desc: 'Assistants virtuels intelligents. Intégration WhatsApp, site, Messenger.', color: '#ff006e', anim: 'chat' },
        { icon: '⚡', title: 'Automatisation', desc: 'Workflows automatisés entre vos outils. Zapier, Make, n8n, scripts custom.', color: '#ff8c00', anim: 'flow' },
        { icon: '🔍', title: 'SEO Technique', desc: 'Audit complet, Core Web Vitals. Résultats mesurables en 30 jours.', color: '#00ff87', anim: 'chart' },
        { icon: '🛡️', title: 'Sécurité', desc: 'SSL, WAF, audit OWASP, RGPD. Protection complète de vos assets.', color: '#ffd700', anim: 'shield' }
    ];
    grid.innerHTML = svcs.map((s, i) => `<div class="bento-card reveal" style="--card-glow:${s.color}30;transition-delay:${i*0.1}s" data-tilt><div class="bento-card-glow"></div><div class="bento-icon" style="background:${s.color}15;color:${s.color}">${s.icon}</div><h3 class="font-display font-bold text-lg mb-2">${s.title}</h3><p class="text-surface-400 text-sm leading-relaxed">${s.desc}</p><div class="bento-mini-anim" id="bento-anim-${s.anim}"></div></div>`).join('');
    grid.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; card.style.transform = `perspective(1000px) rotateY(${x*8}deg) rotateX(${-y*8}deg) translateY(-4px)`; const g = card.querySelector('.bento-card-glow'); if(g) { g.style.setProperty('--mouse-x', (e.clientX-r.left)+'px'); g.style.setProperty('--mouse-y', (e.clientY-r.top)+'px'); } });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
    initBentoAnims();
}

function initBentoAnims() {
    const anims = { browser: '<div style="padding:8px"><div style="height:8px;background:rgba(0,240,255,0.3);border-radius:4px;margin-bottom:6px;width:60%;animation:bp 2s ease infinite"></div><div style="height:40px;background:rgba(0,240,255,0.1);border-radius:4px;margin-bottom:6px;animation:bp 2s ease infinite 0.3s"></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:4px"><div style="height:30px;background:rgba(0,240,255,0.08);border-radius:4px;animation:bp 2s ease infinite 0.6s"></div><div style="height:30px;background:rgba(0,240,255,0.08);border-radius:4px;animation:bp 2s ease infinite 0.9s"></div></div></div>',
        dashboard: '<div style="padding:8px;display:grid;grid-template-columns:1fr 1fr;gap:4px"><div style="height:20px;background:rgba(191,0,255,0.15);border-radius:4px"></div><div style="height:20px;background:rgba(191,0,255,0.1);border-radius:4px"></div><div style="grid-column:span 2;height:50px;background:linear-gradient(90deg,rgba(191,0,255,0.2),rgba(191,0,255,0.05));border-radius:4px;overflow:hidden"><div style="height:70%;margin-top:auto;background:rgba(191,0,255,0.15);border-radius:4px;animation:bp 2s ease infinite"></div></div></div>',
        chat: '<div style="padding:8px"><div style="display:flex;margin-bottom:6px"><div style="height:12px;background:rgba(255,0,110,0.15);border-radius:8px;width:60%;animation:bp 3s ease infinite"></div></div><div style="display:flex;justify-content:flex-end;margin-bottom:6px"><div style="height:12px;background:rgba(255,0,110,0.25);border-radius:8px;width:50%;animation:bp 3s ease infinite 0.5s"></div></div><div style="display:flex"><div style="height:12px;background:rgba(255,0,110,0.1);border-radius:8px;width:70%;animation:bp 3s ease infinite 1s"></div></div></div>',
        flow: '<div style="padding:12px;display:flex;align-items:center;justify-content:center;gap:8px;height:100%"><div style="width:20px;height:20px;border-radius:50%;background:rgba(255,140,0,0.3);animation:bp 1.5s ease infinite"></div><div style="width:20px;height:2px;background:rgba(255,140,0,0.3)"></div><div style="width:20px;height:20px;border-radius:50%;background:rgba(255,140,0,0.3);animation:bp 1.5s ease infinite 0.3s"></div><div style="width:20px;height:2px;background:rgba(255,140,0,0.3)"></div><div style="width:20px;height:20px;border-radius:50%;background:rgba(255,140,0,0.3);animation:bp 1.5s ease infinite 0.6s"></div></div>',
        chart: '<svg viewBox="0 0 200 80" style="width:100%;height:100%;padding:8px"><polyline points="10,70 40,50 70,55 100,30 130,35 160,15 190,20" fill="none" stroke="rgba(0,255,135,0.5)" stroke-width="2"><animate attributeName="stroke-dasharray" from="0,300" to="300,0" dur="2s" repeatCount="indefinite"/></polyline></svg>',
        shield: '<div style="display:flex;align-items:center;justify-content:center;height:100%"><div style="width:40px;height:50px;border:2px solid rgba(255,215,0,0.3);border-radius:0 0 20px 20px;animation:bp 2s ease infinite"><div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;background:rgba(255,215,0,0.4);border-radius:50%"></div></div></div>'
    };
    for (const [k, v] of Object.entries(anims)) { const el = document.getElementById('bento-anim-' + k); if (el) el.innerHTML = v; }
    if (!document.getElementById('bp-style')) { const s = document.createElement('style'); s.id = 'bp-style'; s.textContent = '@keyframes bp{0%,100%{opacity:.5;transform:scaleX(.8)}50%{opacity:1;transform:scaleX(1)}}'; document.head.appendChild(s); }
}

/* ========== HERO TERMINAL ========== */
function initHeroTerminal() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const days = [
        { day: 'JOUR 1 \u2014 Discovery & Architecture', steps: [
            { t: '$ flashai init --project "VotreProjet"', cls: 't-green', d: 800 },
            { t: '\u2192 Analyse des besoins client...', cls: 't-blue', d: 1000 },
            { t: '\u2713 Brief client valid\u00e9 (12 user stories)', cls: 't-green', d: 800 },
            { t: '\u2192 Design de l\'architecture technique...', cls: 't-blue', d: 1200 },
            { t: '  \u251C\u2500 Frontend: Next.js 14 + TypeScript', cls: 't-gray', d: 600 },
            { t: '  \u251C\u2500 Backend: Node.js + PostgreSQL', cls: 't-gray', d: 600 },
            { t: '  \u2514\u2500 IA: GPT-4 + RAG Pipeline', cls: 't-gray', d: 600 },
            { t: '\u2713 Architecture valid\u00e9e par lead dev', cls: 't-green', d: 800 },
            { t: '\u2713 Maquettes Figma livr\u00e9es (14 \u00e9crans)', cls: 't-green', d: 1000 },
            { t: '', cls: 'progress', color: '#00f0ff', d: 1500 }
        ]},
        { day: 'JOUR 2-3 \u2014 D\u00e9veloppement Frontend', steps: [
            { t: '$ flashai build --frontend', cls: 't-green', d: 800 },
            { t: '\u2192 Cr\u00e9ation des composants React (47)...', cls: 't-blue', d: 1000 },
            { t: '\u2713 Design system impl\u00e9ment\u00e9', cls: 't-green', d: 800 },
            { t: '\u2713 Pages responsives (mobile + desktop)', cls: 't-green', d: 800 },
            { t: '\u2713 Animations & micro-interactions', cls: 't-green', d: 800 },
            { t: '\u2713 Accessibilit\u00e9 WCAG 2.1 AA', cls: 't-green', d: 600 },
            { t: '', cls: 'progress', color: '#bf00ff', d: 1500 }
        ]},
        { day: 'JOUR 4 \u2014 Backend & Int\u00e9grations', steps: [
            { t: '$ flashai build --backend --integrations', cls: 't-green', d: 800 },
            { t: '\u2192 API REST + GraphQL endpoints...', cls: 't-blue', d: 1000 },
            { t: '\u2713 Base de donn\u00e9es PostgreSQL (12 tables)', cls: 't-green', d: 800 },
            { t: '\u2713 Auth JWT + OAuth 2.0 configur\u00e9', cls: 't-green', d: 800 },
            { t: '\u2713 Int\u00e9gration Stripe paiements', cls: 't-green', d: 600 },
            { t: '\u2713 Chatbot IA connect\u00e9 (RAG pipeline)', cls: 't-green', d: 800 },
            { t: '', cls: 'progress', color: '#ff006e', d: 1500 }
        ]},
        { day: 'JOUR 5 \u2014 Tests, S\u00e9curit\u00e9 & D\u00e9ploiement', steps: [
            { t: '$ flashai test --full-suite', cls: 't-green', d: 800 },
            { t: '\u2192 Tests unitaires: 127/127 pass\u00e9s', cls: 't-blue', d: 1000 },
            { t: '\u2192 Tests E2E: 34/34 pass\u00e9s', cls: 't-blue', d: 800 },
            { t: '\u2713 Audit s\u00e9curit\u00e9 OWASP Top 10', cls: 't-green', d: 800 },
            { t: '\u2713 Lighthouse: 98/100 perf, 100 SEO', cls: 't-green', d: 800 },
            { t: '$ flashai deploy --production', cls: 't-green', d: 1000 },
            { t: '\u2192 CDN Cloudflare activ\u00e9 (34 pays)', cls: 't-blue', d: 800 },
            { t: '\u2192 SSL/TLS + WAF configur\u00e9s', cls: 't-blue', d: 600 },
            { t: '\u2713 Monitoring 24/7 activ\u00e9', cls: 't-green', d: 800 },
            { t: '', cls: 'progress', color: '#00ff87', d: 1500 },
            { t: '\u{1F680} LIVE \u2014 votresite.com \u2014 47ms response', cls: 't-green t-bold', d: 1200 }
        ]}
    ];

    let dayIdx = 0;

    async function runDay() {
        const day = days[dayIdx % days.length];

        // Day marker
        const marker = document.createElement('div');
        marker.className = 'terminal-day-marker';
        marker.textContent = day.day;
        marker.style.cssText = 'opacity:0;transform:translateY(-5px);transition:all 0.4s';
        output.appendChild(marker);
        requestAnimationFrame(() => { marker.style.opacity = '1'; marker.style.transform = 'translateY(0)'; });
        output.scrollTop = output.scrollHeight;

        await new Promise(r => setTimeout(r, 600));

        for (const step of day.steps) {
            if (step.cls === 'progress') {
                // Progress bar
                const wrap = document.createElement('div');
                wrap.className = 'terminal-progress';
                const fill = document.createElement('div');
                fill.className = 'terminal-progress-fill';
                fill.style.background = step.color;
                wrap.appendChild(fill);
                output.appendChild(wrap);
                output.scrollTop = output.scrollHeight;
                await new Promise(r => setTimeout(r, 100));
                fill.style.width = '100%';
                await new Promise(r => setTimeout(r, step.d));
            } else {
                await new Promise(r => setTimeout(r, step.d));
                const div = document.createElement('div');
                div.innerHTML = step.t;
                if (step.cls) div.className = step.cls;
                div.style.cssText = 'opacity:0;transform:translateX(-5px);transition:all 0.3s';
                output.appendChild(div);
                requestAnimationFrame(() => { div.style.opacity = '1'; div.style.transform = 'translateX(0)'; });
                output.scrollTop = output.scrollHeight;
            }
        }

        await new Promise(r => setTimeout(r, 3000));
        output.appendChild(document.createElement('br'));
        dayIdx++;

        // Clean up old entries
        while (output.children.length > 50) output.removeChild(output.firstChild);
        runDay();
    }

    setTimeout(runDay, 2500);
}

function initDemoTabs() {
    document.querySelectorAll('.demo-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.demo-panel').forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const p = document.getElementById('demo-' + tab.dataset.demo);
            if (p) p.classList.add('active');
        });
    });
}

function initDemoCRM() {
    const ct = document.getElementById('demo-crm');
    if (!ct) return;
    const contacts = [
        { name: 'Marie Dupont', email: 'marie@acme.fr', value: '4 200 €', status: 'prospect', avatar: 'MD' },
        { name: 'Jean Martin', email: 'jean@startup.io', value: '8 500 €', status: 'prospect', avatar: 'JM' },
        { name: 'Sophie Bernard', email: 'sophie@tech.com', value: '12 000 €', status: 'encours', avatar: 'SB' },
        { name: 'Lucas Petit', email: 'lucas@digital.fr', value: '3 800 €', status: 'encours', avatar: 'LP' },
        { name: 'Emma Leroy', email: 'emma@design.co', value: '6 500 €', status: 'client', avatar: 'EL' },
        { name: 'Thomas Moreau', email: 'thomas@web.fr', value: '15 000 €', status: 'client', avatar: 'TM' }
    ];
    const columns = { prospect: 'Prospects', encours: 'En cours', client: 'Clients' };
    function render(filter='') {
        const filtered = contacts.filter(c => c.name.toLowerCase().includes(filter) || c.email.toLowerCase().includes(filter));
        ct.innerHTML = `<div class="crm-header"><h3 class="font-display font-bold text-lg">Mini CRM</h3><input type="text" class="crm-search" placeholder="Rechercher..." id="crm-si" value="${filter}"></div><div class="crm-columns">${Object.entries(columns).map(([key, label]) => { const items = filtered.filter(c => c.status === key); return `<div class="crm-column" data-col="${key}"><div class="crm-col-header"><span style="color:${key === 'prospect' ? '#ff8c00' : key === 'encours' ? '#00f0ff' : '#00ff87'}">${label}</span><span class="crm-col-count">${items.length}</span></div>${items.map(c => `<div class="crm-card" draggable="true" data-name="${c.name}"><div class="crm-card-name">${c.name}</div><div class="crm-card-email">${c.email}</div><div class="crm-card-value">${c.value}</div><div class="crm-card-actions"><button class="crm-action-btn" onclick="showToast('Appel ${c.name}...')">📞</button><button class="crm-action-btn" onclick="showToast('Email envoyé')">✉️</button></div></div>`).join('')}</div>`; }).join('')}</div>`;
        const si = document.getElementById('crm-si');
        if (si) { si.addEventListener('input', e => render(e.target.value.toLowerCase())); }
        ct.querySelectorAll('.crm-card').forEach(card => {
            card.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', card.dataset.name); card.classList.add('dragging'); });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });
        ct.querySelectorAll('.crm-column').forEach(col => {
            col.addEventListener('dragover', e => e.preventDefault());
            col.addEventListener('drop', e => { e.preventDefault(); const n = e.dataTransfer.getData('text/plain'); const c = contacts.find(x => x.name === n); if (c) { c.status = col.dataset.col; render(filter); showToast(n + ' déplacé'); } });
        });
    }
    render();
}

function initDemoDevis() {
    const ct = document.getElementById('demo-devis');
    if (!ct) return;
    const state = { step: 1, type: null, features: [], total: 0 };
    const types = [ { id: 'vitrine', name: 'Site Vitrine', icon: '🌐', price: 990 }, { id: 'ecommerce', name: 'E-Commerce', icon: '🛒', price: 2490 }, { id: 'crm', name: 'CRM / ERP', icon: '📊', price: 1990 }, { id: 'chatbot', name: 'Chatbot IA', icon: '🤖', price: 1490 }, { id: 'dashboard', name: 'Dashboard', icon: '📈', price: 1790 }, { id: 'auto', name: 'Automatisation', icon: '⚡', price: 890 } ];
    const features = [ { name: 'Design premium', price: 490 }, { name: 'SEO avancé', price: 390 }, { name: 'Multilingue', price: 290 }, { name: 'Analytics', price: 190 }, { name: 'Chatbot', price: 590 }, { name: 'API custom', price: 490 }, { name: 'Paiement', price: 390 }, { name: 'CRM intégré', price: 690 }, { name: 'Automatisations', price: 490 }, { name: 'Support prioritaire', price: 290 } ];
    function calc() { const base = state.type ? (types.find(t => t.id === state.type)?.price || 0) : 0; state.total = base + state.features.reduce((s, f) => s + (features.find(x => x.name === f)?.price || 0), 0); }
    function render() {
        calc();
        let body = '';
        if (state.step === 1) body = `<div class="devis-options">${types.map(t => `<div class="devis-option ${state.type === t.id ? 'selected' : ''}" data-type="${t.id}"><div class="devis-option-icon">${t.icon}</div><div class="devis-option-name">${t.name}</div><div class="devis-option-price">À partir de ${t.price} €</div></div>`).join('')}</div>`;
        else if (state.step === 2) body = `<div class="devis-features">${features.map(f => `<div class="devis-feature ${state.features.includes(f.name) ? 'checked' : ''}" data-feat="${f.name}"><div class="devis-feature-check">${state.features.includes(f.name) ? '✓' : ''}</div><span>${f.name}</span><span style="margin-left:auto;color:#00ff87;font-size:0.75rem">+${f.price}€</span></div>`).join('')}</div>`;
        else if (state.step === 3) body = '<div class="devis-options">' + ['Minimaliste','Moderne','Audacieux','Classique'].map((s,i) => `<div class="devis-option" style="border-color:${['#00f0ff','#bf00ff','#ff006e','#ffd700'][i]}30"><div class="devis-option-icon">${['🎨','💎','🔥','✨'][i]}</div><div class="devis-option-name">${s}</div></div>`).join('') + '</div>';
        else body = `<div style="text-align:center"><div class="devis-total"><div class="devis-total-label">Prix total</div><div class="devis-total-price">${state.total.toLocaleString('fr')} €</div></div><div style="margin-top:1rem;display:flex;gap:0.5rem;justify-content:center"><button class="btn-glow" onclick="showToast('Devis téléchargé !')"><span>Télécharger</span></button></div></div>`;
        ct.innerHTML = `<div class="devis-steps">${[1,2,3,4].map(s => `<div class="devis-step ${s===state.step?'active':''} ${s<state.step?'completed':''}"><span class="devis-step-num">${s<state.step?'✓':s}</span><span>${['Projet','Options','Style','Résumé'][s-1]}</span></div>`).join('')}</div><div class="devis-body">${body}</div><div class="devis-total" style="margin-top:1rem"><div class="devis-total-label">Estimation</div><div class="devis-total-price">${state.total.toLocaleString('fr')} €</div></div><div class="devis-nav-btns">${state.step>1?'<button class="btn-outline" id="dp">← Retour</button>':''}${state.step<4?'<button class="btn-glow" id="dn"><span>Suivant →</span></button>':''}</div>`;
        ct.querySelectorAll('.devis-option[data-type]').forEach(o => o.addEventListener('click', () => { state.type = o.dataset.type; render(); }));
        ct.querySelectorAll('.devis-feature').forEach(f => f.addEventListener('click', () => { const n = f.dataset.feat; state.features.includes(n) ? state.features = state.features.filter(x => x !== n) : state.features.push(n); render(); }));
        const p = ct.querySelector('#dp'), n = ct.querySelector('#dn');
        if (p) p.addEventListener('click', () => { state.step--; render(); });
        if (n) n.addEventListener('click', () => { state.step++; render(); });
    }
    render();
}

function initDemoChatbot() {
    const ct = document.getElementById('demo-chatbot');
    if (!ct) return;
    const responses = { prix: 'Nos tarifs commencent à 890€. Chaque projet est sur mesure.', delai: 'En moyenne 5 jours ouvrés. Projets complexes: 7-14 jours.', services: 'Sites web, CRM, chatbots IA, dashboards, automatisations, SEO, sécurité.', contact: 'Contactez-nous à contact@flashai.dev. Réponse en <2h !', technologie: 'React, Next.js, Node.js, Python, 200+ APIs connectées.', garantie: 'Garantie satisfait ou remboursé à 100%.', default: 'Je suis l\'assistant FlashAI. Posez vos questions sur nos services, tarifs ou technologies !' };
    const suggestions = ['Quels prix ?', 'Délai ?', 'Services ?', 'Garantie ?'];
    let messages = [{ from: 'bot', text: 'Bonjour ! 👋 Comment puis-je vous aider ?' }];
    function getResp(t) { const l = t.toLowerCase(); for (const [k, v] of Object.entries(responses)) { if (k !== 'default' && l.includes(k)) return v; } if (l.includes('bonjour')||l.includes('salut')) return 'Bonjour ! Comment puis-je vous aider ? 😊'; return responses.default; }
    function render() {
        ct.innerHTML = `<div class="chatbot-container"><div class="chatbot-messages" id="cm">${messages.map(m => `<div class="chat-msg ${m.from}"><div class="chat-avatar">${m.from==='bot'?'🤖':'👤'}</div><div class="chat-bubble">${m.text}</div></div>`).join('')}</div><div class="chat-suggestions">${suggestions.map(s => `<button class="chat-suggestion">${s}</button>`).join('')}</div><div class="chat-input-wrap"><input type="text" class="chat-input" id="ci" placeholder="Votre message..."><button class="chat-send" id="cs">Envoyer</button></div></div>`;
        const mc = document.getElementById('cm'); if (mc) mc.scrollTop = mc.scrollHeight;
        function send(text) { if (!text.trim()) return; messages.push({ from: 'user', text }); render(); setTimeout(() => { const mc2 = document.getElementById('cm'); if(mc2) { const t = document.createElement('div'); t.className='chat-msg bot'; t.id='ct'; t.innerHTML='<div class="chat-avatar">🤖</div><div class="chat-bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>'; mc2.appendChild(t); mc2.scrollTop=mc2.scrollHeight; } setTimeout(() => { const te = document.getElementById('ct'); if(te) te.remove(); messages.push({from:'bot',text:getResp(text)}); render(); }, 1200); }, 400); }
        const cs = document.getElementById('cs'), ci = document.getElementById('ci');
        if (cs) cs.addEventListener('click', () => send(ci?.value||''));
        if (ci) ci.addEventListener('keydown', e => { if(e.key==='Enter') send(ci.value); });
        ct.querySelectorAll('.chat-suggestion').forEach(b => b.addEventListener('click', () => send(b.textContent)));
    }
    render();
}

/* ========== DASHBOARD DEMO ========== */
function initDemoDashboard() {
    const ct = document.getElementById('demo-dashboard');
    if (!ct) return;
    const kpis = [
        { label: 'Visiteurs', value: '12,847', change: '+23%', color: '#00f0ff', icon: '👁️' },
        { label: 'Conversions', value: '342', change: '+18%', color: '#00ff87', icon: '🎯' },
        { label: 'Revenue', value: '€48,290', change: '+31%', color: '#bf00ff', icon: '💰' },
        { label: 'Satisfaction', value: '98%', change: '+2%', color: '#ffd700', icon: '⭐' }
    ];
    ct.innerHTML = `<div class="dashboard-demo">
        <div class="dash-header"><h3 class="font-display font-bold text-lg">Dashboard Analytics</h3>
        <div class="dash-period"><button class="dash-period-btn active" data-p="7j">7j</button><button class="dash-period-btn" data-p="30j">30j</button><button class="dash-period-btn" data-p="90j">90j</button></div></div>
        <div class="dash-kpis">${kpis.map(k => `<div class="dash-kpi" style="--kc:${k.color}"><div class="dash-kpi-icon">${k.icon}</div><div class="dash-kpi-value">${k.value}</div><div class="dash-kpi-label">${k.label}</div><div class="dash-kpi-change" style="color:${k.color}">${k.change}</div></div>`).join('')}</div>
        <div class="dash-charts"><canvas id="dash-line-chart" style="width:100%;height:150px"></canvas><canvas id="dash-bar-chart" style="width:100%;height:150px"></canvas></div></div>`;
    drawDashCharts();
    ct.querySelectorAll('.dash-period-btn').forEach(b => b.addEventListener('click', () => {
        ct.querySelectorAll('.dash-period-btn').forEach(x => x.classList.remove('active'));
        b.classList.add('active'); drawDashCharts();
    }));
}

function drawDashCharts() {
    const lc = document.getElementById('dash-line-chart');
    const bc = document.getElementById('dash-bar-chart');
    if (lc) {
        lc.width = lc.offsetWidth; lc.height = lc.offsetHeight;
        const ctx = lc.getContext('2d'), w = lc.width, h = lc.height;
        ctx.clearRect(0, 0, w, h);
        const pts = Array.from({length: 12}, () => Math.random() * 100 + 40);
        const pts2 = Array.from({length: 12}, () => Math.random() * 80 + 20);
        [{ data: pts, color: '#00f0ff' }, { data: pts2, color: '#bf00ff' }].forEach(line => {
            ctx.beginPath();
            const grad = ctx.createLinearGradient(0, 0, 0, h);
            grad.addColorStop(0, line.color + '40'); grad.addColorStop(1, 'transparent');
            line.data.forEach((v, i) => {
                const x = (i / (line.data.length - 1)) * (w - 40) + 20;
                const y = h - 20 - (v / 140) * (h - 40);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
            });
            ctx.strokeStyle = line.color; ctx.lineWidth = 2; ctx.stroke();
            const last = line.data[line.data.length - 1];
            ctx.lineTo(w - 20, h - 20); ctx.lineTo(20, h - 20); ctx.closePath();
            ctx.fillStyle = grad; ctx.fill();
        });
    }
    if (bc) {
        bc.width = bc.offsetWidth; bc.height = bc.offsetHeight;
        const ctx = bc.getContext('2d'), w = bc.width, h = bc.height;
        ctx.clearRect(0, 0, w, h);
        const bars = [65, 85, 55, 90, 70, 80];
        const colors = ['#00f0ff', '#bf00ff', '#ff006e', '#00ff87', '#ff8c00', '#ffd700'];
        bars.forEach((v, i) => {
            const bw = (w - 40) / bars.length - 4;
            const bh = (v / 100) * (h - 40);
            const x = 20 + i * ((w - 40) / bars.length) + 2;
            ctx.fillStyle = colors[i] + '80';
            ctx.beginPath(); ctx.roundRect(x, h - 20 - bh, bw, bh, 4); ctx.fill();
        });
    }
}

/* ========== COMPARISON ========== */
function initComparison() {
    const ct = document.getElementById('comparison-timeline');
    if (!ct) return;
    const rows = [
        { label: 'Délai de livraison', classic: '3 à 6 mois', flash: '5 à 14 jours', icon: '⏱️' },
        { label: 'Coût moyen', classic: '15 000 — 50 000€', flash: '890 — 4 990€', icon: '💰' },
        { label: 'Technologies', classic: 'WordPress / Wix', flash: 'React, Next.js, IA', icon: '⚙️' },
        { label: 'Maintenance', classic: '200€/mois min', flash: 'Incluse 12 mois', icon: '🔧' },
        { label: 'Performance', classic: 'Lighthouse ~60', flash: 'Lighthouse 95+', icon: '🚀' },
        { label: 'Support', classic: 'Email lent', flash: '< 2h, 24/7', icon: '💬' },
        { label: 'Personnalisation', classic: 'Templates limités', flash: '100% sur mesure', icon: '🎨' },
        { label: 'SEO', classic: 'Basique', flash: 'Avancé, optimisé IA', icon: '🔍' }
    ];
    ct.innerHTML = `<div class="comp-table">
        <div class="comp-header"><div class="comp-h-label"></div><div class="comp-h-classic">Agence classique</div><div class="comp-h-flash">FlashAI ⚡</div></div>
        ${rows.map((r, i) => `<div class="comp-row reveal" style="transition-delay:${i * 0.08}s">
            <div class="comp-label"><span class="comp-icon">${r.icon}</span>${r.label}</div>
            <div class="comp-classic"><span class="comp-badge-classic">${r.classic}</span></div>
            <div class="comp-flash"><span class="comp-badge-flash">${r.flash}</span></div>
        </div>`).join('')}
    </div>`;
}

/* ========== EXPERTISE ========== */
function initExpertise() {
    const ct = document.getElementById('expertise-carousel');
    if (!ct) return;
    const cards = [
        { title: 'Frontend', icon: '🎨', color: '#00f0ff', skills: [['React / Next.js', 95], ['Vue / Nuxt', 88], ['TypeScript', 92], ['TailwindCSS', 98], ['Three.js / GSAP', 85]] },
        { title: 'Backend', icon: '⚙️', color: '#bf00ff', skills: [['Node.js / Express', 94], ['Python / FastAPI', 90], ['PostgreSQL', 92], ['MongoDB / Redis', 88], ['GraphQL / REST', 95]] },
        { title: 'IA & Data', icon: '🧠', color: '#ff006e', skills: [['OpenAI / GPT', 96], ['LangChain', 88], ['RAG Systems', 85], ['NLP / NLU', 82], ['Data Pipeline', 87]] },
        { title: 'DevOps', icon: '🚀', color: '#00ff87', skills: [['Docker / K8s', 90], ['AWS / GCP', 92], ['CI/CD', 95], ['Monitoring', 88], ['Sécurité', 91]] }
    ];
    ct.innerHTML = `<div class="expertise-grid">${cards.map((c, i) => `<div class="expertise-card reveal" style="transition-delay:${i * 0.15}s;--ec:${c.color}">
        <div class="expertise-card-front">
            <div class="expertise-icon" style="background:${c.color}15;color:${c.color}">${c.icon}</div>
            <h3 class="font-display font-bold text-xl mb-4">${c.title}</h3>
            <div class="expertise-bars">${c.skills.map(s => `<div class="expertise-bar-row"><span class="text-xs text-surface-300">${s[0]}</span><div class="expertise-bar-bg"><div class="expertise-bar-fill" style="width:${s[1]}%;background:${c.color}" data-width="${s[1]}"></div></div><span class="text-xs" style="color:${c.color}">${s[1]}%</span></div>`).join('')}</div>
        </div>
    </div>`).join('')}</div>`;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) {
            e.target.querySelectorAll('.expertise-bar-fill').forEach(bar => {
                bar.style.width = '0%';
                setTimeout(() => { bar.style.transition = 'width 1.2s cubic-bezier(0.22,1,0.36,1)'; bar.style.width = bar.dataset.width + '%'; }, 200);
            });
            obs.unobserve(e.target);
        }});
    }, { threshold: 0.3 });
    ct.querySelectorAll('.expertise-card').forEach(c => obs.observe(c));
}

/* ========== METHOD TIMELINE ========== */
function initMethodTimeline() {
    const ct = document.getElementById('method-timeline');
    if (!ct) return;
    const steps = [
        { num: '01', title: 'Discovery', desc: 'Appel de 30 min pour comprendre vos besoins, objectifs et contraintes. Analyse de l\'existant et recommandations.', icon: '🎯', color: '#00f0ff', duration: '30 min' },
        { num: '02', title: 'Prototype', desc: 'Maquette interactive livrée en 48h. Vous validez le design, l\'UX et les fonctionnalités avant le développement.', icon: '✏️', color: '#bf00ff', duration: '48h' },
        { num: '03', title: 'Build', desc: 'Développement agile avec démos quotidiennes. Stack moderne, code propre, tests automatisés.', icon: '⚡', color: '#ff006e', duration: '3-10 jours' },
        { num: '04', title: 'Launch', desc: 'Déploiement, formation, documentation. Support prioritaire inclus 12 mois. Monitoring 24/7.', icon: '🚀', color: '#00ff87', duration: 'J+0' }
    ];
    ct.innerHTML = `<div class="method-steps">${steps.map((s, i) => `<div class="method-step reveal" style="transition-delay:${i * 0.2}s">
        <div class="method-step-line" style="background:${s.color}"></div>
        <div class="method-step-dot" style="background:${s.color};box-shadow:0 0 20px ${s.color}60"><span>${s.icon}</span></div>
        <div class="method-step-content">
            <div class="method-step-num" style="color:${s.color}">${s.num}</div>
            <h3 class="font-display font-bold text-xl mb-2">${s.title}</h3>
            <p class="text-surface-400 text-sm leading-relaxed mb-3">${s.desc}</p>
            <span class="method-step-duration" style="color:${s.color}">${s.duration}</span>
        </div>
    </div>`).join('')}</div>`;
}

/* ========== PORTFOLIO ========== */
function initPortfolio() {
    const ct = document.getElementById('portfolio-carousel');
    if (!ct) return;
    const projects = [
        { title: 'TechVision SaaS', type: 'Dashboard', desc: 'Plateforme analytics temps réel avec 50+ widgets personnalisables.', color: '#00f0ff', tags: ['React','D3.js','Node.js'], stat: '+340% adoption' },
        { title: 'FoodExpress', type: 'E-Commerce', desc: 'Marketplace food-tech avec livraison temps réel et paiement Stripe.', color: '#ff006e', tags: ['Next.js','Stripe','Maps'], stat: '€2M CA/an' },
        { title: 'MediCare Pro', type: 'CRM Médical', desc: 'Gestion patients, RDV, facturation. Conforme RGPD.', color: '#bf00ff', tags: ['React','PostgreSQL','IA'], stat: '5000+ patients' },
        { title: 'CryptoTrack', type: 'Fintech', desc: 'Portfolio crypto avec alertes IA et analyse prédictive.', color: '#00ff87', tags: ['Vue.js','Python','ML'], stat: '15K users' },
        { title: 'EduSmart', type: 'EdTech', desc: 'Plateforme e-learning adaptive avec chatbot tuteur IA.', color: '#ffd700', tags: ['Next.js','OpenAI','Prisma'], stat: '98% satisfaction' },
        { title: 'LogiFlow', type: 'Automatisation', desc: 'ERP logistique avec tracking temps réel et optimisation routes.', color: '#ff8c00', tags: ['React','Node.js','Maps'], stat: '-40% coûts' },
        { title: 'GreenEnergy', type: 'IoT Dashboard', desc: 'Monitoring énergie solaire avec prédictions ML.', color: '#06b6d4', tags: ['React','Python','IoT'], stat: '+60% efficacité' },
        { title: 'LegalBot', type: 'Chatbot IA', desc: 'Assistant juridique IA pour cabinets d\'avocats. RAG + GPT-4.', color: '#e879f9', tags: ['LangChain','GPT-4','React'], stat: '10K requêtes/j' }
    ];
    let current = 0;
    function render() {
        ct.innerHTML = projects.map((p, i) => {
            const offset = i - current;
            const absOff = Math.abs(offset);
            const z = 10 - absOff;
            const step = window.innerWidth < 480 ? 180 : window.innerWidth < 640 ? 220 : window.innerWidth < 768 ? 270 : 320;
            const tx = offset * step;
            const sc = Math.max(0.7, 1 - absOff * 0.12);
            const op = Math.max(0.3, 1 - absOff * 0.3);
            return `<div class="portfolio-card" style="transform:translateX(${tx}px) scale(${sc});z-index:${z};opacity:${op};${absOff > (window.innerWidth < 640 ? 1 : 2) ? 'display:none' : ''}">
                <div class="portfolio-card-inner" style="--pc:${p.color}">
                    <div class="portfolio-card-top" style="background:linear-gradient(135deg,${p.color}20,transparent)">
                        <span class="portfolio-type" style="color:${p.color}">${p.type}</span>
                        <span class="portfolio-stat" style="background:${p.color}20;color:${p.color}">${p.stat}</span>
                    </div>
                    <h3 class="font-display font-bold text-xl mb-2">${p.title}</h3>
                    <p class="text-surface-400 text-sm mb-4">${p.desc}</p>
                    <div class="portfolio-tags">${p.tags.map(t => `<span class="portfolio-tag" style="border-color:${p.color}40;color:${p.color}">${t}</span>`).join('')}</div>
                </div>
            </div>`;
        }).join('');
        const dots = document.getElementById('portfolio-dots');
        if (dots) dots.innerHTML = projects.map((_, i) => `<button class="portfolio-dot ${i === current ? 'active' : ''}" data-i="${i}"></button>`).join('');
        document.querySelectorAll('.portfolio-dot').forEach(d => d.addEventListener('click', () => { current = +d.dataset.i; render(); }));
    }
    render();
    const prev = document.getElementById('portfolio-prev');
    const next = document.getElementById('portfolio-next');
    if (prev) prev.addEventListener('click', () => { current = (current - 1 + projects.length) % projects.length; render(); });
    if (next) next.addEventListener('click', () => { current = (current + 1) % projects.length; render(); });
    let autoplay = setInterval(() => { current = (current + 1) % projects.length; render(); }, 4000);
    ct.addEventListener('mouseenter', () => clearInterval(autoplay));
    ct.addEventListener('mouseleave', () => { autoplay = setInterval(() => { current = (current + 1) % projects.length; render(); }, 4000); });
    window.addEventListener('resize', () => render());
    // Touch swipe for mobile
    let touchStartX = 0;
    ct.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    ct.addEventListener('touchend', e => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 50) {
            if (dx < 0) current = (current + 1) % projects.length;
            else current = (current - 1 + projects.length) % projects.length;
            render();
        }
    }, { passive: true });
}

function initTestimonials() {
    const ct = document.getElementById('testimonials-container');
    if (!ct) return;
    const items = [
        { name: 'Marie Dupont', role: 'CEO, TechVision', text: 'FlashAI a transformé notre vision en réalité en seulement 8 jours. Le dashboard est incroyable, nos équipes l\'adorent. Le ROI a été immédiat.', rating: 5, avatar: 'MD', color: '#00f0ff' },
        { name: 'Thomas Martin', role: 'CTO, FoodExpress', text: 'On a économisé 40 000€ par rapport aux devis d\'agences classiques. Et le résultat est meilleur. Qualité exceptionnelle, support réactif.', rating: 5, avatar: 'TM', color: '#bf00ff' },
        { name: 'Sophie Bernard', role: 'Fondatrice, MediCare', text: 'Le CRM médical est parfait. Conforme RGPD, intuitif, et nos patients adorent le portail en ligne. Support 24/7 vraiment réactif.', rating: 5, avatar: 'SB', color: '#ff006e' },
        { name: 'Lucas Chen', role: 'PM, CryptoTrack', text: 'L\'intégration IA est bluffante. Le chatbot comprend vraiment nos clients. Taux de satisfaction passé de 72% à 96%.', rating: 5, avatar: 'LC', color: '#00ff87' },
        { name: 'Emma Laurent', role: 'Directrice, EduSmart', text: 'Plateforme livrée en 5 jours, alors que d\'autres agences demandaient 3 mois. Qualité irréprochable et prix imbattable.', rating: 5, avatar: 'EL', color: '#ffd700' }
    ];
    ct.innerHTML = `<div class="testimonials-track">${items.map((t, i) => `<div class="testimonial-card reveal" style="transition-delay:${i * 0.12}s;--tc:${t.color}">
        <div class="testimonial-quote">"</div>
        <p class="text-surface-200 text-sm leading-relaxed mb-6">${t.text}</p>
        <div class="testimonial-stars">${'★'.repeat(t.rating)}</div>
        <div class="testimonial-author">
            <div class="testimonial-avatar" style="background:${t.color}30;color:${t.color}">${t.avatar}</div>
            <div><div class="font-bold text-sm">${t.name}</div><div class="text-xs text-surface-400">${t.role}</div></div>
        </div>
    </div>`).join('')}</div>`;
}

/* ========== GALAXY VISUALIZATION ========== */
function initGalaxy() {
    const container = document.getElementById('galaxy-container');
    const canvas = document.getElementById('galaxy-canvas');
    if (!canvas || !container || window.innerWidth < 768) return;
    const ctx = canvas.getContext('2d');
    let w, h, cx, cy, mouseX = 0, mouseY = 0, hoveredTool = null;

    const categories = {
        'Frontend': { color: '#00f0ff', tools: ['React','Vue.js','Next.js','Angular','Svelte','Nuxt','Gatsby','Remix','Astro','Solid'], orbit: 1 },
        'Backend': { color: '#bf00ff', tools: ['Node.js','Python','Go','Rust','PHP','Ruby','Java','Elixir','Deno','Bun'], orbit: 2 },
        'Database': { color: '#ff006e', tools: ['PostgreSQL','MongoDB','Redis','Supabase','Firebase','MySQL','DynamoDB','Prisma','Drizzle','PlanetScale'], orbit: 3 },
        'IA / ML': { color: '#ffd700', tools: ['OpenAI','LangChain','Pinecone','Replicate','Hugging Face','TensorFlow','PyTorch','Anthropic','Mistral','Cohere'], orbit: 4 },
        'DevOps': { color: '#00ff87', tools: ['Docker','AWS','Vercel','Cloudflare','GitHub Actions','Terraform','K8s','Nginx','Netlify','Railway'], orbit: 5 },
        'Outils': { color: '#ff8c00', tools: ['Stripe','Twilio','SendGrid','Zapier','Make','n8n','Segment','Mixpanel','Sentry','Datadog'], orbit: 6 }
    };

    function resize() {
        const rect = container.getBoundingClientRect();
        w = canvas.width = rect.width;
        h = canvas.height = rect.height;
        cx = w / 2; cy = h / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    container.addEventListener('mousemove', e => {
        const rect = container.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });
    container.addEventListener('mouseleave', () => { hoveredTool = null; });

    // Star field
    const stars = Array.from({length: 200}, () => ({
        x: Math.random(), y: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        speed: Math.random() * 0.0003 + 0.0001,
        brightness: Math.random()
    }));

    // Nebula particles
    const nebulae = Array.from({length: 30}, () => ({
        x: Math.random(), y: Math.random(),
        size: Math.random() * 80 + 40,
        color: ['#00f0ff','#bf00ff','#ff006e','#ffd700'][Math.floor(Math.random() * 4)],
        alpha: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.0002 + 0.0001
    }));

    // Build tool positions
    const toolPositions = [];
    const catEntries = Object.entries(categories);
    catEntries.forEach(([catName, cat]) => {
        const orbitRadius = (cat.orbit / 7) * Math.min(cx, cy) * 0.85 + 50;
        cat.tools.forEach((tool, i) => {
            const baseAngle = (i / cat.tools.length) * Math.PI * 2;
            toolPositions.push({
                name: tool, category: catName, color: cat.color,
                orbit: orbitRadius, baseAngle, angle: baseAngle,
                speed: (0.0004 + Math.random() * 0.0003) * (cat.orbit % 2 === 0 ? -1 : 1),
                size: 24 + Math.random() * 8,
                pulsePhase: Math.random() * Math.PI * 2
            });
        });
    });

    // Comet trails
    const comets = [];
    function spawnComet() {
        comets.push({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * Math.min(cx, cy) * 0.3 + 80,
            speed: Math.random() * 0.02 + 0.015,
            life: 1, decay: 0.005 + Math.random() * 0.005,
            trail: [],
            color: ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87'][Math.floor(Math.random() * 5)]
        });
    }

    let time = 0;
    function draw() {
        ctx.clearRect(0, 0, w, h);
        time++;

        // Nebulae
        nebulae.forEach(n => {
            n.x += n.speed; n.y += n.speed * 0.5;
            if (n.x > 1.2) n.x = -0.2; if (n.y > 1.2) n.y = -0.2;
            const grad = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, n.size);
            grad.addColorStop(0, n.color + '15');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.arc(n.x * w, n.y * h, n.size, 0, Math.PI * 2); ctx.fill();
        });

        // Stars
        stars.forEach(s => {
            s.brightness = 0.3 + Math.sin(time * 0.02 + s.x * 10) * 0.4 + 0.3;
            ctx.fillStyle = `rgba(255,255,255,${s.brightness})`;
            ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2); ctx.fill();
        });

        // Center glow
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80);
        cg.addColorStop(0, 'rgba(0,240,255,0.15)');
        cg.addColorStop(0.5, 'rgba(191,0,255,0.05)');
        cg.addColorStop(1, 'transparent');
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.fill();

        // Orbit rings
        catEntries.forEach(([_, cat]) => {
            const r = (cat.orbit / 7) * Math.min(cx, cy) * 0.85 + 50;
            ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.strokeStyle = cat.color + '12'; ctx.lineWidth = 1; ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]);
        });

        // Comets
        if (Math.random() < 0.01 && comets.length < 3) spawnComet();
        for (let i = comets.length - 1; i >= 0; i--) {
            const c = comets[i];
            c.angle += c.speed; c.life -= c.decay;
            const px = cx + Math.cos(c.angle) * c.radius;
            const py = cy + Math.sin(c.angle) * c.radius * 0.6;
            c.trail.push({ x: px, y: py }); if (c.trail.length > 20) c.trail.shift();
            c.trail.forEach((pt, ti) => {
                const a = (ti / c.trail.length) * c.life * 0.6;
                ctx.fillStyle = c.color + Math.floor(a * 255).toString(16).padStart(2, '0');
                ctx.beginPath(); ctx.arc(pt.x, pt.y, 2 * (ti / c.trail.length), 0, Math.PI * 2); ctx.fill();
            });
            if (c.life <= 0) comets.splice(i, 1);
        }

        // Tools
        hoveredTool = null;
        toolPositions.forEach(t => {
            t.angle += t.speed;
            const x = cx + Math.cos(t.angle) * t.orbit;
            const y = cy + Math.sin(t.angle) * t.orbit * 0.55;
            t.cx = x; t.cy = y;

            const pulse = Math.sin(time * 0.03 + t.pulsePhase) * 0.15 + 1;
            const dist = Math.hypot(mouseX - x, mouseY - y);
            const isHovered = dist < t.size + 5;
            if (isHovered) hoveredTool = t;
            const scale = isHovered ? 1.3 : pulse;
            const s = t.size * scale;

            // Hexagon shape
            ctx.save();
            ctx.translate(x, y);
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (i / 6) * Math.PI * 2 - Math.PI / 6;
                i === 0 ? ctx.moveTo(Math.cos(a) * s / 2, Math.sin(a) * s / 2) : ctx.lineTo(Math.cos(a) * s / 2, Math.sin(a) * s / 2);
            }
            ctx.closePath();
            ctx.fillStyle = isHovered ? t.color + '50' : t.color + '20';
            ctx.fill();
            ctx.strokeStyle = t.color + (isHovered ? 'cc' : '60');
            ctx.lineWidth = isHovered ? 2 : 1;
            ctx.stroke();

            if (isHovered) {
                ctx.shadowColor = t.color; ctx.shadowBlur = 20;
                ctx.stroke(); ctx.shadowBlur = 0;
            }

            // Tool name
            ctx.fillStyle = isHovered ? '#fff' : t.color + 'cc';
            ctx.font = `${isHovered ? 'bold ' : ''}${Math.max(8, s * 0.32)}px "Space Grotesk", sans-serif`;
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(t.name, 0, 0);
            ctx.restore();
        });

        // Tooltip
        const tooltip = document.getElementById('galaxy-tooltip');
        if (hoveredTool && tooltip) {
            tooltip.style.display = 'block';
            tooltip.style.left = hoveredTool.cx + 'px';
            tooltip.style.top = (hoveredTool.cy - 40) + 'px';
            tooltip.innerHTML = `<strong style="color:${hoveredTool.color}">${hoveredTool.name}</strong><br><span style="font-size:11px;color:#94a3b8">${hoveredTool.category}</span>`;
        } else if (tooltip) {
            tooltip.style.display = 'none';
        }

        requestAnimationFrame(draw);
    }
    draw();

    // Search filter
    const searchInput = document.getElementById('tools-search');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            const q = e.target.value.toLowerCase();
            toolPositions.forEach(t => {
                t.size = (!q || t.name.toLowerCase().includes(q)) ? 24 + Math.random() * 8 : 10;
            });
        });
    }
}

function initToolsMobile() {
    if (window.innerWidth >= 768) return;
    const grid = document.getElementById('tools-mobile-grid');
    if (!grid) return;
    const tools = ['React','Next.js','Vue.js','Node.js','Python','TypeScript','PostgreSQL','MongoDB','Redis','Docker','AWS','Vercel','Stripe','OpenAI','TailwindCSS','GraphQL','Firebase','Supabase','Prisma','LangChain','Cloudflare','Twilio','GitHub Actions','Terraform'];
    const colors = ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87','#ff8c00'];
    grid.innerHTML = tools.map((t, i) => `<div class="tool-mobile-pill" style="border-color:${colors[i % colors.length]}40;color:${colors[i % colors.length]}">${t}</div>`).join('');
}

function initGalaxyCategories() {
    const ct = document.getElementById('galaxy-categories');
    if (!ct) return;
    const cats = [
        { name: 'Frontend', color: '#00f0ff', count: 10 },
        { name: 'Backend', color: '#bf00ff', count: 10 },
        { name: 'Database', color: '#ff006e', count: 10 },
        { name: 'IA / ML', color: '#ffd700', count: 10 },
        { name: 'DevOps', color: '#00ff87', count: 10 },
        { name: 'Outils', color: '#ff8c00', count: 10 }
    ];
    ct.innerHTML = `<div class="galaxy-cats-row">${cats.map(c => `<div class="galaxy-cat-pill" style="border-color:${c.color}40;color:${c.color}"><span class="galaxy-cat-dot" style="background:${c.color}"></span>${c.name}<span class="galaxy-cat-count">${c.count}</span></div>`).join('')}</div>`;
}

/* ========== PRICING 3D ========== */
function initPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;
    const toggle = document.getElementById('pricing-toggle');
    let annual = false;

    const plans = [
        {
            name: 'Starter', icon: '\u{1F680}', price: 890, annualPrice: 712,
            desc: 'Parfait pour d\u00e9marrer votre pr\u00e9sence digitale avec un site performant.',
            color: '#00f0ff', rgb: '0,240,255',
            features: ['Site vitrine responsive premium','Design sur mesure (pas de template)','SEO technique optimis\u00e9','H\u00e9bergement 3 mois inclus','Score Lighthouse 95+ garanti','Support email 3 mois','Livraison en 3-5 jours']
        },
        {
            name: 'Business', icon: '\u26A1', price: 2490, annualPrice: 1992,
            desc: 'La solution compl\u00e8te pour scaler avec CRM, IA et automatisations.',
            color: '#bf00ff', rgb: '191,0,255', featured: true,
            features: ['Tout Starter inclus','CRM/Dashboard int\u00e9gr\u00e9','Chatbot IA (GPT-4)','API & automatisations','Analytics avanc\u00e9','Support prioritaire 12 mois','Formation \u00e9quipe incluse','Int\u00e9grations illimit\u00e9es']
        },
        {
            name: 'Enterprise', icon: '\u{1F451}', price: 4990, annualPrice: 3992,
            desc: 'Infrastructure compl\u00e8te avec IA avanc\u00e9e et support d\u00e9di\u00e9.',
            color: '#ffd700', rgb: '255,215,0',
            features: ['Tout Business inclus','IA avanc\u00e9e (GPT-4, RAG, ML)','Infrastructure auto-scalable','Multi-langue / multi-pays','SLA 99.9% garanti','Account manager d\u00e9di\u00e9','Audit s\u00e9curit\u00e9 complet','Maintenance illimit\u00e9e','Architecture microservices']
        }
    ];

    function render() {
        grid.innerHTML = plans.map((p, i) => {
            const price = annual ? p.annualPrice : p.price;
            const oldPrice = annual ? p.price : null;
            return '<div class="pricing-card-3d ' + (p.featured ? 'pricing-featured' : '') + '" style="--pc:' + p.color + ';--pc-rgb:' + p.rgb + '">' +
                (p.featured ? '<div class="pricing-popular-badge">PLUS POPULAIRE</div>' : '') +
                '<div class="pricing-card-bg"></div>' +
                '<div class="pricing-card-content">' +
                '<div class="pricing-card-icon" style="background:' + p.color + '15;color:' + p.color + '">' + p.icon + '</div>' +
                '<div class="pricing-name">' + p.name + '</div>' +
                '<div class="pricing-price"><span class="pricing-currency">\u20AC</span><span class="pricing-amount" data-target="' + price + '">' + price.toLocaleString('fr') + '</span></div>' +
                (oldPrice ? '<div class="pricing-old-price">' + oldPrice.toLocaleString('fr') + ' \u20AC</div>' : '') +
                '<div class="pricing-desc">' + p.desc + '</div>' +
                '<div class="pricing-divider"></div>' +
                '<div class="pricing-features">' + p.features.map((f, fi) => '<div class="pricing-feature" style="animation-delay:' + (fi * 0.08) + 's"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M13.3 4.3L6 11.6 2.7 8.3" stroke="' + p.color + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg><span>' + f + '</span></div>').join('') + '</div>' +
                '<a href="#contact" class="pricing-cta ' + (p.featured ? 'pricing-cta-featured' : '') + '">Choisir ' + p.name + '</a>' +
                '</div></div>';
        }).join('');
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            annual = !annual;
            toggle.classList.toggle('active', annual);
            render();
        });
    }
    render();
}

function initROICalculator() {
    const budget = document.getElementById('roi-budget');
    const leads = document.getElementById('roi-leads');
    const conv = document.getElementById('roi-conv');
    if (!budget || !leads || !conv) return;

    function update() {
        const b = +budget.value, l = +leads.value, c = +conv.value;
        document.getElementById('roi-budget-val').textContent = b.toLocaleString('fr') + ' €';
        document.getElementById('roi-leads-val').textContent = l;
        document.getElementById('roi-conv-val').textContent = c + '%';

        const newConv = Math.min(c * 2.5, 25);
        const currentRevenue = l * (c / 100) * 500;
        const flashRevenue = l * 1.4 * (newConv / 100) * 500;
        const roi = Math.round(((flashRevenue - currentRevenue) / b) * 100);
        const savings = Math.round(flashRevenue - currentRevenue);

        document.getElementById('roi-number').textContent = '+' + roi + '%';
        document.getElementById('roi-detail').textContent = 'Gain estimé : ' + savings.toLocaleString('fr') + ' €/mois';

        // Draw chart
        const canvas = document.getElementById('roi-chart');
        if (canvas) {
            const ctx = canvas.getContext('2d'), w = canvas.width, h = canvas.height;
            ctx.clearRect(0, 0, w, h);
            const barW = 60, gap = 40;
            const maxH = h - 30;
            const maxVal = Math.max(currentRevenue, flashRevenue, 1);
            // Current
            const h1 = (currentRevenue / maxVal) * maxH * 0.8;
            ctx.fillStyle = '#475569';
            ctx.beginPath(); ctx.roundRect(w / 2 - barW - gap / 2, h - 15 - h1, barW, h1, 6); ctx.fill();
            ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter'; ctx.textAlign = 'center';
            ctx.fillText('Avant', w / 2 - barW / 2 - gap / 2, h - 2);
            // Flash
            const h2 = (flashRevenue / maxVal) * maxH * 0.8;
            const grad = ctx.createLinearGradient(0, h - 15 - h2, 0, h - 15);
            grad.addColorStop(0, '#00f0ff'); grad.addColorStop(1, '#bf00ff');
            ctx.fillStyle = grad;
            ctx.beginPath(); ctx.roundRect(w / 2 + gap / 2, h - 15 - h2, barW, h2, 6); ctx.fill();
            ctx.fillStyle = '#00f0ff'; ctx.fillText('FlashAI', w / 2 + barW / 2 + gap / 2, h - 2);
        }
    }
    [budget, leads, conv].forEach(el => el.addEventListener('input', update));
    update();
}

/* ========== FAQ KNOWLEDGE BASE ========== */
function initFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;

    const questions = [
        { q: 'Quels types de projets r\u00e9alisez-vous ?', a: 'FlashAI r\u00e9alise une gamme compl\u00e8te de projets digitaux sur mesure : <strong>sites web</strong> (vitrines, landing pages, e-commerce, portails), <strong>CRM et ERP personnalis\u00e9s</strong> avec pipelines commerciaux et automatisations int\u00e9gr\u00e9es, <strong>dashboards analytics</strong> temps r\u00e9el avec visualisations interactives, <strong>chatbots IA intelligents</strong> bas\u00e9s sur GPT-4 et Claude avec architecture RAG pour des r\u00e9ponses pr\u00e9cises, et des <strong>automatisations de processus m\u00e9tier</strong> via Zapier, Make, n8n et scripts custom. Chaque projet b\u00e9n\u00e9ficie d\'une approche 100% sur mesure, sans template, avec une livraison en 5 \u00e0 14 jours ouvrables. Notre expertise couvre \u00e9galement les applications mobiles (React Native), les int\u00e9grations API complexes et les solutions d\'intelligence artificielle avanc\u00e9e.', cat: 'general', icon: '\u{1F4CB}' },
        { q: 'Combien co\u00fbtent vos services ?', a: 'Nos tarifs sont con\u00e7us pour offrir le <strong>meilleur rapport qualit\u00e9-prix du march\u00e9</strong>, 3 \u00e0 5 fois moins cher qu\'une agence classique. <strong>Starter \u00e0 partir de 890\u20AC</strong> : site vitrine responsive avec design premium sur mesure, SEO optimis\u00e9 et h\u00e9bergement inclus 3 mois. <strong>Business \u00e0 partir de 2 490\u20AC</strong> : solution compl\u00e8te incluant CRM/Dashboard int\u00e9gr\u00e9, chatbot IA, automatisations et support prioritaire 12 mois. <strong>Enterprise \u00e0 partir de 4 990\u20AC</strong> : infrastructure scalable avec IA avanc\u00e9e (GPT-4, RAG, ML), SLA 99.9%, account manager d\u00e9di\u00e9 et maintenance illimit\u00e9e. Tous nos prix sont <strong>uniques et transparents</strong> \u2014 pas d\'abonnement cach\u00e9, pas de frais suppl\u00e9mentaires. Facilit\u00e9s de paiement disponibles.', cat: 'business', icon: '\u{1F4B0}' },
        { q: 'Quels sont vos d\u00e9lais de livraison ?', a: 'Nos d\u00e9lais sont parmi les plus rapides de l\'industrie gr\u00e2ce \u00e0 notre stack moderne et nos outils IA propri\u00e9taires. <strong>Site vitrine</strong> : 3 \u00e0 5 jours ouvrables. <strong>E-commerce complet</strong> : 7 \u00e0 14 jours. <strong>CRM/Dashboard</strong> : 5 \u00e0 10 jours. <strong>Chatbot IA</strong> : 3 \u00e0 7 jours. <strong>Automatisations</strong> : 2 \u00e0 5 jours. L\u00e0 o\u00f9 une agence classique met 3 \u00e0 6 mois, FlashAI livre en jours gr\u00e2ce \u00e0 une m\u00e9thodologie agile \u00e9prouv\u00e9e sur 50+ projets. Chaque \u00e9tape est valid\u00e9e avec vous en temps r\u00e9el via des d\u00e9mos quotidiennes, garantissant un r\u00e9sultat align\u00e9 avec vos attentes d\u00e8s la premi\u00e8re livraison.', cat: 'general', icon: '\u23F1\uFE0F' },
        { q: 'Quelles technologies utilisez-vous ?', a: 'Notre stack technologique couvre l\'ensemble de l\'\u00e9cosyst\u00e8me digital moderne. <strong>Frontend</strong> : React, Next.js 14, Vue.js, TypeScript, TailwindCSS, Three.js, GSAP pour des interfaces ultra-performantes. <strong>Backend</strong> : Node.js, Express, Python, FastAPI, Go pour des API robustes et scalables. <strong>Bases de donn\u00e9es</strong> : PostgreSQL, MongoDB, Redis, Supabase. <strong>Intelligence Artificielle</strong> : OpenAI GPT-4, Claude, LangChain, architectures RAG, fine-tuning de mod\u00e8les, NLP avanc\u00e9. <strong>DevOps</strong> : Docker, Kubernetes, AWS, GCP, Vercel, CI/CD automatis\u00e9. Au total, <strong>247+ outils et technologies</strong> ma\u00eetris\u00e9s par notre \u00e9quipe, garantissant le choix de la meilleure solution pour chaque projet.', cat: 'technique', icon: '\u2699\uFE0F' },
        { q: 'Proposez-vous une garantie satisfait ou rembours\u00e9 ?', a: 'Oui, nous offrons une <strong>garantie satisfait ou rembours\u00e9 \u00e0 100%</strong> \u2014 c\'est notre engagement qualit\u00e9 le plus fort. Vous validez chaque \u00e9tape du projet : brief, maquettes, prototype, d\u00e9veloppement. Les r\u00e9visions sont <strong>illimit\u00e9es</strong> jusqu\'\u00e0 votre enti\u00e8re satisfaction. Si le r\u00e9sultat final ne vous convient pas malgr\u00e9 nos efforts, nous vous remboursons int\u00e9gralement, <strong>sans conditions et sans d\u00e9lai</strong>. Sur 50+ projets livr\u00e9s \u00e0 ce jour, nous comptons <strong>0 demande de remboursement</strong>, ce qui t\u00e9moigne de la qualit\u00e9 constante de nos livraisons et de notre approche centr\u00e9e client.', cat: 'business', icon: '\u{1F6E1}\uFE0F' },
        { q: 'Comment se d\u00e9roule un projet typique ?', a: 'Notre m\u00e9thodologie est structur\u00e9e en <strong>4 phases cl\u00e9s</strong> pour garantir un r\u00e9sultat optimal. <strong>Phase 1 \u2014 Discovery (30 min)</strong> : appel strat\u00e9gique pour comprendre vos besoins, objectifs business, contraintes techniques et cibles utilisateurs. <strong>Phase 2 \u2014 Prototype (48h)</strong> : maquette interactive haute fid\u00e9lit\u00e9 sur Figma, avec validation du design, de l\'UX et des parcours utilisateurs avant tout d\u00e9veloppement. <strong>Phase 3 \u2014 Build (3-10 jours)</strong> : d\u00e9veloppement agile avec d\u00e9mos quotidiennes, code review syst\u00e9matique et tests automatis\u00e9s. <strong>Phase 4 \u2014 Launch (J+0)</strong> : d\u00e9ploiement en production, formation de votre \u00e9quipe, documentation compl\u00e8te, et activation du monitoring 24/7. Support prioritaire inclus pendant 12 mois.', cat: 'general', icon: '\u{1F3AF}' },
        { q: 'Est-ce que je garde la propri\u00e9t\u00e9 de mon code ?', a: 'Absolument, <strong>\u00e0 100%</strong>. D\u00e8s la livraison, vous recevez le code source complet via un repository GitHub priv\u00e9, accompagn\u00e9 d\'une documentation technique d\u00e9taill\u00e9e. Tous les <strong>droits de propri\u00e9t\u00e9 intellectuelle</strong> vous sont transf\u00e9r\u00e9s. Aucun lock-in, aucune d\u00e9pendance envers FlashAI : vous \u00eates libre de faire \u00e9voluer votre code avec n\'importe quel d\u00e9veloppeur ou agence. Nous utilisons exclusivement des <strong>technologies open source</strong> et des architectures standard, ce qui garantit la p\u00e9rennit\u00e9 et la maintenabilit\u00e9 de votre projet sur le long terme.', cat: 'technique', icon: '\u{1F4BB}' },
        { q: 'Votre support est-il vraiment disponible 24/7 ?', a: 'Oui, notre support est r\u00e9ellement disponible <strong>24 heures sur 24, 7 jours sur 7</strong>. Urgence critique (site down, faille de s\u00e9curit\u00e9) : r\u00e9ponse en <strong>moins de 15 minutes</strong>. Question importante : r\u00e9ponse en <strong>moins de 2 heures</strong>. Demande standard : r\u00e9ponse en moins de 24 heures. Nos canaux de support incluent <strong>Slack, WhatsApp, email et visioconf\u00e9rence</strong>. Notre \u00e9quipe est r\u00e9partie entre Isra\u00ebl et l\'Europe pour couvrir tous les fuseaux horaires. De plus, un <strong>monitoring proactif</strong> est inclus : nous d\u00e9tectons et r\u00e9solvons souvent les probl\u00e8mes avant m\u00eame que vous ne les remarquiez.', cat: 'support', icon: '\u{1F4DE}' },
        { q: 'Travaillez-vous avec des entreprises hors d\'Isra\u00ebl ?', a: '<strong>80% de nos clients sont francophones</strong> bas\u00e9s en France, Belgique, Suisse, Luxembourg, Canada et Afrique francophone. Le fuseau horaire isra\u00e9lien (GMT+2/+3) est parfaitement <strong>align\u00e9 avec l\'Europe</strong>, ce qui permet des calls quotidiens et une collaboration fluide en temps r\u00e9el. Nous facturons en <strong>euros avec TVA intra-communautaire</strong> pour les entreprises de l\'UE. Notre \u00e9quipe 100% francophone comprend les enjeux du march\u00e9 europ\u00e9en et les sp\u00e9cificit\u00e9s r\u00e9glementaires (RGPD, mentions l\u00e9gales, accessibilit\u00e9). La distance g\u00e9ographique n\'est jamais un frein : nos outils collaboratifs et notre m\u00e9thodologie agile garantissent une communication transparente.', cat: 'general', icon: '\u{1F30D}' },
        { q: 'Comment int\u00e9grez-vous l\'IA dans vos projets ?', a: 'L\'intelligence artificielle est au c\u0153ur de notre proposition de valeur. Nous int\u00e9grons l\'IA de mani\u00e8re concr\u00e8te et mesurable : <strong>Chatbots intelligents</strong> (GPT-4, Claude) avec architecture RAG pour des r\u00e9ponses pr\u00e9cises bas\u00e9es sur vos donn\u00e9es r\u00e9elles. <strong>Automatisations IA</strong> : classification automatique d\'emails, g\u00e9n\u00e9ration de contenu marketing, extraction de donn\u00e9es de documents, scoring de leads. <strong>Analytics pr\u00e9dictifs</strong> : pr\u00e9vision de ventes, d\u00e9tection d\'anomalies, recommandations personnalis\u00e9es. Chaque int\u00e9gration IA est pens\u00e9e pour apporter une <strong>valeur m\u00e9trique tangible</strong> : +60% de r\u00e9solution automatique, -40% de temps de traitement, +25% de conversion.', cat: 'technique', icon: '\u{1F9E0}' },
        { q: 'Proposez-vous des facilit\u00e9s de paiement ?', a: 'Oui, nous proposons plusieurs options de <strong>paiement flexibles</strong> adapt\u00e9es \u00e0 chaque budget. Paiement en <strong>2 fois (50/50)</strong> : 50% au d\u00e9marrage, 50% \u00e0 la livraison. Paiement en <strong>3 fois (30/30/40)</strong> sans frais suppl\u00e9mentaires. Pour les projets Enterprise, <strong>paiement mensuel sur 3 \u00e0 6 mois</strong>. Nous acceptons le virement SEPA, la carte bancaire et PayPal. La facturation est conforme avec TVA intra-communautaire pour les entreprises de l\'Union Europ\u00e9enne. Un <strong>devis personnalis\u00e9 avec prix ferme</strong> est syst\u00e9matiquement fourni avant tout engagement, sans surprise ni co\u00fbt cach\u00e9.', cat: 'business', icon: '\u{1F4B3}' },
        { q: 'Que se passe-t-il apr\u00e8s la livraison ?', a: 'Apr\u00e8s la livraison, nous ne vous laissons pas seul. Chaque formule inclut un <strong>support et maintenance</strong> adapt\u00e9 : Starter (3 mois support email), Business (12 mois support prioritaire), Enterprise (account manager d\u00e9di\u00e9 + maintenance illimit\u00e9e). Sont inclus : <strong>corrections de bugs</strong>, mises \u00e0 jour de s\u00e9curit\u00e9, monitoring 24/7 avec alertes proactives, et sauvegardes quotidiennes automatis\u00e9es. Pour les \u00e9volutions futures, nous proposons des <strong>packs heures \u00e0 -20%</strong> par rapport \u00e0 nos tarifs standard. Votre projet \u00e9volue avec votre business \u2014 nous restons votre partenaire technologique sur le long terme.', cat: 'support', icon: '\u{1F527}' },
        { q: 'Vos sites sont-ils optimis\u00e9s pour le SEO ?', a: 'Le SEO est <strong>int\u00e9gr\u00e9 d\u00e8s la conception</strong> de chaque projet, pas ajout\u00e9 en post-production. Notre approche couvre tous les piliers du r\u00e9f\u00e9rencement naturel : <strong>Core Web Vitals</strong> optimis\u00e9s (LCP < 2.5s, FID < 100ms, CLS < 0.1), score <strong>Lighthouse 95+ garanti</strong>, HTML s\u00e9mantique, structured data Schema.org, sitemap XML automatis\u00e9, URLs propres et canoniques. C\u00f4t\u00e9 technique : Server-Side Rendering avec Next.js, <strong>lazy loading intelligent</strong>, compression d\'images automatique, CDN global. Nos clients constatent en moyenne <strong>+200% de trafic organique</strong> dans les 3 premiers mois apr\u00e8s lancement, avec des positions en premi\u00e8re page Google sur leurs mots-cl\u00e9s strat\u00e9giques.', cat: 'technique', icon: '\u{1F50D}' },
        { q: 'Comment assurez-vous la s\u00e9curit\u00e9 ?', a: 'La s\u00e9curit\u00e9 est une priorit\u00e9 absolue avec une <strong>approche multi-couches compl\u00e8te</strong>. Au niveau r\u00e9seau : SSL/TLS syst\u00e9matique, WAF Cloudflare, protection DDoS, IP whitelisting pour les zones admin. Au niveau applicatif : audit <strong>OWASP Top 10</strong> syst\u00e9matique, protection XSS/CSRF/SQL Injection, validation des entr\u00e9es c\u00f4t\u00e9 serveur. Au niveau donn\u00e9es : chiffrement <strong>AES-256</strong>, JWT s\u00e9curis\u00e9s avec rotation, OAuth 2.0, authentification 2FA. Conformit\u00e9 <strong>RGPD</strong> native avec consentement granulaire, droit \u00e0 l\'oubli et portabilit\u00e9 des donn\u00e9es. Monitoring temps r\u00e9el via <strong>Sentry et Datadog</strong>, scan de vuln\u00e9rabilit\u00e9s mensuel automatis\u00e9. Chaque d\u00e9ploiement passe par une pipeline CI/CD avec tests de s\u00e9curit\u00e9 int\u00e9gr\u00e9s.', cat: 'technique', icon: '\u{1F512}' },
        { q: 'Puis-je voir des exemples de projets ?', a: 'Absolument ! Nous avons livr\u00e9 <strong>50+ projets</strong> avec succ\u00e8s dans des secteurs vari\u00e9s. Quelques r\u00e9f\u00e9rences cl\u00e9s : <strong>TechVision</strong> (Dashboard SaaS analytics, +340% adoption utilisateurs en 3 mois), <strong>FoodExpress</strong> (Marketplace e-commerce, \u20AC2M de CA premi\u00e8re ann\u00e9e), <strong>MediCare Pro</strong> (CRM m\u00e9dical conforme RGPD, 5000+ patients g\u00e9r\u00e9s), <strong>CryptoTrack</strong> (Plateforme fintech, 15K utilisateurs actifs), <strong>EduSmart</strong> (E-learning avec chatbot tuteur IA, 98% satisfaction), <strong>LogiFlow</strong> (ERP logistique, -40% co\u00fbts op\u00e9rationnels). Chaque projet est accompagn\u00e9 d\'une \u00e9tude de cas d\u00e9taill\u00e9e avec m\u00e9triques de r\u00e9sultat mesurables disponibles sur demande.', cat: 'general', icon: '\u{1F4C2}' },
        { q: 'Comment g\u00e9rez-vous les projets complexes ?', a: 'Les projets complexes sont notre sp\u00e9cialit\u00e9. Nous utilisons une <strong>architecture microservices</strong>, event-driven, API-first avec Domain-Driven Design (DDD) pour garantir scalabilit\u00e9 et maintenabilit\u00e9. Notre m\u00e9thodologie agile combine <strong>Scrum et Kanban</strong> : sprints courts de 3-5 jours, daily standups, r\u00e9trospectives. Chaque ligne de code passe par un <strong>code review syst\u00e9matique</strong>, des tests unitaires et d\'int\u00e9gration (couverture >85%), et une pipeline CI/CD automatis\u00e9e. L\'infrastructure est con\u00e7ue pour scaler : <strong>Kubernetes auto-scaling</strong>, CDN global multi-r\u00e9gions, cache multi-niveaux (Redis + CDN), et monitoring temps r\u00e9el avec alertes proactives.', cat: 'technique', icon: '\u{1F3D7}\uFE0F' },
        { q: 'Quels sont les avantages d\'une agence isra\u00e9lienne ?', a: 'Isra\u00ebl est la <strong>Startup Nation</strong> \u2014 l\'\u00e9cosyst\u00e8me technologique le plus dense au monde, avec plus de startups par habitant que n\'importe quel autre pays. Travailler avec une agence isra\u00e9lienne vous donne acc\u00e8s \u00e0 un <strong>talent tech exceptionnel</strong>, form\u00e9 dans les unit\u00e9s technologiques d\'\u00e9lite (8200, Mamram). Le rapport qualit\u00e9-prix est <strong>3 \u00e0 5 fois inf\u00e9rieur</strong> \u00e0 Paris ou Gen\u00e8ve pour un niveau d\'expertise \u00e9quivalent ou sup\u00e9rieur. Notre \u00e9quipe est <strong>100% francophone</strong>, le fuseau horaire est compatible avec l\'Europe (GMT+2/+3), et nous avons un acc\u00e8s privil\u00e9gi\u00e9 aux derni\u00e8res innovations IA avant qu\'elles n\'arrivent sur le march\u00e9 europ\u00e9en.', cat: 'general', icon: '\u{1F1EE}\u{1F1F1}' },
        { q: 'Proposez-vous du white-label ?', a: 'Oui, nous proposons un <strong>programme complet de partenariats</strong> adapt\u00e9 \u00e0 diff\u00e9rents profils. <strong>White-label agence</strong> : d\u00e9veloppement sous votre marque avec une r\u00e9duction de 25%, id\u00e9al pour les agences marketing qui souhaitent \u00e9tendre leurs comp\u00e9tences techniques. <strong>Partenariat freelance</strong> : support technique pour les d\u00e9veloppeurs ind\u00e9pendants sur les projets d\u00e9passant leurs capacit\u00e9s. <strong>Partenariat entreprise</strong> : accord cadre long terme avec tarifs d\u00e9gressifs et \u00e9quipe d\u00e9di\u00e9e. <strong>Programme affiliation</strong> : 10% de commission sur chaque client recommand\u00e9. Tous nos partenariats sont couverts par un <strong>NDA strict</strong> et une confidentialit\u00e9 totale.', cat: 'business', icon: '\u{1F91D}' },
        { q: 'Comment fonctionne votre chatbot IA ?', a: 'Notre chatbot utilise la technologie <strong>GPT-4 ou Claude</strong> combin\u00e9e \u00e0 une architecture <strong>RAG (Retrieval-Augmented Generation)</strong> pour des r\u00e9ponses ultra-pr\u00e9cises. Concr\u00e8tement : vos donn\u00e9es (site web, FAQ, catalogue produits, documentation) sont <strong>vectoris\u00e9es et index\u00e9es</strong> dans une base de connaissances d\u00e9di\u00e9e. Quand un utilisateur pose une question, le chatbot recherche dans votre base de connaissances et formule une r\u00e9ponse naturelle et contextualis\u00e9e. <strong>Int\u00e9grations disponibles</strong> : widget site web, WhatsApp Business, Facebook Messenger, Slack, email. R\u00e9sultats moyens : <strong>85% de taux de r\u00e9solution</strong> automatique, -60% de charge sur le support humain, satisfaction utilisateur >90%.', cat: 'technique', icon: '\u{1F916}' },
        { q: 'Comment puis-je commencer un projet ?', a: 'D\u00e9marrer avec FlashAI est simple et rapide. <strong>\u00c9tape 1</strong> : remplissez notre formulaire de contact ou envoyez un email \u00e0 contact@flashai.dev avec une description g\u00e9n\u00e9rale de votre projet. <strong>\u00c9tape 2</strong> : dans les 2 heures, nous vous proposons un <strong>appel d\u00e9couverte gratuit de 30 minutes</strong> pour comprendre en profondeur vos besoins, objectifs et contraintes. <strong>\u00c9tape 3</strong> : dans les 24 heures suivant l\'appel, vous recevez un <strong>devis personnalis\u00e9 avec prix ferme</strong>, sans surprise. <strong>\u00c9tape 4</strong> : d\u00e8s validation, un prototype interactif est livr\u00e9 en 48 heures. Garantie satisfait ou rembours\u00e9 : vous ne prenez aucun risque. Premi\u00e8re consultation 100% gratuite et sans engagement.', cat: 'general', icon: '\u{1F4E9}' }
    ];

    let activeFilter = 'all';
    let searchQuery = '';
    let readCount = 0;
    const readSet = new Set();

    function render() {
        const filtered = questions.filter(q => {
            if (activeFilter !== 'all' && q.cat !== activeFilter) return false;
            if (searchQuery && !q.q.toLowerCase().includes(searchQuery) && !q.a.toLowerCase().includes(searchQuery)) return false;
            return true;
        });

        const catColors = { general: '#00f0ff', technique: '#bf00ff', business: '#ff8c00', support: '#00ff87' };

        list.innerHTML = filtered.map((q, i) => {
            const isRead = readSet.has(i);
            const color = catColors[q.cat] || '#6366f1';
            return '<div class="faq-card ' + (isRead ? 'faq-read' : '') + '" data-idx="' + questions.indexOf(q) + '">' +
                '<div class="faq-card-accent" style="background:linear-gradient(180deg,' + color + ',' + color + '40)"></div>' +
                '<button class="faq-question" aria-expanded="false">' +
                '<span class="faq-card-icon">' + q.icon + '</span>' +
                '<span class="faq-card-num">' + String(questions.indexOf(q) + 1).padStart(2, '0') + '</span>' +
                '<span class="faq-q-text">' + highlightSearch(q.q) + '</span>' +
                '<span class="faq-q-cat" style="color:' + color + '">' + q.cat + '</span>' +
                '<svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>' +
                '</button>' +
                '<div class="faq-answer">' + highlightSearch(q.a) + '</div>' +
                '</div>';
        }).join('');

        // Bind clicks
        list.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.faq-card');
                const wasOpen = card.classList.contains('open');
                // Close all
                list.querySelectorAll('.faq-card.open').forEach(c => { c.classList.remove('open'); c.querySelector('.faq-question').setAttribute('aria-expanded', 'false'); });
                if (!wasOpen) {
                    card.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                    const idx = parseInt(card.dataset.idx);
                    if (!readSet.has(idx)) {
                        readSet.add(idx);
                        readCount++;
                        updateProgress();
                    }
                }
            });
        });
    }

    function highlightSearch(text) {
        if (!searchQuery) return text;
        const regex = new RegExp('(' + searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
        return text.replace(regex, '<mark class="faq-highlight">$1</mark>');
    }

    function updateProgress() {
        const el = document.getElementById('faq-read-count');
        const bar = document.getElementById('faq-progress-bar');
        const total = document.getElementById('faq-total-count');
        if (el) el.textContent = readCount;
        if (total) total.textContent = questions.length;
        if (bar) bar.style.width = (readCount / questions.length * 100) + '%';
    }

    document.querySelectorAll('.faq-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeFilter = tab.dataset.cat;
            render();
        });
    });

    const searchInput = document.getElementById('faq-search');
    if (searchInput) {
        searchInput.addEventListener('input', e => {
            searchQuery = e.target.value.toLowerCase();
            render();
        });
    }

    updateProgress();
    render();
}

function initCTACanvas() {
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() { w = canvas.width = canvas.parentElement.offsetWidth; h = canvas.height = canvas.parentElement.offsetHeight; }
    resize(); window.addEventListener('resize', resize);

    const particles = Array.from({length: 80}, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        size: Math.random() * 3 + 1,
        color: ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87'][Math.floor(Math.random() * 5)]
    }));

    function draw() {
        ctx.clearRect(0, 0, w, h);
        const cx = w / 2, cy = h / 2;
        particles.forEach(p => {
            const dx = cx / w - p.x, dy = cy / h - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            p.vx += dx * 0.00005; p.vy += dy * 0.00005;
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > 1) p.vx *= -1;
            if (p.y < 0 || p.y > 1) p.vy *= -1;
            const px = p.x * w, py = p.y * h;
            ctx.beginPath();
            ctx.arc(px, py, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color + '60';
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
        });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = (particles[i].x - particles[j].x) * w;
                const dy = (particles[i].y - particles[j].y) * h;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x * w, particles[i].y * h);
                    ctx.lineTo(particles[j].x * w, particles[j].y * h);
                    ctx.strokeStyle = particles[i].color + Math.floor((1 - d / 120) * 30).toString(16).padStart(2, '0');
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
}

/* ========== CTA TIMER ========== */
function initCTATimer() {
    const el = document.getElementById('cta-timer');
    if (!el) return;
    let h = 23, m = 59, s = 42;
    setInterval(() => {
        s--; if (s < 0) { s = 59; m--; } if (m < 0) { m = 59; h--; } if (h < 0) { h = 23; m = 59; s = 59; }
        el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    }, 1000);
}

/* ========== SMART FORM ========== */
function initSmartForm() {
    const selector = document.getElementById('smart-form-selector');
    const container = document.getElementById('smart-form-container');
    if (!selector || !container) return;

    const types = [
        { id: 'devis', name: 'Demande de Devis', icon: '\u{1F4CB}', color: '#00f0ff', desc: 'Obtenez un devis personnalis\u00e9 en 24h' },
        { id: 'contact', name: 'Contact G\u00e9n\u00e9ral', icon: '\u{1F4AC}', color: '#bf00ff', desc: 'Une question ? Parlons-en !' },
        { id: 'partenariat', name: 'Partenariat', icon: '\u{1F91D}', color: '#ff006e', desc: 'Travaillons ensemble' },
        { id: 'agence', name: 'White-Label Agence', icon: '\u{1F3E2}', color: '#ffd700', desc: 'Solutions pour agences' },
        { id: 'recrutement', name: 'Recrutement', icon: '\u{1F680}', color: '#00ff87', desc: 'Rejoignez l\'aventure' }
    ];

    let activeType = 'devis';

    const formConfigs = {
        devis: {
            fields: [
                { type: 'text', name: 'company', label: 'Nom de votre entreprise', placeholder: 'Acme Inc.', required: true },
                { type: 'email', name: 'email', label: 'Email professionnel', placeholder: 'vous@entreprise.com', required: true },
                { type: 'tel', name: 'phone', label: 'T\u00e9l\u00e9phone', placeholder: '+33 6 12 34 56 78' },
                { type: 'chips', name: 'project_type', label: 'Type de projet', options: ['Site Vitrine','E-Commerce','CRM','Dashboard','Chatbot IA','Automatisation','Application Mobile','Autre'] },
                { type: 'range', name: 'budget', label: 'Budget estim\u00e9', min: 500, max: 15000, step: 500, suffix: '\u20AC' },
                { type: 'select', name: 'deadline', label: 'D\u00e9lai souhait\u00e9', options: ['Le plus vite possible','1-2 semaines','1 mois','Pas de deadline pr\u00e9cise'] },
                { type: 'textarea', name: 'description', label: 'D\u00e9crivez votre projet', placeholder: 'D\u00e9crivez votre projet, vos objectifs, vos contraintes...', rows: 4 },
                { type: 'chips', name: 'features', label: 'Fonctionnalit\u00e9s souhait\u00e9es', options: ['Design premium','SEO avanc\u00e9','Multilingue','Analytics','Paiement en ligne','API','CRM int\u00e9gr\u00e9','IA'] }
            ]
        },
        contact: {
            fields: [
                { type: 'text', name: 'name', label: 'Votre nom', placeholder: 'Jean Dupont', required: true },
                { type: 'email', name: 'email', label: 'Email', placeholder: 'jean@email.com', required: true },
                { type: 'select', name: 'subject', label: 'Sujet', options: ['Question g\u00e9n\u00e9rale','Demande d\'information','Support technique','Autre'] },
                { type: 'textarea', name: 'message', label: 'Votre message', placeholder: 'Comment pouvons-nous vous aider ?', rows: 5, required: true }
            ]
        },
        partenariat: {
            fields: [
                { type: 'text', name: 'company', label: 'Votre entreprise', placeholder: 'Nom de votre agence/entreprise', required: true },
                { type: 'email', name: 'email', label: 'Email professionnel', placeholder: 'contact@agence.com', required: true },
                { type: 'text', name: 'website', label: 'Site web', placeholder: 'https://votre-site.com' },
                { type: 'chips', name: 'partner_type', label: 'Type de partenariat', options: ['White-label','Sous-traitance','Affiliation','Co-d\u00e9veloppement','Autre'] },
                { type: 'select', name: 'volume', label: 'Volume estim\u00e9 / an', options: ['1-5 projets','5-15 projets','15-30 projets','30+ projets'] },
                { type: 'textarea', name: 'details', label: 'D\u00e9tails', placeholder: 'D\u00e9crivez le partenariat que vous envisagez...', rows: 4 }
            ]
        },
        agence: {
            fields: [
                { type: 'text', name: 'agency', label: 'Nom de l\'agence', placeholder: 'Votre agence', required: true },
                { type: 'email', name: 'email', label: 'Email', placeholder: 'contact@agence.com', required: true },
                { type: 'tel', name: 'phone', label: 'T\u00e9l\u00e9phone', placeholder: '+33 1 23 45 67 89' },
                { type: 'chips', name: 'services', label: 'Services recherch\u00e9s', options: ['D\u00e9veloppement web','D\u00e9veloppement mobile','IA & Chatbot','CRM custom','Design UI/UX','DevOps','Consulting technique'] },
                { type: 'select', name: 'team_size', label: 'Taille de votre agence', options: ['1-5 personnes','5-20 personnes','20-50 personnes','50+ personnes'] },
                { type: 'textarea', name: 'needs', label: 'Vos besoins', placeholder: 'D\u00e9crivez vos besoins en sous-traitance technique...', rows: 4 }
            ]
        },
        recrutement: {
            fields: [
                { type: 'text', name: 'name', label: 'Nom complet', placeholder: 'Votre nom', required: true },
                { type: 'email', name: 'email', label: 'Email', placeholder: 'votre@email.com', required: true },
                { type: 'chips', name: 'role', label: 'Poste souhait\u00e9', options: ['D\u00e9veloppeur Frontend','D\u00e9veloppeur Backend','D\u00e9veloppeur Full-Stack','Designer UI/UX','Chef de projet','DevOps','IA / ML Engineer'] },
                { type: 'text', name: 'portfolio', label: 'Portfolio / GitHub', placeholder: 'https://github.com/vous' },
                { type: 'select', name: 'experience', label: 'Exp\u00e9rience', options: ['Junior (0-2 ans)','Interm\u00e9diaire (2-5 ans)','Senior (5-10 ans)','Expert (10+ ans)'] },
                { type: 'select', name: 'availability', label: 'Disponibilit\u00e9', options: ['Imm\u00e9diate','1 mois','2-3 mois','\u00c0 discuter'] },
                { type: 'textarea', name: 'motivation', label: 'Motivation', placeholder: 'Pourquoi souhaitez-vous rejoindre FlashAI ?', rows: 4 }
            ]
        }
    };

    function renderSelector() {
        selector.innerHTML = '<div class="sf-types">' + types.map(t => '<button class="smart-form-type ' + (t.id === activeType ? 'active' : '') + '" data-type="' + t.id + '" style="--form-color:' + t.color + '">' +
            '<span class="sf-type-icon">' + t.icon + '</span>' +
            '<span class="sf-type-name">' + t.name + '</span>' +
            '<span class="sf-type-desc">' + t.desc + '</span>' +
        '</button>').join('') + '</div>';
        selector.querySelectorAll('.smart-form-type').forEach(btn => {
            btn.addEventListener('click', () => {
                activeType = btn.dataset.type;
                renderSelector();
                renderForm();
            });
        });
    }

    function renderForm() {
        const config = formConfigs[activeType];
        const typeInfo = types.find(t => t.id === activeType);
        container.innerHTML = '<form class="smart-form" action="https://formspree.io/f/xvgogwvz" method="POST" style="--form-color:' + typeInfo.color + '">' +
            '<input type="hidden" name="form_type" value="' + activeType + '">' +
            '<div class="sf-fields">' + config.fields.map(f => renderField(f, typeInfo.color)).join('') + '</div>' +
            '<button type="submit" class="sf-submit" style="background:' + typeInfo.color + '"><span>Envoyer ' + typeInfo.icon + '</span></button>' +
        '</form>';

        container.querySelectorAll('.sf-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('active');
            });
        });

        container.querySelectorAll('.sf-range').forEach(range => {
            const val = range.parentElement.querySelector('.sf-range-val');
            range.addEventListener('input', () => {
                val.textContent = (+range.value).toLocaleString('fr') + ' ' + (range.dataset.suffix || '');
            });
        });

        container.querySelector('.smart-form').addEventListener('submit', e => {
            e.preventDefault();
            const btn = container.querySelector('.sf-submit');
            btn.innerHTML = '<span>Envoy\u00e9 ! \u2728</span>';
            btn.style.background = '#00ff87';
            showToast('Message envoy\u00e9 avec succ\u00e8s !');
            setTimeout(() => { btn.innerHTML = '<span>Envoyer ' + typeInfo.icon + '</span>'; btn.style.background = typeInfo.color; }, 3000);
        });
    }

    function renderField(f, color) {
        if (f.type === 'chips') {
            return '<div class="sf-field sf-field-full"><label class="sf-label">' + f.label + '</label><div class="sf-chips">' + f.options.map(o => '<button type="button" class="sf-chip" style="--chip-color:' + color + '">' + o + '</button>').join('') + '</div><input type="hidden" name="' + f.name + '"></div>';
        }
        if (f.type === 'range') {
            const mid = Math.round((f.min + f.max) / 2);
            return '<div class="sf-field sf-field-full"><label class="sf-label">' + f.label + '</label><input type="range" class="sf-range" name="' + f.name + '" min="' + f.min + '" max="' + f.max + '" step="' + f.step + '" value="' + mid + '" data-suffix="' + (f.suffix || '') + '"><div class="sf-range-val" style="color:' + color + '">' + mid.toLocaleString('fr') + ' ' + (f.suffix || '') + '</div></div>';
        }
        if (f.type === 'select') {
            return '<div class="sf-field"><label class="sf-label">' + f.label + '</label><select class="sf-select" name="' + f.name + '">' + f.options.map(o => '<option>' + o + '</option>').join('') + '</select></div>';
        }
        if (f.type === 'textarea') {
            return '<div class="sf-field sf-field-full"><label class="sf-label">' + f.label + '</label><textarea class="sf-textarea" name="' + f.name + '" rows="' + (f.rows || 4) + '" placeholder="' + (f.placeholder || '') + '" ' + (f.required ? 'required' : '') + '></textarea></div>';
        }
        return '<div class="sf-field"><label class="sf-label">' + f.label + '</label><input type="' + f.type + '" class="sf-input" name="' + f.name + '" placeholder="' + (f.placeholder || '') + '" ' + (f.required ? 'required' : '') + '></div>';
    }

    renderSelector();
    renderForm();
}

function initMagneticBtn() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
            btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
            setTimeout(() => { btn.style.transition = ''; }, 400);
        });
    });
}

/* ========== SCROLL TOP ========== */
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========== SMOOTH ANCHORS ========== */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ========== THREE.JS BACKGROUND ========== */
function initThreeBackground() {
    if (typeof THREE === 'undefined') return;
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    try {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const geometry = new THREE.BufferGeometry();
        const count = 600;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = [
            [0, 0.94, 1], [0.75, 0, 1], [1, 0, 0.43],
            [0, 1, 0.53], [1, 0.84, 0], [1, 0.55, 0]
        ];
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
            const c = palette[Math.floor(Math.random() * palette.length)];
            colors[i * 3] = c[0]; colors[i * 3 + 1] = c[1]; colors[i * 3 + 2] = c[2];
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        const material = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.6, sizeAttenuation: true });
        const points = new THREE.Points(geometry, material);
        scene.add(points);
        camera.position.z = 8;

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', e => {
            mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
            mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        function animate() {
            points.rotation.y += 0.0005;
            points.rotation.x += 0.0002;
            camera.position.x += (mouseX - camera.position.x) * 0.02;
            camera.position.y += (-mouseY - camera.position.y) * 0.02;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        }
        animate();
    } catch (e) { /* Three.js not available */ }
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
                // Confetti!
                for (let i = 0; i < 150; i++) {
                    const conf = document.createElement('div');
                    conf.style.cssText = `position:fixed;width:10px;height:10px;background:${['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87','#ff8c00'][Math.floor(Math.random()*6)]};left:${Math.random()*100}vw;top:-10px;z-index:99999;border-radius:${Math.random()>0.5?'50%':'2px'};pointer-events:none;animation:confetti-fall ${2+Math.random()*3}s linear forwards`;
                    document.body.appendChild(conf);
                    setTimeout(() => conf.remove(), 5000);
                }
                if (!document.getElementById('confetti-style')) {
                    const s = document.createElement('style');
                    s.id = 'confetti-style';
                    s.textContent = '@keyframes confetti-fall{to{top:110vh;transform:rotate(' + (Math.random()*720) + 'deg)}}';
                    document.head.appendChild(s);
                }
                showToast('🎉 Konami Code activé !');
            }
        } else { konamiIdx = 0; }
    });

    // Disco mode on triple-click logo
    document.querySelectorAll('.header-logo-icon').forEach(logo => {
        let clicks = 0;
        logo.addEventListener('click', () => {
            clicks++;
            if (clicks >= 3) {
                clicks = 0;
                document.body.classList.toggle('disco-mode');
                if (document.body.classList.contains('disco-mode')) {
                    if (!document.getElementById('disco-style')) {
                        const s = document.createElement('style');
                        s.id = 'disco-style';
                        s.textContent = '.disco-mode{animation:disco 0.5s ease infinite}@keyframes disco{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(180deg)}100%{filter:hue-rotate(360deg)}}';
                        document.head.appendChild(s);
                    }
                    showToast('🕺 Disco mode ON!');
                } else {
                    showToast('Disco mode OFF');
                }
            }
            setTimeout(() => { clicks = 0; }, 600);
        });
    });
}

