/**
 * ============================================
 * BULK SMS PAGE - Custom JavaScript
 * ============================================
 * This file contains page-specific functionality
 * for the Bulk SMS page.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Bulk SMS Page Loaded');
    
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
    
    // ===== Pricing Calculator (if exists) =====
    const smsCountInput = document.getElementById('smsCount');
    const priceDisplay = document.getElementById('priceDisplay');
    
    if (smsCountInput && priceDisplay) {
        const ratePerSms = 0.05; // Example rate
        
        smsCountInput.addEventListener('input', function() {
            const count = parseInt(this.value) || 0;
            const total = count * ratePerSms;
            priceDisplay.textContent = '₹' + total.toFixed(2);
        });
    }
    
    // ===== SMS Template Preview =====
    const templateInput = document.getElementById('templateInput');
    const previewDisplay = document.getElementById('previewDisplay');
    
    if (templateInput && previewDisplay) {
        templateInput.addEventListener('input', function() {
            const text = this.value || 'Your message preview will appear here...';
            previewDisplay.textContent = text;
            
            // Character count
            const charCount = document.getElementById('charCount');
            if (charCount) {
                const count = text.length;
                charCount.textContent = count + ' characters';
                
                if (count > 160) {
                    charCount.style.color = '#FF6A00';
                } else {
                    charCount.style.color = '#6C757D';
                }
            }
        });
    }
    
    // ===== Delivery Report Toggle =====
    const reportToggle = document.getElementById('reportToggle');
    const reportContent = document.getElementById('reportContent');
    
    if (reportToggle && reportContent) {
        reportToggle.addEventListener('click', function() {
            const isHidden = reportContent.style.display === 'none';
            reportContent.style.display = isHidden ? 'block' : 'none';
            this.querySelector('i').className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
        });
    }
});