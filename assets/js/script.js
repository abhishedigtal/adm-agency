// Main JavaScript for Abhishek Digital Marketing Agency Website

document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            let isValid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('is-invalid');
                } else {
                    field.classList.remove('is-invalid');
                }
            });
            
            if (!isValid) {
                showAlert('Please fill in all required fields.', 'danger');
                return;
            }
            
            // Email validation
            const emailField = document.getElementById('email');
            if (emailField && !isValidEmail(emailField.value)) {
                emailField.classList.add('is-invalid');
                showAlert('Please enter a valid email address.', 'danger');
                return;
            }
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // In a real application, you would send the data to a server here
            setTimeout(() => {
                showAlert('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 2000);
        });
    }

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card, .service-detail-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Testimonial slider (if added in future)
    initializeTestimonialSlider();

    // Counter animation for statistics
    initializeCounters();

    // Back to top button
    initializeBackToTop();

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Insert at the beginning of the contact form or page header
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.insertBefore(alertDiv, contactForm.firstChild);
    } else {
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            pageHeader.parentNode.insertBefore(alertDiv, pageHeader.nextSibling);
        }
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Initialize testimonial slider
function initializeTestimonialSlider() {
    // This would be implemented if testimonials are added to the site
    console.log('Testimonial slider initialization would go here');
}

// Initialize counter animation
function initializeCounters() {
    const counterElements = document.querySelectorAll('.counter');
    
    if (counterElements.length > 0) {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current).toLocaleString();
                    }, 16);
                    
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);
        
        counterElements.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
}

// Initialize back to top button
function initializeBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopButton.className = 'btn btn-primary back-to-top';
    backToTopButton.style.position = 'fixed';
    backToTopButton.style.bottom = '20px';
    backToTopButton.style.right = '20px';
    backToTopButton.style.zIndex = '1000';
    backToTopButton.style.borderRadius = '50%';
    backToTopButton.style.width = '50px';
    backToTopButton.style.height = '50px';
    backToTopButton.style.display = 'none';
    backToTopButton.style.alignItems = 'center';
    backToTopButton.style.justifyContent = 'center';
    
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form field validation on blur
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.querySelectorAll('.form-control, .form-select');
    
    formFields.forEach(field => {
        field.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
            }
            
            // Email validation
            if (this.type === 'email' && this.value.trim() && !isValidEmail(this.value)) {
                this.classList.add('is-invalid');
            }
        });
        
        field.addEventListener('input', function() {
            if (this.classList.contains('is-invalid')) {
                this.classList.remove('is-invalid');
            }
        });
    });
});