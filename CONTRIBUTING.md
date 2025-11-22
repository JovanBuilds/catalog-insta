# Contribuir al Proyecto

¡Gracias por tu interés en contribuir! 🎉

## Cómo Contribuir

### Reportar Bugs

Si encuentras un bug, por favor abre un [issue](https://github.com/JovanBuilds/link-ml/issues) con:

- Descripción clara del problema
- Pasos para reproducirlo
- Comportamiento esperado vs actual
- Screenshots si es posible
- Versión de Node.js y sistema operativo

### Sugerir Mejoras

¿Tienes una idea para mejorar el proyecto? Abre un issue con:

- Descripción de la mejora
- Por qué sería útil
- Ejemplos de uso si aplica

### Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/mi-nueva-feature
   ```
3. **Haz tus cambios** siguiendo las guías de estilo
4. **Commit** tus cambios:
   ```bash
   git commit -m 'feat: Agregar nueva característica'
   ```
5. **Push** a tu fork:
   ```bash
   git push origin feature/mi-nueva-feature
   ```
6. **Abre un Pull Request**

## Guías de Estilo

### JavaScript

- Usa nombres descriptivos en inglés para variables y funciones
- Comenta código complejo
- Mantén funciones pequeñas y enfocadas
- Usa `const` y `let`, evita `var`

### CSS

- Usa variables CSS para colores y espaciados
- Nomenclatura BEM para clases
- Mobile-first approach
- Comenta secciones importantes

### Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva característica
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, sin cambios de código
- `refactor:` Refactorización de código
- `test:` Agregar o modificar tests
- `chore:` Mantenimiento

Ejemplos:
```
feat: Agregar búsqueda de productos
fix: Corregir filtro de categorías
docs: Actualizar README con ejemplos
```

## Estructura del Proyecto

```
link-ml/
├── data/              # Base de datos JSON
├── public/            # Frontend (HTML, CSS, JS)
├── server.js          # Backend Express
└── docs/              # Documentación adicional
```

## Testing

Actualmente no hay tests automatizados. Si quieres contribuir agregando tests, ¡sería genial!

## Código de Conducta

- Sé respetuoso con otros contribuidores
- Acepta críticas constructivas
- Enfócate en lo mejor para el proyecto
- Ayuda a otros cuando puedas

## Preguntas

Si tienes preguntas, abre un issue con la etiqueta `question`.

---

¡Gracias por contribuir! 🚀
