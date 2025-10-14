// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links and update navigation on scroll
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Update navigation on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
});

// Typewriter Effect
document.addEventListener('DOMContentLoaded', function() {
    const typewriterText = document.getElementById('typewriter');
    const phrases = [
        "Full Stack .NET Developer |",
        "1.4+ Years Experience |",
        "ASP.NET Core | MVC | Web API",
        "SQL Server | EF Core | LINQ",
        "JavaScript | Bootstrap | jQuery"
    ];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;

    const fixedHeightContainer = document.querySelector('.typewriter-container');

    if (fixedHeightContainer) {
        typewriterText.textContent = "Full Stack .NET Developer";
        const maxHeight = typewriterText.offsetHeight;
        fixedHeightContainer.style.minHeight = `${maxHeight}px`;
        typewriterText.textContent = "";
    }

    function typeWriter() {
        const phrase = phrases[currentPhrase];
        if (isDeleting) {
            typewriterText.textContent = phrase.substring(0, currentChar - 1);
            currentChar--;
        } else {
            typewriterText.textContent = phrase.substring(0, currentChar + 1);
            currentChar++;
        }

        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed = 50;
        }

        if (!isDeleting && currentChar === phrase.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typeSpeed = 500;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();
});

// Skill bars animation
document.addEventListener('DOMContentLoaded', function() {
    const skillBars = document.querySelectorAll('.skill-progress');
    const animateSkillBars = () => {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width;
        });
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, {
        threshold: 0.5
    });

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }
});

// Projects Show More/Less functionality
document.addEventListener('DOMContentLoaded', function() {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');
    let isExpanded = false;

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            if (!isExpanded) {
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('show');
                    }, index * 100);
                });

                showMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Projects';
                isExpanded = true;
            } else {
                hiddenProjects.forEach(project => {
                    project.classList.remove('show');
                });

                showMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Show More Projects';
                isExpanded = false;

                setTimeout(() => {
                    document.getElementById('projects').scrollIntoView({
                        behavior: 'smooth'
                    });
                }, 300);
            }
        });
    }
});

// Smooth scroll for hero scroll indicator
document.addEventListener('DOMContentLoaded', function() {
    const heroScroll = document.querySelector('.hero-scroll a');
    if (heroScroll) {
        heroScroll.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Enhanced Card Animations with Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-enter-active');
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.project-card, .achievement-card, .extracurr-card, .about-stats .stat');
    cards.forEach(card => {
        card.classList.add('card-enter');
        observer.observe(card);
    });
});

// Project Card Tilt Effect
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
});

// Particle Background Animation
document.addEventListener('DOMContentLoaded', function() {
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        const particleCount = 50;
        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particlesContainer.appendChild(particle);
        }
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }
    }
});

// Dynamic Background System - Floating Bubbles & Geometric Shapes
document.addEventListener('DOMContentLoaded', function() {
    const bubblesContainer = document.getElementById('bubbles');
    const shapesContainer = document.getElementById('shapes');

    if (bubblesContainer) {
        const bubbleCount = 8;
        function createBubble() {
            const bubble = document.createElement('div');
            bubble.className = 'bubble';
            const size = Math.random() * 30 + 15;
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = Math.random() * 100 + '%';
            const duration = Math.random() * 7 + 8;
            bubble.style.animationDuration = duration + 's';
            bubble.style.animationDelay = Math.random() * 5 + 's';
            bubble.style.opacity = Math.random() * 0.7 + 0.3;
            bubblesContainer.appendChild(bubble);

            setTimeout(() => {
                if (bubble.parentNode) {
                    bubble.parentNode.removeChild(bubble);
                }
            }, (duration + 5) * 1000);
        }
        for (let i = 0; i < bubbleCount; i++) {
            setTimeout(() => createBubble(), i * 1000);
        }
        setInterval(() => {
            createBubble();
        }, 4000);
    }
    
    if (shapesContainer) {
        const shapeTypes = ['triangle', 'diamond', 'hexagon'];
        function createShape() {
            const shape = document.createElement('div');
            shape.className = 'shape';
            const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
            if (shapeType === 'triangle') {
                shape.classList.add('shape-triangle');
                const size = Math.random() * 12 + 10;
                shape.style.borderBottomWidth = size + 'px';
                shape.style.borderLeftWidth = size / 2 + 'px';
                shape.style.borderRightWidth = size / 2 + 'px';
                shape.style.borderBottomColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
            } else if (shapeType === 'diamond') {
                shape.classList.add('shape-diamond');
                const size = Math.random() * 15 + 10;
                shape.style.width = size + 'px';
                shape.style.height = size + 'px';
            } else {
                shape.classList.add('shape-hexagon');
                const size = Math.random() * 18 + 12;
                shape.style.width = size + 'px';
                shape.style.height = size * 0.866 + 'px';
            }

            shape.style.left = Math.random() * 100 + '%';
            const duration = Math.random() * 2 + 3;
            shape.style.animationDuration = duration + 's';
            shape.style.animationDelay = Math.random() * 5 + 's';
            shapesContainer.appendChild(shape);

            setTimeout(() => {
                if (shape.parentNode) {
                    shape.parentNode.removeChild(shape);
                }
            }, (duration + 5) * 1000);
        }
        for (let i = 0; i < 5; i++) {
            setTimeout(() => createShape(), i * 1500);
        }
        setInterval(() => {
            createShape();
        }, 3500);
    }
});
