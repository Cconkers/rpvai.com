import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { canonicalUrl } from '../data/seo';

export const GET: APIRoute = async () => {
  const staticPaths = ['/', '/about/', '/aviso-legal/', '/privacidad/'];
  const projects = await getCollection('projects', ({ data }) => !data.placeholder);
  const projectPaths = projects.map((project) => `/work/${project.data.slug}/`);
  const urls = [...staticPaths, ...projectPaths].map((path) => canonicalUrl(path));

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc></url>`).join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
