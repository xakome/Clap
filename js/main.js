document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Toggle para móvil y Desktop (para el language-switcher)
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
    
      // Selector de idioma (ESCRITORIO)
const desktopLangSwitcher = document.querySelector('.language-switcher-desktop');
if (desktopLangSwitcher) {
    const currentLangBtn = desktopLangSwitcher.querySelector('.current-lang');
    currentLangBtn.addEventListener('click', function (e) {
        e.stopPropagation(); // Evita que se cierre por clic fuera
        desktopLangSwitcher.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!desktopLangSwitcher.contains(e.target)) {
            desktopLangSwitcher.classList.remove('active');
        }
    });
}

// Selector de idioma (MÓVIL)
const mobileLangSwitcher = document.querySelector('.language-switcher-mobile-standalone');
if (mobileLangSwitcher) {
    const currentLangMobile = mobileLangSwitcher.querySelector('.current-lang-mobile');
    currentLangMobile.addEventListener('click', function (e) {
        e.stopPropagation(); // Evita que se cierre por clic fuera
        mobileLangSwitcher.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        if (!mobileLangSwitcher.contains(e.target)) {
            mobileLangSwitcher.classList.remove('active');
        }
    });
}



        
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
    const closeModal = document.querySelector('.modal .close-button');
    const reserveForm = document.getElementById('reserveForm');

    // Abre el modal al hacer clic en el botón de reserva
    if (reserveBtn && reserveModal) {
        reserveBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Previene la acción por defecto del botón
            reserveModal.style.display = 'block';
            document.body.classList.add('modal-open'); // Agrega clase para prevenir scroll
            reserveModal.setAttribute('aria-hidden', 'false');
            reserveModal.querySelector('.modal-content').focus(); // Mover el foco al contenido del modal
        });
    }

    // Cierra el modal al hacer clic en la 'X'
    if (closeModal && reserveModal) {
        closeModal.addEventListener('click', function() {
            reserveModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            reserveModal.setAttribute('aria-hidden', 'true');
        });
    }

    // Cierra el modal al hacer clic fuera del contenido
    if (reserveModal) {
        window.addEventListener('click', function(event) {
            if (event.target == reserveModal) {
                reserveModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                reserveModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Manejo del formulario de reserva
    if (reserveForm) {
        reserveForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Detener el envío por defecto del formulario

            const formData = new FormData(reserveForm);
            const response = await fetch(reserveForm.action, {
                method: reserveForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json' // Importante para que Formspree responda JSON
                }
            });

            if (response.ok) {
                alert('¡Gracias por tu reserva! Nos pondremos en contacto contigo pronto.');
                reserveForm.reset(); // Limpiar el formulario
                reserveModal.style.display = 'none'; // Cerrar el modal
                document.body.classList.remove('modal-open');
                reserveModal.setAttribute('aria-hidden', 'true');
            } else {
                alert('Hubo un error al enviar tu reserva. Por favor, inténtalo de nuevo.');
            }
        });
    }

    // 3. Funcionalidad del Banner Superior
    const topBanner = document.querySelector('.top-banner');
    const closeBannerBtn = document.querySelector('.top-banner .close-banner-btn');

    if (topBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
            // También puedes usar localStorage para recordar que el usuario cerró el banner
            localStorage.setItem('bannerClosed', 'true');
        });

        // Opcional: Si quieres que el banner no aparezca si ya se cerró antes
        if (localStorage.getItem('bannerClosed') === 'true') {
            topBanner.style.display = 'none';
        }
    }

    // 4. Slider de la Portada (index.html)
    const sliderContainer = document.querySelector('.home-hero-slider');
    let currentSlide = 0;
    let slideInterval;

    if (sliderContainer) {
        const slides = document.querySelectorAll('.home-hero-slide');
        const prevBtn = document.querySelector('.home-hero-slider .prev-slide');
        const nextBtn = document.querySelector('.home-hero-slider .next-slide');
        const dotsContainer = document.querySelector('.home-hero-dots');

        // Crear los puntos (dots) de navegación
        if (dotsContainer) {
            slides.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    showSlide(index);
                    resetSlider();
                });
                dotsContainer.appendChild(dot);
            });
        }
        const dots = document.querySelectorAll('.home-hero-dots .dot');

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (dots[i]) dots[i].classList.remove('active');
            });
            slides[index].classList.add('active');
            if (dots[index]) dots[index].classList.add('active');
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
            slideInterval = setInterval(nextSlide, 5000); // Cambia de slide cada 5 segundos
        }

        function pauseSlider() {
            clearInterval(slideInterval);
        }

        function resetSlider() {
            pauseSlider();
            startSlider();
        }

        // Event Listeners para botones de navegación
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                resetSlider();
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                resetSlider();
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

    // 5. Código para el hero de la página de tour (si es una página de tour con video)
    const tourHero = document.querySelector('.tour-hero');
    if (tourHero) {
        const heroContent = tourHero.querySelector('.hero-content'); // Selecciona el contenido del hero del tour
        const delayTime = 5000; // 5000 milisegundos = 5 segundos

        setTimeout(function() {
            if (heroContent) { // Asegurarse de que el elemento exista antes de manipularlo
                heroContent.classList.add('fade-out');
            }
        }, delayTime);
    }

    // 6. Inicialización de Slick Carousel para la galería (chichen.html y otras páginas de tours)
    // Asegúrate de haber incluido los scripts de jQuery y Slick en tu HTML ANTES de main.js
    // <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    // <script src="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js"></script>

    if (typeof jQuery !== 'undefined' && $.fn.slick) { // Verifica que jQuery y Slick estén cargados
        const galleryCarousel = $('.gallery-carousel');
        if (galleryCarousel.length) { // Solo inicializa si el elemento existe en la página
            galleryCarousel.slick({
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
    } else {
        console.warn("jQuery o Slick Carousel no están cargados. El carrusel de la galería no se inicializará.");
    }

    // 7. Language Switcher (Desktop y Mobile)
    function setupLanguageSwitcher(selector) {
        const switcher = document.querySelector(selector);
        if (switcher) {
            const currentLangDisplay = switcher.querySelector('.current-lang');
            const langOptions = switcher.querySelector('.lang-options');

            if (currentLangDisplay && langOptions) {
                currentLangDisplay.addEventListener('click', function() {
                    langOptions.classList.toggle('show'); // Usa una clase para mostrar/ocultar
                });

                // Cerrar al hacer clic fuera
                document.addEventListener('click', function(event) {
                    if (!switcher.contains(event.target)) {
                        langOptions.classList.remove('show');
                    }
                });

                // Aquí podrías añadir lógica para cambiar realmente el idioma,
                // por ahora solo es un toggle visual.
                langOptions.querySelectorAll('a').forEach(option => {
                    option.addEventListener('click', function(e) {
                        e.preventDefault();
                        const newLang = option.getAttribute('data-lang').toUpperCase();
                        currentLangDisplay.innerHTML = `${newLang} <i class="fas fa-chevron-down"></i>`;
                        langOptions.classList.remove('show');
                        // Lógica para cambiar la URL o cargar contenido traducido
                        console.log(`Idioma cambiado a: ${newLang}`);
                        // Ejemplo: window.location.href = `/${newLang.toLowerCase()}/` + window.location.pathname.split('/').slice(2).join('/');
                    });
                });
            }
        }
    }

    setupLanguageSwitcher('.language-switcher-desktop');
    setupLanguageSwitcher('.language-switcher-mobile-standalone');


});
