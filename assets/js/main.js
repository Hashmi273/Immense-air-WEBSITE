/**
 * ============================================
 * MAIN.JS - Common JavaScript
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Navbar Scroll Effect =====
    const navbar = document.getElementById('mainNav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // ===== Active Link Highlight =====
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar .nav-link:not(.btn-nav-cta)');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
            const linkPage = href.split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        }
    });
    
    // ============================================
    // DROPDOWN FIX - Hover on Desktop, Click on Mobile
    // ============================================
    
    function isDesktop() {
        return window.innerWidth >= 992;
    }
    
    const dropdowns = document.querySelectorAll('.navbar .dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!toggle || !menu) return;
        
        // ===== Desktop: Hover =====
        if (isDesktop()) {
            dropdown.addEventListener('mouseenter', function(e) {
                if (e.relatedTarget && e.relatedTarget.closest('.dropdown')) return;
                
                document.querySelectorAll('.navbar .dropdown .dropdown-menu.show').forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('show');
                    }
                });
                
                menu.classList.add('show');
            });
            
            dropdown.addEventListener('mouseleave', function(e) {
                if (e.relatedTarget && e.relatedTarget.closest('.dropdown')) return;
                
                setTimeout(() => {
                    if (!dropdown.matches(':hover')) {
                        menu.classList.remove('show');
                    }
                }, 100);
            });
            
            // Prevent click from toggling on desktop
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                if (window.innerWidth < 992) {
                    menu.classList.toggle('show');
                }
            });
        }
        
        // ===== Mobile: Click =====
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth < 992) {
                e.preventDefault();
                e.stopPropagation();
                
                document.querySelectorAll('.navbar .dropdown .dropdown-menu.show').forEach(m => {
                    if (m !== menu) {
                        m.classList.remove('show');
                    }
                });
                
                menu.classList.toggle('show');
            }
        });
    });
    
    // ===== Close dropdowns when clicking outside =====
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar .dropdown')) {
            document.querySelectorAll('.navbar .dropdown .dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
    
    // ===== Handle window resize =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            document.querySelectorAll('.navbar .dropdown .dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }, 250);
    });
    
    // ============================================
    // CONTACT FORM HANDLER - FormSubmit
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // FormSubmit ko form submit karne dein
            // Sirf loading state show karein
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
            submitBtn.disabled = true;
            
            // FormSubmit automatic redirect karega
            // Agar redirect nahi ho raha toh error show karein
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                if (formMessage) {
                    formMessage.innerHTML = `
                        <div class="alert alert-info alert-dismissible fade show" role="alert">
                            <i class="fas fa-info-circle me-2"></i> Please wait... Redirecting to thank you page.
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                    `;
                }
            }, 10000); // 10 second timeout
        });
    }
});
