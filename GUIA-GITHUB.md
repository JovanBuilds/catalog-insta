# 🚀 Guía: Subir a GitHub

Esta guía te ayudará a crear tu propio repositorio en GitHub con este proyecto.

## Paso 1: Preparar el Proyecto

### 1.1 Verificar que todo funciona

```bash
# Asegúrate de estar en la carpeta del proyecto
cd catalog-insta

# Instalar dependencias
npm install

# Probar que funciona
npm start
```

Abre http://localhost:3000 y verifica que todo funcione correctamente.

### 1.2 Actualizar información personal

Edita estos archivos y reemplaza cualquier referencia temporal con tu información:

- [x] `package.json` - Ya actualizado ✅
- [x] `README.md` - Ya actualizado ✅
- [x] `CONTRIBUTING.md` - Ya actualizado ✅
- [x] `CHANGELOG.md` - Ya actualizado ✅

## Paso 2: Crear Repositorio en GitHub

### 2.1 En GitHub.com

1. Ve a https://github.com/new
2. Nombre del repositorio: `link-ml`
3. Descripción: "LinkML - Catálogo web para vendedores de Instagram con integración a WhatsApp"
4. Público o Privado (tu elección)
5. **NO** marques "Initialize with README" (ya tienes uno)
6. Click en "Create repository"

### 2.2 Copiar la URL

GitHub te mostrará una URL como:
```
https://github.com/JovanBuilds/link-ml.git
```

Cópiala, la necesitarás en el siguiente paso.

## Paso 3: Inicializar Git en tu Proyecto

### 3.1 Abrir terminal en la carpeta del proyecto

```bash
cd catalog-insta
```

### 3.2 Inicializar Git

```bash
# Inicializar repositorio Git
git init

# Agregar todos los archivos
git add .

# Hacer el primer commit
git commit -m "feat: Initial commit - Instagram catalog v1.0.0"

# Renombrar rama a main (si es necesario)
git branch -M main

# Conectar con GitHub
git remote add origin https://github.com/JovanBuilds/link-ml.git

# Subir a GitHub
git push -u origin main
```

## Paso 4: Verificar en GitHub

1. Ve a tu repositorio en GitHub
2. Deberías ver todos los archivos
3. El README.md se mostrará automáticamente

## Paso 5: Configurar GitHub (Opcional pero Recomendado)

### 5.1 Agregar Topics

En tu repositorio de GitHub:
1. Click en el ⚙️ (Settings) junto a "About"
2. Agregar topics: `instagram`, `catalog`, `ecommerce`, `whatsapp`, `nodejs`, `express`
3. Guardar

### 5.2 Agregar Descripción

En la misma sección "About":
- Website: URL de tu demo (si la tienes)
- Description: "Catálogo web para vendedores de Instagram"

### 5.3 Configurar GitHub Pages (Opcional)

Si quieres documentación en GitHub Pages:
1. Settings → Pages
2. Source: Deploy from a branch
3. Branch: main → /docs (si tienes carpeta docs)

## Paso 6: Crear un Release

### 6.1 En GitHub

1. Ve a tu repositorio
2. Click en "Releases" (derecha)
3. Click en "Create a new release"
4. Tag version: `v1.0.0`
5. Release title: `v1.0.0 - Primera versión`
6. Descripción: Copia el contenido de CHANGELOG.md
7. Click en "Publish release"

## Paso 7: Agregar Badges al README (Opcional)

Edita `README.md` y actualiza los badges con tu información:

```markdown
![Version](https://img.shields.io/github/v/release/JovanBuilds/link-ml)
![License](https://img.shields.io/github/license/JovanBuilds/link-ml)
![Stars](https://img.shields.io/github/stars/JovanBuilds/link-ml)
```

## Comandos Git Útiles

### Hacer cambios después

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "feat: Descripción del cambio"

# Subir a GitHub
git push
```

### Crear una nueva rama

```bash
# Crear y cambiar a nueva rama
git checkout -b feature/nueva-caracteristica

# Hacer cambios y commit
git add .
git commit -m "feat: Nueva característica"

# Subir rama a GitHub
git push -u origin feature/nueva-caracteristica
```

### Actualizar desde GitHub

```bash
# Descargar cambios
git pull
```

## Estructura Final del Repositorio

```
link-ml/
├── .github/
│   └── workflows/
│       └── ci.yml
├── data/
│   └── products.json
├── public/
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── admin.html
│   ├── admin-styles.css
│   └── admin.js
├── .gitignore
├── .env.example
├── CHANGELOG.md
├── CONTRIBUTING.md
├── EJEMPLOS-PRODUCTOS.md
├── INICIO-RAPIDO.md
├── LICENSE
├── package.json
├── README.md
├── RESUMEN-PROYECTO.md
└── server.js
```

## Checklist Final

Antes de hacer público tu repositorio, verifica:

- [ ] Todos los archivos están commiteados
- [ ] No hay archivos `.env` (solo `.env.example`)
- [ ] No hay `node_modules/` en el repo
- [ ] README.md tiene tu usuario de GitHub
- [ ] package.json tiene tu información
- [ ] LICENSE tiene tu nombre
- [ ] El proyecto funciona localmente
- [ ] Has probado clonar el repo en otra carpeta

## Compartir tu Proyecto

Una vez en GitHub, puedes:

1. **Compartir el link**: `https://github.com/JovanBuilds/link-ml`
2. **Agregar a tu perfil**: Pin el repositorio en tu perfil
3. **Compartir en redes**: Twitter, LinkedIn, etc.
4. **Agregar a tu portfolio**: Como proyecto destacado

## Problemas Comunes

### Error: "remote origin already exists"

```bash
git remote remove origin
git remote add origin https://github.com/JovanBuilds/link-ml.git
```

### Error: "failed to push some refs"

```bash
git pull origin main --rebase
git push -u origin main
```

### Olvidé agregar .gitignore

```bash
# Remover archivos trackeados
git rm -r --cached node_modules/
git rm --cached .env

# Commit
git commit -m "chore: Remove ignored files"
git push
```

## Siguiente Paso: Desplegar

Una vez en GitHub, puedes desplegar en:
- **Render.com** - Conecta tu repo y deploy automático
- **Railway.app** - Deploy en 1 click
- **Vercel** - Ideal para frontend

Ver `README.md` para instrucciones de despliegue.

---

**¡Felicidades! Tu proyecto ya está en GitHub 🎉**

Ahora otros pueden:
- Ver tu código
- Clonar el proyecto
- Contribuir con mejoras
- Reportar bugs
- Darte estrellas ⭐
