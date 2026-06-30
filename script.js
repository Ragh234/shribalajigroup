/* ═══════════════════════════════════════════════════════════
   SHRI BALAJI GROUP — SCROLL ANIMATIONS
   IntersectionObserver-based reveal system
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    /* ── Assign reveal classes ── */
    const revealTargets = [
        '.section__header',
        '.about__grid',
        '.services__addon',
        '.trust-section__container',
        '.presence__grid',
        '.contact__headline',
        '.contact__actions',
        '.contact__details',
        '.img-frame',
    ];

    const staggerTargets = [
        '.about__stats',
        '.services__grid',
        '.why__grid',
        '.achievements__grid',
        '.values__grid',
        '.leadership__grid',
    ];

    revealTargets.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal'));
    });

    staggerTargets.forEach(sel => {
        document.querySelectorAll(sel).forEach(el => el.classList.add('reveal-stagger'));
    });

    /* ── IntersectionObserver ── */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.08,
    });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });

    /* ── Hero parallax (desktop only) ── */
    const heroContent = document.querySelector('.hero__content');
    if (heroContent && window.matchMedia('(min-width: 769px)').matches) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    if (scrollY < window.innerHeight) {
                        heroContent.style.transform = `translateY(${scrollY * 0.12}px)`;
                        heroContent.style.opacity = Math.max(0, 1 - scrollY / (window.innerHeight * 0.85));
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }
});
