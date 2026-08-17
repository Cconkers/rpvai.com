# SPEC-004 — Servicios y cómo trabajo

| | |
|---|---|
| **ID** | SPEC-004 |
| **Título** | Líneas de oferta y proceso en la home |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/` — `#servicios`, `#como-trabajo`; `src/components/sections/`; `src/data/offer.ts` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Que un decisor entienda **qué se puede encargar** y **cómo se acota el precio**, sin
confundir la oferta con packs de landing ni con un CV.

### Alcance

Incluye:

- Sección `#servicios` con las cinco líneas de [`PRODUCT.md`](../PRODUCT.md) — Offer
- Sección `#como-trabajo`: brief gratuito, propuesta en 48 h, spec + agentes en beneficio
  del cliente, honestidad fullstack (núcleo frontend)
- Cards de servicio según DESIGN_SYSTEM (sin forzar 5 en una fila)
- Copy en `src/data/offer.ts`
- CTA de zona en el proceso (WhatsApp), no tarifas

Excluye:

- Packs 1.490 / 2.490 / 3.490 € y cualquier "desde" (D-031, `[PLACEHOLDER]`)
- Tarifas horarias
- Demo de IA / chatbot en esta web
- Case studies (SPEC-005)
- About corto (SPEC-006)
- Ítem nuevo en la nav (sigue "Servicios" → `#servicios`)
- Logos de Angular/Jira ni lista de herramientas

---

## User

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Pyme / profesional | Ver si cubre su problema | Títulos de servicio en lenguaje de negocio |
| Decisor con presupuesto | Cómo se cotiza | 48 h y alcance cerrado, no tabla de packs |
| Perfil técnico | Seriedad sin jerga de CV | Angular como capacidad en Frontend, no headline |

---

## Visual references

Cards de [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md) — Cards. Papel / superficie / tinta.
Sin `--lb-*`. Como máximo una `card-featured`; en esta SPEC **ninguna**, para no competir
con el CTA.

---

## Information Architecture

### 1. Servicios (`#servicios`)

- `h2`: Servicios
- Apoyo: desarrollo por proyecto, no packs.
- Cinco cards (`h3` + párrafo):

| Título | Cuerpo (sentido, no literal de tabla interna) |
|--------|-----------------------------------------------|
| Frontend | Interfaces nuevas o evolución de las que ya tienes. Accesibles y mantenibles. Angular si el producto lo pide; Astro u otros según el encargo. |
| UX/UI | Flujos, jerarquía, componentes y responsive. No es un rebranding de marca desde cero. |
| Integraciones y APIs | Conectar la web con pagos, CRM, reservas u otras APIs. No se asume el SLA de un sistema ajeno. |
| IA aplicada | Asistentes, automatización o generación acotada con trabajo real. No un chatbot de adorno. |
| Web con datos | Frontend y persistencia (base de datos, auth básico, CRUD). El backend se apoya en IA; el oficio es frontend. |

### 2. Cómo trabajo (`#como-trabajo`)

- `h2`: Cómo trabajo
- Apoyo: alcance cerrado y entrega predecible (principio 8 de PRODUCT).
- Tres pasos numerados:
  1. **Brief** — negocio, objetivo, referencias y plazo. Gratis.
  2. **Propuesta en 48 h** — alcance, plazos y precio por proyecto. Sin €/hora.
  3. **Entrega** — specs cortas y agentes para ir más rápido, no para improvisar el producto.
- Nota de honestidad: se aceptan webs con datos; no se vende un equipo backend senior ni DevOps.
- CTA: "Cuéntame tu proyecto" → WhatsApp.

---

## Responsive requirements

### Mobile (< 768px)

Una columna. Cards apiladas. Pasos en lista vertical.

### Tablet (768–1023px)

Servicios en 2 columnas. Proceso en una columna o 3 pasos apilados.

### Desktop (≥ 1024px)

Servicios en 2–3 columnas (no 5 en una fila). Contenido a `--content-max`.

---

## Accessibility

- `h2` por sección; `h3` en cada card; sin saltar niveles
- Un `h1` sigue siendo el del hero
- Cards no son enlaces (sin hover de elevación)
- Contraste cuerpo sobre superficie ≥ 4.5:1
- CTA 44px, foco visible
- Números de paso no son la única pista (título + texto)

---

## Performance

- Sin dependencias nuevas
- Sin imágenes ni JS en estas secciones

---

## SEO

Copy indexable en HTML. Schema de oferta: SPEC-008.

---

## Acceptance Criteria

### Build y tipos

- [x] `npm run check` — 0 errores, 0 warnings, 0 hints
- [x] `npm run build` — OK
- [x] Sin errores en consola en `/`

### Estructura y contenido

- [x] Cinco servicios: Frontend, UX/UI, Integraciones y APIs, IA aplicada, Web con datos
- [x] No aparecen 1.490, 2.490, 3.490 ni €/hora
- [x] Angular no es headline; puede aparecer en Frontend como capacidad
- [x] Proceso incluye brief, 48 h y spec/agentes
- [x] Honestidad fullstack visible
- [x] `#trabajo` y `#contacto` siguen como stubs
- [x] Nav sin ítem nuevo

### Visual

- [x] Solo tokens semánticos (D-006)
- [x] Distinto de Burbujas (D-005)
- [x] Cards con `--color-surface`, `--radius-card`, `--shadow-sm`
- [x] Ninguna card featured (o como máximo una)

### Responsive

- [x] 320px–1440px sin scroll horizontal
- [x] Nunca 5 cards en una sola fila

### Accesibilidad

- [x] Jerarquía de encabezados sin saltos
- [x] Teclado + foco en el CTA del proceso
- [x] `prefers-reduced-motion` respetado

### Rendimiento

- [x] Sin dependencias nuevas
- [x] Sin imágenes en estas secciones

---

## Notas de implementación

- No copiar tarifas ni burbujas del cliente Burbujas.
- Datos de contacto reutilizan `site` (D-019).
- Gitflow al cerrar: merge a `develop`, abrir `cursor/spec-005`.

---

*Última actualización: agosto 2026*
