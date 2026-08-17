# SPEC-009 — Legal mínimo

| | |
|---|---|
| **ID** | SPEC-009 |
| **Título** | Aviso legal y privacidad (titular persona, sin CIF inventado) |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/aviso-legal`, `/privacidad`, footer |

## Objective

Cumplir lo mínimo para un sitio personal con email y WhatsApp, **sin** inventar CIF ni
domicilio (D-009).

### Alcance

- `/aviso-legal`: titular Rubén Palomo Viedma, email, WhatsApp como canal, dominio
- `/privacidad`: datos que se reciben por WhatsApp/email; sin cookies de tracking
- Enlaces en el footer
- CIF, domicilio y datos fiscales: `[PLACEHOLDER]` explícito, no un número falso

Excluye: cookies de analítica, banner de cookies, texto de lavandería.

## Acceptance Criteria

- [x] `check`/`build` OK
- [x] Dos páginas 200
- [x] Footer enlaza ambas
- [x] No hay CIF inventado como si fuera real
- [x] Sitemap las incluye

---

*Última actualización: agosto 2026*
