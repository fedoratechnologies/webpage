# Fedora Technologies Marketing Site

Static marketing site for **Fedora Technologies**, designed to be hosted from a GitHub repository and fronted by Cloudflare (Workers or Cloudflare Pages).

## Project structure

- `index.html` – Single-page site with sections for services, philosophy, how we work, who we serve, and contact.
- `styles.css` – Custom responsive styling inspired by modern MSP sites (dark, teal-focused aesthetic).
- `main.js` – Lightweight enhancements (mobile nav, smooth scrolling, footer year, demo form handler).
- `assets/logo.svg` – Placeholder logo file (replace with your real logo).

## Getting started

1. Move this folder into a new GitHub repository (for example, `fedora-technologies-site`).
2. Inside the repo root, ensure these three files are present: `index.html`, `styles.css`, `main.js`.
3. Replace `assets/logo.svg` with your real logo (SVG preferred). If you have a PNG, either convert it to SVG or update the references in `index.html`.
4. Open `index.html` in a browser to preview the site locally (double-click or `python -m http.server`).

You can customize copy, links, and contact details directly in `index.html`.

## GitHub Pages hosting

1. Create a new GitHub repository and push this folder to the `main` branch.
2. In your repo, go to **Settings → Pages**.
3. Under **Build and deployment**, choose:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `/ (root)`
4. Save. GitHub will build and expose a Pages URL like:
   - `https://<your-github-username>.github.io/fedora-technologies-site/`

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

1. Ensure your GitHub Pages URL is live (for example `https://<user>.github.io/fedora-technologies-site/`).
2. In Cloudflare, create a new Worker with code like:

   ```js
   export default {
     async fetch(request) {
       const url = new URL(request.url);
       const origin = "https://<user>.github.io/fedora-technologies-site";
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

- Update email and contact details in `index.html` (footer and contact section).
- Replace or extend sections with additional offerings, industries, or case studies.
- If you add more JS or integrate with a form provider (HubSpot, Calendly, ServiceNow, etc.), wire that into `main.js` or directly into `index.html`.

If you tell me your preferred contact email, phone, and social links, I can pre-wire those into the site. 
