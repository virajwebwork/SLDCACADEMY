// ====================================
// INITIALIZE ON DOM LOAD
// ====================================
document.addEventListener('DOMContentLoaded', function() {
    initPreloader();
    initHeaderHeight();
    initMobileMenu();
    initSmoothScroll();
    initActiveNavigation();
    initCounters();
    initTestimonialsSwiper();
    initContactForm();
});

// ====================================
// PRELOADER
// ====================================
function initPreloader() {
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
}

// ====================================
// HEADER HEIGHT CALCULATION
// ====================================
function initHeaderHeight() {
    const header = document.getElementById('site-header');
    const root = document.documentElement;
    
    function updateHeaderHeight() {
        if (header) {
            const height = header.getBoundingClientRect().height;
            root.style.setProperty('--header-height', `${Math.ceil(height)}px`);
        }
    }
    
    // Call on load
    updateHeaderHeight();
    
    // Update on resize (throttled)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(updateHeaderHeight, 100);
    });
}

// ====================================
// MOBILE MENU
// ====================================
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNavPanel = document.getElementById('mobileNavPanel');
    const mobileLinks = document.querySelectorAll('.nav-link-mobile');
    
    if (mobileMenuBtn && mobileNavPanel) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNavPanel.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNavPanel.classList.add('hidden');
            });
        });
    }
}

// ====================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ====================================
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
}

// ====================================
// ACTIVE NAVIGATION ON SCROLL
// ====================================
function initActiveNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    if (navLinks.length === 0 || sections.length === 0) return;
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const headerOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 80;
        
        let currentSection = null;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                currentSection = section;
            }
        });
        
        // Update active class
        if (currentSection) {
            const currentId = currentSection.getAttribute('id');
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentId}`) {
                    link.classList.add('active');
                }
            });
        }
    }
    
    // Run on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Run on load
    updateActiveNav();
}

// ====================================
// COUNTER ANIMATION
// ====================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const animate = () => {
            const target = +counter.getAttribute('data-target');
            const current = +counter.innerText;
            const increment = target / 100;
            
            if (current < target) {
                counter.innerText = Math.ceil(current + increment);
                setTimeout(animate, 20);
            } else {
                counter.innerText = target;
            }
        };
        
        // Use Intersection Observer to trigger animation when in view
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// ====================================
// TESTIMONIALS SWIPER
// ====================================
function initTestimonialsSwiper() {
    if (typeof Swiper !== 'undefined') {
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
            breakpoints: {
                640: {
                    slidesPerView: 1,
                },
            }
        });
    }
}

// ====================================
// CONTACT FORM HANDLING
// ====================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For now, we'll just show a simple alert
            alert('Thank you for your inquiry! We will contact you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// ====================================
// ADDITIONAL UTILITY FUNCTIONS
// ====================================

// Debounce function for performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}