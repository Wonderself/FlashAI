/**
 * FlashAI v3.0 — Ultra Premium Interactions
 * Custom cursor, animations, carousels, particles, and magic.
 */

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCustomCursor();
    initScrollReveal();
    initHeader();
    initMobileMenu();
    initTypewriter();
    initCounters();
    initBrowserCarousel();
    initMarquee();
    initParticles();
    initTimeline();
    initShowcaseHover();
    initFAQ();
    initContactForm();
    initROICalculator();
    initSmoothAnchors();
    initCodeAnimation();
    initConstellationHover();
    initEasterEggs();
});

/* ========== LOADER ========== */
function initLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1400);
    });

    // Fallback
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
    }, 3000);

    document.body.style.overflow = 'hidden';
}

/* ========== CUSTOM CURSOR ========== */
function initCustomCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    function animateRing() {
        ringX += (mouseX - 18 - ringX) * 0.12;
        ringY += (mouseY - 18 - ringY) * 0.12;
        ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
        requestAnimationFrame(animateRing);
    }
    animateRing();

    const interactiveEls = 'a, button, input, textarea, select, .bento-card, .showcase-card, .pricing-card, .faq-question, .constellation-node, .testimonial-card';

    document.querySelectorAll(interactiveEls).forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });

    // Re-bind on dynamically added elements
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
}

/* ========== SCROLL REVEAL ========== */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.06,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
}

/* ========== HEADER ========== */
function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 30);
                ticking = false;
            });
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
        if (isOpen) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            menu.classList.add('open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', e => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* ========== TYPEWRITER ========== */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = words[wordIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length) {
            delay = 2500;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 400;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 1000);
}

/* ========== ANIMATED COUNTERS ========== */
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 2200;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* ========== BROWSER CAROUSEL (Hero) ========== */
function initBrowserCarousel() {
    const slides = document.querySelectorAll('.browser-slide');
    if (slides.length < 2) return;

    let current = 0;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
    }

    setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
    }, 4000);

    showSlide(0);
}

/* ========== MARQUEE CLONE ========== */
function initMarquee() {
    document.querySelectorAll('.marquee-track, .marquee-track-reverse').forEach(track => {
        const children = track.children[0];
        if (!children) return;
        const clone = children.cloneNode(true);
        track.appendChild(clone);
    });
}

/* ========== PARTICLES ========== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const count = window.innerWidth < 768 ? 15 : 30;

    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        const isRect = Math.random() > 0.5;

        p.style.cssText = `
            position: absolute;
            width: ${isRect ? size * 3 : size}px;
            height: ${size}px;
            background: rgba(129, 140, 248, ${Math.random() * 0.15 + 0.05});
            border-radius: ${isRect ? '1px' : '50%'};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particle-float ${Math.random() * 15 + 20}s linear infinite;
            animation-delay: ${Math.random() * -20}s;
            pointer-events: none;
        `;
        container.appendChild(p);
    }

    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-float {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 200 + 50}px, -${Math.random() * 300 + 100}px) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
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

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateTimeline();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(wrapper);

    function animateTimeline() {
        const totalSteps = nodes.length;
        nodes.forEach((node, i) => {
            setTimeout(() => {
                node.classList.add('lit');
                const pct = ((i + 1) / totalSteps) * 100;
                fill.style.width = pct + '%';
            }, i * 500);
        });
    }
}

/* ========== SHOWCASE HOVER ========== */
function initShowcaseHover() {
    // Cards have CSS hover effects, no JS needed
}

/* ========== FAQ ACCORDION ========== */
function initFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    const faqs = [
        {
            q: "C'est vraiment aussi peu cher ? Il y a un piège ?",
            a: "Aucun piège. On utilise l'IA pour automatiser 80% du travail répétitif (scaffolding, tests, documentation). Un développeur assisté par l'IA produit en 1 jour ce qui prend 5 jours sans. On vous répercute cette économie de temps en baisse de prix. La qualité reste la même — chaque ligne est vérifiée par un humain."
        },
        {
            q: "Quel est le délai de livraison ?",
            a: "Un site vitrine : 3 à 5 jours. Un CRM ou logiciel métier : 1 à 2 semaines. Une application complète : 2 à 4 semaines. Ces délais commencent à la validation du cahier des charges. On vous tient informé à chaque étape."
        },
        {
            q: "Est-ce que le code m'appartient ?",
            a: "Oui, à 100%. Le code source complet vous est livré. Vous pouvez le modifier, le faire évoluer par un autre développeur, le revendre. Aucun verrou, aucune dépendance à FlashAI. C'est VOTRE code."
        },
        {
            q: "Et si le résultat ne me plaît pas ?",
            a: "Modifications illimitées jusqu'à satisfaction. On travaille par itérations : vous voyez l'avancement en temps réel et vous pouvez donner vos retours à tout moment. Vous ne payez le solde qu'une fois satisfait."
        },
        {
            q: "Il y a un abonnement ou des frais cachés ?",
            a: "Non. C'est un paiement unique. L'hébergement est inclus pour les sites vitrines (2 ans). Après, vous pouvez héberger vous-même (on vous montre comment) ou on continue pour 5€/mois. Aucun frais caché, tout est dans le devis."
        },
        {
            q: "Et si j'ai besoin de modifications après livraison ?",
            a: "30 jours de modifications gratuites après livraison. Au-delà, on propose un taux horaire très compétitif (50€/h) pour les évolutions. Mais comme le code est à vous, vous pouvez aussi faire appel à n'importe qui d'autre."
        },
        {
            q: "Vous utilisez des templates ?",
            a: "Non. Chaque projet est codé sur mesure, de zéro. L'IA nous aide à coder plus vite, mais le design, l'architecture et la logique sont pensés spécifiquement pour votre projet. C'est du sur mesure, pas du prêt-à-porter."
        },
        {
            q: "Vous êtes basés où ?",
            a: "On travaille 100% en remote. Nos clients sont en France, Belgique, Suisse, Luxembourg et Canada. Communication par email, WhatsApp ou visio — comme vous préférez. Le décalage horaire n'est jamais un problème."
        },
        {
            q: "Je ne suis pas technique, c'est grave ?",
            a: "Pas du tout, c'est même notre cible principale. On traduit votre besoin en solution technique. Vous décrivez ce que vous voulez en langage normal, on se charge du reste. Formation incluse à la livraison."
        }
    ];

    faqs.forEach((faq, i) => {
        const item = document.createElement('div');
        item.className = 'faq-item reveal';
        item.style.transitionDelay = `${i * 0.05}s`;
        item.innerHTML = `
            <div class="faq-question">
                <h4>${faq.q}</h4>
                <svg class="faq-chevron" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-inner">${faq.a}</div>
            </div>
        `;

        item.querySelector('.faq-question').addEventListener('click', () => {
            const wasOpen = item.classList.contains('open');
            container.querySelectorAll('.faq-item.open').forEach(other => other.classList.remove('open'));
            if (!wasOpen) item.classList.add('open');
        });

        container.appendChild(item);
    });

    // Re-observe for scroll reveal
    setTimeout(() => {
        document.querySelectorAll('.faq-item.reveal').forEach(el => {
            const obs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        obs.unobserve(entry.target);
                    }
                });
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
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                btn.innerHTML = '&#10003; Message envoyé !';
                btn.classList.remove('bg-primary-600');
                btn.classList.add('bg-green-600');
                form.reset();
                setTimeout(() => {
                    btn.innerHTML = original;
                    btn.classList.remove('bg-green-600');
                    btn.classList.add('bg-primary-600');
                    btn.disabled = false;
                }, 4000);
            } else {
                throw new Error('Erreur');
            }
        } catch {
            btn.innerHTML = 'Erreur — Réessayez';
            btn.classList.remove('bg-primary-600');
            btn.classList.add('bg-red-600');
            setTimeout(() => {
                btn.innerHTML = original;
                btn.classList.remove('bg-red-600');
                btn.classList.add('bg-primary-600');
                btn.disabled = false;
            }, 3000);
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
        'api': { label: 'Intégrations API', min: 300, max: 1000, days: '2-5 jours' },
        'app': { label: 'Application complète', min: 2000, max: 5000, days: '2-4 semaines' }
    };

    function update() {
        const need = needSelect.value;
        const p = pricing[need];
        if (!p) {
            resultEl.innerHTML = '<p class="text-surface-400 text-sm">Sélectionnez vos besoins ci-dessus</p>';
            return;
        }

        resultEl.innerHTML = `
            <div class="text-sm text-surface-400 mb-2">${p.label}</div>
            <div class="font-display text-3xl font-bold text-gradient mb-1">${p.min.toLocaleString('fr-FR')}&euro; &ndash; ${p.max.toLocaleString('fr-FR')}&euro;</div>
            <div class="text-sm text-surface-400 mb-3">D&eacute;lai : <span class="text-white font-semibold">${p.days}</span></div>
            <a href="#contact" class="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-500 text-white font-semibold px-6 py-3 rounded-xl transition-all btn-glow text-sm">
                Recevoir mon devis personnalis&eacute;
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

/* ========== CODE ANIMATION ========== */
function initCodeAnimation() {
    const codeLines = document.querySelectorAll('.code-line');
    if (!codeLines.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                codeLines.forEach((line, i) => {
                    setTimeout(() => line.classList.add('visible'), i * 150);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) observer.observe(codeWindow);
}

/* ========== CONSTELLATION HOVER ========== */
function initConstellationHover() {
    const nodes = document.querySelectorAll('.constellation-node');
    const lines = document.querySelectorAll('.constellation-lines line');

    nodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            const id = node.dataset.id;
            lines.forEach(line => {
                if (line.dataset.from === id || line.dataset.to === id) {
                    line.style.stroke = 'rgba(99, 102, 241, 0.5)';
                    line.style.strokeWidth = '2';
                }
            });
        });

        node.addEventListener('mouseleave', () => {
            lines.forEach(line => {
                line.style.stroke = 'rgba(99, 102, 241, 0.08)';
                line.style.strokeWidth = '1';
            });
        });
    });
}

/* ========== EASTER EGGS ========== */
function initEasterEggs() {
    // Konami code
    const konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', e => {
        if (e.keyCode === konami[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konami.length) {
                konamiIndex = 0;
                showEasterEgg();
            }
        } else {
            konamiIndex = 0;
        }
    });

    // "flashai" typed
    let typed = '';
    document.addEventListener('keypress', e => {
        typed += e.key.toLowerCase();
        if (typed.includes('flashai')) {
            typed = '';
            launchConfetti();
        }
        if (typed.length > 20) typed = typed.slice(-10);
    });
}

function showEasterEgg() {
    const div = document.createElement('div');
    div.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:rgba(2,6,23,0.95);border:1px solid rgba(99,102,241,0.5);border-radius:20px;padding:40px;z-index:10002;text-align:center;backdrop-filter:blur(20px);max-width:400px;animation:loader-fade 0.3s ease;';
    div.innerHTML = `
        <div style="font-size:2rem;margin-bottom:12px;">&#9889;</div>
        <h3 style="font-family:'Space Grotesk',sans-serif;font-size:1.2rem;font-weight:700;margin-bottom:8px;">Bravo !</h3>
        <p style="color:#94a3b8;font-size:0.9rem;margin-bottom:16px;">Vous avez trouvé le secret !<br><strong style="color:#818cf8;">-10% sur votre premier projet</strong></p>
        <p style="color:#64748b;font-size:0.8rem;margin-bottom:20px;">Code promo : <strong style="color:white;background:rgba(99,102,241,0.2);padding:4px 12px;border-radius:6px;">FLASH10</strong></p>
        <button onclick="this.parentElement.remove()" style="background:#6366f1;color:white;border:none;padding:10px 24px;border-radius:12px;cursor:pointer;font-weight:600;font-size:0.85rem;">Merci !</button>
    `;
    document.body.appendChild(div);

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10001;';
    overlay.onclick = () => { div.remove(); overlay.remove(); };
    document.body.appendChild(overlay);

    launchConfetti();
}

function launchConfetti() {
    const colors = ['#6366f1', '#38bdf8', '#c084fc', '#f97316', '#22c55e', '#ec4899'];
    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.background = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
        document.body.appendChild(piece);
        setTimeout(() => piece.remove(), 3000);
    }
}
