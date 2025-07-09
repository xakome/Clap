// Seleccionamos los elementos clave del DOM
const mainNav = document.querySelector('.main-nav');
const toggle = document.querySelector('.toggle'); // Botón hamburguesa
const modal = document.getElementById('reserveModal');
const reserveButtons = document.querySelectorAll('[data-toggle="modal"][data-target="#reserveModal"]'); // Selecciona todos los botones que abren el modal de reserva
const closeBtn = modal ? modal.querySelector('.close') : null; // Asegurarse de que el modal exista antes de buscar el botón de cierre

const langSwitcherDesktop = document.querySelector('.language-switcher-desktop');
const currentLangDesktop = langSwitcherDesktop ? langSwitcherDesktop.querySelector('.current-lang') : null;

const langSwitcherMobileStandalone = document.querySelector('.language-switcher-mobile-standalone');
const currentLangMobile = langSwitcherMobileStandalone ? langSwitcherMobileStandalone.querySelector('.current-lang-mobile') : null;

// Elementos del Top Banner (manteniéndolos, aunque no sean el foco principal)
const topBanner = document.querySelector('.top-banner');
const closeBannerButton = document.querySelector('.close-banner');

// --- Funcionalidad del Menú Hamburguesa ---
if (toggle && mainNav) {
    toggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
        const isExpanded = mainNav.classList.contains('show') ? 'true' : 'false';
        toggle.setAttribute('aria-expanded', isExpanded); // Mejor accesibilidad para el toggle

        // Cierra otros elementos si están abiertos al abrir/cerrar el menú
        if (modal && modal.classList.contains('show')) {
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
}

// --- Funcionalidad del Modal de Reserva ---
function toggleModal() {
    if (!modal) return; // Salir si el modal no existe

    modal.classList.toggle('show');
    const isHidden = modal.classList.contains('show') ? 'false' : 'true';
    modal.setAttribute('aria-hidden', isHidden);

    // Actualiza aria-expanded para todos los botones que abren este modal
    reserveButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', isHidden === 'false' ? 'true' : 'false'); // Si el modal está abierto, el botón está 'expanded'
    });

    // Control de scroll del cuerpo cuando el modal está abierto/cerrado
    if (modal.classList.contains('show')) {
        document.body.style.overflow = 'hidden'; // Evita el scroll del fondo
    } else {
        document.body.style.overflow = ''; // Restaura el scroll
    }
}

// Asignar event listeners a todos los botones que abren el modal
if (reserveButtons.length > 0) {
    reserveButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleModal();
        });
    });
}

// Cerrar modal con el botón de cerrar
if (closeBtn) {
    closeBtn.addEventListener('click', toggleModal);
}

// Cerrar modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        toggleModal();
    }
});

// --- Funcionalidad del Selector de Idioma (Escritorio) ---
if (langSwitcherDesktop && currentLangDesktop) {
    langSwitcherDesktop.addEventListener('click', (e) => {
        // Evita que el clic propague al documento y cierre inmediatamente
        e.stopPropagation();

        langSwitcherDesktop.classList.toggle('active');
        const isExpanded = langSwitcherDesktop.classList.contains('active') ? 'true' : 'false';
        currentLangDesktop.setAttribute('aria-expanded', isExpanded);
    });
}

// Cierra el selector de idioma al hacer clic fuera (solo si no es el selector móvil independiente)
window.addEventListener('click', (event) => {
    if (langSwitcherDesktop && langSwitcherDesktop.classList.contains('active') && !langSwitcherDesktop.contains(event.target)) {
        langSwitcherDesktop.classList.remove('active');
        currentLangDesktop.setAttribute('aria-expanded', 'false');
    }
    // Asegurarse de que el menú móvil también se cierre si se hace clic fuera
    if (mainNav && mainNav.classList.contains('show') && !mainNav.contains(event.target) && !toggle.contains(event.target)) {
        mainNav.classList.remove('show');
        toggle.setAttribute('aria-expanded', 'false');
    }
});

// --- Funcionalidad del Selector de Idioma (Móvil independiente, si existe) ---
// La lógica para langSwitcherMobileStandalone ya está en main.js, se mantendría.

// --- Funcionalidad del Top Banner (sin cambios significativos aquí) ---
if (closeBannerButton && topBanner) {
    closeBannerButton.addEventListener('click', () => {
        topBanner.style.display = 'none';
        localStorage.setItem('bannerClosed', 'true'); // Guarda el estado en localStorage
    });

    if (localStorage.getItem('bannerClosed') === 'true') {
        topBanner.style.display = 'none';
    }
}

// --- Funcionalidad del Slider del Hero (para Index.html) ---
// Este código solo se ejecutará si los elementos existen en el DOM,
// por lo que no causará errores en chichen.html donde no están presentes.
const slidesContainer = document.querySelector('.hero-slider .slides');
const slides = slidesContainer ? Array.from(slidesContainer.children) : []; // Convertir HTMLCollection a Array
const dotsContainer = document.querySelector('.hero-slider .dots');
const prevBtn = document.querySelector('.hero-slider .prev');
const nextBtn = document.querySelector('.hero-slider .next');

let currentSlide = 0;
let slideInterval;
const slideDuration = 5000; // 5 segundos

function showSlide(index) {
    if (!slidesContainer) return; // Salir si el slider no existe

    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
    if (dotsContainer) {
        Array.from(dotsContainer.children).forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
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
    if (slides.length > 1) { // Solo iniciar si hay más de una diapositiva
        slideInterval = setInterval(nextSlide, slideDuration);
    }
}

function pauseSlider() {
    clearInterval(slideInterval);
}

// Generar puntos de navegación (si el slider existe)
if (slidesContainer && dotsContainer) {
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
}

// Event listeners para los botones de navegación (si el slider existe)
if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        pauseSlider();
        startSlider();
    });
}
if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        pauseSlider();
        startSlider();
    });
}

// Iniciar el slider al cargar la página (solo si el slider existe)
if (slidesContainer) {
    showSlide(currentSlide); // Muestra la primera imagen
    startSlider(); // Inicia la reproducción automática
}

// Pausar/Reanudar en hover del slider (solo si el slider existe)
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', pauseSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
}


// --- Inicialización de Slick Carousel para la Galería (SOLO para páginas de tour) ---
// Asegúrate de que jQuery esté cargado ANTES de este script en tu HTML.
$(document).ready(function() {
    if ($('.gallery-carousel').length) {
        $('.gallery-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            arrows: true,
            adaptiveHeight: true
        });
    }

    // Inicialización del carrusel de testimonios (si existe)
    if ($('.testimonials-carousel').length) {
        $('.testimonials-carousel').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false // Opcional: puedes añadir flechas si lo prefieres
        });
    }
});
