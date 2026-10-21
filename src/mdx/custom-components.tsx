import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CursorHeroProps {
  title: string
  subtitle?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

function CursorHero({
  title,
  subtitle,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CursorHeroProps) {
  const hasActions = Boolean(primaryHref || secondaryHref)

  return (
    <section className="thally-docs-hero not-prose mb-8 py-7">
      <div className="flex max-w-4xl flex-col items-start text-left">
        <h1 className="max-w-none text-balance font-heading text-[2rem] font-semibold leading-9 tracking-[-0.02em] text-foreground sm:text-4xl sm:leading-10 xl:whitespace-nowrap">
          {title}
        </h1>
        {subtitle ? (
          <p className="thally-docs-hero-copy max-w-[56ch] text-pretty text-lg leading-7 text-foreground/70">
            {subtitle}
          </p>
        ) : null}
        {hasActions ? (
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className="inline-flex items-center gap-2 rounded-[9px] bg-primary px-4 py-2 text-[0.84rem] font-semibold text-primary-foreground transition hover:brightness-125 active:scale-[0.98]"
              >
                {primaryLabel ?? 'Get started'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : null}
            {secondaryHref ? (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 rounded-[9px] border border-border bg-background px-4 py-2 text-[0.84rem] font-semibold text-foreground transition hover:border-accent hover:text-foreground active:scale-[0.98]"
              >
                {secondaryLabel ?? 'Learn more'}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THIS FILE IS YOURS.
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  Register your own components here to use them in any `.mdx` page — no core
 *  files to touch, and nothing here is overwritten when you update Thally.
 *
 *  Anything you add is merged on top of Thally's built-in components, so you can:
 *    • add brand-new components (e.g. <PricingTable/>, <Roadmap/>), and
 *    • override a built-in by using the same key (e.g. `Note`, `Card`).
 *
 *  Example — a simple component you can use as `<Highlight>text</Highlight>`:
 *
 *    import type { ReactNode } from 'react'
 *
 *    function Highlight({ children }: { children: ReactNode }) {
 *      return (
 *        <mark className="rounded bg-accent/15 px-1 text-foreground">{children}</mark>
 *      )
 *    }
 *
 *    export const customComponents: MDXComponents = {
 *      Highlight,
 *    }
 *
 *  Components can be server or client components, import anything, and take
 *  props from MDX (`<PricingTable plan="pro" />`). See
 *  `src/components/mdx/rich-content.tsx` for how the built-ins are written.
 */
export const customComponents: MDXComponents = {
  Hero: CursorHero,
}
