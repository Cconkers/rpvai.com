# DESIGN_SYSTEM.md — Sistema de diseño

> **Documento:** Reglas visuales reutilizables y tokens de RPV.
> **Propósito:** Que un agente pueda construir un componente nuevo sin reinterpretar el diseño.
> **Relación:** El criterio estético está en [`VISUAL_DIRECTION.md`](./VISUAL_DIRECTION.md).
> Este documento lo traduce a valores concretos. La arquitectura está en [`PLANNING.md`](../PLANNING.md).

---

## Cómo usar este documento

**Regla base: ningún componente usa un color hexadecimal literal.** Los componentes
consumen **tokens semánticos**. Los tokens semánticos apuntan a **primitivos**. Solo los
primitivos contienen hex.

```
primitivo              semántico              componente
--rpv-copper-800   ->  --color-primary    ->  bg-primary
```

Motivo: cambiar la marca debe ser editar una capa, no auditar cada componente.

Tailwind v4 se configura **sin archivo de config**. Los tokens viven en el bloque `@theme`
de [`src/styles/global.css`](../src/styles/global.css) (creado en SPEC-001). No crear
`tailwind.config.mjs` (D-013).

Prefijo de primitivos: `--rpv-`. No reutilizar `--lb-*` de Burbujas (D-027).

---

## Color System

### Capa 1 — Primitivos

Paleta **tinta + papel + cobre**. Distinta de Burbujas (violeta/rosa/cian) y del azul
de la foto fuente.

**Cobre** — acento de marca

| Token | Hex | Contraste sobre `#F7F4EF` |
|-------|-----|---------------------------|
| `--rpv-copper-50` | `#FDF6F0` | decorativo |
| `--rpv-copper-100` | `#FAE8D8` | decorativo |
| `--rpv-copper-200` | `#F5CFAE` | decorativo |
| `--rpv-copper-300` | `#E8A66E` | decorativo |
| `--rpv-copper-400` | `#D47A3A` | decorativo |
| `--rpv-copper-500` | `#C45C26` | ~3.6:1 — solo texto grande o deco |
| `--rpv-copper-600` | `#A34A1C` | ~5.1:1 — apto texto grande |
| `--rpv-copper-700` | `#823A16` | ~7.2:1 — apto cuerpo |
| `--rpv-copper-800` | `#5C2910` | ~10.5:1 — relleno con texto claro |
| `--rpv-copper-900` | `#3D1C0B` | ~14:1 |

Los ratios de cobre **se re-miden** al implementar tokens en CSS (D-007). Hasta entonces
tratar 500 como decorativo y cuerpo en 700+.

**Neutros**

| Token | Hex | Nota |
|-------|-----|------|
| `--rpv-paper` | `#F7F4EF` | Fondo de página |
| `--rpv-paper-alt` | `#EFEBE3` | Sección alterna |
| `--rpv-white` | `#FFFcf7` | Superficie de tarjeta (marfil, no blanco puro) |
| `--rpv-line` | `#E4DED4` | Bordes |
| `--rpv-line-strong` | `#D3CABD` | Bordes de control |
| `--rpv-muted` | `#57534E` | Texto auxiliar — ≥ 4.5:1 sobre paper |
| `--rpv-slate` | `#44403C` | Texto secundario |
| `--rpv-ink` | `#1C1917` | Texto principal y botón tinta |

`--rpv-ink` es color de texto y de **botón primario**. No usarlo como fondo de sección a
ancho completo (D-005).

### Capa 2 — Tokens semánticos

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `--rpv-ink` | CTA principal (tinta) |
| `--color-primary-hover` | `#0C0A09` | Hover del CTA |
| `--color-accent` | `--rpv-copper-700` | Chip, "desde", enlaces secundarios |
| `--color-accent-subtle` | `--rpv-copper-100` | Fondos de badge |
| `--color-text` | `--rpv-ink` | Texto principal |
| `--color-text-secondary` | `--rpv-slate` | Apoyo |
| `--color-muted` | `--rpv-muted` | Metadatos |
| `--color-text-on-fill` | `--rpv-paper` | Texto sobre botón tinta |
| `--color-background` | `--rpv-paper` | Fondo de página |
| `--color-background-alt` | `--rpv-paper-alt` | Sección alterna |
| `--color-surface` | `--rpv-white` | Tarjeta |
| `--color-border` | `--rpv-line` | Borde por defecto |
| `--color-border-strong` | `--rpv-line-strong` | Borde de énfasis / anillo foto |
| `--color-focus` | `--rpv-copper-700` | Anillo de foco |

**Decorativos** — nunca alojan texto pequeño ni control:

| Token | Valor |
|-------|-------|
| `--color-deco-copper` | `--rpv-copper-500` |

### Gradientes

```css
--gradient-paper: linear-gradient(180deg, #F7F4EF 0%, #FDF6F0 100%);
```

Lavado mínimo. No aloja texto pequeño encima sin medir contraste. Prohibido un
`--gradient-accent` saturado tipo Burbujas.

### Implementación en Tailwind v4

```css
/* src/styles/global.css — SPEC-001 */
@import "tailwindcss";

@theme {
  --color-rpv-copper-700: #823A16;
  --color-rpv-ink: #1C1917;
  --color-primary: var(--color-rpv-ink);
  --color-background: #F7F4EF;
  --color-text: #1C1917;
}
```

Uso: `bg-primary`, `text-text`, `bg-background`. Prohibido: `bg-[#1C1917]`.

---

## Contrast rules

**Normativo. Estas reglas no son orientativas.**

| Uso | Mínimo | Token permitido |
|-----|--------|-----------------|
| Texto de cuerpo (< 18.66px, o < 24px si bold) | 4.5:1 | `--color-text`, `--color-text-secondary`, `--color-muted`, cobre 700+ |
| Texto grande (≥ 18.66px bold, ≥ 24px normal) | 3:1 | Cobre 600+ |
| Relleno con texto claro encima | 4.5:1 | `--color-primary` (ink) o cobre 800+ |
| Bordes no informativos | sin mínimo | `--color-border` |
| Bordes de control | 3:1 | `--color-border-strong` |
| Anillo de foco frente a fondo adyacente | 3:1 | `--color-focus` |

Consecuencias:

- **Nunca texto claro sobre cobre 500.**
- Un chip "Aceptando proyectos" usa fondo `--color-accent-subtle` y texto `--rpv-copper-800`, no blanco sobre 500.
- Al superponer texto a foto o gradiente hay que **medir** el contraste real.
- No transmitir información solo por color.

---

## Typography

Dos familias **autoalojadas** en `public/fonts/`, con `font-display: swap` y sin CDN.
Los archivos se añaden en SPEC-001. Familias objetivo:

| Rol | Familia | Pesos | Uso |
|-----|---------|-------|-----|
| Display | **Newsreader** (o Fraunces si hay problema de licencia/archivos) | 600, 700 | Titulares, precios "desde" |
| Cuerpo / UI | **Source Sans 3** (o IBM Plex Sans) | 400, 600, 700 | Texto, nav, botones |

Fallback obligatorio:

```css
--font-display: "Newsreader", "Iowan Old Style", "Palatino Linotype", Palatino, serif;
--font-body:    "Source Sans 3", ui-sans-serif, system-ui, sans-serif;
```

Distinto de Poppins/Nunito/Caveat de Burbujas (D-027).

| Rol | Token CSS | Tamaño | Peso | Line-height | Uso |
|-----|-----------|--------|------|-------------|-----|
| `display` | `--text-display` | `clamp(2.25rem, 5vw, 3.75rem)` | 700 | 1.05 | Titular de hero |
| `h1` | `--text-h1` | `clamp(2rem, 4vw, 3rem)` | 700 | 1.15 | Título de página |
| `h2` | `--text-h2` | `clamp(1.5rem, 3vw, 2.25rem)` | 600 | 1.2 | Título de sección |
| `h3` | `--text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | 600 | 1.3 | Título de tarjeta |
| `body-lg` | `--text-body-lg` | `1.125rem` | 400 | 1.6 | Entradilla |
| `body` | `--text-body` | `1rem` | 400 | 1.65 | Texto por defecto |
| `small` | `--text-small` | `0.875rem` | 400 | 1.5 | Metadatos. **Nunca** cuerpo |
| `button` | `--text-button` | `1rem` | 600 | 1 | Acciones |
| `label` | `--text-label` | `0.8125rem` | 600 | 1.4 | Chips, uppercase corto |
| `price` | `--text-price` | `clamp(1.75rem, 3vw, 2.25rem)` | 700 | 1.1 | "Desde X €" |

Implementación: variables en `global.css` y clases `.type-display`, `.type-h1`, …
**No usar** `text-sm` / `text-lg` de Tailwind para texto de UI.

Reglas:

- Mínimo 16px para texto de lectura.
- Un solo `h1` por página; jerarquía sin saltos.
- Medida 45–75 caracteres (`--prose-max: 65ch`).
- Titulares con `letter-spacing: -0.02em`.
- Sin cursiva para énfasis: peso 600.
- Wordmark "Rubén Palomo" / "RPV" en texto real.

---

## Spacing

Escala de base 4px. Sin valores fuera de escala.

| Token | Valor | Uso |
|-------|-------|-----|
| `--space-1` | `0.25rem` (4px) | Separación mínima |
| `--space-2` | `0.5rem` (8px) | Icono-texto |
| `--space-3` | `0.75rem` (12px) | Interior compacto |
| `--space-4` | `1rem` (16px) | Interior por defecto |
| `--space-5` | `1.25rem` (20px) | Interior de tarjeta |
| `--space-6` | `1.5rem` (24px) | Entre elementos |
| `--space-8` | `2rem` (32px) | Entre grupos |
| `--space-10` | `2.5rem` (40px) | Tarjeta amplia |
| `--space-12` | `3rem` (48px) | Interior de sección |
| `--space-16` | `4rem` (64px) | Sección móvil |
| `--space-20` | `5rem` (80px) | Sección tablet |
| `--space-24` | `6rem` (96px) | Sección desktop |

Compuestos:

| Token | Valor |
|-------|-------|
| `--section-gap` | `clamp(4rem, 8vw, 6rem)` |
| `--content-max` | `72rem` (1152px) |
| `--prose-max` | `65ch` |
| `--gutter` | `clamp(1rem, 4vw, 2rem)` |
| `--avatar-hero` | `clamp(7.5rem, 22vw, 14rem)` |

---

## Border Radius

Editorial: radios contenidos, no pills en todo ni esquinas 0 en todo.

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `0.375rem` (6px) | Badges |
| `--radius-md` | `0.5rem` (8px) | Inputs, botones |
| `--radius-card` | `1rem` (16px) | Tarjetas |
| `--radius-lg` | `1.5rem` (24px) | Contenedores |
| `--radius-pill` | `9999px` | Chip de disponibilidad, CTA primario |
| `--radius-full` | `9999px` | Retrato |

Botón primario: `--radius-pill`. Tarjetas: `--radius-card`. Retrato: círculo.

---

## Shadows

Difusas, tintadas con tinta, sin glow de cobre.

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-xs` | `0 1px 2px rgba(28,25,23,0.05)` | Separación mínima |
| `--shadow-sm` | `0 2px 8px rgba(28,25,23,0.06)` | Tarjeta |
| `--shadow-md` | `0 8px 24px rgba(28,25,23,0.08)` | Hover de tarjeta interactiva |
| `--shadow-focus` | `0 0 0 3px rgba(130,58,22,0.35)` | Foco |

Opacidad máxima `0.12`. Prohibido `box-shadow` saturado como resplandor.

---

## Buttons

Altura táctil mínima **44px**, `font-weight: 600`, transición 250ms, foco visible.

### Primary

- Fondo `--color-primary` (ink), texto `--color-text-on-fill`
- Hover: `--color-primary-hover` + `--shadow-sm`
- Máximo uno por zona visual
- Etiqueta por defecto: "Cuéntame tu proyecto"

### Secondary

- Fondo transparente, borde 1px `--color-border-strong`, texto `--color-text`
- Hover: fondo `--color-background-alt`

### Ghost

- Sin borde; texto `--color-text-secondary`
- Hover: texto `--color-accent`

Prohibido: relleno en gradiente; glow.

---

## Cards

- Fondo `--color-surface`, radio `--radius-card`, sombra `--shadow-sm`
- Interior `--space-5` móvil, `--space-6` tablet+
- Hover **solo si es enlace** (case study): `--shadow-md`
- Servicios: cards por línea de oferta; como máximo una `card-featured` (borde cobre 2px)

---

## Retrato

| Regla | Valor |
|-------|-------|
| Fuente | `src/assets/images/ruben-source.png` |
| Entrega | `astro:assets` `<Image>` |
| Forma | círculo (`--radius-full`) + `object-fit: cover` centrado en la cara |
| Recorte | excluir marco azul y sparkle (D-014) |
| Anillo | 2px `--color-border-strong` o 3px `--color-accent-subtle` |
| Tamaño hero | `--avatar-hero` |
| `alt` | `Retrato de Rubén Palomo Viedma` |
| CLS | `width` y `height` explícitos |

Hasta que SPEC-003 recorte, **no** incrustar la fuente en un `<img src>` de `public/`.

---

## Icons

- Lineal, trazo 1.5–2px, grid 24.
- SVG inline, `currentColor`. Sin fuentes de iconos.
- Decorativo → `aria-hidden`; informativo → `aria-label`.
- No logos de Angular, GitLab ni stacks en el hero.

---

## Motion

| Token | Valor | Uso |
|-------|-------|-----|
| `--duration-instant` | `100ms` | Foco |
| `--duration-fast` | `150ms` | Hover |
| `--duration-base` | `250ms` | Por defecto |
| `--duration-slow` | `400ms` | Entrada |

Easing por defecto: `cubic-bezier(0.16, 1, 0.3, 1)`.

- Entrada: opacity + `translateY(12px → 0)`. Sin desplazamientos > 24px.
- Scroll: `IntersectionObserver` + CSS. Sin GSAP, sin Motion/React.
- Hover solo con `(hover: hover) and (pointer: fine)`.
- `prefers-reduced-motion: reduce` anula animaciones (mismo patrón que Burbujas: duración ~0).

---

## Responsive

Móvil primero. Breakpoints Tailwind / tiers de [`PLANNING.md`](../PLANNING.md) §3.

| Nombre | Rango | Tier |
|--------|-------|------|
| Base | 0–639px | mobile |
| `sm` | 640–767px | mobile |
| `md` | 768–1023px | tablet |
| `lg` | 1024–1279px | desktop |
| `xl` | 1280px+ | desktop |

### Mobile

- Una columna. Hero: retrato + titular + CTA sin scroll.
- Nav colapsada, teclado, foco atrapado si overlay.
- Servicios apilados.
- Objetivo táctil 44×44, 8px de separación.

### Tablet

- 2 columnas donde aporte.
- Nav horizontal si cabe.

### Desktop

- Contenido a `--content-max`.
- Servicios en 2–3 columnas (no forzar 5 cards en una fila).
- Hover habilitado.
- >1440px: no crecer el tipo, solo el aire.

Transversal: sin scroll horizontal; sin pérdida de contenido; imágenes con dimensiones;
probar 320px.

---

## Brand assets

| Archivo | Rol | Estado |
|---------|-----|--------|
| [`src/assets/images/ruben-source.png`](../src/assets/images/ruben-source.png) | Maestro del retrato (con marco; recortar) | Fuente |
| [`public/design/ruben-source.png`](../public/design/ruben-source.png) | Referencia de diseño, no UI | Referencia |
| `src/assets/images/ruben.webp` | Derivado recortado | **Pendiente SPEC-003** |
| Wordmark | Texto "Rubén Palomo" / "RPV" | No hay logo bitmap |
| Capturas Burbujas | Case study | **Pendiente SPEC-005** |

`public/design/` no se borra para "ahorrar peso": es fuente de documentación visual.

---

## Checklist de componente nuevo

1. ¿Usa solo tokens semánticos, sin hex literal?
2. ¿Cumple contraste medido?
3. ¿Funciona a 320px y a 1440px?
4. ¿Objetivos táctiles de 44px?
5. ¿Navegable por teclado, con foco visible?
6. ¿Radio y sombra dentro de la escala?
7. ¿Movimiento anulado por `prefers-reduced-motion`?
8. ¿Existe ya un componente que resuelva esto?
9. ¿Se distingue de Burbujas y no usa `--lb-*`?
10. ¿El retrato, si aparece, está recortado sin sparkle?

---

*Última actualización: agosto 2026*
