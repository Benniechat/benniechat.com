/**
 * BennieChat TechWealth Solutions - Main Application JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollReveal();
    initAnimatedCounters();
    initTimelineAnimation();
    initImageFallbackHandler();
});

/**
 * Mobile Navigation Toggle & Links Handling
 */
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when nav link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        });
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    if (!revealElements.length) return;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));
}

/**
 * Animated Numerical Counters
 */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                const suffix = counter.getAttribute('data-suffix') || '';
                let current = 0;
                const increment = Math.max(1, target / 60); // smooth animation steps

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + suffix;
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + suffix;
                        }
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
}

/**
 * Methodology Timeline Animation
 */
function initTimelineAnimation() {
    const timeline = document.getElementById('timeline');
    const timelineFill = document.getElementById('timelineFill');
    const stepItems = document.querySelectorAll('.step-item');

    if (!timeline || !timelineFill) return;

    const timelineObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Animate line fill
            timelineFill.style.width = '100%';
            
            // Animate steps sequentially
            stepItems.forEach((step, index) => {
                setTimeout(() => {
                    step.classList.add('active');
                }, (index + 1) * 400); // 400ms delay between each step
            });
            timelineObserver.unobserve(timeline);
        }
    }, { threshold: 0.3 });

    timelineObserver.observe(timeline);
}

/**
 * Image Fallback Handler - Guarantees images never break
 */
function initImageFallbackHandler() {
    const images = document.querySelectorAll('img');
    
    // Category icons map for rich SVG cards
    const categoryIcons = {
        'AI & Automation': '🤖',
        'Oil & Gas': '🛢️',
        'Marine': '⚓',
        'Education': '🎓',
        'Professional': '💼',
        'Engineering': '⚙️',
        'Fashion & Retail': '🛍️',
        'Churches & Ministries': '🏛️',
        'Tech & Startups': '🚀',
        'Website & Web Apps': '💻',
        'Digital Transformation': '🔄',
        'Software & SaaS': '☁️'
    };

    // Create an elegant default SVG placeholder generator
    const getFallbackSVG = (altText) => {
        const title = altText || 'BennieChat TechWealth';
        let icon = '⚡';
        
        for (const [key, val] of Object.entries(categoryIcons)) {
            if (title.toLowerCase().includes(key.toLowerCase())) {
                icon = val;
                break;
            }
        }

        const encodedTitle = encodeURIComponent(title);
        return `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230a192f'/%3E%3Cstop offset='100%25' stop-color='%230d9488'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)'/%3E%3Ctext x='50%25' y='42%25' dominant-baseline='middle' text-anchor='middle' font-size='64'%3E${icon}%3C/text%3E%3Ctext x='50%25' y='60%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='26' font-weight='bold' fill='%23ffffff' opacity='0.95'%3E${encodedTitle}%3C/text%3E%3C/svg%3E`;
    };

    images.forEach(img => {
        // Skip logo and local assets
        if (img.src.includes('assets/')) return;

        // Set error handler
        img.addEventListener('error', function handleErr() {
            this.removeEventListener('error', handleErr);
            this.src = getFallbackSVG(this.alt);
        });

        // Check if image is already broken
        if (img.complete && img.naturalWidth === 0) {
            img.src = getFallbackSVG(img.alt);
        }
    });
}
