# LinkML - Catálogo de Productos para Instagram 🛍️

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

**Catálogo web tipo Linktree/Mercado Libre para vendedores de Instagram**

[Demo](#-demo) • [Características](#-características) • [Instalación](#-instalación) • [Uso](#-uso) • [Despliegue](#-despliegue)

</div>

---

## 📖 Descripción

Aplicación web completa que permite a vendedores de Instagram mostrar sus productos en un catálogo profesional con integración directa a WhatsApp. Diseño inspirado en Mercado Libre, mobile-first y fácil de administrar.

### ¿Para quién es esto?

- 🛍️ Vendedores de Instagram que quieren un catálogo profesional
- 📱 Emprendedores que venden por redes sociales
- 🎨 Pequeños negocios que necesitan presencia web rápida
- 💼 Freelancers que ofrecen productos/servicios

## ✨ Características

### Catálogo Público
- 📦 Tarjetas de productos estilo Mercado Libre
- 🏷️ Filtros por categoría
- 💬 Integración directa con WhatsApp
- 📱 Diseño mobile-first (perfecto para Instagram)
- ⚡ Carga rápida y animaciones suaves
- 🎨 Paleta de colores personalizable

### Panel de Administración
- 🔐 Autenticación con contraseña
- ➕ Crear, editar y eliminar productos
- 👁️ Activar/desactivar productos
- ⚙️ Configurar información de la tienda
- 📊 Interfaz intuitiva y fácil de usar

### Técnicas
- 🚀 Backend Node.js + Express
- 💾 Almacenamiento en JSON (simple y efectivo)
- 🔒 Autenticación básica
- 📦 Sin dependencias pesadas
- 🌐 Listo para desplegar

## 🎯 Demo

### Catálogo Público
![Catálogo](https://via.placeholder.com/800x400/FFE600/000000?text=Catalogo+Publico)

### Panel de Administración
![Admin Panel](https://via.placeholder.com/800x400/3483FA/FFFFFF?text=Panel+Admin)

### Demo jugable: Conqueror (RTS)
Lanza `npm start` y abre `http://localhost:3000/conqueror-demo.html` para probar un prototipo rápido inspirado en Social Empires: tablero 12x12, construcción ligera, entrenamiento de unidades por era y escaramuzas automáticas contra una base enemiga. Ideal para validar la arquitectura Unity + Node propuesta.

## 🚀 Instalación

### Requisitos Previos
- Node.js 14 o superior
- npm o yarn
- Cuenta de WhatsApp Business (recomendado)

### Instalación Rápida

```bash
# 1. Clonar el repositorio
git clone https://github.com/JovanBuilds/link-ml.git
cd link-ml

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Edita .env con tus datos

# 4. Iniciar servidor
npm start
```

### Configuración

Crea un archivo `.env` en la raíz del proyecto:

```env
# Información de la tienda
STORE_NAME=Mi Tienda
STORE_DESCRIPTION=Encuentra los mejores productos aquí
STORE_LOGO=https://tu-logo.com/logo.png
WHATSAPP_NUMBER=521234567890

# Seguridad
ADMIN_PASSWORD=tu_password_seguro

# Servidor
PORT=3000
```

**⚠️ IMPORTANTE:**
- El número de WhatsApp debe incluir código de país sin el símbolo `+`
- Ejemplo México: `521234567890` (52 + 10 dígitos)
- Cambia `ADMIN_PASSWORD` por una contraseña segura

## 📱 Uso

### Acceder a la Aplicación

- **Catálogo Público**: `http://localhost:3000`
- **Panel Admin**: `http://localhost:3000/admin.html`

### Administrar Productos

1. Abre `http://localhost:3000/admin.html`
2. Ingresa tu contraseña
3. Click en "Agregar Producto"
4. Llena el formulario:
   - **Nombre**: Nombre del producto
   - **Precio**: Precio en números (ej: 299.99)
   - **Descripción**: Breve descripción
   - **URL de imagen**: Link a la imagen
   - **Categoría**: Etiqueta para filtrar
   - **Activo**: Marcar si quieres que se muestre
5. Guardar

### Subir Imágenes

Usa servicios gratuitos para alojar imágenes:

- **[Imgur](https://imgur.com)** - Más fácil, sin registro
- **[Postimages](https://postimages.org)** - Alternativa confiable
- **[Cloudinary](https://cloudinary.com)** - Profesional, gratis hasta 25GB

## 🌐 Despliegue

### Render.com (Recomendado - GRATIS)

1. Sube tu proyecto a GitHub
2. Crea cuenta en [render.com](https://render.com)
3. Conecta tu repositorio
4. Crea un "Web Service"
5. Configura:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Agrega las variables de entorno
7. Deploy automático

Tu catálogo estará en: `https://tu-app.onrender.com`

### Railway.app

```bash
# 1. Instalar Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Inicializar proyecto
railway init

# 4. Agregar variables de entorno
railway variables set ADMIN_PASSWORD=tupassword
railway variables set WHATSAPP_NUMBER=521234567890

# 5. Deploy
railway up
```

### Otras Opciones
- **Vercel** - Ideal para frontend
- **Heroku** - Clásico y confiable
- **VPS** - Mayor control

## 📂 Estructura del Proyecto

```
link-ml/
├── data/
│   └── products.json          # Base de datos
├── public/
│   ├── index.html            # Catálogo público
│   ├── styles.css            # Estilos del catálogo
│   ├── app.js                # JavaScript del catálogo
│   ├── admin.html            # Panel de administración
│   ├── admin-styles.css      # Estilos del panel
│   └── admin.js              # JavaScript del panel
├── server.js                 # Servidor Express
├── package.json              # Dependencias
├── .env.example              # Ejemplo de configuración
├── .gitignore                # Archivos a ignorar
├── LICENSE                   # Licencia MIT
└── README.md                 # Este archivo
```

## 🎨 Personalización

### Cambiar Colores

Edita `public/styles.css`:

```css
:root {
    --color-primary: #FFE600;        /* Amarillo Mercado Libre */
    --color-secondary: #3483FA;      /* Azul */
    --color-whatsapp: #25D366;       /* Verde WhatsApp */
}
```

### Agregar Categorías

Las categorías se crean automáticamente al agregar productos con nuevas categorías.

## 🔧 API Endpoints

### Públicos
- `GET /api/products` - Obtener productos activos

### Administración (requieren header `X-Admin-Password`)
- `GET /api/admin/products` - Obtener todos los productos
- `POST /api/admin/products` - Crear producto
- `PUT /api/admin/products/:id` - Actualizar producto
- `DELETE /api/admin/products/:id` - Eliminar producto
- `PUT /api/admin/config` - Actualizar configuración

## 🛠️ Tecnologías

- **Backend**: Node.js, Express
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Base de datos**: JSON file
- **Autenticación**: Header-based
- **Estilos**: CSS Variables, Flexbox, Grid

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Roadmap

- [ ] Búsqueda de productos
- [ ] Estadísticas de clicks
- [ ] Múltiples imágenes por producto
- [ ] Variantes de productos (tallas, colores)
- [ ] Sistema de usuarios múltiples
- [ ] Integración con Stripe/PayPal
- [ ] Exportar catálogo a PDF

## 🐛 Problemas Conocidos

Revisa la sección [Issues](https://github.com/JovanBuilds/link-ml/issues) para problemas conocidos y soluciones.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor

**JovanBuilds**

- GitHub: [@JovanBuilds](https://github.com/JovanBuilds)

## 🙏 Agradecimientos

- Diseño inspirado en [Mercado Libre](https://mercadolibre.com)
- Iconos de [Feather Icons](https://feathericons.com)
- Fuentes de [Google Fonts](https://fonts.google.com)

## 📞 Soporte

Si tienes preguntas o necesitas ayuda:

1. Revisa la [documentación completa](README.md)
2. Consulta los [ejemplos de productos](EJEMPLOS-PRODUCTOS.md)
3. Abre un [issue](https://github.com/JovanBuilds/link-ml/issues)

---

<div align="center">

**Hecho con ❤️ para vendedores de Instagram**

⭐ Si te gusta este proyecto, dale una estrella en GitHub!

</div>
