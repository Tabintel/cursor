# Cursor Guide

An independent, task-focused guide for developers who are new to Cursor.

The guide helps you use Cursor Agent to understand a project, make one focused change, review the diff, verify the result, and add reusable project instructions.

## Read the guide

[cursor.thally.app](https://cursor.thally.app/)

## Documentation

- `src/content/introduction.mdx` explains the guide and its audience.
- `src/content/quickstart.mdx` walks through a first reviewed change.
- `src/content/guides/project-rules.mdx` shows how to create and verify a project rule.
- `docs.json` controls the task-based navigation and brand assets.
- `src/data/site.ts` contains the site identity and colour palettes.
- `submission/article.md` contains the technical article draft.
- `submission/working-notes.md` records the process and lessons.

## Run locally

```bash
npm ci
npm run dev
```

Open [http://localhost:3040](http://localhost:3040).

## Validate changes

```bash
npm ci --ignore-scripts --prefix .github/thally-tooling
.github/thally-tooling/node_modules/.bin/thally check --ci .
npm test
npm run build
```

## Sources

- [Cursor quickstart](https://cursor.com/docs/get-started/quickstart)
- [Cursor rules](https://cursor.com/docs/rules)
- [Thally quickstart](https://docs.thally.io/quickstart)

## Disclaimer

This is an independent learning project. It is not an official Cursor publication. Cursor names, marks, and visual references belong to Cursor and Anysphere.

## License

[MIT](LICENSE)
