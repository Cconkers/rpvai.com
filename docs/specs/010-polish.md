# SPEC-010 — Polish visual, a11y, Lighthouse

| | |
|---|---|
| **ID** | SPEC-010 |
| **Título** | Cierre de presupuesto de rendimiento y accesibilidad del MVP |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `global.css`, layout, chrome |

## Objective

Dejar el MVP usable a 320px, con foco, reduced-motion y sin scroll horizontal, sin
rediseñar ni añadir secciones.

### Alcance

- `overflow-x` contenido; suelo 320px (D-008)
- Skip link por encima del header sticky
- Preload de fuentes autoalojadas
- `color-scheme: light`
- Contraste de muted/email; objetivos 44px
- Recortes menores de aire si un bloque ahoga

Excluye: rediseño, nuevas secciones, React, analytics.

## Acceptance Criteria

- [x] `check`/`build` 0/0/0
- [x] Sin scroll horizontal a 320px
- [x] Skip link operable con header sticky
- [x] Reduced-motion ya anula transiciones
- [x] Sin dependencias nuevas

---

*Última actualización: agosto 2026*
