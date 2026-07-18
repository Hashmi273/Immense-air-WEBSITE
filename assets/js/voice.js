/**
 * ============================================
 * VOICE SOLUTIONS PAGE - Custom JavaScript
 * ============================================
 * This file contains page-specific functionality
 * for the Voice Solutions page.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Voice Solutions Page Loaded');
    
    // ===== IVR Flow Animation =====
    const ivrFlowItems = document.querySelectorAll('.ivr-flow-item');
    
    if (ivrFlowItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 200);
                }
            });
        }, {
            threshold: 0.2
        });
        
        ivrFlowItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // ===== Feature Tabs (if any) =====
    const tabButtons = document.querySelectorAll('.voice-tab-btn');
    const tabPanels = document.querySelectorAll('.voice-tab-panel');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all panels
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Show target panel
                const target = this.dataset.target;
                const targetPanel = document.getElementById(target);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // ===== Stats Counter Animation =====
    const statNumbers = document.querySelectorAll('.voice-stat-number');
    
    if (statNumbers.length > 0) {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseInt(target.dataset.count);
                    animateCounter(target, value);
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
    
    function animateCounter(element, targetValue) {
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
            element.textContent = Math.floor(current) + '+';
        }, interval);
    }
    
    // ===== Voice Demo Play/Pause =====
    const demoButtons = document.querySelectorAll('.voice-demo-btn');
    
    if (demoButtons.length > 0) {
        demoButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                const isPlaying = this.classList.contains('playing');
                
                if (isPlaying) {
                    icon.className = 'fas fa-play';
                    this.classList.remove('playing');
                    // Stop audio logic here
                } else {
                    icon.className = 'fas fa-pause';
                    this.classList.add('playing');
                    // Play audio logic here
                }
            });
        });
    }
    
    // ===== Smooth Scroll for Anchor Links =====
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // ===== Callback Request Form Handler (if exists) =====
    const callbackForm = document.getElementById('callbackForm');
    
    if (callbackForm) {
        callbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            
            fetch('../assets/api/callback.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                const messageDiv = document.getElementById('callbackMessage');
                if (data.success) {
                    messageDiv.innerHTML = `<div class="alert alert-success">${data.message}</div>`;
                    this.reset();
                } else {
                    messageDiv.innerHTML = `<div class="alert alert-danger">${data.message}</div>`;
                }
            })
            .catch(error => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                const messageDiv = document.getElementById('callbackMessage');
                messageDiv.innerHTML = `<div class="alert alert-danger">Network error. Please try again.</div>`;
            });
        });
    }
});