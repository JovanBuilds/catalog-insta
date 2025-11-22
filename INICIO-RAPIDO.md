# 🚀 Inicio Rápido

## Instalación en 3 pasos

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar (crear archivo .env)
Crea un archivo llamado `.env` en la raíz del proyecto con este contenido:

```env
STORE_NAME=Mi Tienda
STORE_DESCRIPTION=Encuentra los mejores productos aquí
STORE_LOGO=https://via.placeholder.com/150
WHATSAPP_NUMBER=521234567890
ADMIN_PASSWORD=admin123
PORT=3000
```

**IMPORTANTE**: Cambia estos valores por los tuyos:
- `WHATSAPP_NUMBER`: Tu número de WhatsApp con código de país (sin +)
- `ADMIN_PASSWORD`: Una contraseña segura para el panel admin

### 3. Iniciar servidor
```bash
npm start
```

## Acceder a la aplicación

- **Catálogo público**: http://localhost:3000
- **Panel de administración**: http://localhost:3000/admin.html

## Primer uso

1. Abre http://localhost:3000/admin.html
2. Ingresa tu contraseña (la que pusiste en ADMIN_PASSWORD)
3. Configura tu tienda en la pestaña "Configuración"
4. Agrega tus productos en la pestaña "Productos"
5. Comparte el link http://localhost:3000 en tu bio de Instagram

## Subir imágenes de productos

Usa servicios gratuitos para alojar imágenes:

### Opción 1: Imgur (Más fácil)
1. Ve a https://imgur.com
2. Sube tu imagen (no requiere cuenta)
3. Click derecho en la imagen → "Copiar dirección de imagen"
4. Pega esa URL en el campo "URL de la imagen"

### Opción 2: Postimages
1. Ve a https://postimages.org
2. Sube tu imagen
3. Copia el "Direct link"
4. Pégalo en el campo "URL de la imagen"

## Desplegar en internet (gratis)

### Render.com (Recomendado)
1. Sube tu proyecto a GitHub
2. Crea cuenta en https://render.com
3. Conecta tu repositorio
4. Crea un "Web Service"
5. Agrega las variables de entorno (las del archivo .env)
6. Deploy automático

Tu catálogo estará en: `https://tu-app.onrender.com`

## Problemas comunes

### WhatsApp no abre
- Verifica que el número incluya código de país
- Ejemplo correcto: `521234567890` (México)
- NO uses el símbolo +

### No puedo entrar al panel admin
- Verifica que la contraseña en `.env` sea correcta
- Reinicia el servidor después de cambiar `.env`

### Las imágenes no se ven
- Usa URLs directas a imágenes
- Verifica que la URL termine en .jpg, .png, etc.
- Prueba la URL en el navegador primero

## ¿Necesitas ayuda?

Revisa el archivo `README.md` para documentación completa.

---

**¡Listo! Ya puedes empezar a vender por Instagram 🎉**
