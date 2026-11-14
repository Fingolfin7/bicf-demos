/**
 * The site can live at the domain root (bicf.cz) or in a sub-folder
 * (a GitHub Pages preview at /bicf-demos/). Every root-relative path
 * goes through withBase() so both work. Set BASE_PATH when building.
 */
export const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function withBase(path: string): string;
export function withBase(path: string | undefined): string | undefined;
export function withBase(path: string | undefined) {
  if (!path || !path.startsWith('/') || path.startsWith('//')) return path;
  if (BASE && (path === BASE || path.startsWith(BASE + '/'))) return path;
  return BASE + path;
}
