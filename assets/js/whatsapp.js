/**
 * ============================================
 * WHATSAPP API PAGE - Custom JavaScript
 * ============================================
 * This file contains page-specific functionality
 * for the WhatsApp Business API page.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('WhatsApp API Page Loaded');
    
    // ===== Feature Cards Animation =====
    const featureCards = document.querySelectorAll('.card-custom');
    
    if (featureCards.length > 0) {
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
        
        featureCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });
    }
    
    // ===== WhatsApp Message Preview =====
    const messageInput = document.getElementById('whatsappMessageInput');
    const previewContainer = document.getElementById('whatsappPreview');
    const sendBtn = document.getElementById('whatsappSendBtn');
    
    if (messageInput && previewContainer) {
        // Character count
        const charCount = document.getElementById('whatsappCharCount');
        
        messageInput.addEventListener('input', function() {
            const text = this.value;
            
            // Update preview
            if (previewContainer) {
                previewContainer.innerHTML = `
                    <div class="whatsapp-message-bubble">
                        <div class="message-text">${text || 'Type your message here...'}</div>
                        <div class="message-time">${new Date().toLocaleTimeString()}</div>
                    </div>
                `;
            }
            
            // Update character count
            if (charCount) {
                const count = text.length;
                charCount.textContent = count + ' characters';
                
                if (count > 1024) {
                    charCount.style.color = '#FF6A00';
                } else {
                    charCount.style.color = '#6C757D';
                }
            }
        });
    }
    
    // ===== Send Button Click Handler =====
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            const message = messageInput ? messageInput.value : '';
            
            if (message.trim().length === 0) {
                // Show error
                const errorDiv = document.getElementById('whatsappError');
                if (errorDiv) {
                    errorDiv.textContent = 'Please type a message first.';
                    errorDiv.style.display = 'block';
                    setTimeout(() => {
                        errorDiv.style.display = 'none';
                    }, 3000);
                }
                return;
            }
            
            // Simulate sending
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check me-2"></i> Sent!';
                this.style.background = '#25D366';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.style.background = '';
                    this.disabled = false;
                    
                    if (messageInput) {
                        messageInput.value = '';
                        // Trigger input event to update preview
                        messageInput.dispatchEvent(new Event('input'));
                    }
                }, 2000);
            }, 1500);
        });
    }
    
    // ===== Template Selector =====
    const templateSelect = document.getElementById('whatsappTemplate');
    
    if (templateSelect && messageInput) {
        const templates = {
            'welcome': '👋 Welcome to Immense Air! We\'re excited to help you with our communication solutions.',
            'order': '✅ Your order has been confirmed! We\'ll keep you updated on the delivery status.',
            'support': '🛎️ How can we help you today? Our support team is available 24x7.',
            'promotion': '🎉 Special Offer! Get 20% off on all services. Use code: IMMENSE20',
            'update': '📢 Important: Our new features are now live! Check them out today.'
        };
        
        templateSelect.addEventListener('change', function() {
            const key = this.value;
            if (key && templates[key]) {
                messageInput.value = templates[key];
                // Trigger input event
                messageInput.dispatchEvent(new Event('input'));
            }
        });
    }
    
    // ===== WhatsApp Number Validation =====
    const phoneInput = document.getElementById('whatsappPhone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            // Remove non-numeric characters
            this.value = this.value.replace(/[^0-9]/g, '');
            
            // Add country code if not present
            if (this.value.length > 0 && !this.value.startsWith('91')) {
                // Just validate, don't auto-add
            }
        });
    }
    
    // ===== Stats Counter Animation =====
    const whatsappStats = document.querySelectorAll('.whatsapp-stat-number');
    
    if (whatsappStats.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const value = parseInt(target.dataset.count);
                    if (!isNaN(value)) {
                        animateStat(target, value);
                    }
                    statObserver.unobserve(target);
                }
            });
        }, {
            threshold: 0.3
        });
        
        whatsappStats.forEach(stat => {
            statObserver.observe(stat);
        });
    }
    
    function animateStat(element, targetValue) {
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
    
    // ===== Feature Accordion =====
    const accordionHeaders = document.querySelectorAll('.whatsapp-accordion-header');
    
    if (accordionHeaders.length > 0) {
        accordionHeaders.forEach(header => {
            header.addEventListener('click', function() {
                const content = this.nextElementSibling;
                const icon = this.querySelector('.accordion-icon');
                
                // Toggle content
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                    if (icon) {
                        icon.className = 'fas fa-chevron-down accordion-icon';
                    }
                } else {
                    // Close others
                    document.querySelectorAll('.whatsapp-accordion-content').forEach(c => {
                        c.style.maxHeight = null;
                    });
                    document.querySelectorAll('.accordion-icon').forEach(i => {
                        i.className = 'fas fa-chevron-down accordion-icon';
                    });
                    
                    content.style.maxHeight = content.scrollHeight + 'px';
                    if (icon) {
                        icon.className = 'fas fa-chevron-up accordion-icon';
                    }
                }
            });
        });
    }
});