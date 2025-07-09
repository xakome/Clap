// Seleccionamos los elementos clave
const mainNav = document.querySelector('.main-nav');
const toggle = document.querySelector('.toggle');
const modal = document.getElementById('reserveModal');
const reserveBtn = document.querySelector('.reserve-btn');
const closeBtn = modal.querySelector('.close');
const langSwitcherDesktop = document.querySelector('.language-switcher-desktop');
const currentLangDesktop = document.querySelector('.language-switcher-desktop .current-lang');
const langSwitcherMobileStandalone = document.querySelector('.language-switcher-mobile-standalone');
const currentLangMobile = document.querySelector('.language-switcher-mobile-standalone .current-lang-mobile');

// Elementos del Top Banner
const topBanner = document.querySelector('.top-banner');
const closeBannerButton = document.querySelector('.close-banner');


// --- Funcionalidad del Menú Hamburguesa ---
toggle.addEventListener('click', () => {
    mainNav.classList.toggle('show'); // Ahora togglea la clase 'show' en .main-nav
    // Asegurarse de que otros elementos se cierren
    if (modal.classList.contains('show')) {
        toggleModal();
    }
    if (langSwitcherDesktop && langSwitcherDesktop.classList.contains('active')) {
        langSwitcherDesktop.classList.remove('active');
        currentLangDesktop.setAttribute('aria-expanded', 'false');
    }
    if (langSwitcherMobileStandalone && langSwitcherMobileStandalone.classList.contains('active')) {
        langSwitcherMobileStandalone.classList.remove('active');
        currentLangMobile.setAttribute('aria-expanded', 'false');
    }
});

// --- Funcionalidad del Modal de Reserva ---
function toggleModal() {
    const isOpen = modal.classList.contains('show');
    modal.classList.toggle('show');
    modal.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
    reserveBtn.setAttribute('aria-expanded', !isOpen);
    if (!isOpen) {
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
        }
        if (langSwitcherDesktop && langSwitcherDesktop.classList.contains('active')) {
            langSwitcherDesktop.classList.remove('active');
            currentLangDesktop.setAttribute('aria-expanded', 'false');
        }
        if (langSwitcherMobileStandalone && langSwitcherMobileStandalone.classList.contains('active')) {
            langSwitcherMobileStandalone.classList.remove('active');
            currentLangMobile.setAttribute('aria-expanded', 'false');
        }
        modal.querySelector('#name').focus();
    } else {
        reserveBtn.focus();
    }
}

reserveBtn.addEventListener('click', toggleModal);
closeBtn.addEventListener('click', toggleModal);
closeBtn.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        toggleModal();
    }
});
window.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && modal.classList.contains('show')){
        toggleModal();
    }
});

// --- Funcionalidad del Selector de Idioma (Desktop) ---
if (langSwitcherDesktop) {
    currentLangDesktop.addEventListener('click', () => {
        const isActive = langSwitcherDesktop.classList.toggle('active');
        currentLangDesktop.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
        }
        if (modal.classList.contains('show')) {
            toggleModal();
        }
        if (langSwitcherMobileStandalone && langSwitcherMobileStandalone.classList.contains('active')) {
            langSwitcherMobileStandalone.classList.remove('active');
            currentLangMobile.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('click', (event) => {
        if (!langSwitcherDesktop.contains(event.target) && langSwitcherDesktop.classList.contains('active')) {
            langSwitcherDesktop.classList.remove('active');
            currentLangDesktop.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- Funcionalidad del Selector de Idioma (Móvil independiente) ---
if (langSwitcherMobileStandalone) {
    currentLangMobile.addEventListener('click', () => {
        const isActive = langSwitcherMobileStandalone.classList.toggle('active');
        currentLangMobile.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
        }
        if (modal.classList.contains('show')) {
            toggleModal();
        }
        if (langSwitcherDesktop && langSwitcherDesktop.classList.contains('active')) {
            langSwitcherDesktop.classList.remove('active');
            currentLangDesktop.setAttribute('aria-expanded', 'false');
        }
    });

    document.addEventListener('click', (event) => {
        if (!langSwitcherMobileStandalone.contains(event.target) && langSwitcherMobileStandalone.classList.contains('active')) {
            langSwitcherMobileStandalone.classList.remove('active');
            currentLangMobile.setAttribute('aria-expanded', 'false');
        }
    });
}


// --- Cierre general de elementos flotantes al hacer clic fuera ---
document.addEventListener('click', (event) => {
    const isClickInsideNavbarElements = toggle.contains(event.target) ||
                                      mainNav.contains(event.target) ||
                                      reserveBtn.contains(event.target) ||
                                      (langSwitcherDesktop && langSwitcherDesktop.contains(event.target)) ||
                                      (langSwitcherMobileStandalone && langSwitcherMobileStandalone.contains(event.target)) ||
                                      modal.contains(event.target);

    if (!isClickInsideNavbarElements) {
        if (mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
        }
        if (langSwitcherDesktop && langSwitcherDesktop.classList.contains('active')) {
            langSwitcherDesktop.classList.remove('active');
            currentLangDesktop.setAttribute('aria-expanded', 'false');
        }
        if (langSwitcherMobileStandalone && langSwitcherMobileStandalone.classList.contains('active')) {
            langSwitcherMobileStandalone.classList.remove('active');
            currentLangMobile.setAttribute('aria-expanded', 'false');
        }
    }
});

mainNav.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768 && mainNav.classList.contains('show')) {
            mainNav.classList.remove('show');
        }
    });
});

// --- JS hover simulado en móvil para cards ---
const isTouchDevice = ('ontouchstart' in window || navigator.maxTouchPoints > 0);
if (isTouchDevice) {
    const tourBoxes = document.querySelectorAll('.tour-box');
    tourBoxes.forEach(box => {
        box.addEventListener('click', function(e) {
            // Si el click es en el enlace interno, permite la navegación
            if (e.target.closest('.tour-overlay a')) {
                return true;
            }
            // Si la tarjeta ya está activa, permite la navegación normal al segundo toque
            if (this.classList.contains('active')) {
                return true; // Permitir el click nativo
            }
            e.preventDefault(); // Previene la navegación al primer toque
            tourBoxes.forEach(b => b !== this && b.classList.remove('active')); // Cierra otras tarjetas
            this.classList.add('active'); // Activa la tarjeta actual
        });
    });
    document.body.addEventListener('click', e => {
        // Cierra la tarjeta si se hace clic fuera de cualquier tour-box o su enlace interno
        if (!e.target.closest('.tour-box') && !e.target.closest('.tour-overlay a')) {
            tourBoxes.forEach(b => b.classList.remove('active'));
        }
    });
}

// --- JS para el Top Banner ---
if (topBanner && closeBannerButton) {
    closeBannerButton.addEventListener('click', () => {
        topBanner.style.display = 'none';
        // localStorage.setItem('bannerClosed', 'true'); // Opcional: para recordar el cierre
    });
    // Opcional: Comentar si quieres que aparezca cada vez
    // if (localStorage.getItem('bannerClosed') === 'true') {
    //     topBanner.style.display = 'none';
    // }
}

// --- JS para el Carrusel/Slider del Hero ---
const slides = document.querySelectorAll('.hero-slider .slide');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let currentSlide = 0;
let slideInterval;
const slideDuration = 5000; // 5 segundos por slide

// Función para mostrar un slide específico
function showSlide(index) {
    // Elimina la clase 'active' de todos los slides y dots
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (dotsContainer.children[i]) {
            dotsContainer.children[i].classList.remove('active');
        }

        // Oculta H1 y P en todas las diapositivas por defecto
        const h1 = slide.querySelector('.hero-title');
        const p = slide.querySelector('.hero-description');
        if (h1) h1.style.opacity = '0';
        if (p) p.style.opacity = '0';
    });

    // Muestra la diapositiva activa
    slides[index].classList.add('active');
    if (dotsContainer.children[index]) {
        dotsContainer.children[index].classList.add('active');
    }
    currentSlide = index;

    // Hace visible el H1 y P solo en la PRIMERA diapositiva
    if (index === 0) {
        const h1 = slides[index].querySelector('.hero-title');
        const p = slides[index].querySelector('.hero-description');
        if (h1) h1.style.opacity = '1';
        if (p) p.style.opacity = '1';
    }
}


function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
}

function startSlider() {
    slideInterval = setInterval(nextSlide, slideDuration);
}

function pauseSlider() {
    clearInterval(slideInterval);
}

// Generar puntos de navegación
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        showSlide(i);
        pauseSlider(); // Pausa al hacer clic manual
        startSlider(); // Reinicia el temporizador
    });
    dotsContainer.appendChild(dot);
});

// Event listeners para los botones de navegación
prevBtn.addEventListener('click', () => {
    prevSlide();
    pauseSlider(); // Pausa al hacer clic manual
    startSlider(); // Reinicia el temporizador
});
nextBtn.addEventListener('click', () => {
    nextSlide();
    pauseSlider(); // Pausa al hacer clic manual
    startSlider(); // Reinicia el temporador
});

// Iniciar el slider al cargar la página
showSlide(currentSlide); // Muestra la primera imagen
startSlider(); // Inicia la reproducción automática

// Pausar/Reanudar en hover del slider
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', pauseSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
}
