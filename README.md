# Fedora Technologies Marketing Site

Static marketing site for **Fedora Technologies**, designed to be hosted from a GitHub repository and fronted by Cloudflare (Workers or Cloudflare Pages).

## Project structure

- `index.html` – Home page (high-level overview + calls to action).
- `services.html` – Detailed service offerings.
- `approach.html` – Philosophy + how we work + process.
- `about.html` – Company overview, who we serve, why Fedora, commitment.
- `contact.html` – Contact page with mailto-based form (static-friendly).
- `styles.css` – Custom responsive styling inspired by modern MSP sites (dark, teal-focused aesthetic).
- `main.js` – Lightweight enhancements (mobile nav, smooth scrolling for in-page anchors, active nav state, footer year, mailto form handler).
- `assets/logo.svg` – Placeholder logo file (replace with your real logo).

## Getting started

1. Replace `assets/logo.svg` with your real logo (SVG preferred). If you have a PNG, either convert it to SVG or update the references in the HTML pages.
2. Preview locally:
   - `python3 -m http.server 5173`
   - Open `http://localhost:5173`

You can customize copy, links, and contact details directly in the HTML pages.

## GitHub Pages hosting

2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Save. GitHub will build and expose a Pages URL like:
   - `https://<your-github-username>.github.io/<repo-name>/`

Once that URL works, you have a publicly reachable static site.

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

## Customizing the site

- Update email and contact details in `contact.html` and the footer across pages.
- Replace or extend sections with additional offerings, industries served, or case studies.
- The contact form is static-friendly and uses `mailto:`; to use a hosted form, replace the form handler in `main.js` (or set a real `action`).

If you tell me your preferred contact email, phone, and social links, I can pre-wire those into the site. 
