/**
 * Interchange treats each part of church life as a transit line.
 * Groups and pages are matched to a line by their file name (id).
 */
export const LINES = {
  sunday: { code: 'S', name: 'Sunday line', color: '#e2231a' },
  teens: { code: 'K', name: 'Kids & teens line', color: '#f2a300' },
  'young-adults': { code: 'Y', name: 'Young adults line', color: '#00965e' },
  'worship-circle': { code: 'W', name: 'Worship circle line', color: '#8a3ffc' },
  'bible-study': { code: 'B', name: 'Bible study line', color: '#0071c1' },
  prayer: { code: 'P', name: 'Prayer line', color: '#00a3ad' },
} as const;

export type LineId = keyof typeof LINES;

const PAGE_LINES: Record<string, LineId> = {
  'sunday-service': 'sunday',
  'new-to-bicf': 'sunday',
  'kids-and-teens': 'teens',
  'young-adults': 'young-adults',
  'worship-circle': 'worship-circle',
  'prayer-box': 'prayer',
};

export const lineForGroup = (id: string) => LINES[id as LineId] ?? { code: 'B', name: 'Line', color: '#0e1b3d' };
export const lineForPage = (id: string) => (PAGE_LINES[id] ? LINES[PAGE_LINES[id]] : undefined);
