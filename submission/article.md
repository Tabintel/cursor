# How we built and branded a Cursor guide with Thally

Think of documentation as the manual that comes with a car. It helps software engineers understand a tool and use it properly.

Whenever I try a new developer tool, the documentation is usually my first stop. After that, I check YouTube videos or articles. If you look closely, many tools with growing developer adoption also have helpful documentation.

In this article, we will build a documentation site with [Thally](https://thally.io/). The site will teach developers how to make and review changes with Cursor.

> **Note:** The **Cursor Guide** is an independent guide and is not affiliated with the official [Cursor documentation](https://cursor.com/docs). We created it for this article to explore how to build and publish a focused documentation site.

The guide explains what Cursor is, helps a reader make and review one focused change, and shows how to add a reusable project rule.

**Let's get started!**

[Thally](https://thally.io/) is a platform for creating product and developer-tool documentation. If you're familiar with tools such as [Mintlify](https://www.mintlify.com/) or [Docusaurus](https://docusaurus.io/), you already have an idea of how it works.

If not, don't worry. It is quite easy to set up. 🙂

## What we're building

The guide has three public pages:

1. An introduction that explains Cursor and the intended audience.
2. A quickstart for understanding a project and making a reviewed change.
3. A practical guide for creating and troubleshooting a project rule.

We kept the scope small because the goal was not to list every Cursor feature. We wanted to help a new user complete one useful workflow without guessing.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-homepage.png" alt="Cursor Guide homepage in dark mode with task-based navigation and buttons for the quickstart and project-rule guide" />
  <figcaption>The published homepage gives a new reader two clear starting points without presenting every Cursor feature at once.</figcaption>
</figure>

## Prerequisites

To follow the same process, you need:

- a [Thally Cloud](https://app.thally.io/) account
- a GitHub account with permission to connect the Thally GitHub App
- Node.js and Git for local development
- a product or developer tool you know well
- a clear reader and one useful outcome

## 1. Plan the reader journey

Before creating the site, we wrote one outcome:

> A developer should be able to use Cursor to understand a project, make a focused change, review the diff, and verify the result.

That outcome shaped the navigation. The introduction provides context, the quickstart delivers the first result, and the project-rules guide gives the reader one practical next step.

## 2. Create the repository and Thally site

We created the site in Thally Cloud and chose **Create a new docs repository**. This option creates a repository from Thally's maintained template and connects it to the deployment workflow.

<figure>
  <img src="https://cursor.thally.app/images/article/thally-choose-docs-source.png" alt="Thally Cloud Docs source step with Create a new docs repository selected and the GitHub connection controls visible" />
  <figcaption>Choose where the documentation will live. We selected a new repository so Thally could create it from the maintained template.</figcaption>
</figure>

We selected **Check GitHub**, then authorized Thally Labs to use the GitHub account that would own the documentation repository. Only connect an account where you have permission to create and manage the project.

<figure>
  <img src="https://cursor.thally.app/images/article/thally-authorize-github.png" alt="GitHub authorization screen asking which account should authorize Thally Labs" />
  <figcaption>Authorize Thally's GitHub App with the account that should own or access the documentation repository.</figcaption>
</figure>

Thally created `Tabintel/cursor` from its current starter, connected `main` as the production branch, and published the first deployment at [cursor.thally.app](https://cursor.thally.app/).

We then cloned the generated repository locally:

```bash
git clone https://github.com/Tabintel/cursor.git
cd cursor
```

<figure>
  <img src="https://cursor.thally.app/images/article/thally-cloud-live.png" alt="Thally Cloud dashboard showing the Cursor site as live and an Agent Readiness score of 89 out of 100" />
  <figcaption>Thally Cloud confirmed that the first deployment was live and gave the site an Agent Readiness score.</figcaption>
</figure>

## 3. Replace the starter content

Thally stores pages under `src/content/`. We replaced the demo pages with:

```text
src/content/
  introduction.mdx
  quickstart.mdx
  guides/
    project-rules.mdx
```

Each page has `title` and `description` frontmatter. The task pages also include prerequisites, ordered steps, a success check, and troubleshooting.

For example, the quickstart begins with the result instead of a long product description:

```mdx
---
title: Make your first reviewed change
description: Use Cursor Agent to understand a project, make one focused change, review the diff, and verify the result.
mode: wide
---

After this quickstart, you will have used Cursor Agent to make and verify one small change in a project you control.
```

<figure>
  <img src="https://cursor.thally.app/images/cursor/workflow/cursor-agent-explanation.png" alt="Cursor Agent answering a project explanation prompt with the files a new contributor should read first" />
  <figcaption>We followed the quickstart in Cursor and confirmed that Agent grounded its explanation in the repository instead of editing files.</figcaption>
</figure>

### Add screenshots with borders and captions

We saved documentation images under `public/images/`, then referenced them from MDX with a root-relative path. Thally's `Frame` component adds the border, caption area, and click-to-zoom behaviour, so we did not need custom image components or page-level CSS.

```mdx
<Frame caption="Review every changed line before keeping the result.">
  <img
    className="aspect-video w-full bg-background object-cover object-top"
    src="/images/cursor/workflow/cursor-review-flow.png"
    alt="Cursor Agent showing a focused request and a proposed diff"
  />
</Frame>
```

The `aspect-video` class gives every screenshot the same 16:9 presentation. `object-cover object-top` fills that area and keeps Cursor's title bar and primary controls visible. `w-full` uses the available content width. The caption explains what the reader should notice, and the alt text describes the useful information in the image.

This approach can crop the bottom of a taller source image. Use `object-contain` instead when every part of the interface must remain visible, but expect empty space when source images have different proportions.

Screenshots inside Thally's numbered `<Step>` component inherit the Step's indented content width. For a wide task page, we used a small responsive breakout around each Step screenshot:

```mdx
<div className="md:-ml-[50px] md:w-[calc(100%+50px)]">
  <Frame caption="Cursor Agent explains the project and cites the files behind its answer.">
    <img
      className="aspect-video w-full bg-background object-cover object-top"
      src="/images/cursor/workflow/cursor-agent-explanation.png"
      alt="Cursor Agent answering an evidence-based project explanation prompt"
    />
  </Frame>
</div>
```

The breakout applies only from the medium breakpoint, so the screenshot keeps its normal responsive width on smaller screens. The `mode: wide` frontmatter removes the right-side contents rail, while normal paragraphs remain constrained by Thally's prose styles.

## 4. Configure the navigation

We kept the public navigation short and task-based in `docs.json`:

```json
{
  "tabs": [
    {
      "tab": "Cursor Guide",
      "groups": [
        {
          "group": "Start here",
          "pages": ["introduction", "quickstart"]
        },
        {
          "group": "Practical guides",
          "pages": ["guides/project-rules"]
        }
      ]
    }
  ]
}
```

This gives the reader one obvious path through the site.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-quickstart.png" alt="Published Cursor Guide quickstart showing prerequisites and the first steps for making a reviewed change" />
  <figcaption>The quickstart leads with the outcome, then moves into prerequisites and an ordered workflow.</figcaption>
</figure>

## 5. Study Cursor's visual language

We did not want to guess what a Cursor-inspired site should look like, so we inspected the current [Cursor documentation](https://cursor.com/docs).

<figure>
  <img src="https://cursor.thally.app/images/cursor/agent-homepage.png" alt="Cursor Agent open beside a codebase in the official Cursor documentation" />
  <figcaption>The official Cursor documentation gave us a product reference and a visual direction for the independent guide.</figcaption>
</figure>

The public site uses warm neutral colours, tight corners, restrained borders, and a simple sans-serif reading font. These are the main colours we recorded:

| Purpose | Light mode | Dark mode |
| --- | --- | --- |
| Background | `#F7F7F4` | `#14120B` |
| Primary text | `#26251E` | `#EDECEC` |
| Card surface | `#FFFFFF` | `#1B1913` |
| Border | `#D9D8D2` | `#2A2822` |

Cursor uses its own Cursor Sans and Berkeley Mono fonts. Those fonts are not part of this project, so we did not copy them. We used Inter for reading text and kept the Thally code font. This preserves the same clear, technical feeling without redistributing Cursor's private font files.

## 6. Apply the structural theme and fonts

Thally supports branding through `docs.json`, `src/data/site.ts`, and the managed Branding settings.

We selected the `sharp` structural theme because its tight `4px` corners are closest to Cursor's current interface. We also configured the reading font and retained the theme toggle:

```json
{
  "theme": "sharp",
  "appearance": {
    "default": "system",
    "showToggle": true,
    "contentIcons": "accent"
  },
  "fonts": {
    "body": {
      "family": "Inter",
      "weight": ["400", "500", "600"]
    },
    "heading": {
      "family": "Inter",
      "weight": ["400", "500", "600"]
    }
  }
}
```

### Keep site-specific layout changes customer-owned

Thally's built-in Hero limits headings to `17ch`. That default made the short homepage title wrap even when a wide desktop had enough room.

We did not edit the built-in Hero because `src/components/` is runtime-owned. Instead, we registered a site-specific Hero override in `src/mdx/custom-components.tsx`, which the starter explicitly reserves for customer components:

```tsx
export const customComponents: MDXComponents = {
  Hero: CursorHero,
}
```

The custom Hero removes the narrow title limit and uses `xl:whitespace-nowrap` only at large desktop widths. Smaller screens still wrap naturally.

Use the same ownership check before any customization:

| Change | Correct source |
| --- | --- |
| Pages and frontmatter | `src/content/` |
| Navigation, theme, fonts, logo paths | `docs.json` |
| Site identity and versioned colour defaults | `src/data/site.ts` |
| Site-specific MDX components | `src/mdx/custom-components.tsx` |
| Thally runtime behaviour | Upstream Thally runtime, not a local hand edit |

## 7. Add the Cursor mark

We downloaded the light and dark Cursor marks from Cursor's public documentation assets and stored them in `public/brand/`:

```text
public/brand/
  cursor-light.svg
  cursor-dark.svg
```

Then we added source-controlled logo and favicon fallbacks in `docs.json`:

```json
{
  "favicon": {
    "light": "/brand/cursor-light.svg",
    "dark": "/brand/cursor-dark.svg"
  },
  "navbar": {
    "logo": {
      "light": "/brand/cursor-light.svg",
      "dark": "/brand/cursor-dark.svg",
      "showTitle": true
    }
  }
}
```

The site remains clearly labelled as an independent guide. The introduction and repository both include that disclaimer.

## 8. Define the light and dark palettes

We updated the version-controlled brand palette in `src/data/site.ts`. The dark configuration looks like this:

```ts
dark: {
  background: '#14120B',
  card: '#1B1913',
  foreground: '#EDECEC',
  muted: '#1B1913',
  mutedForeground: '#A9A79F',
  border: '#2A2822',
  accent: '#EDECEC',
  accentForeground: '#14120B',
  input: '#1B1913',
  sidebar: '#14120B',
  ring: '#EDECEC',
  sidebarActiveBg: '45 17% 11%',
  sidebarActiveText: '#EDECEC'
}
```

We used neutral accent colours because Cursor's documentation does not rely on a bright brand colour for every active state.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-project-rule.png" alt="Published Cursor Guide page showing how to create a reusable Cursor project rule" />
  <figcaption>The practical guide combines a focused explanation, a reusable rule example, verification, and troubleshooting.</figcaption>
</figure>

The guide does not stop at a copied code sample. It shows the rule inside Cursor, including the file patterns that determine where it applies.

<figure>
  <img src="https://cursor.thally.app/images/cursor/workflow/cursor-project-rule.png" alt="Cursor editor showing a documentation project rule and its matching file patterns" />
  <figcaption>The rule keeps durable documentation standards in the repository, where every contributor can review them.</figcaption>
</figure>

We then tested the rule with a disposable practice page instead of changing published documentation. Cursor identified the relevant instructions, limited the task to that one file, and left the proposed change for review. We removed the practice page after the test because it existed only to verify the rule safely.

<figure>
  <img src="https://cursor.thally.app/images/cursor/workflow/cursor-review-flow.png" alt="Cursor Agent applying the documentation project rule and showing a red and green proposed diff" />
  <figcaption>A focused verification prompt checks that the rule applies before a maintainer accepts the change.</figcaption>
</figure>

## 9. Validate the site

Before publishing, we ran the checks required by the repository:

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
npm test
npm run build
```

The content check completed with no errors or warnings. All 1,673 tests passed, and the production build completed successfully.

We also opened the local preview and reviewed the homepage, quickstart, navigation, code blocks, internal links, and theme behaviour. On the published site, we followed both homepage calls to action and checked the sidebar, page navigation, footer, and external references.

The sidebar labels **Start here** and **Practical guides** organise the pages below them. They are section headings rather than links, so selecting them does not open a page. The actual page links and calls to action navigate correctly.

## 10. Publish and verify the exact revision

We committed the reviewed files and pushed them to the production branch. A push to the connected branch should create a new managed deployment in Thally Cloud.

After publishing, we checked three things:

1. The deployment commit matches the commit we pushed.
2. The homepage contains the Cursor Guide content instead of the starter pages.
3. The live site uses the expected colours, logo, navigation, and page links in both themes.

This verification matters. A successful deployment message does not prove that the intended repository revision is the one readers can see.

<figure>
  <img src="https://cursor.thally.app/images/article/thally-production-deployment.png" alt="Thally Cloud deployments page showing the Cursor site as healthy, the Tabintel cursor repository, the main branch, and a successful production deployment" />
  <figcaption>The deployment details confirm the live site, connected repository, production branch, successful status, and build duration.</figcaption>
</figure>

### An obstacle we solved while publishing

We initially prepared the content in a second repository because we misunderstood which repository the live site was publishing. To confirm the source, we checked the deployment details and the live site's `/api/site-config` response. Thally was publishing `Tabintel/cursor`, while our changes were in `Tabintel/cursor-guides`.

We corrected the workflow by treating the deployment information as the source of truth, cloning `Tabintel/cursor`, and applying our pages, navigation, identity, and brand assets there. The lesson is simple: before publishing, confirm the connected repository, production branch, and deployed commit instead of relying on a repository name that looks correct.

## Final result

The finished project is intentionally small. It gives a new Cursor user a clear path from opening a project to making a reviewed change and adding reusable project guidance.

Thally provides the structure around that journey: version-controlled content, navigation, validation, publishing, search, and agent-ready documentation surfaces.

- Live site: [cursor.thally.app](https://cursor.thally.app/)
- Source: [github.com/Tabintel/cursor](https://github.com/Tabintel/cursor)

Cursor names, marks, and visual references belong to Cursor and Anysphere. This project uses them only to identify the documented product and remains an independent guide.
