document.addEventListener('DOMContentLoaded', function() {
    // Handle main video autoplay
    const mainVideo = document.querySelector('.main-gig iframe');
    if (mainVideo) {
        // Reload the iframe to trigger autoplay
        mainVideo.src = mainVideo.src + '?autoplay=1';
    }

    // Particles.js configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            color: {
                value: '#ffffff'
            },
            shape: {
                type: 'circle'
            },
            opacity: {
                value: 0.3,
                random: true,
                anim: {
                    enable: true,
                    speed: 0.5,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
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
                distance: 150,
                color: '#ffffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
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
                        opacity: 0.4
                    }
                },
                push: {
                    particles_nb: 3
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

    // Initialize video items
    function initializeVideoItems() {
        // Initialize featured video
        const mainGig = document.querySelector('.main-gig');
        if (mainGig) {
            const iframe = mainGig.querySelector('iframe');
            if (iframe) {
                // Ensure iframe has proper attributes
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
                iframe.setAttribute('allowfullscreen', 'true');
                
                // Ensure proper aspect ratio
                const wrapper = iframe.closest('.video-wrapper');
                if (wrapper) {
                    wrapper.style.paddingTop = '56.25%'; // Force 16:9 aspect ratio
                }
            }
        }

        // Initialize category videos
        const videoItems = document.querySelectorAll('.video-item:not(.coming-soon)');
        videoItems.forEach(item => {
            const iframe = item.querySelector('iframe');
            if (iframe) {
                // Ensure iframe has proper attributes
                iframe.setAttribute('frameborder', '0');
                iframe.setAttribute('allow', 'autoplay; encrypted-media; fullscreen');
                iframe.setAttribute('allowfullscreen', 'true');
                
                // Ensure proper aspect ratio
                const wrapper = iframe.closest('.video-wrapper');
                if (wrapper) {
                    wrapper.style.paddingTop = '56.25%'; // Force 16:9 aspect ratio
                }
            }
        });
    }

    // Category switching functionality
    function initializeCategoryTabs() {
        const categoryTabs = document.querySelectorAll('.category-tab');
        const videoItems = document.querySelectorAll('.video-item');

        // Function to handle category filtering
        function filterVideos(category) {
            // Remove active class from all tabs
            categoryTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            const activeTab = document.querySelector(`.category-tab[data-category="${category}"]`);
            if (activeTab) {
                activeTab.classList.add('active');
            }

            // Filter videos with animation
            videoItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // First set opacity and transform for animation
                if (category === 'all' || itemCategory === category) {
                    // Show this item
                    item.style.display = 'block';
                    // Use setTimeout to ensure display: block has taken effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide this item
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    // After animation completes, hide the element
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300); // Match this with your CSS transition duration
                }
            });
        }

        // Add click event listeners to category tabs
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                filterVideos(category);
            });
        });

        // Show all videos initially
        filterVideos('all');
    }

    // Initialize all components
    initializeVideoItems();
    initializeCategoryTabs();
}); 