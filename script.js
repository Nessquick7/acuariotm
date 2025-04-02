document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    
    menuToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        
        // Ajustar el margen si es necesario
        if (navbar.classList.contains('active')) {
            document.querySelector('.social-links').style.marginTop = '20px';
        }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Efecto scroll para header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // Animaciones al hacer scroll
    const animateOnScroll = function() {
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
    
    // Configuración inicial para animaciones
    const animatedElements = document.querySelectorAll('.nosotros-content, .timeline-item, .benefit-item, .info-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar

    // Manejo del formulario
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar estado de carga
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;

            // Enviar formulario
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

    // Funciones del modal
    function showModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
            setTimeout(() => modal.classList.add('show'), 10);
            // Agregar event listener para tecla Escape
            document.addEventListener('keydown', handleEscapeKey);
        }
    }

    function hideModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                // Remover event listener de tecla Escape
                document.removeEventListener('keydown', handleEscapeKey);
            }, 300);
        }
    }

    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            hideModal();
        }
    }

    // Configurar event listeners del modal
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
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
});

// Mostrar modal con animación
function showModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    setTimeout(() => modal.classList.add('show'), 10);
  }
  
  // Ocultar modal con animación
  function hideModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
  }
  
  // Cerrar al hacer clic en la X
  document.querySelector('.close-modal').addEventListener('click', hideModal);
  
  // Cerrar al hacer clic en el botón
  document.querySelector('.modal-btn').addEventListener('click', hideModal);
  
  // Cerrar al hacer clic fuera del modal
  document.getElementById('successModal').addEventListener('click', function(e) {
    if (e.target === this) hideModal();
  });
  
 
