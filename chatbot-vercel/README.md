# Chatbot API

This folder is a separate Vercel project for the portfolio chatbot.

## Endpoint

`POST /api/chat`

Request body:

```json
{
  "messages": [
    { "role": "user", "content": "Tell me about your thesis project." }
  ]
}
```

Response:

```json
{
  "reply": "..."
}
```

## Environment Variables

- `GROQ_API_KEY`
- `GROQ_MODEL` optional, defaults to `llama-3.3-70b-versatile`

## Deploy on Vercel

1. Create a new Vercel project.
2. Set the root directory to `chatbot-vercel`.
3. Add `GROQ_API_KEY` in the Vercel environment variables.
4. Leave the framework preset as `Other` and let Vercel detect the `api/` folder.
5. Deploy.
6. Copy the resulting API URL and set `NEXT_PUBLIC_CHATBOT_API_URL` in the portfolio site, for example `https://your-project.vercel.app/api/chat`.