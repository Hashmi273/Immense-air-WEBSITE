/**
 * ============================================
 * SMPP API PAGE - Custom JavaScript
 * ============================================
 * This file contains page-specific functionality
 * for the SMPP API page.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('SMPP API Page Loaded');
    
    // ===== Code Tabs =====
    const codeTabs = document.querySelectorAll('.code-tab');
    const codePanels = document.querySelectorAll('.code-panel');
    
    if (codeTabs.length > 0 && codePanels.length > 0) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active from all tabs
                codeTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all panels
                codePanels.forEach(p => p.classList.remove('active'));
                
                // Show target panel
                const target = this.dataset.target;
                const targetPanel = document.getElementById(target);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // ===== Code Copy Functionality =====
    const copyButtons = document.querySelectorAll('.code-copy-btn');
    
    if (copyButtons.length > 0) {
        copyButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const codeBlock = this.closest('.code-wrapper').querySelector('code');
                if (codeBlock) {
                    const text = codeBlock.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                        }, 2000);
                    }).catch(() => {
                        // Fallback
                        const range = document.createRange();
                        range.selectNode(codeBlock);
                        window.getSelection().removeAllRanges();
                        window.getSelection().addRange(range);
                        document.execCommand('copy');
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                        setTimeout(() => {
                            this.innerHTML = originalText;
                        }, 2000);
                    });
                }
            });
        });
    }
    
    // ===== API Key Toggle =====
    const apiKeyToggle = document.getElementById('apiKeyToggle');
    const apiKeyDisplay = document.getElementById('apiKeyDisplay');
    
    if (apiKeyToggle && apiKeyDisplay) {
        apiKeyToggle.addEventListener('click', function() {
            const isHidden = apiKeyDisplay.type === 'password';
            apiKeyDisplay.type = isHidden ? 'text' : 'password';
            this.querySelector('i').className = isHidden ? 'fas fa-eye-slash' : 'fas fa-eye';
        });
    }
    
    // ===== SMPP Connection Test =====
    const testConnectionBtn = document.getElementById('testConnection');
    const connectionStatus = document.getElementById('connectionStatus');
    
    if (testConnectionBtn && connectionStatus) {
        testConnectionBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Testing...';
            this.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                const statuses = ['success', 'error'];
                const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                
                if (randomStatus === 'success') {
                    connectionStatus.innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle me-2"></i> Connection successful! SMPP gateway is responding.
                        </div>
                    `;
                } else {
                    connectionStatus.innerHTML = `
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-circle me-2"></i> Connection failed. Please check your credentials.
                        </div>
                    `;
                }
                
                this.innerHTML = originalText;
                this.disabled = false;
            }, 1500);
        });
    }
    
    // ===== Documentation Sidebar Toggle (Mobile) =====
    const docToggle = document.getElementById('docToggle');
    const docSidebar = document.getElementById('docSidebar');
    
    if (docToggle && docSidebar) {
        docToggle.addEventListener('click', function() {
            docSidebar.classList.toggle('show');
        });
    }
});