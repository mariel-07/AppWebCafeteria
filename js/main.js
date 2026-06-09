// ==========================================================================
// 0. SMOOTH SCROLL PARA LOS ENLACES DE NAVEGACIÓN
// ==========================================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================================================
// 1. NAVBAR RESPONSIVO (MENÚ HAMBURGUESA PARA MÓVILES)
// ==========================================================================
// Nota: Para que funcione al 100%, añade un botón de hamburguesa en tu HTML dentro del .container del navbar.
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Cambiar el fondo del navbar al hacer scroll (Efecto opaco/sólido)
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// ==========================================================================
// 2. MENÚ NAVEGACIÓN ACTIVO AUTOMÁTICO (SPY SCROLL)
// ==========================================================================
// Ilumina la sección en la que se encuentra el usuario en el menú superior
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Ajuste de margen para detectar el cambio un poco antes
        if (window.pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ==========================================================================
// 3. VALIDACIÓN INTERACTIVA DEL FORMULARIO DE CONTACTO
// ==========================================================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previene que la página se recargue
        
        // Captura de datos
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const submitBtn = contactForm.querySelector('.btn-submit');

        // Feedback visual de Enviando...
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando... ☕';
        submitBtn.disabled = true;

        // Simulamos el envío a un servidor (API)
        setTimeout(() => {
            // Reemplazar el formulario por un mensaje de éxito elegante
            contactForm.innerHTML = `
                <div class="form-success" style="text-align: center; padding: 2rem; animation: fadeIn 0.5s ease;">
                    <i class="fa-solid fa-circle-check" style="font-size: 3rem; color: #8B5A2B; margin-bottom: 1rem;"></i>
                    <h3 style="margin-bottom: 0.5rem;">¡Gracias, ${name}!</h3>
                    <p style="color: #6C757D;">Hemos recibido tu mensaje. Te responderemos al correo <strong>${email}</strong> lo antes posible.</p>
                </div>
            `;
        }, 1800);
    });
}

// ==========================================================================
// 4. ANIMACIONES AL HACER SCROLL (REVEAL EFFECT)
// ==========================================================================
// Hace que los elementos aparezcan suavemente de abajo hacia arriba cuando el usuario baja la página
const revealElements = document.querySelectorAll('.menu-item, .feature-card');

const revealOnScroll = () => {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = revealElements[i].getBoundingClientRect().top;
        const elementVisible = 100; // Margen para activar la animación

        if (elementTop < windowHeight - elementVisible) {
            revealElements[i].classList.add('revealed');
        }
    }
};

window.addEventListener('scroll', revealOnScroll);
// Ejecutar una vez al cargar por si ya hay elementos visibles
revealOnScroll();