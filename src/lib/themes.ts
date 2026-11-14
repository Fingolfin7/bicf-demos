/**
 * The four demo designs. Each one is a folder in src/themes with its own
 * layout, components and CSS, and they all read the same content.
 * In production you keep one theme and delete the others.
 */
import { BASE } from './base';

export const THEMES = [
  {
    id: 'gathering',
    name: 'Gathering',
    pitch: 'Warm and photo-led, in BICF’s own slate blue and navy. Big real photos, rounded shapes and a calm, friendly voice taken from the current site.',
  },
  {
    id: 'crossroads',
    name: 'Crossroads',
    pitch: 'Built from the BICF logo. The blue cross becomes the layout itself: it splits the home page into Brno, International, Christian and Fellowship.',
  },
  {
    id: 'hall',
    name: 'The Hall',
    pitch: 'Warm and documentary, like walking into Maják on a Sunday. Timber tones, string lights and real photos of the room and the people in it.',
  },
  {
    id: 'five',
    name: 'Sunday at Five',
    pitch: 'Dark and musical, lit like BICF’s own stage. Violet, magenta and amber, with a live countdown to five o’clock on Sunday.',
  },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

/** Build a link inside a theme: link('five', 'visit') -> /five/visit/ */
export const link = (theme: string, path = '') => `${BASE}/${theme}/${path ? path.replace(/^\/|\/$/g, '') + '/' : ''}`;
