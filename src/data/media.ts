export type CinematicClipId = 'hero' | 'code' | 'craft';

export interface CinematicClip {
  id: CinematicClipId;
  src: string;
  /** Secciones del home que activan este clip */
  sections: string[];
}

export const cinematicClips: CinematicClip[] = [
  {
    id: 'hero',
    src: '/video/hero.mp4',
    sections: ['hero'],
  },
  {
    id: 'code',
    src: '/video/code.mp4',
    sections: ['trabajo', 'servicios', 'como-trabajo'],
  },
  {
    id: 'craft',
    src: '/video/craft.mp4',
    sections: ['sobre-mi', 'contacto'],
  },
];

export function clipForSection(sectionId: string): CinematicClipId {
  for (const clip of cinematicClips) {
    if (clip.sections.includes(sectionId)) return clip.id;
  }
  return 'hero';
}
