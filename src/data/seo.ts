import { site } from './site';

export const siteUrl = 'https://rpvai.com';

export function canonicalUrl(pathname: string): string {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return new URL(path, siteUrl).href;
}

export function jsonLdGraph() {
  const personId = `${siteUrl}/#person`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: site.name,
        url: siteUrl,
        email: site.email,
        jobTitle: 'Desarrollador web',
        sameAs: [site.githubUrl, site.linkedinUrl],
        knowsLanguage: ['es', 'en'],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'ES',
        },
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${siteUrl}/#service`,
        name: `${site.mark} — ${site.tagline}`,
        url: siteUrl,
        description: site.homeDescription,
        areaServed: {
          '@type': 'Country',
          name: 'Spain',
        },
        founder: { '@id': personId },
        email: site.email,
      },
    ],
  };
}
