/**
 * Responsive image attributes. Bundled photos ship with a small "-sm"
 * version; images uploaded through the CMS are resized on upload
 * (see media_libraries in src/cms/config.yml) and used as-is.
 */
import { withBase } from './base';

export function img(src: string | undefined, sizes = '100vw') {
  if (!src) return {};
  const m = /^\/media\/bicf\/(.+)\.webp$/.exec(src);
  if (!m) return { src: withBase(src) };
  return { src: withBase(src), srcset: `${withBase(`/media/bicf/${m[1]}-sm.webp`)} 720w, ${withBase(src)} 1200w`, sizes };
}
