# Jermaine Pasamba Portfolio

Modern Next.js portfolio

## Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build the GitHub Pages export:

```bash
npm run build
```

## Deployment

The site is configured for GitHub Pages with a static export. Pushes to `main` trigger the workflow in `.github/workflows/deploy.yml`, which builds the app and publishes the `out/` folder.
