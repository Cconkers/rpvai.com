# PRODUCT.md — RPV (Rubén Palomo Viedma)

> **Producto:** Web personal de Rubén Palomo Viedma (RPV) — escaparate de servicios de desarrollo web
> **Ubicación:** España, remoto (sin ciudad destacada)
> **Documento:** Definición de producto desde negocio y usuario. Fuente de verdad para *qué* construimos y *para quién*.

Este documento **no** describe arquitectura técnica (ver [`PLANNING.md`](../PLANNING.md)), ni estética
(ver [`VISUAL_DIRECTION.md`](./VISUAL_DIRECTION.md)), ni reglas visuales reutilizables
(ver [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md)).

---

## Product Vision

RPV es la web personal de Rubén Palomo Viedma. No es un CV online ni una agencia. Es el
**escaparate de un freelancer de desarrollo web**: frontend completo, mejora UX/UI,
integraciones con APIs e IA, y webs con datos (el backend y la base de datos se abordan
con apoyo de IA; el núcleo de oficio sigue siendo frontend). El trabajo se hace con el
mismo flujo spec-driven y agentes que ya se usó en clientes reales (Burbujas de Luz).

Quien llega no debe preguntarse si Rubén "busca empleo de Angular". Debe entender, en
segundos, que puede encargar **desarrollo web de verdad** — una interfaz, una integración,
una mejora de producto o una web con persistencia — cómo se trabaja y cómo empezar la
conversación.

La experiencia debe sentirse **craft editorial**: seria, humana y actual. Distinta de
cualquier web de cliente. La foto real ancla confianza; el trabajo publicado demuestra
oficio; los servicios convierten.

---

## Persona

Datos de perfil para copy y schema. Esta web **traduce** esto a valor de cliente; no
lo vuelca como ficha de LinkedIn (D-030).

| Campo | Valor | Estado |
|-------|--------|--------|
| Nombre público | Rubén Palomo Viedma | Confirmado (CV) |
| Marca corta | RPV | Confirmado |
| Nombre de repo (local) | RPVAI_landing | Carpeta de trabajo |
| Repo público | [Cconkers/rpvai](https://github.com/Cconkers/rpvai) | Confirmado (D-034; antes `rpvai.com`, D-032) |
| Dominio | `rpvai.com` | Confirmado como destino; preview Vercel antigua 404 |
| GitHub | [github.com/Cconkers](https://github.com/Cconkers) | Confirmado (perfil) |
| LinkedIn | [ruben-viedma-191a5913a](https://www.linkedin.com/in/ruben-viedma-191a5913a) | Confirmado (perfil GitHub) |
| Oferta que se vende | Desarrollo web: frontend, UX/UI, APIs, integraciones IA, webs con datos | Confirmado (D-029) |
| Crédito profesional | Frontend ~5 años. Hoy ATMIRA / BME (fintech). Antes referente frontend en Bosonit / Elliot Cloud. Origen: bootcamp Factoría F5 & Fundación Don Bosco (Portal del Donante, 2021). | Confirmado (CV); se nombra sin capturas ni datos internos (D-016) |
| Stack de empleo | Angular 16–20+, RxJS, Signals, TypeScript, testing, CI/CD | Confirmado; **no es el headline** |
| Stack de oferta freelance | Frontend (Angular en empleo; Astro en sitios de contenido), APIs, IA, datos con apoyo de IA | Confirmado |
| React | Nivel básico | Confirmado; no se vende como especialidad |
| Fullstack | Se ofrece web con base de datos; el backend se apoya en IA. Honestidad: núcleo frontend, no se vende como senior backend (D-029) | Confirmado |
| Idiomas | Español; inglés B2 | Confirmado |
| Ubicación | España, remoto | Confirmado; no destacar ciudad (D-017) |
| Email | rubenpv011992@gmail.com | Confirmado |
| Teléfono | +34 722 20 30 03 | Confirmado |
| WhatsApp | mismo móvil (`34722203003`) | Confirmado; CTA primario (D-019) |
| Foto | [`src/assets/images/ruben-source.png`](../src/assets/images/ruben-source.png) | Fuente recortada en UI (SPEC-003, D-014) |
| LinkedIn / GitHub | Ver tabla arriba | Confirmado |
| Curiosidades (2–3) | Candidatas del perfil GitHub: curiosidad, proactividad, ganas de seguir aprendiendo frontend | `[PLACEHOLDER]` hasta que las elija para About |
| URL pública de Burbujas | — | `[PLACEHOLDER]` |
| Otras webs | — | `[PLACEHOLDER]` |
| Tarifas finales | Propuesta por proyecto; suelo orientativo abajo | `[PLACEHOLDER]` hasta confirmación (D-031) |
| Publicar teléfono en claro vs solo deep-link WhatsApp | — | `[PLACEHOLDER]` |

Año de nacimiento implícito en el correo (`011992`) **no se usa** en la web.

GitHub perfil indica ciudad Sevilla; **no se destaca en la web** (D-017).

---

## Predecesor (no se porta)

El sitio vivo debía ser el repo ahora llamado [Cconkers/rpvai](https://github.com/Cconkers/rpvai)
(antes `Cconkers/rpvai.com`; D-032, D-034). Rama `develop`, Angular 19, Tailwind 3, Firebase,
i18n, auth, calendario, chatbot Lottie. Título: «RPVAI · Consultora Web & IA». Preview Vercel
`landing-page-rpv.vercel.app`: 404.

Este proyecto **sustituye** ese código. Se conservan repo GitHub, dominio `rpvai.com` y
rama `develop`. No se reutiliza la SPA ni el tono de consultora. Detalle en D-032.

---

## Target Users

No hay investigación formal. Los perfiles se describen por **situación y necesidad**.

| Perfil | Situación | Qué necesita de la web |
|--------|-----------|------------------------|
| Pyme / negocio local | Necesita web, mejoras o conectar herramientas | Ver un ejemplo real, servicios claros, un WhatsApp |
| Producto digital ya en marcha | La UI se queda corta, o hay que enganchar APIs / IA | Entender que Rubén entra a frontend, UX y conexiones |
| Quien necesita datos | Catálogo, reservas, panel, persistencia | Web con base de datos, sin fingir agencia fullstack |
| Quien ya vio Burbujas | Llega por el trabajo publicado | Entender que Rubén es el autor y que el oficio va más allá de esa web |
| Decisor con poco tiempo | Móvil, 30 segundos | Promesa, prueba, CTA |
| Perfil técnico curioso | Evalúa seriedad frontend | Stack y proceso, sin jerga de CV |

Un rasgo transversal: **muchos no saben encargar desarrollo**. Esta web debe eliminar la
incertidumbre (qué servicios, cómo se acota, cómo se empieza) antes de que se convierta
en "ya lo miro".

Fuera de audiencia primaria: reclutadores que buscan un Angular specialist. Pueden
encontrar el crédito profesional, pero no se diseña para ellos.

---

## Business Goal

En orden de prioridad:

1. **Convertir visita en conversación de encargo** (WhatsApp o email).
2. **Dejar claros los servicios:** frontend, UX/UI, APIs, IA, webs con datos.
3. **Demostrar oficio** con un case study real (Burbujas de Luz) y con esta propia web.
4. **Anclar confianza** con nombre, cara, trayectoria (BME / Bosonit) y proceso spec-driven.
5. **Ser honesto con el fullstack:** se aceptan proyectos con base de datos e IA; no se
   vende un equipo backend senior.

---

## Primary User Goals

1. **¿Qué hace este tío por mí?** Desarrollo web: interfaz, integraciones, IA, datos.
2. **¿Tiene pruebas?** Burbujas primero; huecos para dos más.
3. **¿Cuánto me cuesta?** Alcance cerrado + propuesta en 48 h; suelo orientativo si se muestra.
4. **¿Cómo trabaja?** Spec-driven + agentes, en beneficio (velocidad y calidad), no tech-flex.
5. **¿Quién es?** Humano, foto, crédito breve.
6. **¿Cómo le hablo?** WhatsApp / email y qué enviar en el brief.

---

## Primary CTA

**CTA primario: "Cuéntame tu proyecto"** → WhatsApp (`https://wa.me/34722203003`).

Razonamiento: el cliente típico es pyme o profesional en España. WhatsApp es la vía de
menor fricción. No hay nada que comprar en la web; forzar un formulario con backend
inventaría un producto que el MVP no sostiene (D-011).

- **CTA secundario:** email `rubenpv011992@gmail.com`.
- **CTA de apoyo:** ver trabajo (Burbujas) y ver servicios.
- Chip persistente de disponibilidad: "Aceptando proyectos".

Esta decisión queda registrada en [`DECISIONS.md`](./DECISIONS.md) D-019 y no debe
cambiarse sin una decisión nueva.

---

## Offer

Se venden **servicios de desarrollo web por proyecto**, no packs de landings ni €/hora
(D-029, D-010 superseded). Cinco líneas. El alcance concreto y el precio salen del brief
(propuesta en 48 h). Un suelo orientativo es `[PLACEHOLDER]` hasta confirmación (D-031).

| Servicio | Qué incluye | Qué no promete |
|----------|-------------|----------------|
| Frontend | Interfaces nuevas o evolución de las existentes (accesibles, rápidas, mantenibles). Angular es capacidad real de empleo; Astro u otros según el proyecto. | No es "solo maquetar un diseño" sin criterio |
| UX/UI | Mejora de flujos, jerarquía, componentes, responsive y claridad. | No es un estudio de diseño gráfico de marca desde cero |
| Integraciones y APIs | Conectar la web con APIs propias o de terceros (pagos, CRM, reservas, lo que el negocio use). | No se asume un SLA de infra ajena |
| IA aplicada | Integraciones con trabajo que hacer: asistentes, automatización, captación, generación acotada. Spec + agentes en el propio proceso de entrega. | No un chatbot genérico de adorno |
| Web con datos | Frontend + persistencia (base de datos, auth básico, CRUD). Backend y modelo de datos **con apoyo de IA**; el núcleo de oficio es frontend. | No se vende como equipo fullstack senior ni como DevOps |

Brief gratuito. No tarifas horarias. El "desde" (si se muestra) permite un suelo para
encargos pequeños de frontend/UX; una API o una web con datos se cotizan a medida.

La demo de IA **en esta misma web** no forma parte del MVP; es Grupo E del
[`BACKLOG.md`](./specs/BACKLOG.md).

---

## Flagship case study

**Burbujas de Luz** — web de lavandería autoservicio. Primer trabajo publicado como
prueba de oficio freelance (Astro, spec-driven, contenido, SEO local). Es **un** proyecto,
no la definición de lo que se vende.

Borrador histórico: [`docs/content/projects/`](./content/projects/). Contenido vivo:
[`src/content/projects/`](../src/content/projects/) (SPEC-005).
- URL de producción: `[PLACEHOLDER]`
- Capturas: pendientes (producción o staging)
- ATMIRA/BME y Bosonit **no son case studies** (NDA / producto interno). Son crédito de seriedad en About.

---

## Brand Personality

La marca **debe** sentirse:

humana · precisa · craft · editorial · actual · cercana · seria sin ser corporativa · rápida

La marca **no** debe sentirse:

- clon de Linear / Vercel
- glow púrpura "AI", cyan neón, discoteca
- look de Burbujas (violeta, rosa, burbujas, mediterráneo pastel)
- CV / reclutamiento
- agencia hinchada o plantilla ThemeForest
- brutalismo que asusta a una pyme

| En lugar de | Usar |
|-------------|------|
| "Angular Specialist" | "Desarrollo web: interfaz, APIs, IA y datos" |
| Lista de herramientas | Servicios claros y un case study |
| "Hago landings" | "Hago el desarrollo que tu producto necesita" |
| Chatbot genérico | Una integración con trabajo que hacer |
| Foto con marco y sparkle | Retrato recortado sobre la UI |
| Azul LinkedIn o violeta cliente | Tinta + cobre de estudio (ver dirección visual) |

El detalle visual vive en [`VISUAL_DIRECTION.md`](./VISUAL_DIRECTION.md).

---

## Product Principles

1. **Claridad antes que espectáculo.** Si una animación compite con el CTA, gana el CTA.
2. **Probar con trabajo, no con adjectives.** Burbujas manda sobre "apasionado del frontend".
3. **Traducir el CV.** BME y Bosonit son confianza; Jira no entra en la página.
4. **Honestidad en el dato.** Precios, URLs y curiosidades sin confirmar van como `[PLACEHOLDER]` (D-009).
5. **Móvil primero.** El decisor llega al teléfono.
6. **Accesible por defecto.** Contraste y teclado son requisito.
7. **La propia web es la demo de rendimiento.** Lighthouse flojo contradice la oferta.
8. **Spec-driven como ventaja comercial.** Se explica como "alcance cerrado y entrega predecible", no como methodology flex.
9. **Sin funcionalidad especulativa.** No se construye el laboratorio de IA ni el blog hasta que haya SPEC.

---

## Information architecture

Rutas del MVP:

| Ruta | Función |
|------|---------|
| `/` | Home: hero, trabajo, servicios, cómo trabajo, about corto, contacto |
| `/work/[slug]` | Case study. Primero `burbujas-de-luz` |
| `/about` | Profundiza persona y trayectoria, sin convertirse en CV |

Orden de la home:

1. Hero — nombre, una línea, chip de disponibilidad, foto, CTA WhatsApp
2. Trabajo — Burbujas primero; dos huecos placeholder
3. Servicios — las líneas de oferta (frontend, UX/UI, APIs/IA, web con datos)
4. Cómo trabajo — spec + agentes en beneficio de cliente
5. Sobre mí — humano + crédito BME/Bosonit/F5
6. Contacto — WhatsApp, email, qué pedir en el brief

Más adelante (no MVP): `/lab`, `/now`, i18n `/en`.

---

## Non-goals

Fuera de alcance en el MVP. Cada punto requiere una SPEC nueva y una decisión registrada:

- Blog o CMS editorial
- Tienda, pagos, área cliente, autenticación
- Demo de IA / chatbot en esta web
- i18n inglés
- Modo oscuro
- Angular como **único** headline o página "busco empleo"
- Tarifas horarias o comparador tipo agencia de 8 k€
- Packs de "landing / landing+IA" como producto estrella (D-029)
- Schema `LocalBusiness` o ciudad en hero
- Formulario con backend / Resend
- Calendly
- PWA, notificaciones
- Copiar el design system de Burbujas
- Portar la SPA Angular antigua (auth, Firebase, calendario, chatbot, Lottie, i18n, modo oscuro) (D-032)
- Revivir el tono de «consultora / nosotros» del sitio anterior; esta marca es personal

---

## Datos pendientes de confirmación

Los datos sin confirmar se tratan como `[PLACEHOLDER: ...]` (D-009). Los confirmados están
en la tabla de Persona.

### Pendientes

| Dato | Estado |
|------|--------|
| Precios / suelo "desde" | `[PLACEHOLDER]` — propuesta por proyecto (D-031) |
| URL pública de Burbujas de Luz | Sin confirmar |
| Capturas de Burbujas | Pendientes |
| Proyectos 2 y 3 | Sin confirmar |
| LinkedIn, GitHub, otras redes | GitHub y LinkedIn confirmados; otras redes no |
| 2–3 curiosidades para About | Candidatas del perfil; falta elegir copy |
| Teléfono visible vs solo WhatsApp | Sin confirmar |
| Dominio público | Destino `rpvai.com` (D-032). Preview `landing-page-rpv.vercel.app` caída |

---

*Última actualización: agosto 2026*
