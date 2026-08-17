# CLAUDE.md

**Lee [`AGENTS.md`](AGENTS.md) primero. Es la fuente de verdad para trabajar en este repositorio.**

Contiene el mapa de contexto, el flujo obligatorio de 14 pasos, las 14 reglas de desarrollo,
los comandos de verificación y la lista de restricciones que se incumplen con frecuencia.
Este archivo no repite nada de eso a propósito: dos copias de las mismas reglas acaban
divergiendo.

> Este archivo existe para notas específicas de Claude. Si lo editas, no esperes que el
> cambio afecte a `AGENTS.md`. Ver [`docs/DECISIONS.md`](docs/DECISIONS.md) D-020.

---

## Notas específicas para Claude

- **Este repo copia el método de Burbujas, no el producto.** No reutilices paleta violeta/rosa, burbujas CSS ni copy de lavandería.
- **Lee antes de editar.** `PLANNING.md` §0 y `docs/DECISIONS.md` mandan. Sin leerlos, las conclusiones razonables suelen ser las equivocadas.
- **Lee `docs/DECISIONS.md` antes de proponer cualquier mejora.** Crear `tailwind.config.mjs`, instalar React, vender packs de landings o usar la foto fuente sin recortar ya se evaluó.
- **No amplíes el alcance.** Si detectas algo que merece hacerse fuera de la SPEC, menciónalo al final de tu respuesta en lugar de implementarlo (Rule 2).
- **Verifica de verdad** cuando haya código: `npm run check` y `npm run build`, y los criterios de aceptación uno a uno (Rule 10).
- **Mide el contraste, no lo estimes.** Ningún color de marca al tono `500` sirve para texto de cuerpo.
- **Señala las contradicciones.** Si la documentación y el código discrepan, dilo y propón la corrección aditiva (Rule 12).
- **Datos personales.** Email y teléfono están confirmados. No inventes LinkedIn, GitHub, ciudad ni curiosidades.

---

## Development

Al arrancar el servidor de desarrollo, usa modo background:

```
astro dev --background
```

Verificación: `npm run check` y `npm run build`. **No existe** `npm run astro check`.

Hasta SPEC-001 el scaffold no está creado.

---

## Documentation

Documentación completa: https://docs.astro.build

El índice de guías por tarea está en [`AGENTS.md`](AGENTS.md) — Documentation.
