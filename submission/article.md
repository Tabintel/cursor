# How I built and branded a Cursor guide with Thally

I wanted to build a small documentation site that another developer could actually finish.

The result is **Cursor Guide**, an independent guide for developers who are new to Cursor. It explains what Cursor is, helps a reader make and review one focused change, and shows how to add a reusable project rule.

I built and published the site with Thally. This article walks through the complete process, including the decisions, configuration, validation, deployment, and branding work.

## What I built

The guide has three public pages:

1. An introduction that explains Cursor and the intended audience.
2. A quickstart for understanding a project and making a reviewed change.
3. A practical guide for creating and troubleshooting a project rule.

I kept the scope small because the goal was not to list every Cursor feature. The goal was to help a new user complete one useful workflow without guessing.

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

Before creating the site, I wrote one outcome:

> A developer should be able to use Cursor to understand a project, make a focused change, review the diff, and verify the result.

That outcome shaped the navigation. The introduction provides context, the quickstart delivers the first result, and the project-rules guide gives the reader one practical next step.

## 2. Create the repository and Thally site

I created the site in Thally Cloud and chose the option to create a new documentation repository. Thally created `Tabintel/cursor` from its current starter, connected `main` as the production branch, and published the first deployment at [cursor.thally.app](https://cursor.thally.app/).

I then cloned the generated repository locally:

```bash
git clone https://github.com/Tabintel/cursor.git
cd cursor
```

<figure>
  <img src="https://cursor.thally.app/images/article/thally-cloud-live.png" alt="Thally Cloud dashboard showing the Cursor site as live and an Agent Readiness score of 89 out of 100" />
  <figcaption>Thally Cloud confirmed that the first deployment was live and gave the site an Agent Readiness score.</figcaption>
</figure>

## 3. Replace the starter content

Thally stores pages under `src/content/`. I replaced the demo pages with:

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
---

After this quickstart, you will have used Cursor Agent to make and verify one small change in a project you control.
```

## 4. Configure the navigation

I kept the public navigation short and task-based in `docs.json`:

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

I did not want to guess what a Cursor-inspired site should look like, so I inspected the current [Cursor documentation](https://cursor.com/docs).

<figure>
  <img src="https://cursor.thally.app/images/cursor/agent-homepage.png" alt="Cursor Agent open beside a codebase in the official Cursor documentation" />
  <figcaption>The official Cursor documentation gave me a product reference and a visual direction for the independent guide.</figcaption>
</figure>

The public site uses warm neutral colours, tight corners, restrained borders, and a simple sans-serif reading font. The main colours I recorded were:

| Purpose | Light mode | Dark mode |
| --- | --- | --- |
| Background | `#F7F7F4` | `#14120B` |
| Primary text | `#26251E` | `#EDECEC` |
| Card surface | `#FFFFFF` | `#1B1913` |
| Border | `#D9D8D2` | `#2A2822` |

Cursor uses its own Cursor Sans and Berkeley Mono fonts. Those fonts are not part of this project, so I did not copy them. I used Inter for reading text and kept the Thally code font. This preserves the same clear, technical feeling without redistributing Cursor's private font files.

## 6. Apply the structural theme and fonts

Thally supports branding through `docs.json`, `src/data/site.ts`, and the managed Branding settings.

I selected the `sharp` structural theme because its tight `4px` corners are closest to Cursor's current interface. I also configured the reading font and retained the theme toggle:

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

## 7. Add the Cursor mark

I downloaded the light and dark Cursor marks from Cursor's public documentation assets and stored them in `public/brand/`:

```text
public/brand/
  cursor-light.svg
  cursor-dark.svg
```

Then I added source-controlled logo and favicon fallbacks in `docs.json`:

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

I updated the version-controlled brand palette in `src/data/site.ts`. The dark configuration looks like this:

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

I used neutral accent colours because Cursor's documentation does not rely on a bright brand colour for every active state.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-project-rule.png" alt="Published Cursor Guide page showing how to create a reusable Cursor project rule" />
  <figcaption>The practical guide combines a focused explanation, a reusable rule example, verification, and troubleshooting.</figcaption>
</figure>

## 9. Validate the site

Before publishing, I ran the checks required by the repository:

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
npm test
npm run build
```

The content check completed with no errors or warnings. All 1,673 tests passed, and the production build completed successfully.

I also opened the local preview and reviewed the homepage, quickstart, navigation, code blocks, internal links, and theme behaviour. On the published site, I followed both homepage calls to action and checked the sidebar, page navigation, footer, and external references.

The sidebar labels **Start here** and **Practical guides** organise the pages below them. They are section headings rather than links, so selecting them does not open a page. The actual page links and calls to action navigate correctly.

## 10. Publish and verify the exact revision

I committed the reviewed files and pushed them to the production branch. A push to the connected branch should create a new managed deployment in Thally Cloud.

After publishing, I check three things:

1. The deployment commit matches the commit I pushed.
2. The homepage contains the Cursor Guide content instead of the starter pages.
3. The live site uses the expected colours, logo, navigation, and page links in both themes.

This verification matters. A successful deployment message does not prove that the intended repository revision is the one readers can see.

## What worked well

Thally gave the project a clear docs-as-code structure, a managed deployment path, built-in validation, and agent-facing surfaces from the same content source. The MDX components also made the quickstart easy to scan without adding custom application code.

## Where I encountered friction

I initially prepared the content in a second repository because I misunderstood which repository the live site was publishing. Checking the live site's `/api/site-config` response exposed the mismatch: Thally was correctly publishing `Tabintel/cursor`, while my changes were in `Tabintel/cursor-guides`.

I corrected the workflow by treating the live site configuration as the source of truth, cloning `Tabintel/cursor`, and applying only the authored pages, navigation, identity, and brand assets there. That avoided changing Thally's generated runtime files.

During local development, the preview logged a Next.js `searchParams` warning from a framework-owned route even though the pages loaded, the tests passed, and the production build succeeded. I recorded it instead of changing generated runtime code in the customer repository.

## What I would improve

I would make the selected repository, branch, and deployed commit more prominent on the site overview. A visible comparison between the live commit and the latest branch commit would make stale deployments easier to recognise.

I would also surface source-controlled branding values beside managed overrides. That would help maintainers understand which value wins before starting another deployment.

## Final result

The finished project is intentionally small. It gives a new Cursor user a clear path from opening a project to making a reviewed change and adding reusable project guidance.

Thally provides the structure around that journey: version-controlled content, navigation, validation, publishing, search, and agent-ready documentation surfaces.

- Live site: [cursor.thally.app](https://cursor.thally.app/)
- Source: [github.com/Tabintel/cursor](https://github.com/Tabintel/cursor)

Cursor names, marks, and visual references belong to Cursor and Anysphere. This project uses them only to identify the documented product and remains an independent guide.
