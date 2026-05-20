$(document).ready(function() {
    // Navbar scroll effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('#navToggle').on('click', function() {
        $(this).toggleClass('active');
        $('#navMenu').toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').on('click', function() {
        $('#navToggle').removeClass('active');
        $('#navMenu').removeClass('active');
    });

    // Smooth scroll for navigation links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });

    // Timeline animation on scroll
    function animateTimeline() {
        $('.timeline-item').each(function() {
            const itemTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > itemTop + 100) {
                $(this).addClass('visible');
            }
        });
    }

    // Skills progress bar animation
    function animateSkills() {
        $('.quality-bar').each(function() {
            const barTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();
            
            if (windowBottom > barTop + 50 && !$(this).hasClass('animated')) {
                const progress = $(this).data('progress');
                $(this).css('--progress', progress + '%');
                $(this).addClass('animated');
            }
        });
    }

    // Portfolio filter functionality
    $('.filter-btn').on('click', function() {
        const filter = $(this).data('filter');
        
        // Update active button
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        // Filter items with animation
        if (filter === 'all') {
            $('.portfolio-item').removeClass('hidden');
        } else {
            $('.portfolio-item').each(function() {
                if ($(this).data('category') === filter) {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            });
        }
    });

    // Contact form submission
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        const name = $('#name').val();
        const email = $('#email').val();
        const message = $('#message').val();
        
        // Simple validation
        if (name && email && message) {
            // Simulate form submission
            const $btn = $(this).find('.submit-btn');
            const originalText = $btn.text();
            
            $btn.text('Enviando...').prop('disabled', true);
            
            setTimeout(function() {
                alert('¡Gracias por tu mensaje, ' + name + '! Te contactaré pronto.');
                $('#contactForm')[0].reset();
                $btn.text(originalText).prop('disabled', false);
            }, 1500);
        }
    });

    // Scroll event listener
    $(window).on('scroll', function() {
        animateTimeline();
        animateSkills();
    });

    // Initial check for elements in view
    animateTimeline();
    animateSkills();

    // Add parallax effect to hero section
    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
        $('.hero-content').css('opacity', 1 - (scrolled / 600));
    });

    // Portfolio card hover effect enhancement
    $('.portfolio-card').on('mouseenter', function() {
        $(this).find('.portfolio-image').css('transform', 'scale(1.05)');
    }).on('mouseleave', function() {
        $(this).find('.portfolio-image').css('transform', 'scale(1)');
    });

    // Add typing effect to hero subtitle
    function typeWriter(element, text, speed) {
        let i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Initialize typing effect after page load
    setTimeout(function() {
        // Typing effect is optional - uncomment to enable
        // typeWriter($('.hero-subtitle'), 'PORTAFOLIO', 100);
    }, 1000);

    // Counter animation for stats (if needed in future)
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.text(Math.floor(start));
                requestAnimationFrame(updateCounter);
            } else {
                element.text(target);
            }
        }
        updateCounter();
    }

    // Add scroll reveal animation to sections
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.section-header, .about-content, .skills-content, .contact-content');
        
        reveals.forEach(function(reveal) {
            const windowHeight = window.innerHeight;
            const revealTop = reveal.getBoundingClientRect().top;
            const revealPoint = 150;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('revealed');
            }
        });
    }

    // Add CSS for reveal animation dynamically
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .section-header, .about-content, .skills-content, .contact-content {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease;
            }
            .section-header.revealed, .about-content.revealed, .skills-content.revealed, .contact-content.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');

    $(window).on('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Active navigation link based on scroll position
    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop() + 100;
        
        $('section').each(function() {
            const sectionTop = $(this).offset().top;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + sectionId + '"]').addClass('active');
            }
        });
    });

    // Program icons hover animation
    $('.program-item').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });

    console.log('[v0] Jonathan Vasquez Portfolio - Loaded successfully');
});
