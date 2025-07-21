document.addEventListener("DOMContentLoaded", function() {
    // --- Lógica existente de main.js para el banner superior ---
    const closeBannerButton = document.querySelector('.close-banner');
    const topBanner = document.querySelector('.top-banner');

    if (closeBannerButton && topBanner) {
        closeBannerButton.addEventListener('click', function() {
            topBanner.style.display = 'none';
        });
    }

    // --- Lógica existente de main.js para el slider del hero ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (i === index) {
                slide.classList.add('active');
            }
        });
        updateDots(index);
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
        slideInterval = setInterval(nextSlide, 5000); // Cambia cada 5 segundos
    }

    function stopSlider() {
        clearInterval(slideInterval);
    }

    // Crear los puntos de navegación
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
            stopSlider();
            currentSlide = index;
            showSlide(currentSlide);
            startSlider();
        });
        dotsContainer.appendChild(dot);
    });

    function updateDots(activeIndex) {
        document.querySelectorAll('.slider-dots .dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    }

    // Controles del slider
    document.querySelector('.next-slide')?.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    document.querySelector('.prev-slide')?.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });

    // Inicializar slider
    if (slides.length > 0) {
        showSlide(currentSlide);
        startSlider();
    }


    // --- Lógica existente de main.js para el toggle del menú hamburguesa ---
    const toggleButton = document.querySelector('.toggle');
    const mainNav = document.querySelector('.main-nav');
    const languageSwitcherDesktop = document.querySelector('.language-switcher-desktop');
    const languageSwitcherMobileStandalone = document.querySelector('.language-switcher-mobile-standalone');

    if (toggleButton && mainNav) {
        toggleButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // Oculta el switcher de escritorio cuando el menú móvil está activo
            if (languageSwitcherDesktop) {
                languageSwitcherDesktop.style.display = mainNav.classList.contains('active') ? 'none' : '';
            }
            // Muestra u oculta el switcher móvil independiente
            if (languageSwitcherMobileStandalone) {
                languageSwitcherMobileStandalone.style.display = mainNav.classList.contains('active') ? 'block' : 'none';
            }

            // Asegúrate de que el body no haga scroll cuando el menú está abierto
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Cierra el menú si se hace clic fuera de él (opcional, pero mejora UX)
        document.addEventListener('click', (event) => {
            if (!mainNav.contains(event.target) && !toggleButton.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                if (languageSwitcherDesktop) {
                    languageSwitcherDesktop.style.display = ''; // Restaura visibilidad
                }
                if (languageSwitcherMobileStandalone) {
                    languageSwitcherMobileStandalone.style.display = 'none'; // Asegura que se oculte
                }
            }
        });
    }

    // --- Lógica para el modal de reserva (MODIFICADA) ---
    const modal = document.getElementById('reserveModal');
    // Selecciona todos los elementos que deben abrir el modal
    const modalTriggers = document.querySelectorAll(
        '.reserve-btn, .main-cta-button[data-target="#reserveModal"], .footer-cta-link[href="#reserveModal"]'
    );
    // Asegúrate de que el botón de cerrar sea el correcto (close-button en chichen.html)
    const closeModal = document.querySelector('#reserveModal .close-button');

    if (modal && closeModal) { // Solo necesitamos que el modal y el botón de cerrar existan
        // Añadir escuchador de eventos a todos los disparadores del modal
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (event) => {
                event.preventDefault(); // Evita el comportamiento predeterminado del enlace/botón
                modal.style.display = 'block';
                document.body.classList.add('modal-open'); // Para evitar scroll del body
                modal.setAttribute('aria-hidden', 'false');
                // Si el disparador es un botón con aria-expanded, actualízalo
                if (trigger.hasAttribute('aria-expanded')) {
                    trigger.setAttribute('aria-expanded', 'true');
                }
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            modal.setAttribute('aria-hidden', 'true');
            // Busca el disparador activo para actualizar su aria-expanded si es necesario
            const activeTrigger = document.querySelector('.reserve-btn[aria-expanded="true"], .main-cta-button[aria-expanded="true"], .footer-cta-link[aria-expanded="true"]');
            if (activeTrigger) {
                activeTrigger.setAttribute('aria-expanded', 'false');
            }
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                modal.setAttribute('aria-hidden', 'true');
                const activeTrigger = document.querySelector('.reserve-btn[aria-expanded="true"], .main-cta-button[aria-expanded="true"], .footer-cta-link[aria-expanded="true"]');
                if (activeTrigger) {
                    activeTrigger.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // --- Lógica para los selectores de idioma (similar a como ya lo tenías) ---
    // Selector de idioma para Desktop
    const desktopLangSwitcher = document.querySelector('.language-switcher-desktop');
    const desktopCurrentLang = document.querySelector('.language-switcher-desktop .current-lang');
    const desktopLangOptions = document.querySelector('.language-switcher-desktop .lang-options');

    if (desktopLangSwitcher && desktopCurrentLang && desktopLangOptions) {
        desktopCurrentLang.addEventListener('click', () => {
            desktopLangOptions.classList.toggle('show');
            desktopCurrentLang.setAttribute('aria-expanded', desktopLangOptions.classList.contains('show') ? 'true' : 'false');
        });

        // Ocultar si se hace clic fuera
        document.addEventListener('click', (event) => {
            if (!desktopLangSwitcher.contains(event.target) && desktopLangOptions.classList.contains('show')) {
                desktopLangOptions.classList.remove('show');
                desktopCurrentLang.setAttribute('aria-expanded', 'false');
            }
        });

        // Manejar selección de idioma para desktop
        desktopLangOptions.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Aquí deberías tener la lógica para cambiar el idioma real
                // window.location.href = link.href;
                console.log('Idioma seleccionado (Desktop):', link.dataset.lang);
                // Actualizar el texto mostrado si es necesario
                desktopCurrentLang.innerHTML = `${link.dataset.lang.toUpperCase()} <i class="fas fa-globe"></i>`;
                desktopLangOptions.classList.remove('show');
                desktopCurrentLang.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Selector de idioma para Móvil (standalone)
    const mobileLangSwitcher = document.querySelector('.language-switcher-mobile-standalone');
    const mobileCurrentLang = document.querySelector('.language-switcher-mobile-standalone .current-lang-mobile');
    const mobileLangOptions = document.querySelector('.language-switcher-mobile-standalone .lang-options-mobile');

    if (mobileLangSwitcher && mobileCurrentLang && mobileLangOptions) {
        mobileCurrentLang.addEventListener('click', () => {
            mobileLangOptions.classList.toggle('show');
            mobileCurrentLang.setAttribute('aria-expanded', mobileCurrentLang.classList.contains('show') ? 'true' : 'false');
        });

        // Ocultar si se hace clic fuera
        document.addEventListener('click', (event) => {
            if (!mobileLangSwitcher.contains(event.target) && mobileLangOptions.classList.contains('show')) {
                mobileLangOptions.classList.remove('show');
                mobileCurrentLang.setAttribute('aria-expanded', 'false');
            }
        });

        // Manejar selección de idioma para móvil
        mobileLangOptions.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Aquí deberías tener la lógica para cambiar el idioma real
                // window.location.href = link.href;
                console.log('Idioma seleccionado (Móvil):', link.dataset.lang);
                // Actualizar el texto mostrado si es necesario
                mobileCurrentLang.innerHTML = `${link.dataset.lang.toUpperCase()} <i class="fas fa-globe"></i>`;
                mobileLangOptions.classList.remove('show');
                mobileCurrentLang.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Asegúrate de que el selector de idioma móvil esté inicialmente oculto si no está activo el menú principal
    // Esto se gestiona en la lógica del toggle, pero puede ser bueno tenerlo al cargar.
    if (languageSwitcherMobileStandalone && !mainNav.classList.contains('active')) {
        languageSwitcherMobileStandalone.style.display = 'none';
    }

    // --- INICIALIZACIÓN DE SLICK CAROUSEL PARA LAS GALERÍAS ---
    // Este código se asegura de que el carrusel se active en todas las galerías con la clase 'gallery-carousel'
    // Se ejecuta después de que el DOM esté completamente cargado.
    if (typeof jQuery !== 'undefined' && typeof jQuery.fn.slick !== 'undefined') {
        $('.gallery-carousel').slick({
            dots: true, // Muestra los puntos de navegación
            infinite: true, // Permite el loop infinito
            speed: 500, // Velocidad de transición
            slidesToShow: 3, // Muestra 3 slides a la vez
            slidesToScroll: 1, // Desplaza 1 slide a la vez
            autoplay: true, // Reproducción automática
            autoplaySpeed: 3000, // Velocidad de reproducción automática (3 segundos)
            arrows: true, // Muestra las flechas de navegación
            responsive: [
                {
                    breakpoint: 1024, // Para pantallas de hasta 1024px
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600, // Para pantallas de hasta 600px
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        arrows: false // Oculta las flechas en móvil si prefieres
                    }
                }
            ]
        });

        // Lógica para el modal de pantalla completa del carrusel
        const fullscreenModal = document.getElementById('fullscreenCarouselModal');
        const fullscreenClose = document.querySelector('.fullscreen-close');
        const fullscreenCarouselDiv = document.querySelector('.fullscreen-carousel');

        if (fullscreenModal && fullscreenClose && fullscreenCarouselDiv) {
            $('.gallery-carousel').on('click', '.slick-slide img', function() {
                const imgIndex = $(this).closest('.slick-slide').data('slick-index');
                
                // Destruye el carrusel existente en el modal si lo hay
                if ($(fullscreenCarouselDiv).hasClass('slick-initialized')) {
                    $(fullscreenCarouselDiv).slick('unslick');
                }
                // Limpia el contenido anterior del modal
                $(fullscreenCarouselDiv).empty();

                // Clona las imágenes originales del carrusel y las añade al carrusel de pantalla completa
                // Cada imagen se envuelve en un div simple para que Slick la trate como un slide
                $('.gallery-carousel .gallery-item-frame img').each(function() {
                    const clonedImg = $(this).clone();
                    const slideWrapper = $('<div></div>').append(clonedImg);
                    $(fullscreenCarouselDiv).append(slideWrapper);
                });

                // Inicializa el carrusel de pantalla completa
                $(fullscreenCarouselDiv).slick({
                    dots: true,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: imgIndex, // Abre el carrusel en la imagen clicada
                    arrows: true,
                    adaptiveHeight: true
                });

                fullscreenModal.style.display = 'block';
                document.body.classList.add('modal-open');
            });

            fullscreenClose.addEventListener('click', () => {
                fullscreenModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                // Destruye el carrusel del modal al cerrarlo para evitar duplicados
                if ($(fullscreenCarouselDiv).hasClass('slick-initialized')) {
                    $(fullscreenCarouselDiv).slick('unslick');
                    $(fullscreenCarouselDiv).empty(); // Limpia el contenido
                }
            });

            window.addEventListener('click', (event) => {
                if (event.target == fullscreenModal) {
                    fullscreenModal.style.display = 'none';
                    document.body.classList.remove('modal-open');
                    if ($(fullscreenCarouselDiv).hasClass('slick-initialized')) {
                        $(fullscreenCarouselDiv).slick('unslick');
                        $(fullscreenCarouselDiv).empty();
                    }
                }
            });
        }
    } else {
        console.error("jQuery or Slick Carousel library not loaded. Ensure scripts are included before main.js.");
    }

}); // Fin de DOMContentLoaded
