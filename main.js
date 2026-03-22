// Fast Logo Reveal Preloader
function runPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    document.body.classList.add('no-scroll');

    // Show logo for 1.2s, then fade out
    setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.classList.remove('no-scroll');
    }, 1500);
}

// Only run preloader on pages that have it, and only once per session
if (document.getElementById('preloader')) {
    if (!sessionStorage.getItem('preloaderShown')) {
        sessionStorage.setItem('preloaderShown', 'true');
        runPreloader();
    } else {
        document.getElementById('preloader').style.display = 'none';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple animation observer
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .hero-content, .hero-image, .main-dashboard, .secondary-dashboard, .detailed-features .feature-row').forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
});

// 3D Tilt Effect for Cards
document.querySelectorAll('.glass-card, .feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        // Preserve base transforms for dashboard stack
        if (card.classList.contains('secondary-dashboard')) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY - 10}deg) translateZ(40px)`;
        } else {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(60px)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)`;
    });
});

// Define the animation class in JS for simplicity or add to CSS
const style = document.createElement('style');
style.textContent = `
    .reveal-hidden {
        opacity: 0;
        transform: translateY(40px) rotateX(15deg);
        transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) rotateX(0) !important;
    }
`;
document.head.appendChild(style);
