// Seleccionamos los elementos clave (mantener los selectores existentes)
const mainNav = document.querySelector('.main-nav');
const toggle = document.querySelector('.toggle');
const modal = document.getElementById('reserveModal');
const reserveBtn = document.querySelector('.reserve-btn'); // Asume que este botón abre el modal principal
const closeBtn = modal ? modal.querySelector('.close') : null; // Añade chequeo por si modal es null
const langSwitcherDesktop = document.querySelector('.language-switcher-desktop');
const currentLangDesktop = document.querySelector('.language-switcher-desktop .current-lang');
const langSwitcherMobileStandalone = document.querySelector('.language-switcher-mobile-standalone');
const currentLangMobile = document.querySelector('.language-switcher-mobile-standalone .current-lang-mobile');

// Elementos del Top Banner
const topBanner = document.querySelector('.top-banner');
const closeBannerButton = document.querySelector('.close-banner');


// --- Funcionalidad del Menú Hamburguesa ---
if (toggle && mainNav) {
    toggle.addEventListener('click', () => {
        mainNav.classList.toggle('show'); // Ahora togglea la clase 'show' en .main-nav
        // Asegurarse de que otros elementos se cierren
        if (modal && modal.classList.contains('show')) {
            toggleModal(); // Llama a la función toggleModal para cerrar
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


// --- Funcionalidad del Modal de Reserva (ajustado para que sea toggled por JS y CSS) ---
// Función para abrir/cerrar el modal (se usa en el menú también)
function toggleModal() {
    if (modal) {
        if (modal.classList.contains('show')) {
            modal.classList.remove('show');
        } else {
            modal.classList.add('show');
        }
    }
}

// Event Listeners para el modal
if (reserveBtn) {
    reserveBtn.addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal();
    });
}
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        toggleModal();
    });
}

// Cerrar modal al hacer clic fuera
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            toggleModal();
        }
    });
}


// --- Funcionalidad del Language Switcher ---
// Asegurarse de que el toggle de los switchers funcione correctamente
if (currentLangDesktop) {
    currentLangDesktop.addEventListener('click', (e) => {
        e.preventDefault();
        langSwitcherDesktop.classList.toggle('active');
        const isExpanded = langSwitcherDesktop.classList.contains('active');
        currentLangDesktop.setAttribute('aria-expanded', isExpanded);
    });
}

if (currentLangMobile) {
    currentLangMobile.addEventListener('click', (e) => {
        e.preventDefault();
        langSwitcherMobileStandalone.classList.toggle('active');
        const isExpanded = langSwitcherMobileStandalone.classList.contains('active');
        currentLangMobile.setAttribute('aria-expanded', isExpanded);
    });
}


// --- Funcionalidad del Top Banner ---
if (closeBannerButton && topBanner) {
    closeBannerButton.addEventListener('click', () => {
        topBanner.style.display = 'none'; // Oculta el banner
        localStorage.setItem('topBannerClosed', 'true'); // Guarda la preferencia del usuario
    });

    // Comprobar si el usuario cerró el banner previamente
    if (localStorage.getItem('topBannerClosed') === 'true') {
        topBanner.style.display = 'none';
    }
}


// --- Funcionalidad del Hero Slider (PARA index.html) ---
// Este código solo se ejecutará si el elemento .hero-slider existe en la página
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dotsContainer = document.querySelector('.hero-slider .slider-dots');
    const prevBtn = document.querySelector('.hero-slider .prev-slide');
    const nextBtn = document.querySelector('.hero-slider .next-slide');

    let currentSlide = 0;
    const slideDuration = 6000; // 6 segundos
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.remove('active');
                if (i === index) {
                    dot.classList.add('active');
                }
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
        slideInterval = setInterval(nextSlide, slideDuration);
    }

    function pauseSlider() {
        clearInterval(slideInterval);
    }

    // Generar puntos de navegación
    if (dotsContainer) {
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

    // Event listeners para los botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            pauseSlider(); // Pausa al hacer clic manual
            startSlider(); // Reinicia el temporador
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            pauseSlider(); // Pausa al hacer clic manual
            startSlider(); // Reinicia el temporador
        });
    }

    // Iniciar el slider al cargar la página
    showSlide(currentSlide); // Muestra la primera imagen
    startSlider(); // Inicia la reproducción automática

    // Pausar/Reanudar en hover del slider
    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', pauseSlider);
        heroSlider.addEventListener('mouseleave', startSlider);
    }
}
// Fin de la funcionalidad del Hero Slider


// --- Funcionalidades que requieren jQuery ---
// Se ejecutan una vez que el DOM está completamente cargado
$(document).ready(function() {

    // --- Slick Carousel Initialization for Gallery (chichen.html) ---
    // Main gallery carousel
    $('.gallery-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Puedes añadir flechas si quieres
        fade: true,
        asNavFor: '.gallery-nav-thumbs', // Sincroniza con las miniaturas
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
            {
                breakpoint: 768, // Breakpoint para móviles
                settings: {
                    arrows: true // Mostrar flechas en móviles si lo deseas
                }
            }
        ]
    });

    // Thumbnail navigation carousel
    $('.gallery-nav-thumbs').slick({
        slidesToShow: 5, // Muestra 5 miniaturas a la vez
        slidesToScroll: 1,
        asNavFor: '.gallery-carousel', // Sincroniza con la galería principal
        dots: false,
        centerMode: true,
        focusOnSelect: true,
        infinite: true,
        arrows: true, // Mostrar flechas para las miniaturas
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    arrows: true // Asegurar flechas en móvil para thumbs
                }
            }
        ]
    });

    // --- Magnific Popup Initialization (para las imágenes de la galería en chichen.html) ---
    $('.gallery-carousel').magnificPopup({
        delegate: 'a', // 'a' o '.mfp-gallery-item' si tienes enlaces o clases específicas
        type: 'image',
        gallery: {
            enabled: true // Habilita la navegación por galería
        },
        mainClass: 'mfp-with-zoom', // Clase CSS para animaciones de zoom
        zoom: {
            enabled: true,
            duration: 300 // Duración del zoom en ms
        }
    });

    // --- Sticky CTA Bar (Aparece al hacer scroll en chichen.html) ---
    const stickyCtaBar = $('.sticky-cta-bar');
    const heroSection = $('.hero-tour-chichen'); // Obtén la sección hero específica de chichen.html

    if (stickyCtaBar.length && heroSection.length) {
        $(window).on('scroll', function() {
            // Calcula el punto en el que la sección hero ya no está completamente visible
            const heroBottom = heroSection.offset().top + heroSection.outerHeight();

            if ($(window).scrollTop() > heroBottom) {
                stickyCtaBar.slideDown(); // Muestra la barra suavemente
            } else {
                stickyCtaBar.slideUp(); // Oculta la barra suavemente
            }
        });
    }

    // --- FAQ Accordion (Plegar/Desplegar en chichen.html) ---
    $('.accordion-header').on('click', function() {
        const accordionItem = $(this).closest('.accordion-item');
        const accordionContent = accordionItem.find('.accordion-content');
        const icon = $(this).find('.accordion-icon');

        // Toggle la clase 'expanded' en el item para CSS
        accordionItem.toggleClass('expanded');
        // Toggle el estado aria-expanded para accesibilidad
        $(this).attr('aria-expanded', $(this).attr('aria-expanded') === 'false' ? 'true' : 'false');

        // Desliza el contenido
        accordionContent.slideToggle(300); // 300ms de duración para el deslizamiento

        // Rota el icono (si es un Font Awesome 'fa-chevron-down')
        icon.toggleClass('fa-chevron-down fa-chevron-up');
    });


    // --- Hero Text Fade Out (permanente desaparición en chichen.html) ---
    const heroContent = $('.hero-tour-chichen .hero-content');
    if (heroContent.length) { // Asegúrate de que el elemento exista
        const fadeOutDelay = 5000; // Visible por 5 segundos

        setTimeout(() => {
            heroContent.addClass('fade-out'); // Añade la clase para desvanecer
        }, fadeOutDelay);
    }


    // --- Inicialización del modal de reserva para chichen.html usando jQuery ---
    // Si tienes botones con data-toggle="modal" que apuntan a #reserveModal
    $('[data-toggle="modal"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).data('target'); // Obtiene el ID del modal, ej. '#reserveModal'
        $(target).fadeIn(); // Muestra el modal con un efecto de desvanecimiento
    });

    $('.modal .close-button, .modal .close').on('click', function() {
        $(this).closest('.modal').fadeOut(); // Oculta el modal al hacer clic en el botón de cierre
    });

    $(window).on('click', function(event) {
        // Cierra el modal si se hace clic fuera de su contenido
        if ($(event.target).is('.modal')) {
            $('.modal').fadeOut();
        }
    });

}); // Fin de $(document).ready()
