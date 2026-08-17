export const site = {
  name: 'Rubén Palomo Viedma',
  shortName: 'Rubén Palomo',
  mark: 'RPV',
  tagline: 'Desarrollo web',
  email: 'rubenpv011992@gmail.com',
  whatsappUrl: 'https://wa.me/34722203003',
  ctaLabel: 'Cuéntame tu proyecto',
  availabilityLabel: 'Aceptando proyectos',
  heroHeadline: 'Webs serias con tecnología de primer nivel',
  heroSupport:
    'Interfaz impecable, stack moderno y calidad de estudio a un precio justo. Brief gratuito y propuesta en 48 horas.',
  heroTechLine: 'Astro · TypeScript · Tailwind · IA aplicada',
  ctaSecondaryLabel: 'Ver servicios',
  ctaSecondaryHref: '/#servicios',
  homeDescription:
    'Desarrollo web premium: frontend, UX/UI, integraciones, IA y datos. Stack moderno, calidad de estudio y propuesta en 48 horas.',
  githubUrl: 'https://github.com/Cconkers',
  linkedinUrl: 'https://www.linkedin.com/in/ruben-viedma-191a5913a',
} as const;

export const navLinks = [
  { label: 'Inicio', href: '/', section: null },
  { label: 'Trabajo', href: '/#trabajo', section: 'trabajo' },
  { label: 'Servicios', href: '/#servicios', section: 'servicios' },
  { label: 'Sobre mí', href: '/about', section: null },
  { label: 'Contacto', href: '/#contacto', section: 'contacto' },
] as const;

export type NavLink = (typeof navLinks)[number];
