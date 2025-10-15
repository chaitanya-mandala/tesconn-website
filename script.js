// Initialize Particles.js - Updated
document.addEventListener('DOMContentLoaded', function () {
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 100,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#667eea', '#764ba2', '#4facfe', '#2c3e50', '#34495e', '#007bff', '#00d4ff']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.5,
                        opacity_min: 0.3,
                        sync: false
                    }
                },
                size: {
                    value: 4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: '#ffffff',
                    opacity: 0.35,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    ontouchstart: {
                        enable: true,
                        mode: 'push'
                    },
                    ontouchmove: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 300,
                        line_linked: {
                            opacity: 0.8
                        }
                    },
                    bubble: {
                        distance: 300,
                        size: 30,
                        duration: 1.5,
                        opacity: 6,
                        speed: 2
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.3
                    },
                    push: {
                        particles_nb: 6
                    },
                    remove: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }
});

// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function () {

    // Loading animation
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(loading);

    // Track loaded resources
    let resourcesLoaded = 0;
    const totalResources = 2; // CSS and JS (HTML already loaded via DOMContentLoaded)

    // Function to check if all resources are loaded
    function checkAllResourcesLoaded() {
        resourcesLoaded++;
        console.log(`Resource loaded: ${resourcesLoaded}/${totalResources}`);
        if (resourcesLoaded >= totalResources) {
            // All resources loaded, hide loading and start animation
            setTimeout(() => {
                loading.classList.add('hidden');
                setTimeout(() => {
                    loading.remove();
                    startHeroAnimation();
                }, 500);
            }, 300); // Small delay for smooth transition
        }
    }

    // Track CSS loading
    const cssLink = document.querySelector('link[href="styles.css"]');
    if (cssLink) {
        cssLink.addEventListener('load', checkAllResourcesLoaded);
        cssLink.addEventListener('error', checkAllResourcesLoaded); // Fallback
    } else {
        checkAllResourcesLoaded(); // CSS already loaded
    }

    // Track JS loading (this script) - use window load event
    window.addEventListener('load', function () {
        checkAllResourcesLoaded();
    });

    // Fallback: if window load doesn't fire, use timeout
    setTimeout(() => {
        if (resourcesLoaded < totalResources) {
            console.log('Fallback: forcing resource completion');
            checkAllResourcesLoaded();
        }
    }, 2000);

    // Function to start hero animation after everything is loaded
    function startHeroAnimation() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            // Check if mobile and adjust accordingly
            const isMobile = window.innerWidth <= 768;
            const isSmallMobile = window.innerWidth <= 576;

            // Set appropriate min-height based on screen size
            if (isSmallMobile) {
                heroTitle.style.minHeight = '140px';
            } else if (isMobile) {
                heroTitle.style.minHeight = '160px';
            } else {
                heroTitle.style.minHeight = '120px';
            }

            heroTitle.style.display = 'flex';
            heroTitle.style.alignItems = 'center';
            heroTitle.style.flexDirection = isMobile ? 'column' : 'row';

            // Hide the title initially
            heroTitle.style.opacity = '0';
            heroTitle.innerHTML = '';

            // Create spans for each word and add them to the container
            const words = [
                { text: 'Innovate.', class: 'text-primary' },
                { text: 'Automate.', class: 'text-white' },
                { text: 'Excel.', class: 'text-primary' }
            ];

            // Create all spans first (hidden)
            words.forEach((word, index) => {
                const span = document.createElement('span');
                span.textContent = word.text;
                span.className = word.class;
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.transition = 'all 0.6s ease-out';

                // Adjust spacing based on screen size
                if (isSmallMobile) {
                    span.style.marginBottom = '0.02em';
                    span.style.display = 'block';
                    span.style.verticalAlign = 'middle';
                } else if (isMobile) {
                    span.style.marginBottom = '0.05em';
                    span.style.display = 'block';
                    span.style.verticalAlign = 'middle';
                } else {
                    span.style.marginRight = '0.5em';
                }

                heroTitle.appendChild(span);
            });


            heroTitle.style.opacity = '1';
            // Animate each word in sequence
            animateWordsSequentially(heroTitle.children, 0, 500);

        }
    }

    // Animate words sequentially without overwriting content
    function animateWordsSequentially(spans, index, delay) {
        if (index < spans.length) {
            setTimeout(() => {
                spans[index].style.opacity = '1';
                spans[index].style.transform = 'translateY(0)';
                animateWordsSequentially(spans, index + 1, delay);
            }, delay);
        }
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    const smoothNavLinks = document.querySelectorAll('a[href^="#"]');
    smoothNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.service-card, .project-card, .stat-item, .client-category, .contact-item, .mission-card, .vision-card, .machinery-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        // Check if element has a plus symbol
        const hasPlus = element.querySelector('.stat-plus');
        const plusSymbol = hasPlus ? hasPlus.outerHTML : '';

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.innerHTML = Math.floor(current) + plusSymbol;
        }, 16);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Enhanced typing animation for hero title that preserves HTML
    function typeWriterWithHTML(element, textArray, speed = 100) {
        let i = 0;
        let currentText = '';

        function type() {
            if (i < textArray.length) {
                const currentSpan = textArray[i];
                currentText += currentSpan;
                element.innerHTML = currentText;
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Machinery card hover effects
    const machineryCards = document.querySelectorAll('.machinery-card');
    machineryCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });

    // Machinery image popup functionality
    const machineryImages = document.querySelectorAll('.machinery-image');
    machineryImages.forEach(imageContainer => {
        imageContainer.addEventListener('click', function () {
            const img = this.querySelector('img');
            const alt = img.getAttribute('alt');
            const src = img.getAttribute('src');

            // Create modal
            const modal = document.createElement('div');
            modal.className = 'machinery-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;

            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: #1a1a1a;
                border-radius: 15px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                transform: scale(0.8);
                transition: transform 0.3s ease;
            `;

            // Create image
            const modalImg = document.createElement('img');
            modalImg.src = src;
            modalImg.alt = alt;
            modalImg.style.cssText = `
                width: 100%;
                height: auto;
                max-height: 80vh;
                object-fit: contain;
                display: block;
            `;

            // Create close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '<i class="fas fa-times"></i>';
            closeBtn.style.cssText = `
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                font-size: 1.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: background 0.3s ease;
            `;

            // Create title
            const title = document.createElement('div');
            title.textContent = alt;
            title.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
                color: white;
                padding: 30px 20px 20px;
                font-size: 1.2rem;
                font-weight: 600;
                text-align: center;
            `;

            // Assemble modal
            modalContent.appendChild(modalImg);
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(title);
            modal.appendChild(modalContent);
            document.body.appendChild(modal);

            // Animate in
            setTimeout(() => {
                modal.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);

            // Close functionality
            const closeModal = () => {
                modal.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    modal.remove();
                }, 300);
            };

            closeBtn.addEventListener('click', closeModal);
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    closeModal();
                }
            });

            // ESC key close
            const handleEsc = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEsc);
                }
            };
            document.addEventListener('keydown', handleEsc);
        });
    });

    // Contact form handling - REMOVED (no form present)
    // Contact details are now display-only

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#007bff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 400px;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #007bff, #0056b3);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
    `;

    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Mouse cursor effect - Only for desktop
    if (window.innerWidth > 768 && !('ontouchstart' in window)) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 123, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'rgba(0, 123, 255, 1)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 123, 255, 0.8)';
            });
        });
    }

    // Preload images (excluding logos, machinery images, and carousel images)
    const images = document.querySelectorAll('img:not(.navbar-logo):not(.footer-logo-img):not(.machinery-image img):not(.carousel-item-image img)');
    images.forEach(img => {
        img.addEventListener('load', function () {
            this.style.opacity = '1';
        });

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function () {
        // Scroll-based animations can be added here
    }, 16);

    window.addEventListener('scroll', debouncedScrollHandler);

    // Initialize AOS (Animate On Scroll) alternative
    function initScrollAnimations() {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(el => {
            const animation = el.getAttribute('data-aos');
            el.classList.add('aos-init');
            el.classList.add(`aos-${animation}`);
        });
    }

    // Call initialization
    initScrollAnimations();

    // Navbar Active State Management
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Update active nav link on scroll
    window.addEventListener('scroll', updateActiveNavLink);

    // Update active nav link on click
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });

    // Add some interactive elements
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach(icon => {
        icon.addEventListener('click', function () {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'pulse 2s infinite';
            }, 10);
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Bootstrap Carousel Functionality
    const projectsData = [
        {
            folder: '3dpcp',
            name: '3D Printed Custom Products',
            description: 'Custom 3D printed components and prototypes'
        },
        {
            folder: 'cabel-winding',
            name: 'Cable Winding Machine',
            description: 'Fully automatic cable winding and packaging system'
        },
        {
            folder: 'hegm',
            name: 'Hybrid Energy Generator Machine',
            description: 'Innovative hybrid energy generation system'
        },
        {
            folder: 'lms',
            name: 'Linear Motion Systems',
            description: 'Precision linear motion and automation solutions'
        },
        {
            folder: 'plms',
            name: 'Precision Linear Motion Slides',
            description: 'High-precision linear motion slides with servo control'
        },
        {
            folder: 'spm-fp',
            name: 'Special Purpose Machine - Food Processing',
            description: 'Automated food processing machinery'
        },
        {
            folder: 'spm-hsd',
            name: 'SPM - Hydraulic System Development',
            description: 'Custom hydraulic systems and components'
        },
        {
            folder: 'spm-hvps',
            name: 'SPM - Hydraulic Valve Pack System',
            description: 'Advanced hydraulic valve pack systems'
        },
        {
            folder: 'spmhs',
            name: 'Special Purpose Machine - Hydraulic System',
            description: 'Heavy-duty hydraulic machinery systems'
        },
        {
            folder: 'spmsu',
            name: 'Special Purpose Machine - Sub Units',
            description: 'Custom sub-unit systems and components'
        },
        {
            folder: 'spmsus',
            name: 'Special Purpose Machine - Sub Unit Systems',
            description: 'Advanced sub-unit automation systems'
        },
        {
            folder: 'tri-axis-travers',
            name: 'Tri-Axis Travers Bar Machine',
            description: 'Fully automatic 3-axis pick and place machine'
        }
    ];

    function initializeBootstrapCarousel() {
        const carouselInner = document.getElementById('carouselInner');
        if (!carouselInner) {
            console.error('Carousel inner element not found!');
            return;
        }

        // Clear existing content
        carouselInner.innerHTML = '';

        // Create carousel items
        projectsData.forEach((project, index) => {
            const imageSrc = `images/projects/${project.folder}/1.jpg`;
            const fallbackSrc = `images/projects/${project.folder}/1.png`;

            const carouselItem = document.createElement('div');
            carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;

            carouselItem.innerHTML = `
                <div class="carousel-item-image">
                    <img src="${imageSrc}" alt="${project.name}"
                         onerror="this.src='${fallbackSrc}'"
                         style="opacity: 1 !important;">
                </div>
                <div class="carousel-item-content">
                    <h4>${project.name}</h4>
                    <p>${project.description}</p>
                </div>
            `;

            carouselItem.addEventListener('click', () => {
                window.location.href = `gallery.html?project=${project.folder}`;
            });

            carouselInner.appendChild(carouselItem);
        });

        console.log('Bootstrap carousel initialized with', projectsData.length, 'items');
    }

    // Initialize Bootstrap carousel when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeBootstrapCarousel);
    } else {
        initializeBootstrapCarousel();
    }

    console.log('Tesconn Automation Systems website loaded successfully!');
});

