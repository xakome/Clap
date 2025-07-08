// Asegúrate de que este script se cargue DESPUÉS de jQuery y Slick Carousel en tu HTML.

$(document).ready(function() {
    // --- Funcionalidad del Menú Hamburguesa (ahora con jQuery) ---
    $('.toggle').on('click', function() {
        $('.main-nav').toggleClass('show'); // Usa 'show' para consistencia con CSS
        // Asegurarse de que otros elementos se cierren si están abiertos
        if ($('#reserveModal').hasClass('show')) { // Asumiendo que el modal también tiene 'show'
            $('#reserveModal').fadeOut(); // Usa fadeOut para ocultar el modal jQuery
        }
        $('.language-switcher-desktop .lang-options').hide(); // Oculta opciones de idioma si están abiertas
    });

    // --- Funcionalidad del Modal de Reserva (ahora con jQuery) ---
    $('[data-toggle="modal"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this).data('target');
        $(target).fadeIn(); // Muestra el modal con efecto fade
        $(target).addClass('show'); // Añade clase 'show' para control CSS si es necesario
    });

    $('.modal .close-button').on('click', function() {
        $(this).closest('.modal').fadeOut(); // Oculta el modal con efecto fade
        $(this).closest('.modal').removeClass('show'); // Remueve clase 'show'
    });

    $(window).on('click', function(event) {
        if ($(event.target).is('.modal')) {
            $('.modal').fadeOut(); // Cierra el modal si se hace clic fuera de él
            $('.modal').removeClass('show');
        }
    });

    // --- Funcionalidad del Selector de Idioma (ahora con jQuery) ---
    $('.language-switcher-desktop').on('click', function() {
        $('.lang-options').toggle(); // Alterna la visibilidad de las opciones de idioma
    });

    // --- Inicialización de Slick Carousel para la Galería (Mejorada) ---
    var $galleryCarousel = $('.gallery-carousel');
    var $galleryNavThumbs = $('.gallery-nav-thumbs'); // Suponiendo que tienes un segundo carrusel para miniaturas

    // Configuración para el carrusel principal de la galería
    $galleryCarousel.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false, // Ocultar flechas en el principal si las miniaturas actúan como navegación
        fade: true,
        asNavFor: $galleryNavThumbs.length ? '.gallery-nav-thumbs' : null, // Sincronizar con miniaturas si existen
        dots: true, // Puntos de navegación
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        adaptiveHeight: true,
        lazyLoad: 'ondemand' // Carga las imágenes solo cuando son necesarias
    });

    // Configuración para el carrusel de miniaturas (si existe)
    if ($galleryNavThumbs.length) {
        $galleryNavThumbs.slick({
            slidesToShow: 4, // Muestra 4 miniaturas a la vez
            slidesToScroll: 1,
            asNavFor: '.gallery-carousel', // Sincronizar con el carrusel principal
            dots: false, // Las miniaturas no necesitan sus propios puntos
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            arrows: true, // Puedes querer flechas en las miniaturas
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2
                    }
                }
            ]
        });
    }

    // --- Funcionalidad de Pantalla Completa (Lightbox) con Magnific Popup ---
    // Asegúrate de que Magnific Popup CSS y JS estén cargados en tu HTML
    $('.gallery-carousel').magnificPopup({
        delegate: 'a', // 'a' o 'img' o el selector de tu elemento de imagen
        type: 'image',
        gallery: {
            enabled: true // Habilita la navegación entre imágenes en el lightbox
        },
        image: {
            titleSrc: function(item) {
                // Usa el atributo 'data-caption' o 'alt' de la imagen para el subtítulo
                return item.el.attr('data-caption') || item.el.find('img').attr('alt') || '';
            }
        },
        callbacks: {
            open: function() {
                // Pausa el autoplay de Slick cuando se abre el lightbox
                $galleryCarousel.slick('slickPause');
            },
            close: function() {
                // Reanuda el autoplay de Slick cuando se cierra el lightbox
                $galleryCarousel.slick('slickPlay');
            }
        }
    });

});


// --- Código de Slider Hero (JS nativo, independiente de jQuery/Slick) ---
// Este código es de tu main.js original y no se modifica, ya que es un slider diferente.
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-arrow.prev');
const nextBtn = document.querySelector('.slider-arrow.next');

let currentSlide = 0;
let slideInterval;
const slideDuration = 5000; // 5 segundos

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

// Iniciar el slider al cargar la página (si el slider existe)
if (slides.length > 0) {
    showSlide(currentSlide); // Muestra la primera imagen
    startSlider(); // Inicia la reproducción automática
}


// Pausar/Reanudar en hover del slider (si el slider existe)
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    heroSlider.addEventListener('mouseenter', pauseSlider);
    heroSlider.addEventListener('mouseleave', startSlider);
}
