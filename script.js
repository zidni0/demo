document.addEventListener('DOMContentLoaded', function() {
    // --- Animation Triggers (JS required to override initial opacity=0) ---
    const headerH1 = document.querySelector('header h1');
    const headerTagline = document.querySelector('header .tagline');
    
    // Triggering the initial entrance animation
    setTimeout(() => {
        headerH1.style.opacity = 1;
        headerH1.style.transform = 'translateY(0)';
    }, 100);
    setTimeout(() => {
        headerTagline.style.opacity = 1;
        headerTagline.style.transform = 'translateY(0)';
    }, 300);
    
    // --- 1. Status Animation ---
    const statusItems = document.querySelectorAll('.status-item');
    const statusInterval = setInterval(() => {
        statusItems.forEach(item => {
            const serviceName = item.dataset.service;
            const dot = item.querySelector('.status-dot');
            
            // Small chance to simulate a status change (for demonstration)
            if (Math.random() < 0.1) { 
                if (serviceName === "API Gateway" && Math.random() > 0.5) { 
                     // Simulate going offline occasionally
                     item.classList.add('offline');
                     dot.style.animation = 'none';
                     setTimeout(() => {
                        item.classList.remove('offline');
                        dot.style.animation = 'pulse-green 1.5s infinite ease-in-out';
                    }, 1500);
                }
            }
        });
    }, 3000);
    
    // --- 2. Capability Card Interactivity ---
    const capabilities = document.querySelectorAll('.capability-card');
    capabilities.forEach(card => {
        card.addEventListener('click', function() {
            const capability = this.dataset.capability;
            alert(`[Selected Capability: ${capability.toUpperCase()}]\n\nThis module is designed for: ${this.querySelector('p').textContent.trim()}.\n\n(In a live build, this would expand to show detailed documentation or an interactive tool.)`);
        });
    });

    // --- 3. Workflow Visualization Animation ---
    const nodes = document.querySelectorAll('.workflow-node');
    const nodesToAnimate = [
        document.querySelector('.start-node'),
        document.querySelector('.router-node'),
        document.querySelector('.tool-node'),
        document.querySelector('.memory-node')
    ];
    
    let step = 0;
    const animationSequence = setInterval(() => {
        if (step < nodesToAnimate.length) {
            const node = nodesToAnimate[step];
            
            // Simple fade-in effect for each major step in the workflow
            node.style.opacity = 0;
            node.style.transform = 'scale(0.9)';
            setTimeout(() => {
                 node.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                 node.style.opacity = 1;
                 node.style.transform = 'scale(1)';
            }, 100 + (step * 600)); // Staggered animation
            
            step++;
        } else {
            clearInterval(animationSequence);
        }
    }, 1000);

});