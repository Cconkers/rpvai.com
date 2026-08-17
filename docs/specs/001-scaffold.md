# SPEC-001 — Scaffold Astro + tokens + CI/Vercel

| | |
|---|---|
| **ID** | SPEC-001 |
| **Título** | Scaffold Astro, tokens, layout base, CI y hosting Vercel |
| **Estado** | `Ready for implementation` |
| **Fecha** | agosto 2026 |
| **Ruta** | raíz del repo, `src/layouts/`, `src/styles/`, `src/pages/`, `.github/workflows/`, `vercel.json` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Sustituir la SPA Angular de `Cconkers/rpvai.com` por una base Astro estática sobre la que
las SPECs siguientes puedan construir la web personal, con tokens de marca, verificación
`check`/`build` y el mismo modelo de CI + Vercel que Burbujas de Luz.

### Alcance

Incluye:

- Vaciar el árbol Angular del remoto y conservar el kit documental ya escrito
- Proyecto Astro (TypeScript strict) + Tailwind v4 en CSS (sin `tailwind.config`)
- Tokens `@theme` según DESIGN_SYSTEM, fuentes autoalojadas Newsreader + Source Sans 3
- `BaseLayout.astro` (`lang="es"`, skip link, `global.css`)
- `index.astro` mínimo (título de documento + un `h1` de sistema; sin marketing)
- Scripts `dev`, `build`, `preview`, `check`
- `.gitignore` de Astro (`node_modules`, `dist`, `.astro`, lockfile como Burbujas)
- `vercel.json` estático (framework astro, `dist/`)
- GitHub Actions CI: `npm install` + `npm run check` + `npm run build` (como Burbujas)
- Rama `cursor/spec-001`, merge a `develop` si check y build pasan

Excluye:

- Hero, retrato recortado, nav, servicios, case studies (SPEC-002+)
- React u otros frameworks (D-003)
- Content collections (SPEC-005)
- SEO/schema/OG completos (SPEC-008)
- Adapter `@astrojs/vercel` (sitio estático, D-033)
- Secciones de PRODUCT.md

---

## User

Base técnica. Ningún perfil de PRODUCT.md ve aún la oferta; ven una página de sistema
hasta SPEC-003.

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Orquestador / agente | Un repo que construye | `check` y `build` verdes |
| Visitante futuro | HTML válido, idioma, skip link | Layout listo, sin contenido comercial |

---

## Visual references

Tokens de [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md). Fondo `--color-background` (papel).
Sin UI de marketing. El retrato fuente no se monta.

---

## Information Architecture

### 1. Página `/`

- Un `h1` de sistema, p. ej. "Rubén Palomo Viedma"
- Texto breve de apoyo: sitio en construcción / scaffold, **sin** vender servicios
- Skip link "Saltar al contenido" hacia `#contenido`

---

## Responsive requirements

### Mobile (< 768px)

Legible a 320px. Gutters del design system. Sin scroll horizontal.

### Tablet (768-1023px)

Misma estructura, una columna.

### Desktop (≥ 1024px)

Contenido limitado a `--content-max`.

---

## Accessibility

- `lang="es"`
- Un solo `h1`
- Skip link como primer elemento focusable, visible al foco
- Contraste del texto de sistema sobre papel (tokens `--color-text` / `--color-background`)
- Foco visible (`--shadow-focus` o outline de `--color-focus`)
- `prefers-reduced-motion` anula transiciones (tokens de motion)

---

## Performance

- Sin dependencias de UI extra (D-004)
- Fuentes en `public/fonts/`, `font-display: swap`, sin CDN en runtime
- Imágenes: ninguna en esta SPEC salvo el PNG fuente ya existente (no se referencia en la página)
- JS: ninguno en el índice

---

## SEO

Mínimo: `<title>` y `<meta name="description">` provisionales. Canonical/OG/schema: SPEC-008.
`site` en `astro.config.mjs`: `https://rpvai.com` (D-032).

---

## Acceptance Criteria

### Build y tipos

- [ ] `npm run check` termina con 0 errores, 0 warnings y 0 hints.
- [ ] `npm run build` completa sin errores.
- [ ] Sin errores en la consola del navegador en la página de sistema.

### Estructura y contenido

- [ ] No quedan `angular.json`, `src/app/`, Firebase de la SPA ni `tailwind.config.js` de Tailwind v3.
- [ ] Existen `AGENTS.md`, `docs/`, `src/assets/images/ruben-source.png`.
- [ ] No existe `tailwind.config.*` (D-013).
- [ ] `package.json` declara Node `>=22.12.0` y script `check` = `astro check`.

### Visual

- [ ] Solo tokens semánticos en componentes, sin hex arbitrarios (D-006).
- [ ] Fondo papel, texto tinta; no hay `--lb-*` ni burbujas (D-005, D-027).

### Responsive

- [ ] Correcto a 320px, 375px, 768px, 1024px y 1440px.
- [ ] Sin scroll horizontal en ningún ancho.

### Accesibilidad

- [ ] Skip link operable por teclado, con foco visible.
- [ ] Contraste del cuerpo ≥ 4.5:1 sobre papel.
- [ ] `prefers-reduced-motion: reduce` anula animaciones.

### Rendimiento

- [ ] Sin React ni librerías de animación.
- [ ] Fuentes autoalojadas.

### CI y hosting

- [ ] `.github/workflows/ci.yml` ejecuta install, check y build.
- [ ] `vercel.json` apunta a framework Astro y `dist/`.
- [ ] No se usa adapter serverless.

---

## Notas de implementación

- Conservar el kit documental; no reescribir PRODUCT/DECISIONS salvo D-033 y estado de esta SPEC.
- Gitflow: implementar en `cursor/spec-001`, merge a `develop` si los criterios pasan.
- Deploy real en Vercel: integración GitHub del proyecto (como Burbujas). El workflow de
  Actions **valida**; no sustituye el enlace del repo en el dashboard de Vercel.
- Fuentes: woff2 latin en `public/fonts/`. Si Newsreader no está disponible, Fraunces
  según DESIGN_SYSTEM.

---

*Última actualización: agosto 2026*
