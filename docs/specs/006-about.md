# SPEC-006 — About

| | |
|---|---|
| **ID** | SPEC-006 |
| **Título** | Sobre mí: página y bloque corto en home |
| **Estado** | `In progress` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/about`, `/` bloque Sobre mí, `src/data/about.ts` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Que el visitante vea a una persona con crédito profesional, no un CV ni una consultora.
Anclar confianza (cara, BME/Bosonit/F5) sin vender empleo.

### Alcance

Incluye:

- Página `/about` con retrato recortado, texto humano, crédito ATMIRA/BME, Bosonit /
  Elliot Cloud, Factoría F5, inglés B2, España remoto
- Bloque corto en home (antes de Contacto) + enlace a `/about`
- Copy en `src/data/about.ts`
- Curiosidades como `[PLACEHOLDER]` honesto: no inventar 2–3 rasgos (D-009)
- Enlaces GitHub y LinkedIn ya confirmados

Excluye:

- Lista de Jira / Karma / ArgoCD / timeline corporativo
- Ciudad (D-017)
- Portal del Donante como case study (sí se puede nombrar el origen del bootcamp)
- Screenshots o datos internos de empleo (D-016)
- Headline "Angular Specialist" (D-030)

---

## User

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Pyme | Confiar en quién hay detrás | Cara + nombres de empresas, no stack dump |
| Quien vio Burbujas | Saber que es la misma persona | Tono personal, no «nosotros» |
| Reclutador (secundario) | Puede leer el crédito | No se diseña la página para él |

---

## Visual references

Retrato vía `Portrait.astro`. Editorial: dos columnas en desktop (foto | texto). Sin
look de LinkedIn azul.

---

## Information Architecture

### 1. Home — Sobre mí (`#sobre-mi`)

- Kicker `04 — Persona`
- `h2` Sobre mí
- Retrato `md` + 1–2 párrafos (crédito breve)
- Enlace secundario «Leer más» → `/about`
- Contacto pasa a kicker `05`

### 2. `/about`

- `h1` Sobre mí
- Retrato
- Párrafos: quién (freelance, no consultora), crédito, honestidad fullstack, idiomas y
  remoto
- Nota de curiosidades pendientes
- CTA WhatsApp + GitHub + LinkedIn

---

## Responsive requirements

### Mobile (< 768px)

Columna: retrato, luego texto.

### Tablet / desktop

Retrato a un lado, prosa a `--prose-max`.

---

## Accessibility

- Un `h1` en `/about`; en home el `h1` sigue en el hero
- `alt` del retrato ya definido
- Enlaces con texto visible

---

## Performance

- Retrato `lazy` en home; `eager` en `/about` (LCP de esa página)
- Sin dependencias nuevas

---

## SEO

Title/description de `/about`. Schema: SPEC-008.

---

## Acceptance Criteria

### Build y tipos

- [ ] `npm run check` — 0 errores, 0 warnings, 0 hints
- [ ] `npm run build` — OK

### Estructura y contenido

- [ ] `/about` con retrato, crédito ATMIRA/BME, Bosonit, Factoría F5
- [ ] España remoto; sin ciudad
- [ ] Inglés B2 mencionado
- [ ] Sin Jira/Karma/ArgoCD ni "Angular Specialist" como titular
- [ ] Curiosidades no inventadas (placeholder o nota honesta)
- [ ] Bloque corto en home con enlace a `/about`

### Visual

- [ ] Tokens semánticos; distinto de Burbujas
- [ ] Retrato recortado (D-014)

### Responsive / a11y / rendimiento

- [ ] 320–1440 sin scroll horizontal
- [ ] Teclado y foco
- [ ] Sin dependencias nuevas

---

## Notas de implementación

Gitflow al cerrar: merge `develop`, abrir `cursor/spec-007`.

---

*Última actualización: agosto 2026*
