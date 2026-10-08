# SnipStik website

The public product site for **SnipStik**, by **Servin Systems**:
**https://snipstik-web.snipstik.workers.dev**.

Plain HTML, CSS and a small vanilla JavaScript file. No framework, npm, build step,
backend, analytics, trackers, cookies, external fonts or runtime dependencies.
The current goal is Android closed-beta recruitment; the structure remains a
permanent product site rather than a beta-specific application.

## Files

- `index.html`: product hero, five-step beta access guide, optional checklist,
  Spanish help, product walkthrough placeholder, FAQ, approved reward terms,
  privacy summary and social metadata.
- `styles.css`: existing dark/violet identity, responsive cards, touch targets,
  keyboard focus and reduced-motion support.
- `script.js`: public `SITE_CONFIG` links and a local-only manual checklist.
- `privacy.html`: on-device processing, beta data, checklist storage, Google
  services, contact and deletion requests.
- `.nojekyll`: direct static hosting on GitHub Pages.
- `assets/`: approved icon, favicon, Apple touch icon and social artwork.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Stop with Ctrl+C. Python is only a preview
convenience, never a deployment requirement. All content and access links work
without JavaScript; JavaScript enables the optional checklist.

## Beta flow and public links

Keep these destinations in **`SITE_CONFIG` at the top of `script.js`**:

| Setting | Purpose |
| --- | --- |
| `betaFormUrl` | Google Form: collect beta interest/device information |
| `groupUrl` | Google Group: the visitor joins the tester group |
| `testingUrl` | Google Play testing page: the visitor opts in |
| `storeUrl` | Play Store listing: install/open after opting in |
| `privacyUrl` | Local `./privacy.html` page |
| `contactUrl` | `mailto:servinsystems@gmail.com` |

The access order is **Form → Group → Google Play opt-in → Install → Feedback**.
Visitors need the same Google account for the group and Play. Membership can take
a moment to appear: join the group, wait briefly and reopen the testing link.
Submitting the form does **not** automatically enroll a tester. This site does
not change Google Forms, Google Groups or Play Console configuration.

Native HTML `href` values deliberately contain the same real destinations so the
flow also works without JavaScript. When changing a URL, update its configuration
and matching HTML fallbacks. External HTTPS links open in a new tab with
`noopener noreferrer`; email opens the user's mail app. Invalid configuration
preserves the native fallback. Never put secrets in these public files.

## Optional beta checklist

Visitors manually mark five completed steps. Clicking an outbound link never
marks a step or pretends to verify enrollment. The key
**`snipstik.betaChecklist.v1`** in `localStorage` contains only five booleans,
not email, device data or form responses. Progress is never transmitted.

State persists in that browser across reloads. **Reset checklist** clears the
saved key. Invalid saved data is ignored. If storage is blocked/full, the checklist
continues working on the current page with an explanatory note. Without
JavaScript it is hidden; the full access guide and links remain usable.

The privacy page discloses this optional local storage. No cookies, session
storage, analytics or background requests are introduced.

## Cloudflare deployment

This site is currently public at the Workers URL above. Keep the existing
Cloudflare project and its repository integration; no new framework or server is
needed. Deploy the repository-root static files using the project's existing
Workers static-assets/Pages setup. A Git push does not by itself prove a
Cloudflare deployment has succeeded: check the project's deployment status.

For a new **Cloudflare Pages** project:

1. Connect `ezeservin07-collab/snipstik-web`, branch `main`.
2. Framework preset: **None**. Build command: **leave empty**.
3. Build output directory: **`.`** (repository root). Root directory: leave empty.
4. Deploy. No Functions, bindings or backend are required.

Pages Direct Upload also works with the root static files. Never upload `.git`
or private local files. A custom domain is optional.

## GitHub Pages

1. Open repository **Settings → Pages**.
2. Choose **Deploy from a branch**.
3. Select **`main`** and **`/ (root)`**, then Save.
4. Wait for deployment and use the URL shown in Settings.

`.nojekyll` enables direct static hosting. Styles, scripts, assets and privacy
links are relative and work at `/snipstik-web/` as well as a domain root.

## Canonical URL and social previews

Both HTML heads use the actual public URL for canonical/Open Graph page URLs and
absolute URLs for `assets/snipstik-social.jpg`. Privacy has its own
`/privacy.html` canonical. Title, description, viewport, theme-color, Open Graph,
Twitter metadata and image alt text are included.

If the public domain changes, update both HTML heads: canonical, `og:url`,
`og:image` and `twitter:image`. Do not invent a domain or social handle.

## Product demo and approved branding

Replace the marked **`figure.demo-panel` inner content in `index.html`** with a
real short product video/poster when available. The current illustration is
explicitly a placeholder, not a working player or fabricated screenshot.
Prefer a small local MP4/WebM, compressed poster, `controls`, `playsinline` and
`preload="none"`. Keep width fluid and reserve its aspect ratio. No autoplay or
third-party player. Provide captions/transcript for meaningful audio.

Approved assets remain unchanged:

- `assets/snipstik-icon.png`: 192×192 PNG for header/demo.
- `assets/favicon.png`: 32×32 PNG.
- `assets/apple-touch-icon.png`: 180×180 opaque PNG.
- `assets/snipstik-social.jpg`: original approved 1280×1280 JPEG.

The original attachment was JPEG despite being described as PNG. The UI icon
reuses the approved Android raster with exterior black corners removed; its
central violet/white artwork is preserved. No replacement logo, icon library or
font service is needed.

## Content and checks

The full Founding Tester Reward section preserves the approved terms: first 30
eligible completed testers, required full testing period, genuine testing,
static/animated testing when supported and requested feedback. One reward per
Google Play account, non-transferable, no positive review/public rating required,
no reward guaranteed merely for joining. Pro remains a future offering.

Preview both pages at 320, 390, 768 and 1440 px, plus 200% text size. Check:

- no horizontal overflow, readable cards and early primary CTA;
- keyboard access, visible focus and reduced-motion behavior;
- all five access-step destinations, FAQ, Spanish help and privacy/contact links;
- checklist 0/5 → checked steps → reload → Reset, blocked storage and invalid data;
- no JavaScript errors, missing images, invalid anchors or third-party startup requests;
- native links without JavaScript and hosting under a project path.

Cloud browser tests verify destinations without submitting a form or joining any
group. Google's availability, account eligibility and membership propagation
must also be checked with a real tester account. Mobile browser checks are not a
claim of physical TikTok in-app-browser testing. After deployment, open the public
site and follow the flow on Android; confirm that the existing Google Group and
Play Console enrollment settings match it. No store configuration is changed by
this repository.
