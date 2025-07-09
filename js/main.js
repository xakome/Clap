document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos los elementos clave
    const mainNav = document.querySelector('.main-nav');
    const toggle = document.querySelector('.toggle');
    const modal = document.getElementById('reserveModal');
    const reserveBtns = document.querySelectorAll('.reserve-btn'); // Selecciona TODOS los botones de reserva
    const closeBtn = modal ? modal.querySelector('.close') : null; // Añade una verificación de si modal existe

    // Top Banner elements
    const topBanner = document.querySelector('.top-banner');
    const closeBannerButton = document.querySelector('.close-banner');

    // Funcionalidad del menú hamburguesa
    if (toggle && mainNav) {
        toggle.addEventListener('click', () => {
            mainNav.classList.toggle('show'); // Ahora togglea la clase 'show' en .main-nav
            // Cierra el modal si está abierto al abrir/cerrar el menú
            if (modal && modal.classList.contains('show')) {
                toggleModal();
            }
        });
    }

    // Funcionalidad del Modal
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

    // Funcionalidad del Top Banner
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

    // Funcionalidad del selector de idioma
    const languageSwitcherDesktop = document.querySelector('.language-switcher-desktop');
    if (languageSwitcherDesktop) {
        const currentLangDesktop = languageSwitcherDesktop.querySelector('.current-lang');
        if (currentLangDesktop) {
            currentLangDesktop.addEventListener('click', () => {
                languageSwitcherDesktop.classList.toggle('active');
            });
        }
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!languageSwitcherDesktop.contains(event.target) && languageSwitcherDesktop.classList.contains('active')) {
                languageSwitcherDesktop.classList.remove('active');
            }
        });
    }

    const languageSwitcherMobile = document.querySelector('.language-switcher-mobile-standalone');
    if (languageSwitcherMobile) {
        const currentLangMobile = languageSwitcherMobile.querySelector('.current-lang-mobile');
        if (currentLangMobile) {
            currentLangMobile.addEventListener('click', (event) => {
                event.stopPropagation(); // Evita que el clic se propague al document y cierre inmediatamente
                languageSwitcherMobile.classList.toggle('active');
            });
        }
        // Cerrar al hacer clic fuera
        document.addEventListener('click', (event) => {
            if (!languageSwitcherMobile.contains(event.target) && languageSwitcherMobile.classList.contains('active')) {
                languageSwitcherMobile.classList.remove('active');
            }
        });
    }
});
