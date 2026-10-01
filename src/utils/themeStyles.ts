import { ColorTheme, FontTheme, SpacingScale } from '../types/cv';

export interface ThemeColors {
  primary: string; // text-color class or hex
  primaryBg: string;
  primaryLightBg: string;
  primaryBorder: string;
  badgeBg: string;
  badgeText: string;
  hex: string;
}

export const THEME_COLORS: Record<ColorTheme, ThemeColors> = {
  navy: {
    primary: 'text-blue-900',
    primaryBg: 'bg-blue-900',
    primaryLightBg: 'bg-blue-50',
    primaryBorder: 'border-blue-900',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-900',
    hex: '#1e3a8a',
  },
  slate: {
    primary: 'text-slate-900',
    primaryBg: 'bg-slate-900',
    primaryLightBg: 'bg-slate-100',
    primaryBorder: 'border-slate-800',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    hex: '#0f172a',
  },
  emerald: {
    primary: 'text-emerald-900',
    primaryBg: 'bg-emerald-900',
    primaryLightBg: 'bg-emerald-50',
    primaryBorder: 'border-emerald-800',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-900',
    hex: '#064e3b',
  },
  burgundy: {
    primary: 'text-rose-950',
    primaryBg: 'bg-rose-950',
    primaryLightBg: 'bg-rose-50',
    primaryBorder: 'border-rose-900',
    badgeBg: 'bg-rose-50',
    badgeText: 'text-rose-950',
    hex: '#4c0519',
  },
  indigo: {
    primary: 'text-indigo-900',
    primaryBg: 'bg-indigo-900',
    primaryLightBg: 'bg-indigo-50',
    primaryBorder: 'border-indigo-800',
    badgeBg: 'bg-indigo-50',
    badgeText: 'text-indigo-900',
    hex: '#312e81',
  },
  teal: {
    primary: 'text-teal-900',
    primaryBg: 'bg-teal-900',
    primaryLightBg: 'bg-teal-50',
    primaryBorder: 'border-teal-800',
    badgeBg: 'bg-teal-50',
    badgeText: 'text-teal-900',
    hex: '#134e4a',
  },
  charcoal: {
    primary: 'text-neutral-900',
    primaryBg: 'bg-neutral-900',
    primaryLightBg: 'bg-neutral-100',
    primaryBorder: 'border-neutral-800',
    badgeBg: 'bg-neutral-100',
    badgeText: 'text-neutral-900',
    hex: '#171717',
  },
  cobalt: {
    primary: 'text-blue-700',
    primaryBg: 'bg-blue-700',
    primaryLightBg: 'bg-blue-50',
    primaryBorder: 'border-blue-600',
    badgeBg: 'bg-blue-50',
    badgeText: 'text-blue-700',
    hex: '#1d4ed8',
  },
};

export const FONT_CLASSES: Record<FontTheme, string> = {
  sans: 'font-sans-main',
  serif: 'font-serif-main',
  display: 'font-display-main',
  classic: 'font-classic',
  mono: 'font-mono-main',
};

export const SPACING_CLASSES: Record<
  SpacingScale,
  {
    sectionGap: string;
    itemGap: string;
    lineHeight: string;
    padding: string;
  }
> = {
  compact: {
    sectionGap: 'space-y-3.5',
    itemGap: 'space-y-2',
    lineHeight: 'leading-snug',
    padding: 'p-7 sm:p-9',
  },
  standard: {
    sectionGap: 'space-y-5',
    itemGap: 'space-y-3',
    lineHeight: 'leading-relaxed',
    padding: 'p-8 sm:p-12',
  },
  generous: {
    sectionGap: 'space-y-7',
    itemGap: 'space-y-4',
    lineHeight: 'leading-loose',
    padding: 'p-10 sm:p-14',
  },
};
