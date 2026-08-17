# DECISIONS.md

Registro de decisiones del proyecto RPV (Rubén Palomo Viedma).

## Cómo usar este documento

**Qué es.** La memoria técnica del proyecto. Recoge decisiones de producto, diseño y
arquitectura que ya se han tomado, junto con el motivo. No es documentación de referencia:
es el histórico de por qué el proyecto es como es.

**Cuándo consultarlo.** Antes de tomar cualquier decisión que pueda contradecir una
elección previa.

**Cuándo añadir una decisión.** Cuando una elección vaya a condicionar tareas futuras.
Criterios en [Cómo añadir una nueva decisión](#cómo-añadir-una-nueva-decisión).

**Una decisión existente no se cambia en silencio.** Si deja de ser válida, **no se edita
ni se borra**: se añade una decisión nueva que la sustituye, y la antigua pasa a
`Superseded` con un enlace a la que la reemplaza.

### Responsabilidades documentales

| Documento | Responsabilidad |
|-----------|-----------------|
| [`PRODUCT.md`](./PRODUCT.md) | Qué producto construimos y para quién |
| [`VISUAL_DIRECTION.md`](./VISUAL_DIRECTION.md) | Cómo debe sentirse y verse la marca |
| [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) | Reglas visuales reutilizables y tokens |
| [`PLANNING.md`](../PLANNING.md) | Arquitectura técnica, roadmap y restricciones |
| `DECISIONS.md` | Decisiones ya tomadas y su motivo |
| [`docs/specs/`](./specs/) | Qué debe implementarse en cada tarea |
| [`AGENTS.md`](../AGENTS.md) | Cómo debe comportarse el agente |

### Campos

| Campo | Significado |
|-------|-------------|
| **Fecha** | Cuándo se tomó |
| **Estado** | `Accepted`, `Superseded`, `Deprecated` |
| **Área** | Taxonomía cerrada: `Process`, `Architecture`, `Design`, `Product`, `Accessibility`, `Brand`, `Content`, `Documentation` |

La taxonomía de áreas es **cerrada a propósito**.

---

## D-001 — Adoptar desarrollo Spec-Driven

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Process

### Contexto

Este repo nace para orquestar agentes, no para improvisar UI en el chat. En Burbujas de Luz
el desarrollo conversacional produjo trabajo que hubo que deshacer. Aquí se adopta el mismo
método desde el commit cero.

### Decisión

El desarrollo se organiza mediante especificaciones en [`docs/specs/`](./specs/). Toda
tarea relevante tiene una SPEC **antes** de implementarse. Las SPEC se numeran
incrementalmente (`001-scaffold.md`, …) y siguen [`TEMPLATE.md`](./specs/TEMPLATE.md).
El backlog agrupado vive en [`BACKLOG.md`](./specs/BACKLOG.md).

### Motivo

Una SPEC hace el alcance explícito y verificable. Permite pedir "implementa SPEC-001"
sin renegociar el diseño.

### Consecuencias

- Cada tarea relevante requiere especificación previa.
- Un cambio de alcance se hace editando la SPEC, no improvisando.
- Las correcciones triviales no requieren SPEC.

### Relacionado

- [`AGENTS.md`](../AGENTS.md) — Rule 1, Rule 2
- [`docs/specs/TEMPLATE.md`](./specs/TEMPLATE.md)

---

## D-002 — Separar PRODUCT, DESIGN, ARCHITECTURE y SPEC

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Documentation

### Contexto

Un solo PLANNING que mezcle paleta, oferta y stack diverge en cuanto hay dos agentes.

### Decisión

Se mantienen las responsabilidades de la tabla de
[Responsabilidades documentales](#responsabilidades-documentales). Ningún documento duplica
el contenido íntegro de otro; se enlazan.

### Motivo

Una pregunta debe tener un único sitio donde responderse.

### Consecuencias

- Responder puede exigir leer dos documentos.
- `AGENTS.md` orquesta contexto y no repite contenido.

### Relacionado

- [`AGENTS.md`](../AGENTS.md)

---

## D-003 — Astro estático, sin React en el MVP

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

La landing es contenido y conversión. React añadiría runtime sin beneficio. El empleo de
Rubén es Angular; React está en el CV como nivel básico y no se vende. La propia web debe
demostrar el stack con el que entrega landings a clientes (Astro, como Burbujas).

### Decisión

- Framework: **Astro** (versión actual estable al scaffold, objetivo 7.x).
- Salida **SSG**. Sin autenticación, sin base de datos, sin app shell.
- Componentes `.astro`. TypeScript en `src/scripts/` solo si hace falta.
- **No React, Vue ni Svelte** salvo SPEC + decisión nueva que justifique una isla.

### Motivo

Rendimiento como prueba de oficio, content collections para case studies, y coherencia
con el producto que se vende.

### Consecuencias

- Interactividad (nav móvil, revelados) con JS mínimo, no con un framework UI.
- Reversible: una isla React exigiría D-xxx nueva.

### Relacionado

- [`PLANNING.md`](../PLANNING.md) §0
- [`AGENTS.md`](../AGENTS.md) Rule 3

---

## D-004 — Cero dependencias nuevas sin decisión

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

GSAP, Motion, Three, Howler o un CMS son tentaciones de portfolio. En Burbujas parte de
eso se documentó y nunca se usó.

### Decisión

Toda dependencia nueva exige: (1) necesidad que la plataforma no cubra, (2) decisión
registrada, (3) SPEC que la contemple. Animación = CSS + `IntersectionObserver`.

### Motivo

El presupuesto de JS es parte de la oferta comercial.

### Consecuencias

- No instalar por "aparecer en un artículo de 2026".
- Formulario Resend, analytics y Calendly quedan fuera hasta SPEC.

### Relacionado

- [`PLANNING.md`](../PLANNING.md) §3

---

## D-005 — Identidad light studio, distinta de Burbujas

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Design

### Contexto

Un primer planteamiento barajó dark cinematic. El retrato es claro y cercano. Burbujas ya
ocupa el territorio pastel violeta. Un dark "AI" chocaría con pyme y con la foto.

### Decisión

Dirección **estudio claro (papel cálido) + tinta + cobre**. Sin modo oscuro en el MVP.
Sin superficies oscuras a ancho completo. Sin paleta ni motivos de Burbujas.

### Motivo

Humanidad, legibilidad, diferenciación del cliente, anti-cliché IA.

### Consecuencias

- Tokens `--rpv-*`, no `--lb-*`.
- Un bloque oscuro a ancho completo es drift.

### Relacionado

- [`VISUAL_DIRECTION.md`](./VISUAL_DIRECTION.md)
- D-027

---

## D-006 — Tokens semánticos, sin hex en componentes

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Design

### Contexto

Hex sueltos hacen imposible cambiar marca y rompen contraste.

### Decisión

Los componentes solo usan tokens semánticos. El hex vive en primitivos de
[`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) y en `@theme` de `global.css`.

### Motivo

Una sola capa de cambio; intención legible en el código.

### Consecuencias

- Prohibido `bg-[#…]` y colores por defecto de Tailwind para marca.
- Falta un token: se añade al sistema, no al componente.

---

## D-007 — Contraste WCAG 2.2 AA medido

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Accessibility

### Contexto

Los tonos 500 de acento (cobre incluido) no llegan a 4.5:1 sobre papel.

### Decisión

La tabla Contrast rules de [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) es normativa. Texto de
cuerpo: 4.5:1. Ningún 500 para cuerpo. Medir, no estimar.

### Motivo

Accesibilidad es parte de lo que se vende como frontend.

### Consecuencias

- Chips con texto oscuro sobre `accent-subtle`, no blanco sobre cobre 500.
- Al implementar tokens, re-medir ratios y corregir el doc si hace falta.

---

## D-008 — Móvil primero, suelo 320px

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Design

### Contexto

El decisor típico llega al teléfono.

### Decisión

Se diseña mobile → desktop. Hero con titular, retrato y CTA visibles sin scroll en móvil.
Sin scroll horizontal. Sin pérdida de contenido entre breakpoints.

### Relacionado

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — Responsive

---

## D-009 — Datos no confirmados como PLACEHOLDER

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Content

### Contexto

Faltan URLs, curiosidades, redes y tarifas finales. Inventarlos crea deuda de marca.

### Decisión

Todo dato de negocio o personal no confirmado se marca `[PLACEHOLDER: …]` en specs, copy y
UI. Lo confirmado está en [`PRODUCT.md`](./PRODUCT.md) — Persona.

### Consecuencias

- Un agente no "rellena" LinkedIn ni un tercer proyecto.

---

## D-010 — Oferta productizada, no tarifa horaria

**Fecha:** agosto 2026
**Estado:** Superseded
**Sustituida por:** D-029
**Área:** Product

### Contexto

Rubén empieza a facturar por su cuenta con ~5 años en nómina. El €/hora junior ancla mal;
un price tag de agencia no tiene aún prueba. Lo habitual en 2026 para un servicio
empaquetado (landings) es packs + "desde" + brief.

### Decisión

Tres packs (Landing / + contenido / + IA) cobrados **por proyecto**. CTA a brief y
propuesta en 48 h. No se publican horas ni comparadores de 8 k€.

### Motivo

Producto entendible para pyme; margen para subir según alcance.

### Relacionado

- [`PRODUCT.md`](./PRODUCT.md) — Offer
- D-023
- D-029

---

## D-011 — Sitio estático; contacto por WhatsApp y email

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

No hay backend que mantener el día 1.

### Decisión

CTA primario WhatsApp, secundario mailto. Sin Resend, sin CMS, sin auth en el MVP.

### Motivo

Fricción mínima para pyme; encaja con SSG.

### Consecuencias

- Un `<form>` que POSTea a un servidor exige SPEC + decisión.
- Calendly es Grupo E.

---

## D-012 — PLANNING.md aditivo

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Documentation

### Contexto

En Burbujas el planning original se quedó histórico y §0 pasó a mandar. Evita reescritura
destructiva.

### Decisión

`PLANNING.md` no se reescribe entero cuando el stack evoluciona: se añade una sección
fechada al inicio (§0) que prevalece. El resto queda como registro si aplica.

### Relacionado

- [`PLANNING.md`](../PLANNING.md)
- [`AGENTS.md`](../AGENTS.md) Rule 12

---

## D-013 — Tailwind v4 en CSS, sin tailwind.config

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

Tailwind v4 usa `@theme` y plugin Vite. Crear `tailwind.config.mjs` es el error más
repetido por agentes en Burbujas.

### Decisión

No existe `tailwind.config.*` y no debe crearse. Tokens en `src/styles/global.css`.

---

## D-014 — Retrato recortado; no usar el marco Gemini

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Brand

### Contexto

La foto entregada es un retrato circular sobre cuadrado azul con sparkle. En una landing
de oficio se lee como avatar generado.

### Decisión

La fuente se guarda en `src/assets/images/ruben-source.png` y `public/design/`. En UI se
sirve **solo** vía `astro:assets`, recorte circular de la cara, **sin** cuadrado azul ni
sparkle. El recorte es trabajo de SPEC-003 (o la SPEC visual del hero), no del kit
documental.

### Motivo

Confianza humana; anti-patrón "foto IA".

### Relacionado

- [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) — Retrato
- [`VISUAL_DIRECTION.md`](./VISUAL_DIRECTION.md) §4

---

## D-015 — La landing no es un CV de Angular

**Fecha:** agosto 2026
**Estado:** Superseded
**Sustituida por:** D-030
**Área:** Product

### Contexto

El CV titula "Frontend Engineer – Angular Specialist" y lista Jira, Karma, ArgoCD, etc.
El objetivo de la web es conseguir encargos de landings.

### Decisión

Headline y oferta = landings completas. Angular, BME y Bosonit son **crédito** en About,
sin jerga de herramientas. React no se vende. Fullstack es trayectoria, no promesa.

### Relacionado

- [`PRODUCT.md`](./PRODUCT.md)
- D-030

---

## D-016 — Empleadores con nombre, sin interiores

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Content

### Contexto

Fintech (BME) puede ser sensible. El propietario autorizó nombres reales.

### Decisión

Se puede escribir ATMIRA / BME y Bosonit / Elliot Cloud. Prohibido: screenshots, datos
internos, logos si no hay permiso de marca. No son case studies; Burbujas sí lo es.

---

## D-017 — Remoto España, sin ciudad ni LocalBusiness

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Product

### Contexto

El CV no trae ciudad. Se eligió no destacar una.

### Decisión

Copy y schema: España / remoto. **No** schema `LocalBusiness`. Schema previsto: `Person` +
`ProfessionalService` (SPEC-008).

---

## D-018 — Español primero; sin i18n en el MVP

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Product

### Contexto

Inglés B2 existe; el cliente objetivo habla español.

### Decisión

Toda la UI en español. i18n EN es Grupo E.

---

## D-019 — CTA primario WhatsApp

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Product

### Decisión

Etiqueta "Cuéntame tu proyecto". Destino `https://wa.me/34722203003`. Email secundario
`rubenpv011992@gmail.com`. Chip "Aceptando proyectos" (D-029).

### Relacionado

- [`PRODUCT.md`](./PRODUCT.md) — Primary CTA

---

## D-020 — CLAUDE.md es archivo propio

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Documentation

### Decisión

`CLAUDE.md` apunta a `AGENTS.md` y no duplica reglas. Editar uno no actualiza el otro.

---

## D-021 — Burbujas de Luz es el case study bandera

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Product

### Decisión

El primer (y por ahora único) trabajo publicado en `/work` es Burbujas de Luz. Es prueba
de oficio, **no** el catálogo de lo que se vende (D-029). Otros dos huecos quedan como
`[PLACEHOLDER]`. Portal del Donante no entra salvo SPEC futura.

### Relacionado

- [`docs/specs/BACKLOG.md`](./specs/BACKLOG.md) — SPEC-005

---

## D-022 — Gitflow por SPEC

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Process

### Decisión

Al completar una SPEC: commit en `cursor/spec-NNN`, merge a `develop`, abrir
`cursor/spec-(N+1)`. Detalle en [`.cursor/rules/spec-gitflow.mdc`](../.cursor/rules/spec-gitflow.mdc).
Hasta que exista remoto, se hace el equivalente local y se documenta.

---

## D-023 — Precios "desde" orientativos hasta confirmación

**Fecha:** agosto 2026
**Estado:** Superseded
**Sustituida por:** D-031
**Área:** Product

### Contexto

Cifras propuestas para primer freelance con experiencia de nómina: 1.490 / 2.490 / 3.490 €.
El propietario aún no las ha cerrado.

### Decisión

En documentación se marcan `[PLACEHOLDER]`. En UI, si una SPEC muestra cifra, debe verse
como "desde" + "propuesta en 48 h", no como tarifa cerrada. Cambiar las cifras es editar
`PRODUCT.md` y la SPEC de packs, no un hex en el componente.

### Relacionado

- D-031

---

## D-024 — Contacto confirmado; teléfono visible TBD

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Content

### Decisión

Email y móvil están confirmados. Si el número se pinta en claro o solo viaja en el
deep-link de WhatsApp es `[PLACEHOLDER]` (SPEC-007).

---

## D-025 — Presupuesto de rendimiento

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Decisión

Objetivos MVP: Lighthouse ≥ 95 en Performance/A11y/Best Practices/SEO (desktop y un
perfil móvil razonable), LCP < 1.5 s, CLS < 0.05, WCAG 2.2 AA. Imágenes por
`astro:assets`. JS al mínimo. Ver [`PLANNING.md`](../PLANNING.md) §3.

---

## D-026 — Case studies como content collection

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Decisión

Los proyectos viven en Markdown/MDX con schema (Astro content collections) cuando exista
el scaffold. Añadir un trabajo no exige un componente nuevo si el template de case study
existe. Plantilla en SPEC-005.

---

## D-027 — No copiar tokens ni componentes de Burbujas

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Brand

### Decisión

Se copia el **método** (docs, SPECs, reglas, gitflow), no el design system ni los
`.astro` del cliente. Prohibido `--lb-*`, burbujas CSS, Poppins/Nunito/Caveat como marca.

---

## D-028 — Verificación check + build

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Process

### Decisión

Tras el scaffold, ninguna SPEC de código se cierra sin `npm run check` y `npm run build`
en verde. No existe `npm run astro check`.

---

## D-029 — Oferta: servicios de desarrollo web, no packs de landings

**Fecha:** agosto 2026
**Estado:** Accepted
**Sustituye a:** D-010
**Área:** Product

### Contexto

El planteamiento inicial empaquetó el freelance como "landings completas" (tres packs).
El propietario no vende landings: vende **desarrollo web en general** — frontend, mejora
UX/UI, integraciones con IA y con cualquier API, y webs con base de datos, apoyándose en
IA para el tramo fullstack.

### Decisión

Catálogo de servicios (ver [`PRODUCT.md`](./PRODUCT.md) — Offer):

- Frontend
- UX/UI
- Integraciones y APIs
- IA aplicada
- Web con datos (persistencia; backend con apoyo de IA)

Cobro **por proyecto**, brief + propuesta en 48 h. Chip: "Aceptando proyectos". Burbujas
es un case study, no el producto. Esta web (Astro SSG) demuestra oficio y proceso; el
stack del cliente depende del encargo (puede ser Angular, APIs, datos, etc.).

Honestidad fullstack: se aceptan proyectos con base de datos; no se vende un equipo
backend senior ni DevOps.

### Motivo

Alinear copy y SPECs con lo que realmente se quiere facturar. Un pack de landings
cerraría encargos de producto, APIs e IA.

### Consecuencias

- SPEC-004 es "servicios y cómo trabajo", no tres precios de landing.
- Angular puede aparecer como **capacidad de frontend**, no como headline de empleo.
- Un agente no debe reintroducir "vendo landings" ni los packs 1.490 / 2.490 / 3.490.

### Relacionado

- D-010, D-030, D-031
- [`docs/specs/BACKLOG.md`](./specs/BACKLOG.md)

---

## D-030 — Headline de servicios; Angular es capacidad, no CV

**Fecha:** agosto 2026
**Estado:** Accepted
**Sustituye a:** D-015
**Área:** Product

### Contexto

D-015 fijó "landings completas" como headline y escondió Angular. Al ampliar la oferta,
el frontend de producto (incluido Angular de empleo) es relevante; el CV corporativo no.

### Decisión

Headline: desarrollo web (interfaz, APIs, IA, datos). Angular, BME y Bosonit son crédito
y capacidad. Sin lista de Jira/Karma/ArgoCD. React no se vende como especialidad.

### Relacionado

- D-015, D-029
- [`PRODUCT.md`](./PRODUCT.md)

---

## D-031 — Precio por alcance, no packs de landing

**Fecha:** agosto 2026
**Estado:** Accepted
**Sustituye a:** D-023
**Área:** Product

### Contexto

Los "desde" 1.490 / 2.490 / 3.490 € estaban atados a packs de landing. El alcance de una
API, una mejora UX o una web con datos no cabe en esos tres números.

### Decisión

No publicar esos tres packs. La UI habla de **propuesta en 48 h** según brief. Un suelo
"desde" único es `[PLACEHOLDER]` hasta que el propietario lo confirme; si se muestra,
es el encargo pequeño de frontend/UX, no el precio de una integración o de una web con
datos.

### Relacionado

- D-023, D-029
- [`PRODUCT.md`](./PRODUCT.md) — Offer

---

## D-032 — Sustituir Cconkers/rpvai.com; no portar la SPA Angular

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

Existe un repo público [Cconkers/rpvai.com](https://github.com/Cconkers/rpvai.com)
(default `develop`, último push abril 2025): Angular 19, Tailwind v3, Firebase,
ngx-translate, auth, FullCalendar, Lottie, chatbot. Se presentaba como
«Consultora Web & IA» (`Organization` en schema, tono nosotros). El homepage de
GitHub apunta a `https://landing-page-rpv.vercel.app` (404). El propietario quiere
**sustituir** ese proyecto por este kit spec-driven.

### Decisión

- Destino git: el mismo repo `Cconkers/rpvai.com`, rama `develop`.
- Dominio público: `rpvai.com`.
- Marca en UI: Rubén Palomo / RPV (persona). RPVAI es nombre de dominio/repo, no
  una consultora.
- **No** portar Angular, Firebase, auth, calendario, chatbot, Lottie, FontAwesome,
  modo oscuro ni i18n al MVP.
- El copy antiguo (reunión gratuita, diagnóstico, GPT 24/7) no se reutiliza tal cual;
  la oferta vigente es [`PRODUCT.md`](./PRODUCT.md) — Offer.
- Perfil GitHub `Cconkers` y LinkedIn `ruben-viedma-191a5913a` son datos confirmados
  para footer/about.
- No clonar el repo Angular dentro de este workspace. Cuando haya scaffold, se
  conecta el remoto y se reemplaza el árbol (sin force push a `main`/`develop` a
  menos que el propietario lo pida).

### Motivo

La SPA mezclaba producto, auth y widgets; contradice SSG, rendimiento y marca
personal. Conservar la URL de GitHub y el dominio evita un sitio huérfano.

### Consecuencias

- SPEC-001 no parte de `ng new`.
- SPEC-008 usa `Person` / `ProfessionalService`, no `Organization` «consultora».
- i18n EN sigue en Grupo E (D-018), aunque el sitio viejo ya lo tenía.

### Relacionado

- D-003, D-011, D-018, D-022
- [`PLANNING.md`](../PLANNING.md) §0.7

---

## D-033 — CI en GitHub Actions y hosting en Vercel (como Burbujas)

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

Burbujas valida con Actions (`check` + `build`) y publica con la integración GitHub de
Vercel (`vercel.json`, sitio estático, sin adapter). El propietario pidió el mismo
modelo para `rpvai.com`.

### Decisión

- GitHub Actions: job único install + `npm run check` + `npm run build` en cada push y PR.
- `package-lock.json` no se versiona; CI usa `npm install` (igual que Burbujas).
- Hosting: Vercel, output estático `dist/`. Sin `@astrojs/vercel` hasta que haga falta SSR.
- Producción: rama `develop` (default del repo). Previews: resto de ramas.
- **Deploy:** integración GitHub ↔ Vercel en el dashboard (como Burbujas). **No** hay workflow
  de `vercel deploy` en Actions; los secretos `VERCEL_*` son opcionales y no sustituyen
  enlazar el repo en Vercel.

### Motivo

Misma puerta de calidad y el mismo hosting que el otro producto Astro del propietario.
El workflow con `vercel pull --token=` fallaba si `VERCEL_TOKEN` no estaba definido en
GitHub; el patrón Burbujas no usa ese workflow.

### Relacionado

- D-023 de Burbujas (patrón), D-028, D-032
- [`SPEC-001`](./specs/001-scaffold.md)

---

## D-034 — El repo público se llama Cconkers/rpvai

**Fecha:** agosto 2026
**Estado:** Accepted
**Área:** Architecture

### Contexto

El propietario renombró el repositorio de GitHub. El slug anterior `Cconkers/rpvai.com`
redirige; el nombre canónico es `rpvai`. El dominio público de la web sigue siendo
`rpvai.com`.

### Decisión

- Destino git: `https://github.com/Cconkers/rpvai.git`, rama `develop`.
- En documentación y enlaces, usar `Cconkers/rpvai`. El slug `rpvai.com` queda como
  histórico (D-032).
- Dominio del sitio: `rpvai.com` (sin cambio).
- Enlazar Vercel al repo `Cconkers/rpvai` si el dashboard aún muestra el nombre viejo.

### Motivo

Un solo nombre canónico evita clones y secrets apuntando a una URL obsoleta.

### Consecuencias

- D-032 sigue vigente en todo lo demás (no portar la SPA, marca personal, `develop`).
- `origin` local debe usar el slug nuevo.

### Relacionado

- D-032, D-033
- [`PRODUCT.md`](./PRODUCT.md) — Persona

---

## Cómo añadir una nueva decisión

### Cuándo registrar

Registra una decisión nueva cuando:

- Cambia una decisión arquitectónica.
- Se establece una regla visual global.
- Se elimina una alternativa importante.
- Se toma una decisión de producto que afectará a futuras specs.
- Alguien sin tu contexto podría razonablemente decidir lo contrario.

No registres: bugs, padding puntual, ni lo que ya cubre una decisión vigente.

### Formato

Cada decisión debe tener ID incremental (`D-029`, …; los IDs no se reutilizan), fecha,
estado, área de la taxonomía cerrada, contexto, decisión, motivo, consecuencias y
relacionados.

Plantilla:

```md
## D-0XX — Título en una línea

**Fecha:** mes año
**Estado:** Accepted
**Área:** Architecture

### Contexto
Qué situación obligó a decidir.

### Decisión
Qué se decidió, en términos accionables.

### Motivo
Por qué esta opción y no otra.

### Consecuencias
Qué implica, incluido lo incómodo. Si es reversible, bajo qué condiciones.

### Relacionado
- `docs/DESIGN_SYSTEM.md`
- D-0YY
```

### Sustituir una decisión

1. **No edites ni borres** la antigua.
2. Añade una nueva con `**Sustituye a:** D-0XX`.
3. Marca la antigua `Superseded` y `**Sustituida por:** D-0YY`.
4. Deja intacto el resto de la antigua.

---

*Última actualización: agosto 2026*
