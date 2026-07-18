/**
 * ============================================
 * HOMEPAGE - Custom JavaScript
 * ============================================
 * This file contains page-specific functionality
 * for the Homepage.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Homepage Loaded');
    
    // ===== Stats Counter Animation =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const text = target.textContent;
                    const value = parseInt(text.replace(/[^0-9]/g, ''));
                    const suffix = text.replace(/[0-9]/g, '');
                    
                    if (!isNaN(value)) {
                        animateCounter(target, value, suffix);
                    }
                    counterObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        statNumbers.forEach(stat => {
            counterObserver.observe(stat);
        });
    }
    
    function animateCounter(element, targetValue, suffix) {
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = targetValue / steps;
        const interval = duration / steps;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
                current = targetValue;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, interval);
    }
    
    // ===== Product Cards Hover Effect =====
    const productCards = document.querySelectorAll('.card-custom');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ===== Smooth Scroll for CTA Buttons =====
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('#mainNav')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Features Animation on Scroll =====
    const featureItems = document.querySelectorAll('.feature-item');
    
    if (featureItems.length > 0) {
        const featureObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.2
        });
        
        featureItems.forEach(item => {
            featureObserver.observe(item);
        });
    }
});