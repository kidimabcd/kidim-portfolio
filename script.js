// DOM Elements
const themeToggle = document.getElementById('themeToggle');
const profileCard = document.getElementById('profileCard');
const profilePic = document.getElementById('profilePic');
const cursor = document.querySelector('.cursor');
const cursor2 = document.querySelector('.cursor2');

// Theme Configuration
const themes = [
    { name: 'default', class: '', pics: ['https://c.termai.cc/i185/AUPhA.jpg'] },
    { name: 'light-theme', class: 'light-theme', pics: ['https://c.termai.cc/i185/AUPhA.jpg'] },
    { name: 'cyber-theme', class: 'cyber-theme', pics: ['https://c.termai.cc/i147/VaCZc.jpg'] }
];
let currentTheme = 0;

// Typing texts
const typingTexts = [
    "Somay lover dev 🚀",
    "Learning to code 💻",
    "Pemula tapi semangat 🔥",
    "🥟 > Bugs"
];

// Custom Cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor2.style.left = e.clientX + 'px';
    cursor2.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.8)';
    cursor2.style.transform = 'scale(0.8)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursor2.style.transform = 'scale(1)';
});

// Theme Toggle
themeToggle.addEventListener('click', () => {
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.className = themes[currentTheme].class;
    
    // Switch profile picture
    profilePic.src = themes[currentTheme].pics[0];
    
    // Button feedback
    themeToggle.style.transform = 'scale(0.95) translateY(-5px)';
    setTimeout(() => {
        themeToggle.style.transform = '';
    }, 150);
    
    // Trigger skill bar animations
    document.querySelectorAll('.skill-progress').forEach(bar => {
        bar.style.width = bar.style.width;
    });
});

// Parallax & 3D Tilt Effect
profileCard.addEventListener('mousemove', (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    profileCard.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        scale(1.02)
    `;
});

profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
});

// Typing Effect
function typeWriter(text, speed = 100) {
    const typingElement = document.querySelector('.typing-text');
    let i = 0;
    
    function type() {
        if (i < text.length) {
            typingElement.textContent = text.slice(0, i + 1);
            i++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                erase(text, speed);
            }, 2000);
        }
    }
    
    function erase(text, speed = 50) {
        function eraseChar() {
            if (i >= 0) {
                typingElement.textContent = text.slice(0, i);
                i--;
                setTimeout(eraseChar, speed);
            } else {
                setTimeout(() => {
                    const nextText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
                    typeWriter(nextText);
                }, 500);
            }
        }
        eraseChar();
    }
    
    type();
}

// Skill Bar Animation
function animateSkillBars() {
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const finalWidth = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = finalWidth;
        }, 500);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.desc-line, .skill-item, .social-btn').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.320, 1)';
    observer.observe(el);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Preload images
    themes.forEach(theme => {
        theme.pics.forEach(pic => {
            const img = new Image();
            img.src = pic;
        });
    });
    
    // Start typing effect
    setTimeout(() => {
        typeWriter(typingTexts[0]);
    }, 1000);
    
    // Animate skill bars
    setTimeout(animateSkillBars, 2000);
    
    // Mouse trail particles
    createMouseTrail();
});

// Mouse Trail Particles
function createMouseTrail() {
    document.addEventListener('mousemove', (e) => {
        if (Math.random() < 0.1) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                background: rgba(255,255,255,0.6);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                animation: particleFloat 2s ease-out forwards;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    });
}
