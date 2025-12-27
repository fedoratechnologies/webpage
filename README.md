# Fedora Technologies Marketing Site

Static marketing site for **Fedora Technologies**, designed to be hosted from a GitHub repository and fronted by Cloudflare (Workers or Cloudflare Pages).

## Project structure

- `public/` – The static site served to visitors.
  - `public/index.html` – Home page (high-level overview + calls to action).
  - `public/services.html` – Detailed service offerings.
  - `public/approach.html` – Philosophy + how we work + process.
  - `public/about.html` – Company overview, who we serve, why Fedora, commitment.
  - `public/contact.html` – Contact page with mailto-based form (static-friendly).
  - `public/responsible-marketing.html` – Responsible marketing statement.
  - `public/privacy.html` – Privacy overview for this static site.
  - `public/styles.css` – Site styling.
  - `public/main.js` – Site JavaScript (nav, active state, mailto form).
  - `public/assets/logo.png` – Your logo (used in header/footer + favicon).
- `src/index.js` – Cloudflare Worker that serves the static assets.
- `wrangler.jsonc` – Cloudflare Wrangler config (entrypoint + assets directory).

## Getting started

1. Replace `public/assets/logo.png` with your real logo (recommended: square-ish mark or wordmark that looks good at small sizes).
2. Preview locally:
   - `cd public && python3 -m http.server 5173`
   - Open `http://localhost:5173`

You can customize copy, links, and contact details directly in the HTML pages.

## GitHub Pages hosting

This repo is currently organized for Cloudflare Workers (static files live in `public/`). For GitHub Pages, either:

- Move the contents of `public/` to the repo root, then enable Pages for `main` / `/ (root)`, or
- Set up a GitHub Action to publish `public/` to Pages.

## Fronting the site with Cloudflare

You have two common patterns:

### Option A: Cloudflare Pages (GitHub-connected)

This is the simplest option.

1. In Cloudflare, go to **Pages → Create a project**.
2. Connect your GitHub account and select this repository.
3. Build configuration:
   - **Framework preset**: *None (static)*.
   - **Build command**: (leave empty).
   - **Build output directory**: `/` (root).
4. Deploy. Cloudflare will give you a `*.pages.dev` URL.
5. (Optional) Attach your custom domain and configure DNS in Cloudflare.

Cloudflare will automatically cache and serve the static files globally.

### Option B: Cloudflare Worker proxying GitHub Pages

If you prefer to keep GitHub Pages as the origin and place a Worker in front:

1. Ensure your GitHub Pages URL is live (for example `https://fedoratechnologies.github.io/webpage/`).
2. In Cloudflare, create a new Worker with code like:

   ```js
   export default {
     async fetch(request) {
       const url = new URL(request.url);
       const origin = "https://fedoratechnologies.github.io/webpage";
       url.hostname = new URL(origin).hostname;
       url.pathname = new URL(origin + url.pathname).pathname;
       return fetch(url.toString(), request);
     },
   };
   ```

3. Deploy the Worker and map it to a route on your domain (for example `https://it.fedoratechnologies.com/*`).
4. Point the DNS for that hostname at Cloudflare (orange cloud enabled).

The Worker will proxy all traffic to your GitHub Pages origin while letting you add Cloudflare features (security rules, caching, logging, etc.).

## Deploying with Cloudflare Workers (Wrangler)

This repo is configured for `npx wrangler deploy` and serves the contents of `public/` from a Cloudflare Worker.

## Customizing the site

- Update email and contact details in `contact.html` and the footer across pages.
- Replace or extend sections with additional offerings, industries served, or case studies.
- The contact form is static-friendly and uses `mailto:`; to use a hosted form, replace the form handler in `main.js` (or set a real `action`).
- If you want to align to responsible marketing guidelines, edit `responsible-marketing.html` and `privacy.html` to match your preferred language and jurisdiction.

If you tell me your preferred contact email, phone, and social links, I can pre-wire those into the site. 
