# SPEC-014 — Dirección editorial luxury (ref. 11x)

| | |
|---|---|
| **ID** | SPEC-014 |
| **Título** | Hero cinematográfico + sistema editorial premium |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |

---

## Objective

Elevar la percepción de marca a nivel «legacy premium / luxury editorial», inspirado en
11x.ai (fotografía full-bleed, serif monumental, botones pill, bandas deep teal, tarjetas
pastel) **adaptado a RPV** — no copia de paleta ni producto 11x ni Burbujas (D-005, D-035).

### Cambios

- Tokens editoriales en `global.css`: obsidian, deep-teal, pastels, iron, bone, stone
- `AnnouncementBar` — franja negra superior
- Hero full-bleed con fotografía de terreno (`hero-terrain.jpg`), titular Newsreader blanco
- Header overlay en home (texto blanco → sólido al scroll)
- Servicios: tarjetas pastel sin sombras
- Proceso: banda `--color-deep-teal` + tags slate-teal
- Showcase Burbujas: layout revista, hairline borders, pill CTAs
- Contacto, About, Footer alineados al sistema pill + serif display

### Excluye

- ES Allianz (fuente comercial); sustituto: Newsreader autoalojada
- Serif en todo el UI (cuerpo largo mantiene Source Sans 3 — legibilidad)
- Chat widget, marquee, vídeo full-page (rechazado en SPEC-013)
- Copiar identidad 11x literalmente

### Criterios de aceptación

- [x] Hero ocupa viewport con foto warm-toned y titular serif ≥ 74px en desktop
- [x] Botones pill negro/blanco sin sombras en CTAs principales
- [x] Banda oscura deep teal en sección proceso con tags slate-teal
- [x] Tarjetas pastel en servicios (4 tintes definidos)
- [x] Header transparente sobre hero en home, sólido al scroll
- [x] `npm run check` y `npm run build` sin errores

---

*Última actualización: agosto 2026*
