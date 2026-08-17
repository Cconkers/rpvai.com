# SPEC-012 — Tarjeta showcase Burbujas (en vivo)

| | |
|---|---|
| **ID** | SPEC-012 |
| **Título** | Tarjeta premium Burbujas con enlace al deploy Vercel |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/#trabajo`, `ShowcaseProjectCard.astro` |

---

## Objective

La prueba de oficio (Burbujas de Luz) debe sentirse como una pieza de portfolio de alto
nivel: clic abre el sitio real en Vercel; hover/focus con motion luxury; enlace secundario
al case study interno.

### Alcance

Incluye:

- Componente `ShowcaseProjectCard` para proyectos `featured` con URL `http(s)`
- URL confirmada: `https://light-bubbles-laundry.vercel.app`
- Efectos: elevación, tilt 3D suave, borde cobre en hover/focus, chrome de browser
- CTA principal «Abrir sitio en vivo» → Vercel ( nueva pestaña )
- CTA secundario «Leer el caso» → `/work/burbujas-de-luz`
- Actualizar frontmatter del proyecto con la URL real

Excluye:

- Capturas reales (PLACEHOLDER visual con preview estilizada)
- Copiar paleta violeta/rosa de Burbujas en la tarjeta RPV (D-027)

---

## Acceptance Criteria

### Build

- [x] `npm run check` y `npm run build` OK

### Funcional

- [x] Clic en la tarjeta principal abre `https://light-bubbles-laundry.vercel.app`
- [x] «Leer el caso» navega a `/work/burbujas-de-luz` sin abrir Vercel
- [x] Tarjetas placeholder siguen sin ser clicables

### Visual / a11y

- [x] Hover y `:focus-visible` con motion suave (solo transform/opacity)
- [x] Navegable por teclado; foco visible ≥ 3px cobre
- [x] `prefers-reduced-motion`: sin tilt, transición mínima
- [x] Look RPV (papel/cobre/tinta), no cliente Burbujas

---

*Última actualización: agosto 2026*
