/**
 * FlashAI v4.0 — Ultra Premium Interactions
 * Three.js 3D, orbital animations, interactive demos, spectacular effects
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initScrollReveal();
    initHeader();
    initMobileMenu();
    initTypewriter();
    initCounters();
    initMarquee();
    initParticles();
    initTimeline();
    initFAQ();
    initContactForm();
    initROICalculator();
    initSmoothAnchors();
    initTiltCards();
    initBentoGlow();
    initHeroTerminal();
    initDemoSection();
    initOrbitalTools();
    initExpertiseBars();
    initThreeBackground();
    initEasterEggs();
});

/* ========== LOADER ========== */
function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;
    window.addEventListener('load', () => {
        setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 1800);
    });
    setTimeout(() => { loader.classList.add('hidden'); document.body.style.overflow = ''; }, 4000);
    document.body.style.overflow = 'hidden';
}

/* ========== CUSTOM CURSOR ========== */
function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;
    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;
    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });
    function animateRing() {
        ringX += (mouseX - 18 - ringX) * 0.1;
        ringY += (mouseY - 18 - ringY) * 0.1;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();
    const interactiveEls = 'a, button, input, textarea, select, .bento-card, .portfolio-card, .pricing-card, .faq-question, .orbital-node, .testimonial-card, .expertise-card, .demo-tab, .tool-category-card';
    const observer = new MutationObserver(() => {
        document.querySelectorAll(interactiveEls).forEach(el => {
            if (!el._cursorBound) {
                el._cursorBound = true;
                el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
                el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });
    document.querySelectorAll(interactiveEls).forEach(el => {
        el._cursorBound = true;
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

/* ========== SCROLL REVEAL ========== */
function initScrollReveal() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { entry.target.classList.add('active'); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => obs.observe(el));
}

/* ========== HEADER ========== */
function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => { header.classList.toggle('scrolled', window.scrollY > 30); ticking = false; });
            ticking = true;
        }
    });
}

/* ========== MOBILE MENU ========== */
function initMobileMenu() {
    const toggle = document.getElementById('mobile-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', () => {
        const isOpen = menu.classList.contains('open');
        menu.classList.toggle('open', !isOpen);
        toggle.setAttribute('aria-expanded', !isOpen);
    });
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => { menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
    });
    document.addEventListener('click', e => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ========== TYPEWRITER ========== */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    const words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;
    let wordIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
        const current = words[wordIndex];
        if (isDeleting) { el.textContent = current.substring(0, charIndex - 1); charIndex--; }
        else { el.textContent = current.substring(0, charIndex + 1); charIndex++; }
        let delay = isDeleting ? 35 : 70;
        if (!isDeleting && charIndex === current.length) { delay = 2200; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; delay = 300; }
        setTimeout(type, delay);
    }
    setTimeout(type, 800);
}

/* ========== COUNTERS ========== */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) { animateCounter(entry.target); obs.unobserve(entry.target); } });
    }, { threshold: 0.5 });
    counters.forEach(el => obs.observe(el));
}
function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2500;
    const start = performance.now();
    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        el.textContent = prefix + Math.round(eased * target).toLocaleString('fr-FR') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

/* ========== MARQUEE ========== */
function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
        const children = track.children[0];
        if (!children) return;
        track.appendChild(children.cloneNode(true));
    });
}

/* ========== PARTICLES ========== */
function initParticles() {
    const container = document.getElementById('particles-hero');
    if (!container) return;
    const count = window.innerWidth < 768 ? 20 : 40;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const colors = ['rgba(129,140,248,', 'rgba(0,240,255,', 'rgba(191,0,255,', 'rgba(0,255,135,'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        p.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${color}${Math.random()*0.2+0.05});border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;animation:particle-float-${i%3} ${Math.random()*15+20}s linear infinite;animation-delay:${Math.random()*-20}s;pointer-events:none;`;
        container.appendChild(p);
    }
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float-0 { 0%{transform:translate(0,0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate(${Math.random()>0.5?'':'-'}${Math.random()*200+50}px,-${Math.random()*300+100}px);opacity:0} }
        @keyframes particle-float-1 { 0%{transform:translate(0,0) scale(1);opacity:0}10%{opacity:1}50%{transform:translate(${Math.random()*100-50}px,${Math.random()*100-50}px) scale(1.5)}90%{opacity:1}100%{transform:translate(${Math.random()*200-100}px,-${Math.random()*200+50}px) scale(0.5);opacity:0} }
        @keyframes particle-float-2 { 0%{transform:translate(0,0);opacity:0}10%{opacity:0.8}90%{opacity:0.8}100%{transform:translate(${Math.random()*150-75}px,${Math.random()*200-100}px);opacity:0} }
    `;
    document.head.appendChild(style);
}

/* ========== TIMELINE ========== */
function initTimeline() {
    const wrapper = document.querySelector('.timeline-wrapper');
    if (!wrapper) return;
    const fill = wrapper.querySelector('.timeline-line-fill');
    const nodes = wrapper.querySelectorAll('.timeline-node');
    if (!fill || !nodes.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animateTimeline(); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.3 });
    obs.observe(wrapper);
    function animateTimeline() {
        nodes.forEach((node, i) => {
            setTimeout(() => {
                node.classList.add('lit');
                fill.style.width = ((i + 1) / nodes.length * 100) + '%';
            }, i * 600);
        });
    }
}

/* ========== HERO TERMINAL ========== */
function initHeroTerminal() {
    const termBody = document.getElementById('hero-terminal');
    if (!termBody) return;

    const sequences = [
        { cmd: 'flashai create --type site-vitrine --client "Restaurant Paris"', delay: 60 },
        { output: ['[+] Analyse du brief...', '[+] Generation du design responsive...', '[+] Integration SEO avance...', '[+] Lighthouse score: 98/100', '[+] Deploiement sur Vercel...', '', '✓ Site deploye en 4.2 secondes'], outputDelay: 400 },
        { pause: 2000 },
        { cmd: 'flashai add --feature chatbot-ia --model claude', delay: 50 },
        { output: ['[+] Configuration du modele IA...', '[+] Entrainement sur vos donnees...', '[+] Integration widget responsive...', '', '✓ Chatbot IA operationnel — repond en <2s'], outputDelay: 350 },
        { pause: 2000 },
        { cmd: 'flashai deploy --env production --ssl auto', delay: 55 },
        { output: ['[+] Build optimise (tree-shaking, minification)...', '[+] CDN mondial active...', '[+] Certificat SSL genere...', '[+] DNS propage...', '', '✓ En production. Votre site est live.'], outputDelay: 300 },
        { pause: 3000 },
        { clear: true }
    ];

    let seqIndex = 0;

    async function runSequence() {
        while (true) {
            for (const seq of sequences) {
                if (seq.clear) {
                    await sleep(500);
                    const lines = termBody.querySelectorAll('.terminal-line');
                    lines.forEach((l, i) => { if (i > 0) l.remove(); });
                    const firstCmd = termBody.querySelector('.terminal-command');
                    if (firstCmd) firstCmd.textContent = '';
                    continue;
                }
                if (seq.pause) { await sleep(seq.pause); continue; }
                if (seq.cmd) {
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    line.innerHTML = '<span class="terminal-prompt">$</span> <span class="terminal-command"></span>';
                    termBody.appendChild(line);
                    const cmdEl = line.querySelector('.terminal-command');
                    for (let i = 0; i < seq.cmd.length; i++) {
                        cmdEl.textContent += seq.cmd[i];
                        await sleep(seq.delay);
                    }
                    await sleep(300);
                }
                if (seq.output) {
                    for (const text of seq.output) {
                        const outLine = document.createElement('div');
                        outLine.className = 'terminal-line';
                        if (text.startsWith('✓')) {
                            outLine.innerHTML = `<span class="terminal-success">${text}</span>`;
                        } else if (text.startsWith('[+]')) {
                            outLine.innerHTML = `<span class="terminal-accent">${text}</span>`;
                        } else {
                            outLine.innerHTML = `<span class="terminal-output">${text}</span>`;
                        }
                        termBody.appendChild(outLine);
                        await sleep(seq.outputDelay);
                        // Auto-scroll
                        termBody.scrollTop = termBody.scrollHeight;
                    }
                }
            }
        }
    }
    runSequence();
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* ========== DEMO SECTION ========== */
function initDemoSection() {
    const tabs = document.querySelectorAll('.demo-tab');
    const codeOutput = document.getElementById('demo-code-output');
    const previewOutput = document.getElementById('demo-preview-output');
    if (!tabs.length || !codeOutput || !previewOutput) return;

    const demos = {
        site: {
            code: [
                '<span style="color:#c084fc">const</span> <span style="color:#f97316">site</span> = <span style="color:#38bdf8">createSite</span>({',
                '  name: <span style="color:#4ade80">"Restaurant Le Gourmet"</span>,',
                '  pages: [<span style="color:#4ade80">"accueil"</span>, <span style="color:#4ade80">"menu"</span>, <span style="color:#4ade80">"reservation"</span>],',
                '  seo: <span style="color:#c084fc">true</span>,',
                '  responsive: <span style="color:#c084fc">true</span>,',
                '  lighthouse: <span style="color:#f97316">98</span>,',
                '});',
                '',
                '<span style="color:#475569">// Deploiement automatique</span>',
                '<span style="color:#c084fc">await</span> <span style="color:#38bdf8">deploy</span>(site, {',
                '  host: <span style="color:#4ade80">"vercel"</span>,',
                '  ssl: <span style="color:#c084fc">true</span>,',
                '  cdn: <span style="color:#c084fc">true</span>,',
                '});',
                '<span style="color:#22c55e">// ✓ Live en 4.2s</span>',
            ],
            preview: '<div style="text-align:left;width:100%"><div style="background:rgba(99,102,241,0.15);border-radius:12px;padding:16px;margin-bottom:12px"><div style="height:8px;width:40%;background:rgba(99,102,241,0.3);border-radius:4px;margin-bottom:12px"></div><div style="height:40px;background:linear-gradient(135deg,rgba(99,102,241,0.1),rgba(0,240,255,0.05));border-radius:8px;margin-bottom:8px"></div><div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px"><div style="height:30px;background:rgba(99,102,241,0.08);border-radius:6px"></div><div style="height:30px;background:rgba(0,240,255,0.08);border-radius:6px"></div><div style="height:30px;background:rgba(191,0,255,0.08);border-radius:6px"></div></div></div><div style="display:flex;justify-content:space-between;font-size:0.65rem;color:#22c55e"><span>Lighthouse: 98/100</span><span>SEO: A+</span><span>Speed: 0.8s</span></div></div>'
        },
        crm: {
            code: [
                '<span style="color:#c084fc">const</span> <span style="color:#f97316">crm</span> = <span style="color:#38bdf8">buildCRM</span>({',
                '  modules: [',
                '    <span style="color:#4ade80">"clients"</span>,',
                '    <span style="color:#4ade80">"devis"</span>,',
                '    <span style="color:#4ade80">"factures"</span>,',
                '    <span style="color:#4ade80">"pipeline"</span>,',
                '  ],',
                '  automations: {',
                '    relanceAuto: <span style="color:#c084fc">true</span>,',
                '    devisIA: <span style="color:#c084fc">true</span>,',
                '    rapports: <span style="color:#4ade80">"hebdo"</span>,',
                '  },',
                '  integrations: [<span style="color:#4ade80">"Stripe"</span>, <span style="color:#4ade80">"Gmail"</span>],',
                '});',
            ],
            preview: '<div style="text-align:left;width:100%;display:flex;gap:8px;height:100%"><div style="width:25%;background:rgba(139,92,246,0.1);border-radius:8px;padding:8px"><div style="height:6px;width:60%;background:rgba(139,92,246,0.3);border-radius:3px;margin-bottom:8px"></div><div style="height:6px;width:80%;background:rgba(139,92,246,0.15);border-radius:3px;margin-bottom:6px"></div><div style="height:6px;width:50%;background:rgba(139,92,246,0.15);border-radius:3px;margin-bottom:6px"></div><div style="height:6px;width:70%;background:rgba(139,92,246,0.15);border-radius:3px"></div></div><div style="flex:1;display:flex;flex-direction:column;gap:6px"><div style="height:30%;background:linear-gradient(135deg,rgba(139,92,246,0.12),rgba(99,102,241,0.06));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#8b5cf6">Pipeline: 12 deals actifs</div><div style="flex:1;background:rgba(139,92,246,0.06);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.6rem;color:#64748b">Tableau clients</div></div></div>'
        },
        chatbot: {
            code: [
                '<span style="color:#c084fc">const</span> <span style="color:#f97316">bot</span> = <span style="color:#38bdf8">createChatbot</span>({',
                '  model: <span style="color:#4ade80">"claude-sonnet"</span>,',
                '  knowledge: <span style="color:#38bdf8">loadDocs</span>(<span style="color:#4ade80">"./data"</span>),',
                '  personality: <span style="color:#4ade80">"professionnel"</span>,',
                '  languages: [<span style="color:#4ade80">"fr"</span>, <span style="color:#4ade80">"en"</span>],',
                '  features: {',
                '    recommandations: <span style="color:#c084fc">true</span>,',
                '    priseRDV: <span style="color:#c084fc">true</span>,',
                '    escaladeHumain: <span style="color:#c084fc">true</span>,',
                '  },',
                '  responseTime: <span style="color:#4ade80">"<2s"</span>,',
                '});',
            ],
            preview: '<div style="text-align:left;width:100%"><div style="background:rgba(34,197,94,0.06);border-radius:12px;padding:12px;height:200px;display:flex;flex-direction:column;justify-content:flex-end;gap:8px"><div style="align-self:flex-start;background:rgba(34,197,94,0.12);border-radius:10px 10px 10px 2px;padding:8px 12px;font-size:0.65rem;color:#4ade80;max-width:70%">Bonjour ! Comment puis-je vous aider ?</div><div style="align-self:flex-end;background:rgba(99,102,241,0.12);border-radius:10px 10px 2px 10px;padding:8px 12px;font-size:0.65rem;color:#a5b4fc;max-width:70%">Quels sont vos horaires ?</div><div style="align-self:flex-start;background:rgba(34,197,94,0.12);border-radius:10px 10px 10px 2px;padding:8px 12px;font-size:0.65rem;color:#4ade80;max-width:70%">Nous sommes ouverts du mardi au dimanche, 12h-14h30 et 19h-22h30.</div><div style="background:rgba(255,255,255,0.04);border-radius:8px;padding:8px;font-size:0.6rem;color:#475569">Tapez votre message...</div></div></div>'
        },
        dashboard: {
            code: [
                '<span style="color:#c084fc">const</span> <span style="color:#f97316">dash</span> = <span style="color:#38bdf8">createDashboard</span>({',
                '  widgets: [',
                '    { type: <span style="color:#4ade80">"kpi"</span>, metric: <span style="color:#4ade80">"revenue"</span> },',
                '    { type: <span style="color:#4ade80">"chart"</span>, data: <span style="color:#4ade80">"monthly"</span> },',
                '    { type: <span style="color:#4ade80">"table"</span>, source: <span style="color:#4ade80">"clients"</span> },',
                '    { type: <span style="color:#4ade80">"alerts"</span>, threshold: <span style="color:#f97316">0.8</span> },',
                '  ],',
                '  realtime: <span style="color:#c084fc">true</span>,',
                '  export: [<span style="color:#4ade80">"pdf"</span>, <span style="color:#4ade80">"csv"</span>],',
                '});',
            ],
            preview: '<div style="text-align:left;width:100%;display:grid;grid-template-columns:1fr 1fr;gap:8px"><div style="background:rgba(236,72,153,0.08);border-radius:8px;padding:10px;text-align:center"><div style="font-size:0.55rem;color:#64748b">Revenue</div><div style="font-size:0.9rem;font-weight:700;color:#ec4899">€47.2K</div><div style="font-size:0.5rem;color:#22c55e">+23%</div></div><div style="background:rgba(99,102,241,0.08);border-radius:8px;padding:10px;text-align:center"><div style="font-size:0.55rem;color:#64748b">Clients</div><div style="font-size:0.9rem;font-weight:700;color:#818cf8">342</div><div style="font-size:0.5rem;color:#22c55e">+12%</div></div><div style="grid-column:span 2;background:rgba(99,102,241,0.05);border-radius:8px;padding:10px;height:80px;display:flex;align-items:flex-end;gap:4px"><div style="flex:1;height:40%;background:rgba(99,102,241,0.2);border-radius:3px 3px 0 0"></div><div style="flex:1;height:60%;background:rgba(99,102,241,0.25);border-radius:3px 3px 0 0"></div><div style="flex:1;height:35%;background:rgba(99,102,241,0.2);border-radius:3px 3px 0 0"></div><div style="flex:1;height:80%;background:rgba(99,102,241,0.3);border-radius:3px 3px 0 0"></div><div style="flex:1;height:70%;background:rgba(99,102,241,0.25);border-radius:3px 3px 0 0"></div><div style="flex:1;height:90%;background:rgba(0,240,255,0.3);border-radius:3px 3px 0 0"></div></div></div>'
        }
    };

    let currentDemo = 'site';
    let animating = false;

    function showDemo(key) {
        if (animating || key === currentDemo) return;
        animating = true;
        currentDemo = key;
        tabs.forEach(t => t.classList.toggle('active', t.dataset.demo === key));

        codeOutput.style.opacity = '0';
        previewOutput.style.opacity = '0';

        setTimeout(() => {
            const demo = demos[key];
            codeOutput.innerHTML = '';
            demo.code.forEach((line, i) => {
                const div = document.createElement('div');
                div.style.cssText = `opacity:0;transform:translateX(-10px);transition:all 0.3s ease ${i * 0.05}s;`;
                div.innerHTML = line || '&nbsp;';
                codeOutput.appendChild(div);
                setTimeout(() => { div.style.opacity = '1'; div.style.transform = 'translateX(0)'; }, 50);
            });
            previewOutput.innerHTML = demo.preview;
            codeOutput.style.opacity = '1';
            previewOutput.style.opacity = '1';
            animating = false;
        }, 300);
    }

    tabs.forEach(tab => tab.addEventListener('click', () => showDemo(tab.dataset.demo)));
    showDemo('site');

    // Auto-rotate demos
    const demoKeys = Object.keys(demos);
    let demoIndex = 0;
    setInterval(() => {
        demoIndex = (demoIndex + 1) % demoKeys.length;
        showDemo(demoKeys[demoIndex]);
    }, 8000);
}

/* ========== ORBITAL TOOLS ========== */
function initOrbitalTools() {
    const orbits = [
        { el: document.getElementById('orbit-1'), tools: [
            { name: 'Stripe', color: '#635bff' },
            { name: 'Google', color: '#4285f4' },
            { name: 'Slack', color: '#e01e5a' },
            { name: 'Notion', color: '#ffffff' },
            { name: 'OpenAI', color: '#00a67e' },
            { name: 'Zapier', color: '#ff4a00' },
        ], radius: 125, duration: 30 },
        { el: document.getElementById('orbit-2'), tools: [
            { name: 'HubSpot', color: '#ff7a59' },
            { name: 'Shopify', color: '#96bf48' },
            { name: 'Twilio', color: '#f22f46' },
            { name: 'AWS', color: '#ff9900' },
            { name: 'Vercel', color: '#ffffff' },
            { name: 'Claude', color: '#d97757' },
            { name: 'GitHub', color: '#ffffff' },
            { name: 'Figma', color: '#a259ff' },
        ], radius: 190, duration: 45, reverse: true },
        { el: document.getElementById('orbit-3'), tools: [
            { name: 'Airtable', color: '#18bfff' },
            { name: 'Mailchimp', color: '#ffe01b' },
            { name: 'WhatsApp', color: '#25d366' },
            { name: 'Calendly', color: '#006bff' },
            { name: 'SendGrid', color: '#1a82e2' },
            { name: 'Firebase', color: '#ffca28' },
            { name: 'Supabase', color: '#3ecf8e' },
            { name: 'DocuSign', color: '#ffe000' },
            { name: 'Maps', color: '#34a853' },
            { name: 'n8n', color: '#ea4b71' },
        ], radius: 250, duration: 60 }
    ];

    orbits.forEach(orbit => {
        if (!orbit.el) return;
        const count = orbit.tools.length;
        orbit.tools.forEach((tool, i) => {
            const angle = (i / count) * 360;
            const node = document.createElement('div');
            node.className = 'orbital-node';
            node.textContent = tool.name;
            node.style.cssText = `
                --node-color: ${tool.color};
                --orbit-duration: ${orbit.duration}s;
                --orbit-direction: ${orbit.reverse ? 'reverse' : 'normal'};
                position: absolute;
                top: 50%; left: 50%;
                margin-top: -26px; margin-left: -26px;
                transform-origin: 0 0;
            `;

            // Position using CSS transform
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * orbit.radius;
            const y = Math.sin(rad) * orbit.radius;
            node.style.marginLeft = (x - 26) + 'px';
            node.style.marginTop = (y - 26) + 'px';

            orbit.el.appendChild(node);
        });
    });
}

/* ========== EXPERTISE BARS ========== */
function initExpertiseBars() {
    const bars = document.querySelectorAll('.expertise-metric-bar');
    if (!bars.length) return;
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    bars.forEach(bar => obs.observe(bar));
}

/* ========== TILT CARDS ========== */
function initTiltCards() {
    if (window.matchMedia('(hover: none)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            const tiltX = (0.5 - y) * 10;
            const tiltY = (x - 0.5) * 10;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* ========== BENTO GLOW ========== */
function initBentoGlow() {
    document.querySelectorAll('.bento-card').forEach(card => {
        const glow = card.querySelector('.bento-glow');
        if (!glow) return;
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100);
            const y = ((e.clientY - rect.top) / rect.height * 100);
            glow.style.setProperty('--mouse-x', x + '%');
            glow.style.setProperty('--mouse-y', y + '%');
        });
    });
}

/* ========== FAQ ========== */
function initFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    const faqs = [
        { q: "C'est vraiment aussi peu cher ? Il y a un piege ?", a: "Aucun piege. On utilise l'IA pour automatiser 80% du travail repetitif. Un developpeur assiste par l'IA produit en 1 jour ce qui prend 5 jours sans. On vous repercute cette economie. La qualite reste la meme — chaque ligne est verifiee par un humain." },
        { q: "Quel est le delai de livraison ?", a: "Site vitrine : 3 a 5 jours. CRM ou logiciel metier : 1 a 2 semaines. Application complete : 2 a 4 semaines. Ces delais commencent a la validation du cahier des charges." },
        { q: "Est-ce que le code m'appartient ?", a: "Oui, a 100%. Le code source complet vous est livre. Vous pouvez le modifier, le faire evoluer, le revendre. Aucun verrou, aucune dependance. C'est VOTRE code." },
        { q: "Et si le resultat ne me plait pas ?", a: "Modifications illimitees jusqu'a satisfaction. On travaille par iterations : vous voyez l'avancement en temps reel. Vous ne payez le solde qu'une fois satisfait." },
        { q: "Il y a un abonnement ou des frais caches ?", a: "Non. Paiement unique. Hebergement inclus 2 ans pour les sites. Apres : hebergez vous-meme (on vous montre) ou 5€/mois chez nous. Aucun frais cache." },
        { q: "Vous gerez aussi le SEO ?", a: "Oui ! Chaque site inclut l'optimisation SEO technique : balises meta, Schema.org, Core Web Vitals, sitemap XML, robots.txt, images optimisees. Score Lighthouse 95+. On peut aussi faire du SEO avance (strategie de contenu, backlinks) en option." },
        { q: "Mes donnees sont-elles securisees ?", a: "Securite maximale : HTTPS force, protection XSS/SQL injection, authentification JWT ou OAuth 2.0, chiffrement des donnees sensibles, rate limiting. On suit les standards OWASP Top 10." },
        { q: "Vous utilisez des templates ?", a: "Non. Chaque projet est code sur mesure, de zero. L'IA nous aide a coder plus vite, mais le design, l'architecture et la logique sont penses pour votre projet." },
        { q: "Je ne suis pas technique, c'est grave ?", a: "Pas du tout ! C'est meme notre cible principale. Decrivez ce que vous voulez en langage normal, on se charge du reste. Formation incluse a la livraison." },
        { q: "Quelles technologies utilisez-vous ?", a: "React, Next.js, TypeScript, Python, Node.js, PostgreSQL, Supabase, Firebase, Vercel, Tailwind CSS, et les modeles IA les plus avances (Claude, GPT). On choisit la meilleure stack pour chaque projet." },
        { q: "Vous pouvez automatiser mes taches repetitives ?", a: "Absolument. On connecte vos outils (email, CRM, facturation, agenda) et on automatise : relances clients, generation de rapports, envoi de factures, notifications intelligentes. On utilise n8n, Make, Zapier ou du code sur mesure." },
        { q: "Et apres la livraison ?", a: "30 jours de modifications gratuites. Au-dela, taux horaire de 50€/h pour les evolutions. Support technique inclus. Et comme le code est a vous, vous etes libre de travailler avec qui vous voulez." }
    ];

    faqs.forEach((faq, i) => {
        const item = document.createElement('div');
        item.className = 'faq-item reveal';
        item.style.transitionDelay = `${i * 0.05}s`;
        item.innerHTML = `
            <div class="faq-question">
                <div class="flex items-center gap-3">
                    <span class="faq-number">${String(i + 1).padStart(2, '0')}</span>
                    <h4>${faq.q}</h4>
                </div>
                <svg class="faq-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="faq-answer"><div class="faq-answer-inner">${faq.a}</div></div>
        `;
        item.querySelector('.faq-question').addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            container.querySelectorAll('.faq-item.open').forEach(other => other.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });
        container.appendChild(item);
    });

    setTimeout(() => {
        document.querySelectorAll('.faq-item.reveal').forEach(el => {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); obs.unobserve(entry.target); } });
            }, { threshold: 0.06, rootMargin: '0px 0px -50px 0px' });
            obs.observe(el);
        });
    }, 100);
}

/* ========== CONTACT FORM ========== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const original = btn.innerHTML;
        btn.innerHTML = '<span class="animate-pulse">Envoi en cours...</span>';
        btn.disabled = true;
        try {
            const data = new FormData(form);
            const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept': 'application/json' } });
            if (res.ok) {
                btn.innerHTML = '&#10003; Message envoye !';
                btn.classList.remove('bg-primary-600'); btn.classList.add('bg-green-600');
                form.reset();
                launchConfetti();
                setTimeout(() => { btn.innerHTML = original; btn.classList.remove('bg-green-600'); btn.classList.add('bg-primary-600'); btn.disabled = false; }, 4000);
            } else { throw new Error('Erreur'); }
        } catch {
            btn.innerHTML = 'Erreur — Reessayez';
            btn.classList.remove('bg-primary-600'); btn.classList.add('bg-red-600');
            setTimeout(() => { btn.innerHTML = original; btn.classList.remove('bg-red-600'); btn.classList.add('bg-primary-600'); btn.disabled = false; }, 3000);
        }
    });
}

/* ========== ROI CALCULATOR ========== */
function initROICalculator() {
    const typeSelect = document.getElementById('roi-type');
    const needSelect = document.getElementById('roi-need');
    const resultEl = document.getElementById('roi-result');
    if (!typeSelect || !needSelect || !resultEl) return;
    const pricing = {
        'site': { label: 'Site web', min: 250, max: 700, days: '3-5 jours' },
        'crm': { label: 'CRM / Logiciel', min: 700, max: 2000, days: '1-2 semaines' },
        'dashboard': { label: 'Dashboard', min: 800, max: 2000, days: '1-2 semaines' },
        'ia': { label: 'Automatisation IA', min: 500, max: 2000, days: '1-2 semaines' },
        'api': { label: 'Integrations API', min: 300, max: 1000, days: '2-5 jours' },
        'app': { label: 'Application complete', min: 2000, max: 5000, days: '2-4 semaines' }
    };
    function update() {
        const p = pricing[needSelect.value];
        if (!p) { resultEl.innerHTML = '<p class="text-surface-400 text-sm">Selectionnez vos besoins ci-dessus</p>'; return; }
        resultEl.innerHTML = `
            <div class="text-sm text-surface-400 mb-2">${p.label}</div>
            <div class="font-display text-3xl font-bold text-gradient mb-1">${p.min.toLocaleString('fr-FR')}&euro; &ndash; ${p.max.toLocaleString('fr-FR')}&euro;</div>
            <div class="text-sm text-surface-400 mb-3">Delai : <span class="text-white font-semibold">${p.days}</span></div>
            <a href="#contact" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow text-sm">
                Recevoir mon devis personnalise
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
            </a>
        `;
    }
    typeSelect.addEventListener('change', update);
    needSelect.addEventListener('change', update);
    update();
}

/* ========== SMOOTH ANCHORS ========== */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

    // Floating geometry particles
    const geometry = new THREE.BufferGeometry();
    const count = window.innerWidth < 768 ? 300 : 800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const colorPalette = [
        [0.39, 0.4, 0.94],   // indigo
        [0, 0.94, 1],         // cyan
        [0.75, 0, 1],         // purple
        [0, 1, 0.53],         // green
        [1, 0, 0.43],         // pink
    ];

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

        const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = col[0];
        colors[i * 3 + 1] = col[1];
        colors[i * 3 + 2] = col[2];
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 0.03,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        sizeAttenuation: true,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    camera.position.z = 5;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        requestAnimationFrame(animate);
        points.rotation.x += 0.0003;
        points.rotation.y += 0.0005;

        // Follow mouse gently
        camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.02;
        camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/* ========== EASTER EGGS ========== */
function initEasterEggs() {
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    document.addEventListener('keydown', e => {
        if (e.keyCode === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) { konamiIndex = 0; showEasterEgg(); }
        } else { konamiIndex = 0; }
    });
    let typed = '';
    document.addEventListener('keypress', e => {
        typed += e.key.toLowerCase();
        if (typed.includes('flashai')) { typed = ''; launchConfetti(); }
        if (typed.length > 20) typed = typed.slice(-10);
    });
}

function showEasterEgg() {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(2,6,23,0.95);border:1px solid rgba(99,102,241,0.5);border-radius:20px;padding:40px;z-index:10002;text-align:center;backdrop-filter:blur(20px);max-width:400px;animation:loader-fade 0.3s ease;';
    div.innerHTML = `
        <div style="font-size:2.5rem;margin-bottom:12px;">&#9889;</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.3rem;font-weight:700;margin-bottom:8px;background:linear-gradient(135deg,#818cf8,#00f0ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">Bravo !</h3>
        <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:16px;">Vous avez trouve le secret !<br><strong style="color:#818cf8;">-10% sur votre premier projet</strong></p>
        <p style="color:#64748b;font-size:0.8rem;margin-bottom:20px;">Code promo : <strong style="color:white;background:rgba(99,102,241,0.2);padding:4px 12px;border-radius:6px;">FLASH10</strong></p>
        <button onclick="this.parentElement.remove();document.querySelector('.ee-overlay').remove();" style="background:linear-gradient(135deg,#6366f1,#00f0ff);color:white;border:none;padding:12px 28px;border-radius:12px;cursor:pointer;font-weight:600;font-size:0.85rem;">Merci !</button>
    `;
    document.body.appendChild(div);
    const overlay = document.createElement('div');
    overlay.className = 'ee-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10001;';
    overlay.onclick = () => { div.remove(); overlay.remove(); };
    document.body.appendChild(overlay);
    launchConfetti();
}

function launchConfetti() {
    const colors = ['#6366f1', '#00f0ff', '#bf00ff', '#ff006e', '#00ff87', '#f97316', '#eab308'];
    for (let i = 0; i < 60; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        piece.style.width = (Math.random() * 8 + 4) + 'px';
        piece.style.height = (Math.random() * 8 + 4) + 'px';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3500);
    }
}
