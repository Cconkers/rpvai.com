# SPEC-005 — Case study Burbujas + listado

| | |
|---|---|
| **ID** | SPEC-005 |
| **Título** | Content collection, listado de trabajo y caso Burbujas de Luz |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/#trabajo`, `/work/burbujas-de-luz`, `src/content/projects/` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Demostrar oficio con un caso real (Burbujas) y dejar dos huecos honestos, sin copiar el
look del cliente ni inventar URLs o capturas (D-009, D-021, D-027).

### Alcance

Incluye:

- Content collection `projects` (D-026) con schema
- Mover el borrador de [`docs/content/projects/`](../content/projects/) a `src/content/projects/`
- Listado en home `#trabajo`: Burbujas primero (card enlace) + dos cards hueco
- Página `/work/burbujas-de-luz`: contexto → enfoque → resultado
- URL y capturas como `[PLACEHOLDER]` visibles, no fingidas
- Plantilla `src/pages/work/[slug].astro`

Excluye:

- Portal del Donante
- Screenshots de ATMIRA/BME/Bosonit
- Inventar URL de producción
- Copiar paleta, burbujas o componentes de Burbujas (D-027)
- About corto (SPEC-006)

---

## User

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Pyme | Ver un trabajo real | Card clara: nombre, rol, resumen, año |
| Quien ya vio Burbujas | Entender que Rubén es el autor | Página de caso, no un clon de la lavandería |
| Decisor | No una galería vacía de stock | Huecos etiquetados, sin clientes inventados |

---

## Visual references

Dirección editorial RPV. Screenshots reales pendientes: slot dashed, no mockup 3D.
Card featured: borde cobre 2px (DESIGN_SYSTEM — máximo una).

---

## Information Architecture

### 1. Listado home (`#trabajo`)

- Kicker y `h2` ya existentes
- Grid: featured Burbujas (enlace a `/work/burbujas-de-luz`) + dos huecos no clicables
- Cada card real: título, año, rol, summary
- Hueco: "Próximamente" + texto de que no se inventa el cliente

### 2. Case study `/work/[slug]`

- `h1` = título del proyecto
- Meta: año, rol, stack en texto (no logos)
- Cuerpo Markdown: Contexto, Enfoque, Resultado, Qué demuestra
- Si `url` no es `http(s)`, no hay botón "Ver sitio"
- Slot de capturas placeholder
- CTA WhatsApp + enlace volver a `/#trabajo`

Los proyectos `placeholder: true` **no** generan ruta.

---

## Responsive requirements

### Mobile (< 768px)

Una columna.

### Tablet (768–1023px)

Featured a ancho completo o 2 columnas; huecos debajo.

### Desktop (≥ 1024px)

Tres columnas o featured a 2 + un hueco; el segundo hueco en la fila. Sin pérdida de contenido.

---

## Accessibility

- Un `h1` en la página de caso; en home el `h1` sigue siendo el del hero
- Cards reales son enlaces con nombre accesible (título)
- Huecos no son botones
- Contraste cuerpo sobre superficie
- Stack como texto, no solo color

---

## Performance

- Sin dependencias nuevas
- Sin imágenes de proyecto hasta que existan capturas (`astro:assets`)
- Markdown estático

---

## SEO

Title/description de la página de caso. Schema: SPEC-008.

---

## Acceptance Criteria

### Build y tipos

- [ ] `npm run check` — 0 errores, 0 warnings, 0 hints
- [ ] `npm run build` — OK; existe `/work/burbujas-de-luz`
- [ ] No se generan `/work/proyecto-2` ni `/work/proyecto-3`

### Estructura y contenido

- [ ] Collection `projects` con Burbujas + dos placeholders
- [ ] Home lista Burbujas primero
- [ ] Página de caso con contexto, enfoque y resultado
- [ ] URL de producción no inventada
- [ ] Sin Portal del Donante ni capturas internas de empleo
- [ ] Copy no usa `--lb-*` ni tono de lavandería como marca RPV

### Visual

- [ ] Tokens semánticos (D-006)
- [ ] Distinto de Burbujas (D-005, D-027)
- [ ] Una sola card featured
- [ ] Hover de elevación solo en la card-enlace

### Responsive

- [ ] 320–1440 sin scroll horizontal

### Accesibilidad

- [ ] Teclado hasta el caso y vuelta
- [ ] `prefers-reduced-motion` respetado

### Rendimiento

- [ ] Sin dependencias nuevas
- [ ] Sin imágenes de stock

---

## Notas de implementación

- Schema Zod en `src/content.config.ts` (Astro 7).
- Dejar `docs/content/projects/` como puntero al origen, o una línea que redirija a `src/content`.
- Gitflow: merge a `develop`, abrir `cursor/spec-006`.

---

*Última actualización: agosto 2026*
