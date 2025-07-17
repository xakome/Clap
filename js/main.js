document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.querySelector('.toggle');
    const mainNav = document.querySelector('.main-nav');

    if (toggleBtn && mainNav) {
        toggleBtn.addEventListener('click', function () {
            mainNav.classList.toggle('active');
            toggleBtn.innerHTML = mainNav.classList.contains('active') ? '&times;' : '&#9776;';
            toggleBtn.setAttribute('aria-label', mainNav.classList.contains('active') ? 'Cerrar menú' : 'Mostrar menú');
        });

        document.addEventListener('click', function (event) {
            if (!mainNav.contains(event.target) && !toggleBtn.contains(event.target) && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                toggleBtn.innerHTML = '&#9776;';
                toggleBtn.setAttribute('aria-label', 'Mostrar menú');
            }
        });
    }

    const reserveBtn = document.querySelector('.reserve-btn');
    const reserveModal = document.getElementById('reserveModal');
    const closeModal = document.querySelector('.modal .close-button');
    const reserveForm = document.getElementById('reserveForm');

    if (reserveBtn && reserveModal) {
        reserveBtn.setAttribute('aria-label', 'Reservar ahora');
        reserveBtn.addEventListener('click', function (e) {
            e.preventDefault();
            reserveModal.style.display = 'block';
            document.body.classList.add('modal-open');
            reserveModal.setAttribute('aria-hidden', 'false');
            reserveModal.querySelector('.modal-content').focus();
        });
    }

    if (closeModal && reserveModal) {
        closeModal.addEventListener('click', function () {
            reserveModal.style.display = 'none';
            document.body.classList.remove('modal-open');
            reserveModal.setAttribute('aria-hidden', 'true');
        });
    }

    if (reserveModal) {
        window.addEventListener('click', function (event) {
            if (event.target == reserveModal) {
                reserveModal.style.display = 'none';
                document.body.classList.remove('modal-open');
                reserveModal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    if (reserveForm) {
        reserveForm.addEventListener('submit', async function (event) {
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
        closeBannerBtn.addEventListener('click', function () {
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
        setTimeout(() => {
            if (heroContent) heroContent.classList.add('fade-out');
        }, 5000);
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
            adaptiveHeight: false,
            pauseOnFocus: false,
            pauseOnHover: false,
            pauseOnDotsHover: false
        });

        const modal = document.getElementById('fullscreenCarouselModal');
        const closeBtn = modal.querySelector('.fullscreen-close');
        const fullscreenContainer = modal.querySelector('.fullscreen-carousel');

        document.querySelectorAll('.gallery-carousel .gallery-item-frame img').forEach(img => {
            img.addEventListener('click', () => {
                fullscreenContainer.innerHTML = '';

                // Crear un nuevo carrusel vacío
                const newCarousel = document.createElement('div');
                newCarousel.classList.add('gallery-carousel');

                // Clonar solo los slides (no el carrusel entero con Slick activo)
                document.querySelectorAll('.gallery-carousel .gallery-item-frame').forEach(slide => {
                    newCarousel.appendChild(slide.cloneNode(true));
                });

                fullscreenContainer.appendChild(newCarousel);

                // Inicializar Slick en el nuevo carrusel
                $(newCarousel).slick({
                    dots: true,
                    infinite: true,
                    arrows: true
                });

                modal.style.display = 'flex';
            });
        });

        function closeFullscreenCarousel() {
            modal.style.display = 'none';
            $('.fullscreen-carousel .gallery-carousel').slick('unslick');
            fullscreenContainer.innerHTML = '';
        }

        closeBtn.addEventListener('click', closeFullscreenCarousel);
        document.addEventListener('keydown', function (e) {
            if (e.key === "Escape") closeFullscreenCarousel();
        });
    }
}

    setupLanguageSwitcher('.language-switcher-desktop');
    setupLanguageSwitcher('.language-switcher-mobile-standalone');

    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
            const clickedBox = e.target.closest('.tour-box');
            if (!clickedBox) return;
            if (!clickedBox.classList.contains('hovered')) {
                e.preventDefault();
                document.querySelectorAll('.tour-box.hovered').forEach(box => box.classList.remove('hovered'));
                clickedBox.classList.add('hovered');
                console.log("🟡 Primer toque: hover activado");
                setTimeout(() => clickedBox.classList.remove('hovered'), 5000);
            } else {
                console.log("🟢 Segundo toque: redirigiendo a", clickedBox.href);
                window.location.href = clickedBox.href;
            }
        }
    });
});
