import { site } from './site';

export const contactLead =
  'Brief gratuito. Te devuelvo una propuesta en 48 horas: alcance, plazos y precio por proyecto.';

export const briefItems = [
  {
    title: 'Negocio',
    body: 'A qué te dedicas y para quién es el producto o la web.',
  },
  {
    title: 'Objetivo',
    body: 'Qué tiene que pasar cuando esto esté en el aire (encargos, claridad, una integración…).',
  },
  {
    title: 'Referencias',
    body: 'Sitios o herramientas que te gusten, o con las que ya trabajas.',
  },
  {
    title: 'Plazo',
    body: 'Cuándo lo necesitas y si hay una fecha dura.',
  },
] as const;

const briefTemplate = [
  'Hola Rubén, te cuento el proyecto:',
  '',
  '- Negocio: ',
  '- Objetivo: ',
  '- Referencias: ',
  '- Plazo: ',
].join('\n');

export const whatsappHref = `${site.whatsappUrl}?text=${encodeURIComponent(briefTemplate)}`;

export const mailtoHref = `mailto:${site.email}?subject=${encodeURIComponent(
  'Brief de proyecto',
)}&body=${encodeURIComponent(briefTemplate)}`;

export const emailCtaLabel = 'Escribir un email';
