<script>
    // Preloader
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 1000);
        }
    });

    // Hero Carousel
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    const indicators = document.querySelectorAll('.carousel-indicator');
    const totalSlides = slides.length;

    function showSlide(index) {
        if (!slides.length || !indicators.length) return;
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        currentSlide = (index + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    // Initialize first slide state explicitly
    showSlide(0);

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Auto-advance carousel every 5 seconds
    if (totalSlides > 1) {
        setInterval(nextSlide, 5000);
    }

    // Indicator click handlers
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        // Defensive parsing for numbers
        function getNumber(text) {
            // Remove commas, spaces, and non-numeric chars except for dot
            return Number(String(text).replace(/[^0-9.]/g, ''));
        }

        const animate = () => {
            const value = getNumber(counter.getAttribute('data-target') || '0');
            let data = getNumber(counter.innerText);
            if (isNaN(value)) return; // Skip if data-target is not a number

            // Make sure time is at least 1 so it's always incrementing
            const time = Math.max(1, value / 200);

            if (data < value) {
                counter.innerText = Math.ceil(data + time);
                setTimeout(animate, 1);
            } else {
                counter.innerText = value;
            }
        };

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    if (mobileMenu && mobileNavPanel) {
        mobileMenu.addEventListener('click', () => {
            mobileNavPanel.classList.toggle('hidden');
        });
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Only try to hide nav panel if it exists
            if (mobileNavPanel) {
                mobileNavPanel.classList.add('hidden');
            }
        });
    });

    // Testimonials Slider Initialization
    if (typeof Swiper !== "undefined" && document.querySelector('.testimonials-swiper')) {
        const testimonialsSwiper = new Swiper('.testimonials-swiper', {
            loop: true,
            autoplay: {
                delay: 7000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }
</script>