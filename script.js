/**
 * FLASHSITE AGENCY - CORE ENGINE 2026
 * Optimisé pour : LCP (Vitesse), UX Mobile & SEO Performance
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initMobileMenu();
    initParticleBackground();
    initPromoLogic();
    initFormHandler();
});

/**
 * Gestion des animations au défilement (Scroll Reveal)
 * Utilise l'API IntersectionObserver pour une performance maximale.
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // On arrête d'observer une fois l'élément révélé pour libérer de la mémoire
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/**
 * Menu Mobile Interactif
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('button[onclick*="mobile-menu"]');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!menuBtn || !mobileMenu) return;

    // Fermer le menu après un clic sur un lien
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Fermer si on clique en dehors
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) {
            mobileMenu.classList.add('hidden');
        }
    });
}

/**
 * Logique Promotionnelle Février 2026
 * Affiche dynamiquement le temps restant pour créer un sentiment d'urgence (Scarcity).
 */
function initPromoLogic() {
    const now = new Date();
    const targetMonth = 1; // Février (0-indexed)
    const targetYear = 2026;

    // Si nous sommes en février 2026, on peut ajouter une mention "Derniers jours"
    if (now.getMonth() === targetMonth && now.getFullYear() === targetYear) {
        const daysInMonth = new Date(2026, 2, 0).getDate();
        const daysLeft = daysInMonth - now.getDate();
        
        const promoBadges = document.querySelectorAll('.promo-badge');
        promoBadges.forEach(badge => {
            if (daysLeft <= 7 && daysLeft > 0) {
                badge.innerHTML = `🔥 Plus que ${daysLeft} jours !`;
            }
        });
    }
}

/**
 * Arrière-plan de Particules (Canvas)
 * Optimisé : réduction du nombre de particules sur mobile pour économiser le CPU.
 */
function initParticleBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 100; // Moins de charge sur mobile
    const connectionDistance = isMobile ? 100 : 150;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(249, 0, 191, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            const p1 = particles[i];
            p1.update();
            p1.draw();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    ctx.strokeStyle = `rgba(249, 0, 191, ${1 - dist / connectionDistance})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(animate);
    }

    animate();
}

/**
 * Fonctions Utilitaires Globales
 */
window.scrollToContact = function() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
};

window.toggleAccordion = function(element) {
    const item = element.parentElement;
    item.classList.toggle('active');
};

/**
 * Gestion du formulaire de contact - FormSubmit SANS redirection
 * Envoie les données et affiche juste le popup
 */
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // CRUCIAL - empêche redirection

        // Récupère les données du formulaire
        const formData = new FormData(contactForm);

        // Envoie vers FormSubmit (envoie l'email, pas de redirection)
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(() => {
            // Email envoyé = affiche popup + reset
            showSuccessPopup();
            contactForm.reset();
        })
        .catch(() => {
            // Erreur = affiche popup quand même
            showSuccessPopup();
            contactForm.reset();
        });
    });
}

/**
 * Affiche le popup de succès
 */
function showSuccessPopup() {
    const successPopup = document.getElementById('successPopup');
    if (successPopup) {
        successPopup.classList.add('show');
        setTimeout(() => {
            successPopup.classList.remove('show');
        }, 3000);
    }
}