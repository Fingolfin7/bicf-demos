# BICF website: four demo designs

Four complete, working design directions for the new Brno International Christian Fellowship website. They all share one content store and one editor, so whichever design the church picks, the foundation stays the same.

| Demo | URL | Idea |
| --- | --- | --- |
| Gathering | `/gathering/` | Warm and photo-led, in the slate blue (#54699f), navy (#252f4f) and periwinkle (#a0beef) that bicf.cz uses. Rounded photos, a turning “Every Sunday” stamp and the welcome in the church's own words. First made in the earlier demo set, now rebuilt on this project's content, forms and sign-up sheets. |
| Crossroads | `/crossroads/` | Built from the BICF logo. Its blue cross becomes the layout: it divides the home page into **B**rno, **I**nternational, **C**hristian and **F**ellowship, and sets dates and directions in quarters. |
| The Hall | `/hall/` | Warm and documentary, like walking into the timber hall at Maják. String lights, honey and cream, and a photo walk through a Sunday evening. |
| Sunday at Five | `/five/` | Dark and musical, lit in the violet, magenta and amber of BICF's own stage photos. A live countdown to five o'clock, and a reel of the choirs and band. |

All four use BICF's real logo (redrawn as SVG in `src/components/Logo.astro`) and the church's own photos.

## Run it locally

You need [Node.js](https://nodejs.org) 22.23 or newer (24 LTS is fine).

```bash
npm install
npm run dev
```

On Windows you can just double-click `start-dev.cmd` instead. It installs everything on the first run, starts the server and opens your browser. To stop the server, close that window.

Open http://localhost:4321. The landing page links to all four demos. On every demo page, the **Design** switch in the bottom-left corner shows the same page in another design.

To build the production version:

```bash
npm run build      # outputs plain files to dist/
npm run preview    # serves dist/ locally
```

## Try the editor (CMS)

1. Keep `npm run dev` running.
2. In **Chrome or Edge**, open http://localhost:4321/admin/index.html.
3. Click **Work with Local Repository** and select this project folder.
4. Edit an event, add a page, or build a form. Saving writes straight into `src/content/`, and the dev site updates when you reload it.

The project folder is a git repository because Sveltia CMS requires one for local editing. Nothing has been committed.

## How it's built

```
src/
  content/            All the words and settings. This is what the CMS edits.
    settings.json     Service time, address, email, directions
    pages/            Ordinary pages (Markdown)
    events/           One-off events (Markdown). Past events hide themselves.
    groups/           Weekly schedule (YAML)
    signups/          Sign-up sheets with slots and capacities (YAML)
    forms/            Forms built question by question (YAML)
    thoughts/         "Going deeper" reflections (Markdown)
  content.config.ts   Schema: what fields each content type has
  components/         Shared: FormEngine, SignupEngine, Logo, RouteMap, DemoSwitcher
  lib/                Data access, dates, the Sunday countdown, image helper
  themes/<name>/      Each design: layout, page templates and one CSS file
  pages/<name>/       Routes for each design (thin files that call the theme)
archive/first-round/  Two of the first-round designs (Interchange, Stillwater). Not built.
media-src/bicf/       The original photo files the WebP versions were made from
public/
  admin/              The CMS (Sveltia) and its config.yml
  media/bicf/         BICF's own photos, from bicf.cz (WebP, with -sm versions)
  media/uploads/      Where photos uploaded through the CMS go
```

**Choosing one design** means deleting the other `src/themes/*` and `src/pages/*` folders, then moving the chosen design's routes to the site root. The content and CMS don't change.

### Tech choices

- **[Astro](https://astro.build) static site.** Every page is built ahead of time into plain HTML and CSS, with a little JavaScript only where something is interactive. That makes it fast on phones, hard to break, and leaves nothing to patch.
- **[Sveltia CMS](https://sveltiacms.app).** A free, open-source editor that runs in the browser. Volunteers get simple forms. Behind the scenes each save is a commit to the church's GitHub repository, which gives you full history and an undo for every change. Uploaded photos are converted to WebP and resized automatically.
- **Self-hosted fonts, no cookies, no analytics.** Public pages make no requests to Google or any other third party (only the /admin editor loads its script from a CDN). That keeps things simple under GDPR.
- **Forms and sign-up sheets are content.** An editor can create a new form question by question, or a sign-up sheet with slots and capacities, then attach it to a page or event. No code is needed.

## Hosting plan (free)

Recommended: **Cloudflare Pages** (free plan), connected to the church's GitHub repository.

1. An editor saves in the CMS, which commits to GitHub.
2. Cloudflare Pages notices the commit and rebuilds the site in about a minute.
3. The new version is live on `www.bicf.cz`.

| Need | Service | Cost |
| --- | --- | --- |
| Hosting, HTTPS, CDN | Cloudflare Pages | Free |
| Editor sign-in | Sveltia CMS Authenticator on Cloudflare Workers | Free |
| Form emails and sign-up counts | Cloudflare Pages Functions + D1 database (EU location) | Free tier |
| Content history and backups | GitHub (organisation owned by the church) | Free |
| Domain | Existing `bicf.cz` registration | Unchanged |

### What is still demo-only

- **Form submissions** are validated and show the thank-you message, but nothing is sent. Production needs a small Cloudflare Pages Function (about 50 lines) that emails the `sendTo` address. If the form's `storeEntries` is on, it also saves the entry to D1. Prayer requests are emailed only and never stored.
- **Sign-up counts** are remembered in your own browser only. In production the same function reads and writes the counts in D1, so everyone sees the same numbers. The `taken` numbers in the YAML files are sample data.
- **Editor sign-in** is set up for local use. Going live needs the GitHub repository and the free authenticator deployed, then `base_url` filled in `public/admin/config.yml`.

### Handover and maintenance

There's no server, database engine or plugins to update. Once it's live, the routine work is editing content. Occasionally (once a year is fine), someone technical can run `npm update` and push.

## Content to check before going live

The demos use real BICF details where the current site has them: the name, mission, the "Paths that cross" tagline, Sunday at 17:00, Maják, Dusíkova 5, and the denominational links. Everything else is **sample content** and needs checking or replacing: weekly group times and places, events, sign-up sheets, FAQs, reflections, and the `hello@bicf.cz` / `prayer@bicf.cz` addresses.

The walking directions and the route map follow the map BICF shows visitors: from Okružní, up Majdalenky past the BILLA, to Dusíkova. Check which tram and bus lines stop there, and whether the car park on Dusíkova is free to use on Sundays.

The photos and logo are BICF's own, taken from bicf.cz. Before launch, check that everyone is happy for these photos to be used, especially the ones with children.
