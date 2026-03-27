/**
 * Lógica do portfólio David Dias Designer
 * GSAP + Lenis Smooth Scroll + Animações Avançadas
 */

gsap.registerPlugin(ScrollTrigger);

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

// --- Animação de Reveal (Entrada das seções) ---
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: "top 85%",
            onEnter: () => element.classList.add('active'),
            once: true // Prevents stuttering by only revealing once
        });
    });
}

// --- Scroll Sincronizado para Services ---
function initServicesAnimations() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 80,
                rotateX: -15
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    end: "top 50%",
                    scrub: 1
                },
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 0.8,
                ease: "power3.out"
            }
        );
    });
    
    // Parallax nos ícones de serviço
    const icons = document.querySelectorAll('.service-icon');
    icons.forEach((icon, index) => {
        gsap.to(icon, {
            scrollTrigger: {
                trigger: '.services',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -30,
            rotation: index % 2 === 0 ? 5 : -5,
            ease: "none"
        });
    });
}

// --- Scroll Horizontal para Testimonials ---
function initTestimonialsScroll() {
    const track = document.querySelector('.testimonials-track');
    if (!track) return;
    
    // Evita duplicar múltiplas vezes se a função for chamada novamente
    if (track.classList.contains('duplicated')) return;
    track.classList.add('duplicated');
    
    // Duplicar os cards 1 vez para loop perfeito de -50% (total 2 sets)
    const cards = track.innerHTML;
    track.innerHTML = cards + cards;
    
    // Animação de scroll horizontal sincronizada ao scroll
    gsap.to(track, {
        scrollTrigger: {
            trigger: '.testimonials',
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        },
        xPercent: -50,
        ease: "none"
    });
}

// --- Animação Parallax no About ---
function initAboutAnimations() {
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.about-image');
    const aboutContent = document.querySelector('.about-content');
    
    if (aboutImage) {
        gsap.to(aboutImage, {
            scrollTrigger: {
                trigger: '.about',
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            y: -50,
            scale: 1.05,
            ease: "none"
        });
    }
    
    if (aboutContent) {
        gsap.to(aboutContent, {
            scrollTrigger: {
                trigger: '.about',
                start: "top 80%",
                end: "top 30%",
                scrub: 1
            },
            y: -30,
            opacity: 1,
            ease: "none"
        });
    }
}

// --- Animação nos Cards do Why Me ---
function initWhyMeAnimations() {
    const cards = document.querySelectorAll('.why-me-card');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 60,
                scale: 0.9
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.2)",
                delay: index * 0.15
            }
        );
        
        // Hover effect melhorado
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -15,
                scale: 1.03,
                boxShadow: "0 25px 50px rgba(111, 145, 255, 0.15)",
                borderColor: "rgba(111, 145, 255, 0.3)",
                duration: 0.4,
                ease: "power2.out"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: "none",
                borderColor: "rgba(255, 255, 255, 0.06)",
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// --- Animação de números no Why Me ---
function initNumberCount() {
    const numbers = document.querySelectorAll('.why-me-number');
    
    numbers.forEach(num => {
        const text = num.textContent;
        const hasPlus = text.includes('+');
        const value = parseInt(text);
        
        ScrollTrigger.create({
            trigger: num,
            start: "top 85%",
            onEnter: () => {
                gsap.fromTo(num,
                    { textContent: 0 },
                    {
                        textContent: value,
                        duration: 2,
                        ease: "power2.out",
                        snap: { textContent: 1 },
                        onUpdate: function() {
                            num.textContent = Math.round(this.targets()[0].textContent) + (hasPlus ? '+' : '');
                        }
                    }
                );
            }
        });
    });
}

// --- Service Cards 3D Flip Melhorado ---
function initServiceCardFlip() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.card-inner'), {
                rotateY: 180,
                duration: 0.8,
                ease: "power2.inOut"
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.card-inner'), {
                rotateY: 0,
                duration: 0.8,
                ease: "power2.inOut"
            });
        });
    });
}

// --- Animações de fundo dinâmico (apenas nas seções específicas) ---
function initBackgroundAnimations() {
    const projetos = document.querySelector('.projetos');
    if (projetos) {
        projetos.style.transition = 'background 1.5s ease';
        ScrollTrigger.create({
            trigger: projetos,
            start: "top center",
            onEnter: () => {
                projetos.style.background = "linear-gradient(180deg, #0a0a1a 0%, #0d1b2a 50%, #1b3a5f 100%)";
            },
            onLeaveBack: () => {
                projetos.style.background = "#000";
            }
        });
    }
    
    const services = document.querySelector('.services');
    if (services) {
        services.style.transition = 'background 1s ease';
        ScrollTrigger.create({
            trigger: services,
            start: "top 80%",
            onEnter: () => {
                services.style.background = "#0a0a12";
            },
            onLeaveBack: () => {
                services.style.background = "#000";
            }
        });
    }
}

// --- Smooth scroll para links internos ---
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

// --- Efeito "Sucking" (Word Rotation) ---
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
        // Prevent duplicate initializations
        if (content.classList.contains('ticker-animate')) return;
        
        content.innerHTML += content.innerHTML;
        content.classList.add('ticker-animate');
        content.style.animationDuration = '40s';

        // Isolate GSAP transform from CSS animation transform by wrapping it
        const gsapWrapper = document.createElement('div');
        gsapWrapper.style.display = 'flex';
        gsapWrapper.style.width = 'fit-content';
        
        content.parentNode.insertBefore(gsapWrapper, content);
        gsapWrapper.appendChild(content);

        // Apply GSAP parallax to the wrapper, while CSS handles constant loop on .faixa-content
        gsap.to(gsapWrapper, {
            scrollTrigger: {
                trigger: ".faixas-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            },
            x: 200, // Usa pixel invés de percent para isolar
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

// --- Scroll Indicator Animation ---
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

// --- Inicializar todas as animações ---
document.addEventListener('DOMContentLoaded', () => {
    initRevealAnimations();
    initServicesAnimations();
    initTestimonialsScroll();
    initAboutAnimations();
    initWhyMeAnimations();
    initNumberCount();
    initServiceCardFlip();
    initBackgroundAnimations();
    initProcessAnimations();
    initFaqAccordion();
    
    console.log('Animações premium configuradas com sucesso.');
});

// --- Animação do Process Timeline ---
function initProcessAnimations() {
    const steps = document.querySelectorAll('.process-step');
    
    steps.forEach((step, index) => {
        gsap.fromTo(step,
            { 
                opacity: 0, 
                y: 60,
                scale: 0.95
            },
            {
                scrollTrigger: {
                    trigger: step,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.1
            }
        );
        
        step.addEventListener('mouseenter', () => {
            gsap.to(step.querySelector('.step-number'), {
                scale: 1.2,
                opacity: 0.4,
                duration: 0.3
            });
        });
        
        step.addEventListener('mouseleave', () => {
            gsap.to(step.querySelector('.step-number'), {
                scale: 1,
                opacity: 0.15,
                duration: 0.3
            });
        });
    });
}

// --- FAQ Accordion ---
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => {
                i.classList.remove('active');
            });
            
            if (!isActive) {
                item.classList.add('active');
            }
            
            gsap.fromTo(item.querySelector('.faq-answer p'),
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        });
    });
}

// Atualizar animações quando o scroll muda
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
