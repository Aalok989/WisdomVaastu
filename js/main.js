// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const name = form.querySelector('[name="name"]');
        const email = form.querySelector('[name="email"]');
        const phone = form.querySelector('[name="phone"]');
        const message = form.querySelector('[name="message"]');

        // Name validation
        if (name && name.value.trim().length < 2) {
            showError(name, 'Name must be at least 2 characters long');
            isValid = false;
        } else {
            clearError(name);
        }

        // Email validation
        if (email && !isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        } else {
            clearError(email);
        }

        // Phone validation
        if (phone && !isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phone);
        }

        // Message validation
        if (message && message.value.trim().length < 10) {
            showError(message, 'Message must be at least 10 characters long');
            isValid = false;
        } else {
            clearError(message);
        }

        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        }
    });
}

// Helper functions for form validation
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isValidPhone(phone) {
    const re = /^\+?[\d\s-]{10,}$/;
    return re.test(phone);
}

function showError(input, message) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    input.classList.add('error');
}

function clearError(input) {
    const formGroup = input.parentElement;
    const error = formGroup.querySelector('.error-message');
    if (error) {
        formGroup.removeChild(error);
    }
    input.classList.remove('error');
}

// Animate Stats Counter
function animateCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const count = parseInt(target.getAttribute('data-count'));
                let current = 0;
                const increment = Math.ceil(count / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= count) {
                        current = count;
                        clearInterval(timer);
                    }
                    target.textContent = current;
                }, 30);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (!faqItems.length) return;

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active before
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Testimonial Carousel
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const indicators = document.querySelectorAll('.indicator');
    if (!testimonials.length || !indicators.length) return;

    let currentIndex = 0;
    let timer;

    function showTestimonial(index) {
        testimonials.forEach(item => {
            item.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });

        testimonials[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
            clearInterval(timer);
            timer = setInterval(nextTestimonial, 5000);
        });
    });

    // Auto cycle through testimonials
    timer = setInterval(nextTestimonial, 5000);
}

// Initialize form validation for contact form and all other functions
document.addEventListener('DOMContentLoaded', () => {
    validateForm('contact-form');
    animateCounter();
    initFAQ();
    initTestimonialCarousel();
}); 