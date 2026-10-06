# SnipStik website

The public product site for **SnipStik**, by **Servin Systems**. Its current call to
action recruits Android beta testers. This is a plain static site, not a beta-only
application: the content and CTA can evolve into the permanent product site.

No framework, npm, build step, backend, forms database, analytics, trackers, cookies,
external fonts or runtime dependencies. HTML/CSS render the content; the small local
JavaScript file applies public outbound-link configuration. No information is
submitted on this site.

## Files

- `index.html`: semantic page, product/demo placeholder, beta/reward/privacy copy
  and social metadata.
- `styles.css`: responsive dark-first design, fixed violet accents, system fonts,
  keyboard focus and reduced-motion support.
- `script.js`: **the single configuration point for the beta form URL**, plus
  optional Privacy Policy/contact URLs. No network calls or persistent storage.
- `assets/`: approved SnipStik icon, favicon, Apple touch icon and social artwork.

## Local preview

From the repository root, using Python 3:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000`. Stop the server with Ctrl+C. Opening `index.html`
directly also works. Python is only a preview convenience, never a deploy requirement.

## Configure signup and utility links

Edit **`SITE_CONFIG` at the top of `script.js`**:

```js
const SITE_CONFIG = Object.freeze({
  betaFormUrl: "https://forms.gle/YOUR_REAL_FORM_LINK",
  privacyUrl: "",
  contactUrl: "",
});
```

Replace the existing literal **`BETA_FORM_URL`** with your real HTTPS Google Form
URL. All beta CTAs update from this one setting. There is no fake backend form.
With the placeholder or an invalid URL, links stay within the page and the visible
notice explains that the signup link is coming soon. With a valid URL they open
the form in a new tab with `noopener noreferrer`. This website does not submit or
store form responses; configure and administer the Google Form separately.

Set `privacyUrl` to the actual HTTPS policy URL when available. Set `contactUrl`
to an actual HTTPS contact page or `mailto:` address. Until then, the links point
to clearly identified in-page placeholders. No legal/contact address is invented.
These values are public; **never put credentials or private values in this file**.
Without JavaScript the page remains readable, but outbound configured links need
JavaScript; a noscript explanation is included.

Before opening testing, supply the policy/contact links, make sure the signup form
explains the actual required testing period and feedback process, and review that
the reward terms match your program. Pro is explicitly a future offering; this
page makes no claim that Pro or a Play Store public launch already exists.

## Cloudflare Pages

1. Connect `ezeservin07-collab/snipstik-web` using Pages' Git integration.
2. Choose the branch you intend to publish (`main` currently).
3. Framework preset: **None**. Build command: **leave empty**.
4. Build output directory: **`.`** (repository root). Root directory: leave empty.
5. Deploy. Pages serves the static files; no Functions, bindings or backend needed.

Alternatively upload the repository-root static files through Pages Direct Upload.
Do not upload `.git` or private local files. A custom domain is optional.

## GitHub Pages

1. Open repository **Settings → Pages**.
2. Under Build and deployment select **Deploy from a branch**.
3. Select **`main`** and **`/ (root)`**, then Save.
4. Wait for GitHub's Pages deployment to finish and use the URL shown in Settings.

`.nojekyll` ensures direct static hosting. Assets/styles/scripts use relative URLs,
so they also work at a project path such as `/snipstik-web/`. No Actions workflow,
npm installation or build process is required. Publishing is separate from committing
the site; repository visibility/account settings may affect Pages availability.

## Domain and social previews

The head contains title/description/viewport/theme-color, Open Graph and Twitter
metadata, including image alt text. The current local social-image paths and
`og:url` are preview-safe relative URLs because no public domain was supplied.
**Once the real domain/Pages URL is known**, change `og:url` to the absolute public
page URL and `og:image`/`twitter:image` to the absolute URL of
`assets/snipstik-social.jpg` in `index.html`. Add a canonical link for that same
public URL if desired. Social crawlers read HTML and may not resolve relative
image URLs; do this before sharing the public launch link. No invented domain or
social handle is included.

## Product demo

Replace the marked **`figure.demo-panel` inner content in `index.html`** with a
real short product video/poster. The current illustration is explicitly labeled
as a placeholder, not a working player or a fabricated product screenshot.

Prefer a small local MP4/WebM with a compressed poster, `controls`, `playsinline`
and `preload="none"`. Keep the video's width fluid and give it an aspect ratio to
avoid layout shift. Do not autoplay or embed a third-party player/tracker. Keep an
accessible caption and supply captions/transcript for any meaningful audio. The
landing page needs no video to load or function today.

## Approved branding

The approved artwork from the SnipStik Android project is already integrated:

- `assets/snipstik-icon.png`: 192×192 PNG for the header/demo.
- `assets/favicon.png`: 32×32 PNG.
- `assets/apple-touch-icon.png`: 180×180 opaque PNG.
- `assets/snipstik-social.jpg`: exact original approved 1280×1280 JPEG.

The original attachment was JPEG despite being described as PNG. No replacement
logo or font was invented. The UI icon reuses the approved Android raster with
exterior black corners removed; the central violet/white artwork is preserved.
For a future approved source asset, keep it under `assets/`, update these derived
images and their HTML dimensions/references, and preserve proportions. Do not add
a font service, icon library or a new logo approximation.

## Verification

Preview in a current browser at 320, 390, 768 and desktop widths. Check keyboard
navigation/visible focus, reduced-motion preference, 200% text zoom, all anchors,
and the three-step/reward/privacy text. In browser Network/Storage, confirm only
local resources are loaded and no cookies/local storage are created. Test the
default missing-form notice and then the configured Google Form URL on both CTAs.
Also test the project-path deployment, not only a domain root. No dependencies or
test runner are required to ship this site.

Cloud verification used the existing Chromium/Playwright tools, without adding any
project dependencies: 320/360/390/412/768/1024/1440 px and simulated 200% text scaling
had no horizontal overflow; no browser script errors, broken images or invalid
in-page targets. All links were keyboard-reachable with visible focus. Reduced
motion, no-JavaScript fallback, project-path hosting and both configured/missing/
unsafe signup URL cases passed. Initial requests were local-only and no cookies or
local/session storage were created. Main action contrast is 4.54:1; body/support
text exceeds 9:1 on the primary surfaces. HTML/CSS/JS total about 22 KB before
compression, plus the reused 34 KB UI icon; the social image is not loaded by the page.
These are browser checks, not a claim of physical TikTok in-app-browser testing.

Remaining launch inputs: real Google Form, real policy/contact links, final public
URL for social metadata, and optionally the actual product demo. Do not add fake
testimonials, launch claims, analytics or monetization to fill those gaps.
