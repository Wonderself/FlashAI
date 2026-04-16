/**
 * FlashAI v6.0 — ULTIMATE VISUAL UPGRADE
 * Rose Sparkle Cursor, Slow Terminal, 3D Pricing, Smart Form, Knowledge Base FAQ
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
    initHeroParticles();
    initDemoCRM();
    initDemoDevis();
    initDemoChatbot();
    initDemoDashboard();
    initDemoTabs();
    initComparison();
    // initExpertise(); // removed
    initMethodTimeline();
    initPortfolio();
    // initTestimonials(); // removed
    initGalaxy();
    initToolsMobile();
    initGalaxyCategories();
    initPricing();
    // initROICalculator(); // removed
    initFAQ();
    initCTACanvas();
    // initCTATimer(); // removed
    initServicesDots();
    initAdnDots();
    initSmartForm();
    initTrustBar();
    initMagneticBtn();
    initScrollTop();
    initSmoothAnchors();
    initThreeBackground();
    initEasterEggs();
    initElectricSparks();
    initSectionFlashReveal();
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
    const ringCircle = document.getElementById('loader-ring-circle');
    const loaderContent = loader ? loader.querySelector('.loader-content') : null;
    if (!loader) return;
    document.body.style.overflow = 'hidden';

    /* --- Canvas particle system --- */
    const canvas = document.getElementById('loader-canvas');
    let ctx, cw, ch, particles = [];
    if (canvas) {
        ctx = canvas.getContext('2d');
        cw = canvas.width = window.innerWidth;
        ch = canvas.height = window.innerHeight;
        const pColors = ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87','#ff00ff','#e879f9','#f472b6'];
        class LoaderParticle {
            constructor() { this.reset(); }
            reset() {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * 100;
                this.x = cw / 2 + Math.cos(angle) * dist;
                this.y = ch / 2 + Math.sin(angle) * dist;
                this.vx = (Math.random() - 0.5) * 2.5;
                this.vy = (Math.random() - 0.5) * 2.5;
                this.life = 1;
                this.decay = Math.random() * 0.006 + 0.002;
                this.size = Math.random() * 3 + 0.5;
                this.color = pColors[Math.floor(Math.random() * pColors.length)];
                this.trail = [];
            }
            update() {
                this.trail.push({x: this.x, y: this.y});
                if (this.trail.length > 6) this.trail.shift();
                this.x += this.vx;
                this.y += this.vy;
                this.vx *= 0.998;
                this.vy *= 0.998;
                this.life -= this.decay;
                if (this.life <= 0) this.reset();
            }
            draw() {
                // Draw trail
                this.trail.forEach((pt, i) => {
                    const a = (i / this.trail.length) * this.life * 0.3;
                    ctx.globalAlpha = a;
                    ctx.fillStyle = this.color;
                    ctx.beginPath();
                    ctx.arc(pt.x, pt.y, this.size * (i / this.trail.length) * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                });
                ctx.globalAlpha = this.life * 0.7;
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }
        for (let i = 0; i < 120; i++) particles.push(new LoaderParticle());
        let animId;
        function animateParticles() {
            ctx.clearRect(0, 0, cw, ch);
            particles.forEach(p => { p.update(); p.draw(); });
            ctx.globalAlpha = 1;
            animId = requestAnimationFrame(animateParticles);
        }
        animateParticles();
        /* Store animId so we can cancel later */
        loader._particleAnim = animId;
        loader._particles = particles;
        loader._ctx = ctx;
        loader._cw = cw;
        loader._ch = ch;
    }

    /* --- Letter-by-letter reveal --- */
    const letters = document.querySelectorAll('.loader-letter');
    letters.forEach((letter, i) => {
        setTimeout(() => letter.classList.add('visible'), 200 + i * 120);
    });

    /* --- Progress with ring + bar + boot text --- */
    const ringTotal = 452.4; /* 2 * PI * 72 */
    const lines = ['[INIT] Booting FlashAI neural core...','[OK] 247 APIs connected','[OK] AI engine ready (GPT-4 + Claude)','[OK] Galaxy renderer initialized','[OK] Design system loaded','[OK] Sparkle engine armed','[OK] Security layer active','[LAUNCH] FlashAI v6.0 — Ready to deploy'];
    let progress = 0, lineIdx = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 4;
        if (progress > 100) progress = 100;
        if (bar) bar.style.width = progress + '%';
        if (pct) pct.textContent = Math.floor(progress) + '%';
        if (ringCircle) ringCircle.style.strokeDashoffset = ringTotal - (ringTotal * progress / 100);
        if (lineIdx < lines.length && progress > (lineIdx + 1) * (100 / lines.length)) {
            if (boot) {
                const s = document.createElement('div');
                s.textContent = lines[lineIdx];
                s.style.cssText = 'opacity:0;transform:translateX(-10px);transition:all 0.3s';
                boot.appendChild(s);
                requestAnimationFrame(() => { s.style.opacity = '1'; s.style.transform = 'translateX(0)'; });
            }
            lineIdx++;
        }
        if (progress >= 100) {
            clearInterval(interval);
            /* --- Explosion finale --- */
            setTimeout(() => {
                if (loaderContent) loaderContent.classList.add('loader-explode');
                /* Burst particles outward — big explosion */
                if (loader._particles && loader._ctx) {
                    loader._particles.forEach(p => {
                        const angle = Math.random() * Math.PI * 2;
                        const speed = Math.random() * 20 + 8;
                        p.vx = Math.cos(angle) * speed;
                        p.vy = Math.sin(angle) * speed;
                        p.decay = 0.015;
                        p.size = Math.random() * 5 + 2;
                        p.trail = [];
                    });
                }
                setTimeout(() => {
                    loader.classList.add('hidden');
                    document.body.style.overflow = '';
                    if (loader._particleAnim) cancelAnimationFrame(loader._particleAnim);
                }, 800);
            }, 300);
        }
    }, 200);
    /* Safety timeout */
    setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 6000);
}

function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => { bar.style.width = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%'; }, { passive: true });
}

/* ========== ROSE/PINK SPARKLE CURSOR ========== */
function initSparkleCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, mx = 0, my = 0, pmx = 0, pmy = 0;
    const particles = [];
    const roseColors = ['#ff006e','#e879f9','#f472b6','#fda4af','#ffd700','#00f0ff','#ff69b4','#fb7185','#f9a8d4','#c084fc','#f0abfc'];

    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    class Sparkle {
        constructor(x, y) {
            this.x = x + (Math.random() - 0.5) * 24;
            this.y = y + (Math.random() - 0.5) * 24;
            this.vx = (Math.random() - 0.5) * 3;
            this.vy = (Math.random() - 0.5) * 3 - 1;
            this.life = 1;
            this.decay = Math.random() * 0.014 + 0.008;
            this.size = Math.random() * 5.5 + 1.5;
            this.color = roseColors[Math.floor(Math.random() * roseColors.length)];
            this.type = Math.random() > 0.25 ? 'star' : 'circle';
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.15;
            this.twinkle = Math.random() * Math.PI * 2;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += 0.02;
            this.life -= this.decay;
            this.rotation += this.rotSpeed;
            this.size *= 0.997;
            this.twinkle += 0.15;
        }
        draw() {
            const twinkleAlpha = 0.5 + Math.sin(this.twinkle) * 0.3;
            ctx.save();
            ctx.globalAlpha = this.life * twinkleAlpha;
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
                ctx.shadowBlur = this.size * 4;
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = this.size * 5;
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
        const spawnCount = Math.min(Math.floor(speed * 0.6) + 1, 10);

        if (speed > 1 && frame % 2 === 0) {
            for (let i = 0; i < spawnCount + 2; i++) {
                particles.push(new Sparkle(mx, my));
            }
        }

        // Rose/pink gradient glow with feathered edge
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 65);
        grad.addColorStop(0, 'rgba(255, 0, 110, 0.18)');
        grad.addColorStop(0.25, 'rgba(232, 121, 249, 0.10)');
        grad.addColorStop(0.5, 'rgba(244, 114, 182, 0.05)');
        grad.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(mx, my, 65, 0, Math.PI * 2);
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
    const obs = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }); }, { threshold: 0.01, rootMargin: '50px' });
    // Observe all current .reveal elements
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    // Watch for dynamically added .reveal elements
    const mo = new MutationObserver(mutations => {
        mutations.forEach(m => {
            m.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;
                if (node.classList && node.classList.contains('reveal') && !node.classList.contains('visible')) obs.observe(node);
                if (node.querySelectorAll) node.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
            });
        });
    });
    mo.observe(document.body, { childList: true, subtree: true });
    // Expose globally so other functions can trigger re-scan
    window._revealObs = obs;
    // Safety net: if any .reveal elements are still hidden after 3s, force-show them
    setTimeout(() => {
        document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
            el.classList.add('visible');
        });
    }, 3000);
}

function initHeader() {
    const hdr = document.getElementById('main-header');
    if (!hdr) return;
    var badge = document.getElementById('hero-badge');
    var hero = document.getElementById('hero');
    function syncBadge() {
        if (!badge || !hero) return;
        var logo = hdr.querySelector('a');
        var bot = logo ? logo.getBoundingClientRect().bottom : hdr.getBoundingClientRect().bottom;
        var heroTop = hero.getBoundingClientRect().top;
        badge.style.paddingTop = Math.round(bot - heroTop - 25) + 'px';
    }
    requestAnimationFrame(function() { requestAnimationFrame(syncBadge); });
    window.addEventListener('resize', syncBadge);
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
    const tools = [
        { name: 'React', color: '#61dafb' },
        { name: 'Vue.js', color: '#42b883' },
        { name: 'Next.js', color: '#00f0ff' },
        { name: 'Node.js', color: '#68a063' },
        { name: 'Python', color: '#ffd43b' },
        { name: 'TypeScript', color: '#3178c6' },
        { name: 'PostgreSQL', color: '#336791' },
        { name: 'MongoDB', color: '#47a248' },
        { name: 'Redis', color: '#dc382d' },
        { name: 'Docker', color: '#2496ed' },
        { name: 'AWS', color: '#ff9900' },
        { name: 'Vercel', color: '#ffffff' },
        { name: 'Stripe', color: '#635bff' },
        { name: 'OpenAI', color: '#00ff87' },
        { name: 'TailwindCSS', color: '#06b6d4' },
        { name: 'GraphQL', color: '#e535ab' },
        { name: 'Firebase', color: '#ffca28' },
        { name: 'Supabase', color: '#3ecf8e' },
        { name: 'Prisma', color: '#2d3748' },
        { name: 'tRPC', color: '#398ccb' },
        { name: 'Cloudflare', color: '#f38020' },
        { name: 'Twilio', color: '#f22f46' },
        { name: 'Zapier', color: '#ff4a00' },
        { name: 'Make', color: '#6d4aff' },
        { name: 'n8n', color: '#ea4b71' },
        { name: 'HubSpot', color: '#ff7a59' },
        { name: 'Slack', color: '#4a154b' },
        { name: 'Figma', color: '#a259ff' },
        { name: 'GitHub', color: '#f0f0f0' },
        { name: 'VS Code', color: '#007acc' },
        { name: 'Kubernetes', color: '#326ce5' },
        { name: 'GPT-4', color: '#00ff87' }
    ];
    function buildColor(id, items) {
        const r = document.getElementById(id);
        if (!r) return;
        const html = items.map(t => '<span class="marquee-pill-color" style="--pill-color:' + t.color + ';--pill-bg:' + t.color + '12;--pill-glow:' + t.color + '40"><span class="marquee-pill-dot"></span>' + t.name + '</span>').join('');
        r.innerHTML = html + html;
    }
    buildColor('marquee-row-1', tools);
}

function initServices() {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    const svcs = [
        { icon: '\u{1F310}', title: 'Sites Web', desc: 'Sites vitrines, landing pages, e-commerce. Design premium, SEO-ready, ultra-rapides.', color: '#00f0ff', anim: 'browser' },
        { icon: '\u{1F4CA}', title: 'CRM & ERP', desc: 'Outils de gestion clients sur mesure. Pipelines, automatisations, dashboards.', color: '#bf00ff', anim: 'dashboard' },
        { icon: '\u{1F916}', title: 'Chatbot IA', desc: 'Assistants virtuels intelligents. Integration WhatsApp, site, Messenger.', color: '#ff006e', anim: 'chat' },
        { icon: '\u26A1', title: 'Automatisation', desc: 'Workflows automatises entre vos outils. Zapier, Make, n8n, scripts custom.', color: '#ff8c00', anim: 'flow' },
        { icon: '\u{1F50D}', title: 'SEO Technique', desc: 'Audit complet, Core Web Vitals. Resultats mesurables en 30 jours.', color: '#00ff87', anim: 'chart' },
        { icon: '\u{1F6E1}\uFE0F', title: 'Securite', desc: 'SSL, WAF, audit OWASP, RGPD. Protection complete de vos assets.', color: '#ffd700', anim: 'shield' }
    ];
    grid.innerHTML = svcs.map((s, i) => '<div class="bento-card reveal" style="--card-glow:' + s.color + '30;transition-delay:' + (i*0.1) + 's" data-tilt><div class="bento-card-glow"></div><div class="bento-icon" style="background:' + s.color + '15;color:' + s.color + '">' + s.icon + '</div><h3 class="font-display font-bold text-lg mb-2">' + s.title + '</h3><p class="text-surface-400 text-sm leading-relaxed">' + s.desc + '</p><div class="bento-mini-anim" id="bento-anim-' + s.anim + '"></div></div>').join('');
    grid.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => { const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5; card.style.transform = 'perspective(1000px) rotateY(' + (x*8) + 'deg) rotateX(' + (-y*8) + 'deg) translateY(-4px)'; const g = card.querySelector('.bento-card-glow'); if(g) { g.style.setProperty('--mouse-x', (e.clientX-r.left)+'px'); g.style.setProperty('--mouse-y', (e.clientY-r.top)+'px'); } });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
    initBentoAnims();
}

function initBentoAnims() {
    const anims = {
        /* ---- SITE WEB: Full mini-browser with nav, hero, cards, footer, cursor ---- */
        browser: '<div class="ba-browser">' +
            '<div class="ba-browser-chrome"><div class="ba-dots"><span style="background:#ff5f57"></span><span style="background:#ffbd2e"></span><span style="background:#28c840"></span></div><div class="ba-url-bar"><div class="ba-url-typing"></div></div></div>' +
            '<div class="ba-browser-body">' +
            '<div class="ba-s-nav"><div class="ba-s-nav-logo"></div><div class="ba-s-nav-link"></div><div class="ba-s-nav-link"></div><div class="ba-s-nav-link"></div><div class="ba-s-nav-cta"></div></div>' +
            '<div class="ba-s-hero"><div class="ba-s-hero-bg"><div class="ba-s-h1"></div><div class="ba-s-h2"></div><div class="ba-s-btn"></div></div></div>' +
            '<div class="ba-s-cards"><div class="ba-s-card"><div class="ba-s-card-img"></div><div class="ba-s-card-line"></div><div class="ba-s-card-line2"></div></div><div class="ba-s-card"><div class="ba-s-card-img"></div><div class="ba-s-card-line"></div><div class="ba-s-card-line2"></div></div><div class="ba-s-card"><div class="ba-s-card-img"></div><div class="ba-s-card-line"></div><div class="ba-s-card-line2"></div></div></div>' +
            '<div class="ba-s-footer"><div class="ba-s-footer-link"></div><div class="ba-s-footer-link"></div><div class="ba-s-footer-link"></div></div>' +
            '</div>' +
            '<div class="ba-build-bar"><div class="ba-build-fill"></div></div>' +
            '<div class="ba-cursor"><svg viewBox="0 0 12 18"><path d="M1 1l10 7-5 1.5L4 16z" fill="white" stroke="black" stroke-width="1"/></svg></div>' +
            '</div>',

        /* ---- CRM: Kanban board with sidebar, columns, cards, chart ---- */
        dashboard: '<div class="ba-crm">' +
            '<div class="ba-crm-sidebar"><div class="ba-crm-sidebar-item active"></div><div class="ba-crm-sidebar-item" style="animation-delay:0.3s"></div><div class="ba-crm-sidebar-item" style="animation-delay:0.6s"></div><div class="ba-crm-sidebar-item" style="animation-delay:0.9s"></div><div class="ba-crm-sidebar-item" style="animation-delay:1.2s;width:60%"></div></div>' +
            '<div class="ba-crm-main">' +
            '<div class="ba-crm-header"><div class="ba-crm-title">Pipeline</div><div class="ba-crm-add-btn">+</div></div>' +
            '<div class="ba-crm-kanban">' +
            '<div class="ba-crm-col"><div class="ba-crm-col-label"><div class="ba-crm-col-dot" style="background:rgba(255,140,0,0.6)"></div>Prospects</div><div class="ba-crm-card" style="border-color:rgba(255,140,0,0.3)"><div class="ba-crm-card-name"></div><div class="ba-crm-card-meta"><div class="ba-crm-card-avatar" style="background:rgba(255,140,0,0.25)"></div><div class="ba-crm-card-val"></div></div></div><div class="ba-crm-card" style="border-color:rgba(255,140,0,0.3)"><div class="ba-crm-card-name" style="width:55%"></div><div class="ba-crm-card-meta"><div class="ba-crm-card-avatar" style="background:rgba(255,215,0,0.25)"></div><div class="ba-crm-card-val"></div></div></div></div>' +
            '<div class="ba-crm-col"><div class="ba-crm-col-label"><div class="ba-crm-col-dot" style="background:rgba(0,240,255,0.6)"></div>En cours</div><div class="ba-crm-card" style="border-color:rgba(0,240,255,0.3)"><div class="ba-crm-card-name" style="width:80%"></div><div class="ba-crm-card-meta"><div class="ba-crm-card-avatar" style="background:rgba(0,240,255,0.25)"></div><div class="ba-crm-card-val"></div></div></div></div>' +
            '<div class="ba-crm-col"><div class="ba-crm-col-label"><div class="ba-crm-col-dot" style="background:rgba(0,255,135,0.6)"></div>Gagn\u00e9</div><div class="ba-crm-card" style="border-color:rgba(0,255,135,0.3)"><div class="ba-crm-card-name" style="width:60%"></div><div class="ba-crm-card-meta"><div class="ba-crm-card-avatar" style="background:rgba(0,255,135,0.25)"></div><div class="ba-crm-card-val"></div></div></div><div class="ba-crm-card" style="border-color:rgba(0,255,135,0.3)"><div class="ba-crm-card-name" style="width:45%"></div><div class="ba-crm-card-meta"><div class="ba-crm-card-avatar" style="background:rgba(191,0,255,0.25)"></div><div class="ba-crm-card-val"></div></div></div></div>' +
            '</div>' +
            '<div class="ba-crm-chart">' + Array.from({length:12}, (_,i) => '<div class="ba-crm-chart-bar" style="animation-delay:' + (i*0.15) + 's"></div>').join('') + '</div>' +
            '</div></div>',

        /* ---- CHATBOT: Rich conversation with cards, quick replies, typing ---- */
        chat: '<div class="ba-chat">' +
            '<div class="ba-chat-header"><div class="ba-chat-bot-avatar">\u{1F916}</div><div class="ba-chat-bot-info"><div class="ba-chat-bot-name">FlashAI Bot</div><div class="ba-chat-bot-status">En ligne</div></div></div>' +
            '<div class="ba-chat-msgs">' +
            '<div class="ba-chat-msg ba-chat-msg-bot"><div class="ba-chat-bubble">Bonjour ! Comment puis-je vous aider ?</div></div>' +
            '<div class="ba-chat-msg ba-chat-msg-user"><div class="ba-chat-bubble">Je cherche des infos sur vos prix</div></div>' +
            '<div class="ba-chat-msg ba-chat-msg-bot"><div class="ba-chat-bubble">Voici nos formules :</div></div>' +
            '<div class="ba-chat-msg ba-chat-msg-bot"><div class="ba-chat-rich-card"><div class="ba-chat-rich-img"></div><div class="ba-chat-rich-title"></div><div class="ba-chat-rich-desc"></div><div class="ba-chat-rich-btns"><div class="ba-chat-rich-btn"></div><div class="ba-chat-rich-btn"></div></div></div></div>' +
            '<div class="ba-chat-msg ba-chat-msg-user"><div class="ba-chat-bubble">Super, merci !</div></div>' +
            '</div>' +
            '<div class="ba-chat-quick"><div class="ba-chat-quick-btn">Tarifs</div><div class="ba-chat-quick-btn">D\u00e9lai</div><div class="ba-chat-quick-btn">Contact</div></div>' +
            '<div class="ba-chat-typing"><div class="ba-chat-typing-dot"></div><div class="ba-chat-typing-dot"></div><div class="ba-chat-typing-dot"></div></div>' +
            '<div class="ba-chat-input"><div class="ba-chat-input-field"></div><div class="ba-chat-input-send"></div></div>' +
            '</div>',

        /* ---- AUTOMATION: Node-based workflow pipeline with data packets ---- */
        flow: '<div class="ba-flow">' +
            '<div class="ba-flow-label">Workflow actif</div>' +
            '<div class="ba-flow-canvas"><div class="ba-flow-pipeline">' +
            '<div class="ba-flow-node active"><span>&#9993;</span><div class="ba-flow-node-label">Email</div></div>' +
            '<div class="ba-flow-conn"><div class="ba-flow-conn-line"></div><div class="ba-flow-data-packet"></div></div>' +
            '<div class="ba-flow-node"><span>&#9881;</span><div class="ba-flow-node-label">Process</div></div>' +
            '<div class="ba-flow-conn"><div class="ba-flow-conn-line"></div><div class="ba-flow-data-packet" style="animation-delay:0.4s"></div></div>' +
            '<div class="ba-flow-node active"><span>&#128202;</span><div class="ba-flow-node-label">CRM</div></div>' +
            '<div class="ba-flow-conn"><div class="ba-flow-conn-line"></div><div class="ba-flow-data-packet" style="animation-delay:0.8s"></div></div>' +
            '<div class="ba-flow-node"><span>&#10003;</span><div class="ba-flow-node-label">Done</div></div>' +
            '</div></div>' +
            '<div class="ba-flow-status"><div class="ba-flow-status-item"><div class="ba-flow-status-dot" style="background:#00ff87"></div>3 actifs</div><div class="ba-flow-status-item"><div class="ba-flow-status-dot" style="background:#ff8c00"></div>1 en attente</div><div class="ba-flow-status-item"><div class="ba-flow-status-dot" style="background:rgba(255,255,255,0.2)"></div>0 erreurs</div></div>' +
            '</div>',

        /* ---- SEO: Lighthouse audit with ring gauge, vitals, chart, keywords ---- */
        chart: '<div class="ba-seo">' +
            '<div class="ba-seo-top">' +
            '<div class="ba-seo-ring"><svg viewBox="0 0 48 48"><defs><linearGradient id="seo-ring-grad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="rgba(0,255,135,0.8)"/><stop offset="100%" stop-color="rgba(0,240,255,0.8)"/></linearGradient></defs><circle class="bg" cx="24" cy="24" r="22"/><circle class="fg" cx="24" cy="24" r="22"/></svg><div class="ba-seo-ring-score">98</div><div class="ba-seo-ring-label">Lighthouse</div></div>' +
            '<div class="ba-seo-sub">' +
            '<div class="ba-seo-sub-row"><div class="ba-seo-sub-dot" style="background:#00ff87"></div><div class="ba-seo-sub-label">Performance</div><div class="ba-seo-sub-bar"><div class="ba-seo-sub-fill" style="--target:96%;background:linear-gradient(90deg,#00ff87,#00f0ff)"></div></div></div>' +
            '<div class="ba-seo-sub-row"><div class="ba-seo-sub-dot" style="background:#bf00ff"></div><div class="ba-seo-sub-label">Accessibility</div><div class="ba-seo-sub-bar"><div class="ba-seo-sub-fill" style="--target:92%;background:linear-gradient(90deg,#bf00ff,#ff006e);animation-delay:0.3s"></div></div></div>' +
            '<div class="ba-seo-sub-row"><div class="ba-seo-sub-dot" style="background:#00f0ff"></div><div class="ba-seo-sub-label">Best Practices</div><div class="ba-seo-sub-bar"><div class="ba-seo-sub-fill" style="--target:100%;background:linear-gradient(90deg,#00f0ff,#00ff87);animation-delay:0.6s"></div></div></div>' +
            '<div class="ba-seo-sub-row"><div class="ba-seo-sub-dot" style="background:#ff8c00"></div><div class="ba-seo-sub-label">SEO</div><div class="ba-seo-sub-bar"><div class="ba-seo-sub-fill" style="--target:98%;background:linear-gradient(90deg,#ff8c00,#ffd700);animation-delay:0.9s"></div></div></div>' +
            '</div></div>' +
            '<div class="ba-seo-vitals"><div class="ba-seo-vital"><div class="ba-seo-vital-val" style="color:#00ff87">0.8s</div><div class="ba-seo-vital-label">FCP</div></div><div class="ba-seo-vital"><div class="ba-seo-vital-val" style="color:#00f0ff">1.2s</div><div class="ba-seo-vital-label">LCP</div></div><div class="ba-seo-vital"><div class="ba-seo-vital-val" style="color:#bf00ff">0.01</div><div class="ba-seo-vital-label">CLS</div></div><div class="ba-seo-vital"><div class="ba-seo-vital-val" style="color:#ff8c00">50ms</div><div class="ba-seo-vital-label">TBT</div></div></div>' +
            '<div class="ba-seo-chart">' + Array.from({length:16}, (_,i) => '<div class="ba-seo-chart-bar" style="--h1:' + (15+Math.random()*25) + '%;--h2:' + (55+Math.random()*40) + '%;background:linear-gradient(180deg,rgba(0,255,135,0.4),rgba(0,240,255,0.15));animation-delay:' + (i*0.12) + 's"></div>').join('') + '</div>' +
            '<div class="ba-seo-kw"><div class="ba-seo-kw-tag"><span class="ba-seo-kw-arrow">\u2191</span>SEO</div><div class="ba-seo-kw-tag"><span class="ba-seo-kw-arrow">\u2191</span>Core Vitals</div><div class="ba-seo-kw-tag"><span class="ba-seo-kw-arrow">\u2191</span>Schema</div><div class="ba-seo-kw-tag"><span class="ba-seo-kw-arrow">\u2191</span>Sitemap</div></div>' +
            '</div>',

        /* ---- SECURITY: Shield scan with checks, encryption, threat counters ---- */
        shield: '<div class="ba-sec">' +
            '<div class="ba-sec-top">' +
            '<div class="ba-sec-shield"><svg viewBox="0 0 40 46"><path d="M20 2L4 10v14c0 12 16 20 16 20s16-8 16-20V10L20 2z" fill="rgba(255,215,0,0.04)" stroke="rgba(255,215,0,0.25)" stroke-width="1.5"/><path d="M15 24l4 4 7-8" fill="none" stroke="rgba(255,215,0,0.6)" stroke-width="2" stroke-linecap="round" stroke-dasharray="24" stroke-dashoffset="24"><animate attributeName="stroke-dashoffset" from="24" to="0" dur="2s" repeatCount="indefinite"/></path></svg><div class="ba-sec-shield-scan"></div></div>' +
            '<div class="ba-sec-checks"><div class="ba-sec-check"><span class="ba-sec-check-icon" style="color:#00ff87">&#10003;</span> SSL/TLS 1.3</div><div class="ba-sec-check"><span class="ba-sec-check-icon" style="color:#00ff87">&#10003;</span> WAF Active</div><div class="ba-sec-check"><span class="ba-sec-check-icon" style="color:#00ff87">&#10003;</span> OWASP Top 10</div><div class="ba-sec-check"><span class="ba-sec-check-icon" style="color:#00ff87">&#10003;</span> RGPD OK</div><div class="ba-sec-check"><span class="ba-sec-check-icon" style="color:#00ff87">&#10003;</span> 2FA Enforced</div></div>' +
            '</div>' +
            '<div class="ba-sec-encrypt"><div class="ba-sec-encrypt-label">AES-256</div><div class="ba-sec-encrypt-bar"><div class="ba-sec-encrypt-fill"></div></div></div>' +
            '<div class="ba-sec-threats"><div class="ba-sec-threat"><div class="ba-sec-threat-val" style="color:#00ff87">0</div><div class="ba-sec-threat-label">Menaces</div></div><div class="ba-sec-threat"><div class="ba-sec-threat-val" style="color:#00f0ff">847</div><div class="ba-sec-threat-label">Bloqu\u00e9es</div></div><div class="ba-sec-threat"><div class="ba-sec-threat-val" style="color:#ffd700">99.9%</div><div class="ba-sec-threat-label">Uptime</div></div></div>' +
            '</div>'
    };
    for (const [k, v] of Object.entries(anims)) { const el = document.getElementById('bento-anim-' + k); if (el) el.innerHTML = v; }
    if (!document.getElementById('bp-style')) { const s = document.createElement('style'); s.id = 'bp-style'; s.textContent = '@keyframes bp{0%,100%{opacity:.5;transform:scaleX(.8)}50%{opacity:1;transform:scaleX(1)}}'; document.head.appendChild(s); }
}

/* ========== HERO TERMINAL — MULTI-DAY PROFESSIONAL PROCESS ========== */
function initHeroTerminal() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const sequences = [
        { lines: [
            { t: '<span class="t-green">$</span> flashai start --project "ClientPro" --type enterprise', d: 0, typing: true },
            { t: '<span class="t-day">\u{1F4C5} Day 1: Architecture & Analysis</span>', d: 1000 },
            { t: '<span class="t-blue">\u2192</span> Analyzing existing infrastructure...', d: 900 },
            { t: '<span class="t-blue">\u2192</span> Running dependency audit <span class="terminal-progress"><span class="terminal-progress-fill" style="width:0%;background:#00f0ff" data-target="100"></span></span>', d: 800 },
            { t: '<span class="t-green">\u2713</span> Architecture blueprint generated', d: 1000 },
            { t: '<span class="t-green">\u2713</span> Database schema designed (12 tables, 47 relations)', d: 900 },
            { t: '<span class="t-green">\u2713</span> API endpoints mapped (34 routes)', d: 800 },
            { t: '<span class="t-yellow">\u26A1</span> Tech stack selected: Next.js + Node.js + PostgreSQL', d: 1000 },
            { t: '<span class="t-day">\u{1F4C5} Day 2: Security & Compliance</span>', d: 1200 },
            { t: '<span class="t-blue">\u2192</span> OWASP Top 10 security audit...', d: 900 },
            { t: '<span class="t-blue">\u2192</span> RGPD compliance check <span class="terminal-progress"><span class="terminal-progress-fill" style="width:0%;background:#bf00ff" data-target="100"></span></span>', d: 1000 },
            { t: '<span class="t-green">\u2713</span> SSL/TLS configuration validated', d: 800 },
            { t: '<span class="t-green">\u2713</span> WAF rules configured (Cloudflare)', d: 900 },
            { t: '<span class="t-green">\u2713</span> Data encryption: AES-256 active', d: 800 },
            { t: '<span class="t-green">\u2713</span> Auth: JWT + OAuth 2.0 + 2FA ready', d: 1000 },
            { t: '<span class="t-day">\u{1F4C5} Day 3: Frontend Development</span>', d: 1200 },
            { t: '<span class="t-blue">\u2192</span> Generating UI components (24 modules)...', d: 900 },
            { t: '<span class="t-blue">\u2192</span> Building responsive layouts <span class="terminal-progress"><span class="terminal-progress-fill" style="width:0%;background:#ff006e" data-target="100"></span></span>', d: 1100 },
            { t: '<span class="t-green">\u2713</span> Design system: 48 components created', d: 900 },
            { t: '<span class="t-green">\u2713</span> Animations & micro-interactions added', d: 800 },
            { t: '<span class="t-green">\u2713</span> Dark/light theme support', d: 700 },
            { t: '<span class="t-day">\u{1F4C5} Day 4: Backend & API</span>', d: 1200 },
            { t: '<span class="t-blue">\u2192</span> Setting up microservices architecture...', d: 1000 },
            { t: '<span class="t-green">\u2713</span> REST API: 34 endpoints deployed', d: 900 },
            { t: '<span class="t-green">\u2713</span> WebSocket real-time layer active', d: 800 },
            { t: '<span class="t-green">\u2713</span> Redis caching layer configured', d: 800 },
            { t: '<span class="t-green">\u2713</span> Background jobs scheduler ready', d: 900 },
            { t: '<span class="t-day">\u{1F4C5} Day 5: AI Integration & Testing</span>', d: 1200 },
            { t: '<span class="t-blue">\u2192</span> Training AI model on client data...', d: 1000 },
            { t: '<span class="t-blue">\u2192</span> Running test suite <span class="terminal-progress"><span class="terminal-progress-fill" style="width:0%;background:#00ff87" data-target="100"></span></span>', d: 1100 },
            { t: '<span class="t-green">\u2713</span> GPT-4 RAG pipeline: operational', d: 900 },
            { t: '<span class="t-green">\u2713</span> Unit tests: <span class="t-green">127/127 passed</span>', d: 800 },
            { t: '<span class="t-green">\u2713</span> Integration tests: <span class="t-green">43/43 passed</span>', d: 800 },
            { t: '<span class="t-green">\u2713</span> E2E tests: <span class="t-green">18/18 passed</span>', d: 900 },
            { t: '<span class="t-green">\u2713</span> Performance: Lighthouse <span class="t-green">98/100</span>', d: 800 },
            { t: '<span class="t-day">\u{1F4C5} Day 6: QA & Optimization</span>', d: 1200 },
            { t: '<span class="t-blue">\u2192</span> A/B testing variants generated...', d: 900 },
            { t: '<span class="t-green">\u2713</span> Load testing: 10K concurrent users OK', d: 1000 },
            { t: '<span class="t-green">\u2713</span> Image optimization: -73% bundle size', d: 800 },
            { t: '<span class="t-green">\u2713</span> CDN configured across 200+ edge nodes', d: 900 },
            { t: '<span class="t-green">\u2713</span> Core Web Vitals: all green', d: 800 },
            { t: '<span class="t-day">\u{1F4C5} Day 7: Deployment & Launch \u{1F680}</span>', d: 1200 },
            { t: '<span class="t-blue">\u2192</span> Deploying to production <span class="terminal-progress"><span class="terminal-progress-fill" style="width:0%;background:linear-gradient(90deg,#00f0ff,#bf00ff)" data-target="100"></span></span>', d: 1100 },
            { t: '<span class="t-green">\u2713</span> DNS propagation complete', d: 900 },
            { t: '<span class="t-green">\u2713</span> Monitoring 24/7 activated (Datadog)', d: 800 },
            { t: '<span class="t-green">\u2713</span> Documentation: 42 pages generated', d: 900 },
            { t: '<span class="t-green">\u2713</span> Team training session scheduled', d: 800 },
            { t: '', d: 500 },
            { t: '<span class="t-green t-bold">\u2728 PROJECT LIVE \u2014 clientpro.flashai.dev</span>', d: 1000 },
            { t: '<span class="t-gray">Response time: 47ms | Uptime: 99.99% | Score: 98/100</span>', d: 800 }
        ]}
    ];

    let seqIdx = 0;
    async function runSequence() {
        const seq = sequences[seqIdx % sequences.length];
        for (const line of seq.lines) {
            await new Promise(r => setTimeout(r, line.d));
            if (line.typing) {
                const cmdLine = document.createElement('div');
                cmdLine.className = 't-green';
                output.appendChild(cmdLine);
                const text = line.t.replace(/<[^>]+>/g, '');
                for (let i = 0; i < text.length; i++) {
                    cmdLine.textContent += text[i];
                    await new Promise(r => setTimeout(r, 20));
                }
                cmdLine.innerHTML = line.t;
            } else {
                const div = document.createElement('div');
                div.innerHTML = line.t;
                div.style.cssText = 'opacity:0;transform:translateX(-5px);transition:all 0.3s';
                output.appendChild(div);
                requestAnimationFrame(() => { div.style.opacity = '1'; div.style.transform = 'translateX(0)'; });
                // Animate progress bars
                const prog = div.querySelector('.terminal-progress-fill');
                if (prog) {
                    const target = prog.dataset.target || 100;
                    setTimeout(() => { prog.style.width = target + '%'; }, 100);
                }
            }
            output.scrollTop = output.scrollHeight;
        }
        await new Promise(r => setTimeout(r, 4000));
        // Clear and restart
        while (output.children.length > 0) output.removeChild(output.firstChild);
        seqIdx++;
        runSequence();
    }
    setTimeout(runSequence, 2500);
}

/* ========== HERO PARTICLES (Rose/Pink) ========== */
function initHeroParticles() {
    const canvas = document.getElementById('hero-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() { w = canvas.width = canvas.parentElement.offsetWidth; h = canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({length: 40}, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.5 - 0.1,
        size: Math.random() * 3 + 1,
        color: ['#ff006e','#e879f9','#f472b6','#fda4af','#ffd700'][Math.floor(Math.random() * 5)],
        alpha: Math.random() * 0.5 + 0.2,
        pulse: Math.random() * Math.PI * 2
    }));

    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += 0.02;
            if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
            const a = p.alpha * (0.5 + Math.sin(p.pulse) * 0.3);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = a;
            ctx.shadowColor = p.color;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;
        });
        requestAnimationFrame(draw);
    }
    draw();
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
        { name: 'Marie Dupont', email: 'marie@acme.fr', value: '4 200 \u20AC', status: 'prospect', avatar: 'MD' },
        { name: 'Jean Martin', email: 'jean@startup.io', value: '8 500 \u20AC', status: 'prospect', avatar: 'JM' },
        { name: 'Sophie Bernard', email: 'sophie@tech.com', value: '12 000 \u20AC', status: 'encours', avatar: 'SB' },
        { name: 'Lucas Petit', email: 'lucas@digital.fr', value: '3 800 \u20AC', status: 'encours', avatar: 'LP' },
        { name: 'Emma Leroy', email: 'emma@design.co', value: '6 500 \u20AC', status: 'client', avatar: 'EL' },
        { name: 'Thomas Moreau', email: 'thomas@web.fr', value: '15 000 \u20AC', status: 'client', avatar: 'TM' }
    ];
    const columns = { prospect: 'Prospects', encours: 'En cours', client: 'Clients' };
    function render(filter='') {
        const filtered = contacts.filter(c => c.name.toLowerCase().includes(filter) || c.email.toLowerCase().includes(filter));
        const totalContacts = filtered.length;
        const totalValue = filtered.reduce((s, c) => s + parseInt(c.value.replace(/[^\d]/g, '')), 0);
        const clientCount = filtered.filter(c => c.status === 'client').length;
        const convRate = totalContacts > 0 ? Math.round((clientCount / totalContacts) * 100) : 0;
        ct.innerHTML = '<div class="crm-header"><h3 class="font-display font-bold text-lg">Mini CRM</h3><input type="text" class="crm-search" placeholder="Rechercher..." id="crm-si" value="' + filter + '"></div>' +
        '<div class="crm-stats-bar"><div class="crm-stat-kpi"><div class="crm-stat-kpi-value" style="color:#00f0ff">' + totalContacts + '</div><div class="crm-stat-kpi-label">Contacts</div></div><div class="crm-stat-kpi"><div class="crm-stat-kpi-value" style="color:#00ff87">' + totalValue.toLocaleString('fr') + ' \u20AC</div><div class="crm-stat-kpi-label">Pipeline</div></div><div class="crm-stat-kpi"><div class="crm-stat-kpi-value" style="color:#bf00ff">' + convRate + '%</div><div class="crm-stat-kpi-label">Conversion</div></div></div>' +
        '<div class="crm-columns">' + Object.entries(columns).map(([key, label]) => { const items = filtered.filter(c => c.status === key); return '<div class="crm-column" data-col="' + key + '"><div class="crm-col-header"><span style="color:' + (key === 'prospect' ? '#ff8c00' : key === 'encours' ? '#00f0ff' : '#00ff87') + '">' + label + '</span><span class="crm-col-count">' + items.length + '</span></div>' + items.map(c => '<div class="crm-card" draggable="true" data-name="' + c.name + '"><div class="crm-card-name">' + c.name + '</div><div class="crm-card-email">' + c.email + '</div><div class="crm-card-value">' + c.value + '</div><div class="crm-card-actions"><button class="crm-action-btn" onclick="showToast(\'Appel ' + c.name + '...\')">📞</button><button class="crm-action-btn" onclick="showToast(\'Email envoye\')">✉️</button></div></div>').join('') + '</div>'; }).join('') + '</div>';
        const si = document.getElementById('crm-si');
        if (si) { si.addEventListener('input', e => render(e.target.value.toLowerCase())); }
        ct.querySelectorAll('.crm-card').forEach(card => {
            card.addEventListener('dragstart', e => { e.dataTransfer.setData('text/plain', card.dataset.name); card.classList.add('dragging'); });
            card.addEventListener('dragend', () => card.classList.remove('dragging'));
        });
        ct.querySelectorAll('.crm-column').forEach(col => {
            col.addEventListener('dragover', e => e.preventDefault());
            col.addEventListener('drop', e => { e.preventDefault(); const n = e.dataTransfer.getData('text/plain'); const c = contacts.find(x => x.name === n); if (c) { c.status = col.dataset.col; render(filter); showToast(n + ' deplace'); } });
        });
    }
    render();
}

function initDemoDevis() {
    const ct = document.getElementById('demo-devis');
    if (!ct) return;
    const state = { step: 1, type: null, features: [], total: 0 };
    const types = [ { id: 'vitrine', name: 'Site Vitrine', icon: '\u{1F310}', price: 990 }, { id: 'ecommerce', name: 'E-Commerce', icon: '\u{1F6D2}', price: 2490 }, { id: 'crm', name: 'CRM / ERP', icon: '\u{1F4CA}', price: 1990 }, { id: 'chatbot', name: 'Chatbot IA', icon: '\u{1F916}', price: 1490 }, { id: 'dashboard', name: 'Dashboard', icon: '\u{1F4C8}', price: 1790 }, { id: 'auto', name: 'Automatisation', icon: '\u26A1', price: 890 } ];
    const features = [ { name: 'Design premium', price: 490 }, { name: 'SEO avance', price: 390 }, { name: 'Multilingue', price: 290 }, { name: 'Analytics', price: 190 }, { name: 'Chatbot', price: 590 }, { name: 'API custom', price: 490 }, { name: 'Paiement', price: 390 }, { name: 'CRM integre', price: 690 }, { name: 'Automatisations', price: 490 }, { name: 'Support prioritaire', price: 290 } ];
    function calc() { const base = state.type ? (types.find(t => t.id === state.type)?.price || 0) : 0; state.total = base + state.features.reduce((s, f) => s + (features.find(x => x.name === f)?.price || 0), 0); }
    function render() {
        calc();
        let body = '';
        if (state.step === 1) body = '<div class="devis-options">' + types.map(t => '<div class="devis-option ' + (state.type === t.id ? 'selected' : '') + '" data-type="' + t.id + '"><div class="devis-option-icon">' + t.icon + '</div><div class="devis-option-name">' + t.name + '</div><div class="devis-option-price">A partir de ' + t.price + ' \u20AC</div></div>').join('') + '</div>';
        else if (state.step === 2) body = '<div class="devis-features">' + features.map(f => '<div class="devis-feature ' + (state.features.includes(f.name) ? 'checked' : '') + '" data-feat="' + f.name + '"><div class="devis-feature-check">' + (state.features.includes(f.name) ? '\u2713' : '') + '</div><span>' + f.name + '</span><span style="margin-left:auto;color:#00ff87;font-size:0.75rem">+' + f.price + '\u20AC</span></div>').join('') + '</div>';
        else if (state.step === 3) body = '<div class="devis-options">' + ['Minimaliste','Moderne','Audacieux','Classique'].map((s,i) => '<div class="devis-option" style="border-color:' + ['#00f0ff','#bf00ff','#ff006e','#ffd700'][i] + '30"><div class="devis-option-icon">' + ['\u{1F3A8}','\u{1F48E}','\u{1F525}','\u2728'][i] + '</div><div class="devis-option-name">' + s + '</div></div>').join('') + '</div>';
        else body = '<div style="text-align:center"><div class="devis-total"><div class="devis-total-label">Prix total</div><div class="devis-total-price">' + state.total.toLocaleString('fr') + ' \u20AC</div></div><div style="margin-top:1rem;display:flex;gap:0.5rem;justify-content:center"><button class="btn-glow" onclick="showToast(\'Devis telecharge !\')"><span>Telecharger</span></button></div></div>';
        const progressPct = ((state.step - 1) / 3 * 100);
        ct.innerHTML = '<div class="devis-progress-wrap"><div class="devis-progress-line"><div class="devis-progress-fill" style="width:' + progressPct + '%"></div></div><div class="devis-steps">' + [1,2,3,4].map(s => '<div class="devis-step ' + (s===state.step?'active':'') + ' ' + (s<state.step?'completed':'') + '"><span class="devis-step-num">' + (s<state.step?'\u2713':s) + '</span><span>' + ['Projet','Options','Style','Resume'][s-1] + '</span></div>').join('') + '</div></div><div class="devis-body">' + body + '</div><div class="devis-total" style="margin-top:1rem"><div class="devis-total-label">Estimation</div><div class="devis-total-price">' + state.total.toLocaleString('fr') + ' \u20AC</div></div><div class="devis-nav-btns">' + (state.step>1?'<button class="btn-outline" id="dp">\u2190 Retour</button>':'') + (state.step<4?'<button class="btn-glow" id="dn"><span>Suivant \u2192</span></button>':'') + '</div>';
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
    const responses = {
        prix: '<div class="chat-rich-card"><div class="chat-rich-title">\u{1F4B0} Nos tarifs</div><div class="chat-rich-body">A partir de <strong>890\u20AC</strong> pour un site vitrine.<br>CRM/Dashboard: des <strong>1 990\u20AC</strong><br>Chatbot IA: des <strong>1 490\u20AC</strong></div><div class="chat-rich-actions"><button class="chat-rich-btn" onclick="showToast(\'Redirection devis...\')">Devis gratuit</button><button class="chat-rich-btn chat-rich-btn-outline" onclick="showToast(\'Voir tarifs\')">Voir tous les prix</button></div></div>',
        delai: '<div class="chat-rich-card"><div class="chat-rich-title">\u23F1\uFE0F Delais de livraison</div><div class="chat-rich-body">\u2022 Site vitrine: <strong>5 jours</strong><br>\u2022 CRM/Dashboard: <strong>7-10 jours</strong><br>\u2022 Projet complexe: <strong>10-14 jours</strong></div></div>',
        services: '<div class="chat-rich-card"><div class="chat-rich-title">\u{1F680} Nos services</div><div class="chat-rich-body">\u{1F310} Sites web & landing pages<br>\u{1F4CA} CRM & ERP sur mesure<br>\u{1F916} Chatbots IA (WhatsApp, web)<br>\u26A1 Automatisations<br>\u{1F50D} SEO technique<br>\u{1F6E1}\uFE0F Securite & RGPD</div><div class="chat-rich-actions"><button class="chat-rich-btn" onclick="showToast(\'Redirection services\')">En savoir plus</button></div></div>',
        contact: 'Contactez-nous a <strong>contact@flashai.dev</strong>. Reponse en <strong>moins de 2h</strong>, 24/7 ! \u{1F4E9}',
        technologie: '<div class="chat-rich-card"><div class="chat-rich-title">\u2699\uFE0F Notre stack tech</div><div class="chat-rich-body">React, Next.js, Node.js, Python, TypeScript, PostgreSQL, MongoDB, Redis, Docker, AWS... <strong>200+ APIs</strong> connectees.</div></div>',
        portfolio: '<div class="chat-rich-card"><div class="chat-rich-title">\u{1F3A8} Nos realisations</div><div class="chat-rich-body">+50 projets livres: SaaS, e-commerce, sante, fintech, edtech...</div><div class="chat-rich-actions"><button class="chat-rich-btn" onclick="showToast(\'Voir portfolio\')">Voir le portfolio</button></div></div>',
        ia: 'Nous integrons <strong>GPT-4, LangChain, RAG</strong> et des modeles custom. Nos chatbots resolvent <strong>85%</strong> des demandes sans humain ! \u{1F9E0}',
        default: 'Je suis l\'assistant FlashAI \u{1F916}. Posez vos questions sur nos <strong>services</strong>, <strong>tarifs</strong>, <strong>technologies</strong> ou <strong>delais</strong> !'
    };
    const suggestions = ['Quels prix ?', 'Delai ?', 'Services ?', 'Portfolio ?', 'IA ?', 'Contact ?'];
    let messages = [{ from: 'bot', text: 'Bonjour ! Comment puis-je vous aider ?' }];
    function getResp(t) { const l = t.toLowerCase(); for (const [k, v] of Object.entries(responses)) { if (k !== 'default' && l.includes(k)) return v; } if (l.includes('bonjour')||l.includes('salut')||l.includes('hello')) return 'Bonjour ! \u{1F44B} Comment puis-je vous aider ?'; if (l.includes('merci')||l.includes('thanks')) return 'Avec plaisir ! N\'hesitez pas si vous avez d\'autres questions. \u{1F60A}'; if (l.includes('site')||l.includes('web')) return responses.services; if (l.includes('cout')||l.includes('tarif')||l.includes('combien')) return responses.prix; if (l.includes('temps')||l.includes('rapide')||l.includes('livr')) return responses.delai; if (l.includes('projet')||l.includes('realisation')||l.includes('exemple')) return responses.portfolio; if (l.includes('chatbot')||l.includes('intelligence')) return responses.ia; return responses.default; }
    function render() {
        ct.innerHTML = '<div class="chatbot-container"><div class="chatbot-messages" id="cm">' + messages.map(m => '<div class="chat-msg ' + m.from + '"><div class="chat-avatar">' + (m.from==='bot'?'\u{1F916}':'\u{1F464}') + '</div><div class="chat-bubble">' + m.text + '</div></div>').join('') + '</div><div class="chat-suggestions">' + suggestions.map(s => '<button class="chat-suggestion">' + s + '</button>').join('') + '</div><div class="chat-input-wrap"><input type="text" class="chat-input" id="ci" placeholder="Votre message..."><button class="chat-send" id="cs">Envoyer</button></div></div>';
        const mc = document.getElementById('cm'); if (mc) mc.scrollTop = mc.scrollHeight;
        function send(text) { if (!text.trim()) return; messages.push({ from: 'user', text }); render(); setTimeout(() => { const mc2 = document.getElementById('cm'); if(mc2) { const t = document.createElement('div'); t.className='chat-msg bot'; t.id='ct'; t.innerHTML='<div class="chat-avatar">\u{1F916}</div><div class="chat-bubble"><div class="chat-typing-realistic"><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span><span class="chat-typing-dot"></span></div></div>'; mc2.appendChild(t); mc2.scrollTop=mc2.scrollHeight; } const delay = 800 + Math.random() * 1000; setTimeout(() => { const te = document.getElementById('ct'); if(te) te.remove(); messages.push({from:'bot',text:getResp(text)}); render(); }, delay); }, 300); }
        const cs = document.getElementById('cs'), ci = document.getElementById('ci');
        if (cs) cs.addEventListener('click', () => send(ci?.value||''));
        if (ci) ci.addEventListener('keydown', e => { if(e.key==='Enter') send(ci.value); });
        ct.querySelectorAll('.chat-suggestion').forEach(b => b.addEventListener('click', () => send(b.textContent)));
    }
    render();
}

function initDemoDashboard() {
    const ct = document.getElementById('demo-dashboard');
    if (!ct) return;
    const kpis = [
        { label: 'Visiteurs', value: '12,847', change: '+23%', color: '#00f0ff', icon: '\u{1F441}\uFE0F' },
        { label: 'Conversions', value: '342', change: '+18%', color: '#00ff87', icon: '\u{1F3AF}' },
        { label: 'Revenue', value: '\u20AC48,290', change: '+31%', color: '#bf00ff', icon: '\u{1F4B0}' },
        { label: 'Satisfaction', value: '98%', change: '+2%', color: '#ffd700', icon: '\u2B50' }
    ];
    function renderDash() {
        ct.innerHTML = '<div class="dashboard-demo"><div class="dash-header"><h3 class="font-display font-bold text-lg">Dashboard Analytics</h3><div style="display:flex;align-items:center;gap:0.75rem"><div class="dash-realtime-indicator"><span class="dash-realtime-dot"></span><span style="font-size:0.7rem;color:#00ff87">Live</span></div><div class="dash-period"><button class="dash-period-btn active" data-p="7j">7j</button><button class="dash-period-btn" data-p="30j">30j</button><button class="dash-period-btn" data-p="90j">90j</button></div></div></div><div class="dash-kpis">' + kpis.map(k => '<div class="dash-kpi" style="--kc:' + k.color + ';cursor:pointer" title="Cliquer pour actualiser"><div class="dash-kpi-icon">' + k.icon + '</div><div class="dash-kpi-value">' + k.value + '</div><div class="dash-kpi-label">' + k.label + '</div><div class="dash-kpi-change" style="color:' + k.color + '">' + k.change + '</div></div>').join('') + '</div><div class="dash-charts"><canvas id="dash-line-chart" style="width:100%;height:150px"></canvas><canvas id="dash-bar-chart" style="width:100%;height:150px"></canvas></div></div>';
        drawDashCharts();
        ct.querySelectorAll('.dash-period-btn').forEach(b => b.addEventListener('click', () => {
            ct.querySelectorAll('.dash-period-btn').forEach(x => x.classList.remove('active'));
            b.classList.add('active'); drawDashCharts();
        }));
        ct.querySelectorAll('.dash-kpi').forEach((el, i) => {
            el.addEventListener('click', () => {
                const bases = [12847, 342, 48290, 98];
                const suffixes = ['', '', '\u20AC', '%'];
                const prefixes = ['', '', '\u20AC', ''];
                const newVal = Math.round(bases[i] * (0.8 + Math.random() * 0.4));
                const formatted = i === 2 ? (prefixes[i] + newVal.toLocaleString('en')) : (newVal.toLocaleString('en') + suffixes[i]);
                kpis[i].value = formatted;
                const changes = ['+' + (Math.floor(Math.random() * 30) + 5) + '%', '+' + (Math.floor(Math.random() * 25) + 5) + '%', '+' + (Math.floor(Math.random() * 35) + 10) + '%', '+' + (Math.floor(Math.random() * 5) + 1) + '%'];
                kpis[i].change = changes[i];
                el.style.transform = 'scale(0.95)';
                setTimeout(() => { el.style.transform = ''; }, 150);
                renderDash();
            });
        });
    }
    renderDash();
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
        { label: 'Delai de livraison', classic: '3 a 6 mois', flash: '5 a 14 jours', icon: '\u23F1\uFE0F' },
        { label: 'Cout moyen', classic: '15 000 \u2014 50 000\u20AC', flash: '890 \u2014 4 990\u20AC', icon: '\u{1F4B0}' },
        { label: 'Technologies', classic: 'WordPress / Wix', flash: 'React, Next.js, IA', icon: '\u2699\uFE0F' },
        { label: 'Maintenance', classic: '200\u20AC/mois min', flash: 'Incluse 12 mois', icon: '\u{1F527}' },
        { label: 'Performance', classic: 'Lighthouse ~60', flash: 'Lighthouse 95+', icon: '\u{1F680}' },
        { label: 'Support', classic: 'Email lent', flash: 'Ultra rapide, 24/7', icon: '\u{1F4AC}' },
        { label: 'Personnalisation', classic: 'Templates limites', flash: '100% sur mesure', icon: '\u{1F3A8}' },
        { label: 'SEO', classic: 'Basique', flash: 'Avance, optimise IA', icon: '\u{1F50D}' }
    ];
    /* Desktop: table layout */
    ct.innerHTML = '<div class="comp-table">' +
        '<div class="comp-header"><div class="comp-h-label"></div><div class="comp-h-classic">Agence classique</div><div class="comp-h-flash">FlashAI \u26A1</div></div>' +
        rows.map((r, i) => '<div class="comp-row reveal" style="transition-delay:' + (i * 0.08) + 's"><div class="comp-label"><span class="comp-icon">' + r.icon + '</span>' + r.label + '</div><div class="comp-classic"><span class="comp-badge-classic">' + r.classic + '</span></div><div class="comp-flash"><span class="comp-badge-flash">' + r.flash + '</span></div></div>').join('') +
        '</div>' +
        /* Mobile: 2-column card grid */
        '<div class="comp-card-grid">' +
        rows.map((r, i) => '<div class="comp-card reveal" style="transition-delay:' + (i * 0.06) + 's">' +
            '<div class="comp-card-header"><span class="comp-card-icon">' + r.icon + '</span><span class="comp-card-label">' + r.label + '</span></div>' +
            '<div class="comp-card-values">' +
                '<div class="comp-card-classic"><span class="comp-card-col-label">Classique</span><span class="comp-badge-classic">' + r.classic + '</span></div>' +
                '<div class="comp-card-vs">VS</div>' +
                '<div class="comp-card-flash"><span class="comp-card-col-label">FlashAI \u26A1</span><span class="comp-badge-flash">' + r.flash + '</span></div>' +
            '</div>' +
        '</div>').join('') +
        '</div>';
}

/* ========== EXPERTISE ========== */
function initExpertise() {
    const ct = document.getElementById('expertise-carousel');
    if (!ct) return;
    const cards = [
        { title: 'Frontend', icon: '\u{1F3A8}', color: '#00f0ff', skills: [['React / Next.js', 95], ['Vue / Nuxt', 88], ['TypeScript', 92], ['TailwindCSS', 98], ['Three.js / GSAP', 85]] },
        { title: 'Backend', icon: '\u2699\uFE0F', color: '#bf00ff', skills: [['Node.js / Express', 94], ['Python / FastAPI', 90], ['PostgreSQL', 92], ['MongoDB / Redis', 88], ['GraphQL / REST', 95]] },
        { title: 'IA & Data', icon: '\u{1F9E0}', color: '#ff006e', skills: [['OpenAI / GPT', 96], ['LangChain', 88], ['RAG Systems', 85], ['NLP / NLU', 82], ['Data Pipeline', 87]] },
        { title: 'DevOps', icon: '\u{1F680}', color: '#00ff87', skills: [['Docker / K8s', 90], ['AWS / GCP', 92], ['CI/CD', 95], ['Monitoring', 88], ['Securite', 91]] }
    ];
    ct.innerHTML = '<div class="expertise-grid">' + cards.map((c, i) => '<div class="expertise-card reveal" style="transition-delay:' + (i * 0.15) + 's;--ec:' + c.color + '"><div class="expertise-card-front"><div class="expertise-icon" style="background:' + c.color + '15;color:' + c.color + '">' + c.icon + '</div><h3 class="font-display font-bold text-xl mb-4">' + c.title + '</h3><div class="expertise-bars">' + c.skills.map(s => '<div class="expertise-bar-row"><span class="text-xs text-surface-300">' + s[0] + '</span><div class="expertise-bar-bg"><div class="expertise-bar-fill" style="width:' + s[1] + '%;background:' + c.color + '" data-width="' + s[1] + '"></div></div><span class="text-xs" style="color:' + c.color + '">' + s[1] + '%</span></div>').join('') + '</div></div></div>').join('') + '</div>';
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
        { num: '01', title: 'Discovery', desc: 'Appel de 30 min pour comprendre vos besoins, objectifs et contraintes. Analyse de l\'existant et recommandations.', icon: '\u{1F3AF}', color: '#00f0ff', duration: '30 min' },
        { num: '02', title: 'Prototype', desc: 'Maquette interactive livree en 48h. Vous validez le design, l\'UX et les fonctionnalites avant le developpement.', icon: '\u270F\uFE0F', color: '#bf00ff', duration: '48h' },
        { num: '03', title: 'Build', desc: 'Developpement agile avec demos quotidiennes. Stack moderne, code propre, tests automatises.', icon: '\u26A1', color: '#ff006e', duration: '3-10 jours' },
        { num: '04', title: 'Launch', desc: 'Deploiement, formation, documentation. Support prioritaire inclus 12 mois. Monitoring 24/7.', icon: '\u{1F680}', color: '#00ff87', duration: 'J+0' }
    ];
    ct.innerHTML = '<div class="method-steps">' + steps.map((s, i) => '<div class="method-step reveal" style="transition-delay:' + (i * 0.2) + 's"><div class="method-step-line" style="background:' + s.color + '"></div><div class="method-step-dot" style="background:' + s.color + ';box-shadow:0 0 20px ' + s.color + '60"><span>' + s.icon + '</span></div><div class="method-step-content"><div class="method-step-num" style="color:' + s.color + '">' + s.num + '</div><h3 class="font-display font-bold text-xl mb-2">' + s.title + '</h3><p class="text-surface-400 text-sm leading-relaxed mb-3">' + s.desc + '</p><span class="method-step-duration" style="color:' + s.color + '">' + s.duration + '</span></div></div>').join('') + '</div>';
}

/* ========== PORTFOLIO ========== */
function initPortfolio() {
    const ct = document.getElementById('portfolio-carousel');
    const scrollCt = document.getElementById('portfolio-scroll');
    if (!ct && !scrollCt) return;
    const projects = [
        { title: 'Freenzy', type: 'SaaS', desc: 'Automatisation totale, audit securite quotidien, +30 APIs connectees.', color: '#00f0ff', tags: ['Automatisation','Securite','APIs'], stat: '30+ APIs' },
        { title: 'GlamHouse', type: 'Immobilier Web3', desc: 'Transactions immobilieres tokenisees et securisees on-chain.', color: '#bf00ff', tags: ['Blockchain','Smart Contracts','Tokenisation'], stat: 'Web3' },
        { title: 'Psy Daniel', type: 'Automatisation', desc: 'Posts automatises et SEO optimise par IA pour cabinet psy.', color: '#00ff87', tags: ['SEO IA','Posts auto','Analytics'], stat: 'SEO auto' },
        { title: 'David Spectacles', type: 'Dashboard', desc: 'Gestion spectacles, artistes, planning et billetterie.', color: '#ffd700', tags: ['Planning','Artistes','Dashboard'], stat: 'Live' },
        { title: 'Levemente', type: 'Experience cadeau', desc: 'Site cadeau d\'anniversaire personnalise avec 3 choix.', color: '#ff8c00', tags: ['Design','Personnalisation','UX'], stat: '3 choix' },
        { title: 'Cinegen', type: 'Confidentiel', desc: 'Projet en cours sous accord de confidentialite.', color: '#ff006e', tags: ['Confidentiel'], stat: 'En cours', url: '' },
        { title: 'Afrique Digital', type: 'Portail web', desc: 'Portail digital pour le marche africain francophone.', color: '#06b6d4', tags: ['Mobile-first','Portail','Afrique'], stat: 'Multi-pays', url: '' },
        { title: 'LaunchPad', type: 'Mini App', desc: 'MVP fonctionnel livre en 5 jours pour startups.', color: '#e879f9', tags: ['MVP','Startup','Rapide'], stat: '5 jours', url: '' }
    ];
    function cardHTML(p) {
        return '<div class="portfolio-mockup"><div class="portfolio-mockup-bar"><span class="portfolio-mockup-dot" style="background:#ef4444"></span><span class="portfolio-mockup-dot" style="background:#f59e0b"></span><span class="portfolio-mockup-dot" style="background:#22c55e"></span><span class="portfolio-mockup-url">' + p.title.toLowerCase().replace(/\s/g, '') + '.app</span></div><div class="portfolio-mockup-screen" style="background:linear-gradient(135deg,' + p.color + '20,' + p.color + '05)"><div style="padding:12px"><div style="display:flex;gap:6px;margin-bottom:8px"><div style="height:6px;width:40%;background:' + p.color + '30;border-radius:3px"></div><div style="height:6px;width:20%;background:' + p.color + '15;border-radius:3px"></div></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:8px"><div style="height:40px;background:' + p.color + '10;border-radius:4px;border:1px solid ' + p.color + '15"></div><div style="height:40px;background:' + p.color + '10;border-radius:4px;border:1px solid ' + p.color + '15"></div><div style="height:40px;background:' + p.color + '10;border-radius:4px;border:1px solid ' + p.color + '15"></div></div><div style="height:50px;background:' + p.color + '08;border-radius:4px;border:1px solid ' + p.color + '10"></div></div></div><div class="portfolio-info"><div class="portfolio-info-name">' + p.title + '</div><div class="portfolio-info-sector">' + p.type + '</div><div class="portfolio-metric" style="background:' + p.color + '15;color:' + p.color + '">' + p.stat + '</div><div class="portfolio-tags">' + p.tags.map(t => '<span class="portfolio-tag" style="border-color:' + p.color + '40;color:' + p.color + '">' + t + '</span>').join('') + '</div></div></div>';
    }
    // Mobile: native scroll-snap carousel (no JS touch handling needed)
    if (scrollCt) {
        scrollCt.innerHTML = projects.map(p => '<div class="portfolio-scroll-card" style="--pc:' + p.color + '">' + cardHTML(p) + '</div>').join('');
    }
    // Desktop: 3D carousel
    if (!ct) return;
    let current = 0;
    function render() {
        if (window.innerWidth < 768) return;
        ct.innerHTML = projects.map((p, i) => {
            const offset = i - current;
            const absOff = Math.abs(offset);
            const z = 10 - absOff;
            const tx = offset * 320;
            const sc = Math.max(0.7, 1 - absOff * 0.12);
            const op = Math.max(0.3, 1 - absOff * 0.3);
            return '<div class="portfolio-card-3d" style="transform:translate(-50%,-50%) translateX(' + tx + 'px) scale(' + sc + ');z-index:' + z + ';opacity:' + op + ';' + (absOff > 2 ? 'display:none' : '') + ';--pc:' + p.color + '">' + cardHTML(p) + '</div>';
        }).join('');
        const dots = document.getElementById('portfolio-dots');
        if (dots) dots.innerHTML = projects.map((_, i) => '<button class="portfolio-dot ' + (i === current ? 'active' : '') + '" data-i="' + i + '"></button>').join('');
        document.querySelectorAll('.portfolio-dot').forEach(d => d.addEventListener('click', () => { current = +d.dataset.i; render(); }));
    }
    render();
    function go(dir) { current = (current + dir + projects.length) % projects.length; render(); }
    const prev = document.getElementById('portfolio-prev');
    const next = document.getElementById('portfolio-next');
    if (prev) prev.addEventListener('click', () => go(-1));
    if (next) next.addEventListener('click', () => go(1));
    let autoplay = setInterval(() => go(1), 5000);
    ct.addEventListener('mouseenter', () => clearInterval(autoplay));
    ct.addEventListener('mouseleave', () => { clearInterval(autoplay); autoplay = setInterval(() => go(1), 5000); });
    window.addEventListener('resize', () => render());
}

/* ========== TESTIMONIALS ========== */
function initTestimonials() {
    const ct = document.getElementById('testimonials-container');
    if (!ct) return;
    const items = [
        { name: 'Marie Dupont', role: 'CEO, TechVision', text: 'FlashAI a transforme notre vision en realite en seulement 8 jours. Le dashboard est incroyable, nos equipes l\'adorent. Le ROI a ete immediat.', rating: 5, avatar: 'MD', color: '#00f0ff' },
        { name: 'Thomas Martin', role: 'CTO, FoodExpress', text: 'On a economise 40 000\u20AC par rapport aux devis d\'agences classiques. Et le resultat est meilleur. Qualite exceptionnelle, support reactif.', rating: 5, avatar: 'TM', color: '#bf00ff' },
        { name: 'Sophie Bernard', role: 'Fondatrice, MediCare', text: 'Le CRM medical est parfait. Conforme RGPD, intuitif, et nos patients adorent le portail en ligne. Support 24/7 vraiment reactif.', rating: 5, avatar: 'SB', color: '#ff006e' },
        { name: 'Lucas Chen', role: 'PM, CryptoTrack', text: 'L\'integration IA est bluffante. Le chatbot comprend vraiment nos clients. Taux de satisfaction passe de 72% a 96%.', rating: 5, avatar: 'LC', color: '#00ff87' },
        { name: 'Emma Laurent', role: 'Directrice, EduSmart', text: 'Plateforme livree en 5 jours, alors que d\'autres agences demandaient 3 mois. Qualite irreprochable et prix imbattable.', rating: 5, avatar: 'EL', color: '#ffd700' }
    ];
    ct.innerHTML = '<div class="testimonials-track">' + items.map((t, i) => '<div class="testimonial-card reveal" style="transition-delay:' + (i * 0.12) + 's;--tc:' + t.color + '"><div class="testimonial-quote">\u201C</div><p class="text-surface-200 text-sm leading-relaxed mb-6">' + t.text + '</p><div class="testimonial-stars">' + '\u2605'.repeat(t.rating) + '</div><div class="testimonial-author"><div class="testimonial-avatar" style="background:' + t.color + '30;color:' + t.color + '">' + t.avatar + '</div><div><div class="font-bold text-sm">' + t.name + '</div><div class="text-xs text-surface-400">' + t.role + '</div></div></div></div>').join('') + '</div>';
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
    function resize() { const rect = container.getBoundingClientRect(); w = canvas.width = rect.width; h = canvas.height = rect.height; cx = w / 2; cy = h / 2; }
    resize(); window.addEventListener('resize', resize);
    container.addEventListener('mousemove', e => { const rect = container.getBoundingClientRect(); mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top; });
    container.addEventListener('mouseleave', () => { hoveredTool = null; });
    const stars = Array.from({length: 200}, () => ({ x: Math.random(), y: Math.random(), size: Math.random() * 1.5 + 0.3, speed: Math.random() * 0.0003 + 0.0001, brightness: Math.random() }));
    const nebulae = Array.from({length: 30}, () => ({ x: Math.random(), y: Math.random(), size: Math.random() * 80 + 40, color: ['#00f0ff','#bf00ff','#ff006e','#ffd700'][Math.floor(Math.random() * 4)], alpha: Math.random() * 0.04 + 0.01, speed: Math.random() * 0.0002 + 0.0001 }));
    const toolPositions = [];
    const catEntries = Object.entries(categories);
    catEntries.forEach(([catName, cat]) => {
        const orbitRadius = (cat.orbit / 7) * Math.min(cx, cy) * 0.85 + 50;
        cat.tools.forEach((tool, i) => {
            const baseAngle = (i / cat.tools.length) * Math.PI * 2;
            toolPositions.push({ name: tool, category: catName, color: cat.color, orbit: orbitRadius, baseAngle, angle: baseAngle, speed: (0.0004 + Math.random() * 0.0003) * (cat.orbit % 2 === 0 ? -1 : 1), size: 24 + Math.random() * 8, pulsePhase: Math.random() * Math.PI * 2 });
        });
    });
    const comets = [];
    function spawnComet() { comets.push({ angle: Math.random() * Math.PI * 2, radius: Math.random() * Math.min(cx, cy) * 0.3 + 80, speed: Math.random() * 0.02 + 0.015, life: 1, decay: 0.005 + Math.random() * 0.005, trail: [], color: ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87'][Math.floor(Math.random() * 5)] }); }
    let time = 0;
    function draw() {
        ctx.clearRect(0, 0, w, h); time++;
        nebulae.forEach(n => { n.x += n.speed; n.y += n.speed * 0.5; if (n.x > 1.2) n.x = -0.2; if (n.y > 1.2) n.y = -0.2; const grad = ctx.createRadialGradient(n.x * w, n.y * h, 0, n.x * w, n.y * h, n.size); grad.addColorStop(0, n.color + '15'); grad.addColorStop(1, 'transparent'); ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(n.x * w, n.y * h, n.size, 0, Math.PI * 2); ctx.fill(); });
        stars.forEach(s => { s.brightness = 0.3 + Math.sin(time * 0.02 + s.x * 10) * 0.4 + 0.3; ctx.fillStyle = 'rgba(255,255,255,' + s.brightness + ')'; ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.size, 0, Math.PI * 2); ctx.fill(); });
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 80); cg.addColorStop(0, 'rgba(0,240,255,0.15)'); cg.addColorStop(0.5, 'rgba(191,0,255,0.05)'); cg.addColorStop(1, 'transparent'); ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, 80, 0, Math.PI * 2); ctx.fill();
        catEntries.forEach(([_, cat]) => { const r = (cat.orbit / 7) * Math.min(cx, cy) * 0.85 + 50; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = cat.color + '12'; ctx.lineWidth = 1; ctx.setLineDash([4, 8]); ctx.stroke(); ctx.setLineDash([]); });
        if (Math.random() < 0.01 && comets.length < 3) spawnComet();
        for (let i = comets.length - 1; i >= 0; i--) { const c = comets[i]; c.angle += c.speed; c.life -= c.decay; const px = cx + Math.cos(c.angle) * c.radius; const py = cy + Math.sin(c.angle) * c.radius * 0.6; c.trail.push({ x: px, y: py }); if (c.trail.length > 20) c.trail.shift(); c.trail.forEach((pt, ti) => { const a = (ti / c.trail.length) * c.life * 0.6; ctx.fillStyle = c.color + Math.floor(a * 255).toString(16).padStart(2, '0'); ctx.beginPath(); ctx.arc(pt.x, pt.y, 2 * (ti / c.trail.length), 0, Math.PI * 2); ctx.fill(); }); if (c.life <= 0) comets.splice(i, 1); }
        hoveredTool = null;
        toolPositions.forEach(t => { t.angle += t.speed; const x = cx + Math.cos(t.angle) * t.orbit; const y = cy + Math.sin(t.angle) * t.orbit * 0.55; t.cx = x; t.cy = y; const pulse = Math.sin(time * 0.03 + t.pulsePhase) * 0.15 + 1; const dist = Math.hypot(mouseX - x, mouseY - y); const isHovered = dist < t.size + 5; if (isHovered) hoveredTool = t; const scale = isHovered ? 1.3 : pulse; const s = t.size * scale; ctx.save(); ctx.translate(x, y); ctx.beginPath(); for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 - Math.PI / 6; i === 0 ? ctx.moveTo(Math.cos(a) * s / 2, Math.sin(a) * s / 2) : ctx.lineTo(Math.cos(a) * s / 2, Math.sin(a) * s / 2); } ctx.closePath(); ctx.fillStyle = isHovered ? t.color + '50' : t.color + '20'; ctx.fill(); ctx.strokeStyle = t.color + (isHovered ? 'cc' : '60'); ctx.lineWidth = isHovered ? 2 : 1; ctx.stroke(); if (isHovered) { ctx.shadowColor = t.color; ctx.shadowBlur = 20; ctx.stroke(); ctx.shadowBlur = 0; } ctx.fillStyle = isHovered ? '#fff' : t.color + 'cc'; ctx.font = (isHovered ? 'bold ' : '') + Math.max(8, s * 0.32) + 'px "Space Grotesk", sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(t.name, 0, 0); ctx.restore(); });
        const tooltip = document.getElementById('galaxy-tooltip');
        if (hoveredTool && tooltip) { tooltip.style.display = 'block'; tooltip.style.left = hoveredTool.cx + 'px'; tooltip.style.top = (hoveredTool.cy - 40) + 'px'; tooltip.innerHTML = '<strong style="color:' + hoveredTool.color + '">' + hoveredTool.name + '</strong><br><span style="font-size:11px;color:#94a3b8">' + hoveredTool.category + '</span>'; } else if (tooltip) { tooltip.style.display = 'none'; }
        requestAnimationFrame(draw);
    }
    draw();
    const searchInput = document.getElementById('tools-search');
    if (searchInput) { searchInput.addEventListener('input', e => { const q = e.target.value.toLowerCase(); toolPositions.forEach(t => { t.size = (!q || t.name.toLowerCase().includes(q)) ? 24 + Math.random() * 8 : 10; }); }); }
}

function initToolsMobile() {
    if (window.innerWidth >= 768) return;
    const grid = document.getElementById('tools-mobile-grid');
    if (!grid) return;
    const tools = ['React','Next.js','Vue.js','Node.js','Python','TypeScript','PostgreSQL','MongoDB','Redis','Docker','AWS','Vercel','Stripe','OpenAI','TailwindCSS','GraphQL','Firebase','Supabase','Prisma','LangChain','Cloudflare','Twilio','GitHub Actions','Terraform'];
    const colors = ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87','#ff8c00'];
    grid.innerHTML = tools.map((t, i) => '<div class="tool-mobile-pill" style="border-color:' + colors[i % colors.length] + '40;color:' + colors[i % colors.length] + '">' + t + '</div>').join('');
}

function initGalaxyCategories() {
    const ct = document.getElementById('galaxy-categories');
    if (!ct) return;
    const cats = [ { name: 'Frontend', color: '#00f0ff', count: 10 }, { name: 'Backend', color: '#bf00ff', count: 10 }, { name: 'Database', color: '#ff006e', count: 10 }, { name: 'IA / ML', color: '#ffd700', count: 10 }, { name: 'DevOps', color: '#00ff87', count: 10 }, { name: 'Outils', color: '#ff8c00', count: 10 } ];
    ct.innerHTML = '<div class="galaxy-cats-row">' + cats.map(c => '<div class="galaxy-cat-pill" style="border-color:' + c.color + '40;color:' + c.color + '"><span class="galaxy-cat-dot" style="background:' + c.color + '"></span>' + c.name + '<span class="galaxy-cat-count">' + c.count + '</span></div>').join('') + '</div>';
}

/* ========== PRICING ========== */
function initPricing() {
    const grid = document.getElementById('pricing-grid');
    if (!grid) return;
    const plans = [
        { name: 'Starter', icon: '\u{1F680}', price: 490, priceAnnual: 392, desc: 'Parfait pour demarrer votre presence digitale.', color: '#00f0ff', features: ['Site vitrine responsive','Design premium sur mesure','SEO de base optimise','Hebergement 3 mois inclus','Support email','Livraison en 5 jours'] },
        { name: 'Business', icon: '\u{1F4BC}', price: 1490, priceAnnual: 1192, desc: 'La solution complete pour scaler votre business.', color: '#bf00ff', featured: true, features: ['Tout Starter +','CRM / Dashboard integre','Chatbot IA basique','API & automatisations','Analytics avance','Support prioritaire 12 mois','Formation equipe incluse'] },
        { name: 'Enterprise', icon: '\u{1F3AF}', price: 2490, priceAnnual: 1992, desc: 'Infrastructure complete avec outils IA complexes.', color: '#ffd700', features: ['Tout Business +','Outils IA complexes (GPT-4, RAG)','User accounts & permissions','Infrastructure scalable','Multi-langue / multi-pays','SLA 99.9% garanti','Account manager dedie','Audit securite complet'] }
    ];
    function render() {
        grid.innerHTML = plans.map((p, idx) => {
            const price = p.price;
            const oldPrice = null;
            return '<div class="pricing-card-3d ' + (p.featured ? 'featured' : '') + '" style="--pc:' + p.color + '">' +
                (p.featured ? '<div class="pricing-popular-badge">\u2B50 Plus populaire</div>' : '') +
                '<div class="pricing-card-aurora pricing-card-aurora-' + (idx + 1) + '"></div>' +
                '<div class="pricing-card-inner"><div class="pricing-card-icon" style="background:' + p.color + '15;color:' + p.color + '">' + p.icon + '</div>' +
                '<div class="pricing-name">' + p.name + '</div>' +
                '<div class="pricing-desc">' + p.desc + '</div>' +
                (oldPrice ? '<div class="pricing-old-price">' + oldPrice.toLocaleString('fr') + ' \u20AC</div>' : '') +
                '<div class="pricing-price"><span class="pricing-amount" style="color:' + p.color + '">' + price.toLocaleString('fr') + '</span><span class="pricing-currency">\u20AC</span></div>' +
                '<div class="pricing-divider"></div>' +
                '<ul class="pricing-features">' + p.features.map((f, fi) => '<li style="animation-delay:' + (fi * 0.06) + 's"><span class="pf-check">\u2713</span><span>' + f + '</span></li>').join('') + '</ul>' +
                '<a href="#contact" class="pricing-cta ' + (p.featured ? 'pricing-cta-featured' : '') + '">' + (p.featured ? 'Choisir Business' : 'Commencer') + '</a>' +
                '</div></div>';
        }).join('');
    }
    render();
}

/* ========== ROI CALCULATOR ========== */
function initROICalculator() {
    const budget = document.getElementById('roi-budget');
    const leads = document.getElementById('roi-leads');
    const conv = document.getElementById('roi-conv');
    if (!budget || !leads || !conv) return;
    function calc() {
        const b = +budget.value, l = +leads.value, c = +conv.value;
        document.getElementById('roi-budget-val').textContent = b.toLocaleString('fr') + ' \u20AC';
        document.getElementById('roi-leads-val').textContent = l;
        document.getElementById('roi-conv-val').textContent = c + '%';
        const improvedConv = c * 2.5;
        const currentRevenue = l * (c / 100) * 200;
        const flashRevenue = l * (improvedConv / 100) * 200;
        const saving = flashRevenue - currentRevenue;
        const roi = Math.round((saving / b) * 100);
        document.getElementById('roi-number').textContent = '+' + roi + '%';
        document.getElementById('roi-detail').textContent = 'Economie estimee : ' + Math.round(saving).toLocaleString('fr') + ' \u20AC/mois';
        drawROIChart(currentRevenue, flashRevenue);
    }
    function drawROIChart(current, flash) {
        const canvas = document.getElementById('roi-chart');
        if (!canvas) return;
        canvas.width = 300; canvas.height = 150;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 300, 150);
        const max = Math.max(current, flash, 1);
        const h1 = (current / max) * 100, h2 = (flash / max) * 100;
        ctx.fillStyle = 'rgba(239,68,68,0.4)'; ctx.beginPath(); ctx.roundRect(80, 130 - h1, 50, h1, 4); ctx.fill();
        ctx.fillStyle = 'rgba(0,240,255,0.5)'; ctx.beginPath(); ctx.roundRect(170, 130 - h2, 50, h2, 4); ctx.fill();
        ctx.fillStyle = '#94a3b8'; ctx.font = '11px Inter, sans-serif'; ctx.textAlign = 'center';
        ctx.fillText('Avant', 105, 145); ctx.fillText('FlashAI', 195, 145);
    }
    [budget, leads, conv].forEach(el => el.addEventListener('input', calc));
    calc();
}

/* ========== FAQ KNOWLEDGE BASE ========== */
function initFAQ() {
    const list = document.getElementById('faq-list');
    if (!list) return;
    const faqs = [
        // GENERAL
        { q: 'Who is behind FlashAI?', a: 'FlashAI is run by <strong>Emmanuel Smadja</strong>, a Franco-Israeli AI consultant with a <span class="faq-highlight">finance-first DNA</span> (DECF diploma, ex-CEO). You talk directly with the founder — no account managers, no offshore team.', cat: 'general', icon: '\u{1F464}' },
        { q: 'Why Israel for a LATAM project?', a: 'Israel is the <span class="faq-highlight">Startup Nation</span>: world-class AI talent, fastest deployment cycles, and — critically for LATAM — <strong>FTA &amp; DTA tax treaties</strong> with Mercosur, Mexico, Colombia, Panama, Costa Rica, USA, Canada and 58 more countries.', cat: 'general', icon: '\u{1F1EE}\u{1F1F1}' },
        { q: 'Do you speak Spanish?', a: 'Yes — we operate in <strong>ES · EN · FR</strong>. Emmanuel uses Argentine voseo with LATAM clients. Our Sprint kickoffs are in castellano by default.', cat: 'general', icon: '\u{1F5E3}\uFE0F' },
        { q: 'Which countries do you serve?', a: 'LATAM-wide: <strong>Argentina, Brazil, Uruguay, Paraguay, Chile, Mexico, Colombia, Peru, Panama, Costa Rica, Dominican Republic</strong> + USA, Canada, France, Spain, Israel. Fully remote over WhatsApp / Google Meet.', cat: 'general', icon: '\u{1F30E}' },
        { q: 'How do we communicate during the Sprint?', a: 'WhatsApp is primary (daily async + emergency). Weekly video kickoff + mid-Sprint review. Timezone aligned: Israel (GMT+3) overlaps LATAM afternoons perfectly.', cat: 'general', icon: '\u{1F4DE}' },

        // SPRINT IA
        { q: 'What is the 14-Day AI Sprint?', a: 'Our flagship product. In 14 calendar days we ship <strong>one production workflow</strong> for your company — Sales qualifier, Finance reconciler, Support agent, or Ops classifier. Fixed price. Money-back guarantee.', cat: 'sprint', icon: '\u{1F680}' },
        { q: 'Can you really ship in 14 days?', a: 'Yes — every Sprint delivered in 2025 shipped on time. We scope <strong>tightly</strong> (one workflow, one owner, clear success metric) and build on proven stacks: LangGraph, CrewAI, MCP, GPT-5, Claude 4.6, Mistral Large.', cat: 'sprint', icon: '\u23F1\uFE0F' },
        { q: 'What if you miss the 14-day deadline?', a: '<strong>You pay nothing.</strong> Full money-back guarantee. This clause has never been triggered — we scope Sprints we know we can ship.', cat: 'sprint', icon: '\u{1F6E1}\uFE0F' },
        { q: 'What integrations are supported?', a: 'HubSpot, Salesforce, Odoo, QuickBooks, SAP, WhatsApp Business, Notion, Airtable, Google Workspace, Microsoft 365, Slack, Zapier, Make, n8n. Custom APIs available on Tier 2+.', cat: 'sprint', icon: '\u26A1' },
        { q: 'What pack should I start with?', a: '<strong>Sales pack</strong> if your bottleneck is lead response time. <strong>Finance pack</strong> for invoice/reconciliation overhead. <strong>Support pack</strong> for ticket volume. Not sure? Start with the <span class="faq-highlight">$990 Diagnostic</span> and we\'ll tell you.', cat: 'sprint', icon: '\u{1F4E6}' },

        // PRICING
        { q: 'How much does a Sprint cost?', a: '<strong>3 tiers (Pioneros −40%):</strong> Diagnostic <span class="faq-highlight">$990</span> · Sprint 14 Days <span class="faq-highlight">$3,900</span> · Sprint Transformation <span class="faq-highlight">$9,900</span>. All prices USD. Transparent — no hidden fees.', cat: 'pricing', icon: '\u{1F4B0}' },
        { q: 'What is Pioneros LATAM 2026?', a: 'The first <strong>3 LATAM SMBs</strong> that book between April and June 2026 get <span class="faq-highlight">−40% off all Sprint tiers</span>. In exchange we publish an anonymized case study. Slots are filled first-come, first-served.', cat: 'pricing', icon: '\u{1F525}' },
        { q: 'How do I pay?', a: 'Bank transfer (USD) or credit card via Stripe. <strong>50% on signature</strong>, 50% on delivery. Invoice issued by our Israeli entity — eligible for FTA/DTA tax credits in most LATAM countries.', cat: 'pricing', icon: '\u{1F4B3}' },
        { q: 'Do you work on retainer?', a: 'Yes — the <strong>Fractional CTO AI</strong> pillar: monthly retainer from <span class="faq-highlight">$2,500/mo</span> (2 days/week AI leadership: strategy, roadmap, hiring, architecture reviews). Voseo-friendly. Cancel anytime with 30 days notice.', cat: 'pricing', icon: '\u{1F3AF}' },

        // TAX / FTA
        { q: 'How does the Israel tax advantage work?', a: 'Israel has <strong>Free Trade Agreements</strong> with Mercosur (2011), Mexico (2000), Colombia (2020), Panama (2020), USA (1985), Canada (1997) and <strong>Double Tax Agreements</strong> with 58 countries. Your accountant may claim a tax credit on our Israeli invoice — typical savings <span class="faq-highlight">15–30%</span>.', cat: 'tax', icon: '\u{1F1EE}\u{1F1F1}' },
        { q: 'Is this legal in Argentina?', a: 'Yes — the Mercosur–Israel FTA has been in force since 2011. Argentina also recognizes GDPR adequacy (Jan 2024) which aligns with our data practices. Your contador can apply the treaty to reduce withholding tax on foreign IT services.', cat: 'tax', icon: '\u2705' },
        { q: 'Can my CFO claim a tax credit?', a: 'In most cases yes, provided we issue a compliant Israeli invoice (VAT-exempt for export services) and your accountant applies the correct treaty clause. We provide the documentation — your local tax counsel validates the treatment.', cat: 'tax', icon: '\u{1F4C4}' },

        // SOVEREIGNTY
        { q: 'Where is my data hosted?', a: 'Your choice. <strong>Public API</strong> (GPT-5 · Claude 4.6): data processed by OpenAI/Anthropic per their DPA. <strong>Private Brain</strong> (Mistral Large · DeepSeek V3 · Qwen 2.5): on dedicated GPU servers at <span class="faq-highlight">Hetzner Germany</span> — zero data sent to US vendors.', cat: 'sovereignty', icon: '\u{1F512}' },
        { q: 'Is this GDPR compliant?', a: 'Yes. We deploy on EU infrastructure (Hetzner DE), sign DPAs, support data residency clauses, and are aligned with <strong>GDPR, Argentine Ley 25.326, EU AI Act, DORA, NIS2</strong>. Healthcare clients: HDS-ready configurations available.', cat: 'sovereignty', icon: '\u2696\uFE0F' },
        { q: 'Can I run the AI fully on-premise?', a: 'Yes — part of our <strong>Private Brain</strong> pillar. We deploy Mistral / DeepSeek / Llama on your own servers (or a European sovereign cloud of your choice). Ideal for regulated industries (banking, health, defense).', cat: 'sovereignty', icon: '\u{1F3E2}' },
        { q: 'What about model updates?', a: 'Private Brain includes a quarterly model-refresh plan (swap Mistral 2 → Mistral 3 when it ships, etc.). LoRA/QLoRA fine-tuning on your data is included in Tier 3 Transformation.', cat: 'sovereignty', icon: '\u{1F9E0}' },

        // SUPPORT
        { q: 'What support do I get post-launch?', a: '<strong>30 days</strong> included on Sprint 14 Days · <strong>90 days</strong> on Sprint Transformation. After that: Fractional CTO retainer ($2,500+/mo) or ad-hoc support at $180 USD/hr.', cat: 'support', icon: '\u{1F4AC}' },
        { q: 'How fast is your response time?', a: 'WhatsApp: <span class="faq-highlight">&lt; 4 hours</span> during business hours, &lt; 24h always. Critical production bugs: &lt; 1h (Sprint Transformation SLA).', cat: 'support', icon: '\u23F1\uFE0F' },
        { q: 'Do you train my team?', a: 'Yes — 2 live training sessions included in Sprint 14 Days (ES or EN), recorded for replay. Documentation in <strong>castellano</strong> delivered at handoff. Additional sessions: $400 USD each.', cat: 'support', icon: '\u{1F393}' },
        { q: 'What if I need changes later?', a: 'Easy. Either book a new Sprint (if it\'s a new workflow), or use the Fractional CTO retainer for continuous evolution. Your code and data always belong to you — no vendor lock-in.', cat: 'support', icon: '\u{1F527}' },
        { q: 'Who owns the code and data?', a: '<strong>You. 100%.</strong> You get the full source code via GitHub, complete technical documentation, and all IP rights. We keep zero rights on your data or workflows.', cat: 'support', icon: '\u{1F4C4}' },
        { q: 'How do I start?', a: '<strong>1)</strong> WhatsApp Emmanuel (+972 55 241 8324) in ES/EN. <strong>2)</strong> 30-min diagnostic call. <strong>3)</strong> Quote and Sprint kickoff within 72h. <strong>4)</strong> First workflow live in 14 days.', cat: 'support', icon: '\u{1F3AF}' }
    ];
    const totalEl = document.getElementById('faq-total-count');
    if (totalEl) totalEl.textContent = faqs.length;
    let readSet = new Set(), currentCat = 'general', searchQuery = '';
    function render() {
        const filtered = faqs.filter(f => {
            if (currentCat !== 'all' && f.cat !== currentCat) return false;
            if (searchQuery && !f.q.toLowerCase().includes(searchQuery) && !f.a.toLowerCase().includes(searchQuery)) return false;
            return true;
        });
        list.innerHTML = filtered.map((f, i) => {
            const idx = faqs.indexOf(f);
            const isRead = readSet.has(idx);
            const colors = { general: '#00f0ff', technique: '#bf00ff', business: '#00ff87', support: '#ff8c00', ia: '#ff006e', projet: '#ffd700' };
            const c = colors[f.cat] || '#6366f1';
            return '<div class="faq-card ' + (isRead ? 'faq-read' : '') + ' reveal" data-idx="' + idx + '">' +
                '<div class="faq-card-accent" style="background:linear-gradient(180deg,' + c + ',' + c + '40)"></div>' +
                '<button class="faq-question" aria-expanded="false">' +
                '<span style="font-size:1.25rem;flex-shrink:0">' + f.icon + '</span>' +
                '<span class="faq-q-text">' + f.q + '</span>' +
                '<span class="faq-q-cat" style="color:' + c + ';border:1px solid ' + c + '40;background:' + c + '10">' + f.cat + '</span>' +
                '<svg class="faq-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>' +
                '</button>' +
                '<div class="faq-answer"><div class="faq-card-answer">' + f.a + '</div></div>' +
                '</div>';
        }).join('');
        list.querySelectorAll('.faq-question').forEach(btn => {
            btn.addEventListener('click', () => {
                const card = btn.closest('.faq-card');
                const wasOpen = card.classList.contains('open');
                card.classList.toggle('open');
                btn.setAttribute('aria-expanded', !wasOpen);
                if (!wasOpen) {
                    const idx = +card.dataset.idx;
                    readSet.add(idx);
                    card.classList.add('faq-read');
                    const readEl = document.getElementById('faq-read-count');
                    const progEl = document.getElementById('faq-progress-bar');
                    if (readEl) readEl.textContent = readSet.size;
                    if (progEl) progEl.style.width = (readSet.size / faqs.length * 100) + '%';
                }
            });
        });
        document.querySelectorAll('.faq-card.reveal').forEach(el => {
            el.classList.add('visible');
        });
    }
    render();
    const tabs = document.getElementById('faq-tabs');
    if (tabs) tabs.querySelectorAll('.faq-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.querySelectorAll('.faq-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCat = tab.dataset.cat;
            render();
        });
    });
    const search = document.getElementById('faq-search');
    if (search) search.addEventListener('input', e => { searchQuery = e.target.value.toLowerCase(); render(); });
}

/* ========== CTA CANVAS ========== */
function initCTACanvas() {
    const canvas = document.getElementById('cta-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() { w = canvas.width = canvas.parentElement.offsetWidth; h = canvas.height = canvas.parentElement.offsetHeight; }
    resize();
    window.addEventListener('resize', resize);
    const particles = Array.from({ length: 50 }, () => ({
        x: Math.random(), y: Math.random(),
        vx: (Math.random() - 0.5) * 0.002,
        vy: (Math.random() - 0.5) * 0.002,
        size: Math.random() * 2 + 1,
        color: ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87'][Math.floor(Math.random() * 5)],
        alpha: Math.random() * 0.3 + 0.1
    }));
    function draw() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > 1) p.vx *= -1;
            if (p.y < 0 || p.y > 1) p.vy *= -1;
            ctx.beginPath();
            ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = (particles[i].x - particles[j].x) * w;
                const dy = (particles[i].y - particles[j].y) * h;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x * w, particles[i].y * h);
                    ctx.lineTo(particles[j].x * w, particles[j].y * h);
                    ctx.strokeStyle = 'rgba(99,102,241,' + (0.1 * (1 - dist / 120)) + ')';
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
    let total = 23 * 3600 + 59 * 60 + 42;
    setInterval(() => {
        if (total <= 0) total = 24 * 3600;
        total--;
        const h = Math.floor(total / 3600), m = Math.floor((total % 3600) / 60), s = total % 60;
        el.textContent = String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    }, 1000);
}

/* ========== SMART FORM ========== */
function initSmartForm() {
    const selector = document.getElementById('smart-form-selector');
    const container = document.getElementById('smart-form-container');
    if (!selector || !container) return;
    const types = [
        { id: 'sprint', name: 'Sprint IA · 14 Days', icon: '\u{1F680}', color: '#ffd700', desc: 'Ship in 14 days · from $990' },
        { id: 'automation', name: 'Automation', icon: '\u26A1', color: '#bf00ff', desc: 'Sales · Finance · Support · from $4,900' },
        { id: 'fractional', name: 'Fractional CTO AI', icon: '\u{1F3AF}', color: '#ff8c00', desc: 'Monthly retainer · from $2,500/mo' },
        { id: 'brain', name: 'Private Brain · LLM', icon: '\u{1F9E0}', color: '#ff006e', desc: 'Mistral / DeepSeek · from $9,900' },
        { id: 'other', name: 'Other project', icon: '\u{1F4AC}', color: '#00ff87', desc: 'Custom AI initiative' },
        { id: 'partner', name: 'Partnership', icon: '\u{1F91D}', color: '#a78bfa', desc: 'White-label · reseller · intro' }
    ];
    const LATAM_COUNTRIES = ['\u{1F1E6}\u{1F1F7} Argentina','\u{1F1E7}\u{1F1F7} Brazil','\u{1F1FA}\u{1F1FE} Uruguay','\u{1F1F5}\u{1F1FE} Paraguay','\u{1F1E8}\u{1F1F1} Chile','\u{1F1F2}\u{1F1FD} Mexico','\u{1F1E8}\u{1F1F4} Colombia','\u{1F1F5}\u{1F1EA} Peru','\u{1F1F5}\u{1F1E6} Panama','\u{1F1E8}\u{1F1F7} Costa Rica','\u{1F1E9}\u{1F1F4} Dominican Republic','\u{1F1FA}\u{1F1F8} USA','\u{1F1E8}\u{1F1E6} Canada','\u{1F1EA}\u{1F1F8} Spain','\u{1F1EB}\u{1F1F7} France','\u{1F1EE}\u{1F1F1} Israel','Other'];
    const INDUSTRIES = ['Agro / Food','Manufacturing','Retail / E-commerce','SaaS / Tech','Fintech / Banking','Health / Biotech','Legal / Compliance','Logistics / Transport','Real Estate','Energy / Utilities','Education','Media / Marketing','Other'];
    const COMPANY_SIZE = ['1-10 employees','11-50 employees','51-200 employees','201-500 employees','500+ employees'];
    const BUDGET_USD = ['< $1,000','$1,000 - $5,000','$5,000 - $15,000','$15,000 - $50,000','$50,000+','Tell me what makes sense'];
    const URGENCY = ['\u{1F525} Urgent (this month)','\u26A1 Fast (next 30-60 days)','\u{1F4C5} Normal (Q2/Q3 2026)','\u{1F50D} Exploring'];
    const CONTACT_CORE = [
        { label: 'Full name *', type: 'text', placeholder: 'Juan Perez', half: true },
        { label: 'Email *', type: 'email', placeholder: 'juan@empresa.com', half: true },
        { label: 'WhatsApp *', type: 'tel', placeholder: '+54 9 11 0000 0000', half: true },
        { label: 'Company *', type: 'text', placeholder: 'Acme S.A.', half: true },
        { label: 'Website', type: 'text', placeholder: 'https://acme.com', half: true },
        { label: 'Role', type: 'text', placeholder: 'CEO / CFO / COO / IT', half: true }
    ];
    const formFields = {
        sprint: {
            subtitle: 'Ship your first AI workflow in 14 days · pick a tier',
            fields: [
                ...CONTACT_CORE,
                { label: 'Country *', type: 'select', options: LATAM_COUNTRIES, half: true },
                { label: 'Company size *', type: 'select', options: COMPANY_SIZE, half: true },
                { label: 'Industry *', type: 'chips', options: INDUSTRIES, full: true },
                { label: 'Sprint tier *', type: 'chips', options: ['Diagnostic · $990','14 Days · $3,900','Transformation · $9,900','Not sure yet'], full: true },
                { label: 'Pack focus *', type: 'chips', options: ['Sales (lead qualifier · HubSpot sync)','Finance (invoice reconciliation · Odoo)','Support (WhatsApp bot · RAG FAQ)','Ops (document classifier · OCR)','Other'], full: true },
                { label: 'Main pain point *', type: 'textarea', placeholder: 'Describe in 1-2 paragraphs: what process is burning your team\'s time? What data/tools are involved? Metrics you\'d like to move.', full: true },
                { label: 'Budget (USD)', type: 'select', options: BUDGET_USD, half: true },
                { label: 'Urgency', type: 'select', options: URGENCY, half: true },
                { label: 'Interested in Pioneros \u221240%?', type: 'chips', options: ['\u{1F525} Yes — claim a slot','Yes if it fits my timeline','Just exploring'], full: true }
            ]
        },
        automation: {
            subtitle: 'Automation Intelligence packs · Sales · Finance · Support · Ops',
            fields: [
                ...CONTACT_CORE,
                { label: 'Country *', type: 'select', options: LATAM_COUNTRIES, half: true },
                { label: 'Company size *', type: 'select', options: COMPANY_SIZE, half: true },
                { label: 'Industry *', type: 'chips', options: INDUSTRIES, full: true },
                { label: 'Pack(s) of interest *', type: 'checks', options: ['Sales pack (HubSpot · Salesforce · WhatsApp)','Finance pack (Odoo · QuickBooks · SAP)','Support pack (WhatsApp bot · Zendesk · RAG)','Ops pack (OCR · classifier · workflow)','Custom'], full: true },
                { label: 'Current stack *', type: 'checks', options: ['HubSpot','Salesforce','Odoo','QuickBooks','SAP','WhatsApp Business','Notion','Google Workspace','Microsoft 365','Slack','Zapier / Make / n8n','Other'], full: true },
                { label: 'How many repetitive tasks/day are you trying to eliminate?', type: 'chips', options: ['< 10','10 - 30','30 - 100','100+'], full: true },
                { label: 'Budget (USD)', type: 'select', options: BUDGET_USD, half: true },
                { label: 'Urgency', type: 'select', options: URGENCY, half: true },
                { label: 'Describe the workflow to automate *', type: 'textarea', placeholder: 'What does the process look like today? Who does what, in which tool, with what bottleneck?', full: true }
            ]
        },
        fractional: {
            subtitle: 'Fractional CTO AI · monthly retainer · 2 days/week strategy',
            fields: [
                ...CONTACT_CORE,
                { label: 'Country *', type: 'select', options: LATAM_COUNTRIES, half: true },
                { label: 'Company size *', type: 'select', options: COMPANY_SIZE, half: true },
                { label: 'Industry *', type: 'chips', options: INDUSTRIES, full: true },
                { label: 'Do you already have an AI roadmap? *', type: 'chips', options: ['No — starting from zero','Partial / ideas','Yes, need execution','Yes, need to rethink it'], full: true },
                { label: 'Primary need *', type: 'checks', options: ['AI strategy & roadmap','Vendor selection (build vs buy)','Architecture review','Team hiring (AI engineers)','POC \u2192 production transition','Governance / compliance','Board/CEO education'], full: true },
                { label: 'Engagement length', type: 'chips', options: ['3 months','6 months','12 months','Rolling (cancel 30d notice)'], full: true },
                { label: 'Monthly budget (USD)', type: 'select', options: ['$2,500 - $5,000','$5,000 - $10,000','$10,000 - $20,000','$20,000+','Flexible'], half: true },
                { label: 'Urgency', type: 'select', options: URGENCY, half: true },
                { label: 'Company context *', type: 'textarea', placeholder: 'What is your business, your growth stage, your current team structure, and what triggered the need for a Fractional CTO?', full: true }
            ]
        },
        brain: {
            subtitle: 'Private Brain · Sovereign LLM · Mistral / DeepSeek on Hetzner DE or your infra',
            fields: [
                ...CONTACT_CORE,
                { label: 'Country *', type: 'select', options: LATAM_COUNTRIES, half: true },
                { label: 'Company size *', type: 'select', options: COMPANY_SIZE, half: true },
                { label: 'Industry *', type: 'chips', options: INDUSTRIES, full: true },
                { label: 'Why sovereign? *', type: 'checks', options: ['Regulatory (GDPR · Ley 25.326 · HDS · DORA · NIS2)','Competitive sensitivity (IP protection)','Data residency requirement','Cost predictability vs API metering','Air-gapped deployment','Other'], full: true },
                { label: 'Preferred model family', type: 'chips', options: ['Mistral Large','DeepSeek V3','Qwen 2.5 72B','Llama 4','Help me choose'], full: true },
                { label: 'Hosting preference *', type: 'chips', options: ['Hetzner DE (managed)','Your own data center','European sovereign cloud','Hybrid (sensitive on-prem, rest API)','Open to advice'], full: true },
                { label: 'Fine-tuning / RAG on your data?', type: 'chips', options: ['Yes — both','RAG only','Fine-tune only','Not yet decided'], full: true },
                { label: 'Budget (USD)', type: 'select', options: ['$9,900 - $25,000','$25,000 - $75,000','$75,000+','TCO over 3 years'], half: true },
                { label: 'Urgency', type: 'select', options: URGENCY, half: true },
                { label: 'Use cases & compliance context *', type: 'textarea', placeholder: 'Primary use cases (internal chat? RAG on contracts? code assistant?), compliance regime, team size who will use it.', full: true }
            ]
        },
        other: {
            subtitle: 'A unique AI project? We love the unusual.',
            fields: [
                ...CONTACT_CORE,
                { label: 'Country *', type: 'select', options: LATAM_COUNTRIES, half: true },
                { label: 'Company size', type: 'select', options: COMPANY_SIZE, half: true },
                { label: 'Project type *', type: 'chips', options: ['Custom AI product','Data platform','AI agent / multi-agent','Research / POC','AI-powered SaaS','Mobile app w/ AI','Consulting tech','Other'], full: true },
                { label: 'Budget (USD)', type: 'select', options: BUDGET_USD, half: true },
                { label: 'Urgency', type: 'select', options: URGENCY, half: true },
                { label: 'Project description *', type: 'textarea', placeholder: 'Tell us the idea, the business goal, the target users, and the technical constraints you see.', full: true }
            ]
        },
        partner: {
            subtitle: 'Partnership · white-label · reseller · strategic intro',
            fields: [
                ...CONTACT_CORE,
                { label: 'Country *', type: 'select', options: LATAM_COUNTRIES, half: true },
                { label: 'Partnership type *', type: 'chips', options: ['White-label resale','Referral / intro (commission)','Co-delivery (tech + business)','Local implementation partner','Press / community','Other'], full: true },
                { label: 'Your expertise *', type: 'chips', options: ['Sales / Business Dev','Tax / Legal consulting','Local tech integrator','Marketing / PR','Industry-specific vertical','Accelerator / VC','Other'], full: true },
                { label: 'Your team size', type: 'select', options: ['Solo','2-10 people','11-50 people','50+'], half: true },
                { label: 'Years in business', type: 'select', options: ['< 1','1-3','3-10','10+'], half: true },
                { label: 'Partnership proposal *', type: 'textarea', placeholder: 'What collaboration do you envision? What synergies? Specific clients or pipeline in mind?', full: true }
            ]
        }
    };
    let selected = null;
    function renderSelector() {
        selector.innerHTML = types.map(t => '<div class="smart-form-type ' + (selected === t.id ? 'selected' : '') + '" data-type="' + t.id + '" style="--form-color:' + t.color + ';--form-glow:' + t.color + '40"><span class="sf-type-icon">' + t.icon + '</span><span class="sf-type-name">' + t.name + '</span><span class="sf-type-desc">' + t.desc + '</span></div>').join('');
        selector.querySelectorAll('.smart-form-type').forEach(el => {
            el.addEventListener('click', () => {
                selected = el.dataset.type;
                renderSelector();
                renderForm();
                container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    }
    function renderField(f, color) {
        const cls = f.full ? 'sf-field sf-field-full' : (f.half ? 'sf-field' : 'sf-field sf-field-full');
        if (f.type === 'text' || f.type === 'email' || f.type === 'tel') {
            return '<div class="' + cls + '"><label class="sf-label">' + f.label + '</label><input type="' + f.type + '" class="sf-input" placeholder="' + f.placeholder + '"></div>';
        }
        if (f.type === 'select') {
            return '<div class="' + cls + '"><label class="sf-label">' + f.label + '</label><select class="sf-select"><option value="">Select...</option>' + f.options.map(o => '<option>' + o + '</option>').join('') + '</select></div>';
        }
        if (f.type === 'textarea') {
            return '<div class="' + cls + '"><label class="sf-label">' + f.label + '</label><textarea class="sf-textarea" placeholder="' + f.placeholder + '" rows="4"></textarea></div>';
        }
        if (f.type === 'chips') {
            return '<div class="' + cls + '"><label class="sf-label">' + f.label + '</label><div class="sf-chips">' + f.options.map(o => '<button type="button" class="sf-chip" style="--chip-color:' + color + '">' + o + '</button>').join('') + '</div></div>';
        }
        if (f.type === 'checks') {
            return '<div class="' + cls + '"><label class="sf-label">' + f.label + '</label><div class="sf-checks-grid">' + f.options.map(o => '<label class="sf-check-item" style="--check-color:' + color + '"><input type="checkbox" class="sf-check-input"><span class="sf-check-box"><svg viewBox="0 0 12 12" width="12" height="12"><path d="M2 6l3 3 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span><span class="sf-check-text">' + o + '</span></label>').join('') + '</div></div>';
        }
        return '';
    }
    const tips = {
        sprint: { tip: 'Tip: 14-day sprints ship a real workflow in production — no slides, no pilots forever.', stat: '14 days', statLabel: 'Time to live', examples: 'Lead qualifier, invoice reconciliation, WhatsApp support bot, OCR classifier' },
        automation: { tip: 'Tip: Our SMB clients typically cut 20h+/week of repetitive tasks in month 1.', stat: '4-8 wks', statLabel: 'Typical rollout', examples: 'HubSpot enrichment, Odoo sync, Stripe reconciliation, document classifier, Slack alerts' },
        fractional: { tip: 'Tip: Hiring a full-time AI CTO costs $200k+/yr. Fractional gives you 80% of the value from $2,500/mo.', stat: '$2.5k+', statLabel: 'Monthly', examples: 'Strategy, roadmap, hiring, vendor selection, architecture reviews, board education' },
        brain: { tip: 'Tip: Zero data sent to OpenAI. Your IP stays yours — Mistral / DeepSeek on Hetzner DE.', stat: 'Zero leak', statLabel: 'Data to US', examples: 'Internal chat, contract RAG, code assistant, regulated industry LLM, air-gapped deploy' },
        other: { tip: 'Tip: From AI products to data platforms — we\'ve shipped across most verticals.', stat: 'Custom', statLabel: 'Scope', examples: 'Agentic products, SaaS, mobile w/ AI, R&D POC, marketplace, internal tools' },
        partner: { tip: 'Tip: Our partners typically generate 20-30% added revenue via joint delivery or intro fees.', stat: 'Win-win', statLabel: 'Model', examples: 'White-label, referrals, co-delivery, local integration, press & community' }
    };
    function renderForm() {
        if (!selected) { container.innerHTML = '<div class="sf-empty-state"><div class="sf-empty-icon">\u{1F446}</div><p>Select a project type above to get a tailored form</p></div>'; return; }
        const type = types.find(t => t.id === selected);
        const config = formFields[selected];
        const tip = tips[selected];
        container.innerHTML = '<div class="smart-form" style="--form-color:' + type.color + ';--form-glow:' + type.color + '40;--chip-color:' + type.color + '">' +
            '<div class="sf-form-header"><div class="sf-form-icon" style="background:' + type.color + '15;color:' + type.color + ';border:1px solid ' + type.color + '30">' + type.icon + '</div><div><div class="sf-form-title" style="color:' + type.color + '">' + type.name + '</div><div class="sf-form-subtitle">' + config.subtitle + '</div></div></div>' +
            '<div class="sf-tip-banner" style="background:' + type.color + '08;border:1px solid ' + type.color + '20;border-radius:0.75rem;padding:0.85rem 1rem;margin-bottom:1.25rem;display:flex;gap:1rem;align-items:center;flex-wrap:wrap">' +
                '<div style="flex:1;min-width:200px"><div style="font-size:0.78rem;color:' + type.color + ';font-weight:600;margin-bottom:0.25rem">\u{1F4A1} ' + tip.tip + '</div><div style="font-size:0.7rem;color:#64748b">Ex : ' + tip.examples + '</div></div>' +
                '<div style="text-align:center;padding:0.5rem 1rem;border-radius:0.5rem;background:' + type.color + '10;flex-shrink:0"><div style="font-family:Space Grotesk,sans-serif;font-size:1.1rem;font-weight:700;color:' + type.color + '">' + tip.stat + '</div><div style="font-size:0.6rem;color:#94a3b8">' + tip.statLabel + '</div></div>' +
            '</div>' +
            '<div class="sf-divider" style="background:linear-gradient(90deg,transparent,' + type.color + '30,transparent)"></div>' +
            '<div class="sf-fields">' + config.fields.map(f => renderField(f, type.color)).join('') + '</div>' +
            '<div class="sf-divider" style="background:linear-gradient(90deg,transparent,' + type.color + '30,transparent)"></div>' +
            '<div class="sf-submit-wrap"><button class="sf-submit" style="background:linear-gradient(135deg,\u002325D366,\u002320BA5A)" type="button"><span class="sf-submit-text">\u{1F4AC} Enviar via WhatsApp \u2022 Send via WhatsApp</span></button><p class="sf-submit-note">\u2705 Free diagnostic \u2022 Response &lt; 24h \u2022 ES / EN / FR \u2022 No commitment</p></div>' +
            '</div>';
        // Chips toggle
        container.querySelectorAll('.sf-chips').forEach(group => {
            group.querySelectorAll('.sf-chip').forEach(chip => {
                chip.addEventListener('click', () => chip.classList.toggle('active'));
            });
        });
        // Check items
        container.querySelectorAll('.sf-check-input').forEach(cb => {
            cb.addEventListener('change', () => cb.closest('.sf-check-item').classList.toggle('checked', cb.checked));
        });
        // Input validation
        container.querySelectorAll('.sf-input').forEach(input => {
            input.addEventListener('input', () => {
                if (input.type === 'email') { input.classList.toggle('valid', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)); input.classList.toggle('invalid', input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)); }
                else { input.classList.toggle('valid', input.value.trim().length > 0); input.classList.remove('invalid'); }
            });
        });
        // Submit -> WhatsApp deeplink with recap
        container.querySelector('.sf-submit').addEventListener('click', () => {
            const formEl = container.querySelector('.smart-form');
            const values = [];
            let missingRequired = false;
            formEl.querySelectorAll('.sf-field').forEach(fieldEl => {
                const labelEl = fieldEl.querySelector('.sf-label');
                if (!labelEl) return;
                const label = labelEl.textContent.trim();
                const isRequired = label.includes('*');
                let value = '';
                const input = fieldEl.querySelector('.sf-input, .sf-textarea, .sf-select');
                if (input) {
                    value = (input.value || '').trim();
                } else {
                    const chipsWrap = fieldEl.querySelector('.sf-chips');
                    const checksWrap = fieldEl.querySelector('.sf-checks');
                    if (chipsWrap) {
                        value = Array.from(chipsWrap.querySelectorAll('.sf-chip.active')).map(c => c.textContent.trim()).join(', ');
                    } else if (checksWrap) {
                        value = Array.from(checksWrap.querySelectorAll('.sf-check-input:checked')).map(cb => (cb.closest('.sf-check-item').textContent || '').trim()).join(', ');
                    }
                }
                if (isRequired && !value) missingRequired = true;
                if (value) values.push({ label: label.replace(/\s*\*$/, ''), value });
            });
            if (missingRequired) {
                showToast('\u26A0\uFE0F Please fill all required fields (*) \u2022 Completa los campos obligatorios');
                const firstBad = formEl.querySelector('.sf-input[required]:invalid, .sf-select[required]:invalid');
                if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            const type = types.find(t => t.id === selected);
            let msg = 'Hola Emmanuel, soy un prospecto LATAM. Tipo: ' + type.name + '.\n\n';
            values.forEach(v => { msg += '\u2022 ' + v.label + ': ' + v.value + '\n'; });
            msg += '\nQuiero reservar un slot (ideally Pioneros \u221240%). Gracias!';
            const waUrl = 'https://wa.me/972552418324?text=' + encodeURIComponent(msg);
            launchConfetti();
            showToast('\u2705 Opening WhatsApp... \u2022 Abriendo WhatsApp...');
            setTimeout(() => { window.open(waUrl, '_blank', 'noopener'); }, 350);
        });
    }
    renderSelector();
    renderForm();
}

/* ========== CONFETTI ========== */
function launchConfetti() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:99999;pointer-events:none';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = ['#ff006e','#00f0ff','#bf00ff','#ffd700','#00ff87','#ff8c00','#e879f9','#f472b6'];
    const pieces = Array.from({length: 150}, () => ({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 18 - 4,
        w: Math.random() * 10 + 4,
        h: Math.random() * 6 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.3,
        gravity: 0.25 + Math.random() * 0.15,
        life: 1,
        decay: 0.005 + Math.random() * 0.005
    }));
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let alive = false;
        pieces.forEach(p => {
            if (p.life <= 0) return;
            alive = true;
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.99;
            p.rotation += p.rotSpeed;
            p.life -= p.decay;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            ctx.restore();
        });
        if (alive) requestAnimationFrame(draw);
        else canvas.remove();
    }
    draw();
}

/* ========== TRUST BAR ========== */
function initTrustBar() {
    const marquee = document.getElementById('trust-marquee');
    if (!marquee) return;
    const logos = ['TechVision','FoodExpress','MediCare Pro','CryptoTrack','EduSmart','LogiFlow','GreenEnergy','LegalBot','FinanceHub','DataWave','CloudNest','AutoPilot','SmartRetail','DevForge','SkyMetrics','NeoBank'];
    const colors = ['#00f0ff','#bf00ff','#ff006e','#ffd700','#00ff87','#ff8c00','#e879f9','#06b6d4','#f472b6','#a78bfa','#34d399','#fb923c','#818cf8','#f87171','#38bdf8','#facc15'];
    const items = logos.map((name, i) => '<div class="trust-logo" style="--tl-color:' + colors[i % colors.length] + '"><span class="trust-logo-icon" style="color:' + colors[i % colors.length] + '">' + name.charAt(0) + '</span><span class="trust-logo-name">' + name + '</span></div>').join('');
    marquee.innerHTML = '<div class="trust-track">' + items + items + '</div>';
}

/* ========== MAGNETIC BUTTON ========== */
function initMagneticBtn() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', e => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
        });
        btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
}

/* ========== SCROLL TOP ========== */
function initScrollTop() {
    const btn = document.getElementById('scroll-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

/* ========== SMOOTH ANCHORS ========== */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
}

/* ========== THREE.JS BACKGROUND (lightweight) ========== */
function initThreeBackground() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    const dots = Array.from({ length: 60 }, () => ({
        x: Math.random() * 1, y: Math.random() * 1,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.0002 + 0.00005,
        phase: Math.random() * Math.PI * 2
    }));
    let t = 0;
    function draw() {
        ctx.clearRect(0, 0, w, h);
        t += 0.01;
        dots.forEach(d => {
            d.phase += d.speed;
            const x = (d.x + Math.sin(d.phase) * 0.02) * w;
            const y = (d.y + Math.cos(d.phase * 0.7) * 0.02) * h;
            const alpha = 0.15 + Math.sin(t + d.phase) * 0.1;
            ctx.beginPath();
            ctx.arc(x, y, d.size, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(99,102,241,' + alpha + ')';
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
}

/* ========== EASTER EGGS ========== */
function initEasterEggs() {
    let konamiCode = '';
    const konamiSeq = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
    document.addEventListener('keydown', e => {
        konamiCode += e.key;
        if (konamiCode.length > konamiSeq.length) konamiCode = konamiCode.slice(-konamiSeq.length);
        if (konamiCode === konamiSeq) {
            showToast('\u{1F389} Mode secret active ! Vous etes un vrai geek !');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => { document.body.style.filter = ''; }, 3000);
        }
    });
}

/* ========== HEADING SPARKLE REMINDERS ========== */
(function initHeadingSparkles() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('heading-shimmer');
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.gradient-text-hero, .gradient-text-warm, .gradient-text-green').forEach(el => {
        observer.observe(el);
    });
})();

/* ========== ELECTRIC SPARKS ON CLICK ========== */
function initElectricSparks() {
    document.addEventListener('click', e => {
        const colors = ['#00f0ff', '#bf00ff', '#ff006e', '#ffd700', '#00ff87'];
        for (let i = 0; i < 6; i++) {
            const spark = document.createElement('div');
            spark.style.cssText = 'position:fixed;pointer-events:none;z-index:9998;width:4px;height:4px;border-radius:50%;background:' + colors[Math.floor(Math.random() * colors.length)] + ';left:' + e.clientX + 'px;top:' + e.clientY + 'px;box-shadow:0 0 6px currentColor;transition:all 0.6s cubic-bezier(0.22,1,0.36,1);opacity:1;';
            document.body.appendChild(spark);
            const angle = (Math.PI * 2 / 6) * i + Math.random() * 0.5;
            const dist = 30 + Math.random() * 40;
            requestAnimationFrame(() => {
                spark.style.transform = 'translate(' + (Math.cos(angle) * dist) + 'px,' + (Math.sin(angle) * dist) + 'px) scale(0)';
                spark.style.opacity = '0';
            });
            setTimeout(() => spark.remove(), 700);
        }
    });
}

/* ========== SECTION FLASH REVEAL — brief white flash when sections appear ========== */
function initSectionFlashReveal() {
    const sections = document.querySelectorAll('section[id]');
    const flashObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting && !e.target.dataset.flashed) {
                e.target.dataset.flashed = '1';
                const flash = document.createElement('div');
                flash.style.cssText = 'position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,240,255,0.06),rgba(191,0,255,0.04),transparent);pointer-events:none;z-index:1;border-radius:inherit;animation:section-flash 1s ease forwards;';
                e.target.style.position = e.target.style.position || 'relative';
                e.target.appendChild(flash);
                setTimeout(() => flash.remove(), 1200);
            }
        });
    }, { threshold: 0.15 });
    sections.forEach(s => flashObserver.observe(s));

    /* Add CSS keyframe for section flash */
    if (!document.getElementById('flash-reveal-style')) {
        const style = document.createElement('style');
        style.id = 'flash-reveal-style';
        style.textContent = '@keyframes section-flash{0%{opacity:0;}20%{opacity:1;}100%{opacity:0;}}';
        document.head.appendChild(style);
    }
}

/* ================================================================
   LEGAL MODALS
   ================================================================ */
(function initLegalModals() {
    const modal = document.getElementById('legal-modal');
    const body = document.getElementById('legal-modal-body');
    const closeBtn = document.getElementById('legal-modal-close');
    if (!modal || !body) return;

    const pages = {
        'mentions-legales': `<h2>Mentions L\u00e9gales</h2>
<h3>1. \u00c9diteur du site</h3>
<p><strong>FlashAI</strong> \u2014 Entreprise isra\u00e9lienne<br>
Fond\u00e9e par <strong>Emmanuel Smadja</strong><br>
Si\u00e8ge social : Isra\u00ebl<br>
Email : <a href="mailto:contact@flashai.dev" style="color:#00f0ff">contact@flashai.dev</a><br>
T\u00e9l\u00e9phone : <a href="tel:+33758787025" style="color:#00f0ff">+33 7 58 78 70 25</a><br>
Activit\u00e9 : Agence digitale \u2014 cr\u00e9ation de sites web, CRM, chatbots IA, automatisations</p>
<h3>2. H\u00e9bergement</h3>
<p>Ce site est h\u00e9berg\u00e9 par <strong>GitHub Pages</strong> (GitHub, Inc.), 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.</p>
<h3>3. Propri\u00e9t\u00e9 intellectuelle</h3>
<p>L\u2019ensemble du contenu de ce site (textes, images, logos, code, animations, design) est la propri\u00e9t\u00e9 exclusive de FlashAI et est prot\u00e9g\u00e9 par les lois isra\u00e9liennes et internationales relatives \u00e0 la propri\u00e9t\u00e9 intellectuelle. Toute reproduction, m\u00eame partielle, sans autorisation \u00e9crite pr\u00e9alable est interdite.</p>
<h3>4. Responsabilit\u00e9</h3>
<p>FlashAI s\u2019efforce de fournir des informations exactes et \u00e0 jour. Toutefois, FlashAI ne saurait \u00eatre tenu responsable des erreurs, omissions ou r\u00e9sultats obtenus suite \u00e0 l\u2019utilisation de ces informations.</p>
<h3>5. Droit applicable</h3>
<p>Les pr\u00e9sentes mentions l\u00e9gales sont r\u00e9gies par le droit isra\u00e9lien. Tout litige sera soumis \u00e0 la comp\u00e9tence exclusive des tribunaux d\u2019Isra\u00ebl.</p>`,

        'politique-confidentialite': `<h2>Politique de Confidentialit\u00e9</h2>
<h3>1. Responsable du traitement</h3>
<p><strong>FlashAI</strong>, entreprise isra\u00e9lienne fond\u00e9e par Emmanuel Smadja.<br>
Contact : <a href="mailto:contact@flashai.dev" style="color:#00f0ff">contact@flashai.dev</a></p>
<h3>2. Donn\u00e9es collect\u00e9es</h3>
<p>Nous collectons les donn\u00e9es suivantes uniquement via le formulaire de contact :</p>
<ul>
<li>Nom et pr\u00e9nom</li>
<li>Adresse email</li>
<li>Nom de l\u2019entreprise (facultatif)</li>
<li>Message / description du projet</li>
</ul>
<h3>3. Finalit\u00e9 du traitement</h3>
<p>Ces donn\u00e9es sont utilis\u00e9es exclusivement pour :</p>
<ul>
<li>R\u00e9pondre \u00e0 vos demandes de devis et de contact</li>
<li>\u00c9tablir et g\u00e9rer la relation commerciale</li>
<li>Am\u00e9liorer nos services</li>
</ul>
<h3>4. Dur\u00e9e de conservation</h3>
<p>Les donn\u00e9es sont conserv\u00e9es pendant une dur\u00e9e maximale de 3 ans apr\u00e8s le dernier contact, sauf obligation l\u00e9gale contraire.</p>
<h3>5. Partage des donn\u00e9es</h3>
<p>Vos donn\u00e9es ne sont jamais vendues, lou\u00e9es ou partag\u00e9es avec des tiers \u00e0 des fins commerciales. Elles peuvent \u00eatre transmises \u00e0 des sous-traitants techniques (h\u00e9bergement, email) uniquement dans le cadre strict de la prestation.</p>
<h3>6. Cookies</h3>
<p>Ce site utilise uniquement des cookies techniques n\u00e9cessaires au bon fonctionnement du site. Aucun cookie publicitaire ou de tracking n\u2019est utilis\u00e9.</p>
<h3>7. Vos droits</h3>
<p>Conform\u00e9ment \u00e0 la loi isra\u00e9lienne sur la protection de la vie priv\u00e9e (Privacy Protection Law, 5741-1981) et au RGPD pour les r\u00e9sidents europ\u00e9ens, vous disposez des droits d\u2019acc\u00e8s, de rectification, de suppression et de portabilit\u00e9 de vos donn\u00e9es. Contactez-nous \u00e0 <a href="mailto:contact@flashai.dev" style="color:#00f0ff">contact@flashai.dev</a>.</p>
<h3>8. S\u00e9curit\u00e9</h3>
<p>Nous mettons en \u0153uvre des mesures de s\u00e9curit\u00e9 techniques et organisationnelles (SSL/TLS, chiffrement AES-256) pour prot\u00e9ger vos donn\u00e9es personnelles.</p>`,

        'cgv': `<h2>Conditions G\u00e9n\u00e9rales de Vente</h2>
<h3>1. Objet</h3>
<p>Les pr\u00e9sentes CGV r\u00e9gissent les relations entre <strong>FlashAI</strong>, entreprise isra\u00e9lienne fond\u00e9e par Emmanuel Smadja (ci-apr\u00e8s \u00ab le Prestataire \u00bb), et tout client (ci-apr\u00e8s \u00ab le Client \u00bb) pour les prestations de services digitaux.</p>
<h3>2. Services propos\u00e9s</h3>
<ul>
<li>Cr\u00e9ation de sites web sur mesure</li>
<li>D\u00e9veloppement de CRM / ERP personnalis\u00e9s</li>
<li>Int\u00e9gration de chatbots IA</li>
<li>Tableaux de bord et analytics</li>
<li>Automatisation de processus</li>
<li>SEO technique et audit</li>
<li>S\u00e9curit\u00e9 web et conformit\u00e9 RGPD</li>
</ul>
<h3>3. Devis et commande</h3>
<p>Tout projet d\u00e9bute par un devis personnalis\u00e9 gratuit, \u00e9tabli sous 24h. Le devis est valable 30 jours. La commande est confirm\u00e9e \u00e0 r\u00e9ception du devis sign\u00e9 et du versement de l\u2019acompte de 50%.</p>
<h3>4. Tarifs et paiement</h3>
<p>Les prix sont indiqu\u00e9s en euros (EUR), hors taxes. En tant qu\u2019entreprise isra\u00e9lienne, la TVA fran\u00e7aise ne s\u2019applique pas (autoliquidation pour les clients europ\u00e9ens). Le solde est d\u00fb \u00e0 la livraison du projet.</p>
<h3>5. D\u00e9lais de livraison</h3>
<p>Les d\u00e9lais indicatifs sont : site vitrine (5 jours), CRM/dashboard (7-10 jours), projet complexe (10-14 jours). Ces d\u00e9lais courent \u00e0 compter de la validation du cahier des charges et de la r\u00e9ception de l\u2019acompte.</p>
<h3>6. Propri\u00e9t\u00e9 et livraison</h3>
<p>Le transfert de propri\u00e9t\u00e9 du code source et des livrables s\u2019effectue au paiement int\u00e9gral. Le Client re\u00e7oit un acc\u00e8s complet au code source, aux acc\u00e8s h\u00e9bergement et \u00e0 toute la documentation technique.</p>
<h3>8. Support et maintenance</h3>
<p>Un support technique est inclus pendant 12 mois apr\u00e8s la livraison. Au-del\u00e0, un contrat de maintenance peut \u00eatre propos\u00e9.</p>
<h3>9. R\u00e9siliation</h3>
<p>Chaque partie peut r\u00e9silier le contrat en cas de manquement grave de l\u2019autre partie, apr\u00e8s mise en demeure rest\u00e9e sans effet pendant 15 jours.</p>
<h3>10. Droit applicable et litiges</h3>
<p>Les pr\u00e9sentes CGV sont r\u00e9gies par le droit isra\u00e9lien. En cas de litige, les parties s\u2019engagent \u00e0 rechercher une solution amiable. \u00c0 d\u00e9faut, les tribunaux d\u2019Isra\u00ebl seront seuls comp\u00e9tents.</p>
<h3>11. Contact</h3>
<p>Pour toute question relative aux pr\u00e9sentes CGV : <a href="mailto:contact@flashai.dev" style="color:#00f0ff">contact@flashai.dev</a></p>`
    };

    function openModal(page) {
        if (!pages[page]) return;
        body.innerHTML = pages[page];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    closeBtn.addEventListener('click', closeModal);
    modal.querySelector('.legal-modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    document.getElementById('link-mentions')?.addEventListener('click', e => { e.preventDefault(); openModal('mentions-legales'); });
    document.getElementById('link-privacy')?.addEventListener('click', e => { e.preventDefault(); openModal('politique-confidentialite'); });
    document.getElementById('link-cgv')?.addEventListener('click', e => { e.preventDefault(); openModal('cgv'); });
})();

// === SERVICE DETAIL MODAL ===
(function() {
    const serviceData = {
        'sites-web': {
            title: 'Sites Web sur mesure',
            icon: '🌐',
            color: '#00f0ff',
            intro: 'Un site web professionnel, performant et optimise pour convertir vos visiteurs en clients.',
            sections: [
                { title: 'Ce que vous obtenez', items: ['Site vitrine, landing page ou e-commerce 100% sur mesure', 'Design responsive adapte mobile, tablette et desktop', 'Score Lighthouse 95+ garanti (performance, SEO, accessibilite)', 'Integration de vos contenus, textes, images, videos', 'Formulaire de contact et/ou prise de RDV integre', 'Hebergement 1 an offert + nom de domaine'] },
                { title: 'Technologies utilisees', items: ['React / Next.js pour les performances', 'TailwindCSS pour un design pixel-perfect', 'Deploiement sur Vercel, Netlify ou votre serveur', 'SSL, CDN et optimisations automatiques'] },
                { title: 'Deroulement typique', items: ['Jour 1 : Appel decouverte 30 min + brief', 'Jour 2-3 : Maquette interactive a valider', 'Jour 3-5 : Developpement et integration', 'Jour 5 : Mise en ligne + formation', 'Suivi et support email inclus'] },
                { title: 'Tarif indicatif', items: ['A partir de 390\u20AC pour un site vitrine', 'E-commerce : a partir de 790\u20AC', 'Hebergement 1 an inclus dans tous les plans'] }
            ]
        },
        'crm-erp': {
            title: 'CRM & ERP personnalises',
            icon: '📊',
            color: '#bf00ff',
            intro: 'Un outil de gestion sur mesure qui s\'adapte a votre facon de travailler, pas l\'inverse.',
            sections: [
                { title: 'Ce que vous obtenez', items: ['CRM adapte a votre metier (contacts, pipeline, relances)', 'Dashboard avec vos KPIs en temps reel', 'Automatisations : emails, relances, notifications', 'Export CSV/PDF, rapports automatiques', 'Multi-utilisateurs avec gestion des droits'] },
                { title: 'Cas d\'usage', items: ['Gestion de clientele pour professions liberales', 'Suivi commercial et pipeline de ventes', 'Gestion de stock et commandes pour commercants', 'Facturation et devis automatises'] },
                { title: 'Deroulement', items: ['Audit de vos besoins et processus actuels', 'Prototype interactif en 48h', 'Developpement iteratif avec vos retours', 'Formation de votre equipe + documentation'] },
                { title: 'Tarif indicatif', items: ['A partir de 990\u20AC', 'Complement a un outil existant : a partir de 490\u20AC', 'Hebergement 1 an inclus'] }
            ]
        },
        'chatbot-ia': {
            title: 'Chatbot IA intelligent',
            icon: '🤖',
            color: '#ff006e',
            intro: 'Un assistant virtuel qui repond a vos clients 24/7, base sur vos donnees et votre ton.',
            sections: [
                { title: 'Ce que vous obtenez', items: ['Chatbot entraine sur vos donnees (FAQ, catalogue, site)', 'Integration site web, WhatsApp, Messenger, Slack', 'Reponses naturelles et contextuelles', 'Tableau de bord pour suivre les conversations', 'Escalade automatique vers un humain si necessaire'] },
                { title: 'Technologies', items: ['GPT-4 / Claude pour la comprehension', 'Architecture RAG pour des reponses fiables', 'Base de connaissances vectorisee (vos docs)', 'API securisee et hebergee'] },
                { title: 'Resultats attendus', items: ['85% des questions resolues automatiquement', '-60% de charge sur votre support', 'Disponible 24h/24, 7j/7', 'Amelioration continue avec les retours'] },
                { title: 'Tarif indicatif', items: ['A partir de 790\u20AC pour un chatbot de base', 'Chatbot avance avec RAG : a partir de 1 490\u20AC', 'Hebergement 1 an inclus'] }
            ]
        },
        'automatisation': {
            title: 'Automatisation de processus',
            icon: '⚡',
            color: '#ff8c00',
            intro: 'Automatisez vos taches repetitives pour gagner du temps et reduire les erreurs.',
            sections: [
                { title: 'Ce que vous obtenez', items: ['Audit de vos processus manuels actuels', 'Workflows automatises entre vos outils', 'Connexion de vos apps (CRM, email, agenda, comptabilite...)', 'Alertes et notifications automatiques', 'Rapports generes automatiquement'] },
                { title: 'Outils utilises', items: ['Zapier, Make (Integromat), n8n', 'Scripts custom Python / Node.js', 'API et webhooks sur mesure', 'Connexion a plus de 200 applications'] },
                { title: 'Exemples concrets', items: ['Nouveau lead → email de bienvenue + ajout CRM + notification Slack', 'Facture payee → mise a jour comptabilite + email client', 'Post reseaux sociaux → planification automatique multi-plateformes', 'Audit SEO quotidien automatise + rapport email'] },
                { title: 'Tarif indicatif', items: ['A partir de 390\u20AC pour un workflow simple', 'Pack 5 automatisations : a partir de 890\u20AC', 'Maintenance et monitoring inclus 6 mois'] }
            ]
        },
        'seo': {
            title: 'SEO & Croissance digitale',
            icon: '📈',
            color: '#00ff87',
            intro: 'Soyez visible sur Google. On optimise votre site pour attirer du trafic qualifie.',
            sections: [
                { title: 'Ce que vous obtenez', items: ['Audit SEO complet de votre site', 'Optimisation Core Web Vitals (vitesse, UX)', 'Strategie de mots-cles adaptee a votre marche', 'Optimisation on-page (titres, meta, structure)', 'Schema.org et donnees structurees', 'Rapport mensuel de performances'] },
                { title: 'Resultats mesurables', items: ['+200% de trafic organique en moyenne a 3 mois', 'Score Lighthouse 95+ garanti', 'Amelioration des positions Google', 'Plus de leads qualifies via le search'] },
                { title: 'Notre approche', items: ['Analyse de la concurrence et opportunites', 'Contenu optimise avec l\'aide de l\'IA', 'Suivi et ajustements mensuels', 'Formation pour maintenir les bonnes pratiques'] },
                { title: 'Tarif indicatif', items: ['Audit SEO ponctuel : a partir de 290\u20AC', 'Optimisation complete : a partir de 590\u20AC', 'Accompagnement mensuel : sur devis'] }
            ]
        },
        'conseil': {
            title: 'Conseil & Accompagnement',
            icon: '💡',
            color: '#ffd700',
            intro: 'Pas sur de ce dont vous avez besoin ? On vous aide a y voir clair et a faire les bons choix.',
            sections: [
                { title: 'Ce que vous obtenez', items: ['Audit de votre situation digitale actuelle', 'Recommandations strategiques personnalisees', 'Choix d\'outils adaptes a votre budget', 'Plan d\'action concret et priorise', 'Formation a l\'utilisation de l\'IA pour votre metier'] },
                { title: 'Pour qui ?', items: ['Vous demarrez et ne savez pas par ou commencer', 'Vous avez un site mais il ne performe pas', 'Vous voulez integrer l\'IA sans tout refaire', 'Vous cherchez un avis expert avant d\'investir'] },
                { title: 'Formats possibles', items: ['Consultation ponctuelle (1h-2h)', 'Audit complet avec livrable ecrit', 'Accompagnement mensuel', 'Formation equipe (IA, outils digitaux, SEO)'] },
                { title: 'Tarif indicatif', items: ['Consultation 1h : 90\u20AC', 'Audit complet : a partir de 290\u20AC', 'Accompagnement mensuel : sur devis'] }
            ]
        }
    };

    const modal = document.getElementById('service-modal');
    const inner = document.getElementById('service-modal-inner');
    if (!modal || !inner) return;

    function openService(key) {
        const s = serviceData[key];
        if (!s) return;
        inner.innerHTML = '<div style="text-align:center;margin-bottom:2rem"><span style="font-size:3rem;display:block;margin-bottom:0.75rem">' + s.icon + '</span><h3 class="font-display font-bold text-2xl sm:text-3xl" style="color:white">' + s.title + '</h3><p style="color:#94a3b8;margin-top:0.5rem;max-width:500px;margin-left:auto;margin-right:auto">' + s.intro + '</p></div>' +
            s.sections.map(function(sec) {
                return '<div class="service-detail-section"><h4 style="color:' + s.color + '">' + sec.title + '</h4><ul class="service-detail-list">' + sec.items.map(function(it) { return '<li>' + it + '</li>'; }).join('') + '</ul></div>';
            }).join('') +
            '<div style="text-align:center;margin-top:2rem"><a href="#contact" class="btn-glow" onclick="document.getElementById(\'service-modal\').classList.remove(\'active\')"><span>Demander un devis</span></a></div>';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeService() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.service-link').forEach(function(el) {
        el.addEventListener('click', function() { openService(el.dataset.service); });
    });
    document.getElementById('service-modal-close').addEventListener('click', closeService);
    document.getElementById('service-modal-backdrop').addEventListener('click', closeService);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeService(); });
})();

/* ========== SERVICES CAROUSEL DOTS ========== */
function initServicesDots() {
    const track = document.querySelector('.services-carousel-track');
    const dotsContainer = document.getElementById('services-dots');
    if (!track || !dotsContainer) return;
    const slides = track.querySelectorAll('.services-slide');
    if (window.innerWidth >= 768) { dotsContainer.innerHTML = ''; return; }
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); });
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const idx = Array.from(slides).indexOf(e.target);
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        });
    }, { root: track, threshold: 0.6 });
    slides.forEach(s => obs.observe(s));
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) dotsContainer.innerHTML = '';
    });
}

/* ========== ADN CAROUSEL DOTS ========== */
function initAdnDots() {
    const track = document.querySelector('.adn-carousel-track');
    const dotsContainer = document.getElementById('adn-dots');
    if (!track || !dotsContainer) return;
    const slides = track.querySelectorAll('.adn-slide');
    if (window.innerWidth >= 768) { dotsContainer.innerHTML = ''; return; }
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => { slides[i].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }); });
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const idx = Array.from(slides).indexOf(e.target);
                dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            }
        });
    }, { root: track, threshold: 0.6 });
    slides.forEach(s => obs.observe(s));
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) dotsContainer.innerHTML = '';
    });
}
