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
            menuOverlay.style.display = 'flex';
            siteOverlay.style.display = 'block';
            document.body.classList.add('menu-open');

            gsap.fromTo(menuOverlay,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'expo.out' }
            );

            gsap.fromTo('.menu-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.1 }
            );
        } else {
            closeMenu();
        }
    });
    
    if (siteOverlay) {
        siteOverlay.addEventListener('click', closeMenu);
    }
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
        onComplete: () => menuOverlay.style.display = 'none'
    });
    
    gsap.to(siteOverlay, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => siteOverlay.style.display = 'none'
    });
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
        { scale: 4, opacity: 0, filter: "blur(30px)", y: -100 },
        { scale: 1, opacity: 1, filter: "blur(0px)", y: 0, duration: 1.5, delay: 0.3 }
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
        rotateX: 15,
        scale: 0.9
    });

    gsap.to(projetosSection, {
        rotateX: 0,
        scale: 1,
        ease: "none",
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
    { trigger: '.projetos-grade', targets: '.projeto-cartao', stagger: 0.8, has3D: true },
    { trigger: '.grade-cards', targets: '.card-bloco', stagger: 0.2, has3D: false }
];

revealGroups.forEach(group => {
    if (document.querySelector(group.trigger)) {
        const fromProps = group.has3D 
            ? { opacity: 0, y: 50, rotateX: 15, z: -50 }
            : { opacity: 0, y: 30 };
            
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

// --- Bento Grid Hover Effect ---
const allProjectCards = document.querySelectorAll('.projeto-cartao');

gsap.set(allProjectCards, {
    opacity: 0,
    rotateX: 15,
    z: -50,
    y: 30
});

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

// --- Process Timeline Animation (Novo Layout) ---
const processoRows = document.querySelectorAll('.processo-row');

if (processoRows.length > 0) {
    processoRows.forEach((row, index) => {
        const circle = row.querySelector('.processo-circle');
        const item = row.querySelector('.processo-item');
        
        if (circle) {
            gsap.set(circle, { backgroundColor: '#e0e0e0', color: '#999', boxShadow: 'none' });
        }
        if (item) {
            gsap.set(item, { 
                opacity: 0.6,
                scale: 0.92,
                rotate: index % 2 === 0 ? -1.5 : 1.5
            });
        }
        
        ScrollTrigger.create({
            trigger: row,
            start: "top 75%",
            end: "top 35%",
            onEnter: () => {
                if (circle) {
                    gsap.to(circle, {
                        backgroundColor: 'var(--cyan)',
                        color: '#0a0a0a',
                        boxShadow: '0 0 25px var(--cyan)',
                        duration: 0.5
                    });
                }
                if (item) {
                    gsap.to(item, {
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                        duration: 0.5
                    });
                }
            },
            onLeaveBack: () => {
                if (circle) {
                    gsap.to(circle, {
                        backgroundColor: '#e0e0e0',
                        color: '#999',
                        boxShadow: 'none',
                        duration: 0.5
                    });
                }
                if (item) {
                    gsap.to(item, {
                        opacity: 0.6,
                        scale: 0.92,
                        rotate: index % 2 === 0 ? -1.5 : 1.5,
                        duration: 0.5
                    });
                }
            }
        });
    });
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

// --- Testimonials Navigation (Carousel with Blur Effect) ---
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const cards = document.querySelectorAll('.testimonial-card');

if (prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = Math.floor(cards.length / 2);
    const totalCards = cards.length;
    
    function updateCards() {
        const trilha = document.querySelector('.depoimentos-trilha');
        
        cards.forEach((card, i) => {
            const distance = Math.abs(i - currentIndex);
            card.style.position = 'relative';
            card.style.left = 'auto';
            
            if (i === currentIndex) {
                card.style.display = 'flex';
                gsap.to(card, {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    zIndex: 10,
                    duration: 0.4,
                    ease: "power3.out"
                });
            } else if (distance === 1) {
                card.style.display = 'flex';
                gsap.to(card, {
                    opacity: 0.4,
                    scale: 0.85,
                    filter: 'blur(3px)',
                    zIndex: 5,
                    duration: 0.4,
                    ease: "power3.out"
                });
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Initialize
    updateCards();
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCards();
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCards();
    });
}

console.log('Portfolio initialized');