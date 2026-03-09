/**
 * FlashAI — Main Script (Redesign)
 * Dynamic animations, carousels, counters, and interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeader();
    initMobileMenu();
    initFAQ();
    initContactForm();
    initCounters();
    initCarousel();
    initMarquee();
    initParticles();
    initTiltCards();
    initTypewriter();
    initSmoothAnchors();
    initPricingToggle();
});

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
        threshold: 0.08,
        rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
}

/* ========== HEADER SCROLL EFFECT ========== */
function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                header.classList.toggle('scrolled', window.scrollY > 20);
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
        const isOpen = !menu.classList.contains('hidden');
        if (isOpen) {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        } else {
            menu.classList.remove('hidden');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.add('hidden');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
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
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current.toLocaleString('fr-FR') + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

/* ========== PORTFOLIO CAROUSEL ========== */
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    if (!container) return;

    const track = container.querySelector('.carousel-track');
    const slides = container.querySelectorAll('.carousel-slide');
    const dotsContainer = container.querySelector('.carousel-dots');
    const prevBtn = container.querySelector('.carousel-prev');
    const nextBtn = container.querySelector('.carousel-next');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    let slidesPerView = getSlidesPerView();
    let maxIndex = Math.max(0, slides.length - slidesPerView);
    let autoPlayTimer;

    function getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    function updateCarousel() {
        const slideWidth = 100 / slidesPerView;
        track.style.transform = `translateX(-${currentIndex * slideWidth}%)`;
        updateDots();
    }

    function updateDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for (let i = 0; i <= maxIndex; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetAutoPlay();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function next() {
        currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function prev() {
        currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
        updateCarousel();
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(next, 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); resetAutoPlay(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); resetAutoPlay(); });

    // Touch/swipe support
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? next() : prev();
            resetAutoPlay();
        }
        isDragging = false;
    }, { passive: true });

    // Resize handler
    window.addEventListener('resize', () => {
        slidesPerView = getSlidesPerView();
        maxIndex = Math.max(0, slides.length - slidesPerView);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        updateCarousel();
    });

    updateCarousel();
    resetAutoPlay();
}

/* ========== MARQUEE (duplicate items for seamless loop) ========== */
function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(track => {
        const items = track.innerHTML;
        track.innerHTML = items + items;
    });
}

/* ========== PARTICLES ========== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (8 + Math.random() * 12) + 's';
        particle.style.animationDelay = (Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        particle.style.opacity = 0.1 + Math.random() * 0.3;
        container.appendChild(particle);
    }
}

/* ========== TILT CARD EFFECT ========== */
function initTiltCards() {
    if (window.matchMedia('(hover: none)').matches) return;

    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -4;
            const rotateY = (x - centerX) / centerX * 4;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

/* ========== TYPEWRITER EFFECT ========== */
function initTypewriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;

    const words = JSON.parse(el.dataset.words || '[]');
    if (!words.length) return;

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isPaused = false;

    function type() {
        const current = words[wordIndex];

        if (isPaused) {
            isPaused = false;
            isDeleting = true;
            setTimeout(type, 50);
            return;
        }

        if (isDeleting) {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                setTimeout(type, 300);
                return;
            }
            setTimeout(type, 30);
        } else {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isPaused = true;
                setTimeout(type, 2000);
                return;
            }
            setTimeout(type, 80);
        }
    }

    setTimeout(type, 1000);
}

/* ========== SMOOTH ANCHOR SCROLLING ========== */
function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

/* ========== PRICING TOGGLE ========== */
function initPricingToggle() {
    const toggle = document.getElementById('pricing-toggle');
    if (!toggle) return;

    toggle.addEventListener('change', () => {
        const isAnnual = toggle.checked;
        document.querySelectorAll('[data-price-monthly]').forEach(el => {
            const monthly = el.dataset.priceMonthly;
            const annual = el.dataset.priceAnnual;
            el.textContent = isAnnual ? annual : monthly;
        });
    });
}

/* ========== FAQ ========== */
function initFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    const faqData = [
        {
            q: "Combien de temps pour livrer un projet ?",
            a: "Un site vitrine est livré en <strong>3 à 5 jours</strong>. Un projet plus complexe (CRM, dashboard, intégrations API) prend entre <strong>1 et 3 semaines</strong> selon le périmètre. On est transparents dès le départ sur le délai exact."
        },
        {
            q: "Comment pouvez-vous être aussi compétitifs sur les prix ?",
            a: "On a <strong>massivement automatisé notre workflow</strong> grâce à l'IA et aux outils modernes. Ce qui prenait 2 semaines à une agence classique, on le fait en quelques jours. On vous fait bénéficier de ces gains de productivité directement dans nos prix — <strong>sans sacrifier la qualité</strong>."
        },
        {
            q: "Est-ce que je suis propriétaire de ce que vous construisez ?",
            a: "Oui, à <strong>100%</strong>. Le code, le design, le nom de domaine — tout vous appartient. Pas d'abonnement mensuel caché, pas de dépendance. Si un jour vous voulez changer de prestataire, vous repartez avec tout."
        },
        {
            q: "J'ai déjà un site / des outils. Vous pouvez améliorer l'existant ?",
            a: "Tout à fait. On peut reprendre un projet existant, l'améliorer, ajouter des fonctionnalités, ou connecter des APIs à vos outils actuels. <strong>Pas besoin de tout refaire de zéro.</strong>"
        },
        {
            q: "Je n'y connais rien en technique, c'est un problème ?",
            a: "Pas du tout, c'est même la majorité de nos clients. <strong>On s'occupe de toute la partie technique.</strong> Vous nous décrivez ce que vous voulez en termes simples, on traduit ça en solution concrète. Et on vous forme à utiliser vos outils."
        },
        {
            q: "Quelles technologies utilisez-vous ?",
            a: "On travaille avec les technologies les plus modernes : <strong>React, Next.js, Node.js, Python, PostgreSQL, Supabase</strong>, et bien d'autres. On choisit toujours la stack la plus adaptée à votre projet spécifique."
        },
        {
            q: "Proposez-vous de la maintenance après livraison ?",
            a: "Oui. On propose un accompagnement post-livraison : corrections, évolutions, ajouts de fonctionnalités. Tout est facturé à la prestation, <strong>sans engagement ni abonnement</strong>."
        },
        {
            q: "Comment se passe le paiement ?",
            a: "<strong>50% à la commande et 50% à la livraison.</strong> Pour les plus gros projets, on peut adapter l'échéancier. TVA non applicable (art. 293 B du CGI)."
        }
    ];

    container.innerHTML = faqData.map((item, i) => `
        <div class="faq-item reveal" data-faq="${i}">
            <div class="faq-question" onclick="toggleFAQ(${i})">
                <h4>${item.q}</h4>
                <svg class="faq-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-inner">${item.a}</div>
            </div>
        </div>
    `).join('');

    // Re-observe new FAQ items for scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -60px 0px' });

    container.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

window.toggleFAQ = function(index) {
    const items = document.querySelectorAll('.faq-item');
    items.forEach((item, i) => {
        if (i === index) {
            item.classList.toggle('open');
        } else {
            item.classList.remove('open');
        }
    });
};

/* ========== CONTACT FORM ========== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg class="animate-spin w-5 h-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Envoi...';
        btn.disabled = true;

        const formData = new FormData(form);

        if (form.action && form.action !== window.location.href) {
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            }).then(() => {
                showPopup();
                form.reset();
            }).catch(() => {
                showPopup();
                form.reset();
            }).finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            });
        } else {
            setTimeout(() => {
                showPopup();
                form.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 800);
        }
    });
}

function showPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('hidden');
        popup.classList.add('flex');
        popup.querySelector('.popup-content')?.classList.add('popup-animate');
    }
}

window.closePopup = function() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('hidden');
        popup.classList.remove('flex');
    }
};
