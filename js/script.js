// Script para validaciones del formulario y manejo de eventos
// Jhan Leyder Duarte Mena - Mi Primer Sitio Web

document.addEventListener('DOMContentLoaded', function() {

    // Configuración para Formspree
    const FORMSPREE_URL = "https://formspree.io/f/mpwlgqjl";

    // Elementos del formulario
    const formulario = document.querySelector('form');
    const nombre = document.getElementById('nombre');
    const email = document.getElementById('email');
    const telefono = document.getElementById('telefono');
    const mensaje = document.getElementById('mensaje');
    const botonLinkedIn = document.getElementById('botonLinkedIn');
    
    // Función para mostrar mensajes de error
    function mostrarError(elemento, mensaje) {
        // Remover mensaje de error anterior si existe
        const errorAnterior = elemento.parentNode.querySelector('.error-mensaje');
        if (errorAnterior) {
            errorAnterior.remove();
        }
        
        // Crear nuevo mensaje de error
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-mensaje';
        errorDiv.style.color = '#e74c3c';
        errorDiv.style.fontSize = '14px';
        errorDiv.style.marginTop = '5px';
        errorDiv.textContent = mensaje;
        
        // Insertar después del elemento
        elemento.parentNode.insertBefore(errorDiv, elemento.nextSibling);
        elemento.style.borderColor = '#e74c3c';
    }
    
    // Función para limpiar errores
    function limpiarError(elemento) {
        const errorAnterior = elemento.parentNode.querySelector('.error-mensaje');
        if (errorAnterior) {
            errorAnterior.remove();
        }
        elemento.style.borderColor = '#95a5a6';
    }
    
    // Validación del nombre
    function validarNombre() {
        const valor = nombre.value.trim();
        if (valor.length < 2) {
            mostrarError(nombre, 'El nombre debe tener al menos 2 caracteres');
            return false;
        }
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
            mostrarError(nombre, 'El nombre solo puede contener letras y espacios');
            return false;
        }
        limpiarError(nombre);
        return true;
    }
    
    // Validación del email
    function validarEmail() {
        const valor = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(valor)) {
            mostrarError(email, 'Por favor ingresa un email válido');
            return false;
        }
        limpiarError(email);
        return true;
    }
    
    // Validación del teléfono
    function validarTelefono() {
        const valor = telefono.value.trim();
        if (valor && !/^[0-9]{10}$/.test(valor)) {
            mostrarError(telefono, 'El teléfono debe tener exactamente 10 dígitos');
            return false;
        }
        limpiarError(telefono);
        return true;
    }
    
    // Validación del mensaje
    function validarMensaje() {
        const valor = mensaje.value.trim();
        if (valor.length < 10) {
            mostrarError(mensaje, 'El mensaje debe tener al menos 10 caracteres');
            return false;
        }
        if (valor.length > 500) {
            mostrarError(mensaje, 'El mensaje no puede exceder 500 caracteres');
            return false;
        }
        limpiarError(mensaje);
        return true;
    }
    
    // Event listeners para validación en tiempo real
    nombre.addEventListener('blur', validarNombre);
    email.addEventListener('blur', validarEmail);
    telefono.addEventListener('blur', validarTelefono);
    mensaje.addEventListener('blur', validarMensaje);
    
    // Contador de caracteres para el mensaje
    mensaje.addEventListener('input', function() {
        const contador = mensaje.parentNode.querySelector('.contador-caracteres');
        if (contador) {
            contador.remove();
        }
        
        const contadorDiv = document.createElement('div');
        contadorDiv.className = 'contador-caracteres';
        contadorDiv.style.fontSize = '12px';
        contadorDiv.style.color = '#7f8c8d';
        contadorDiv.style.textAlign = 'right';
        contadorDiv.textContent = `${mensaje.value.length}/500 caracteres`;
        
        mensaje.parentNode.insertBefore(contadorDiv, mensaje.nextSibling);
    });
    
    // Función para enviar email con Formspree
    function enviarEmailFormspree(formData) {
        // Mostrar indicador de carga
        const loadingDiv = document.createElement('div');
        loadingDiv.style.backgroundColor = '#3498db';
        loadingDiv.style.color = 'white';
        loadingDiv.style.padding = '15px';
        loadingDiv.style.borderRadius = '5px';
        loadingDiv.style.marginTop = '20px';
        loadingDiv.style.textAlign = 'center';
        loadingDiv.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando mensaje...';
        formulario.appendChild(loadingDiv);

        // Enviar datos a Formspree
        fetch(FORMSPREE_URL, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            loadingDiv.remove();

            if (response.ok) {
                // Mostrar mensaje de éxito
                const exitoDiv = document.createElement('div');
                exitoDiv.style.backgroundColor = '#2ecc71';
                exitoDiv.style.color = 'white';
                exitoDiv.style.padding = '15px';
                exitoDiv.style.borderRadius = '5px';
                exitoDiv.style.marginTop = '20px';
                exitoDiv.style.textAlign = 'center';
                exitoDiv.innerHTML = '<i class="fas fa-check-circle"></i> ¡Mensaje enviado exitosamente! Te contactaré pronto.';

                formulario.appendChild(exitoDiv);

                // Limpiar formulario después de 3 segundos
                setTimeout(() => {
                    formulario.reset();
                    exitoDiv.remove();
                    // Limpiar contadores y errores
                    document.querySelectorAll('.contador-caracteres, .error-mensaje').forEach(el => el.remove());
                    // Resetear bordes
                    document.querySelectorAll('input, textarea').forEach(el => el.style.borderColor = '#95a5a6');
                }, 3000);

            } else {
                throw new Error('Error en el envío');
            }
        })
        .catch(error => {
            console.log('Error al enviar email:', error);
            loadingDiv.remove();

            // Mostrar mensaje de error
            const errorDiv = document.createElement('div');
            errorDiv.style.backgroundColor = '#e74c3c';
            errorDiv.style.color = 'white';
            errorDiv.style.padding = '15px';
            errorDiv.style.borderRadius = '5px';
            errorDiv.style.marginTop = '20px';
            errorDiv.style.textAlign = 'center';
            errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error al enviar el mensaje. Por favor intenta de nuevo o contáctame directamente.';

            formulario.appendChild(errorDiv);

            // Remover mensaje después de 5 segundos
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        });
    }

    // Validación del formulario al enviarlo
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();

        const nombreValido = validarNombre();
        const emailValido = validarEmail();
        const telefonoValido = validarTelefono();
        const mensajeValido = validarMensaje();

        if (nombreValido && emailValido && telefonoValido && mensajeValido) {
            // Recopilar datos del formulario
            const formData = new FormData(formulario);

            // Enviar email con Formspree
            enviarEmailFormspree(formData);
        } else {
            // Mostrar mensaje de error general
            const errorDiv = document.createElement('div');
            errorDiv.style.backgroundColor = '#e74c3c';
            errorDiv.style.color = 'white';
            errorDiv.style.padding = '15px';
            errorDiv.style.borderRadius = '5px';
            errorDiv.style.marginTop = '20px';
            errorDiv.style.textAlign = 'center';
            errorDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Por favor corrige los errores antes de enviar el formulario.';

            // Remover mensaje anterior si existe
            const errorAnterior = formulario.querySelector('div[style*="background-color: #e74c3c"]');
            if (errorAnterior) {
                errorAnterior.remove();
            }

            formulario.appendChild(errorDiv);

            // Remover mensaje después de 5 segundos
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
    });
    
    // Efecto hover para el botón de LinkedIn
    if (botonLinkedIn) {
        botonLinkedIn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        botonLinkedIn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('nav a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Animación de aparición para las secciones
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = '1';
                entrada.target.style.transform = 'translateY(0)';

                // Animar barras de habilidades
                const skillBars = entrada.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 300);
                });
            }
        });
    }, { threshold: 0.1 });

    // Aplicar animación a todas las secciones
    document.querySelectorAll('section').forEach(seccion => {
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(20px)';
        seccion.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observador.observe(seccion);
    });

    // Navegación móvil mejorada
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (navToggle && navLinks) {
        // Toggle del menú móvil
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');

            // Prevenir scroll del body cuando el menú está abierto
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Cerrar menú al hacer click en un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer click fuera de él
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Cerrar menú al redimensionar la ventana
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }

    // Efecto parallax suave para el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Cambiar estilo de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.main-nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.98)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    console.log('Script cargado correctamente - Mi Primer Sitio Web');
});
