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

We are keeping the guide small, with three public pages:

1. An introduction that explains Cursor and the intended audience.
2. A quickstart for understanding a project and making a reviewed change.
3. A practical guide for creating and troubleshooting a project rule.

We do not need to explain every Cursor feature. We only need to help a new user complete one useful workflow without guessing what to do next.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-homepage.png" alt="Cursor Guide homepage in dark mode with task-based navigation and buttons for the quickstart and project-rule guide" />
  <figcaption>The published homepage gives a new reader two clear starting points without presenting every Cursor feature at once.</figcaption>
</figure>

## What you need

To follow the same process, you need:

- a [Thally Cloud](https://app.thally.io/) account
- a GitHub account with permission to connect the Thally GitHub App
- Node.js and Git for local development
- a product or developer tool you know well
- a clear reader and one useful outcome

## 1. Start with one clear outcome

Before we created any pages, we wrote down one outcome:

> A developer should be able to use Cursor to understand a project, make a focused change, review the diff, and verify the result.

This made it easier to decide what belonged in the guide. The introduction explains the tool, the quickstart helps the reader get their first result, and the project-rules guide gives them something useful to try next.

## 2. Create the site with Thally

We opened Thally Cloud and chose **Create a new docs repository**. Thally then created a GitHub repository from its maintained template and connected it to the publishing workflow.

<figure>
  <img src="https://cursor.thally.app/images/article/thally-choose-docs-source.png" alt="Thally Cloud Docs source step with Create a new docs repository selected and the GitHub connection controls visible" />
  <figcaption>Choose where the documentation will live. We selected a new repository so Thally could create it from the maintained template.</figcaption>
</figure>

Next, we selected **Check GitHub** and authorized Thally Labs to use the GitHub account that would own the repository. Make sure you connect an account where you have permission to create and manage the project.

<figure>
  <img src="https://cursor.thally.app/images/article/thally-authorize-github.png" alt="GitHub authorization screen asking which account should authorize Thally Labs" />
  <figcaption>Authorize Thally's GitHub App with the account that should own or access the documentation repository.</figcaption>
</figure>

Thally created `Tabintel/cursor` from its current starter, connected `main` as the production branch, and published the first deployment at [cursor.thally.app](https://cursor.thally.app/).

Once the first deployment was live, we cloned the new repository:

```bash
git clone https://github.com/Tabintel/cursor.git
cd cursor
```

<figure>
  <img src="https://cursor.thally.app/images/article/thally-cloud-live.png" alt="Thally Cloud dashboard showing the Cursor site as live and an Agent Readiness score of 89 out of 100" />
  <figcaption>Thally Cloud confirmed that the first deployment was live and gave the site an Agent Readiness score.</figcaption>
</figure>

## 3. Add the documentation pages

Thally stores documentation pages under `src/content/`. We removed the demo content and added these three pages:

```text
src/content/
  introduction.mdx
  quickstart.mdx
  guides/
    project-rules.mdx
```

Each page needs `title` and `description` frontmatter. For the two task pages, we also added what the reader needs, clear steps, a success check, and troubleshooting.

For example, the quickstart tells the reader what they will accomplish before moving into the steps:

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
  <figcaption>We followed the quickstart in Cursor and confirmed that Agent used real files from the repository without editing anything.</figcaption>
</figure>

### Add screenshots with borders and captions

Screenshots make a guide easier to follow because the reader can compare each instruction with the product. We saved ours under `public/images/`, then added them to the MDX pages with root-relative paths.

Thally's `Frame` component gives each image a border, a caption, and click-to-zoom behaviour, so we did not need to build a custom image component.

```mdx
<Frame caption="Review every changed line before keeping the result.">
  <img
    className="aspect-video w-full bg-background object-cover object-top"
    src="/images/cursor/workflow/cursor-review-flow.png"
    alt="Cursor Agent showing a focused request and a proposed diff"
  />
</Frame>
```

Here, `aspect-video` gives every screenshot the same 16:9 shape. `object-cover object-top` fills the space while keeping Cursor's title bar and main controls visible, and `w-full` lets the image use the available width.

We used the caption to tell the reader what to notice. The alt text describes what is shown for readers who use assistive technology or cannot load the image.

There is one trade-off: `object-cover` can crop the bottom of a tall screenshot. If every part of the screen must remain visible, use `object-contain` instead. You may see some empty space around images with a different shape.

We noticed that screenshots inside Thally's numbered `<Step>` component appeared narrower than the image on the introduction page. This happens because each Step keeps some space for its number and connecting line.

To give the screenshots more room on a wide task page, we added a small responsive wrapper:

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

The extra width only applies from the medium breakpoint, so the screenshot still fits naturally on phones. We also added `mode: wide` to the page frontmatter. This removes the right-side contents rail and gives the task more room without making the paragraphs difficult to read.

## 4. Keep the navigation simple

Next, we added the three pages to `docs.json`. We kept the navigation short and organised it around what the reader wants to do:

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

Now the reader can start with the introduction, complete the quickstart, and move to the practical guide without searching through a long sidebar.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-quickstart.png" alt="Published Cursor Guide quickstart showing prerequisites and the first steps for making a reviewed change" />
  <figcaption>The quickstart leads with the outcome, then moves into prerequisites and an ordered workflow.</figcaption>
</figure>

## 5. Use Cursor as the visual reference

We wanted the guide to feel familiar to a Cursor user, so we studied the current [Cursor documentation](https://cursor.com/docs) instead of guessing.

<figure>
  <img src="https://cursor.thally.app/images/cursor/agent-homepage.png" alt="Cursor Agent open beside a codebase in the official Cursor documentation" />
  <figcaption>The official Cursor documentation gave us a product reference and a visual direction for the independent guide.</figcaption>
</figure>

We noticed warm neutral colours, tight corners, subtle borders, and a simple sans-serif reading font. These are the main colours we used as a reference:

| Purpose | Light mode | Dark mode |
| --- | --- | --- |
| Background | `#F7F7F4` | `#14120B` |
| Primary text | `#26251E` | `#EDECEC` |
| Card surface | `#FFFFFF` | `#1B1913` |
| Border | `#D9D8D2` | `#2A2822` |

Cursor uses Cursor Sans and Berkeley Mono, but those fonts are not included in this project. Instead of copying private font files, we used Inter for the text and kept Thally's code font. The result still feels clean and technical while remaining easy to read.

## 6. Add the theme and fonts

Thally lets us control the site's appearance through `docs.json`, `src/data/site.ts`, and the Branding settings in Thally Cloud.

We selected the `sharp` theme because its `4px` corners are close to Cursor's current interface. We also set Inter as the reading font and kept the light and dark mode toggle:

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

### Fix the homepage title without changing Thally's runtime

Here is one small problem we ran into: Thally's built-in Hero limits headings to `17ch`. Our homepage title wrapped onto two lines even when there was enough room on a wide screen.

We could have edited the built-in component, but that file belongs to Thally's runtime and may be replaced during a future sync. Instead, we registered our own Hero in `src/mdx/custom-components.tsx`, the customer-owned file Thally provides for custom components:

```tsx
export const customComponents: MDXComponents = {
  Hero: CursorHero,
}
```

Our Hero removes the narrow title limit and uses `xl:whitespace-nowrap` only on large desktop screens. On phones and tablets, the title can still wrap naturally.

Before changing any part of a Thally site, it helps to know which file owns it:

| Change | Correct source |
| --- | --- |
| Pages and frontmatter | `src/content/` |
| Navigation, theme, fonts, logo paths | `docs.json` |
| Site identity and versioned colour defaults | `src/data/site.ts` |
| Site-specific MDX components | `src/mdx/custom-components.tsx` |
| Thally runtime behaviour | Upstream Thally runtime, not a local hand edit |

## 7. Add the Cursor logo and favicon

We saved the light and dark Cursor marks under `public/brand/`:

```text
public/brand/
  cursor-light.svg
  cursor-dark.svg
```

Then we connected them to the logo and favicon settings in `docs.json`:

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

Because this is not Cursor's official documentation, we kept the independent-guide note visible in the introduction and repository.

## 8. Add the light and dark colours

Next, we added the brand colours to `src/data/site.ts` so they remain part of the repository. Here is the dark configuration:

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

We kept the accent colours neutral because Cursor's documentation does not use a bright colour for every active state.

<figure>
  <img src="https://cursor.thally.app/images/article/cursor-guide-project-rule.png" alt="Published Cursor Guide page showing how to create a reusable Cursor project rule" />
  <figcaption>The practical guide combines a focused explanation, a reusable rule example, verification, and troubleshooting.</figcaption>
</figure>

We did not want the project-rule guide to end with a code sample that nobody had tested. We opened the rule in Cursor and checked the file patterns that control where it applies.

<figure>
  <img src="https://cursor.thally.app/images/cursor/workflow/cursor-project-rule.png" alt="Cursor editor showing a documentation project rule and its matching file patterns" />
  <figcaption>The rule keeps durable documentation standards in the repository, where every contributor can review them.</figcaption>
</figure>

Then we created a temporary practice page and asked Cursor to update only that file. This let us confirm that Cursor found the rule, followed the instructions, and left the change for us to review. Once the test worked, we removed the practice page because it was never meant to be published.

<figure>
  <img src="https://cursor.thally.app/images/cursor/workflow/cursor-review-flow.png" alt="Cursor Agent applying the documentation project rule and showing a red and green proposed diff" />
  <figcaption>A focused verification prompt checks that the rule applies before a maintainer accepts the change.</figcaption>
</figure>

## 9. Check the site before publishing

Before we published anything, we ran the checks required by the repository:

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
npm test
npm run build
```

The content check returned no errors or warnings. All 1,673 tests passed, and the production build completed successfully.

The commands were only part of the check. We also opened the local preview and used the site like a reader. We checked the homepage, quickstart, screenshots, code blocks, internal links, and both colour themes.

## 10. Publish and check the live site

Once everything passed locally, we committed the changes and pushed them to `main`, the production branch connected to Thally Cloud. That push started a new deployment.

When the deployment finished, we checked three things:

1. The deployment commit matches the commit we pushed.
2. The homepage contains the Cursor Guide content instead of the starter pages.
3. The live site uses the expected colours, logo, navigation, and page links in both themes.

A successful status is good, but it does not always mean the live site contains the exact revision you expected. That is why we checked the commit and the site itself.

<figure>
  <img src="https://cursor.thally.app/images/article/thally-production-deployment.png" alt="Thally Cloud deployments page showing the Cursor site as healthy, the Tabintel cursor repository, the main branch, and a successful production deployment" />
  <figcaption>The deployment details confirm the live site, connected repository, production branch, successful status, and build duration.</figcaption>
</figure>

### One publishing problem we ran into

At first, we prepared the content in a second repository because we misunderstood which repository the live site was using. The repository names looked similar, so the mistake was easy to miss.

We checked the deployment details and the live site's `/api/site-config` response to confirm the source. Thally was publishing `Tabintel/cursor`, while our changes were in `Tabintel/cursor-guides`.

Once we found the mismatch, we cloned `Tabintel/cursor` and moved our pages, navigation, identity, and brand assets there. So before you publish, confirm the connected repository, production branch, and deployed commit. Do not rely on a repository name that simply looks correct.

## Next steps

Now we have built and published a documentation site with Thally. We started with a simple idea, turned it into three focused pages, added Cursor-inspired branding, tested the instructions, and published the guide.

You can explore the [Cursor Guide](https://cursor.thally.app/), make updates to the documentation, or use the [source repository](https://github.com/Tabintel/cursor) as a reference for your own project.

If you have a product or developer tool you want to document, try [Thally](https://thally.io/) and build your own documentation site. Start small, choose one useful outcome for your reader, and grow the guide as you learn what they need.

Cursor names, marks, and visual references belong to Cursor and Anysphere. This project uses them only to identify the documented product and remains an independent guide.
