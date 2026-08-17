# SPEC-011 — Capa cinematográfica y motion premium

| | |
|---|---|
| **ID** | SPEC-011 |
| **Título** | Vídeo HD de fondo, glass panels, motion y hero premium |
| **Estado** | `Done` |
| **Fecha** | agosto 2026 |
| **Ruta** | `/`, `src/components/ui/CinematicVideos.astro`, `src/scripts/`, `global.css` |

---

## Objective

Elevar la percepción visual del home con vídeo HD, transiciones entre secciones y
microinteracciones de nivel estudio, sin caer en clichés de IA oscura ni copiar Burbujas.

### Alcance

Incluye:

- 3 clips HD en `public/video/` (hero, code, craft) con crossfade al scroll
- Componente `CinematicVideos` + `SectionTransition`
- Hero a pantalla completa con panel glass
- Script `motion.ts` (reveals, header blur) y `cinematic.ts` (crossfade, parallax desktop)
- Tokens motion premium (`--duration-luxe`, `--ease-luxe`, sombras ampliadas)
- Paneles glass en secciones del home
- Copy hero actualizado (tecnología + calidad justa)

Excluye:

- Tarjeta showcase de Burbujas → SPEC-012
- Vídeo propio del cliente (sustituir stock cuando exista)

---

## Acceptance Criteria

### Build y tipos

- [x] `npm run check` — 0 errores
- [x] `npm run build` — OK

### Visual

- [x] Vídeo fijo de fondo en home con wash papel/cobre (no negro IA)
- [x] Crossfade entre clips al cambiar de sección (desktop y móvil)
- [x] Hero min-height 100svh con panel glass legible
- [x] Transiciones curvas entre bloques
- [x] `prefers-reduced-motion`: sin vídeo, sin animaciones de entrada

### Accesibilidad

- [x] Vídeos decorativos con `aria-hidden` en capa fija
- [x] Contraste de texto sobre glass verificado (tinta sobre papel 76%+)

### Rendimiento

- [x] Sin dependencias nuevas
- [x] Clips lazy-load excepto hero; solo `transform`/`opacity` en JS

---

*Última actualización: agosto 2026*
