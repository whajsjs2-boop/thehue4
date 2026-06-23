/**
 * THE HUE Landing Page - JavaScript
 * Handles navigation, tabs, FAB menu, and scroll animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initNavigation();
    initTabs();
    initFAB();
    initScrollAnimations();
});

/**
 * Side Navigation - Active state on scroll
 */
function initNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');

    // Scroll-based active state
    const observerOptions = {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                    if (dot.dataset.section === sectionId) {
                        dot.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll on click
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Pricing Tabs
 */
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const courseLists = document.querySelectorAll('.course-list');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;

            // Update button states
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update course list visibility
            courseLists.forEach(list => {
                list.classList.remove('active');
                if (list.id === tabId) {
                    list.classList.add('active');
                }
            });
        });
    });
}

/**
 * FAB (Floating Action Button) Menu
 */
function initFAB() {
    const fabToggle = document.getElementById('fab-toggle');
    const fabMenu = document.getElementById('fab-menu');

    if (!fabToggle || !fabMenu) return;

    let isOpen = false;

    fabToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        
        fabToggle.classList.toggle('active', isOpen);
        fabMenu.classList.toggle('active', isOpen);
    });

    // Close FAB menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isOpen && !e.target.closest('.fab-container')) {
            isOpen = false;
            fabToggle.classList.remove('active');
            fabMenu.classList.remove('active');
        }
    });
}

/**
 * Scroll Animations
 */
function initScrollAnimations() {
    // Add animation class to elements
    const animatedElements = document.querySelectorAll(
        '.feature-card, .gallery-item, .course-item, .contact-wrapper'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * Optional: Parallax effect for hero section
 */
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const scrollY = window.scrollY;
    
    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight);
    }
});
