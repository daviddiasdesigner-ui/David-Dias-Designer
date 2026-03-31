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
const iconMenu = document.querySelector('.icon-menu');
const iconClose = document.querySelector('.icon-close');
let isMenuOpen = false;

if (menuToggle && menuOverlay) {
    menuToggle.addEventListener('click', () => {
        if (!isMenuOpen) {
            isMenuOpen = true;
            iconMenu.style.display = 'none';
            iconClose.style.display = 'block';
            menuOverlay.style.display = 'flex';

            gsap.fromTo(menuOverlay,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'expo.out' }
            );

            gsap.fromTo('.menu-link',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power3.out', delay: 0.1 }
            );
        } else {
            isMenuOpen = false;
            iconMenu.style.display = 'block';
            iconClose.style.display = 'none';

            gsap.to(menuOverlay, {
                opacity: 0,
                y: -10,
                scale: 0.95,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => menuOverlay.style.display = 'none'
            });
        }
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
}, "-=0.5");

// --- Faixas Container Opacity Animation ---
const faixasContainer = document.querySelector('.faixas-container');
if (faixasContainer) {
    gsap.set(faixasContainer, { opacity: 0, zIndex: 10 });
    
    gsap.to(faixasContainer, {
        opacity: 1,
        zIndex: 10,
        duration: 0.5,
        scrollTrigger: {
            trigger: faixasContainer,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse"
        }
    });
}

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

// --- Services Scroll Animation (Scale Effect - Exit) ---
const servicosSection = document.querySelector('.servicos');
if (servicosSection) {
    gsap.set(servicosSection, {
        transformOrigin: "center center",
        perspective: 1500,
        scale: 1
    });

    gsap.to(servicosSection, {
        scale: 0.85,
        ease: "none",
        scrollTrigger: {
            trigger: servicosSection,
            start: "top 30%",
            end: "bottom top",
            scrub: 1
        }
    });
}

// --- 3D Section Reveal Logic ---
const sections = document.querySelectorAll('.revelar');
sections.forEach(section => {
    // Definimos o estado inicial das seções para a inclinação 3D
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
    { trigger: '.servicos-grade', targets: '.servico-cartao', stagger: 0.2 },
    { trigger: '.projetos-grade', targets: '.projeto-cartao', stagger: 0.8 },
    { trigger: '.grade-cards', targets: '.card-bloco', stagger: 0.2 }
];

revealGroups.forEach(group => {
    if (document.querySelector(group.trigger)) {
        ScrollTrigger.create({
            trigger: group.trigger,
            start: "top 85%",
            onEnter: () => {
                gsap.fromTo(group.targets, 
                    { opacity: 0, y: 50, rotateX: 15, z: -50 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        rotateX: 0, 
                        z: 0,
                        duration: 1.2, 
                        stagger: group.stagger, 
                        ease: "power3.out" 
                    }
                );
            },
            once: true
        });
    }
});

// O Bento Grid agora é gerenciado puramente via CSS para performance e precisão por categoria.

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

        if (btn === currentBtn || !nextContent) return;

        if (currentBtn) currentBtn.classList.remove('active');
        btn.classList.add('active');
        if (currentContent) currentContent.classList.remove('active');
        nextContent.classList.add('active');
    });
});

// --- FAQ Accordion ---
const faqItems = document.querySelectorAll('.pergunta-item');
faqItems.forEach(item => {
    const question = item.querySelector('.pergunta-pergunta');
    const answer = item.querySelector('.pergunta-resposta');
    const icon = item.querySelector('.pergunta-icone');

    gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('pergunta-aberta');

        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('pergunta-aberta');
                gsap.to(i.querySelector('.pergunta-resposta'), { height: 0, opacity: 0, duration: 0.3 });
                gsap.to(i.querySelector('.pergunta-icone'), { rotation: 0, duration: 0.3 });
            }
        });

        if (isOpen) {
            item.classList.remove('pergunta-aberta');
            gsap.to(answer, { height: 0, opacity: 0, duration: 0.3 });
            gsap.to(icon, { rotation: 0, duration: 0.3 });
        } else {
            item.classList.add('pergunta-aberta');
            gsap.to(answer, { height: 'auto', opacity: 1, duration: 0.3 });
            gsap.to(icon, { rotation: 180, duration: 0.3 });
        }
    });
});

// Open first FAQ by default
if (faqItems.length > 0) {
    faqItems[0].classList.add('pergunta-aberta');
    gsap.set(faqItems[0].querySelector('.pergunta-resposta'), { height: 'auto', opacity: 1 });
    gsap.set(faqItems[0].querySelector('.pergunta-icone'), { rotation: 180 });
}

// --- Process Timeline ---
const timeline = document.querySelector('.processo-linha-tempo');
const progressBar = document.querySelector('.timeline-progress-bar');
const items = document.querySelectorAll('.timeline-item');

if (timeline && progressBar && items.length > 0) {
    const lastItem = items[items.length - 1];
    
    gsap.to(progressBar, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: timeline,
            start: "top 60%",
            endTrigger: lastItem,
            end: "top 60%",
            scrub: 0.5
        }
    });

    // Timeline items scroll animation
    items.forEach((item, index) => {
        const rotation = index % 2 === 0 ? -3 : 3;
        
        gsap.set(item, {
            rotate: rotation,
            transformOrigin: "center bottom"
        });

        gsap.to(item, {
            rotate: 0,
            ease: "none",
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 40%",
                scrub: 1
            }
        });
    });
}

function alignTimelineLine() {
    const dots = document.querySelectorAll('.timeline-dot');
    const line = document.querySelector('.timeline-main-line');
    const container = document.querySelector('.processo-linha-tempo');
    
    if (dots.length > 1 && line && container) {
        const containerRect = container.getBoundingClientRect();
        const firstDotRect = dots[0].getBoundingClientRect();
        const lastDotRect = dots[dots.length - 1].getBoundingClientRect();
        
        const topOffset = (firstDotRect.top + firstDotRect.height / 2) - containerRect.top;
        const bottomOffset = containerRect.bottom - (lastDotRect.top + lastDotRect.height / 2);
        
        line.style.top = `${topOffset}px`;
        line.style.bottom = `${bottomOffset}px`;
        
        // Refresh necessary after layout shifts
        ScrollTrigger.refresh();
    }
}

// Inicializa e sincroniza no resize/load
window.addEventListener('load', () => {
    alignTimelineLine();
});
window.addEventListener('resize', alignTimelineLine);
setTimeout(alignTimelineLine, 800);

items.forEach(item => {
    const dot = item.querySelector('.timeline-dot');
    const title = item.querySelector('.step-title');
    
    ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        onEnter: () => {
            gsap.to(dot, { scale: 1.5, duration: 0.2, ease: "back.out(1.7)" });
            gsap.to(title, { color: "var(--cyan)", fontWeight: 700, duration: 0.3 });
        },
        onLeaveBack: () => {
            gsap.to(dot, { scale: 1, duration: 0.2 });
            gsap.to(title, { color: "", fontWeight: "", duration: 0.3 });
        }
    });
});

// --- Faixas Animation ---
const faixaContents = document.querySelectorAll('.faixa-content');
faixaContents.forEach(content => {
    if (content.classList.contains('js-ready')) return;
    content.classList.add('js-ready');

    const original = content.innerHTML;
    content.innerHTML = original + original + original + original;
});

// --- Number Count Animation ---
const numbers = document.querySelectorAll('.por-que-eu-numero');
numbers.forEach(num => {
    const text = num.textContent;
    const hasPlus = text.includes('+');
    const value = parseInt(text);

    ScrollTrigger.create({
        trigger: num,
        start: "top 90%",
        once: true,
        onEnter: () => {
            if (isNaN(value)) return;
            gsap.fromTo(num, { textContent: 0 }, {
                textContent: value,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function() {
                    num.textContent = Math.round(this.targets()[0].textContent) + (hasPlus ? '+' : '');
                }
            });
        }
    });
});

// --- About Parallax ---
const aboutImage = document.querySelector('.sobre-imagem');
if (aboutImage) {
    gsap.to(aboutImage, {
        y: -30,
        scrollTrigger: {
            trigger: '.sobre',
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

// --- Testimonials Navigation ---
// Removido o parallax horizontal automático que conflita com o scroll manual das setas
const prevBtn = document.getElementById('prev-testimonial');
const nextBtn = document.getElementById('next-testimonial');
const testimonialsTrack = document.querySelector('.depoimentos-trilha');

if (prevBtn && nextBtn && testimonialsTrack) {
    prevBtn.addEventListener('click', () => {
        const scrollAmount = window.innerWidth > 768 ? 400 : 300;
        testimonialsTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
        const scrollAmount = window.innerWidth > 768 ? 400 : 300;
        testimonialsTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
}

console.log('Portfolio initialized');
