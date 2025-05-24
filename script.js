document.addEventListener('DOMContentLoaded', function() {
    // ================ CARROSSEL ================
    const carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const nextButton = carousel.querySelector('.carousel-control.next');
        const prevButton = carousel.querySelector('.carousel-control.prev');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentIndex = 0;
        let slideInterval;
        const autoplayDelay = 8000;

        // Controles de Toque
        let touchStartX = 0;
        let touchEndX = 0;

        const handleTouchStart = (e) => {
            touchStartX = e.changedTouches[0].screenX;
        };

        const handleTouchEnd = (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextSlide();
            if (touchEndX - touchStartX > 50) prevSlide();
        };

        // Atualizar controles
        function updateControls() {
            const isMobile = window.innerWidth <= 768;
            nextButton.style.display = isMobile ? 'none' : 'flex';
            prevButton.style.display = isMobile ? 'none' : 'flex';
        }

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.style.opacity = index === currentIndex ? 1 : 0;
                indicators[index].classList.toggle('active', index === currentIndex);
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
        carousel.addEventListener('touchstart', handleTouchStart);
        carousel.addEventListener('touchend', handleTouchEnd);
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

        // Inicialização
        updateControls();
        updateCarousel();
        startAutoplay();
        window.addEventListener('resize', updateControls);
    }

    // ================ MENU MOBILE ================
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    const navOverlay = document.createElement('div');
    navOverlay.className = 'nav-overlay';
    document.body.appendChild(navOverlay);

    // Fechar Menu
    const closeMenu = () => {
        mainNav.classList.remove('active');
        menuToggle.innerHTML = '☰';
        navOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.removeEventListener('touchmove', handleTouchScroll);
    };

    // Fechar ao Scrollar
    const handleTouchScroll = (e) => {
        if (!mainNav.contains(e.target)) closeMenu();
    };

    // Alternar Menu
    function toggleMenu() {
        const isActive = mainNav.classList.toggle('active');
        menuToggle.innerHTML = isActive ? '&times;' : '☰';
        navOverlay.style.display = isActive ? 'block' : 'none';
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
        
        if (isActive) {
            document.addEventListener('touchmove', handleTouchScroll, { passive: true });
        } else {
            document.removeEventListener('touchmove', handleTouchScroll);
        }
    }

    // Event listeners
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', closeMenu);
        navLinks.forEach(link => link.addEventListener('click', closeMenu));
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // ================ FECHAR MENU AO SCROLLAR ================
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (Math.abs(currentScroll - lastScroll) > 50 && mainNav.classList.contains('active')) {
            closeMenu();
        }
        lastScroll = currentScroll;
    }, { passive: true });

    // ================ BOTÃO WHATSAPP ================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (whatsappFloat) {
        let timeout;
        const resetAnimation = () => {
            whatsappFloat.style.animation = 'none';
            void whatsappFloat.offsetWidth;
            whatsappFloat.style.animation = null;
        };

        window.addEventListener('scroll', () => {
            clearTimeout(timeout);
            whatsappFloat.style.opacity = '0.5';
            timeout = setTimeout(() => {
                whatsappFloat.style.opacity = '1';
                resetAnimation();
            }, 200);
        });
    }
});