# SPEC-003 — Home hero + retrato + CTA

| | |
|---|---|
| **ID** | SPEC-003 |
| **Título** | Hero comercial en home con retrato recortado |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/` — sección Hero, `src/components/sections/Hero.astro`, `src/components/ui/Portrait.astro` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Convertir la home de página de sistema en una primera impresión comercial: qué vende Rubén,
disponibilidad, confianza humana (retrato) y un CTA claro a WhatsApp.

### Alcance

Incluye:

- Sección Hero en `/` con un solo `h1` de oferta (D-029, D-030)
- Chip "Aceptando proyectos" (D-019)
- Retrato recortado vía `astro:assets`, circular, sin marco azul ni sparkle (D-014)
- CTA primario "Cuéntame tu proyecto" → WhatsApp
- Una línea de apoyo (brief + propuesta 48 h)
- Componente `Portrait.astro` reutilizable (SPEC-006)
- Copy centralizado en `src/data/site.ts`
- Meta description de home actualizada

Excluye:

- Secciones trabajo, servicios, contacto comerciales (004, 005, 007)
- CTA secundario email o enlaces "ver trabajo" en el hero (PRODUCT los reserva; no entran en esta SPEC)
- Animaciones de entrada con JS
- `ruben.webp` pregenerado (recorte en CSS sobre la fuente)
- Open Graph / schema (SPEC-008)

---

## User

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Pyme / profesional | Entender la oferta en 5 s | Titular claro, sin jerga de CV |
| Visitante móvil | Ver foto + CTA sin scroll excesivo | Layout compacto, retrato `--avatar-hero` |
| Decisor escéptico | Señales humanas | Retrato real recortado, no avatar IA |

---

## Visual references

[`public/design/ruben-source.png`](../../public/design/ruben-source.png) — referencia del
recorte. Craft editorial: papel, tinta, cobre solo en chip. Sin look Burbujas.

---

## Information Architecture

### 1. Hero (`/`)

- Retrato circular a la izquierda (desktop) o arriba (móvil)
- Chip: **Aceptando proyectos**
- `h1`: **Desarrollo web: interfaz, APIs, IA y datos**
- Apoyo: **Brief gratuito y propuesta en 48 horas.**
- CTA: **Cuéntame tu proyecto** → `https://wa.me/34722203003`

Las secciones `#trabajo`, `#servicios` y `#contacto` siguen como stubs de SPEC-002.

---

## Responsive requirements

### Mobile (< 768px)

Retrato + chip + titular + apoyo + CTA en columna. Padding vertical reducido. Retrato
`--avatar-hero` (mín. 7.5rem).

### Tablet (768–1023px)

Dos columnas si cabe; si no, misma columna con más aire.

### Desktop (≥ 1024px)

Grid: retrato | copy + CTA. Contenido a `--content-max`.

---

## Accessibility

- Un `h1` en la página (hero)
- Retrato: `alt="Retrato de Rubén Palomo Viedma"`
- CTA con texto visible; foco visible
- Chip no transmite información solo por color (texto literal)
- Contraste chip: cobre-800 sobre accent-subtle (DESIGN_SYSTEM)
- Sin texto sobre la foto

---

## Performance

- Retrato con `astro:assets`, dimensiones explícitas, `loading="eager"` en hero (LCP)
- Sin dependencias nuevas
- Sin JS en el hero

---

## SEO

- `<title>` y `<meta name="description">` de home reflejan la oferta
- Resto en SPEC-008

---

## Acceptance Criteria

### Build y tipos

- [x] `npm run check` — 0 errores, 0 warnings, 0 hints
- [x] `npm run build` — OK
- [x] Sin errores en consola en `/`

### Estructura y contenido

- [x] Hero con titular de servicios, no de empleo ni "Angular Specialist"
- [x] Chip "Aceptando proyectos"
- [x] CTA WhatsApp con etiqueta D-019
- [x] Línea de apoyo sobre brief / 48 h
- [x] Un solo `h1` en `/`
- [x] Stubs `#trabajo`, `#servicios`, `#contacto` intactos

### Visual

- [x] Retrato circular sin marco azul ni sparkle visible
- [x] Solo tokens semánticos (D-006)
- [x] Distinto de Burbujas (D-005)

### Responsive

- [x] 320px–1440px sin scroll horizontal
- [x] Retrato y CTA legibles en móvil

### Accesibilidad

- [x] Teclado + foco visible en CTA
- [x] `alt` descriptivo en retrato
- [x] `prefers-reduced-motion` respetado

### Rendimiento

- [x] Imagen vía `astro:assets` con width/height
- [x] Sin dependencias nuevas

---

## Notas de implementación

- Recorte: escala CSS sobre la fuente cuadrada para aislar el círculo interior (~1.62×).
  Ajustar `--portrait-crop-scale` en `Portrait.astro` si hiciera falta.
- No servir `public/design/ruben-source.png` en UI.
- Gitflow al cerrar: merge a `develop`, abrir `cursor/spec-004`.

---

*Última actualización: agosto 2026*
