export const site = {
  name: 'Rubén Palomo Viedma',
  shortName: 'Rubén Palomo',
  mark: 'RPV',
  tagline: 'Desarrollo web',
  email: 'rubenpv011992@gmail.com',
  whatsappUrl: 'https://wa.me/34722203003',
  ctaLabel: 'Cuéntame tu proyecto',
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
