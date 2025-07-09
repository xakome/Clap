document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los elementos clave
    const mainNav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.toggle');
    const modal = document.getElementById('reserveModal');
    // Ahora seleccionamos TODOS los botones de reserva
    const reserveBtns = document.querySelectorAll('.reserve-btn'); 
    // Añade una verificación de si modal existe antes de intentar obtener closeBtn
    const closeBtn = modal ? modal.querySelector('.close') : null; 
    
    const langSwitcherDesktop = document.querySelector('.language-switcher-desktop');
    // Añade verificación de si languageSwitcherDesktop existe
    const currentLangDesktop = langSwitcherDesktop ? langSwitcherDesktop.querySelector('.current-lang') : null; 

    const langSwitcherMobileStandalone = document.querySelector('.language-switcher-mobile-standalone');
    // Añade verificación de si languageSwitcherMobileStandalone existe
    const currentLangMobile = langSwitcherMobileStandalone ? langSwitcherMobileStandalone.querySelector('.current-lang-mobile') : null;

    // Elementos del Top Banner
    const topBanner = document.querySelector('.top-banner');
    const closeBannerButton = document.querySelector('.close-banner');

    // --- Funcionalidad del Menú Hamburguesa ---
    if (toggle && mainNav) { // Asegura que los elementos existan
        toggle.addEventListener('click', () => {
            mainNav.classList.toggle('show');
            // Cierra el modal si está abierto al abrir/cerrar el menú
            if (modal && modal.classList.contains('show')) {
                toggleModal();
            }
            // Asegúrate de que los selectores de idioma se cierren
            if (langSwitcherDesktop && langSwitcherDesktop.classList.contains('active')) {
                langSwitcherDesktop.classList.remove('active');
                currentLangDesktop.setAttribute('aria-expanded', 'false');
            }
            if (langSwitcherMobileStandalone && langSwitcherMobileStandalone.classList.contains('active')) {
                langSwitcherMobileStandalone.classList.remove('active');
                currentLangMobile.setAttribute('aria-expanded', 'false'); // Asegura que este atributo exista en mobile
            }
        });
    }

    // --- Funcionalidad del Modal ---
    function toggleModal() {
        if (!modal) return; // Salir si el modal no existe

        modal.classList.toggle('show');
        if (modal.classList.contains('show')) {
            modal.setAttribute('aria-hidden', 'false');
            modal.focus(); // Enfocar el modal para accesibilidad
        } else {
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    // Añade event listeners a TODOS los botones de reserva
    if (reserveBtns.length > 0) {
        reserveBtns.forEach(btn => {
            btn.addEventListener('click', toggleModal);
        });
    }

    // Event listener para el botón de cerrar del modal
    if (closeBtn) {
        closeBtn.addEventListener('click', toggleModal);
    }

    // Cerrar modal al hacer clic fuera (solo si el modal existe)
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                toggleModal();
            }
        });

        // Cerrar modal con la tecla Esc (solo si el modal existe)
        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('show')) {
                toggleModal();
            }
        });
    }

    // --- Funcionalidad del Top Banner ---
    if (closeBannerButton && topBanner) {
        closeBannerButton.addEventListener('click', () => {
            topBanner.style.display = 'none';
            localStorage.setItem('topBannerClosed', 'true');
        });
    }

    // Ocultar el banner si ya se cerró previamente
    if (localStorage.getItem('topBannerClosed') === 'true') {
        if (topBanner) {
            topBanner.style.display = 'none';
        }
    }

    // --- Funcionalidad del Selector de Idioma (Desktop) ---
    if (langSwitcherDesktop && currentLangDesktop) { // Asegura que los elementos existan
        currentLangDesktop.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que el clic se propague al document y cierre inmediatamente
            langSwitcherDesktop.classList.toggle('active');
            currentLangDesktop.setAttribute('aria-expanded', langSwitcherDesktop.classList.contains('active'));
        });
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!langSwitcherDesktop.contains(event.target) && langSwitcherDesktop.classList.contains('active')) {
                langSwitcherDesktop.classList.remove('active');
                currentLangDesktop.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Funcionalidad del Selector de Idioma (Mobile) ---
    if (langSwitcherMobileStandalone && currentLangMobile) { // Asegura que los elementos existan
        currentLangMobile.addEventListener('click', (event) => {
            event.stopPropagation(); // Evita que el clic se propague al document y cierre inmediatamente
            langSwitcherMobileStandalone.classList.toggle('active');
            currentLangMobile.setAttribute('aria-expanded', langSwitcherMobileStandalone.classList.contains('active'));
        });
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!langSwitcherMobileStandalone.contains(event.target) && langSwitcherMobileStandalone.classList.contains('active')) {
                langSwitcherMobileStandalone.classList.remove('active');
                currentLangMobile.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // --- Lógica para desvanecer el texto del Hero (específico de chichen.html) ---
    const heroTextContainer = document.getElementById('heroTextContainer');
    if (heroTextContainer) {
        setTimeout(() => {
            heroTextContainer.style.opacity = '0';
            heroTextContainer.style.transition = 'opacity 1s ease-in-out'; // Opcional: añade una transición suave
        }, 5000); // 5000 milisegundos = 5 segundos
    }

    // --- Lógica del Slider para el Hero (si aplica, p.ej. en index.html) ---
    // Asegúrate de que esta lógica solo se ejecute si el .hero-slider existe en la página actual.
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        const slides = document.querySelectorAll('.hero-slide');
        const prevBtn = document.querySelector('.hero-slider-control.prev');
        const nextBtn = document.querySelector('.hero-slider-control.next');
        const dotsContainer = document.querySelector('.hero-slider-dots');

        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000; // 5 segundos por slide

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
                startSlider(); // Reinicia el temporizador
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
        heroSlider.addEventListener('mouseenter', pauseSlider);
        heroSlider.addEventListener('mouseleave', startSlider);
    } // Fin de if (heroSlider)

}); // Fin de DOMContentLoaded

// Lógica de Slick Carousel (requiere jQuery, se ejecuta cuando el DOM esté listo)
// Se usa $(document).ready() para asegurar que jQuery esté completamente cargado.
$(document).ready(function(){
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
});
