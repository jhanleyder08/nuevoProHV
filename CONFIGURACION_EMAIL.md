# 📧 Configuración de Envío de Emails - Formulario de Contacto

## 🎯 Opción Recomendada: EmailJS (Gratuito - 200 emails/mes)

### Paso 1: Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Haz clic en "Sign Up" y crea una cuenta gratuita
3. Verifica tu email

### Paso 2: Configurar el servicio de email
1. En el dashboard de EmailJS, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona tu proveedor de email:
   - **Gmail** (recomendado para uso personal)
   - **Outlook/Hotmail** (para tu cuenta jhanleyder@hotmail.com)
   - **Yahoo Mail**
   - Otros proveedores

4. Sigue las instrucciones para conectar tu cuenta
5. **Guarda el SERVICE_ID** que aparece (ejemplo: service_abc123)

### Paso 3: Crear template de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este template:

```
Asunto: Nuevo mensaje de contacto - {{from_name}}

Hola Jhan,

Has recibido un nuevo mensaje de contacto desde tu sitio web:

INFORMACIÓN PERSONAL:
- Nombre: {{from_name}}
- Email: {{from_email}}
- Teléfono: {{phone}}
- Edad: {{edad}}

INFORMACIÓN PROFESIONAL:
- Empresa: {{company}}
- Cargo: {{position}}
- Experiencia: {{experience}} años
- Sitio web: {{website}}

DETALLES DEL PROYECTO:
- Tipo de proyecto: {{project_type}}
- Presupuesto: {{budget}}
- Fecha de inicio: {{start_date}}
- Mejor horario de contacto: {{contact_time}}
- Código de referencia: {{reference_code}}

MENSAJE:
{{message}}

---
Este mensaje fue enviado desde tu portafolio web.
```

4. **Guarda el TEMPLATE_ID** (ejemplo: template_xyz789)

### Paso 4: Obtener Public Key
1. Ve a "Account" → "General"
2. Copia tu **Public Key** (ejemplo: user_abc123xyz)

### Paso 5: Actualizar el código
Abre el archivo `js/script.js` y reemplaza:

```javascript
// Línea 6: Reemplaza TU_PUBLIC_KEY
emailjs.init("TU_PUBLIC_KEY_AQUI");

// Línea 149: Reemplaza TU_SERVICE_ID y TU_TEMPLATE_ID
emailjs.send('TU_SERVICE_ID_AQUI', 'TU_TEMPLATE_ID_AQUI', templateParams)
```

### Ejemplo de configuración completa:
```javascript
// Inicializar EmailJS
emailjs.init("user_abc123xyz");

// En la función enviarEmail
emailjs.send('service_gmail123', 'template_contact456', templateParams)
```

## 🔧 Alternativas Más Simples

### Opción 1: Formspree (Más fácil)
1. Ve a https://formspree.io
2. Crea cuenta gratuita
3. Crea un nuevo form
4. Copia el endpoint que te dan
5. En `index.html`, cambia:
```html
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

### Opción 2: Netlify Forms (Si usas Netlify)
1. Agrega `netlify` al form:
```html
<form netlify>
```

### Opción 3: Google Forms (Muy simple)
1. Crea un Google Form
2. Obtén el link de envío
3. Redirige el formulario a ese link

## 🚀 Ventajas de cada opción:

**EmailJS:**
✅ Más profesional
✅ Emails personalizados
✅ 200 emails gratis/mes
✅ Sin redirecciones
❌ Configuración más compleja

**Formspree:**
✅ Muy fácil de configurar
✅ 50 emails gratis/mes
✅ Sin JavaScript complejo
❌ Menos personalización

**Google Forms:**
✅ Súper simple
✅ Ilimitado y gratis
❌ Redirige a Google
❌ Menos profesional

## 📝 Notas importantes:
- Todos los emails llegarán a: jhanleyder@hotmail.com
- El formulario incluye validaciones JavaScript
- Se muestran mensajes de éxito/error
- Es responsive en todos los dispositivos

## 🔒 Seguridad:
- Las claves públicas de EmailJS son seguras para usar en frontend
- No expongas claves privadas en el código
- Considera agregar reCAPTCHA para evitar spam

¿Cuál opción prefieres implementar?
