document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Toggle para móvil
    const toggleBtn = document.querySelector('.toggle');
    const mainNav = document.querySelector('.main-nav');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            // Cambiar el ícono de la hamburguesa a X y viceversa
            if (mainNav.classList.contains('active')) {
                toggleBtn.innerHTML = '&times;'; // Cambia a una 'X'
                toggleBtn.setAttribute('aria-label', 'Cerrar menú');
            } else {
                toggleBtn.innerHTML = '&#9776;'; // Vuelve al ícono de hamburguesa
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
            }
        });

        // Cerrar menú al hacer clic fuera (si el menú está abierto)
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !toggleBtn.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                toggleBtn.innerHTML = '&#9776;'; // Vuelve al ícono de hamburguesa
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
            }
        });
    }

    // 2. Modal de Reserva
    const reserveBtn = document.querySelector('.reserve-btn');
    const reserveModal = document.getElementById('reserveModal');
    const closeModal = document.querySelector('#reserveModal .close');
    const footerCtaLink = document.querySelector('.footer-cta-link'); // Nuevo elemento

    if (reserveBtn && reserveModal && closeModal) {
        reserveBtn.addEventListener('click', function() {
            reserveModal.style.display = 'block';
            reserveModal.setAttribute('aria-hidden', 'false');
            reserveModal.setAttribute('aria-expanded', 'true');
        });

        closeModal.addEventListener('click', function() {
            reserveModal.style.display = 'none';
            reserveModal.setAttribute('aria-hidden', 'true');
            reserveModal.setAttribute('aria-expanded', 'false');
        });

        window.addEventListener('click', function(event) {
            if (event.target == reserveModal) {
                reserveModal.style.display = 'none';
                reserveModal.setAttribute('aria-hidden', 'true');
                reserveModal.setAttribute('aria-expanded', 'false');
            }
        });
    }

    if (footerCtaLink && reserveModal) { // Abrir modal desde el footer
        footerCtaLink.addEventListener('click', function(event) {
            event.preventDefault(); // Evita el salto de ancla
            reserveModal.style.display = 'block';
            reserveModal.setAttribute('aria-hidden', 'false');
            reserveModal.setAttribute('aria-expanded', 'true');
        });
    }


    // 3. Language Switcher (Desktop y Mobile)
    const currentLangDesktop = document.querySelector('.language-switcher-desktop .current-lang');
    const langOptionsDesktop = document.querySelector('.language-switcher-desktop .lang-options');
    const currentLangMobile = document.querySelector('.language-switcher-mobile-standalone .current-lang-mobile');
    const langOptionsMobile = document.querySelector('.language-switcher-mobile-standalone .lang-options-mobile');

    function setupLanguageSwitcher(currentLangElement, optionsElement) {
        if (currentLangElement && optionsElement) {
            currentLangElement.addEventListener('click', function() {
                const isExpanded = currentLangElement.getAttribute('aria-expanded') === 'true';
                currentLangElement.setAttribute('aria-expanded', !isExpanded);
                optionsElement.style.display = isExpanded ? 'none' : 'block';
            });

            document.addEventListener('click', function(event) {
                if (!currentLangElement.contains(event.target) && !optionsElement.contains(event.target)) {
                    currentLangElement.setAttribute('aria-expanded', 'false');
                    optionsElement.style.display = 'none';
                }
            });
        }
    }

    setupLanguageSwitcher(currentLangDesktop, langOptionsDesktop);
    setupLanguageSwitcher(currentLangMobile, langOptionsMobile);


    // 4. Cerrar Top Banner (Asegurando la verificación de existencia)
    const topBanner = document.querySelector('.top-banner');
    const closeBannerBtn = document.querySelector('.close-banner');

    // ESTA ES LA CORRECCIÓN CLAVE: Verificar si los elementos existen
    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', () => {
            topBanner.style.display = 'none';
            localStorage.setItem('bannerClosed', 'true');
        });

        // No mostrar si ya se cerró en una sesión anterior
        if (localStorage.getItem('bannerClosed') === 'true') {
            topBanner.style.display = 'none';
        }
    }

    // 5. Hero Slider (Solo si la página tiene el slider, es decir, index.html)
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) { // Solo ejecuta el código del slider si el contenedor existe
        const slides = document.querySelectorAll('.slide');
        const prevBtn = document.querySelector('.prev-slide');
        const nextBtn = document.querySelector('.next-slide');
        const dotsContainer = document.querySelector('.slider-dots');

        let currentSlide = 0;
        let slideInterval;
        const slideDuration = 5000; // 5 segundos

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

        function updateDots(index) {
            if (dotsContainer) { // Asegura que dotsContainer existe
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, i) => {
                    if (i === index) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }
        }

        function startSlider() {
            clearInterval(slideInterval); // Limpiar cualquier intervalo existente
            slideInterval = setInterval(nextSlide, slideDuration);
        }

        function pauseSlider() {
            clearInterval(slideInterval);
        }

        // Generar puntos de navegación (si el contenedor existe)
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


        // Event listeners para los botones de navegación (si existen)
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
        // Solo si hay slides y botones de navegación
        if (slides.length > 0 && prevBtn && nextBtn) {
            showSlide(currentSlide); // Muestra la primera imagen
            startSlider(); // Inicia la reproducción automática
        }

        // Pausar/Reanudar en hover del slider
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', pauseSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
    } // Fin del if (sliderContainer)

    // Código para el hero de la página de tour (si es una página de tour con video)
    const tourHero = document.querySelector('.tour-hero');
    if (tourHero) {
        const heroContent = $('.tour-hero .hero-content'); // Asegúrate de seleccionar el contenido correcto del hero del tour
        const delayTime = 5000; // 5000 milisegundos = 5 segundos

        setTimeout(function() {
            heroContent.addClass('fade-out');
            // Opcional: Si quieres que desaparezca completamente del flujo del documento
            // y no solo sea transparente, puedes añadir otra clase o usar un set timeout
            // para display: none; después de que la transición CSS haya terminado.
            // setTimeout(function() {
            //     heroContent.css('display', 'none');
            // }, 1000); // 1000ms es la duración de la transición CSS
        }, delayTime);
    }
});
