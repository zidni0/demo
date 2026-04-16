// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll to workflow button
document.querySelector('.cta-button[data-scroll="workflow"]').addEventListener('click', function() {
    document.getElementById('workflow').scrollIntoView({ behavior: 'smooth' });
});

// Navigation
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('section');

function updateNav(activeId) {
    navButtons.forEach(btn => {
        if (btn.dataset.page === activeId) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const page = btn.dataset.page;
        updateNav(page);

        // Scroll to section
        if (page === 'home') {
            document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
        } else {
            document.getElementById(page).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Node Hover Effects with Info Cards
const infoCard = document.getElementById('info-card');
const nodes = document.querySelectorAll('.node');

const nodeInfo = {
    'center': {
        title: 'Control Center',
        desc: 'You initiate the process by entering your query or command'
    },
    'l1-left': {
        title: 'Query Parsing',
        desc: 'Natural language is analyzed for intent and context'
    },
    'l1-center': {
        title: 'Processing',
        desc: 'AI models process your request and plan the approach'
    },
    'l1-right': {
        title: 'Action Planning',
        desc: 'The best execution strategy is determined'
    },
    'l2-left': {
        title: 'Code Generation',
        desc: 'Code is written, tested, and optimized'
    },
    'l2-center': {
        title: 'Data Handling',
        desc: 'Data is processed, analyzed, and stored'
    },
    'l2-right': {
        title: 'Tool Execution',
        desc: 'External tools and APIs are invoked as needed'
    }
};

nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        const id = node.dataset.id;
        const info = nodeInfo[id];
        if (info) {
            document.querySelector('.info-title').textContent = info.title;
            document.querySelector('.info-desc').textContent = info.desc;
            infoCard.classList.add('active');
        }
    });

    node.addEventListener('mouseleave', () => {
        infoCard.classList.remove('active');
    });
});

// Add connection animation on hover
const connections = document.querySelectorAll('.connection');
const connectionMap = {
    'center': connections[0],
    'l1-left': connections[0],
    'l1-center': connections[1],
    'l1-right': connections[2],
    'l2-left': connections[3],
    'l2-center': connections[4],
    'l2-right': connections[5]
};

nodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
        const id = node.dataset.id;
        const connection = connectionMap[id];
        if (connection) {
            connection.style.stroke = '#6366f1';
            connection.style.strokeWidth = '3';
            connection.style.filter = 'drop-shadow(0 0 4px rgba(99, 102, 241, 0.6))';
        }
    });

    node.addEventListener('mouseleave', () => {
        const id = node.dataset.id;
        const connection = connectionMap[id];
        if (connection) {
            connection.style.stroke = '#2d3040';
            connection.style.strokeWidth = '2';
            connection.style.filter = 'none';
        }
    });
});

// Add active step on scroll
const observerOptions = {
    rootMargin: '-50% 0px -50% 0px'
};

const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.step-card').forEach(card => card.classList.remove('active-step'));
            const stepNum = entry.target.dataset.step;
            document.querySelector(`.step-card[data-step="${stepNum}"]`).classList.add('active-step');
        }
    });
}, observerOptions);

document.querySelectorAll('.step-card').forEach(card => {
    stepObserver.observe(card);
});

// Add wave animation to nodes
function animateNodes() {
    const circles = document.querySelectorAll('.node-circle');
    circles.forEach((circle, index) => {
        circle.animate([
            { fill: '#1a1d26' },
            { fill: '#1f222f' },
            { fill: '#1a1d26' }
        ], {
            duration: 3000 + index * 200,
            iterations: Infinity,
            delay: index * 100
        });
    });
}

animateNodes();

// Simple particle system for background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(168, 173, 180, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bg-particles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-3';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

initParticles();
