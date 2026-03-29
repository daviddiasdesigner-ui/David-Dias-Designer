/**
 * David Dias Designer Portfolio
 * GSAP + Lenis Smooth Scroll
 */

gsap.registerPlugin(ScrollTrigger);

console.log('Script started');

// --- Lenis Smooth Scroll ---
const lenis = new Lenis({
    duration: 1,
    smoothWheel: true
});

console.log('Lenis initialized:', lenis);

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
console.log('RAF started');

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));

// Test scroll
window.addEventListener('wheel', () => console.log('wheel event'));
window.addEventListener('scroll', () => console.log('scroll event'));
document.addEventListener('DOMContentLoaded', () => console.log('DOM loaded'));

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

// --- Reveal Animations ---
const reveals = document.querySelectorAll('.reveal');
reveals.forEach(element => {
    ScrollTrigger.create({
        trigger: element,
        start: "top 85%",
        onEnter: () => element.classList.add('active'),
        once: true
    });
});

// --- Scroll Indicator Animation ---
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    gsap.to(scrollIndicator, { y: 10, duration: 1.5, ease: "sine.inOut", yoyo: true, repeat: -1 });
}

// --- Category Navigation ---
const categoryBtns = document.querySelectorAll('.category-btn');
const categoryContents = document.querySelectorAll('.category-content');

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetCategory = btn.dataset.category;
        const currentBtn = document.querySelector('.category-btn.active');
        const currentContent = document.querySelector('.category-content.active');
        const nextContent = document.querySelector(`.category-content[data-category="${targetCategory}"]`);

        if (btn === currentBtn || !nextContent) return;

        currentBtn.classList.remove('active');
        btn.classList.add('active');
        currentContent.classList.remove('active');
        nextContent.classList.add('active');
    });
});

// --- FAQ Accordion ---
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.faq-icon');

    gsap.set(answer, { height: 0, opacity: 0, overflow: 'hidden' });

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('faq-open');

        faqItems.forEach(i => {
            if (i !== item) {
                i.classList.remove('faq-open');
                gsap.to(i.querySelector('.faq-answer'), { height: 0, opacity: 0, duration: 0.3 });
                gsap.to(i.querySelector('.faq-icon'), { rotation: 0, duration: 0.3 });
            }
        });

        if (isOpen) {
            item.classList.remove('faq-open');
            gsap.to(answer, { height: 0, opacity: 0, duration: 0.3 });
            gsap.to(icon, { rotation: 0, duration: 0.3 });
        } else {
            item.classList.add('faq-open');
            gsap.to(answer, { height: 'auto', opacity: 1, duration: 0.3 });
            gsap.to(icon, { rotation: 180, duration: 0.3 });
        }
    });
});

// Open first FAQ by default
if (faqItems.length > 0) {
    faqItems[0].classList.add('faq-open');
    gsap.set(faqItems[0].querySelector('.faq-answer'), { height: 'auto', opacity: 1 });
    gsap.set(faqItems[0].querySelector('.faq-icon'), { rotation: 180 });
}

// --- Process Timeline ---
const timeline = document.querySelector('.process-timeline');
const progressBar = document.querySelector('.timeline-progress-bar');
const items = document.querySelectorAll('.timeline-item');

if (timeline && progressBar) {
    gsap.to(progressBar, {
        height: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: timeline,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 1
        }
    });
}

items.forEach(item => {
    const dot = item.querySelector('.timeline-dot');
    const title = item.querySelector('.step-title');
    
    ScrollTrigger.create({
        trigger: item,
        start: "top 60%",
        onEnter: () => {
            gsap.to(dot, { scale: 1.5, duration: 0.2, ease: "back.out(1.7)" });
            gsap.to(title, { color: "#6f91ff", fontWeight: 700, duration: 0.3 });
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
    content.innerHTML = original + original;
    
    const isLeft = content.classList.contains('ticker-left');
    const xMove = isLeft ? -50 : -50;

    gsap.to(content, {
        x: xMove + '%',
        repeat: -1,
        duration: 20,
        ease: "none",
        modifiers: {
            x: gsap.utils.unitize(x => parseFloat(x) % 100 + '%')
        }
    });
});

// --- Number Count Animation ---
const numbers = document.querySelectorAll('.why-me-number');
numbers.forEach(num => {
    const text = num.textContent;
    const hasPlus = text.includes('+');
    const value = parseInt(text);

    ScrollTrigger.create({
        trigger: num,
        start: "top 90%",
        once: true,
        onEnter: () => {
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
const aboutImage = document.querySelector('.about-image');
if (aboutImage) {
    gsap.to(aboutImage, {
        y: -30,
        scrollTrigger: {
            trigger: '.about',
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

// --- Testimonials Horizontal Scroll ---
const testimonialsTrack = document.querySelector('.testimonials-track');
if (testimonialsTrack) {
    gsap.to(testimonialsTrack, {
        x: -200,
        scrollTrigger: {
            trigger: '.testimonials',
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}

console.log('Portfolio initialized');
