/**
 * FlashAI — Main Script
 * Clean, performant, no bloat.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeader();
    initMobileMenu();
    initFAQ();
    initContactForm();
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
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
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
        menu.classList.toggle('hidden');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.add('hidden');
        }
    });
}

/* ========== FAQ ========== */
function initFAQ() {
    const container = document.getElementById('faq-container');
    if (!container) return;

    const faqData = [
        {
            q: "Combien de temps faut-il pour livrer un projet ?",
            a: "Un site vitrine est généralement livré en 3 à 5 jours. Un projet plus complexe (CRM, dashboard, intégrations API) prend entre 1 et 3 semaines selon le périmètre. On est transparents dès le départ sur le délai exact."
        },
        {
            q: "Comment pouvez-vous être aussi compétitifs sur les prix ?",
            a: "On a massivement automatisé notre propre workflow grâce à l'IA et aux outils modernes. Ce qui prenait 2 semaines à une agence classique, on le fait en quelques jours. On vous fait bénéficier de ces gains de productivité directement dans nos prix — sans sacrifier la qualité."
        },
        {
            q: "Est-ce que je suis propriétaire de ce que vous construisez ?",
            a: "Oui, à 100%. Le code, le design, le nom de domaine — tout vous appartient. Pas d'abonnement mensuel caché, pas de dépendance. Si un jour vous voulez changer de prestataire, vous repartez avec tout."
        },
        {
            q: "J'ai déjà un site / des outils. Vous pouvez améliorer l'existant ?",
            a: "Tout à fait. On peut reprendre un projet existant, l'améliorer, ajouter des fonctionnalités, ou connecter des APIs à vos outils actuels. Pas besoin de tout refaire de zéro."
        },
        {
            q: "Je n'y connais rien en technique, c'est un problème ?",
            a: "Pas du tout, c'est même la majorité de nos clients. On s'occupe de toute la partie technique. Vous nous décrivez ce que vous voulez en termes simples, on traduit ça en solution concrète. Et on vous forme à utiliser vos outils."
        },
        {
            q: "Quelles technologies utilisez-vous ?",
            a: "On travaille avec les technologies les plus modernes et performantes : React, Next.js, Node.js, Python, PostgreSQL, Supabase, et bien d'autres. On choisit toujours la stack la plus adaptée à votre projet spécifique."
        },
        {
            q: "Proposez-vous de la maintenance après livraison ?",
            a: "Oui. On propose un accompagnement post-livraison si vous le souhaitez : corrections, évolutions, ajouts de fonctionnalités. Tout est facturé à la prestation, sans engagement ni abonnement."
        },
        {
            q: "Comment se passe le paiement ?",
            a: "En général, 50% à la commande et 50% à la livraison. Pour les plus gros projets, on peut adapter l'échéancier. TVA non applicable (art. 293 B du CGI)."
        }
    ];

    container.innerHTML = faqData.map((item, i) => `
        <div class="faq-item" data-faq="${i}">
            <div class="faq-question" onclick="toggleFAQ(${i})">
                <h4>${item.q}</h4>
                <svg class="faq-chevron" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-inner">${item.a}</div>
            </div>
        </div>
    `).join('');
}

/* Global FAQ toggle */
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

        const formData = new FormData(form);

        // If form has an action attribute, send data
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
            });
        } else {
            // No action set — just show success
            showPopup();
            form.reset();
        }
    });
}

function showPopup() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.remove('hidden');
        popup.classList.add('flex');
    }
}

window.closePopup = function() {
    const popup = document.getElementById('successPopup');
    if (popup) {
        popup.classList.add('hidden');
        popup.classList.remove('flex');
    }
};
