document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica do Carrossel Atualizada ---
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) { 
        const slides = carousel.querySelectorAll('.carousel-slide');
        const nextButton = carousel.querySelector('.carousel-control.next');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const indicators = carousel.querySelectorAll('.indicator');

        let currentIndex = 0;
        let slideInterval;
        const autoplayDelay = 7000; // 7 segundos

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                indicators[index].classList.remove('active');
                
                if (index === currentIndex) {
                    slide.classList.add('active');
                    indicators[index].classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        function startAutoplay() {
            slideInterval = setInterval(nextSlide, autoplayDelay);
        }

        function stopAutoplay() {
            clearInterval(slideInterval);
        }

        // Event Listeners
        nextButton.addEventListener('click', () => {
            stopAutoplay();
            nextSlide();
            startAutoplay();
        });

        prevButton.addEventListener('click', () => {
            stopAutoplay();
            prevSlide();
            startAutoplay();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                stopAutoplay();
                currentIndex = index;
                updateCarousel();
                startAutoplay();
            });
        });

        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);

        // Iniciar autoplay
        startAutoplay();
    }

    // ... (o restante do código permanece igual) ...
});