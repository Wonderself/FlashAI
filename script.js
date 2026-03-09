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
    const sequences = [
        { cmd: '$ flashai create --type website --name "MonSite"', lines: [
            { t: '<span class="t-blue">→</span> Initialisation...', d: 400 },
            { t: '<span class="t-green">✓</span> Template premium chargé', d: 300 },
            { t: '<span class="t-green">✓</span> Design responsive configuré', d: 300 },
            { t: '<span class="t-green">✓</span> SEO optimisé', d: 300 },
            { t: '<span class="t-yellow">⚡</span> Build... <span class="t-gray">[████████████] 100%</span>', d: 500 },
            { t: '<span class="t-green t-bold">✨ Déployé → monsite.flashai.dev</span>', d: 400 }
        ]},
        { cmd: '$ flashai add crm --pipeline --contacts', lines: [
            { t: '<span class="t-blue">→</span> Ajout CRM...', d: 400 },
            { t: '<span class="t-green">✓</span> Pipeline configuré', d: 300 },
            { t: '<span class="t-green">✓</span> Contacts initialisés', d: 250 },
            { t: '<span class="t-green">✓</span> Dashboard connecté', d: 300 },
            { t: '<span class="t-green t-bold">🎯 CRM opérationnel</span>', d: 400 }
        ]},
        { cmd: '$ flashai deploy --env production', lines: [
            { t: '<span class="t-blue">→</span> Déploiement...', d: 400 },
            { t: '<span class="t-green">✓</span> Tests: <span class="t-green">47/47 passed</span>', d: 350 },
            { t: '<span class="t-green">✓</span> Lighthouse: 98/100', d: 300 },
            { t: '<span class="t-green">✓</span> CDN + SSL activé', d: 300 },
            { t: '<span class="t-green t-bold">🚀 Live — 47ms response</span>', d: 400 }
        ]}
    ];
    let seqIdx = 0;
    async function runSequence() {
        const seq = sequences[seqIdx % sequences.length];
        const cmdLine = document.createElement('div');
        cmdLine.className = 't-green';
        output.appendChild(cmdLine);
        for (let i = 0; i < seq.cmd.length; i++) { cmdLine.textContent += seq.cmd[i]; await new Promise(r => setTimeout(r, 25)); }
        output.scrollTop = output.scrollHeight;
        for (const line of seq.lines) {
            await new Promise(r => setTimeout(r, line.d));
            const div = document.createElement('div');
            div.innerHTML = line.t;
            div.style.cssText = 'opacity:0;transform:translateX(-5px);transition:all 0.2s';
            output.appendChild(div);
            requestAnimationFrame(() => { div.style.opacity = '1'; div.style.transform = 'translateX(0)'; });
            output.scrollTop = output.scrollHeight;
        }
        await new Promise(r => setTimeout(r, 2000));
        output.appendChild(document.createElement('br'));
        seqIdx++;
        while (output.children.length > 30) output.removeChild(output.firstChild);
        runSequence();
    }
    setTimeout(runSequence, 2500);
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

/* ========== TESTIMONIALS ========== */
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
    const toggle = document.getElementById('pricing-toggle');
    if (!grid) return;
    let annual = false;

    const plans = [
        { name: 'Starter', icon: '⚡', desc: 'Parfait pour démarrer votre présence digitale', price: 890, features: ['Site vitrine responsive','Design premium sur mesure','SEO de base optimisé','Hébergement 3 mois inclus','Support email'], color: '#00f0ff', popular: false },
        { name: 'Business', icon: '🚀', desc: 'La solution complète pour scaler votre business', price: 2490, features: ['Tout Starter +','CRM / Dashboard intégré','Chatbot IA basique','API & Automatisations','Analytics avancé','Support prioritaire 12 mois','Formation équipe incluse'], color: '#bf00ff', popular: true },
        { name: 'Enterprise', icon: '👑', desc: 'Infrastructure complète, IA avancée, support dédié', price: 4990, features: ['Tout Business +','IA avancée (GPT-4, RAG)','Infrastructure scalable','Multi-langue / Multi-pays','SLA 99.9% garanti','Account manager dédié','Audit sécurité complet','Maintenance illimitée'], color: '#ffd700', popular: false }
    ];

    function render() {
        grid.innerHTML = plans.map((p, i) => {
            const price = annual ? Math.round(p.price * 0.8) : p.price;
            return `<div class="pricing-card-3d reveal ${p.popular ? 'pricing-featured' : ''}" style="transition-delay:${i * 0.15}s;--plan-color:${p.color}" data-tilt>
                ${p.popular ? '<div class="pricing-popular-badge">⭐ Plus populaire</div>' : ''}
                <div class="pricing-card-aurora"></div>
                <div class="pricing-card-content">
                    <div class="pricing-card-icon" style="background:${p.color}15">${p.icon}</div>
                    <h3 class="font-display font-bold text-2xl mb-2">${p.name}</h3>
                    <p class="text-surface-400 text-sm mb-6">${p.desc}</p>
                    <div class="pricing-price">
                        <span class="pricing-currency">€</span>
                        <span class="pricing-amount" data-target="${price}">${price.toLocaleString('fr')}</span>
                    </div>
                    <div class="text-surface-500 text-xs mb-6">${annual ? 'par an (économisez 20%)' : 'prix unique, pas d\'abonnement'}</div>
                    <ul class="pricing-features">${p.features.map((f, fi) => `<li class="pricing-feature" style="transition-delay:${fi * 0.05}s"><svg class="w-4 h-4 flex-shrink-0" style="color:${p.color}" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg><span>${f}</span></li>`).join('')}</ul>
                    <a href="#contact" class="pricing-cta ${p.popular ? 'pricing-cta-featured' : ''}" style="--pc:${p.color}"><span>${p.popular ? 'Choisir Business' : 'Commencer'}</span></a>
                </div>
            </div>`;
        }).join('');

        // 3D tilt
        grid.querySelectorAll('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                const x = (e.clientX - r.left) / r.width - 0.5;
                const y = (e.clientY - r.top) / r.height - 0.5;
                card.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = ''; });
        });
    }
    render();

    if (toggle) {
        toggle.addEventListener('click', () => {
            annual = !annual;
            toggle.classList.toggle('active', annual);
            render();
        });
    }
}

/* ========== ROI CALCULATOR ========== */
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
    const readSet = new Set();
    const questions = [
        { q: 'Quels types de projets réalisez-vous ?', cat: 'general', color: '#00f0ff', a: 'FlashAI est une agence digitale full-service capable de réaliser une large gamme de projets numériques. Voici nos principales expertises :<br><br><strong>• Sites web sur mesure</strong> — Sites vitrines, landing pages, sites corporate, blogs, portfolios. Design premium, responsive, optimisé SEO, avec des performances Lighthouse 95+.<br><br><strong>• E-commerce</strong> — Boutiques en ligne complètes avec gestion produits, panier, paiement Stripe/PayPal, gestion stocks, factures automatiques, et tableaux de bord vendeur.<br><br><strong>• CRM & ERP</strong> — Outils de gestion clients et entreprise sur mesure : pipelines commerciaux, gestion contacts, automatisations, dashboards analytics, reporting avancé.<br><br><strong>• Dashboards & Analytics</strong> — Tableaux de bord interactifs avec visualisations de données en temps réel, KPIs personnalisés, exports, alertes automatiques.<br><br><strong>• Chatbots IA</strong> — Assistants virtuels intelligents basés sur GPT-4, intégrables sur votre site, WhatsApp, Messenger, Slack. Entraînés sur vos données.<br><br><strong>• Automatisations</strong> — Workflows automatisés entre vos outils (Zapier, Make, n8n), scripts custom, intégrations API, synchronisation de données.<br><br>Chaque projet est 100% sur mesure et livré en moyenne en 5 à 14 jours ouvrés.' },
        { q: 'Combien coûtent vos services ?', cat: 'business', color: '#bf00ff', a: 'Nos tarifs sont conçus pour être <strong>3 à 5 fois moins chers</strong> que les agences classiques, sans compromettre la qualité :<br><br><strong>• Starter (à partir de 890€)</strong> — Site vitrine responsive, design premium sur mesure, SEO de base, hébergement 3 mois inclus.<br><br><strong>• Business (à partir de 2 490€)</strong> — Solution complète incluant CRM/Dashboard, chatbot IA basique, API & automatisations, analytics avancé, support prioritaire 12 mois.<br><br><strong>• Enterprise (à partir de 4 990€)</strong> — Infrastructure scalable, IA avancée (GPT-4, RAG), multi-langue, SLA 99.9%, account manager dédié, audit sécurité complet.<br><br>Ces prix sont <strong>uniques, pas des abonnements</strong>. Ils incluent le design, le développement, les tests, le déploiement et la formation. La maintenance est incluse pour une durée variable selon la formule.<br><br><strong>Comment est-ce possible ?</strong> Notre équipe basée en Israël utilise des outils d\'IA avancés et des méthodologies agiles qui nous permettent de livrer plus vite avec une qualité supérieure. Nous n\'avons pas les charges d\'une grande agence parisienne.<br><br>Chaque devis est personnalisé. <a href="#contact" style="color:#bf00ff">Demandez le vôtre gratuitement</a> — réponse en moins de 2h.' },
        { q: 'Quels sont vos délais de livraison ?', cat: 'general', color: '#ff006e', a: 'Nos délais sont notre force. Là où une agence classique met <strong>3 à 6 mois</strong>, nous livrons en <strong>5 à 14 jours ouvrés</strong> :<br><br><strong>• Site vitrine simple</strong> — 3 à 5 jours ouvrés<br><strong>• Site e-commerce</strong> — 7 à 14 jours ouvrés<br><strong>• CRM / Dashboard</strong> — 5 à 10 jours ouvrés<br><strong>• Chatbot IA</strong> — 3 à 7 jours ouvrés<br><strong>• Automatisations</strong> — 2 à 5 jours ouvrés<br><br><strong>Notre méthode en 4 étapes :</strong><br>1. <strong>Discovery (30 min)</strong> — Appel pour comprendre vos besoins<br>2. <strong>Prototype (48h)</strong> — Maquette interactive à valider<br>3. <strong>Build (3-10 jours)</strong> — Développement avec démos quotidiennes<br>4. <strong>Launch (J+0)</strong> — Déploiement, formation, documentation<br><br>Ces délais rapides sont possibles grâce à notre stack technique moderne, nos outils d\'IA propriétaires, et notre méthodologie agile éprouvée sur 50+ projets.' },
        { q: 'Quelles technologies utilisez-vous ?', cat: 'technique', color: '#00ff87', a: 'Nous utilisons un stack technique moderne et performant, constamment mis à jour :<br><br><strong>Frontend :</strong><br>• React, Next.js, Vue.js, Nuxt, Svelte<br>• TypeScript, TailwindCSS, Framer Motion<br>• Three.js, GSAP pour les animations 3D<br><br><strong>Backend :</strong><br>• Node.js, Express, Fastify<br>• Python, FastAPI, Django<br>• Go pour les microservices haute performance<br><br><strong>Bases de données :</strong><br>• PostgreSQL, MongoDB, Redis<br>• Supabase, Firebase, PlanetScale<br>• Prisma, Drizzle comme ORM<br><br><strong>IA & Machine Learning :</strong><br>• OpenAI GPT-4, Claude (Anthropic)<br>• LangChain, RAG systems<br>• Pinecone, Weaviate pour le vector search<br><br><strong>DevOps & Infrastructure :</strong><br>• Docker, Kubernetes, Terraform<br>• AWS, GCP, Vercel, Cloudflare<br>• GitHub Actions pour le CI/CD<br><br>Au total, nous maîtrisons <strong>247+ outils et technologies</strong> que nous intégrons selon les besoins spécifiques de chaque projet.' },
        { q: 'Proposez-vous une garantie satisfait ou remboursé ?', cat: 'business', color: '#ffd700', a: 'Oui, absolument ! Nous offrons une <strong>garantie satisfait ou remboursé à 100%</strong>. Voici comment ça fonctionne :<br><br><strong>• Validation par étapes</strong> — Vous validez chaque étape du projet (prototype, design, développement). Rien n\'avance sans votre accord explicite.<br><br><strong>• Révisions illimitées</strong> — Pendant la phase de développement, nous intégrons toutes vos modifications sans surcoût. Votre satisfaction est notre priorité.<br><br><strong>• Remboursement complet</strong> — Si malgré tout le résultat final ne vous convient pas à 100%, nous vous remboursons intégralement. Sans conditions, sans délai, sans questions.<br><br><strong>• Pas de risque</strong> — Vous ne payez le solde qu\'après validation finale. Un acompte de 30% est demandé au démarrage pour engager les ressources.<br><br>Sur nos 50+ projets livrés, <strong>0 demande de remboursement</strong>. Notre taux de satisfaction est de 100%. Nous sommes tellement confiants dans notre travail que nous prenons tout le risque à votre place.<br><br>C\'est notre engagement : vous êtes satisfait, ou c\'est gratuit.' },
        { q: 'Comment se déroule un projet typique ?', cat: 'general', color: '#00f0ff', a: 'Chaque projet suit notre méthodologie éprouvée en <strong>4 phases</strong>, conçue pour maximiser la qualité tout en minimisant les délais :<br><br><strong>Phase 1 — Discovery (30 minutes)</strong><br>Un appel vidéo pour comprendre vos besoins, objectifs, contraintes et inspirations. Nous analysons votre marché, vos concurrents, et vos outils existants. Livrable : brief détaillé + recommandations stratégiques.<br><br><strong>Phase 2 — Prototype (48 heures)</strong><br>Nous créons une maquette interactive haute fidélité de votre projet. Vous pouvez naviguer, tester l\'UX, valider le design et les fonctionnalités avant tout développement. Modifications illimitées à ce stade.<br><br><strong>Phase 3 — Build (3 à 10 jours)</strong><br>Développement agile avec des démos quotidiennes. Vous suivez l\'avancement en temps réel. Stack moderne, code propre documenté, tests automatisés. Chaque fonctionnalité est validée par vous avant de passer à la suivante.<br><br><strong>Phase 4 — Launch (Jour J)</strong><br>Déploiement en production, configuration DNS et SSL, optimisation performances. Formation de votre équipe (vidéo + documentation). Monitoring 24/7 activé. Support prioritaire pendant 12 mois.<br><br>Tout au long du projet, vous avez un interlocuteur unique et un accès direct à l\'équipe technique via Slack ou WhatsApp.' },
        { q: 'Est-ce que je garde la propriété de mon code ?', cat: 'technique', color: '#bf00ff', a: 'Oui, <strong>à 100%</strong>. Vous êtes propriétaire de tout ce que nous développons pour vous :<br><br><strong>• Code source complet</strong> — Livré via un repository GitHub/GitLab à votre nom. Vous avez accès à chaque ligne de code, chaque commit, chaque décision technique.<br><br><strong>• Aucun lock-in</strong> — Votre projet tourne sur votre infrastructure (ou celle de votre choix). Vous pouvez migrer, modifier, ou faire évoluer le code avec n\'importe quel développeur.<br><br><strong>• Documentation technique</strong> — Architecture documentée, guide de déploiement, documentation API, instructions de maintenance.<br><br><strong>• Propriété intellectuelle</strong> — Un contrat clair vous transfère tous les droits de propriété intellectuelle dès le paiement final. Designs, code, contenus — tout vous appartient.<br><br><strong>• Open source friendly</strong> — Nous utilisons exclusivement des technologies open source sans licences cachées. Pas de dépendance à des outils propriétaires.<br><br>C\'est une différence majeure avec beaucoup d\'agences qui gardent le code en otage ou utilisent des builders propriétaires. Chez FlashAI, la transparence est totale.' },
        { q: 'Votre support est-il vraiment disponible 24/7 ?', cat: 'support', color: '#ff006e', a: 'Oui, notre support est <strong>réellement disponible 24/7</strong>. Voici comment nous y parvenons :<br><br><strong>• Temps de réponse garanti</strong><br>— Urgence critique (site down) : < 15 minutes<br>— Question importante : < 2 heures<br>— Demande standard : < 24 heures<br><br><strong>• Canaux de communication</strong><br>— Slack/Discord dédié (recommandé)<br>— WhatsApp direct<br>— Email : contact@flashai.dev<br>— Visioconférence sur demande<br><br><strong>• Couverture géographique</strong><br>Notre équipe est répartie entre Israël et l\'Europe, ce qui nous permet de couvrir tous les fuseaux horaires. Il y a toujours quelqu\'un de disponible.<br><br><strong>• Monitoring proactif</strong><br>Nous ne attendons pas que vous signaliez un problème. Notre système de monitoring détecte les anomalies en temps réel : uptime, performances, erreurs, sécurité. Nous intervenons souvent avant même que vous ne remarquiez un souci.<br><br><strong>• Inclus dans tous les plans</strong><br>Le support est inclus pendant 12 mois pour les plans Business et Enterprise. Le plan Starter inclut un support email pendant 3 mois.<br><br>Notre NPS (Net Promoter Score) est de 92/100, ce qui nous place parmi les meilleurs du secteur.' },
        { q: 'Travaillez-vous avec des entreprises hors d\'Israël ?', cat: 'general', color: '#00ff87', a: '<strong>Absolument !</strong> Bien que notre siège soit à Tel Aviv, <strong>80% de nos clients sont francophones</strong> basés en :<br><br>• <strong>France</strong> — Paris, Lyon, Marseille, Bordeaux, et toute la France<br>• <strong>Belgique</strong> — Bruxelles, Anvers, Liège<br>• <strong>Suisse</strong> — Genève, Lausanne, Zurich<br>• <strong>Luxembourg</strong><br>• <strong>Canada</strong> — Montréal, Québec<br>• <strong>Afrique francophone</strong> — Maroc, Tunisie, Sénégal, Côte d\'Ivoire<br><br><strong>Comment ça fonctionne à distance ?</strong><br>Grâce aux outils modernes (Slack, Zoom, Notion, GitHub), la collaboration est fluide et transparente. Nos clients ne sentent aucune différence avec une agence locale — sauf sur le prix et la rapidité !<br><br><strong>Fuseau horaire :</strong> Israël (GMT+2/+3) est parfaitement aligné avec l\'Europe. Les réunions se font aux heures de bureau françaises.<br><br><strong>Facturation :</strong> Nous facturons en euros, avec TVA intra-communautaire pour les entreprises européennes. Paiement par virement ou carte bancaire.' },
        { q: 'Comment intégrez-vous l\'IA dans vos projets ?', cat: 'technique', color: '#ffd700', a: 'L\'intelligence artificielle est au cœur de notre approche. Nous intégrons l\'IA de plusieurs façons :<br><br><strong>1. Chatbots intelligents</strong><br>— Basés sur GPT-4 ou Claude<br>— Entraînés sur vos données (documentation, FAQ, catalogue produits)<br>— Technologie RAG (Retrieval-Augmented Generation) pour des réponses précises<br>— Intégration WhatsApp, Messenger, site web, Slack<br><br><strong>2. Automatisations IA</strong><br>— Classification automatique d\'emails et demandes<br>— Génération de contenu (descriptions produits, articles, réponses clients)<br>— Extraction de données depuis des documents (factures, contrats, CVs)<br>— Analyse de sentiment sur les avis clients<br><br><strong>3. Analytics prédictifs</strong><br>— Prévision de ventes et de trafic<br>— Scoring de leads automatique<br>— Détection d\'anomalies en temps réel<br>— Recommandations personnalisées<br><br><strong>4. Optimisation IA de nos processus</strong><br>— Nous utilisons l\'IA pour accélérer notre propre développement<br>— Génération de code assistée<br>— Tests automatisés intelligents<br>— Documentation auto-générée<br><br>L\'IA n\'est pas un gadget marketing pour nous — c\'est un outil concret qui apporte une valeur mesurable à chaque projet.' },
        { q: 'Proposez-vous des facilités de paiement ?', cat: 'business', color: '#00f0ff', a: 'Oui, nous proposons plusieurs options pour faciliter votre investissement :<br><br><strong>Option 1 — Paiement en 2 fois</strong><br>— 50% à la commande (validation du prototype)<br>— 50% à la livraison finale<br>— Sans frais supplémentaires<br><br><strong>Option 2 — Paiement en 3 fois</strong><br>— 30% à la commande<br>— 30% à mi-parcours<br>— 40% à la livraison<br>— Sans frais supplémentaires<br><br><strong>Option 3 — Paiement mensuel</strong><br>— Pour les projets Enterprise uniquement<br>— Étalement sur 3 à 6 mois<br>— Frais de dossier de 5%<br><br><strong>Moyens de paiement acceptés :</strong><br>• Virement bancaire (SEPA)<br>• Carte bancaire (Visa, Mastercard, Amex)<br>• PayPal<br><br><strong>Facturation :</strong> Factures conformes avec TVA intra-communautaire pour les entreprises UE. Facturation en euros ou shekels selon votre préférence.<br><br>Pas de frais cachés, pas de surcoûts. Le prix annoncé est le prix final.' },
        { q: 'Que se passe-t-il après la livraison ?', cat: 'support', color: '#bf00ff', a: 'La livraison n\'est que le début de notre relation. Voici ce qui est inclus après la mise en ligne :<br><br><strong>Support & Maintenance inclus :</strong><br>— <strong>Starter :</strong> Support email 3 mois + hébergement 3 mois<br>— <strong>Business :</strong> Support prioritaire 12 mois + maintenance corrective<br>— <strong>Enterprise :</strong> Account manager dédié + maintenance illimitée 12 mois<br><br><strong>Ce qui est couvert :</strong><br>• Corrections de bugs (s\'il y en a)<br>• Mises à jour de sécurité<br>• Monitoring uptime et performances 24/7<br>• Sauvegardes automatiques quotidiennes<br>• Mises à jour des dépendances<br>• Petits ajustements texte/images<br><br><strong>Évolutions futures :</strong><br>Besoin d\'ajouter des fonctionnalités ? Nous proposons des packs heures à tarif préférentiel pour nos clients existants (réduction de 20%).<br><br><strong>Formation :</strong><br>Chaque livraison inclut une session de formation vidéo personnalisée + documentation complète pour que votre équipe soit autonome.<br><br><strong>Transfert de connaissances :</strong><br>Si vous souhaitez internaliser le développement à terme, nous facilitons la transition avec documentation technique complète et sessions de passation.' },
        { q: 'Vos sites sont-ils optimisés pour le SEO ?', cat: 'technique', color: '#ff006e', a: 'Le SEO est intégré dès la conception de chaque projet. Voici notre approche complète :<br><br><strong>SEO Technique :</strong><br>• Core Web Vitals optimisés (LCP < 2.5s, FID < 100ms, CLS < 0.1)<br>• Score Lighthouse 95+ garanti<br>• HTML sémantique (balises H1-H6, structured data, schema.org)<br>• Sitemap XML et robots.txt optimisés<br>• URLs propres et canonical tags<br>• Compression images (WebP/AVIF) et lazy loading<br>• Server-side rendering (Next.js) pour un indexation optimale<br><br><strong>SEO On-Page :</strong><br>• Balises meta title et description optimisées<br>• Hiérarchie de contenu structurée<br>• Maillage interne intelligent<br>• Balises Open Graph pour les réseaux sociaux<br>• Alt text pour toutes les images<br><br><strong>SEO Avancé (Plan Business+) :</strong><br>• Audit SEO complet de votre marché<br>• Recherche de mots-clés stratégiques<br>• Optimisation du contenu existant<br>• Analytics et suivi de positions<br>• Rapport mensuel de performances<br><br><strong>Résultats constatés :</strong><br>Nos clients voient en moyenne une <strong>augmentation de 200% du trafic organique</strong> dans les 3 premiers mois après le lancement.' },
        { q: 'Comment assurez-vous la sécurité des projets ?', cat: 'technique', color: '#00ff87', a: 'La sécurité est une priorité absolue sur chaque projet. Notre approche multi-couches :<br><br><strong>Infrastructure :</strong><br>• SSL/TLS (HTTPS) sur tous les projets<br>• WAF (Web Application Firewall) Cloudflare<br>• Protection DDoS intégrée<br>• Hébergement sur des providers certifiés (AWS, GCP, Vercel)<br>• Sauvegardes quotidiennes avec rétention 30 jours<br><br><strong>Code :</strong><br>• Audit OWASP Top 10 sur chaque projet<br>• Protection contre XSS, CSRF, SQL Injection<br>• Validation des inputs côté serveur<br>• Rate limiting et throttling<br>• Dependency scanning automatique<br><br><strong>Données :</strong><br>• Conformité RGPD complète<br>• Chiffrement des données sensibles (AES-256)<br>• Politique de rétention des données<br>• Privacy by design<br>• Consentement cookies conforme ePrivacy<br><br><strong>Authentification :</strong><br>• JWT sécurisés avec refresh tokens<br>• OAuth 2.0 / OpenID Connect<br>• 2FA disponible<br>• Politique de mots de passe robuste<br><br><strong>Monitoring :</strong><br>• Alertes en temps réel (Sentry, Datadog)<br>• Logs sécurisés et auditable<br>• Scan de vulnérabilités automatique mensuel' },
        { q: 'Puis-je voir des exemples de projets réalisés ?', cat: 'general', color: '#ffd700', a: 'Bien sûr ! Nous avons réalisé <strong>50+ projets</strong> dans des secteurs variés. Voici quelques références :<br><br><strong>🏢 TechVision — Dashboard SaaS</strong><br>Plateforme analytics avec 50+ widgets, temps réel, multi-utilisateurs. Stack : React, D3.js, Node.js, PostgreSQL. Résultat : +340% adoption utilisateurs.<br><br><strong>🛒 FoodExpress — E-Commerce</strong><br>Marketplace food-tech, livraison temps réel, Stripe, 10K+ produits. Stack : Next.js, Stripe, Google Maps. Résultat : €2M CA première année.<br><br><strong>🏥 MediCare Pro — CRM Médical</strong><br>Gestion patients, rendez-vous, facturation, conforme RGPD. Stack : React, PostgreSQL, OpenAI. Résultat : 5000+ patients gérés.<br><br><strong>💰 CryptoTrack — Fintech</strong><br>Portfolio crypto, alertes IA, analyse prédictive. Stack : Vue.js, Python, ML. Résultat : 15K utilisateurs actifs.<br><br><strong>🎓 EduSmart — EdTech</strong><br>E-learning adaptive, chatbot tuteur IA, quiz interactifs. Stack : Next.js, OpenAI, Prisma. Résultat : 98% satisfaction étudiants.<br><br>Chaque projet est détaillé dans notre section <a href="#portfolio" style="color:#ffd700">Réalisations</a>. Vous pouvez aussi demander des études de cas détaillées lors de notre appel découverte.' },
        { q: 'Comment gérez-vous les projets complexes ?', cat: 'technique', color: '#00f0ff', a: 'Les projets complexes sont notre spécialité. Voici notre approche :<br><br><strong>Architecture :</strong><br>• Microservices pour la scalabilité<br>• Event-driven architecture pour le temps réel<br>• API-first design pour l\'interopérabilité<br>• Domain-Driven Design pour les projets métier complexes<br><br><strong>Gestion de projet :</strong><br>• Méthodologie agile Scrum/Kanban<br>• Sprints courts de 2-3 jours<br>• Daily standups et démos quotidiennes<br>• Retrospectives pour amélioration continue<br>• Board Notion/Jira partagé en temps réel<br><br><strong>Qualité :</strong><br>• Tests unitaires, d\'intégration et E2E<br>• Code review systématique<br>• CI/CD avec déploiement automatique<br>• Documentation technique auto-générée<br>• Performance testing avant chaque release<br><br><strong>Scalabilité :</strong><br>• Infrastructure auto-scaling (Kubernetes)<br>• CDN global (Cloudflare)<br>• Database sharding et réplication<br>• Cache multi-niveaux (Redis, CDN, browser)<br><br>Pour les projets Enterprise, nous assignons un Tech Lead dédié qui coordonne l\'ensemble et garantit la cohérence architecturale.' },
        { q: 'Quels sont les avantages de travailler avec une agence israélienne ?', cat: 'general', color: '#bf00ff', a: 'Israël est reconnue comme la <strong>« Startup Nation »</strong> — voici pourquoi c\'est un avantage pour vous :<br><br><strong>1. Écosystème tech de classe mondiale</strong><br>— Plus de startups par habitant que n\'importe quel pays au monde<br>— Berceau de technologies utilisées par Google, Meta, Amazon<br>— Culture d\'innovation et de disruption<br><br><strong>2. Talent technique exceptionnel</strong><br>— Formations techniques parmi les meilleures (Technion, TAU, Hebrew U)<br>— Expérience dans des scale-ups internationales<br>— Culture du « faire plus avec moins »<br><br><strong>3. Rapport qualité-prix imbattable</strong><br>— Coût de développement 3-5x inférieur à Paris/Genève<br>— Qualité égale ou supérieure aux agences premium européennes<br>— Pas de compromis sur le design ou les performances<br><br><strong>4. Alignement culturel et linguistique</strong><br>— Équipe 100% francophone<br>— Fuseau horaire compatible (GMT+2/+3)<br>— Compréhension des marchés européens et nord-américains<br><br><strong>5. Innovation constante</strong><br>— Accès aux dernières technologies IA avant le marché<br>— R&D continue sur les outils et méthodologies<br>— Veille technologique permanente' },
        { q: 'Proposez-vous des partenariats ou du white-label ?', cat: 'business', color: '#ff006e', a: 'Oui ! Nous proposons plusieurs formules de partenariat :<br><br><strong>🤝 Partenariat Agence (White-label)</strong><br>Vous êtes une agence marketing, communication ou consulting ? Nous développons pour vos clients sous votre marque :<br>— Vous gardez la relation client<br>— Nous développons en marque blanche<br>— Tarifs partenaires privilégiés (-25%)<br>— NDA et confidentialité garantis<br>— Livraison directe à votre client si souhaité<br><br><strong>📊 Partenariat Technique</strong><br>Pour les freelances et développeurs qui veulent offrir plus de services :<br>— Sous-traitance technique au projet<br>— Renfort d\'équipe temporaire<br>— Expertise IA et data à la demande<br><br><strong>🏢 Partenariat Entreprise</strong><br>Pour les entreprises qui veulent un partenaire tech long terme :<br>— Pack heures mensuelles à tarif dédié<br>— Account manager attitré<br>— SLA personnalisé<br>— Roadmap technique co-construite<br><br><strong>💼 Programme d\'affiliation</strong><br>Recommandez FlashAI et gagnez 10% de commission sur chaque projet signé. Programme sans engagement, sans minimum.<br><br><a href="#contact" style="color:#ff006e">Contactez-nous</a> pour discuter du partenariat qui vous convient.' },
        { q: 'Comment fonctionne votre chatbot IA ?', cat: 'technique', color: '#00ff87', a: 'Nos chatbots sont bien plus que des FAQ automatisées. Voici l\'architecture technique :<br><br><strong>Technologie de base :</strong><br>• Modèle : GPT-4 (OpenAI) ou Claude (Anthropic)<br>• Architecture RAG (Retrieval-Augmented Generation)<br>• Base de connaissances vectorielle (Pinecone/Weaviate)<br>• Mémoire conversationnelle pour le contexte<br><br><strong>Entraînement :</strong><br>1. Nous ingérons vos données : site web, FAQ, documentation, catalogue<br>2. Les données sont vectorisées et indexées<br>3. Le chatbot cherche dans votre base de connaissances pour chaque question<br>4. GPT-4 formule une réponse naturelle basée sur vos données réelles<br>5. Fine-tuning du ton et du style selon votre marque<br><br><strong>Intégrations :</strong><br>• Widget sur votre site web (customisable)<br>• WhatsApp Business API<br>• Facebook Messenger<br>• Slack, Teams, Discord<br>• API REST pour intégration custom<br><br><strong>Fonctionnalités avancées :</strong><br>• Escalade automatique vers un humain<br>• Prise de rendez-vous intégrée<br>• Génération de leads qualifiés<br>• Multi-langue automatique<br>• Analytics des conversations<br>• Amélioration continue par feedback loop<br><br><strong>Résultats moyens :</strong><br>— Taux de résolution : 85%<br>— Réduction support humain : -60%<br>— Satisfaction utilisateur : 94%' },
        { q: 'Comment puis-je commencer un projet ?', cat: 'general', color: '#ffd700', a: 'Démarrer avec FlashAI est simple et rapide. Voici les étapes :<br><br><strong>Étape 1 — Premier contact (5 minutes)</strong><br>Remplissez notre <a href="#contact" style="color:#ffd700">formulaire intelligent</a> ou envoyez-nous un email à contact@flashai.dev. Décrivez brièvement votre projet et vos objectifs.<br><br><strong>Étape 2 — Appel découverte (30 minutes, gratuit)</strong><br>Un expert FlashAI vous rappelle dans les 2h pour :<br>— Comprendre vos besoins en détail<br>— Analyser votre existant<br>— Recommander la solution optimale<br>— Estimer le budget et le délai<br><br><strong>Étape 3 — Devis personnalisé (24h)</strong><br>Vous recevez un devis détaillé avec :<br>— Périmètre fonctionnel précis<br>— Stack technique recommandée<br>— Planning de livraison<br>— Prix ferme et définitif<br>— Conditions de paiement<br><br><strong>Étape 4 — Go ! 🚀</strong><br>Dès votre validation, nous démarrons immédiatement. Vous recevez votre premier prototype interactif en 48h.<br><br><strong>Pas de risque :</strong> Rappel — garantie satisfait ou remboursé à 100%. Vous ne payez le solde qu\'une fois 100% satisfait.<br><br>Des questions ? Appelez-nous, écrivez-nous, ou remplissez le formulaire. On vous répond en moins de 2h, 7j/7.' }
    ];

    let activeFilter = 'all', searchQuery = '', readCount = 0;

    function render() {
        const filtered = questions.filter(q => {
            const matchCat = activeFilter === 'all' || q.cat === activeFilter;
            const matchSearch = !searchQuery || q.q.toLowerCase().includes(searchQuery) || q.a.toLowerCase().includes(searchQuery);
            return matchCat && matchSearch;
        });
        list.innerHTML = filtered.map((q, i) => {
            const isRead = readSet.has(q.q);
            return `<div class="faq-card ${isRead ? 'faq-read' : ''}" style="transition-delay:${i * 0.05}s">
                <div class="faq-card-accent" style="background:${q.color}"></div>
                <button class="faq-question" data-idx="${i}">
                    <span class="faq-q-text">${highlightSearch(q.q)}</span>
                    <span class="faq-q-cat" style="color:${q.color}">${q.cat}</span>
                    <svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </button>
                <div class="faq-answer">${highlightSearch(q.a)}</div>
            </div>`;
        }).join('');

        list.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.faq-card');
                const wasOpen = card.classList.contains('open');
                card.classList.toggle('open');
                if (!wasOpen) {
                    const q = questions.find(x => x.q === btn.querySelector('.faq-q-text').textContent.trim() || highlightSearch(x.q) === btn.querySelector('.faq-q-text').innerHTML);
                    if (q && !readSet.has(q.q)) {
                        readSet.add(q.q);
                        readCount++;
                        updateProgress();
                    }
                }
            });
        });
    }

    function highlightSearch(text) {
        if (!searchQuery) return text;
        const regex = new RegExp(`(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
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

    // Tabs
    document.querySelectorAll('.faq-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeFilter = tab.dataset.cat;
            render();
        });
    });

    // Search
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

/* ========== CTA CANVAS ========== */
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
        { id: 'devis', name: 'Demande de Devis', icon: '📋', color: '#00f0ff', desc: 'Obtenez un devis personnalisé en 24h' },
        { id: 'contact', name: 'Contact Général', icon: '💬', color: '#bf00ff', desc: 'Une question ? Parlons-en !' },
        { id: 'partenariat', name: 'Partenariat', icon: '🤝', color: '#ff006e', desc: 'Travaillons ensemble' },
        { id: 'agence', name: 'White-Label Agence', icon: '🏢', color: '#ffd700', desc: 'Solutions pour agences' },
        { id: 'recrutement', name: 'Recrutement', icon: '🚀', color: '#00ff87', desc: 'Rejoignez l\'aventure' }
    ];

    let activeType = 'devis';

    const formConfigs = {
        devis: {
            fields: [
                { type: 'text', name: 'company', label: 'Nom de votre entreprise', placeholder: 'Acme Inc.', required: true },
                { type: 'email', name: 'email', label: 'Email professionnel', placeholder: 'vous@entreprise.com', required: true },
                { type: 'tel', name: 'phone', label: 'Téléphone', placeholder: '+33 6 12 34 56 78' },
                { type: 'chips', name: 'project_type', label: 'Type de projet', options: ['Site Vitrine','E-Commerce','CRM','Dashboard','Chatbot IA','Automatisation','Application Mobile','Autre'] },
                { type: 'range', name: 'budget', label: 'Budget estimé', min: 500, max: 15000, step: 500, suffix: '€' },
                { type: 'select', name: 'deadline', label: 'Délai souhaité', options: ['Le plus vite possible','1-2 semaines','1 mois','Pas de deadline précise'] },
                { type: 'textarea', name: 'description', label: 'Décrivez votre projet', placeholder: 'Décrivez votre projet, vos objectifs, vos contraintes...', rows: 4 },
                { type: 'chips', name: 'features', label: 'Fonctionnalités souhaitées', options: ['Design premium','SEO avancé','Multilingue','Analytics','Paiement en ligne','API','CRM intégré','IA'] }
            ]
        },
        contact: {
            fields: [
                { type: 'text', name: 'name', label: 'Votre nom', placeholder: 'Jean Dupont', required: true },
                { type: 'email', name: 'email', label: 'Email', placeholder: 'jean@email.com', required: true },
                { type: 'select', name: 'subject', label: 'Sujet', options: ['Question générale','Demande d\'information','Support technique','Autre'] },
                { type: 'textarea', name: 'message', label: 'Votre message', placeholder: 'Comment pouvons-nous vous aider ?', rows: 5, required: true }
            ]
        },
        partenariat: {
            fields: [
                { type: 'text', name: 'company', label: 'Votre entreprise', placeholder: 'Nom de votre agence/entreprise', required: true },
                { type: 'email', name: 'email', label: 'Email professionnel', placeholder: 'contact@agence.com', required: true },
                { type: 'text', name: 'website', label: 'Site web', placeholder: 'https://votre-site.com' },
                { type: 'chips', name: 'partner_type', label: 'Type de partenariat', options: ['White-label','Sous-traitance','Affiliation','Co-développement','Autre'] },
                { type: 'select', name: 'volume', label: 'Volume estimé / an', options: ['1-5 projets','5-15 projets','15-30 projets','30+ projets'] },
                { type: 'textarea', name: 'details', label: 'Détails', placeholder: 'Décrivez le partenariat que vous envisagez...', rows: 4 }
            ]
        },
        agence: {
            fields: [
                { type: 'text', name: 'agency', label: 'Nom de l\'agence', placeholder: 'Votre agence', required: true },
                { type: 'email', name: 'email', label: 'Email', placeholder: 'contact@agence.com', required: true },
                { type: 'tel', name: 'phone', label: 'Téléphone', placeholder: '+33 1 23 45 67 89' },
                { type: 'chips', name: 'services', label: 'Services recherchés', options: ['Développement web','Développement mobile','IA & Chatbot','CRM custom','Design UI/UX','DevOps','Consulting technique'] },
                { type: 'select', name: 'team_size', label: 'Taille de votre agence', options: ['1-5 personnes','5-20 personnes','20-50 personnes','50+ personnes'] },
                { type: 'textarea', name: 'needs', label: 'Vos besoins', placeholder: 'Décrivez vos besoins en sous-traitance technique...', rows: 4 }
            ]
        },
        recrutement: {
            fields: [
                { type: 'text', name: 'name', label: 'Nom complet', placeholder: 'Votre nom', required: true },
                { type: 'email', name: 'email', label: 'Email', placeholder: 'votre@email.com', required: true },
                { type: 'chips', name: 'role', label: 'Poste souhaité', options: ['Développeur Frontend','Développeur Backend','Développeur Full-Stack','Designer UI/UX','Chef de projet','DevOps','IA / ML Engineer'] },
                { type: 'text', name: 'portfolio', label: 'Portfolio / GitHub', placeholder: 'https://github.com/vous' },
                { type: 'select', name: 'experience', label: 'Expérience', options: ['Junior (0-2 ans)','Intermédiaire (2-5 ans)','Senior (5-10 ans)','Expert (10+ ans)'] },
                { type: 'select', name: 'availability', label: 'Disponibilité', options: ['Immédiate','1 mois','2-3 mois','À discuter'] },
                { type: 'textarea', name: 'motivation', label: 'Motivation', placeholder: 'Pourquoi souhaitez-vous rejoindre FlashAI ?', rows: 4 }
            ]
        }
    };

    function renderSelector() {
        selector.innerHTML = `<div class="sf-types">${types.map(t => `<button class="smart-form-type ${t.id === activeType ? 'active' : ''}" data-type="${t.id}" style="--form-color:${t.color}">
            <span class="sf-type-icon">${t.icon}</span>
            <span class="sf-type-name">${t.name}</span>
            <span class="sf-type-desc">${t.desc}</span>
        </button>`).join('')}</div>`;
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
        container.innerHTML = `<form class="smart-form" action="https://formspree.io/f/xvgogwvz" method="POST" style="--form-color:${typeInfo.color}">
            <input type="hidden" name="form_type" value="${activeType}">
            <div class="sf-fields">${config.fields.map(f => renderField(f, typeInfo.color)).join('')}</div>
            <button type="submit" class="sf-submit" style="background:${typeInfo.color}"><span>Envoyer ${typeInfo.icon}</span></button>
        </form>`;

        // Chips logic
        container.querySelectorAll('.sf-chip').forEach(chip => {
            chip.addEventListener('click', () => chip.classList.toggle('active'));
        });

        // Range logic
        container.querySelectorAll('.sf-range').forEach(range => {
            const val = range.parentElement.querySelector('.sf-range-val');
            range.addEventListener('input', () => {
                val.textContent = (+range.value).toLocaleString('fr') + ' ' + (range.dataset.suffix || '');
            });
        });

        // Submit
        container.querySelector('.smart-form').addEventListener('submit', e => {
            e.preventDefault();
            const btn = container.querySelector('.sf-submit');
            btn.innerHTML = '<span>Envoyé ! ✨</span>';
            btn.style.background = '#00ff87';
            showToast('Message envoyé avec succès !');
            setTimeout(() => { btn.innerHTML = `<span>Envoyer ${typeInfo.icon}</span>`; btn.style.background = typeInfo.color; }, 3000);
        });
    }

    function renderField(f, color) {
        if (f.type === 'chips') {
            return `<div class="sf-field sf-field-full"><label class="sf-label">${f.label}</label><div class="sf-chips">${f.options.map(o => `<button type="button" class="sf-chip" style="--chip-color:${color}">${o}</button>`).join('')}</div><input type="hidden" name="${f.name}"></div>`;
        }
        if (f.type === 'range') {
            const mid = Math.round((f.min + f.max) / 2);
            return `<div class="sf-field sf-field-full"><label class="sf-label">${f.label}</label><input type="range" class="sf-range" name="${f.name}" min="${f.min}" max="${f.max}" step="${f.step}" value="${mid}" data-suffix="${f.suffix || ''}"><div class="sf-range-val" style="color:${color}">${mid.toLocaleString('fr')} ${f.suffix || ''}</div></div>`;
        }
        if (f.type === 'select') {
            return `<div class="sf-field"><label class="sf-label">${f.label}</label><select class="sf-select" name="${f.name}">${f.options.map(o => `<option>${o}</option>`).join('')}</select></div>`;
        }
        if (f.type === 'textarea') {
            return `<div class="sf-field sf-field-full"><label class="sf-label">${f.label}</label><textarea class="sf-textarea" name="${f.name}" rows="${f.rows || 4}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}></textarea></div>`;
        }
        return `<div class="sf-field"><label class="sf-label">${f.label}</label><input type="${f.type}" class="sf-input" name="${f.name}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}></div>`;
    }

    renderSelector();
    renderForm();
}

/* ========== MAGNETIC BUTTON ========== */
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

