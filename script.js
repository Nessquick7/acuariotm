document.addEventListener('DOMContentLoaded', function () {

    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', function () {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') ?
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';


        if (navbar.classList.contains('active')) {
            document.querySelector('.social-links').style.marginTop = '20px';
        }
    });


    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });


    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


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


    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.nosotros-content, .timeline-item, .benefit-item, .info-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };


    const animatedElements = document.querySelectorAll('.nosotros-content, .timeline-item, .benefit-item, .info-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();


    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;


            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => {
                    if (response.ok) {
                        showModal();
                        form.reset();
                    } else {
                        throw new Error('Error en el envío');
                    }
                })
                .catch(error => {
                    alert('Hubo un error al enviar el formulario. Por favor inténtalo nuevamente.');
                    console.error('Error:', error);
                })
                .finally(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                });
        });
    }


    function showModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);

            document.addEventListener('keydown', handleEscapeKey);
        }
    }

    function hideModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';

                document.removeEventListener('keydown', handleEscapeKey);
            }, 300);
        }
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    }

    const closeModal = document.querySelector('.close-modal');
    const modalBtn = document.querySelector('.modal-btn');
    const modal = document.getElementById('successModal');

    if (closeModal) {
        closeModal.addEventListener('click', hideModal);
    }

    if (modalBtn) {
        modalBtn.addEventListener('click', hideModal);
    }

    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
});

function showModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
}

function hideModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

document.querySelector('.close-modal').addEventListener('click', hideModal);

document.querySelector('.modal-btn').addEventListener('click', hideModal);

document.getElementById('successModal').addEventListener('click', function (e) {
    if (e.target === this) hideModal();
});

