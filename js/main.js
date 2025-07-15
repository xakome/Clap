document.addEventListener('DOMContentLoaded', function() {
    // 1. Navbar Toggle para móvil y Desktop (para el language-switcher)
    const toggleBtn = document.querySelector('.toggle');
    const mainNav = document.querySelector('.main-nav');
    const desktopLangSwitcher = document.querySelector('.language-switcher-desktop');
    const mobileLangSwitcher = document.querySelector('.language-switcher-mobile-standalone');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            if (mainNav.classList.contains('active')) {
                toggleBtn.innerHTML = '&times;';
                toggleBtn.setAttribute('aria-label', 'Cerrar menú');
            } else {
                toggleBtn.innerHTML = '&#9776;';
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
            }
        });

        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !toggleBtn.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                toggleBtn.innerHTML = '&#9776;';
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
            }
        });
    }

    if (desktopLangSwitcher) {
        desktopLangSwitcher.addEventListener('click', function(event) {
            event.stopPropagation();
            desktopLangSwitcher.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (desktopLangSwitcher.classList.contains('active') && !desktopLangSwitcher.contains(event.target)) {
                desktopLangSwitcher.classList.remove('active');
            }
        });
    }

    if (mobileLangSwitcher) {
        mobileLangSwitcher.addEventListener('click', function(event) {
            event.stopPropagation();
            mobileLangSwitcher.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            if (mobileLangSwitcher.classList.contains('active') && !mobileLangSwitcher.contains(event.target)) {
                mobileLangSwitcher.classList.remove('active');
            }
        });
    }

    const reserveBtn = document.querySelector('.reserve-btn');
    const reserveModal = document.getElementById('reserveModal');
    const closeModal = document.querySelector('.modal .close-button');
    const reserveForm = document.getElementById('reserveForm');

    if (reserveBtn && reserveModal) {
        reserveBtn.setAttribute('aria-label', 'Reservar ahora');
        reserveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            reserveModal.style.display = 'block';
            document.body.classList.add('modal-open');
            reserveModal.setAttribute('aria-hidden', 'false');
            reserveModal.querySelector('.modal-content').focus();
        });
    }

    if (closeModal && reserveModal) {
        closeModal.addEventListener('click', function() {
            reserveModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            reserveModal.setAttribute('aria-hidden', 'true');
        });
    }

    if (reserveModal) {
        window.addEventListener('click', function(event) {
            if (event.target == reserveModal) {
                reserveModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                reserveModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    if (reserveForm) {
        reserveForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(reserveForm);
            const response = await fetch(reserveForm.action, {
                method: reserveForm.method,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                alert('¡Gracias por tu reserva! Nos pondremos en contacto contigo pronto.');
                reserveForm.reset();
                reserveModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                reserveModal.setAttribute('aria-hidden', 'true');
            } else {
                alert('Hubo un error al enviar tu reserva. Por favor, inténtalo de nuevo.');
            }
        });
    }

    const topBanner = document.querySelector('.top-banner');
    const closeBannerBtn = document.querySelector('.top-banner .close-banner-btn');

    if (topBanner && closeBannerBtn) {
        closeBannerBtn.setAttribute('aria-label', 'Cerrar banner');
        closeBannerBtn.addEventListener('click', function() {
            topBanner.style.display = 'none';
            localStorage.setItem('bannerClosed', 'true');
        });

        if (localStorage.getItem('bannerClosed') === 'true') {
            topBanner.style.display = 'none';
        }
    }

    const tourHero = document.querySelector('.tour-hero');
    if (tourHero) {
        const heroContent = tourHero.querySelector('.hero-content');
        const delayTime = 5000;

        setTimeout(function() {
            if (heroContent) {
                heroContent.classList.add('fade-out');
            }
        }, delayTime);
    }

    if (typeof jQuery !== 'undefined' && $.fn.slick) {
        const galleryCarousel = $('.gallery-carousel');
        if (galleryCarousel.length) {
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

    function setupLanguageSwitcher(selector) {
        const switcher = document.querySelector(selector);
        if (switcher) {
            const currentLangDisplay = switcher.querySelector('.current-lang');
            const langOptions = switcher.querySelector('.lang-options');

            if (currentLangDisplay && langOptions) {
                currentLangDisplay.addEventListener('click', function() {
                    langOptions.classList.toggle('show');
                });

                document.addEventListener('click', function(event) {
                    if (!switcher.contains(event.target)) {
                        langOptions.classList.remove('show');
                    }
                });

                langOptions.querySelectorAll('a').forEach(option => {
                    option.setAttribute('role', 'menuitem');
                    option.addEventListener('click', function(e) {
                        e.preventDefault();
                        const newLang = option.getAttribute('data-lang').toUpperCase();
                        currentLangDisplay.innerHTML = `${newLang} <i class="fas fa-chevron-down"></i>`;
                        langOptions.classList.remove('show');
                        console.log(`Idioma cambiado a: ${newLang}`);
                    });
                });
            }
        }
    }

    setupLanguageSwitcher('.language-switcher-desktop');
    setupLanguageSwitcher('.language-switcher-mobile-standalone');
});
