

# Nirmayana Cloth Commerce – Pricing Site (React + Vite + Tailwind)

## Run locally
    npm install
    npm run dev

## Deploy on Cloudflare Pages (GitHub)
- Framework preset: Vite (or build command `npm run build`, output directory `dist`)
- Secrets: `RESEND_API_KEY`, `ENQUIRY_TO` (optional `FROM_EMAIL`)
- `functions/api/enquiry.js` becomes `POST /api/enquiry` automatically.

Never commit API keys or the recipient address.
