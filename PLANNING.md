# PLANNING.md — Arquitectura RPV

> **Proyecto:** RPV — web personal de Rubén Palomo Viedma
> **Documento:** Guía de referencia técnica. No generar código de producto sin consultar
> este archivo y una SPEC activa.
> **Empieza por §0.** Si en el futuro hay secciones históricas, §0 prevalece (D-012).

---

## 0. Estado actual (agosto 2026)

**Esta sección prevalece.** El **MVP está implementado** (SPEC-001 a SPEC-010): sitio Astro
estático de marca personal, oferta de desarrollo web, un case study, contacto por
WhatsApp/email, SEO y legal mínimo. Lo que sigue es Grupo E o datos `[PLACEHOLDER]`.

### 0.1 Qué hay ahora

| Artefacto | Rol |
|-----------|-----|
| `src/pages/` | `/`, `/about`, `/work/[slug]`, `/aviso-legal`, `/privacidad`, `sitemap.xml` |
| `src/content/projects/` | Collection: Burbujas + dos huecos |
| `src/layouts/BaseLayout.astro` | Skip link, OG, canonical, JSON-LD Person + ProfessionalService |
| `src/styles/global.css` | Tokens `--rpv-*` / semánticos, Tailwind v4 `@theme` |
| `public/og.svg` | OG de fondo papel sólido (D-014: no foto con alfa) |
| `public/robots.txt` | Allow `/`, Disallow `/design/`, Sitemap |
| CI + `vercel.json` | `check`/`build`; deploy = integración GitHub de Vercel (`develop`) |

Rutas de producto: home (hero, trabajo, servicios, proceso, about corto, contacto),
about, case Burbujas, legal.

Aún `[PLACEHOLDER]`: URL y capturas de Burbujas, proyectos 2–3, curiosidades, teléfono
en claro, NIF/domicilio, suelo de precio. No hay analytics ni formulario.

### 0.1-bis Stack (sin cambio)

Astro 7 SSG, Tailwind v4 en CSS, TypeScript strict, content collections, Node >= 22.12.
Sin React, sin `tailwind.config`, sin adapter Vercel. Hosting: Vercel estático.

El detalle de carpetas y métricas de más abajo sigue vigente. El párrafo «no hay UI
comercial» del registro histórico de SPEC-001 **ya no describe el repo**.

### 0.3 Tailwind v4 se configura en CSS

No crear `tailwind.config.mjs`. Tokens en [`src/styles/global.css`](src/styles/global.css).

### 0.4 Dirección vigente

Producto y diseño viven en `docs/`. Este archivo cubre **arquitectura, estructura y
rendimiento**.

### 0.5 Lo que sigue vigente más abajo

- §2 convenciones de código y árbol de carpetas **objetivo**
- §3 métricas
- §4 roadmap (el detalle operativo está en [`docs/specs/BACKLOG.md`](docs/specs/BACKLOG.md))
- §5 accesibilidad (ampliado en DESIGN_SYSTEM)
- §6 fases post-MVP
- §7 notas para agentes

### 0.6 Verificación (tras SPEC-001)

```bash
npm run check
npm run build
```

No existirá `npm run astro check` (D-028).

### 0.7 Git

Remoto: `https://github.com/Cconkers/rpvai.git` (D-034; antes `Cconkers/rpvai.com`, D-032).
Rama de integración: `develop` (default del repo).

Cuando se inicialice este árbol:

1. `git init` si hace falta, rama `develop`.
2. Añadir `origin` hacia `Cconkers/rpvai` **sin** mezclar el historial Angular
   hasta que el propietario pida el reemplazo (push del nuevo árbol).
3. Una rama `cursor/spec-NNN` por SPEC.
4. Flujo al cerrar: [`.cursor/rules/spec-gitflow.mdc`](.cursor/rules/spec-gitflow.mdc).

No clonar ni copiar `src/app` de Angular aquí.

### 0.8 Oferta vigente (agosto 2026)

Servicios de desarrollo web (frontend, UX/UI, APIs, IA, web con datos), no packs de
landings. Ver D-029 y [`PRODUCT.md`](docs/PRODUCT.md) — Offer.

---

## 1. Arquitectura

Astro renderiza HTML estático en build. JS solo en islas puntuales (nav, revelado),
preferiblemente `<script>` en componentes Astro, no un framework UI.

```mermaid
flowchart TB
  subgraph docs [Fuente de verdad]
    Product[PRODUCT.md]
    Visual[VISUAL_DIRECTION.md]
    Tokens[DESIGN_SYSTEM.md]
    Specs[docs/specs]
  end
  subgraph astro [Astro SSG]
    Pages[src/pages]
    Layouts[src/layouts]
    Components[src/components]
    Content[src/content/projects]
  end
  Specs --> Pages
  Content --> Pages
  Tokens --> Components
```

Content collections para proyectos: un Markdown por case study, plantilla
`src/pages/work/[slug].astro`.

---

## 2. Estructura de carpetas objetivo

```
RPVAI_landing/
├── AGENTS.md
├── CLAUDE.md
├── PLANNING.md
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── design/                 # referencias; no UI
│   └── fonts/                  # autoalojadas
├── src/
│   ├── assets/images/          # ruben-source.png → derivados vía astro:assets
│   ├── content/projects/       # collection
│   ├── components/
│   │   ├── ui/
│   │   └── sections/
│   ├── layouts/BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── work/[slug].astro
│   ├── scripts/                # TS mínimo si hace falta
│   └── styles/global.css
└── docs/
```

### Convenciones

- TypeScript en `src/scripts/`.
- PascalCase componentes Astro; kebab-case IDs y slugs.
- Estado global: ninguno en el MVP. Nav móvil = script local.
- Naming tokens: `--rpv-*` primitivos, `--color-*` semánticos.
- Sin Zustand/Redux. Sin React.

---

## 3. Rendimiento

| Métrica | Objetivo MVP |
|---------|----------------|
| LCP | < 1.5 s |
| CLS | < 0.05 |
| TBT | < 100 ms |
| Lighthouse P/A11y/BP/SEO | ≥ 95 |

Reglas:

- Imágenes: `astro:assets`, dimensiones explícitas, formatos modernos.
- Anima solo `transform` y `opacity`.
- La página es usable sin JS.
- Sin dependencias nuevas (D-004).
- Retrato: no servir el PNG fuente completo a 116 KB+ en cada vista si se puede emitir
  un derivado recortado y redimensionado.

Breakpoints / tiers: mobile ≤768px, tablet ≤1024px, desktop >1024px. Alineados con
Tailwind `md` / `lg` en [`DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

---

## 4. Roadmap

El backlog operativo está en [`docs/specs/BACKLOG.md`](docs/specs/BACKLOG.md). Resumen:

| Grupo | SPECs | Qué | Estado |
|-------|-------|-----|--------|
| A | kit | Docs + foto fuente | Done |
| B | 001–003 | Scaffold, chrome, hero+foto | Done |
| C | 004–007 | Servicios, Burbujas, about, contacto | Done |
| D | 008–010 | SEO, legal, polish | Done (MVP) |
| E | futuras | Demo IA, más proyectos, i18n, Calendly, Resend, capturas | Abierto |

No implementar un grupo posterior sin cerrar (o explicitar skip de) el anterior, salvo
orden distinto pedido por el orquestador.

---

## 5. Accesibilidad

| Requisito | Implementación |
|-----------|----------------|
| Semántica | Landmarks, un `h1`, jerarquía sin saltos |
| Skip link | Primer elemento focusable |
| Teclado | Nav y CTA operables; foco visible |
| Contraste | Tabla normativa DESIGN_SYSTEM |
| Táctil | 44px mínimo |
| Reduced motion | Anular animaciones |
| Retrato | `alt` descriptivo; no `alt=""` |

---

## 6. Post-MVP (Grupo E)

- `/lab` o isla de demo IA (sin hundir Lighthouse)
- Dos proyectos más cuando existan
- i18n EN
- Calendly
- Formulario Resend
- Capturas reales de Burbujas
- Analytics Umami/Plausible (privacidad)

Cada ítem: SPEC + decisión si toca arquitectura.

---

## 7. Notas para el equipo / agentes

- Consultar este documento y `DECISIONS.md` antes de añadir dependencias o carpetas.
- Priorizar simplicidad: HTML + tokens + una collection.
- Cualquier desviación (React, CMS, dark mode) requiere decisión nueva.
- Commits atómicos por SPEC.

---

*Última actualización: agosto 2026*
