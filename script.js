/**
 * Lógica do portfólio David Dias Designer
 * GSAP + Lenis Smooth Scroll
 */

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// --- Inicialização do Lenis (Smooth Scroll GSAP) ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    lerp: 0.08
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: 0,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// --- Efeito "Sucking" (Word Roration) ---
const words = [
    "se destacar",
    "autenticidade",
    "vender mais",
    "ser lembrado",
    "impacto real",
    "design moderno",
    "relevância",
    "autoridade"
];

let currentIndex = 0;
const wordElement = document.getElementById("suck-word");

function rotateWord() {
    if (!wordElement) return;

    gsap.to(wordElement, {
        duration: 0.6,
        scale: 0,
        z: -500,
        opacity: 0,
        ease: "power4.in",
        onComplete: () => {
            currentIndex = (currentIndex + 1) % words.length;
            wordElement.textContent = words[currentIndex];

            gsap.fromTo(wordElement,
                { scale: 0, z: 0, opacity: 0 },
                {
                    duration: 0.8,
                    scale: 1,
                    z: 0,
                    opacity: 1,
                    ease: "back.out(1.7)",
                    delay: 0.1
                }
            );
        }
    });
}

if (wordElement) {
    setInterval(rotateWord, 4000);
    // Continuous subtle pulsing
    gsap.to(wordElement, {
        scale: 1.1,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
    });
}

// --- Menu Hamburguer (Mobile Only) ---
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const iconMenu = document.querySelector('.icon-menu');
const iconClose = document.querySelector('.icon-close');

let isMenuOpen = false;

if (menuToggle && menuOverlay) {
    gsap.set(menuOverlay, {
        display: 'none',
        opacity: 0,
        y: -10,
        scale: 0.95
    });

    menuToggle.addEventListener('click', () => {
        if (!isMenuOpen) {
            isMenuOpen = true;
            iconMenu.style.display = 'none';
            iconClose.style.display = 'block';

            gsap.set(menuOverlay, { display: 'flex' });
            gsap.to(menuOverlay, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "expo.out"
            });

            gsap.fromTo(".menu-link",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out", delay: 0.2 }
            );
        } else {
            isMenuOpen = false;
            iconMenu.style.display = 'block';
            iconClose.style.display = 'none';

            gsap.to(menuOverlay, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => gsap.set(menuOverlay, { display: 'none' })
            });
        }
    });
}

// --- Faixas (Infinite Scroll) ---
document.addEventListener("DOMContentLoaded", () => {
    const content = document.querySelector('.faixa-content');
    if (content) {
        content.innerHTML += content.innerHTML;
        content.classList.add('ticker-animate');
        content.style.animationDuration = '40s';

        gsap.to(content, {
            scrollTrigger: {
                trigger: ".faixas-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            },
            xPercent: 15,
            ease: "none"
        });
    }
});

// --- Case Studies Navigation ---
const categoryBtns = document.querySelectorAll('.category-btn');
const categoryContents = document.querySelectorAll('.category-content');

if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.dataset.category;
            if (btn.classList.contains('active')) return;

            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const currentContent = document.querySelector('.category-content.active');
            const nextContent = document.querySelector(`.category-content[data-category="${targetCategory}"]`);

            if (currentContent && nextContent) {
                const currentCards = currentContent.querySelectorAll('.projeto-card');
                const nextCards = nextContent.querySelectorAll('.projeto-card');

                const tl = gsap.timeline();
                tl.to(currentCards, {
                    scale: 0.9,
                    opacity: 0,
                    filter: "blur(8px)",
                    duration: 0.4,
                    ease: "power2.in",
                    stagger: 0.05
                });

                tl.add(() => {
                    currentContent.classList.remove('active');
                    nextContent.classList.add('active');
                });

                tl.fromTo(nextCards,
                    { scale: 0.9, opacity: 0, filter: "blur(8px)" },
                    {
                        scale: 1,
                        opacity: 1,
                        filter: "blur(0px)",
                        duration: 0.6,
                        ease: "back.out(1.2)",
                        stagger: 0.1
                    },
                    "-=0.2"
                );
            }
            
            // Subtle click punch animation
            gsap.to(btn, {
                scale: 0.95,
                duration: 0.1,
                ease: "power2.out",
                yoyo: true,
                repeat: 1
            });
        });
    });
}

// --- Hover Effects & Interactions ---
const whyMeCards = document.querySelectorAll('.why-me-card');
const pricingCards = document.querySelectorAll('.pricing-card');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const aboutImage = document.querySelector('.about-image img');
const buttons = document.querySelectorAll('.btn-animated');
const menuLinks = document.querySelectorAll('.menu-link, .footer-links a');

// Why Me Cards
whyMeCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -15, scale: 1.02, duration: 0.4, ease: "power2.out" });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

// Pricing Cards
pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -15,
            scale: card.classList.contains('featured') ? 1.07 : 1.03,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            duration: 0.4,
            ease: "power2.out"
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: card.classList.contains('featured') ? 1.05 : 1,
            boxShadow: "none",
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Testimonial Cards
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -10,
            scale: 1.02,
            borderColor: "rgba(111, 145, 255, 0.3)",
            duration: 0.3,
            ease: "power2.out"
        });
        const quote = card.querySelector('.testimonial-quote');
        if (quote) {
            gsap.to(quote, { scale: 1.2, opacity: 1, duration: 0.3, ease: "power2.out" });
        }
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            borderColor: "rgba(255, 255, 255, 0.06)",
            duration: 0.3,
            ease: "power2.out"
        });
        const quote = card.querySelector('.testimonial-quote');
        if (quote) {
            gsap.to(quote, { scale: 1, opacity: 0.5, duration: 0.3, ease: "power2.out" });
        }
    });
});

// Botões & Links
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to(btn, { scale: 1.05, boxShadow: "0 10px 30px rgba(111, 145, 255, 0.3)", duration: 0.3, ease: "power2.out" });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { scale: 1, boxShadow: "none", duration: 0.3, ease: "power2.out" });
    });
});

menuLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { color: "#6f91ff", x: 5, duration: 0.3, ease: "power2.out" });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { color: "", x: 0, duration: 0.3, ease: "power2.out" });
    });
});

// About Image
if (aboutImage) {
    aboutImage.parentElement.addEventListener('mouseenter', () => {
        gsap.to(aboutImage, { scale: 1.05, duration: 0.5, ease: "power2.out" });
    });
    aboutImage.parentElement.addEventListener('mouseleave', () => {
        gsap.to(aboutImage, { scale: 1, duration: 0.5, ease: "power2.out" });
    });
}

// --- Scroll Animations ---
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    gsap.to(scrollIndicator, {
        y: 10,
        duration: 1.5,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
    });
}

// Section Title Reveal
const titleElements = document.querySelectorAll('.section-title');
titleElements.forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
    });
});

// About Image Parallax
const aboutSection = document.querySelector('.about');
if (aboutSection && aboutImage) {
    gsap.to(aboutImage, {
        scrollTrigger: {
            trigger: '.about',
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        y: -30,
        ease: "none"
    });
}

// Background Transitions
const projetosSection = document.querySelector('.projetos');
if (projetosSection) {
    ScrollTrigger.create({
        trigger: projetosSection,
        start: "top center",
        onEnter: () => {
            gsap.to(projetosSection, { background: "linear-gradient(180deg, #0a0a1a 0%, #0d1b2a 50%, #1b3a5f 100%)", duration: 1 });
        },
        onLeaveBack: () => {
            gsap.to(projetosSection, { background: "#000", duration: 1 });
        }
    });
}

// Service Icons Draw Animation
const serviceIcons = document.querySelectorAll('.service-icon svg');
serviceIcons.forEach((icon, index) => {
    const paths = icon.querySelectorAll('path, rect, circle, line, polyline, polygon');
    paths.forEach(path => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
            scrollTrigger: { trigger: '.services', start: "top 80%" },
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power1.inOut",
            delay: index * 0.2
        });
    });
});

console.log('Animações premium configuradas com sucesso.');
