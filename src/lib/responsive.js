// ─── Shared responsive layout tokens ─────────────────────────────────────────
// Single source of truth for containers, section spacing, typography, and grids.
// Breakpoints: default → sm → md → lg → xl → 2xl → 3xl (1920px) → 4xl (2560px)

export const containers = {
  /** Default page width — nav, footer, most sections */
  default:
    'mx-auto w-full max-w-7xl px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 2xl:px-12 3xl:max-w-[1680px] 3xl:px-14 4xl:max-w-[2200px] 4xl:px-16',
  /** Forms, FAQs, narrow content */
  narrow:
    'mx-auto w-full max-w-3xl px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-4xl xl:px-10 3xl:max-w-5xl 3xl:px-12 4xl:max-w-6xl',
  /** Home hero and large centered headlines */
  hero:
    'mx-auto w-full max-w-4xl px-4 sm:px-5 md:px-6 lg:px-8 xl:max-w-5xl xl:px-10 3xl:max-w-6xl 3xl:px-12 4xl:max-w-7xl 4xl:px-16',
  /** Contact page — between narrow and default */
  medium:
    'mx-auto w-full max-w-5xl px-4 sm:px-5 md:px-6 lg:px-8 xl:px-10 3xl:max-w-[1100px] 3xl:px-12 4xl:max-w-[1280px]',
};

export const sections = {
  default: 'py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 3xl:py-28 4xl:py-32',
  compact: 'py-10 sm:py-12 md:py-14 lg:py-16 xl:py-20 3xl:py-24',
};

export const typography = {
  sectionTitle:
    'font-display font-bold text-[var(--color-text-heading)] leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 3xl:text-6xl 4xl:text-7xl',
  pageTitle:
    'font-display font-bold text-[var(--color-text-heading)] leading-tight text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 3xl:text-7xl 4xl:text-8xl',
  heroTitle:
    'font-display font-bold text-[var(--color-text-heading)] leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 3xl:text-8xl 4xl:text-9xl',
  subsectionTitle:
    'font-display font-bold text-[var(--color-text-heading)] text-xl sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl 3xl:text-5xl',
  body:
    'text-[var(--color-text-muted)] text-sm sm:text-base md:text-[17px] lg:text-lg xl:text-xl 3xl:text-2xl leading-[1.7]',
  bodyCenter:
    'text-[var(--color-text-muted)] text-sm sm:text-base md:text-[17px] lg:text-lg xl:text-xl 3xl:text-2xl leading-[1.7] max-w-2xl sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 3xl:max-w-5xl mx-auto',
};

export const grids = {
  gap: 'gap-4 sm:gap-5 md:gap-5 lg:gap-6 xl:gap-6 3xl:gap-8 4xl:gap-10',
  split: 'grid grid-cols-1 lg:grid-cols-2',
  cards2: 'grid grid-cols-1 sm:grid-cols-2',
  cards3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  cards4: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  footer: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
};

export const layout = {
  mainOffset: 'pt-14 sm:pt-16',
  navHeight: 'h-14 sm:h-16',
  mobileMenuTop: 'top-14 sm:top-16',
};
