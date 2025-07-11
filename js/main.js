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
            // Asegúrate de que el clic no sea dentro del mainNav ni del botón toggle
            if (mainNav.classList.contains('active') && !mainNav.contains(event.target) && !toggleBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                toggleBtn.innerHTML = '&#9776;'; // Vuelve al ícono de hamburguesa
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
            }
        });
    }

    // 2. Modal de Reserva
    const reserveBtn = document.querySelector('.reserve-btn');
    const reserveModal = document.getElementById('reserveModal');
    // Asegúrate de que el botón de cerrar sea el correcto dentro del modal
    const closeModal = document.querySelector('.modal .close'); // Selector para el span 'times' de cerrar

    if (reserveBtn && reserveModal && closeModal) {
        reserveBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Previene la acción por defecto del botón
            reserveModal.classList.add('show'); // Añade la clase 'show' para mostrar el modal
        });

        closeModal.addEventListener('click', function() {
            reserveModal.classList.remove('show'); // Quita la clase 'show' para ocultar
        });

        // Cerrar modal al hacer clic en el fondo
        reserveModal.addEventListener('click', function(event) {
            if (event.target === reserveModal) { // Solo si se clica directamente en el fondo del modal
                reserveModal.classList.remove('show');
            }
        });
    }


    // 3. Lógica para los Selectores de Idioma (Fuera del bloque del Navbar Toggle)
    const desktopLangSwitcher = document.querySelector('.language-switcher-desktop');
    const mobileLangSwitcher = document.querySelector('.language-switcher-mobile-standalone');

    // Función para manejar el clic en los selectores de idioma
    function handleLanguageSwitcherClick(switcher) {
        if (switcher) {
            switcher.addEventListener('click', function(event) {
                event.stopPropagation(); // Evita que el clic propague y cierre otros elementos o el propio menú si se hace clic fuera
                switcher.classList.toggle('active'); // Alterna la clase 'active' en el contenedor padre
            });
        }
    }

    // Aplica la lógica a ambos selectores
    handleLanguageSwitcherClick(desktopLangSwitcher);
    handleLanguageSwitcherClick(mobileLangSwitcher);

    // Cerrar selectores de idioma al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (desktopLangSwitcher && desktopLangSwitcher.classList.contains('active') && !desktopLangSwitcher.contains(event.target)) {
            desktopLangSwitcher.classList.remove('active');
        }
        if (mobileLangSwitcher && mobileLangSwitcher.classList.contains('active') && !mobileLangSwitcher.contains(event.target)) {
            mobileLangSwitcher.classList.remove('active');
        }
    });

    // Lógica para cambiar el idioma (opcional, si quieres que los enlaces cambien algo)
    // Esto es solo para ejemplo, la implementación real dependerá de cómo cambies el idioma de tu sitio
    if (desktopLangSwitcher) {
        desktopLangSwitcher.querySelectorAll('.lang-options a').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                // Aquí iría tu lógica para cambiar el idioma real
                console.log('Idioma seleccionado:', option.textContent);
                desktopLangSwitcher.classList.remove('active'); // Cierra el menú después de seleccionar
            });
        });
    }
    if (mobileLangSwitcher) {
        mobileLangSwitcher.querySelectorAll('.lang-options-mobile a').forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                // Aquí iría tu lógica para cambiar el idioma real
                console.log('Idioma seleccionado (móvil):', option.textContent);
                mobileLangSwitcher.classList.remove('active'); // Cierra el menú después de seleccionar
            });
        });
    }


    // --- Hero Slider Logic ---
    const sliderContainer = document.querySelector('.hero-slider');
    if (sliderContainer) {
        const slides = document.querySelectorAll('.hero-slider .slide');
        const prevBtn = document.querySelector('.slider-nav .prev');
        const nextBtn = document.querySelector('.slider-nav .next');
        const dotsContainer = document.querySelector('.slider-dots');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dotsContainer && dotsContainer.children[i]) {
                    dotsContainer.children[i].classList.remove('active');
                }
            });
            slides[index].classList.add('active');
            if (dotsContainer && dotsContainer.children[index]) {
                dotsContainer.children[index].classList.add('active');
            }
            currentSlide = index;
        }

        function nextSlide() {
            showSlide((currentSlide + 1) % slides.length);
        }

        function prevSlide() {
            showSlide((currentSlide - 1 + slides.length) % slides.length);
        }

        function startSlider() {
            stopSlider(); // Clear any existing interval
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }

        function stopSlider() {
            clearInterval(slideInterval);
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }

        // Create dots
        if (slides.length > 0 && dotsContainer) {
            dotsContainer.innerHTML = ''; // Clear existing dots
            slides.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                dot.setAttribute('data-slide-to', i);
                dot.addEventListener('click', () => showSlide(i));
                dotsContainer.appendChild(dot);
            });
            showSlide(currentSlide); // Ensure the correct dot is active initially
        }

        // Iniciar el slider al cargar la página
        if (slides.length > 0) {
             showSlide(currentSlide); // Muestra la primera imagen
             startSlider(); // Inicia la reproducción automática
        }

        // Pausar/Reanudar en hover del slider
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', pauseSlider);
            sliderContainer.addEventListener('mouseleave', startSlider);
        }
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
