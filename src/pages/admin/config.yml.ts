/**
 * The CMS settings, served at /admin/config.yml next to the editor.
 * The source is src/cms/config.yml; this fills in the site's address so
 * the editor's logo and "view site" link work both at the domain root
 * and in a sub-folder (the GitHub Pages preview at /bicf-demos/).
 */
import type { APIRoute } from 'astro';
import raw from '../../cms/config.yml?raw';

export const GET: APIRoute = ({ url }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const site = new URL(`${base}/`, url.origin).href;
  const body = raw.replaceAll('%SITE%', site).replaceAll('%BASE%', base);
  return new Response(body, { headers: { 'Content-Type': 'text/yaml; charset=utf-8' } });
};
