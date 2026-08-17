# RPV — Rubén Palomo Viedma

Web personal. Freelancer de **desarrollo web**: frontend, UX/UI, integraciones (APIs e IA)
y webs con datos. Repo [`Cconkers/rpvai`](https://github.com/Cconkers/rpvai). Dominio:
`rpvai.com`.

**MVP (SPEC-001–010) implementado.** Siguiente trabajo: Grupo E o cerrar `[PLACEHOLDER]`
(URL Burbujas, proyectos 2–3, curiosidades, teléfono en claro, NIF). Ver
[`PLANNING.md`](PLANNING.md) §0 y [`docs/specs/BACKLOG.md`](docs/specs/BACKLOG.md).

## Cómo trabajar (agentes)

1. Lee [`AGENTS.md`](AGENTS.md).
2. Lee [`docs/DECISIONS.md`](docs/DECISIONS.md) y [`PLANNING.md`](PLANNING.md) §0.
3. Mira el backlog. No hay SPEC de producto abierta en el MVP; abre una nueva para Grupo E.

## Documentos

| Pregunta | Documento |
|----------|-----------|
| ¿Qué y para quién? | [`docs/PRODUCT.md`](docs/PRODUCT.md) |
| ¿Cómo se ve? | [`docs/VISUAL_DIRECTION.md`](docs/VISUAL_DIRECTION.md) |
| ¿Qué token uso? | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) |
| ¿Por qué es así? | [`docs/DECISIONS.md`](docs/DECISIONS.md) |
| ¿Stack y carpetas? | [`PLANNING.md`](PLANNING.md) |

## Foto

Fuente: [`src/assets/images/ruben-source.png`](src/assets/images/ruben-source.png). En UI
va recortada (D-014).

## Comandos

| Comando | Acción |
|---------|--------|
| `npm run dev` | Desarrollo |
| `npm run check` | `astro check` |
| `npm run build` | Producción |

Node >= 22.12.0.

## Deploy (Vercel)

- CI: [`.github/workflows/ci.yml`](.github/workflows/ci.yml)
- Estático: [`vercel.json`](vercel.json)
- Producción: rama `develop` en el dashboard, repo `Cconkers/rpvai`
