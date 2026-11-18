// The "More" drop-down in the top bar (MoreMenu.astro): close it on a click
// outside or on Escape, and keep only one open at a time.
const menus = [...document.querySelectorAll<HTMLDetailsElement>('[data-more]')];
document.addEventListener('click', (e) => {
  menus.forEach((m) => { if (m.open && !m.contains(e.target as Node)) m.open = false; });
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  menus.forEach((m) => {
    if (!m.open) return;
    m.open = false;
    m.querySelector('summary')?.focus();
  });
});
menus.forEach((m) => m.addEventListener('toggle', () => {
  if (m.open) menus.forEach((o) => { if (o !== m) o.open = false; });
}));
