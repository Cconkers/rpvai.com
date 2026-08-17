import { site } from './site';

export const legal = {
  holder: site.name,
  domain: 'rpvai.com',
  email: site.email,
  whatsappUrl: site.whatsappUrl,
  taxId: '[PLACEHOLDER: NIF/CIF — no publicar un número inventado]',
  address: '[PLACEHOLDER: domicilio fiscal — no se destaca ciudad en la web]',
  hosting: 'Vercel',
} as const;
