document.addEventListener('DOMContentLoaded', function() {
    // ================ CARROSSEL (MOBILE FIX) ================
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const nextButton = carousel.querySelector('.carousel-control.next');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;
        let slideInterval;
        const autoplayDelay = 8000;

        // Função de toque para mobile
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide(); // Deslize para esquerda
            if (touchEndX - touchStartX > 50) prevSlide(); // Deslize para direita
        };

        // Atualizar controles
        function updateControls() {
            const isMobile = window.innerWidth <= 768;
            nextButton.style.display = isMobile ? 'none' : 'flex';
            prevButton.style.display = isMobile ? 'none' : 'flex';
        }

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.style.opacity = 0;
                slide.style.transition = 'opacity 1s ease-in-out';
                indicators[index].classList.remove('active');
                
                if (index === currentIndex) {
                    setTimeout(() => slide.style.opacity = 1, 50);
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

        // Event listeners
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

        // Eventos de toque
        carousel.addEventListener('touchstart', handleTouchStart, false);
        carousel.addEventListener('touchend', handleTouchEnd, false);

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

        // Inicialização
        updateControls();
        updateCarousel();
        startAutoplay();
        window.addEventListener('resize', updateControls);
    }

    // ================ HEADER MOBILE (CORREÇÕES) ================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Função de toggle
    function toggleMenu() {
        const isActive = mainNav.classList.toggle('active');
        menuToggle.innerHTML = isActive ? '&times;' : '☰';
        navOverlay.style.display = isActive ? 'block' : 'none';
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    }

    // Event listeners
    if (menuToggle && mainNav) {
        // Clique/toque no botão
        menuToggle.addEventListener('click', toggleMenu);
        menuToggle.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Fechar menu
        const closeMenu = () => {
            mainNav.classList.remove('active');
            menuToggle.innerHTML = '☰';
            navOverlay.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        // Overlay
        navOverlay.addEventListener('click', closeMenu);
        navOverlay.addEventListener('touchstart', closeMenu);

        // Links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
            link.addEventListener('touchstart', (e) => {
                e.preventDefault();
                closeMenu();
            });
        });

        // Redimensionamento
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // ... (Restante do código de scroll e outras funcionalidades) ...
});