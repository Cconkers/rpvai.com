/** Scroll reveals + header scroll state. Solo transform/opacity (D-009). */

const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initHeaderScroll(): void {
  const header = document.getElementById('site-header');
  if (!header) return;

  const threshold = 24;
  let ticking = false;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > threshold);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );

  update();
}

function initReveals(): void {
  const targets = document.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-stagger]');
  if (!targets.length) return;

  if (REDUCED_MOTION) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => observer.observe(el));
}

function initHeroEntrance(): void {
  const hero = document.querySelector('.hero');
  if (!hero || REDUCED_MOTION) {
    document.documentElement.classList.add('is-ready');
    return;
  }

  requestAnimationFrame(() => {
    document.documentElement.classList.add('is-ready');
  });
}

initHeaderScroll();
initReveals();
initHeroEntrance();
