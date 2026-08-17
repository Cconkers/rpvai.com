# RPV — Rubén Palomo Viedma

Web personal. Freelancer de **desarrollo web**: frontend, UX/UI, integraciones (APIs e IA)
y webs con datos. Sustituye el sitio Angular de
[Cconkers/rpvai.com](https://github.com/Cconkers/rpvai.com) (D-032). Dominio destino:
`rpvai.com`.

**No hay UI todavía.** El Grupo A del backlog es documentación. El código empieza en
SPEC-001.

## Cómo trabajar (agentes)

1. Lee [`AGENTS.md`](AGENTS.md) — mapa, 14 pasos, 14 reglas.
2. Lee [`docs/DECISIONS.md`](docs/DECISIONS.md) y [`PLANNING.md`](PLANNING.md) §0.
3. Mira [`docs/specs/BACKLOG.md`](docs/specs/BACKLOG.md).
4. Implementa **solo** la SPEC activa. Siguiente: [`docs/specs/001.plan.md`](docs/specs/001.plan.md).

```
implementa SPEC-001
```

## Documentos

| Pregunta | Documento |
|----------|-----------|
| ¿Qué y para quién? | [`docs/PRODUCT.md`](docs/PRODUCT.md) |
| ¿Cómo se ve? | [`docs/VISUAL_DIRECTION.md`](docs/VISUAL_DIRECTION.md) |
| ¿Qué token uso? | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) |
| ¿Por qué es así? | [`docs/DECISIONS.md`](docs/DECISIONS.md) |
| ¿Stack y carpetas? | [`PLANNING.md`](PLANNING.md) |

## Foto

Fuente del retrato: [`src/assets/images/ruben-source.png`](src/assets/images/ruben-source.png).
No usar el marco azul ni el sparkle en la UI (D-014). Recorte en SPEC-003.

## Comandos (tras SPEC-001)

| Comando | Acción |
|---------|--------|
| `npm run dev` | Desarrollo |
| `npm run check` | `astro check` |
| `npm run build` | Producción |

Node >= 22.12.0.

## Deploy (Vercel, como Burbujas)

- CI: [`.github/workflows/ci.yml`](.github/workflows/ci.yml) — `check` + `build` en cada push.
- Hosting: [`vercel.json`](vercel.json) — estático, carpeta `dist/`.
- Autodeploy: [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) en `develop` (producción) y `cursor/**` (preview).

Secretos de GitHub Actions: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
También se puede enlazar el repo en el dashboard de Vercel (producción = `develop`), igual que Burbujas.
