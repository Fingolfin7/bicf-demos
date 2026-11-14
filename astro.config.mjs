// @ts-check
import { defineConfig } from 'astro/config';

// Static output: the whole site builds to plain HTML/CSS/JS files that any
// free static host (Cloudflare Pages, Netlify, GitHub Pages) can serve.
// SITE_URL and BASE_PATH let the same code build for a sub-folder preview,
// e.g. GitHub Pages at https://<user>.github.io/bicf-demos/.
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.bicf.cz',
  base: process.env.BASE_PATH ?? '/',
  output: 'static',
  devToolbar: { enabled: false },
});
