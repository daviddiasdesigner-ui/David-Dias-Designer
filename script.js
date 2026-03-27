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
    const cards = document.querySelectorAll('.orbix-accordion');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card, 
            { 
                opacity: 0, 
                y: 80
            },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: index * 0.1
            }
        );
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
    const cards = document.querySelectorAll('.orbix-bento-card');
    
    cards.forEach((card, index) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 60,
                scale: 0.95
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
                ease: "power3.out",
                delay: index * 0.1
            }
        );
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

// Obsoleto - Accordion agora via CSS
function initServiceCardFlip() {
    return;
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

// --- Faixas (Infinite Scroll & Parallax) ---
function initFaixasAnimations() {
    const contents = document.querySelectorAll('.faixa-content');
    contents.forEach((content, index) => {
        if (content.classList.contains('orbix-initialized')) return;
        content.classList.add('orbix-initialized');
        
        // Loop perfeito
        content.innerHTML += content.innerHTML;
        
        // Isolar GSAP do CSS animation
        const gsapWrapper = document.createElement('div');
        gsapWrapper.style.display = 'flex';
        gsapWrapper.style.width = 'fit-content';
        
        content.parentNode.insertBefore(gsapWrapper, content);
        gsapWrapper.appendChild(content);

        const direction = index === 0 ? 200 : -200;

        gsap.to(gsapWrapper, {
            scrollTrigger: {
                trigger: ".faixas-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2
            },
            x: direction,
            ease: "none"
        });
    });
}

// --- Case Studies Navigation ---
function initCaseStudiesNav() {
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
    initBackgroundAnimations();
    initFaqAccordion();
    initFaixasAnimations();
    initCaseStudiesNav();
    
    console.log('Animações premium configuradas com sucesso.');
});

// Animações Orbix processadas via CSS .reveal

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
