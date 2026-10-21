# Cursor Guide assessment notes

These notes record the work, decisions, problems, fixes, and lessons from the Thally assessment. They are written for future reference and are not part of the public documentation navigation.

## Assessment brief

Build and publish a small documentation site with Thally for a developer tool you know. Include:

- an introduction that explains the tool and audience
- a working quickstart with a useful outcome
- one practical guide with examples and troubleshooting
- a short article that teaches another developer how to build a similar site
- three observations about what worked, where there was friction, and what could improve

## Requirement-by-requirement audit

This table checks every instruction in the assessment against visible evidence. **Complete** means the requirement is already finished. **Ready to publish** means the work exists, but still needs a public article URL before the submission email is sent.

| Email requirement | Status | Evidence | Final check |
| --- | --- | --- | --- |
| Choose a project or developer tool you know well | Complete | We chose Cursor, a developer tool with a clear agent-assisted development workflow. | The guide stays focused on workflows we can explain and verify. |
| Configure a documentation site using Thally | Complete | `docs.json` configures the theme, navigation, fonts, logo, favicon, appearance, and links. `src/data/site.ts` provides the version-controlled site identity and colour palettes. | The configuration passes Thally's content checks and the production build. |
| Publish the documentation site with Thally | Complete | The site is live at https://cursor.thally.app/ from `Tabintel/cursor` on `main`. | The live homepage, quickstart, guide, navigation, images, and buttons were reviewed after deployment. |
| Include an introduction explaining what the tool does | Complete | `src/content/introduction.mdx` explains that Cursor is an AI code editor that helps developers understand a codebase, plan a change, edit files, and review the result. | The explanation is direct and does not turn into a broad feature list. |
| Explain who the tool and guide are for | Complete | The introduction identifies developers who know Git and code editors but are new to working with an AI coding agent. | The audience is stated near the top and repeated in a dedicated section without changing its meaning. |
| Include a working quickstart | Complete | `src/content/quickstart.mdx` takes the reader from opening a project to asking Agent for evidence, requesting one change, reviewing the diff, and running checks. | The page includes prerequisites, ordered steps, expected success, troubleshooting, and a next step. |
| Help a new user accomplish something useful | Complete | The reader finishes one small, reviewed, validated change in a project they control. | The outcome is concrete and can be verified from the diff and passing project checks. |
| Include one practical guide | Complete | `src/content/guides/project-rules.mdx` teaches the reader to create and verify `.cursor/rules/documentation.mdc`. | The guide produces a reusable, version-controlled result. |
| Include examples where helpful | Complete | The quickstart includes two copyable prompts. The project-rule guide includes a complete rule file and a verification prompt. | Examples are specific enough to use but easy to adapt to another project. |
| Include troubleshooting where helpful | Complete | Both task pages cover likely failures, including vague answers, broad edits, failed checks, unmatched globs, incorrect rule scope, and conflicting instructions. | Each troubleshooting item gives the reader a next action. |
| Start with the Thally quickstart | Complete | We used the Thally quickstart as the setup reference and retained it in the project notes and README. | Link: https://docs.thally.io/quickstart |
| Publish a short technical article | Ready to publish | `submission/article.md` is complete and contains the final screenshots. | Publish it and add its public URL before sending the email. This is the only unfinished assessment deliverable. |
| Teach another developer to create a similar site | Complete in draft | The article explains the reader outcome, Thally site creation, repository structure, content model, navigation, branding, validation, deployment, and verification. | A developer can follow the sequence without needing this project's private context. |
| Cover prerequisites | Complete in draft | The article lists Thally Cloud, GitHub access, Node.js, Git, a suitable developer tool, and a clear reader outcome. | The prerequisites appear before setup. |
| Cover setup | Complete in draft | The article explains creating the Thally site, connecting the repository, cloning it, and identifying the production branch. | Commands and expected repository names are included. |
| Cover configuration | Complete in draft | The article shows `docs.json`, the `sharp` theme, Inter fonts, navigation, logo and favicon configuration, and the palettes in `src/data/site.ts`. | Configuration examples match the repository. |
| Cover content creation | Complete in draft | The article explains the three-page content model, frontmatter, outcome-led quickstart, examples, success checks, and troubleshooting. | The article includes a real MDX example. |
| Cover publishing | Complete in draft | The article explains validation, pushing to the connected production branch, and checking the live revision, branding, and links. | The live site and source repository are linked. |
| Include obstacles and how they were resolved | Complete in draft | The article describes the repository mismatch, the live `/api/site-config` check, the framework-owned warning, and why generated runtime files were not patched locally. | Each obstacle includes the decision or resolution, not just the problem. |
| Keep the submission small and focused | Complete | The public site has three purposeful pages and one reader journey. | We avoided padding the site with empty sections or a broad feature catalogue. |
| Demonstrate technical accuracy | Complete | Product claims link to Cursor's official documentation. The docs check, tests, build, live navigation review, and signed-in Cursor workflow passed. | The guide includes real evidence from Cursor Agent, a project rule, and a reviewed red and green diff. |
| Demonstrate clear explanations and working instructions | Complete | Pages lead with outcomes, address the reader directly, use ordered steps, and show what success looks like. | Read the final article aloud once after publishing. |
| Provide developer experience feedback and honest criticism | Complete in draft | The article includes **What worked well**, **Where I encountered friction**, and **What I would improve**. | Include the short note below in the submission email. |

### Three observations for the submission email

- **What worked well:** Thally gave me a strong docs-as-code starting point, useful validation, and a simple path from GitHub to a live documentation site.
- **Where I encountered friction:** I initially misunderstood which similarly named repository and revision the live site was publishing. Checking the live site configuration and deployment details helped me identify the correct source.
- **What I would improve:** I would make the connected repository, production branch, live commit, and branding precedence more prominent in the Cloud dashboard so maintainers can verify a deployment faster.

### Completion summary

- Documentation engineering: complete and live.
- Technical article: written, illustrated, and ready to publish.
- Remaining action: publish the article and copy its public URL into the submission email.
- Submission links: live site and repository are ready.
- Feedback: worked well, friction, and improvement observations are ready.

Do not state that every deliverable is submitted until the article has a public URL. Once that URL exists, every requested deliverable in the email will be complete.

## Product choice

We chose Cursor because it is a developer tool with a clear first-user journey and practical configuration workflows.

The guide is independent. It does not claim to be Cursor's official documentation.

## Reader and outcome

The reader already knows how to use Git and a code editor but is new to Cursor.

The core outcome is:

> Use Cursor Agent to understand a project, make one focused change, review the diff, and verify the result.

This outcome kept the project small enough for the assessment while still demonstrating real documentation engineering.

## Public information

- Live site: https://cursor.thally.app/
- Production repository: https://github.com/Tabintel/cursor
- Production branch: `main`
- Official Cursor docs: https://cursor.com/docs
- Official Cursor quickstart: https://cursor.com/docs/get-started/quickstart
- Official Cursor rules reference: https://cursor.com/docs/rules
- Thally quickstart: https://docs.thally.io/quickstart

## Repository lesson

Two repositories existed during the work:

- `Tabintel/cursor-guides`, which we initially prepared manually
- `Tabintel/cursor`, which Thally Cloud created and actually deployed

The live site's `/api/site-config` response showed that `Tabintel/cursor` was the production repository. This was stronger evidence than the repository name we expected.

Lesson: always confirm the deployed repository and branch from the live site or Thally deployment details before editing or pushing.

## Content structure

The public guide contains three pages:

```text
src/content/
  introduction.mdx
  quickstart.mdx
  guides/
    project-rules.mdx
```

A hidden `src/content/api/introduction.mdx` page remains only because the current starter test suite expects an API route parameter. It is not included in public navigation and does not claim that Cursor exposes an API documented by this guide.

## Why these pages

### Introduction

The introduction explains what Cursor does, who the guide is for, and the responsibility the developer keeps when using an agent.

### Quickstart

The quickstart gives the reader a complete workflow:

1. Open a project.
2. Ask Agent for an evidence-based explanation.
3. Request one focused change.
4. Review every changed line.
5. Run the project's checks.

### Project rules guide

The practical guide creates `.cursor/rules/documentation.mdc`, explains the fields, verifies the rule, and covers common failure cases.

## Writing decisions

- Address the reader as “you”.
- Lead with the outcome.
- Use short paragraphs and sentence-case headings.
- Keep one job per page.
- Include expected results and troubleshooting.
- Avoid broad feature lists.
- Link product claims to current official documentation.
- Do not use em or en dashes in authored content.

## Branding research

We inspected Cursor's current documentation instead of choosing colours by memory.

Observed visual tokens:

| Token | Light | Dark |
| --- | --- | --- |
| Background | `#F7F7F4` | `#14120B` |
| Foreground | `#26251E` | `#EDECEC` |
| Card | `#FFFFFF` | `#1B1913` |
| Border | `#D9D8D2` | `#2A2822` |

Cursor's public documentation uses tight `4px` corners, so the Thally `sharp` structural theme was the closest supported choice.

Cursor uses proprietary Cursor Sans and Berkeley Mono fonts. We did not copy those font files. We used Inter for body and heading text and retained Thally's code font.

## Branding files

- `docs.json` controls the `sharp` theme, fonts, logo, favicon, appearance, and navigation.
- `src/data/site.ts` contains the version-controlled light and dark colour palettes.
- `public/brand/cursor-light.svg` is the light-mode Cursor mark.
- `public/brand/cursor-dark.svg` is the dark-mode Cursor mark.

The marks were downloaded from Cursor's public documentation assets. Cursor and Anysphere retain their rights to the name and marks.

## Screenshot plan

Every screenshot needs useful alt text and a caption that explains why the reader is seeing it.

| Screenshot | Location | Status | Purpose |
| --- | --- | --- | --- |
| Cursor Agent from official docs | Article | Added | Records the visual reference used during branding research |
| Thally Cloud site overview | Article | Added | Proves the site deployed and records the readiness score |
| Thally docs-source selection | Article | Added | Shows how to create a repository from the maintained Thally template |
| GitHub authorization | Article | Added | Shows the account-selection step for connecting Thally's GitHub App |
| Production deployment details | Article | Added | Confirms the repository, `main` branch, healthy site, and successful production publish |
| Cursor Guide homepage, dark mode | Article | Added | Shows the finished dark palette and reader entry points |
| Cursor Guide quickstart | Article | Added | Shows the outcome-led task structure |
| Cursor Guide project-rule page | Article | Added | Shows the practical example and code presentation |
| Cursor Guide homepage, light mode | Article | Optional | Shows the finished light palette |
| Agent explanation prompt | Quickstart and article | Added | Shows the first prompt and evidence-based response |
| Rule verification in Cursor | Introduction, quickstart, project-rules guide, and article | Added | Shows a scoped prompt, the matching rule, red and green changes, and review controls |
| `.cursor/rules/documentation.mdc` | Project-rules guide and article | Added | Shows the rule, file patterns, and repository location |
| Thally deployment details | Article | Added | Shows the production repository, `main` branch, healthy site, and successful status |

Do not use decorative screenshots. Each image should explain a step, confirm a result, or help the reader recognise the correct UI.

## Cursor app screenshot checklist

Take these screenshots inside Cursor so the product steps in the guide match what the reader sees. Use a small practice repository with no private code, credentials, email addresses, environment values, or unrelated browser tabs visible.

### 1. Opening the project

Capture Cursor immediately after opening the practice repository.

Include:

- the Explorer with the project name and a few safe files
- the editor welcome state or project README
- enough of the Cursor window to make the product recognisable

Add it after **Open the project** in the quickstart. Caption it: “Open the project root and wait for Cursor to finish indexing before asking Agent about the codebase.”

### 2. Asking Agent to explain the project

Open Agent and enter the exact explanation prompt from the quickstart. Capture the prompt and the beginning of an answer that cites real files.

Include:

- the prompt
- cited file names
- the project Explorer for context

Add it after **Ask Agent for a short explanation**. Caption it: “Ask for a short explanation that points to the files behind each claim.”

### 3. Reviewing a proposed change

Ask Agent for one small change and stop before accepting everything. Capture the proposed diff.

Include:

- the changed file name
- added and removed lines
- the review or accept controls

Add it after **Review the diff**. Caption it: “Review every changed line and reject unrelated edits before accepting the result.”

### 4. Running the validation command

Open Cursor's terminal, run the project's real validation command, and capture a successful result.

Include:

- the command
- the final passing summary
- no tokens, paths containing personal information, or environment variables

Add it after **Run the project checks**. Caption it: “A focused change is complete only after the project's checks pass.”

### 5. Creating the project rule

Create `.cursor/rules/documentation.mdc` and open it in the editor.

Include:

- `.cursor/rules` in the Explorer
- the file name
- the rule frontmatter and first instructions

Add it after **Create the rule** in the project-rule guide. Caption it: “Store durable documentation instructions in a version-controlled project rule.”

### 6. Verifying the project rule

Open a matching documentation file, ask Agent to apply the rule, and capture the response naming the rule or showing the compliant change.

Add it after **Verify the rule**. Caption it: “Verify that Agent applies the rule to a matching documentation file.”

Completed with `cursor-rule-diff.png`. Cursor received a scoped request for a matching documentation file, recognised the project instructions, changed only the temporary practice file, and left the result behind review controls. The temporary file was removed after the screenshot.

The final reader-facing version is `cursor-review-flow.png`. It follows the information hierarchy used in Cursor's official product image while showing this project's genuine prompt, project rule, red and green diff, file tree, and review controls.

The temporary practice file was a disposable Markdown page created only to test the rule without changing published documentation. It was never part of the guide and was deleted before the screenshot work was committed.

The project-rule screenshot is saved as `cursor-project-rule.png`. It shows `.cursor/rules/documentation.mdc`, its matching file patterns, and the first documentation standards in the editor.

For each screenshot, use a wide layout, keep the relevant area readable, crop empty space, and give the file a descriptive name such as `cursor-agent-explanation.png`. Save the final images under `public/images/cursor/workflow/`.

## Link and button review

Tested on the published site:

- **Start the quickstart** opens `/quickstart`.
- **Add a project rule** opens `/guides/project-rules`.
- Sidebar page links point to the correct pages.
- The quickstart's next-step link opens the project-rule guide.
- The Cursor download, official rules, GitHub, and Thally links have the intended destinations.
- The footer **Get started** link opens the quickstart.

The sidebar labels **Start here** and **Practical guides** are navigation group headings, not buttons. They organise the page links beneath them and are intentionally not clickable. On a narrow screen, this can look like a broken interaction because the icons and bold text resemble controls.

If this confuses more testers, rename the groups to make their role clearer, for example **Getting started** and **Guides**, or add a landing page for each group. For this three-page assessment, adding group landing pages would create unnecessary content, so keeping the current structure is the better choice.

## Ideas to make the guide stand out

The current design is already strong enough for the assessment. It is focused, recognisably Cursor-inspired, responsive, and easy to scan. Improvements should demonstrate developer experience judgment rather than add decoration.

Recommended next improvements:

1. Keep the real Cursor workflow screenshots current when the product interface changes.
2. Add a short **What you will accomplish** checklist near the start of the quickstart so the finish line is visible before the steps.
3. Add one downloadable example rule or link to the exact example file in GitHub. This turns a code sample into something readers can reuse.
4. Add a small **Tested with** note containing the Cursor version and date. Cursor changes quickly, so this gives readers useful freshness context.
5. Add a concise changelog only if the guide will continue after the assessment. Do not add an empty section just to appear larger.

Implementation status:

- The **What you will accomplish** checklist has been added to the quickstart.
- A reusable example rule is available at `/examples/documentation.mdc` and linked from the practical guide.
- A changelog was intentionally not added because this focused assessment does not yet have an ongoing release history.
- Signed-in Cursor workflow screenshots now show the explanation prompt, project rule, proposed red and green diff, and review controls.

The Cursor workflow was completed in a signed-in desktop session using the public assessment repository. The guide uses the real prompt, response, project rule, proposed diff, and review controls rather than a staged response.

Font recommendation: keep Inter for body and headings. It is readable, loads reliably, and lets the content lead. JetBrains Mono or another monospaced font would work well for code and small metadata, but using a monospaced font for all prose would make the task guides slower to read. Cursor Sans and Berkeley Mono should not be copied because they are not distributed with this project.

Visual recommendation: keep the warm neutral palette and `sharp` theme. A bright accent colour would make the site less faithful to Cursor's restrained interface. The strongest way to stand out is through clear outcomes, real screenshots, honest troubleshooting, tested links, and visible proof that the workflow works.

## Validation workflow

Install the pinned checker:

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
```

Run the documentation check:

```bash
.github/thally-tooling/node_modules/.bin/thally check --ci .
```

Run the project tests and production build:

```bash
npm test
npm run build
```

Expected result from the initial reviewed guide:

- Thally check: 0 errors and 0 warnings
- Tests: 1,673 passed and 8 skipped
- Production build: successful

## Friction log

### Network access in the local environment

Package and repository downloads initially failed because restricted network access could not resolve external hosts. Retrying the approved commands with network access resolved the issue.

### Repository mismatch

The first completed guide was pushed to `Tabintel/cursor-guides`, but the live site was connected to `Tabintel/cursor`. Checking `https://cursor.thally.app/api/site-config` exposed the mismatch.

### Starter test contracts

Removing every API seed page caused one framework test to fail because the starter expected a non-empty API route parameter. We restored one hidden seed page without adding an irrelevant API section to the public navigation.

### Homepage contract

The starter's server-rendering test expected the homepage to use Thally's semantic `Hero` component and contain a substantial heading hierarchy. We updated the introduction to use `mode: home` and `<Hero>`.

### Local preview warning

The local preview logged a Next.js warning about synchronous access to `searchParams` in a framework-owned route. The pages still loaded, all tests passed, and the production build succeeded.

We did not patch the generated runtime code in the customer repository. Runtime fixes must come through a Thally framework update.

## What worked well

- Thally gave us a complete docs-as-code project and managed deployment path.
- MDX components made the quickstart and homepage easier to scan.
- The pinned checker caught content and navigation problems early.
- Tests caught assumptions that a successful page build did not expose.
- The same source publishes HTML, Markdown, search, agent discovery files, and MCP surfaces.

## What could improve

- Show the live repository, branch, and commit more prominently in the Cloud overview.
- Warn when the connected production repository differs from a repository recently opened or selected by the user.
- Show managed branding overrides beside source-controlled defaults.
- Make stale deployment detection visible without requiring an API check.
- Remove the local `searchParams` warning in a future runtime update.
- Make common Hero controls, including heading width and desktop wrapping, configurable through `docs.json`. The default `17ch` limit wrapped our short title on desktop, so we used the customer-owned component layer instead of editing runtime files.

## Article location

The article draft is stored at `submission/article.md`.

Before publishing it:

1. Add the remaining screenshots from the checklist.
2. Replace any temporary observations with the final deployment result.
3. Confirm the live commit and URL.
4. Read the article aloud and simplify anything that sounds formal or repetitive.

## Submission checklist

- [ ] Live site shows the Cursor Guide pages.
- [ ] Live site uses the Cursor-inspired light and dark themes.
- [ ] Logo and favicon work in both modes.
- [ ] Quickstart has been followed from beginning to end.
- [ ] Project-rule example has been tested in Cursor.
- [ ] Required screenshots have been added.
- [ ] Article has been published.
- [ ] Live site, repository, and article links are ready.
- [ ] Three brief observations are ready for the email.
- [ ] The deployed commit matches the reviewed `main` commit.
