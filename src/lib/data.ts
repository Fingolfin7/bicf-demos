import { getCollection, getEntry, render } from 'astro:content';

/** Shared data access for every theme. Themes never read files directly. */

export async function getSettings() {
  const entry = await getEntry('settings', 'site');
  if (!entry) throw new Error('src/content/settings.json is missing');
  return entry.data;
}

const DAY_ORDER = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export async function getGroups() {
  const groups = await getCollection('groups');
  return groups
    .map((g) => ({ id: g.id, ...g.data }))
    .sort((a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day) || a.time.localeCompare(b.time));
}

/** Events from today onwards (build time), soonest first. */
export async function getUpcomingEvents(limit?: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const events = (await getCollection('events'))
    .filter((e) => e.data.date >= today)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime())
    .map((e) => ({ id: e.id, ...e.data }));
  return limit ? events.slice(0, limit) : events;
}

export async function getEvents() {
  return (await getCollection('events'))
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

export async function getPages() {
  return (await getCollection('pages')).sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export type Section = 'join-in' | 'who-we-are';

async function getMenus() {
  const entry = await getEntry('menus', 'main');
  if (!entry) throw new Error('src/content/menus.json is missing');
  return entry.data;
}

/** The pages in a menu list, in the editor's order. Ids of deleted pages are skipped. */
async function pagesIn(ids: string[]) {
  const all = await getPages();
  return [...new Set(ids)].flatMap((id) => {
    const page = all.find((p) => p.id === id);
    if (!page) console.warn(`Menus: there is no page called "${id}", so it is left out.`);
    return page ? [page] : [];
  });
}

export async function getNavPages(section: Section) {
  const m = await getMenus();
  return pagesIn(section === 'join-in' ? m.joinIn : m.whoWeAre);
}

/** The Join in / Who we are list a page belongs to, if any. */
export async function getSectionOf(id: string): Promise<Section | undefined> {
  const m = await getMenus();
  if (m.joinIn.includes(id)) return 'join-in';
  if (m.whoWeAre.includes(id)) return 'who-we-are';
  return undefined;
}

/** The pages in the top bar's More drop-down, in the editor's order. */
export async function getMorePages() {
  return pagesIn((await getMenus()).more);
}

export async function getThoughts() {
  return (await getCollection('thoughts')).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getSignups() {
  return (await getCollection('signups')).sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
}

export async function getForm(id: string | undefined) {
  if (!id) return undefined;
  const form = await getEntry('forms', id);
  return form ? { id: form.id, ...form.data } : undefined;
}

export { render };

/* ---------- formatting helpers ---------- */

const TZ = 'Europe/Prague';

export function formatDate(d: Date, style: 'long' | 'short' | 'weekday' = 'long') {
  const opts: Intl.DateTimeFormatOptions =
    style === 'short'
      ? { day: 'numeric', month: 'short', timeZone: TZ }
      : style === 'weekday'
        ? { weekday: 'long', day: 'numeric', month: 'long', timeZone: TZ }
        : { day: 'numeric', month: 'long', year: 'numeric', timeZone: TZ };
  return new Intl.DateTimeFormat('en-GB', opts).format(d);
}

export function dayNumber(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', timeZone: TZ }).format(d);
}

export function monthShort(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { month: 'short', timeZone: TZ }).format(d);
}

export function weekdayShort(d: Date) {
  return new Intl.DateTimeFormat('en-GB', { weekday: 'short', timeZone: TZ }).format(d);
}

/** "17:00" -> "5 pm" for friendlier copy. */
export function friendlyTime(t: string) {
  const m = /^(\d{1,2}):(\d{2})$/.exec(t.trim());
  if (!m) return t;
  const h = Number(m[1]);
  const min = m[2];
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return min === '00' ? `${h12} ${suffix}` : `${h12}:${min} ${suffix}`;
}

export function slotsSummary(slots: { capacity: number; taken: number }[]) {
  const capacity = slots.reduce((s, x) => s + x.capacity, 0);
  const taken = slots.reduce((s, x) => s + Math.min(x.taken, x.capacity), 0);
  return { capacity, taken, open: capacity - taken };
}
