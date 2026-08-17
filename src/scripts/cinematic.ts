/** Crossfade de vídeos HD según sección visible. Solo en desktop sin reduced-motion. */

import { clipForSection } from '../data/media';

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DESKTOP = window.matchMedia('(min-width: 768px)').matches;

function initCinematic(): void {
  const root = document.querySelector('[data-cinematic-root]');
  if (!root || REDUCED_MOTION) return;

  const layers = new Map<string, { layer: HTMLElement; video: HTMLVideoElement }>();

  root.querySelectorAll<HTMLElement>('[data-cinematic-layer]').forEach((layerEl) => {
    const id = layerEl.dataset.cinematicLayer;
    const video = layerEl.querySelector<HTMLVideoElement>('.cinematic__video');
    if (!id || !video) return;
    layers.set(id, { layer: layerEl, video });
  });

  if (!layers.size) return;

  const loadVideo = (video: HTMLVideoElement): void => {
    const src = video.dataset.cinematicSrc;
    if (!src || video.querySelector('source')) return;
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.load();
  };

  const playVideo = async (video: HTMLVideoElement): Promise<void> => {
    try {
      if (video.paused) await video.play();
    } catch {
      /* autoplay bloqueado — el poster/wash cubre */
    }
  };

  const pauseOthers = (activeId: string): void => {
    layers.forEach(({ video }, id) => {
      if (id !== activeId && !video.paused) video.pause();
    });
  };

  let activeClip = 'hero';

  const setActiveClip = (clipId: string): void => {
    if (clipId === activeClip) return;
    activeClip = clipId;

    layers.forEach(({ layer, video }, id) => {
      const isActive = id === clipId;
      layer.classList.toggle('is-active', isActive);
      if (isActive) {
        loadVideo(video);
        void playVideo(video);
      }
    });

    pauseOthers(clipId);
  };

  const sections = document.querySelectorAll<HTMLElement>('[data-cinematic-section]');
  if (!sections.length) return;

  const heroVideo = layers.get('hero')?.video;
  if (heroVideo) {
    void playVideo(heroVideo);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;

      const sectionId = (visible[0].target as HTMLElement).dataset.cinematicSection;
      if (!sectionId) return;

      setActiveClip(clipForSection(sectionId));
    },
    { threshold: [0.15, 0.35, 0.55], rootMargin: '-20% 0px -20% 0px' },
  );

  sections.forEach((section) => observer.observe(section));

  /* Parallax suave en el clip activo */
  let parallaxTicking = false;

  const updateParallax = (): void => {
    const active = layers.get(activeClip);
    if (!active) {
      parallaxTicking = false;
      return;
    }

    const scrollRatio = Math.min(window.scrollY / (window.innerHeight * 1.5), 1);
    const scale = 1.06 + scrollRatio * 0.04;
    active.video.style.transform = `scale(${scale})`;
    parallaxTicking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (parallaxTicking || REDUCED_MOTION) return;
      if (!DESKTOP) return;
      parallaxTicking = true;
      requestAnimationFrame(updateParallax);
    },
    { passive: true },
  );
}

initCinematic();
