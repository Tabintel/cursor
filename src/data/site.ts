export interface SiteLink {
  label: string
  href: string
}

export type BrandPresetKey = 'primary' | 'secondary'

export interface BrandPalette {
  background: string
  card?: string
  foreground: string
  muted: string
  mutedForeground?: string
  border: string
  accent: string
  accentForeground: string
  accent2?: string
  accent2Foreground?: string
  input?: string
  sidebar?: string
  ring: string
  sidebarActiveBg: string
  sidebarActiveText: string
}

export interface BrandConfig {
  light: BrandPalette
  dark: BrandPalette
}

export interface OgImageConfig {
  /** Background gradient start color (hex). Defaults to dark background from brand. */
  backgroundStart?: string
  /** Background gradient end color (hex). Defaults to dark muted from brand. */
  backgroundEnd?: string
  /** Accent color for top bar and decorative orbs (hex). Defaults to dark accent from brand. */
  accent?: string
  /** Title text color (hex). Defaults to dark foreground from brand. */
  titleColor?: string
  /** Description text color (hex). */
  descriptionColor?: string
  /** Group label text color (hex). Defaults to accent. */
  groupColor?: string
  /** Domain text shown in the bottom bar (e.g. "docs.example.com"). Defaults to THALLY_SITE_URL hostname. */
  domain?: string
  /** Logo text displayed in the bottom bar. Defaults to site name. */
  logoText?: string
  /** Google Font family for the title. Defaults to "Inter". */
  fontFamily?: string
  /** Google Font weight for the title. Defaults to "700". */
  fontWeight?: string
}

export interface AnalyticsConfig {
  /** Google Analytics measurement ID (e.g. "G-XXXXXXXXXX"). */
  googleAnalyticsId?: string
  /** Plausible domain (e.g. "docs.example.com"). */
  plausibleDomain?: string
  /** Plausible script URL. Defaults to "https://plausible.io/js/script.js". */
  plausibleScriptUrl?: string
  /** PostHog project API key. */
  posthogKey?: string
  /** PostHog API host. Defaults to "https://us.i.posthog.com". */
  posthogHost?: string
}

export interface DocVersion {
  /** Version label displayed in the switcher (e.g. "v2.0", "Latest"). */
  label: string
  /** URL for this version. Use "/" for the current site, or a full URL for older versions hosted elsewhere. */
  href: string
  /** Whether this is the currently active version. Exactly one should be true. */
  current?: boolean
}

export interface SiteConfig {
  name: string
  description: string
  repoUrl: string
  links: Array<SiteLink>
  brand: BrandConfig
  brandPreset: BrandPresetKey
  brandPresets: Record<BrandPresetKey, BrandConfig>
  /** Configuration for dynamic OG image generation. All fields are optional and fall back to brand colors. */
  ogImage?: OgImageConfig
  /** Analytics provider configuration. Leave undefined to disable analytics. */
  analytics?: AnalyticsConfig
  /** Doc versions for the version switcher. Leave undefined or empty to hide the switcher. */
  versions?: Array<DocVersion>
}

const brandPresets: Record<BrandPresetKey, BrandConfig> = {
  // Cursor-inspired neutral surfaces based on the current public docs site.
  primary: {
    light: {
      background: '#F7F7F4',
      // The docs handoff uses the page surface for cards; hierarchy comes from
      // hairline borders rather than white tiles or elevation.
      card: '#FFFFFF',
      foreground: '#26251E',
      muted: '#EFEFEA',
      mutedForeground: '#6F6D64',
      border: '#D9D8D2',
      accent: '#26251E',
      accentForeground: '#F7F7F4',
      accent2: '#6F6D64',
      accent2Foreground: '#F7F7F4',
      input: '#EFEFEA',
      sidebar: '#F7F7F4',
      ring: '#26251E',
      sidebarActiveBg: '48 12% 91%',
      sidebarActiveText: '#26251E',
    },
    dark: {
      background: '#14120B',
      card: '#1B1913',
      foreground: '#EDECEC',
      muted: '#1B1913',
      mutedForeground: '#A9A79F',
      border: '#2A2822',
      accent: '#EDECEC',
      accentForeground: '#14120B',
      accent2: '#A9A79F',
      accent2Foreground: '#14120B',
      input: '#1B1913',
      sidebar: '#14120B',
      ring: '#EDECEC',
      sidebarActiveBg: '45 17% 11%',
      sidebarActiveText: '#EDECEC',
    },
  },
  // Alternate preset — violet. Still a first-class, ready-to-use accent.
  secondary: {
    light: {
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F5F3FF',
      border: '#E4E4F7',
      accent: '#8B5CF6',
      accentForeground: '#F5F3FF',
      ring: '#A855F7',
      sidebarActiveBg: '262 83% 90% / 0.5',
      sidebarActiveText: '#312E81',
    },
    dark: {
      background: '#070B14',
      foreground: '#EDE9FE',
      muted: '#141129',
      border: '#1C1A2C',
      accent: '#C084FC',
      accentForeground: '#0B1220',
      ring: '#C084FC',
      sidebarActiveBg: '262 45% 32% / 0.3',
      sidebarActiveText: '#EDE9FE',
    },
  },
}

const brandPreset: BrandPresetKey = 'primary'

const templateSiteConfig: SiteConfig = {
  name: 'Documentation',
  description:
    'Clear, task-focused guidance for building with the product.',
  repoUrl: '',
  links: [
    { label: 'Get started', href: '/quickstart' },
    { label: 'Changelog', href: '/changelog' },
  ],
  brand: brandPresets[brandPreset],
  brandPreset,
  brandPresets,
}

// Managed by Thally Cloud onboarding.
export const siteConfig: SiteConfig = {
  ...templateSiteConfig,
  name: "Cursor Guide",
  description: "A practical guide to understanding a project, making a safe change, and working with Cursor project rules.",
  repoUrl: "https://github.com/Tabintel/cursor",
  links: [
    { label: "Get started", href: "/quickstart" },
    { label: "GitHub", href: "https://github.com/Tabintel/cursor" },
  ],
};
