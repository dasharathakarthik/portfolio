document.addEventListener('DOMContentLoaded', function() {
    // Particles.js configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: '#00fffb'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.8,
                    opacity_min: 0.3,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    size_min: 1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 180,
                color: '#00fffb',
                opacity: 0.5,
                width: 1.2
            },
            move: {
                enable: true,
                speed: 1.5,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
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
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 250,
                    line_linked: {
                        opacity: 0.7
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Navigation functionality
    const dots = document.querySelectorAll('.dot');
    const dotNavigation = document.querySelector('.dot-navigation');
    const sections = document.querySelectorAll('section:not(#home)');
    const header = document.querySelector('header');

    function updateDots() {
        const scrollPosition = window.scrollY;
        const aboutSection = document.querySelector('#about');

        // Show/hide dot navigation based on about section
        if (scrollPosition >= (aboutSection.offsetTop - window.innerHeight/2)) {
            dotNavigation.style.opacity = '1';
            dotNavigation.style.visibility = 'visible';
        } else {
            dotNavigation.style.opacity = '0';
            dotNavigation.style.visibility = 'hidden';
        }
    }

    function setActiveDot(sectionId) {
        dots.forEach(dot => {
            dot.classList.toggle('active', dot.dataset.section === sectionId);
        });
    }

    // Smooth scroll function
    function smoothScroll(target) {
        const targetPosition = target.offsetTop - header.offsetHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    // Event Listeners
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.dataset.section;
            const targetSection = document.getElementById(targetId);
            smoothScroll(targetSection);
        });
    });

    // Throttled scroll listener
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateDots();
                updateActiveNavItem();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial state of dot navigation
    dotNavigation.style.opacity = '0';
    dotNavigation.style.visibility = 'hidden';

    // Initial update
    updateDots();

    // Add this to your existing script
    function updateActiveNavItem() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const scrollPosition = window.scrollY + (window.innerHeight / 2);
        const pageBottom = window.scrollY + window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // For other sections
        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    navLinks.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                    // Also update the corresponding dot
                    setActiveDot(sectionId);
                }
            }
        });

        // Check if we're at the bottom of the page for contact section
        if (pageBottom >= docHeight - 50) {
            navLinks.forEach(l => l.classList.remove('active'));
            const contactLink = document.querySelector('nav ul li a[href="#contact"]');
            contactLink.classList.add('active');
            setActiveDot('contact');
        }
    }

    // Call on initial load
    updateActiveNavItem();

    // Add this to your existing JavaScript
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Update copyright year automatically
    const copyrightYear = document.querySelector('footer p:first-of-type');
    copyrightYear.innerHTML = `&copy; ${new Date().getFullYear()} Karthik Reddy Personal Portfolio. All rights reserved.`;

    // Update the form submission handler
    document.querySelector('.contact-form form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form from opening in new tab
        
        // Get form data and submit to Google Forms
        const formData = new FormData(this);
        fetch(this.action, {
            method: 'POST',
            body: formData
        });
        
        // Show success message
        const popup = document.createElement('div');
        popup.className = 'submit-popup';
        popup.innerHTML = `
            <div class="popup-content">
                <i class="fas fa-check-circle"></i>
                <p>Message sent successfully!</p>
            </div>
        `;
        
        // Add popup to body
        document.body.appendChild(popup);
        
        // Clear the form
        this.reset();
        
        // Remove popup after 3 seconds
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 300);
        }, 3000);
    });

    // Add this to your existing JavaScript
    const showMoreBtn = document.getElementById('showMoreBtn');
    const hiddenVideos = document.querySelectorAll('.video-item.hidden');
    
    showMoreBtn.addEventListener('click', function() {
        hiddenVideos.forEach(video => {
            video.classList.toggle('hidden');
        });
        
        // Toggle button text and icon
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-plus"></i> Show Less';
        } else {
            this.innerHTML = '<i class="fas fa-plus"></i> Show More';
        }
    });

    // Update the education expand function
    document.getElementById('expandEducation').addEventListener('click', function() {
        const timeline = document.querySelector('.education-timeline');
        timeline.classList.toggle('hidden');
        timeline.classList.toggle('show');
        
        this.classList.toggle('active');
        if (this.classList.contains('active')) {
            this.innerHTML = '<i class="fas fa-plus"></i> Show Less';
        } else {
            this.innerHTML = '<i class="fas fa-plus"></i> Show More';
        }
    });

    // Update the createVideoPopup function
    function createVideoPopup(videoSrc, currentIndex) {
        const popup = document.createElement('div');
        popup.className = 'video-popup';
        
        // Get ALL videos except 'coming-soon', regardless of hidden state
        const videos = Array.from(document.querySelectorAll('.video-item:not(.coming-soon)'));
        
        popup.innerHTML = `
            <div class="video-popup-content">
                <button class="close-popup"><i class="fas fa-times"></i></button>
                <button class="video-nav-btn prev"><i class="fas fa-chevron-left"></i></button>
                <button class="video-nav-btn next"><i class="fas fa-chevron-right"></i></button>
                <div class="video-container">
                    <iframe 
                        src="${videoSrc}"
                        frameborder="0" 
                        allow="autoplay; encrypted-media" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
        
        document.body.appendChild(popup);
        
        let currentContainer = popup.querySelector('.video-container');
        
        async function switchVideo(newSrc, direction) {
            // Create new container
            const newContainer = document.createElement('div');
            newContainer.className = 'video-container';
            newContainer.style.position = 'absolute';
            newContainer.style.top = '0';
            newContainer.style.left = '0';
            newContainer.style.width = '100%';
            newContainer.style.height = '100%';
            newContainer.style.transform = direction === 'prev' ? 'translateX(-100%)' : 'translateX(100%)';
            
            newContainer.innerHTML = `
                <iframe 
                    src="${newSrc}"
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
            `;
            
            // Add new container
            popup.querySelector('.video-popup-content').appendChild(newContainer);
            
            // Animate transition
            await new Promise(resolve => {
                requestAnimationFrame(() => {
                    // Slide out current
                    currentContainer.style.transform = direction === 'prev' ? 'translateX(100%)' : 'translateX(-100%)';
                    // Slide in new
                    newContainer.style.transform = 'translateX(0)';
                    
                    setTimeout(() => {
                        currentContainer.remove();
                        currentContainer = newContainer;
                        resolve();
                    }, 500);
                });
            });
        }
        
        // Navigation handlers
        popup.querySelector('.prev').addEventListener('click', () => {
            const prevIndex = (currentIndex - 1 + videos.length) % videos.length;
            const prevVideo = videos[prevIndex].querySelector('iframe');
            switchVideo(prevVideo.src, 'prev');
            currentIndex = prevIndex;
        });
        
        popup.querySelector('.next').addEventListener('click', () => {
            const nextIndex = (currentIndex + 1) % videos.length;
            const nextVideo = videos[nextIndex].querySelector('iframe');
            switchVideo(nextVideo.src, 'next');
            currentIndex = nextIndex;
        });
        
        // Close handlers
        popup.querySelector('.close-popup').addEventListener('click', () => popup.remove());
        popup.addEventListener('click', e => {
            if (e.target === popup) popup.remove();
        });
    }

    // Update the click handlers
    document.querySelectorAll('.video-item').forEach((item, index) => {
        const iframe = item.querySelector('iframe');
        if (iframe && !item.classList.contains('coming-soon')) {
            item.addEventListener('click', () => {
                createVideoPopup(iframe.src, index);
            });
            item.style.cursor = 'pointer';
        }
    });
}); 