// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(n => n.addEventListener('click', closeMenu));

function closeMenu() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#ffffff';
        navbar.style.backdropFilter = 'none';
    }
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Simple Intersection Observer for Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.feature-card, .team-member, .main-achievement, .stat-item, .partner-card');
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        observer.observe(el);
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (name && email && message) {
            // Show success message
            showNotification('Mesajınız uğurla göndərildi! Tezliklə sizinlə əlaqə saxlayacağıq.', 'success');
            
            // Reset form
            this.reset();
        } else {
            showNotification('Zəhmət olmasa bütün sahələri doldurun.', 'error');
        }
    });
}

// Simple Notification System
function showNotification(message, type) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'var(--primary-green)' : type === 'info' ? '#3182ce' : '#e53e3e'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add CSS for notification
const notificationStyles = `
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;

// Add styles to head
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);



// Simple Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        
        // Format number for display
        let displayValue = Math.floor(start);
        if (target >= 1000) {
            displayValue = (Math.floor(start / 100) / 10).toFixed(1) + 'K';
            if (target >= 10000) {
                displayValue = Math.floor(start / 1000) + 'K';
            }
        }
        
        // Special cases for percentage and 24/7
        if (element.textContent.includes('%')) {
            element.textContent = Math.floor(start) + '%';
        } else if (element.textContent.includes('24/7')) {
            element.textContent = '24/7';
        } else {
            element.textContent = displayValue + (target >= 1000 && !element.textContent.includes('K') ? '+' : '');
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach((stat, index) => {
                const text = stat.textContent;
                let target = 0;
                
                if (text.includes('500')) target = 500;
                else if (text.includes('10,000') || text.includes('10K')) target = 10000;
                else if (text.includes('99')) target = 99;
                else if (text.includes('24/7')) {
                    stat.textContent = '24/7';
                    return;
                }
                
                if (target > 0) {
                    stat.textContent = '0';
                    setTimeout(() => {
                        animateCounter(stat, target);
                    }, index * 200);
                }
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
});

// Observe both hero stats and main stats sections
document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    const mainStats = document.querySelector('.stats-grid');
    
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
    if (mainStats) {
        statsObserver.observe(mainStats);
    }
});

// Smooth Page Load Animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add floating background elements
function createFloatingElements() {
    const hero = document.querySelector('.hero');
    
    for (let i = 0; i < 3; i++) {
        const floatingElement = document.createElement('div');
        floatingElement.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(45deg, var(--secondary-green), transparent);
            border-radius: 50%;
            opacity: 0.05;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatRandom ${Math.random() * 20 + 15}s ease-in-out infinite;
            pointer-events: none;
            z-index: 0;
        `;
        hero.appendChild(floatingElement);
    }
}

// Add floating animation keyframes
const floatingStyles = `
    @keyframes floatRandom {
        0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.05;
        }
        25% { 
            transform: translateY(-30px) translateX(20px) rotate(90deg);
            opacity: 0.1;
        }
        50% { 
            transform: translateY(-60px) translateX(-20px) rotate(180deg);
            opacity: 0.05;
        }
        75% { 
            transform: translateY(-30px) translateX(-40px) rotate(270deg);
            opacity: 0.1;
        }
    }
`;

const floatingStyleSheet = document.createElement('style');
floatingStyleSheet.textContent = floatingStyles;
document.head.appendChild(floatingStyleSheet);

// Initialize floating elements
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(createFloatingElements, 1000);
});

// Store Download Functionality
const APK_DOWNLOAD_LINK = 'YOUR_APK_LINK_HERE'; // Bu linki dəyişməlisiniz

function handleAPKDownload() {
    if (APK_DOWNLOAD_LINK === 'YOUR_APK_LINK_HERE') {
        showNotification('APK yüklənmə linki hələ təyin edilməyib. Zəhmət olmasa gözləyin.', 'error');
        return;
    }
    
    // Show download starting message
    showNotification('APK yüklənməsi başlayır...', 'success');
    
    // Open download link
    window.open(APK_DOWNLOAD_LINK, '_blank');
}

function handlePlayStoreClick() {
    showNotification('Play Store-da tətbiq yaxında istifadəyə veriləcək! 🚀', 'info');
}

function handleAppStoreClick() {
    showNotification('App Store-da tətbiq yaxında istifadəyə veriləcək! 🍎', 'info');
}

// Add click event listeners to all store buttons
document.addEventListener('DOMContentLoaded', () => {
    // APK Download buttons
    const apkButtons = document.querySelectorAll('.apk-download-btn');
    apkButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleAPKDownload();
        });
    });
    
    // Play Store buttons
    const playStoreButtons = document.querySelectorAll('.btn-primary');
    playStoreButtons.forEach(button => {
        // Check if it's actually a Play Store button (has Google Play icon)
        if (button.querySelector('.fa-google-play')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                handlePlayStoreClick();
            });
        }
    });
    
    // App Store buttons
    const appStoreButtons = document.querySelectorAll('.btn-apple');
    appStoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            handleAppStoreClick();
        });
    });
});

// Team Member Click to Flip Functionality
document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('click', () => {
            // Toggle flipped class
            member.classList.toggle('flipped');
        });
        
        // Optional: Close other cards when one is opened
        member.addEventListener('click', () => {
            teamMembers.forEach(otherMember => {
                if (otherMember !== member) {
                    otherMember.classList.remove('flipped');
                }
            });
        });
    });
}); 