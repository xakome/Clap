document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Toggle para móvil
    const toggleBtn = document.querySelector('.toggle');
    const mainNav = document.querySelector('.main-nav');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', function() {
            const isActive = mainNav.classList.toggle('active');
            // Cambiar el ícono de la hamburguesa a X y viceversa y actualizar ARIA
            if (isActive) {
                toggleBtn.innerHTML = '&times;'; // Cambia a una 'X'
                toggleBtn.setAttribute('aria-label', 'Cerrar menú');
                toggleBtn.setAttribute('aria-expanded', 'true'); // Menú abierto
            } else {
                toggleBtn.innerHTML = '&#9776;'; // Vuelve al ícono de hamburguesa
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
                toggleBtn.setAttribute('aria-expanded', 'false'); // Menú cerrado
            }
        });

        // Cerrar menú al hacer clic fuera (si el menú está abierto)
        document.addEventListener('click', function(event) {
            // Asegúrate de que el clic no sea dentro del mainNav ni del botón toggle
            if (mainNav.classList.contains('active') && !mainNav.contains(event.target) && !toggleBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                toggleBtn.innerHTML = '&#9776;'; // Vuelve al ícono de hamburguesa
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
                toggleBtn.setAttribute('aria-expanded', 'false'); // Menú cerrado
            }
        });
    }

    // 2. Modal de Reserva
    const reserveBtn = document.querySelector('.reserve-btn');
    const reserveModal = document.getElementById('reserveModal');
    // Selector corregido para el botón de cerrar
    const closeModal = document.querySelector('.modal .close-button');

    // Atributos para gestión de foco del modal
    const focusableElementsString = 'a[href]:not([disabled]), area[href]:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe:not([disabled]), object:not([disabled]), embed:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled]), [contenteditable]:not([disabled])';
    let lastFocusedElement; // Para almacenar el elemento que tenía el foco antes de abrir el modal

    if (reserveBtn && reserveModal && closeModal) {
        // Función para abrir el modal
        reserveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            lastFocusedElement = document.activeElement; // Guarda el elemento que tenía el foco
            reserveModal.classList.add('show');
            reserveModal.setAttribute('aria-hidden', 'false'); // Muestra el modal a los lectores de pantalla
            reserveBtn.setAttribute('aria-expanded', 'true'); // Indica que el botón disparó un elemento expandido

            // Mueve el foco al primer elemento enfocable dentro del modal
            const firstFocusableElement = reserveModal.querySelector(focusableElementsString);
            if (firstFocusableElement) {
                firstFocusableElement.focus();
            } else {
                // Si no hay elementos enfocables, el foco se mantiene en el modal (asegúrate que el modal tenga tabindex="-1" si es necesario)
                reserveModal.focus();
            }
        });

        // Función para cerrar el modal (reutilizable)
        function closeReserveModal() {
            reserveModal.classList.remove('show');
            reserveModal.setAttribute('aria-hidden', 'true'); // Oculta el modal a los lectores de pantalla
            reserveBtn.setAttribute('aria-expanded', 'false'); // Indica que el elemento expandido está ahora colapsado

            if (lastFocusedElement) {
                lastFocusedElement.focus(); // Restaura el foco al elemento que abrió el modal
            }
        }

        closeModal.addEventListener('click', closeReserveModal);

        // Cerrar modal al hacer clic en el fondo
        reserveModal.addEventListener('click', function(event) {
            if (event.target === reserveModal) { // Solo si se clica directamente en el fondo del modal
                closeReserveModal();
            }
        });

        // Manejo del teclado para el modal (escape y trampas de foco)
        reserveModal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableElements = Array.from(reserveModal.querySelectorAll(focusableElementsString));
                if (focusableElements.length === 0) { // Si no hay elementos enfocables dentro del modal, evita que el tab salga
                    e.preventDefault();
                    return;
                }
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
            } else if (e.key === 'Escape') { // Cerrar modal con la tecla Escape
                closeReserveModal();
            }
        });
    }

    // 3. Lógica para los Selectores de Idioma (Refactorizada y mejorada para ARIA)
    function setupLanguageSwitcher(selector) {
        const switcher = document.querySelector(selector);
        if (switcher) {
            // currentLangBtn es ahora un <button>
            const currentLangBtn = switcher.querySelector('button.current-lang, button.current-lang-mobile');
            // langOptions es el div que contiene los role="menuitem"
            const langOptions = switcher.querySelector('[role="menu"]');

            if (currentLangBtn && langOptions) {
                // Estado inicial: menú de idioma oculto
                currentLangBtn.setAttribute('aria-expanded', 'false');
                langOptions.setAttribute('aria-hidden', 'true');
                langOptions.style.display = 'none'; // Asegura que esté oculto por CSS

                currentLangBtn.addEventListener('click', function(event) {
                    event.stopPropagation(); // Evita que el clic propague y cierre inmediatamente
                    const isExpanded = currentLangBtn.getAttribute('aria-expanded') === 'true';
                    currentLangBtn.setAttribute('aria-expanded', !isExpanded); // Toggle aria-expanded
                    langOptions.setAttribute('aria-hidden', isExpanded); // Toggle aria-hidden
                    langOptions.style.display = isExpanded ? 'none' : 'block'; // Toggle visual display
                });

                // Cerrar al hacer clic fuera del switcher de idioma
                document.addEventListener('click', function(event) {
                    // Si el switcher está activo (abierto) y el clic no fue dentro de él
                    if (currentLangBtn.getAttribute('aria-expanded') === 'true' && !switcher.contains(event.target)) {
                        currentLangBtn.setAttribute('aria-expanded', 'false');
                        langOptions.setAttribute('aria-hidden', 'true');
                        langOptions.style.display = 'none';
                    }
                });

                // Manejar clic en las opciones del menú de idioma
                langOptions.querySelectorAll('[role="menuitem"]').forEach(option => {
                    option.addEventListener('click', function(e) {
                        // e.preventDefault(); // Descomenta si no quieres que el enlace navegue inmediatamente
                        const newLangText = option.textContent.trim();
                        currentLangBtn.innerHTML = `${newLangText} <i class="fas fa-chevron-down"></i>`; // Actualiza el texto del botón
                        currentLangBtn.setAttribute('aria-expanded', 'false');
                        langOptions.setAttribute('aria-hidden', 'true');
                        langOptions.style.display = 'none';
                        // Aquí puedes añadir lógica para cambiar la URL o cargar contenido traducido
                        // Por ejemplo: window.location.href = option.href;
                    });
                });
            }
        }
    }

    // Aplica la lógica a ambos selectores de idioma
    setupLanguageSwitcher('.language-switcher-desktop');
    setupLanguageSwitcher('.language-switcher-mobile-standalone');


    // 4. Lógica para el Hero Slider (se mantiene tu lógica actual, con mejoras ARIA)
    const sliderContainer = document.querySelector('.hero-slider');

    if (sliderContainer) {
        const slides = Array.from(sliderContainer.querySelectorAll('.slide'));
        const prevBtn = sliderContainer.querySelector('.slider-nav .prev');
        const nextBtn = sliderContainer.querySelector('.slider-nav .next');
        const dotsContainer = sliderContainer.querySelector('.slider-dots'); // El contenedor de los puntos
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                slide.setAttribute('aria-hidden', 'true'); // Ocultar slides inactivos
                if (dotsContainer) {
                    const dot = dotsContainer.children[i];
                    if (dot) {
                        dot.classList.remove('active');
                        dot.setAttribute('aria-current', 'false'); // Marcar dot como inactivo
                    }
                }
            });

            slides[index].classList.add('active');
            slides[index].setAttribute('aria-hidden', 'false'); // Mostrar slide activo
            if (dotsContainer) {
                const activeDot = dotsContainer.children[index];
                if (activeDot) {
                    activeDot.classList.add('active');
                    activeDot.setAttribute('aria-current', 'true'); // Indicar dot activo
                }
            }
            currentSlide = index;
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
            stopSlider(); // Clear any existing interval
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        // Event Listeners para los botones de navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        // Crear puntos de navegación dinámicamente y añadirles ARIA
        if (slides.length > 0 && dotsContainer) {
            dotsContainer.innerHTML = ''; // Limpiar puntos existentes
            slides.forEach((_, i) => {
                const dot = document.createElement('button'); // Usar <button> para los dots para mejor accesibilidad
                dot.classList.add('dot');
                dot.setAttribute('type', 'button'); // Asegura que se comporta como botón
                dot.setAttribute('aria-label', `Ir a la diapositiva ${i + 1}`); // Etiqueta descriptiva
                dot.setAttribute('role', 'tab'); // Rol ARIA para navegación de pestañas/dots
                // Opcional: asociar con el ID de la diapositiva si las tienes, por ejemplo: dot.setAttribute('aria-controls', `slide${i + 1}`);
                dot.addEventListener('click', () => showSlide(i));
                dotsContainer.appendChild(dot);
            });
            showSlide(currentSlide); // Asegura que el punto correcto esté activo inicialmente
        }

        // Iniciar el slider al cargar la página
        if (slides.length > 0) { // Asegúrate de que es el slider principal
             showSlide(currentSlide); // Muestra la primera imagen
             startSlider(); // Inicia la reproducción automática
        }

        // Pausar/Reanudar en hover del slider (corregido de pauseSlider a stopSlider)
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
    }

    // 5. Inicialización de Slick Carousel para la Galería (si se usa)
    // Este código DEBE estar aquí si usas Slick Carousel en tus páginas
    // Asegúrate de que jQuery esté cargado ANTES de este script.
    const galleryCarousel = document.querySelector('.gallery-carousel');
    if (galleryCarousel && typeof jQuery !== 'undefined' && typeof jQuery.fn.slick !== 'undefined') {
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

    // Código para el hero de la página de tour (si es una página de tour con video)
    const tourHero = document.querySelector('.tour-hero');
    if (tourHero) {
        const heroContent = document.querySelector('.tour-hero .hero-content');
        const delayTime = 5000;

        setTimeout(function() {
            if (heroContent) {
                heroContent.classList.add('fade-out');
            }
        }, delayTime);
    }
});
