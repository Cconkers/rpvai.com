# VISUAL_DIRECTION.md — Dirección artística

> **Documento:** Guía artística global de RPV. Define *cómo debe verse y sentirse* la marca.
> **Relación:** El *qué* y el *para quién* están en [`PRODUCT.md`](./PRODUCT.md). Los tokens y reglas
> reutilizables están en [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md). Este documento es el criterio
> estético del que se derivan esos tokens.

---

## 0. La regla que resume todo

**RPV no debe parecer ni una lavandería ni un clon de SaaS oscuro.**

Burbujas de Luz (cliente) es light mediterránea, violeta, rosa y burbujas. Esta web no
puede prestarle la identidad: un cliente que compare ambas tiene que ver dos productos
distintos y el mismo oficio.

Tampoco puede caer en los clichés de portfolio 2024–2026: glow púrpura "AI", cyan neón,
bento grid en todas partes, fondo negro con malla, o plantilla tipo Linear.

La estética debe sentirse:

**estudio editorial + producto preciso + humano cercano**

y nunca:

**LinkedIn azul + discoteca IA + agencia hinchada + CV corporativo + Burbujas**

Si una decisión visual es ambigua, la pregunta correcta es: *¿esto se parece más a un
estudio que entrega desarrollo web con cara y nombre, o a una plantilla / a la web del cliente?*
La primera respuesta siempre gana.

---

## 1. Referencias visuales

| Archivo | Qué define | Qué **no** es |
|---------|------------|---------------|
| [`/public/design/ruben-source.png`](../public/design/ruben-source.png) | Cara, gesto, camisa de cuadros, temperatura de piel | No es el asset final de UI. No se usa el cuadrado azul ni el sparkle. |
| [`src/assets/images/ruben-source.png`](../src/assets/images/ruben-source.png) | Misma fuente, para recorte vía `astro:assets` | El recorte circular vive en una SPEC visual (D-014) |

Hasta que existan un design board y capturas de Burbujas, estas dos rutas son la única
referencia fotográfica. Las capturas de trabajo se añadirán en SPEC-005.

Regla: las imágenes de `public/design/` son **referencia**, no UI, salvo que una SPEC lo
indique. La foto de Rubén **sí** entra en la UI, pero **después de recortar** el marco y
el sparkle.

---

## 2. Dirección visual

### Estudio claro (light studio)

Superficies de **papel cálido / off-white**, no blanco clínico ni negro de dashboard.

- El fondo por defecto es claro. Siempre, en el MVP (D-005).
- No hay modo oscuro en esta fase.
- El negro/tinta es **color de texto y de botón primario**, no un bloque a ancho completo.
- Un hero oscuro tipo "AI startup" es señal de desviación.

### Aire y respiración

El espacio vacío es jerarquía. Las webs de cliente que Rubén entrega respiran; la suya
también.

- El blanco (papel) es un elemento de diseño.
- Antes de añadir un bento, un glow o un patrón de puntos, comprobar si el aire hacía
  mejor trabajo.
- En desktop el contenido tiene ancho máximo; el aire crece a los lados.

### Craft contenido

La marca es precisa; la interfaz es tranquila. El carácter vive en tipografía (serif de
display + sans de UI), en el retrato y en screenshots reales con marco de browser. No en
interacciones ruidosas.

### Cobre, no cian

El acento de marca es **cobre / terracota** (calor humano, distinto del violeta cliente y
del azul LinkedIn de la foto fuente). El azul de la camisa **no** se convierte en color
primario de la web: como mucho, un anillo sutil alrededor del retrato.

---

## 3. Composición

- **Jerarquía en tres niveles por sección:** titular, apoyo, acción. Un cuarto nivel
  significa que la sección hace demasiado.
- **Una idea por sección.** Cada bloque responde a una pregunta de [`PRODUCT.md`](./PRODUCT.md).
- **Alineación a la izquierda** para texto largo; centrado solo en titulares de sección
  cortos o en el retrato móvil.
- **Foto en el hero:** móvil, retrato arriba o junto al titular, visible sin scroll junto
  al CTA. Desktop, retrato al lado del bloque de texto, no como fondo a pantalla completa.
- **Screenshots de trabajo** con marco de browser sencillo. Nada de mockups 3D isométricos
  de stock.
- **Retícula flexible:** 1 columna en móvil; 2–3 en desktop. No forzar bento.

---

## 4. Retrato

El retrato es el activo de confianza. Reglas:

- Recorte **circular** (o casi) del rostro y hombros.
- **Eliminar** el cuadrado azul sólido y el sparkle de cuatro puntas. Se leen como avatar
  generado.
- Fondo de la UI = papel de marca, o un anillo de 2–3 px en token de borde / cobre suave.
- Sin filtros, sin duotono, sin glow.
- `alt` descriptivo (persona, no "logo"). Dimensiones fijas para no provocar CLS.
- No usarlo como favicon sin una variante simplificada (no existe aún; no fabricarla
  recortando mal).
- No usarlo como Open Graph sin una composición con fondo sólido (las plataformas
  aplanan transparencias sobre negro).

---

## 5. Fotografía de trabajo

- Capturas reales de proyectos (Burbujas primero).
- Corrección natural, saturación moderada. Sin LUTs de "tech".
- El contenido manda; la captura acompaña. Si compiten, la captura se atenúa.
- Ningún dato de negocio existe **solo** en una imagen.

---

## 6. Gradientes y decoración

- Lavados muy suaves de papel a cobre-50, si acaso. No rampas saturadas.
- **Prohibido:** partículas, burbujas, mallas, noise pesado, glassmorphism oscuro, bloom.
- Un motivo geométrico mínimo (línea, filete, estrella de 4 puntas **solo si se rediseña**
  como marca y no se copia el sparkle de la foto fuente) exige decisión nueva.
- El logo/wordmark **RPV** o "Rubén Palomo" en texto real, no como bitmap.

---

## 7. Presupuesto de saturación

**El retrato y un CTA de cobre/tinta por vista consumen el presupuesto.**

Todo lo demás se mantiene en papel, tinta y bordes suaves. Si servicios, chips y hero gritan
a la vez, la página parece un curso vendido, no un estudio.

Corolarios:

- Un elemento saturado por zona visual, como máximo.
- Los "desde" de precio pueden usar el display serif, no un color de oferta chillón.
- Si el retrato y un bloque saturado compiten, el bloque cede.

---

## 8. Relación entre contenido e imagen

- La imagen acompaña; el contenido manda.
- El retrato no lleva texto encima.
- Las imágenes decorativas llevan `alt=""` y `aria-hidden`; las informativas describen.
- Servicios, propuesta y CTA van siempre en texto real.

---

## 9. Tratamiento de espacios vacíos

- El vacío es intencionado. No se rellena con logos de tecnologías.
- El espacio vertical entre secciones es amplio y consistente.
- Un vacío es correcto si al eliminarlo la página se lee peor.

---

## 10. Responsive

La identidad no cambia de tamaño; cambia la composición.

| | Mobile | Tablet | Desktop |
|---|--------|--------|---------|
| Retrato | Visible en el primer viewport, tamaño contenido | Medio | Al lado del titular, no gigante |
| Servicios | Una columna | 1–2 | 2–3 columnas |
| Trabajo | Una card apilada | 2 | 3, Burbujas primero |
| Aire | Reducido pero presente | Intermedio | Generoso |
| Nav | Colapsada, accesible | Horizontal si cabe | Horizontal |

Reglas transversales:

- **Móvil primero.**
- Lo decorativo se sacrifica antes que el contenido.
- En móvil el hero muestra titular, retrato y CTA **sin scroll**.
- Ningún texto de cuerpo por debajo de 16px.
- Sin scroll horizontal. Suelo 320px.

---

## 11. Anti-patrones

La aparición de cualquiera indica desviación:

- Paleta o burbujas de Burbujas de Luz
- Fondos negros a ancho completo, neón, bloom, glow saturado
- Azul corporativo LinkedIn como color dominante
- Foto fuente con marco azul y sparkle
- Glassmorphism oscuro, mallas, partículas, bento recargado
- Tipografía de moda genérica sin serif de display (o, al contrario, script "creativo")
- Animación continua que no responde a intención
- Iconos de Angular/Jenkins/Jira en el hero
- Precios tachados tipo infomercial
- Chat widget en el MVP

---

## 12. Cómo validar una pantalla

Antes de considerar terminada una vista:

1. ¿El fondo dominante es papel claro?
2. ¿Se distingue de Burbujas en cinco segundos?
3. ¿El retrato está recortado, sin marco ni sparkle?
4. ¿Hay como máximo un acento saturado por zona?
5. ¿Se lee todo el texto con contraste verificado?
6. ¿Titular + foto + CTA caben en el primer viewport móvil?
7. ¿Sigue leyéndose con movimiento desactivado?
8. Entornando los ojos: ¿parece un estudio humano o una plantilla / un CV?

Si la 2 o la 8 fallan, ninguna de las demás compensa.

---

*Última actualización: agosto 2026*
