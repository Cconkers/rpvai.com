# BACKLOG.md — SPECs agrupadas

Fuente de orquestación: qué construir, en qué orden, y qué queda para después.
Una tarea = una SPEC. Si no hay SPEC, no hay código (D-001).

Estados: `Planned` → se redacta la SPEC (`Draft` / `Ready`) → rama `cursor/spec-NNN` →
`Done`.

Si el tema de la siguiente no está claro, escribe `NNN.plan.md` con candidatos (como en
Burbujas 016) antes de redactar la SPEC.

---

## Grupo A — Fundación (documental)

| ID | Tema | Estado |
|----|------|--------|
| — | Kit documental + revisión de oferta (servicios web, no landings) | **Done** (agosto 2026) |

El kit documental (Grupo A) está hecho, incluida la decisión de sustituir el repo
[Cconkers/rpvai](https://github.com/Cconkers/rpvai) (D-032, D-034).

---

## Grupo B — Base técnica

### SPEC-001 — Scaffold Astro + tokens

- **Estado:** `Done` (agosto 2026)
- **Ruta:** raíz del repo, `src/layouts/`, `src/styles/global.css`
- **Incluye:** Astro + Tailwind v4 en CSS, TypeScript strict, `npm run check`,
  BaseLayout (skip link, lang=es), tokens `@theme`, fuentes autoalojadas,
  `.gitignore`, CI GitHub Actions, `vercel.json` + deploy a Vercel (D-033).

### SPEC-002 — Header, nav, footer

- **Estado:** `Done` (agosto 2026)
- **Ruta:** `src/components/` chrome, `src/layouts/BaseLayout.astro`, `/` y `/about`
- **Incluye:** wordmark texto "Rubén Palomo" / RPV, anclas o rutas `/`, `/about`, trabajo,
  servicios, contacto. Nav móvil accesible. Footer con email y CTA WhatsApp. Skip link ya en
  layout.
- **Excluye:** logo bitmap. Redes: GitHub y LinkedIn sí (D-032); el resto no.
- **SPEC:** [`002-header-nav-footer.md`](./002-header-nav-footer.md)

### SPEC-003 — Home hero + retrato + CTA

- **Estado:** `Done` (agosto 2026)
- **Ruta:** `/` — sección Hero
- **Incluye:** titular de oferta (desarrollo web: frontend, APIs, IA, datos — no "busco empleo"),
  chip "Aceptando proyectos", retrato recortado (D-014), CTA WhatsApp, una línea de apoyo.
- **Excluye:** resto de secciones (004+), sparkle/marco de la foto fuente.
- **SPEC:** [`003-home-hero.md`](./003-home-hero.md)

---

## Grupo C — Producto comercial

### SPEC-004 — Servicios y cómo trabajo

- **Estado:** `Done` (agosto 2026)
- **Ruta:** `/` secciones servicios + proceso
- **Incluye:** líneas de oferta (frontend, UX/UI, integraciones/APIs, IA aplicada, web con
  datos) según [`PRODUCT.md`](../PRODUCT.md) — Offer. Copy de brief + propuesta 48 h.
  Spec-driven + agentes en beneficio de cliente. Fullstack con IA: honestidad (núcleo
  frontend). Sin packs de landing ni cifras 1.490/2.490/3.490 (D-029, D-031).
- **Excluye:** tarifas horarias, demo IA en esta web.
- **SPEC:** [`004-servicios-proceso.md`](./004-servicios-proceso.md)

### SPEC-005 — Case study Burbujas + listado

- **Estado:** `Done` (agosto 2026)
- **Ruta:** `/work/burbujas-de-luz`, listado en home
- **Incluye:** content collection, plantilla de proyecto, caso Burbujas (problema →
  decisión → resultado). URL y capturas `[PLACEHOLDER]` si no están. Dos cards hueco
  para proyectos 2 y 3.
- **Excluye:** Portal del Donante (salvo decisión nueva), screenshots de BME/Bosonit.
- **SPEC:** [`005-trabajo-burbujas.md`](./005-trabajo-burbujas.md)

**Plantilla mínima de un proyecto (frontmatter):**

```yaml
title: Burbujas de Luz
slug: burbujas-de-luz
role: Desarrollo web
stack: [Astro, Tailwind]
url: "[PLACEHOLDER]"
featured: true
year: 2026
```

Cuerpo: contexto, enfoque spec-driven, resultado (cualitativo si no hay métricas).

### SPEC-006 — About

- **Estado:** `Done` (agosto 2026)
- **Ruta:** `/about` + bloque corto en home
- **Incluye:** retrato, texto humano, curiosidades `[PLACEHOLDER]`, crédito ATMIRA/BME,
  Bosonit, Factoría F5. Inglés B2 si aporta. Remoto España.
- **Excluye:** lista de Jira/Karma/ArgoCD, timeline corporativo completo.
- **SPEC:** [`006-about.md`](./006-about.md)

### SPEC-007 — Contacto y brief

- **Estado:** `Done` (agosto 2026)
- **Ruta:** `/` #contacto (o sección final)
- **Incluye:** WhatsApp, email, qué enviar (negocio, objetivo, referencias, plazo).
  Teléfono en claro vs solo deep-link: `[PLACEHOLDER]` (D-024).
- **Excluye:** backend, Resend, Calendly.
- **SPEC:** [`007-contacto-brief.md`](./007-contacto-brief.md)

---

## Grupo D — Confianza y descubrimiento

### SPEC-008 — SEO

- **Estado:** `Planned`
- **Incluye:** title/description, OG (composición con fondo sólido; no PNG con alfa
  sobre negro), sitemap, robots, schema `Person` + `ProfessionalService`. **No**
  `LocalBusiness` (D-017).
- **Excluye:** blog, hreflang.

### SPEC-009 — Legal mínimo

- **Estado:** `Planned`
- **Incluye:** aviso legal / privacidad acordes a email y WhatsApp. Sin inventar CIF ni
  domicilio. `[PLACEHOLDER]` de datos fiscales.
- **Excluye:** cookies de tracking (no hay analytics aún).

### SPEC-010 — Polish visual, a11y, Lighthouse

- **Estado:** `Planned`
- **Incluye:** pasar presupuesto D-025, reduced-motion, 320px, contraste medido,
  recortes de aire, estados de foco.
- **Excluye:** rediseño, nuevas secciones.

---

## Grupo E — Después del MVP

No numerar hasta abrirlas. Cada una exige SPEC + decisión si toca arquitectura.

| Tema | Notas |
|------|--------|
| Demo IA | `/lab` o isla; no chatbot genérico; no hundir Lighthouse |
| Proyectos 2 y 3 | Cuando existan URLs reales |
| i18n EN | D-018 |
| Calendly | Sustituye o acompaña WhatsApp solo con decisión |
| Formulario Resend | D-011 |
| Capturas Burbujas | Producción o staging |
| Analytics | Umami o Plausible |
| Dominio | `rpv.dev` / `rubenpalomo.dev` u otro `[PLACEHOLDER]` |

---

## Cómo orquestar

1. Abre [`001.plan.md`](./001.plan.md) o redacta la SPEC con [`TEMPLATE.md`](./TEMPLATE.md).
2. Pasa la SPEC a `Ready for implementation`.
3. Rama `cursor/spec-NNN`.
4. Pide al agente: **implementa SPEC-00N**. Debe seguir [`AGENTS.md`](../../AGENTS.md).
5. Al cerrar: gitflow (D-022).
6. Si hay duda de tema: `NNN.plan.md` de candidatos, no código.

---

*Última actualización: agosto 2026*
