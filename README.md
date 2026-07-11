# Jermaine Pasamba Portfolio

Modern Next.js portfolio with centered layouts, concise project titles, responsive cards, and a session-only chatbot.

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

## Chatbot

The floating chatbot uses session storage only, so each visitor gets a fresh conversation per browser session.
If you want Groq-powered replies, set `NEXT_PUBLIC_CHATBOT_API_URL` to your Vercel endpoint that returns `{ "reply": "..." }`.
