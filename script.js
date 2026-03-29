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
    const cards = document.querySelectorAll('.bento-card');

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

// --- Animação de números (Dispara uma vez) ---
function initNumberCount() {
    const numbers = document.querySelectorAll('.why-me-number');

    numbers.forEach(num => {
        const text = num.textContent;
        const hasPlus = text.includes('+');
        const value = parseInt(text);

        gsap.fromTo(num, 
            { textContent: 0 }, 
            {
                textContent: value,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: num,
                    start: "top 90%",
                    once: true 
                },
                onUpdate: function () {
                    num.textContent = Math.round(this.targets()[0].textContent) + (hasPlus ? '+' : '');
                }
            }
        );
    });
}

// --- Testimonials Interativos (Drag + Scroll) ---
function initTestimonialsScroll() {
    const track = document.querySelector('.testimonials-track');
    const wrapper = document.querySelector('.testimonials-wrapper');
    if (!track || !wrapper) return;

    // Registra o Draggable para permitir arrastar horizontalmente
    if (typeof Draggable !== "undefined") {
        Draggable.create(track, {
            type: "x",
            edgeResistance: 0.65,
            dragResistance: 0.2,
            bounds: wrapper,
            inertia: true
        });
    }

    // Movimento sutil no scroll para dar dinamismo
    gsap.to(track, {
        scrollTrigger: {
            trigger: '.testimonials',
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5
        },
        x: -150,
        ease: "none"
    });
}

// --- Efeito Stacking para Serviços no Mobile ---
function initServicesAnimations() {
    const cards = document.querySelectorAll('.service-card');
    if (window.innerWidth <= 768) {
        cards.forEach((card, index) => {
            if (index === cards.length - 1) return;
            gsap.to(card, {
                scale: 0.85,
                opacity: 0.5,
                filter: "blur(4px)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 120px",
                    end: "bottom 120px",
                    scrub: true
                }
            });
        });
    }
}



// --- Animações de fundo dinâmico (apenas nas seções específicas) ---
function initBackgroundAnimations() {
    const projetos = document.querySelector('.projetos');
    if (projetos) {
        // Removemos a transição CSS para não conflitar com o GSAP
        projetos.style.transition = 'none';

        ScrollTrigger.create({
            trigger: projetos,
            start: "top 60%", // Começa a transição um pouco antes do centro
            onEnter: () => {
                gsap.to(projetos, {
                    background: "linear-gradient(180deg, #2121e0 0%, #1a75ff 50%, #7fb3ff 100%)",
                    duration: 0.5,
                    ease: "power2.inOut",
                    overwrite: "auto"
                });
            },
            onLeaveBack: () => {
                gsap.to(projetos, {
                    background: "#000000",
                    overwrite: false,
                    onComplete: () => {
                        projetos.style.background = "#000000";
                    }
                });
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
                services.style.background = "#2b2bd6ff";
            },
            onLeaveBack: () => {
                services.style.background = "#000";
            }
        });
    }
}

// --- Smooth scroll para links internos ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
                    duration: 1,
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
        if (content.classList.contains('js-ready')) return;
        content.classList.add('js-ready');

        // Duplica para loop perfeito
        const originalContent = content.innerHTML;
        content.innerHTML = originalContent + originalContent + originalContent + originalContent;

        // Configuramos o movimento de "marquee" automático (Loop Infinito)
        const totalW = content.scrollWidth / 2;
        const isLeft = content.classList.contains('ticker-left');
        const duration = 20; // 20 segundos por loop

        if (isLeft) {
            // Marquee p/ Esquerda
            gsap.to(content, {
                x: -totalW,
                repeat: -1,
                duration: duration,
                ease: "none"
            });
        } else {
            // Marquee p/ Direita
            gsap.fromTo(content,
                { x: -totalW },
                {
                    x: 0,
                    repeat: -1,
                    duration: duration,
                    ease: "none"
                }
            );
        }

        // Adiciona um wrapper para o Parallax de Scroll (Scroll-based)
        const parallaxWrapper = document.createElement('div');
        parallaxWrapper.style.display = 'flex';
        parallaxWrapper.style.width = 'fit-content';
        content.parentNode.insertBefore(parallaxWrapper, content);
        parallaxWrapper.appendChild(content);

        const direction = isLeft ? -150 : 150;

        gsap.to(parallaxWrapper, {
            x: direction,
            scrollTrigger: {
                trigger: ".faixas-container",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            },
            ease: "none"
        });
    });
}

// --- Navegação de Categorias e Animação de Projetos ---
function initCaseStudiesNav() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const categoryContents = document.querySelectorAll('.category-content');
    
    if (categoryBtns.length === 0) return;

    // 1. Animação de Entrada Inicial (ao chegar na seção)
    categoryContents.forEach(content => {
        if (content.classList.contains('active')) {
            const cards = content.querySelectorAll('.projeto-card');
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: content,
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 1,
                stagger: 0.1,
                ease: "power3.out"
            });
        }
    });

    // 2. Lógica de Troca de Categoria
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetCategory = btn.dataset.category;
            const currentBtn = document.querySelector('.category-btn.active');
            
            // Se clicar no mesmo, não faz nada
            if (btn === currentBtn) return;

            // Atualiza botões
            currentBtn.classList.remove('active');
            btn.classList.add('active');

            const currentContent = document.querySelector('.category-content.active');
            const nextContent = document.querySelector(`.category-content[data-category="${targetCategory}"]`);

            if (currentContent && nextContent) {
                const currentCards = currentContent.querySelectorAll('.projeto-card');
                const nextCards = nextContent.querySelectorAll('.projeto-card');

                const tl = gsap.timeline();

                // Sai o atual
                tl.to(currentCards, {
                    y: -20,
                    opacity: 0,
                    filter: "blur(5px)",
                    duration: 0.4,
                    stagger: 0.05,
                    ease: "power2.in"
                });

                tl.add(() => {
                    currentContent.classList.remove('active');
                    nextContent.classList.add('active');
                    // Reset do scroll se necessário ou garantia de visibilidade
                    gsap.set(nextCards, { y: 30, opacity: 0, filter: "blur(10px)" });
                });

                // Entra o novo
                tl.to(nextCards, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.8,
                    stagger: 0.1,
                    ease: "power3.out"
                });
            }

            // Feedback tátil no botão
            gsap.fromTo(btn, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
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
    initProcessTimeline();
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

// Animações processadas via CSS .reveal

// --- FAQ Accordion ---
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');

        // Garantir estado inicial (Usamos GSAP para forçar os valores corretos)
        // Usamos 'faq-open' para não conflitar com a classe 'active' do reveal
        if (!item.classList.contains('faq-open')) {
            gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });
            gsap.set(icon, { rotate: 0 }); // Baixo
        } else {
            gsap.set(answer, { height: 'auto', opacity: 1 });
            gsap.set(icon, { rotate: 180 }); // Cima
        }

        question.addEventListener('click', () => {
            const isOpen = item.classList.contains('faq-open');

            // 1. Fechar todos os outros de forma suave (apenas o colapso)
            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove('faq-open');
                    gsap.to(i.querySelector('.faq-answer'), {
                        height: 0,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                    gsap.to(i.querySelector('.faq-icon'), {
                        rotate: 0,
                        duration: 0.4,
                        ease: "power2.inOut"
                    });
                }
            });

            // 2. Alternar o item clicado
            if (isOpen) {
                // Se já estava aberto, fecha
                item.classList.remove('faq-open');
                gsap.to(answer, {
                    height: 0,
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
                gsap.to(icon, {
                    rotate: 0,
                    duration: 0.4,
                    ease: "power2.inOut"
                });
            } else {
                // Se estava fechado, abre
                item.classList.add('faq-open');
                gsap.to(answer, {
                    height: 'auto',
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out"
                });
                gsap.to(icon, {
                    rotate: 180,
                    duration: 0.4,
                    ease: "power2.out"
                });
                
                // Animação de entrada do parágrafo
                const p = item.querySelector('.faq-answer p');
                if (p) {
                    gsap.fromTo(p,
                        { opacity: 0, y: -10 },
                        { opacity: 1, y: 0, duration: 0.4, delay: 0.2, ease: "power2.out" }
                    );
                }
            }
        });
    });

    // Abrir o primeiro por padrão
    if (faqItems.length > 0) {
        const first = faqItems[0];
        if (!first.classList.contains('faq-open')) {
             first.classList.add('faq-open');
             gsap.set(first.querySelector('.faq-answer'), { height: 'auto', opacity: 1 });
             gsap.set(first.querySelector('.faq-icon'), { rotate: 180 });
             const p = first.querySelector('.faq-answer p');
             if (p) gsap.set(p, { opacity: 1, y: 0 });
        }
    }
}

// --- Process Timeline Animation (LINHA CONTÍNUA PREMIUN) ---
function initProcessTimeline() {
    const timeline = document.querySelector('.process-timeline');
    const progressBar = document.querySelector('.timeline-progress-bar');
    const dots = document.querySelectorAll('.timeline-dot');
    const items = document.querySelectorAll('.timeline-item');

    if (!timeline || !progressBar) return;

    // 1. Animação da Barra de Progresso (Cresce contínuo conforme o scroll na timeline)
    gsap.to(progressBar, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: timeline,
            start: "top 40%",
            end: "bottom 60%",
            scrub: 1
        }
    });

    // 2. Animação Individual dos Pontos (Efeito de pulo e cor)
    items.forEach((item, index) => {
        const dot = item.querySelector('.timeline-dot');
        const title = item.querySelector('.step-title');
        const isFinal = dot.classList.contains('timeline-dot-final');

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: item,
                start: "top 40%", 
                end: "top 40%", // Dispara exatamente no ponto
                toggleActions: "play none none reverse"
            }
        });

        tl.to(dot, {
            backgroundColor: isFinal ? "#4ade80" : "#6f91ff",
            boxShadow: isFinal ? "0 0 20px #4ade80" : "0 0 15px #6f91ff",
            scale: 1.4,
            duration: 0.2,
            ease: "back.out(1.7)"
        })
        .to(dot, {
            scale: 1,
            duration: 0.1
        })
        .to(title, {
            color: isFinal ? "#4ade80" : "#6f91ff",
            fontWeight: "700",
            duration: 0.3
        }, "-=0.2");
    });
}

// Atualizar animações quando o scroll muda
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});
