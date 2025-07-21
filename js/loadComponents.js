document.addEventListener("DOMContentLoaded", function() {
    // Función para cargar componentes HTML
    function loadComponent(placeholderId, filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    // Si la respuesta no es exitosa (ej. 404 Not Found)
                    throw new Error(`HTTP error! status: ${response.status} from ${filePath}`);
                }
                return response.text();
            })
            .then(html => {
                document.getElementById(placeholderId).innerHTML = html;
            })
            .catch(error => console.error(`Error loading component ${filePath}:`, error));
    }

    // Cargar la navegación
    // Asegúrate de que la ruta sea correcta. Si nav.html está en la raíz, usa '/nav.html'
    // Si la página chichen.html está en /es/tours/, entonces la ruta relativa a la raíz es '../../nav.html'
    // O mejor, una ruta absoluta desde la raíz del sitio si estás seguro de la base URL
    loadComponent('navbar-placeholder', '/nav.html'); // Ruta desde la raíz del dominio para GitHub Pages

    // Cargar el pie de página
    // Similar a la navegación, ajusta la ruta si es necesario
    loadComponent('footer-placeholder', '/footer.html'); // Ruta desde la raíz del dominio para GitHub Pages


    // Aquí iría el resto de tu código JavaScript que ya tienes en main.js,
    // por ejemplo, la lógica del slider, el toggle del menú, el modal de reserva, etc.

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
    document.querySelector('.next-slide').addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    document.querySelector('.prev-slide').addEventListener('click', () => {
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

    // --- Lógica existente de main.js para el modal de reserva ---
    const reserveBtn = document.querySelector('.reserve-btn');
    const modal = document.getElementById('reserveModal');
    const closeModal = document.querySelector('#reserveModal .close');

    if (reserveBtn && modal && closeModal) {
        reserveBtn.addEventListener('click', () => {
            modal.style.display = 'block';
            document.body.classList.add('modal-open'); // Para evitar scroll del body
            modal.setAttribute('aria-hidden', 'false');
            reserveBtn.setAttribute('aria-expanded', 'true');
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            modal.setAttribute('aria-hidden', 'true');
            reserveBtn.setAttribute('aria-expanded', 'false');
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
                document.body.classList.remove('modal-open');
                modal.setAttribute('aria-hidden', 'true');
                reserveBtn.setAttribute('aria-expanded', 'false');
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
            mobileCurrentLang.setAttribute('aria-expanded', mobileLangOptions.classList.contains('show') ? 'true' : 'false');
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

}); // Fin de DOMContentLoaded
