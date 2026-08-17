# AGENTS.md

Instrucciones operativas para agentes de IA que trabajen en **RPV — Rubén Palomo Viedma**.

Este archivo **no** contiene documentación de producto, diseño ni arquitectura. Es el
orquestador: indica qué leer, en qué orden, y con qué reglas trabajar. El contenido vive en
los documentos que enlaza, para que exista una sola fuente de verdad por tema.

El método es el mismo que en Burbujas de Luz. El producto no: esta web es la marca personal
de un freelancer de desarrollo web (frontend, UX/UI, APIs, IA, datos). No copies tokens, look ni componentes de
ese cliente.

---

## Mapa de contexto

Qué documento responde a qué tipo de pregunta:

| Pregunta | Documento |
|----------|-----------|
| ¿Qué construimos y para quién? ¿Está esto dentro de alcance? | [`docs/PRODUCT.md`](docs/PRODUCT.md) |
| ¿Cómo debe verse y sentirse? ¿Esto encaja con la marca? | [`docs/VISUAL_DIRECTION.md`](docs/VISUAL_DIRECTION.md) |
| ¿Qué color, tamaño, espaciado, radio o animación uso? | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) |
| ¿Por qué el proyecto es así? ¿Puedo cambiar esto? | [`docs/DECISIONS.md`](docs/DECISIONS.md) |
| ¿Qué stack, estructura y objetivos de rendimiento hay? | [`PLANNING.md`](PLANNING.md) |
| ¿Qué SPEC toca ahora y cuáles vienen después? | [`docs/specs/BACKLOG.md`](docs/specs/BACKLOG.md) |
| ¿Qué debo implementar exactamente en esta tarea? | [`docs/specs/`](docs/specs/) |
| ¿Cómo debo trabajar? | Este archivo |

Ante contradicción entre documentos, el orden de precedencia es:

**SPEC activa → `DECISIONS.md` → `PLANNING.md` §0 → `DESIGN_SYSTEM.md` → `VISUAL_DIRECTION.md` → `PRODUCT.md` → resto de `PLANNING.md`**

Si detectas una contradicción, **no la resuelvas en silencio**: aplica la precedencia,
señálala y propón la corrección documental (Rule 12).

---

## Flujo obligatorio

Antes de escribir una sola línea de código, recorre estos 14 pasos en orden:

1. **Lee este archivo** completo, incluidas las 14 reglas.
2. **Lee [`PLANNING.md`](PLANNING.md), empezando por §0.** La sección §0 prevalece sobre el resto del documento; el contenido posterior es registro histórico si existe (D-012).
3. **Lee [`docs/DECISIONS.md`](docs/DECISIONS.md).** Restringe todo lo que venga después. Si tu tarea contradice una decisión registrada, párate aquí.
4. **Lee [`docs/PRODUCT.md`](docs/PRODUCT.md).** Confirma que la tarea sirve a un objetivo de producto y no está en Non-goals.
5. **Lee [`docs/VISUAL_DIRECTION.md`](docs/VISUAL_DIRECTION.md)** si la tarea tiene cualquier componente visual.
6. **Lee [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)** y localiza los tokens y patrones que vas a necesitar.
7. **Lee la SPEC de la tarea** en [`docs/specs/`](docs/specs/), incluidos sus criterios de aceptación. Si no existe SPEC, ve a Rule 1.
8. **Consulta las referencias visuales** en [`public/design/`](public/design/) cuando la tarea sea visual. La foto fuente es [`public/design/ruben-source.png`](public/design/ruben-source.png); no se usa tal cual (D-014).
9. **Explora el código existente** antes de crear nada: componentes en `src/components/`, tokens en `src/styles/global.css`, layout en `src/layouts/`. Busca lo que ya resuelve tu problema. Si el scaffold aún no existe, no lo improvises fuera de SPEC-001.
10. **Planifica el cambio mínimo** que satisface la SPEC. Enumera los archivos que vas a tocar y por qué.
11. **Contrasta el plan con las reglas 2, 3, 4 y 9** (alcance, arquitectura, mínimo cambio, dependencias) antes de implementar.
12. **Implementa**, reutilizando componentes y tokens en lugar de duplicar.
13. **Verifica**: `npm run check` y `npm run build`, más los criterios de aceptación de la SPEC, responsive y accesibilidad. Si el proyecto aún no está scaffoldado, no ejecutes esos comandos: cierra solo el alcance documental.
14. **Cierra el bucle documental**: registra el drift que hayas detectado y propón nuevas decisiones si procede (reglas 12 y 14).

---

## Reglas de desarrollo

### Rule 1 — Spec first

No implementes funcionalidad relevante sin una SPEC en [`docs/specs/`](docs/specs/). Si no
existe, propón crearla usando [`TEMPLATE.md`](docs/specs/TEMPLATE.md) antes de escribir
código. Excepción: correcciones triviales (un typo, un error evidente) y tareas
exclusivamente documentales.

### Rule 2 — Scope control

Implementa lo que pide la SPEC y nada más. No añadas secciones, páginas, funcionalidades ni
"mejoras" no solicitadas. Si detectas algo que merece hacerse, **proponlo**; no lo hagas por
iniciativa propia. El alcance añadido de forma silenciosa es imposible de revisar.

### Rule 3 — Preserve architecture

Respeta la arquitectura de [`PLANNING.md`](PLANNING.md) §0: Astro con salida estática,
componentes `.astro`, TypeScript en `src/scripts/`, Tailwind v4 configurado en CSS. No
introduzcas React, Vue, Svelte ni ninguna otra capa de framework salvo SPEC + decisión
registrada (D-003). No cambies la estructura de carpetas sin registrar una decisión.

### Rule 4 — Minimal changes

Elige siempre el cambio más pequeño que cumpla la SPEC. No reformatees archivos que no
tocas, no renombres por gusto, no refactorices código ajeno a la tarea. Un diff pequeño se
revisa; uno grande se aprueba a ciegas.

### Rule 5 — Reuse

Antes de crear un componente, busca si ya existe. Antes de escribir un valor, busca si ya
hay un token. Si necesitas algo dos veces, extráelo a un componente compartido en
`src/components/ui/`. Duplicar es aceptable solo cuando la abstracción sería peor que la
repetición, y en ese caso conviene decir por qué.

### Rule 6 — Visual consistency

Todo elemento visual sale de [`DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md): colores,
tipografía, espaciado, radios, sombras, movimiento. **Nada de hexadecimales arbitrarios ni
de colores por defecto de Tailwind** para color de marca (D-006). Si te falta un token,
añádelo al sistema; no lo improvises en el componente.

### Rule 7 — Responsive first

Diseña e implementa desde móvil hacia arriba. Toda interfaz funciona en mobile, tablet y
desktop. Prueba a 320px como suelo. Sin scroll horizontal en ningún ancho, y sin pérdida de
contenido entre breakpoints (D-008).

### Rule 8 — Accessibility

No negociable. HTML semántico, un solo `<h1>`, jerarquía de encabezados sin saltos,
navegación completa por teclado, foco visible, objetivos táctiles de 44px, y contraste
**medido** conforme a la tabla normativa de
[`DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) — Contrast rules. Ningún tono `500` de la marca
sirve para texto de cuerpo (D-007). Respeta `prefers-reduced-motion`.

### Rule 9 — Performance

Cero dependencias nuevas salvo necesidad demostrada y registrada (D-004). Imágenes siempre
por `astro:assets` con dimensiones explícitas. Anima solo `transform` y `opacity`. JavaScript
al mínimo, y la página debe seguir siendo legible y navegable sin él. Objetivos en
[`PLANNING.md`](PLANNING.md) §3.

### Rule 10 — Verification

Antes de dar una tarea de código por terminada, ejecuta:

```bash
npm run check   # astro check: tipos y diagnósticos
npm run build   # compilación de producción
```

Ambos deben pasar sin errores. Repasa además los criterios de aceptación de la SPEC uno a
uno. No entregues con errores pendientes "para arreglar después".

### Rule 11 — No silent architecture changes

No cambies stack, estructura de carpetas, herramientas de build ni patrones arquitectónicos
sin proponerlo primero y registrar la decisión. Esto incluye añadir dependencias y crear
`tailwind.config.*` (D-013).

### Rule 12 — Documentation drift

Si encuentras documentación que contradice la realidad del código, **señálalo**. Corrige de
forma **aditiva**: `PLANNING.md` no se reescribe entero, se le añade una sección fechada que
prevalece (D-012). Si has cambiado algo que la documentación describe, actualiza la
documentación en la misma tarea.

### Rule 13 — Consult DECISIONS

Antes de cualquier elección que pueda contradecir una decisión previa, consulta
[`docs/DECISIONS.md`](docs/DECISIONS.md). Si tu tarea choca con una decisión registrada,
detente y plantéalo: no la ignores ni la revoques por tu cuenta.

### Rule 14 — Propose new decisions

Cuando tomes una decisión de arquitectura, producto o diseño global que vaya a afectar a
tareas futuras, **propón una entrada nueva** en [`docs/DECISIONS.md`](docs/DECISIONS.md) en
lugar de decidir en silencio. El criterio decisivo: si alguien sin tu contexto podría
razonablemente decidir lo contrario, hay que registrarlo. Formato y criterios en
[Cómo añadir una nueva decisión](docs/DECISIONS.md#cómo-añadir-una-nueva-decisión).

---

## Restricciones que se incumplen con frecuencia

Atajos que parecen razonables y que este proyecto ha decidido no tomar:

| No hagas esto | Motivo |
|---------------|--------|
| Copiar paleta, burbujas o look de Burbujas de Luz | Es un cliente. Esta marca tiene que verse distinta. (D-005, D-027) |
| Instalar React "porque es un portfolio" | El sitio es contenido estático. React exige SPEC + decisión. (D-003) |
| Crear `tailwind.config.mjs` porque "falta" | Tailwind v4 se configura en CSS. No falta. (D-013) |
| Usar la foto `ruben-source.png` tal cual | Tiene marco azul y sparkle de generador. Hay que recortar. (D-014) |
| Titular "Angular Specialist" o listar Jira/Karma/ArgoCD | La web vende servicios, no un CV. (D-030) |
| Portar Angular/Firebase/chatbot/calendario del repo viejo | Se sustituye, no se migra. (D-032) |
| Tono «consultora / nosotros» o schema Organization | Marca personal. (D-032) |
| Inventar un precio, URL o curiosidad plausible | Todo dato sin confirmar es `[PLACEHOLDER]`. (D-009) |
| Publicar tarifas por hora | La oferta es productizada con "desde". (D-010) |
| Añadir un formulario con backend o Resend en el MVP | El sitio es estático; CTA = WhatsApp / mailto. (D-011) |
| Schema `LocalBusiness` con ciudad | Opera en remoto, España, sin ciudad destacada. (D-017) |
| Chatbot / demo IA en el MVP | Grupo E del backlog, SPEC propia. |
| Ejecutar `npm run astro check` | Ese script no existirá. Es `npm run check`. |
| Editar `CLAUDE.md` esperando que cambie este archivo | Es un archivo propio que apunta aquí. (D-020) |

---

## Development

Al arrancar el servidor de desarrollo, usa modo background:

```
astro dev --background
```

Gestiona el servidor con `astro dev stop`, `astro dev status` y `astro dev logs`.

### Comandos disponibles (tras SPEC-001)

| Comando | Acción |
|---------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Sirve el build de producción en local |
| `npm run check` | `astro check` — tipos y diagnósticos |

Requiere Node **>= 22.12.0**. Hasta que SPEC-001 scaffoldée el proyecto, estos comandos
no existen.

---

## Documentation

Documentación completa: https://docs.astro.build

Consulta estas guías antes de trabajar en tareas relacionadas:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Using Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Images](https://docs.astro.build/en/guides/images/)

> Las guías de componentes de framework e internacionalización se enlazan como referencia de
> la plataforma. Ambas están fuera de alcance en el MVP (Rule 3, D-003, D-018 y `PRODUCT.md` — Non-goals).

---

*Última actualización: agosto 2026*
