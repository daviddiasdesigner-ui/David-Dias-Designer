/**
 * David Dias Designer Portfolio
 * GSAP + Lenis Smooth Scroll
 */

gsap.registerPlugin(ScrollTrigger, Flip);

// --- Preloader Animation (CSS-based only) ---
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    
    // Timeline da animação
    
    // Passo 1: O desenho do SVG termina (3s de animação no CSS)
    setTimeout(() => {
        
        // Passo 2: Aplica o Blend Mode suavemente
        preloader.classList.add('logo-blend');
        console.log("Blend aplicado");

        // Pequeno intervalo para o olho humano perceber o blend antes da explosão
        setTimeout(() => {
            
            // Passo 3: Inicia a expansão (Reveal)
            // Aqui o fundo do preloader fica transparente e o logo cresce
            preloader.classList.add('logo-reveal');
            console.log("Iniciando expansão");

            // Libera o scroll um pouco antes de terminar para melhorar o UX
            document.body.classList.remove('preloader-active');

            // Passo 4: Limpeza final (opcional)
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 7000); // Deve bater com a --transition-speed do CSS

        }, 1000); // Pausa dramática com o blend ativado

    }, 7000); // Tempo do desenho (3s) + pequena margem
});

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
        ease: "ease-in-out",
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
sections.forEach((section, index) => {
    gsap.set(section, {
        perspective: 2000,
        rotateX: -50,
        y: 100,
        opacity: 0,
        transformOrigin: "center top"
    });

    ScrollTrigger.create({
        trigger: section,
        start: "top 90%",
        onEnter: () => {
            const delay = Math.min(index * 0.15, 0.8);
            gsap.to(section, {
                rotateX: 0,
                y: 0,
                opacity: 1,
                duration: 2,
                delay: delay,
                ease: "power2.out"
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

// --- Process Scroll Animation (CSS-driven) ---
const processSteps = document.querySelectorAll('.processo-step');

processSteps.forEach((step) => {
    step.addEventListener('click', () => {
        processSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
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

// --- FAQ Accordion (CSS-driven) ---
const perguntaButtons = document.querySelectorAll('.pergunta-pergunta');

perguntaButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const resposta = item.querySelector('.pergunta-resposta');
        const isOpen = item.classList.contains('pergunta-aberta');
        
        if (!isOpen) {
            item.classList.add('pergunta-aberta');
            if (resposta) {
                resposta.style.height = resposta.scrollHeight + 'px';
            }
        } else {
            item.classList.remove('pergunta-aberta');
            if (resposta) {
                resposta.style.height = '0';
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

// --- Testimonials Navigation (1 card per view) ---
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const cards = document.querySelectorAll('.testimonial-card');

if (prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = 0;
    const totalCards = cards.length;
    
    function wrapIndex(i) {
        return ((i % totalCards) + totalCards) % totalCards;
    }
    
    function updateCards() {
        cards.forEach((card, i) => {
            if (i === currentIndex) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }
    
    // Initialize first card as active
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