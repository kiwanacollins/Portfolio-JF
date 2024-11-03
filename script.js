document.addEventListener('DOMContentLoaded', () => {
    // First, determine which page we're on
    const isAboutPage = window.location.pathname.includes('about.html');
    const isHomePage = !isAboutPage;

    // Handle navigation highlighting
    const navLinks = document.querySelectorAll('.nav-links a');

    if (isHomePage) {
        // For index.html
        const sections = document.querySelectorAll('section[id]');
        
        function updateNavigation() {
            const scrollY = window.scrollY;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        // Set initial active state for home
        if (scrollY < 100) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', updateNavigation);
        updateNavigation();
    } else {
        // For about.html
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes('about.html')) {
                link.classList.add('active');
            }
        });
    }

    // Check if we're on the about page
    const aboutSection = document.querySelector('.about-section');
    
    if (aboutSection) {
        // Get all blocks
        const blocks = document.querySelectorAll('.block');
        
        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.2
        });

        // Observe each block
        blocks.forEach(block => {
            observer.observe(block);
        });

        // Animate intro block with a slight delay
        const introBlock = document.querySelector('.intro-block');
        if (introBlock) {
            setTimeout(() => {
                introBlock.classList.add('animate');
            }, 300);
        }
    }

    // Testimonials Section
    function initializeTestimonials() {
        // First, check if we're on the page with testimonials
        const testimonialTrack = document.getElementById('testimonialTrack');
        if (!testimonialTrack) return;


        // Define testimonials data
        const testimonials = [
            {
                name: 'Kiwana Collins',
                role: 'Frontend Developer @ KIU',
                image: 'https://kiwanacollins.github.io/port.github.io/me.jpg',
                text: 'Working with Jonathan as my team leader was transformative. He wasn\'t just a leader, but a mentor who genuinely cared about my growth.'
            },
            {
                name: 'Alinda Joshua',
                role: 'Team Lead @ MUK',
                image: './jonny_with_beats.JPG',
                text: 'Been working closely with Jonathan on projects, and his exceptional problem-solving skills and attention to details were instrumental in its success.'
            }
        ];

        // Create HTML for a single card
        function createCard(testimonial) {
            return `
                <div class="testimonial-card">
                    <div class="testimonial-profile">
                        <img src="${testimonial.image}" alt="${testimonial.name}">
                        <div class="profile-info">
                            <h3>${testimonial.name}</h3>
                            <p>${testimonial.role}</p>
                        </div>
                    </div>
                    <p class="testimonial-text">${testimonial.text}</p>
                </div>
            `;
        }

        // Create initial cards
        let cardsHTML = '';
        // Repeat testimonials 3 times for continuous scroll
        for (let i = 0; i < 3; i++) {
            testimonials.forEach(testimonial => {
                cardsHTML += createCard(testimonial);
            });
        }

        // Insert cards into track
        testimonialTrack.innerHTML = cardsHTML;
        console.log('Cards inserted'); // Debug log

        // Initialize scroll
        let scrollPosition = 0;
        const scrollSpeed = 0.5;
        let isScrolling = true;

        function scroll() {
            if (!isScrolling) return;

            scrollPosition -= scrollSpeed;
            const firstCard = testimonialTrack.firstElementChild;
            const cardWidth = firstCard.offsetWidth + 50; // Width + gap

            // Reset position when we've scrolled one card width
            if (Math.abs(scrollPosition) >= cardWidth) {
                scrollPosition = 0;
                testimonialTrack.appendChild(firstCard);
            }

            testimonialTrack.style.transform = `translateX(${scrollPosition}px)`;
            requestAnimationFrame(scroll);
        }

        // Add hover handlers
        testimonialTrack.addEventListener('mouseenter', () => {
            isScrolling = false;
        });

        testimonialTrack.addEventListener('mouseleave', () => {
            isScrolling = true;
            scroll(); // Resume scrolling
        });

        // Start scrolling
        scroll();
    }

    // Initialize testimonials
    initializeTestimonials();

    // Clock functionality
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = String(hours).padStart(2, '0');

        document.getElementById('hrs').textContent = hours;
        document.getElementById('min').textContent = minutes;
        document.getElementById('sec').textContent = seconds;
        
        // Add AM/PM indicator
        // First, check if the AM/PM span exists, if not create it
        let ampmSpan = document.getElementById('ampm');
        if (!ampmSpan) {
            ampmSpan = document.createElement('span');
            ampmSpan.id = 'ampm';
            document.querySelector('.clock').appendChild(ampmSpan);
        }
        ampmSpan.textContent = ampm;
    }

    // Update clock immediately and then every second
    updateClock();
    setInterval(updateClock, 1000);

    // Add this to your window.onload or document.addEventListener('DOMContentLoaded')
    gsap.to(".hero-title .text-line", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.25,
        ease: "power4.out"
    });

    gsap.to(".wave-emoji", {
        opacity: 1,
        rotation: 0,
        duration: 0.6,
        delay: 0.8,
        ease: "back.out(1.7)"
    });

    // Add this near the top of your script.js file
    gsap.registerPlugin(ScrollTrigger);

    // Add this text animation code
    const animateText = () => {
        const text = document.querySelector('.testimonial-title');
        
        // Split the text into lines
        const lines = text.innerHTML.split('<br>');
        text.innerHTML = '';
        
        // Wrap each line in a span
        lines.forEach(line => {
            const lineWrapper = document.createElement('span');
            lineWrapper.className = 'line-wrapper';
            
            const lineContent = document.createElement('span'); 
            lineContent.className = 'line-content';
            lineContent.textContent = line;
            
            lineWrapper.appendChild(lineContent);
            text.appendChild(lineWrapper);
        });

        // Animate each line
        gsap.from('.line-content', {
            y: 200,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: '.testimonial-title',
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // Call the animation function
    animateText();

    // Bounce animation for testimonial title
    gsap.from(".bounce-word", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "bounce.out",
        scrollTrigger: {
            trigger: ".testimonial-title",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});
