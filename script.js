/**
 * David Dias Designer Portfolio
 * GSAP + Lenis Smooth Scroll
 */

gsap.registerPlugin(ScrollTrigger, Flip);

// --- Lenis Smooth Scroll ---
const lenis = new Lenis({
    duration: 1,
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));

// --- Menu Mobile ---
const menuToggle = document.getElementById('menu-toggle');
const menuOverlay = document.getElementById('menu-overlay');
const siteOverlay = document.getElementById('site-overlay');
const iconMenu = document.querySelector('.icon-menu');
const iconClose = document.querySelector('.icon-close');
let isMenuOpen = false;

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isMenuOpen) {
            isMenuOpen = true;
            iconMenu.style.display = 'none';
            iconClose.style.display = 'block';
            menuOverlay.classList.add('active');
            siteOverlay.classList.add('active');
            document.body.classList.add('menu-open');

            gsap.fromTo(menuOverlay,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'expo.out', overwrite: true }
            );

            gsap.fromTo('.menu-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.1, overwrite: true }
            );
            
            if (siteOverlay) {
                gsap.to(siteOverlay, { opacity: 1, duration: 0.3, overwrite: true });
            }
        } else {
            closeMenu();
        }
    });
    
    if (siteOverlay) {
        siteOverlay.addEventListener('click', closeMenu);
    }
    
    document.querySelectorAll('.menu-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
}

function closeMenu() {
    if (!isMenuOpen) return;
    isMenuOpen = false;
    iconMenu.style.display = 'block';
    iconClose.style.display = 'none';
    document.body.classList.remove('menu-open');

    gsap.to(menuOverlay, {
        opacity: 0,
        y: -10,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: true,
        onComplete: () => {
            if (!isMenuOpen) menuOverlay.classList.remove('active');
        }
    });
    
    if (siteOverlay) {
        gsap.to(siteOverlay, {
            opacity: 0,
            duration: 0.3,
            overwrite: true,
            onComplete: () => {
                if (!isMenuOpen) siteOverlay.classList.remove('active');
            }
        });
    }
}
// --- Parallax Video ---
const videoFundo = document.querySelector('.pagina-inicial-fundo');
if (videoFundo) {
    gsap.to(videoFundo, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.pagina-inicial',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
}

// --- Smooth Scroll Links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});

// --- Word Rotation ---
const words = ["se destacar", "autenticidade", "vender mais", "ser lembrado", "impacto real", "design moderno", "relevância", "autoridade"];
let currentIndex = 0;
const wordElement = document.getElementById("suck-word");

function rotateWord() {
    if (!wordElement) return;
    gsap.to(wordElement, {
        duration: 0.6,
        scale: 0,
        opacity: 0,
        ease: "power4.in",
        onComplete: () => {
            currentIndex = (currentIndex + 1) % words.length;
            wordElement.textContent = words[currentIndex];
            gsap.fromTo(wordElement, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" });
        }
    });
}

if (wordElement) {
    setInterval(rotateWord, 4000);
    gsap.to(wordElement, { scale: 1.1, duration: 2, ease: "sine.inOut", yoyo: true, repeat: -1 });
}

// --- Premium Entrance Header ---
const heroTl = gsap.timeline({ defaults: { ease: "expo.out" }});

if (document.querySelector('.anima-gigante')) {
    heroTl.fromTo('.anima-gigante', 
        { scale: 4, opacity: 0, filter: "blur(30px)", y: -100, rotateX: 15 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0, duration: 1.5, delay: 0.3 }
    );
}

if (document.querySelector('.anima-escrita')) {
    heroTl.to('.anima-escrita', 
        { opacity: 1, y: 0, duration: 1 }, "-=0.8"
    );
}

heroTl.to('.pagina-inicial-acao', {
    opacity: 1,
    y: 0,
    duration: 0.8
});

// --- Projetos 3D Scroll Animation ---
const projetosSection = document.querySelector('.projetos');
if (projetosSection) {
    gsap.set(projetosSection, {
        transformOrigin: "center center",
        perspective: 1500,
        scale: 0.9
    });

    gsap.to(projetosSection, {
        scale: 1,
        ease: "ease-in",
        scrollTrigger: {
            trigger: projetosSection,
            start: "top bottom",
            end: "top 30%",
            scrub: 1
        }
    });
}

// --- 3D Section Reveal Logic ---
const sections = document.querySelectorAll('.revelar');
sections.forEach(section => {
    gsap.set(section, {
        perspective: 1500,
        rotateX: -10,
        y: 80,
        opacity: 0,
        transformOrigin: "center top"
    });

    ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        onEnter: () => {
            gsap.to(section, {
                rotateX: 0,
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: "power3.out"
            });
        },
        once: true
    });
});

// --- Enhanced Element Reveals (Staggered) ---
const revealGroups = [
    { trigger: '.servicos-grade', targets: '.servico-cartao', stagger: 0.2, has3D: false },
    { trigger: '.grade-cards', targets: '.card-bloco', stagger: 0.2, has3D: false }
];

revealGroups.forEach(group => {
    if (document.querySelector(group.trigger)) {
        const fromProps = group.has3D 
            ? { opacity: 0, y: 50, rotateX: 15, z: -50 }
            : { opacity: 0, y: 0 };
            
        const toProps = group.has3D 
            ? { opacity: 1, y: 0, rotateX: 0, z: 0, duration: 1.2, ease: "power3.out" }
            : { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" };
            
        ScrollTrigger.create({
            trigger: group.trigger,
            start: "top 85%",
            onEnter: () => {
                gsap.fromTo(group.targets, fromProps, toProps);
            },
            once: true
        });
    }
});

// --- projects Hover Effect ---
const allProjectCards = document.querySelectorAll('.projeto-cartao');

allProjectCards.forEach(cartao => {
    cartao.addEventListener('mouseenter', () => {
        gsap.to(cartao, { rotateX: -5, z: 10, scale: 1.02, duration: 0.3, ease: "power2.out" });
    });
    cartao.addEventListener('mouseleave', () => {
        gsap.to(cartao, { rotateX: 0, z: 0, scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

// --- Mobile Ver Mais Glass Effect ---
const verMaisBtns = document.querySelectorAll('.ver-mais-btn');
verMaisBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const card = btn.closest('.projeto-cartao-mobile');
        card.classList.toggle('glass-active');
        
        const svg = btn.querySelector('svg');
        if (card.classList.contains('glass-active')) {
            gsap.to(svg, { rotation: 180, duration: 0.3 });
        } else {
            gsap.to(svg, { rotation: 0, duration: 0.3 });
        }
    });
});

// --- Scroll Indicator Animation ---
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    gsap.to(scrollIndicator, { y: 10, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
}

// --- Category Navigation ---
const categoryBtns = document.querySelectorAll('.botao-categoria');
const categoryContents = document.querySelectorAll('.conteudo-categoria');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetCategory = btn.dataset.category;
        const currentBtn = document.querySelector('.botao-categoria.active');
        const currentContent = document.querySelector('.conteudo-categoria.active');
        const nextContent = document.querySelector(`.conteudo-categoria[data-category="${targetCategory}"]`);

        if (currentBtn) currentBtn.classList.remove('active');
        if (currentContent) currentContent.classList.remove('active');

        btn.classList.add('active');
        if (nextContent) nextContent.classList.add('active');
    });
});

// --- Process Scroll Animation ---
const processoContainer = document.querySelector('.processo-container');
const progressLine = document.querySelector('.line-progress');
const processSteps = document.querySelectorAll('.processo-step');

// animação do container
if (processoContainer) {
    gsap.set(processoContainer, {
        y: 30
    });

    gsap.to(processoContainer, {
        y: 0,
        ease: "power3.out",
        scrollTrigger: {
            trigger: processoContainer,
            start: "top 80%",
            end: "top 40%",
            scrub: 1
        }
    });
}

// animação da linha (agora validando os DOIS)
if (progressLine && processoContainer && processSteps.length > 0) {
    const firstStep = processSteps[0];
    const lastStep = processSteps[processSteps.length - 1];
    const firstMarker = firstStep.querySelector('.processo-marker');
    const lastMarker = lastStep.querySelector('.processo-marker');
    
    if (firstMarker && lastMarker) {
        const firstRect = firstMarker.getBoundingClientRect();
        const lastRect = lastMarker.getBoundingClientRect();
        const containerRect = processoContainer.getBoundingClientRect();
        
        const lineHeight = endPercent - startPercent;
        
        gsap.set(progressLine, { 
            top: startPercent + '%',
            height: '0%'
        });

        gsap.to(progressLine, {
            height: lineHeight + '%',
            ease: "none",
            scrollTrigger: {
                trigger: processoContainer,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1
            }
        });
    }
}

// Ativar steps quando entrarem na viewport
processSteps.forEach((step) => {
    ScrollTrigger.create({
        trigger: step,
        start: "top 70%",
        onEnter: () => step.classList.add('active'),
        onLeaveBack: () => step.classList.remove('active')
    });
});


// --- projects Staggered Reveal (Orbix Style) ---
const projectsGrid = document.querySelector('.projetos-grade');
const projectCards = document.querySelectorAll('.projeto-cartao');

if (projectsGrid && projectCards.length > 0) {
    gsap.fromTo(projectCards, 
        { y: 60, opacity: 0, scale: 0.95 },
        {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            stagger: 0.2,
            ease: "power4.out",
            scrollTrigger: {
                trigger: projectsGrid,
                start: "top 80%",
                once: true
            }
        }
    );
}

// --- Mobile Projects Stack Animation ---
const mobileCards = document.querySelectorAll('.projeto-cartao-mobile');
if (mobileCards.length > 0) {
    mobileCards.forEach((card, index) => {
        gsap.set(card, { y: index * 20, opacity: 0.8 });
        
        ScrollTrigger.create({
            trigger: card,
            start: "top 90%",
            end: "top 10%",
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.to(card, {
                    y: index * 20 * (1 - progress),
                    opacity: 0.8 + (progress * 0.2),
                    ease: "none"
                });
            }
        });
    });
}

// --- FAQ Accordion ---
const perguntaButtons = document.querySelectorAll('.pergunta-pergunta');

perguntaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('pergunta-aberta');
        
        document.querySelectorAll('.pergunta-item').forEach(i => {
            i.classList.remove('pergunta-aberta');
            const resposta = i.querySelector('.pergunta-resposta');
            if (resposta) {
                gsap.to(resposta, { height: 0, duration: 0.3 });
            }
        });
        
        if (!isOpen) {
            item.classList.add('pergunta-aberta');
            const resposta = item.querySelector('.pergunta-resposta');
            if (resposta) {
                resposta.style.height = 'auto';
                const height = resposta.scrollHeight;
                resposta.style.height = '0';
                gsap.to(resposta, { height: height, duration: 0.4, ease: "power3.out" });
            }
        }
    });
});

// --- Scroll to top button ---
const scrollTopBtn = document.getElementById('scroll-top');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        lenis.scrollTo(0, { duration: 1 });
    });
}

// --- Testimonials Navigation (Infinite Carousel with Blur Effect) ---
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const cards = document.querySelectorAll('.testimonial-card');

if (prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Helper: get wrapped index (handles negative and overflow)
    function wrapIndex(i) {
        return ((i % totalCards) + totalCards) % totalCards;
    }
    
    function updateCards() {
        const prevIndex = wrapIndex(currentIndex - 1);
        const nextIndex = wrapIndex(currentIndex + 1);
        
        cards.forEach((card, i) => {
            if (i === currentIndex) {
                // Active card — centered, fully visible
                card.style.display = 'flex';
                card.style.order = '2';
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    zIndex: 10,
                    duration: 0.4,
                    ease: "power3.out"
                });
            } else if (i === prevIndex) {
                // Previous neighbor — left, blurred
                card.style.display = 'flex';
                card.style.order = '1';
                gsap.to(card, {
                    opacity: 0.4,
                    scale: 0.85,
                    filter: 'blur(3px)',
                    zIndex: 5,
                    duration: 0.4,
                    ease: "power3.out"
                });
            } else if (i === nextIndex) {
                // Next neighbor — right, blurred
                card.style.display = 'flex';
                card.style.order = '3';
                gsap.to(card, {
                    opacity: 0.4,
                    scale: 0.85,
                    filter: 'blur(3px)',
                    zIndex: 5,
                    duration: 0.4,
                    ease: "power3.out"
                });
            } else {
                // All other cards — hidden
                card.style.display = 'none';
                card.style.order = '99';
            }
        });
    }
    
    // Initialize
    updateCards();
    
    prevBtn.addEventListener('click', () => {
        currentIndex = wrapIndex(currentIndex - 1);
        updateCards();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = wrapIndex(currentIndex + 1);
        updateCards();
    });
}

// --- Final ScrollTrigger Sync ---
window.addEventListener('load', () => {
    ScrollTrigger.refresh();
});

console.log('Portfolio initialized');