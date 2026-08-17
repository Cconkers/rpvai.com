# SPEC-007 — Contacto y brief

| | |
|---|---|
| **ID** | SPEC-007 |
| **Título** | Sección de contacto: vías y qué enviar |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/` `#contacto`, `src/components/sections/Contact.astro`, `src/data/contact.ts` |

> **Leer antes de implementar:** [`PRODUCT.md`](../PRODUCT.md),
> [`VISUAL_DIRECTION.md`](../VISUAL_DIRECTION.md), [`DESIGN_SYSTEM.md`](../DESIGN_SYSTEM.md),
> [`DECISIONS.md`](../DECISIONS.md), [`PLANNING.md`](../../PLANNING.md).
> El protocolo de trabajo está en [`AGENTS.md`](../../AGENTS.md).
> El backlog está en [`BACKLOG.md`](./BACKLOG.md).

---

## Objective

Quitar la incertidumbre de "¿cómo le encargo algo?": dos vías (WhatsApp y email) y una
lista clara de qué enviar para recibir propuesta en 48 h.

### Alcance

Incluye:

- Sección `#contacto` completa (sustituye el bloque mínimo de SPEC-006)
- CTA primario WhatsApp, secundario mailto (D-011, D-019)
- Cuatro puntos de brief: negocio, objetivo, referencias, plazo
- Prefill opcional en WhatsApp y en el cuerpo del mailto (misma lista)
- Copy en `src/data/contact.ts`

Excluye:

- `<form>` con backend, Resend, Calendly (D-011)
- Teléfono en claro (`tel:`) — D-024 sigue sin confirmar; el número solo viaja en `wa.me`
- Aviso legal (SPEC-009)
- Schema (SPEC-008)

---

## User

| Perfil | Qué necesita | Implicación de diseño |
|--------|--------------|-----------------------|
| Pyme que no sabe encargar | Una plantilla de mensaje | Lista de 4 ítems + CTA |
| Móvil | Un toque a WhatsApp | Botón 44px, prefill |
| Quien prefiere email | mailto visible | Dirección en texto, no solo icono |

---

## Visual references

Misma jerarquía editorial (kicker, h2, cards). Un CTA primario de tinta en la zona.
Sin formulario de 8 campos.

---

## Information Architecture

### Contacto (`#contacto`)

- Kicker `05 — Empezar`
- `h2` Contacto
- Lead: brief gratuito, propuesta en 48 h
- Lista: Negocio, Objetivo, Referencias, Plazo (título + una línea)
- Acciones: Cuéntame tu proyecto (WhatsApp) · Escribir un email
- Línea de apoyo: el email en claro (`mailto`)
- **No** mostrar `+34 722 20 30 03`

---

## Responsive / a11y / performance

Una columna en móvil; 2×2 en tablet+ para los puntos del brief. Teclado, foco, 44px.
Sin JS nuevo. Sin dependencias.

---

## SEO

Copy indexable. Schema: SPEC-008.

---

## Acceptance Criteria

### Build y tipos

- [x] `npm run check` — 0 / 0 / 0
- [x] `npm run build` OK

### Contenido

- [x] WhatsApp + email visibles como acciones
- [x] Cuatro puntos de brief
- [x] Sin teléfono en claro
- [x] Sin formulario POST
- [x] 48 h mencionado

### Visual / a11y

- [x] Tokens; distinto de Burbujas
- [x] Un primario por zona
- [x] 320–1440 sin scroll horizontal

---

## Notas

D-024: se documenta en esta SPEC la elección **temporal** de no pintar el número. Cambiarlo
exige confirmación del propietario, no una decisión nueva si solo se revela el mismo móvil.

Gitflow: merge `develop`, abrir `cursor/spec-008`.

---

*Última actualización: agosto 2026*
