# SPEC-002 — Header, nav y footer

| | |
|---|---|
| **ID** | SPEC-002 |
| **Título** | Chrome del sitio: wordmark, navegación y pie de contacto |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `src/components/sections/`, `src/components/ui/`, `src/data/site.ts`, `src/layouts/BaseLayout.astro`, `/`, `/about` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Dar al visitante un marco de sitio reconocible: quién es (wordmark), adónde ir
(nav) y cómo encargar (WhatsApp + email), sin esperar al hero comercial de SPEC-003.

### Alcance

Incluye:

- `Header` en el layout: wordmark de texto "RPV" + "Rubén Palomo", nav, CTA WhatsApp
- Nav: Inicio `/`, Trabajo `/#trabajo`, Servicios `/#servicios`, Sobre mí `/about`,
  Contacto `/#contacto`
- Nav móvil accesible (sin overlay de cristal; menú nativo `details`/`summary`)
- Landmarks `#trabajo`, `#servicios` y `#contacto` en `/` para que las anclas existan
- Página `/about` mínima (título + texto de sistema; el about real es SPEC-006)
- `Footer`: email, CTA WhatsApp, GitHub y LinkedIn
- Datos de contacto y nav en `src/data/site.ts`
- Botones primario/secundario en `global.css` según DESIGN_SYSTEM

Excluye:

- Logo bitmap, favicon nuevo, retrato (SPEC-003)
- Copy comercial del hero, servicios, case studies (SPEC-003, 004, 005)
- About biográfico (SPEC-006)
- Formulario, teléfono en claro (sigue `[PLACEHOLDER]`, D-019)
- Aviso legal / privacidad (SPEC-009)
- Redes distintas de GitHub y LinkedIn
- Glassmorphism, tokens `--lb-*`, look de Burbujas (D-005)

---

## User

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Pyme / profesional | Encontrar contacto en un toque | CTA WhatsApp en header y footer |
| Visitante de teclado / móvil | Recorrer el sitio sin ratón | Skip link ya en layout; menú 44px; Escape cierra |
| Quien llega a `/about` | No perderse | Misma chrome; nav marca la ruta actual |

---

## Visual references

Craft editorial, papel + tinta. Header **opaco** (`--color-background`), filete
`--color-border`. Wordmark en texto real (Newsreader para el nombre, label cobre para
RPV). Un CTA primario de tinta por zona (header desktop; footer). Sin blur a lo
Burbujas.

---

## Information Architecture

### 1. Header (`role="banner"`)

- Wordmark: enlace a `/`. Visible: label `RPV` + nombre `Rubén Palomo`.
  `aria-label`: "Rubén Palomo Viedma — inicio".
- Nav `aria-label="Principal"`: los cinco destinos de Alcance.
- CTA primario (visible desde `lg`): "Cuéntame tu proyecto" →
  `https://wa.me/34722203003` (D-019), `target="_blank"`, `rel="noopener noreferrer"`.
- Móvil (`< lg`): el mismo CTA va dentro del menú.
- Estado activo: `aria-current="page"` en `/` e `/about`; en home, spy de anclas
  cuando hay sección visible.

### 2. Anclas en `/`

Secciones con `h2` y una línea de sistema (no oferta):

- `#trabajo` — contenido comercial en SPEC-005
- `#servicios` — contenido comercial en SPEC-004
- `#contacto` — contenido comercial en SPEC-007

### 3. `/about`

- Un `h1`: "Sobre mí"
- Texto breve de sistema: la página se completa en SPEC-006
- Chrome idéntica (layout)

### 4. Footer (`role="contentinfo"`)

- Wordmark o nombre + línea "Desarrollo web"
- Mailto `rubenpv011992@gmail.com`
- CTA WhatsApp (misma etiqueta y URL)
- GitHub `https://github.com/Cconkers`
- LinkedIn `https://www.linkedin.com/in/ruben-viedma-191a5913a`
- Copyright con año actual y "Rubén Palomo Viedma"
- **No** teléfono en claro, **no** ciudad, **no** legal aún

---

## Responsive requirements

### Mobile (< 768px)

Nav colapsada en `<details>`. Summary 44×44. Enlaces del menú min-height 44px.
Wordmark no se trunca de forma ilegible a 320px (puede quedar solo "RPV" + nombre
en una línea o apilado).

### Tablet (768–1023px)

Sigue el menú colapsado: cinco ítems + CTA no caben junto al wordmark.

### Desktop (≥ 1024px)

Nav horizontal. CTA en el header. Sin hamburguesa.

---

## Accessibility

- Landmarks: `banner`, `navigation`, `main` (`#contenido`), `contentinfo`
- Un `h1` por página
- Skip link permanece el primer foco; el header no lo tapa al enfocarse
- Menú móvil: `summary` con nombre accesible; Escape cierra; sin trampas si no hay
  overlay (el panel no es `aria-modal`)
- Contraste texto/papel y CTA tinta / texto-on-fill según DESIGN_SYSTEM
- Enlaces externos: se entiende el destino (texto visible, no solo icono; el icono
  `aria-hidden`)
- `prefers-reduced-motion` ya anula transiciones en `global.css`
- Objetivos táctiles ≥ 44px

---

## Performance

- Sin dependencias nuevas (D-004)
- JS mínimo en el Header (Escape + spy); el menú funciona **sin** JS gracias a
  `details`
- Sin imágenes en chrome
- Iconos SVG inline, `currentColor`

---

## SEO

Títulos de documento provisionales. Canonical/OG/schema: SPEC-008.
`/about` existe y es indexable (contenido mínimo a propósito).

---

## Acceptance Criteria

### Build y tipos

- [x] `npm run check` termina con 0 errores, 0 warnings y 0 hints.
- [x] `npm run build` completa sin errores.
- [x] Sin errores en la consola del navegador en `/` y `/about`.

### Estructura y contenido

- [x] Header y footer en todas las páginas vía `BaseLayout`.
- [x] Wordmark es texto, no `<img>` de logo.
- [x] Nav incluye Inicio, Trabajo, Servicios, Sobre mí y Contacto.
- [x] `/about` responde 200 con un `h1` "Sobre mí".
- [x] Footer incluye email, WhatsApp, GitHub y LinkedIn.
- [x] No hay teléfono en claro ni enlaces legales.
- [x] Contacto y nav salen de `src/data/site.ts`, no de literales sueltos en tres sitios.

### Visual

- [x] Solo tokens semánticos, sin hex arbitrarios (D-006).
- [x] Se distingue de Burbujas: header opaco, sin `--lb-*`, sin burbujas (D-005, D-027).
- [x] Un CTA primario por zona visual (header / footer).

### Responsive

- [x] Correcto a 320px, 375px, 768px, 1024px y 1440px.
- [x] Sin scroll horizontal en ningún ancho.
- [x] Hamburguesa `< lg`; nav horizontal `≥ lg`.

### Accesibilidad

- [x] Navegación completa por teclado, con foco visible.
- [x] Skip link sigue siendo el primer foco y lleva a `#contenido`.
- [x] Menú móvil operable sin JavaScript.
- [x] `aria-current` en la ruta o ancla activa.
- [x] Correcto con `prefers-reduced-motion: reduce`.

### Rendimiento

- [x] Sin dependencias nuevas.
- [x] Sin imágenes en header/footer.

---

## Notas de implementación

- No copiar el Header de Burbujas (fixed + glass + overlay). Mismo *problema*
  (nav accesible), otra solución (sticky opaco + `details`).
- El CTA del header en desktop no se duplica visualmente junto al del menú móvil
  (el menú está cerrado).
- No recortar ni montar `ruben-source.png`.
- Tras cerrar: gitflow a `develop` y abrir `cursor/spec-003`.

---

*Última actualización: agosto 2026*
