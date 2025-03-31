// Gallery Filtering
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Gallery Item Hover Effect
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.querySelector('.gallery-overlay').style.opacity = '1';
        });

        item.addEventListener('mouseleave', () => {
            item.querySelector('.gallery-overlay').style.opacity = '0';
        });
    });

    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialCards.forEach(card => {
            card.style.display = 'none';
        });
        testimonialCards[index].style.display = 'block';
    }

    // Show first testimonial
    showTestimonial(0);

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}); 