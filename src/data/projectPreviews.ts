import burbujasHero from '../assets/images/projects/burbujas-hero.png';
import type { ImageMetadata } from 'astro';

/** Capturas reales por slug de proyecto (astro:assets). */
export const projectPreviewImages: Record<string, ImageMetadata> = {
  'burbujas-de-luz': burbujasHero,
};

export function previewForSlug(slug: string): ImageMetadata | undefined {
  return projectPreviewImages[slug];
}
