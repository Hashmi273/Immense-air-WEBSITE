/**
 * ============================================
 * RCS MESSAGING PAGE - Custom JavaScript
 * ============================================
 * This file contains page-specific functionality
 * for the RCS Messaging page.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('RCS Messaging Page Loaded');
    
    // ===== RCS Feature Cards Animation =====
    const rcsCards = document.querySelectorAll('.card-custom');
    
    if (rcsCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.1
        });
        
        rcsCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });
    }
    
    // ===== RCS Interactive Demo =====
    const demoButtons = document.querySelectorAll('.rcs-demo-btn');
    
    if (demoButtons.length > 0) {
        demoButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const demoId = this.dataset.demo;
                const demoContainer = document.getElementById(demoId);
                
                if (demoContainer) {
                    // Toggle active class
                    document.querySelectorAll('.rcs-demo-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    demoContainer.classList.add('active');
                    
                    // Update button styles
                    document.querySelectorAll('.rcs-demo-btn').forEach(b => {
                        b.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }
    
    // ===== Message Template Preview =====
    const templateSelect = document.getElementById('templateSelect');
    const templatePreview = document.getElementById('templatePreview');
    
    if (templateSelect && templatePreview) {
        const templates = {
            'welcome': {
                title: 'Welcome Message',
                content: '👋 Welcome to Immense Air! We\'re excited to have you on board.',
                image: '🎉'
            },
            'promotion': {
                title: 'Promotional Message',
                content: '🎁 Special Offer! Get 20% off on your first bulk SMS order. Use code: IMMENSE20',
                image: '🏷️'
            },
            'update': {
                title: 'Update Message',
                content: '📢 Important Update: Our platform is now live with new features! Check them out.',
                image: '🚀'
            }
        };
        
        templateSelect.addEventListener('change', function() {
            const key = this.value;
            if (key && templates[key]) {
                const data = templates[key];
                templatePreview.innerHTML = `
                    <div class="rcs-message-preview">
                        <div class="rcs-header">
                            <span class="rcs-icon">${data.image}</span>
                            <span class="rcs-title">${data.title}</span>
                        </div>
                        <div class="rcs-body">${data.content}</div>
                        <div class="rcs-actions">
                            <button class="btn btn-sm btn-outline-custom">Reply</button>
                            <button class="btn btn-sm btn-primary-custom">Learn More</button>
                        </div>
                    </div>
                `;
            }
        });
    }
    
    // ===== RCS Stats Counter =====
    const rcsStats = document.querySelectorAll('.rcs-stat-number');
    
    if (rcsStats.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseInt(target.dataset.count);
                    if (!isNaN(value)) {
                        animateRCSStat(target, value);
                    }
                    statObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        rcsStats.forEach(stat => {
            statObserver.observe(stat);
        });
    }
    
    function animateRCSStat(element, targetValue) {
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
            element.textContent = Math.floor(current) + '%';
        }, interval);
    }
});