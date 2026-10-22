# SEO + AI-search audit — volunteertotanzania.com

Branch: `seo-2026` · Audited: 2026-10-22 · Scope: 26 HTML pages in the repo, plus live checks against https://www.volunteertotanzania.com

Phase 1 only: nothing on the site has been changed yet.

## Summary

The foundations are solid. Every page has a correct self-referencing canonical, `lang="en"`, viewport and charset. There are no stray `noindex` tags, all 25 real pages are in the sitemap, no internal links are broken, and HTTPS and www redirects work. Every page already has some JSON-LD.

The biggest wins are:

1. **Performance:** a 65 MB autoplay video on tour.html, a leftover `translator.js` that blocks rendering and calls an insecure third-party IP-tracking API, and 207 images without width/height.
2. **Rich data:** no Service, TouristTrip or FAQPage schema on the 20 pages that have FAQs, and every page shares the logo as its social image.
3. **Snippets:** 7 titles and 22 descriptions are too long, and 12 pages have a `twitter:description` that doesn't match the page.
4. **Facts:** three stay-length contradictions that need your decision.

| Priority | Count |
|---|---|
| High | 9 |
| Medium | 14 |
| Low | 10 |

---

## 1. Crawlability

| Page / file | Problem | Fix | Priority |
|---|---|---|---|
| robots.txt | OK: allows all and points to the sitemap. | No change. | — |
| sitemap.xml | All 25 real pages listed, none missing, none returning 404. But every `lastmod` (Oct 7–8) is older than the last commit (Oct 10), and there are many uncommitted edits. | Set `lastmod` to each file's real last-change date when releasing. | Med |
| vercel.json | `http://volunteertotanzania.com/` takes **2 hops** (http→https→www). `http://volunteertotanzania.com/opportunities` takes **3 hops**. | In the Vercel dashboard (Domains), redirect the apex straight to `https://www.`. A single hop can't be done from vercel.json alone. | Low |
| vercel.json | `/index.html` returns 200 instead of redirecting to `/`. The canonical covers it, but it's a duplicate URL. | Add a redirect `/index.html` → `/` (308). | Med |
| vercel.json | Trailing-slash variants (`/education.html/`) return 200, creating duplicates. | Add `"trailingSlash": false`. | Low |
| our_team.html:215 | An image is loaded from `placehold.co` (a "MANY MORE" placeholder). It's an external dependency and a fake image in the index. | Replace it with a local image or a styled text tile. | Med |
| bmcc / tecec pages | External link `https://tecec.or.tz/` timed out (unreachable during the check). `waghill.co.tz` returns 406 to bots (fine in browsers). | Recheck tecec.or.tz. If it's dead, remove or unlink it. | Low |
| All pages | Internal links: 0 broken, 0 missing anchors (852 links checked). | No change. | — |

## 2. Indexing

| Page | Problem | Fix | Priority |
|---|---|---|---|
| All | No `noindex` except 404.html (correct). | — | — |
| All | No orphan pages. The weakest-linked pages (in-links from other pages, menu excluded) are engineering, daycare-children, healthcare, mass-communication, geology and wildlife-conservation (4–6 each). | Add contextual links (see §5). | Med |
| Google index | Google still shows **old-site URLs and titles** (`/opportunities`, "OPPORTUNITIES - Volunteers of Tanzania"). | Not a code issue: submit the sitemap and request indexing in Search Console and Bing Webmaster Tools after release. The redirects for old URLs are already in place. | High (process) |
| `/` vs `/index.html` | Duplicate (see §1). | Redirect. | Med |

## 3. Technical SEO

| Page | Problem | Fix | Priority |
|---|---|---|---|
| All | `lang="en"`, viewport, charset: OK on all pages. | — | — |
| All except 404 | The favicon and apple-touch-icon are **AVIF only**. iOS doesn't use AVIF for touch icons, and Google search favicons need a widely supported format (PNG/ICO, multiple of 48 px). | Add `favicon.ico` + a 48×48 / 180×180 PNG generated from the logo, and keep the AVIF. | Med |
| 404.html | Works (404 status, noindex). Uses `logo.jpeg` and inline styles, with no shared menu. | Fine as is. | Low |
| index.html | `translator.js` loads **render-blocking** in `<head>`. It's leftover template code ("Welcome to the Manual") that calls `http://ip-api.com`: plain-HTTP mixed content that browsers block, and it sends visitor IPs to a third party. It overwrites `window.onload` and does nothing (no element uses `data-translate`). | Remove the script tag and the file. | High |
| All | No `http://` asset references. | — | — |

## 4. Titles & meta

Targets: title ≤ 60 characters, description ≤ 155.

| Page | Title len | Desc len | Problem | Priority |
|---|---|---|---|---|
| index.html | 71 | 204 | Both too long. og:title and twitter:title differ from the title. | High |
| community.html | 73 | 160 | Both too long. | Med |
| education.html | 63 | 183 | Both too long. | Med |
| safari-activities.html | 68 | 189 | Both too long. | Med |
| tour.html | 69 | 174 | Both too long. The page now also hosts the Tourism & Hospitality internship (mixed intent, see §8). | Med |
| conservation-lake-victoria.html | 61 | 176 | Both slightly long. | Med |
| daycare-children.html | 61 | 173 | Both slightly long. | Med |
| accommodation, bmcc, bujora, engineering, geology, healthcare, kageye, mass-communication, mwanza-city-tour, our_team, saut-visit, serengeti, tecec, ukerewe, wildlife | ≤ 60 | 156–198 | Descriptions too long (will be cut off in results). | Med |
| mwanza-activities, prices, zanzibar | OK | OK | — | — |
| bmcc, bujora, conservation, daycare, engineering, geology, kageye, mass-communication, saut, serengeti, tecec, ukerewe (12 pages) | — | — | `twitter:description` doesn't match the meta description. | Med |
| All 25 except safari-activities | — | — | `og:image` / `twitter:image` is the **logo** (`logo.jpeg`, 1024×957), not a page photo. | High |
| prices.html | — | — | Missing `twitter:image`. | Low |
| All | — | — | Brand suffix is inconsistent: "- Volunteers of Tanzania", "\| Volunteers of Tanzania" and "\| Volunteer to Tanzania". | Low |
| All | — | — | No duplicate titles or descriptions. | — |

## 5. Internal links

| Scope | Problem | Fix | Priority |
|---|---|---|---|
| All pages | 683 links are document-relative (`index.html#contact`, `education.html`), with 0 root-relative. They work, just inconsistently styled. | Switch to root-relative (`/#contact`, `/education.html`). **Trade-off:** root-relative links don't work when you open files straight from disk (file://). They do with any local server (`npx serve`, VS Code Live Server). Please confirm. | Low |
| 21 program/tour pages | Already have a "You might also be interested in" block with 5 links each, mostly well matched (Education ↔ Daycare ↔ TECEC ↔ BMCC; tours ↔ Mwanza activities). | Keep them. Fill the gaps below. | — |
| healthcare.html | Only 4 contextual in-links; Community ↔ Healthcare is linked, but no tour or other program points to it. | Add links from education and daycare-children. | Med |
| engineering / mass-communication / geology | Only linked from each other and community. | Link from education (mass-communication) and conservation-lake-victoria (geology). | Low |
| accommodation, prices, our_team | No related-links block. | Add a short "Related" line (Prices ↔ Accommodation ↔ main programs) using existing card/link styles. | Low |
| index.html | Home card "Tourism & Hospitality Internship" → tour.html (a tours page). | See §8. | Med |

## 6. Canonicals

| Page | Problem | Fix | Priority |
|---|---|---|---|
| All 25 indexable pages | Exactly one self-referencing absolute `https://www.` canonical, and `og:url` matches. | No change. | — |

## 7. Schema (JSON-LD)

All blocks parse as valid JSON.

| Page | Current | Missing / issue | Priority |
|---|---|---|---|
| index.html | `Organization`+`LocalBusiness` (`@id`, legalName, foundingDate 2018, address, geo, 2 contactPoints, sameAs ×3), `WebSite`, `FAQPage` (25 Q&A, matching the page) | Add `NGO` to the type. One FAQ answer ("combine volunteering with a safari or Zanzibar") differs slightly from the page text: sync it. The WebSite has no `publisher` link to the org. | Med |
| 24 subpages | `Organization` (no `@id`, no logo) + `BreadcrumbList` | The Organization is repeated as a separate entity on each page. Point it to `#organization` via `@id` instead. | Med |
| Program pages (education, healthcare, community, daycare, tecec, bmcc, conservation, wildlife, engineering, geology, mass-communication) | — | No `Service` with provider, areaServed Mwanza and offers (USD 295/week, already shown on these pages). | High |
| Tour pages (serengeti, zanzibar, ukerewe, bujora, kageye, saut, mwanza-city-tour, safari-activities, tour) | — | No `TouristTrip`. Most tour pages show no price, so leave offers out where none is stated. | Med |
| 20 pages with FAQ sections (all except index, accommodation, prices, our_team, safari-activities) | — | No `FAQPage`. Note: Google only shows FAQ rich results for government/health sites now, but Bing and AI assistants still use the markup. | Med |
| prices.html | — | Could carry an `Offer` (USD 295/week) on the Organization or Service. | Low |

## 8. Duplicate content & contradictions

| Pages | Problem | Fix | Priority |
|---|---|---|---|
| education.html | Quick-facts card says **"1 to 12+ weeks"**, but the same page's FAQ (and the site-wide FAQ) says **1–24 weeks**. | **Needs your confirmation** (see "Facts to confirm"). | High |
| healthcare.html | Quick-facts card says **"2 to 12+ weeks"**, while the site says 1–24 weeks. A 2-week minimum may be intentional for healthcare. | **Needs your confirmation.** | High |
| wildlife-conservation.html | Card says **1–24 weeks**, but the About text says "runs flexibly from **two to twelve weeks**". | **Needs your confirmation.** | High |
| wildlife, mass-communication, tour vs other pages | Age is "18+" on some pages but "18+ (younger welcome with a guardian)" on others. The FAQ says under-18s can join with a guardian. | Align the wording once confirmed. | Low |
| tour.html vs mwanza-activities.html vs the 6 tour pages | The same day trips (City Tour, Bujora, Kageye, SAUT, Ukerewe) are described at length three times. | Keep the full text on each tour's own page, and shorten the duplicate blocks on tour.html and mwanza-activities.html to a summary + link (wording kept). | Med |
| tour.html vs safari-activities.html | Both target "Tanzania safari from Mwanza" (Serengeti, Ngorongoro, Tarangire…), so they compete for the same keyword. | Give tour.html the hub role ("all trips") and safari-activities.html the safari keyword. Adjust titles/descriptions to match. | Med |
| tour.html vs zanzibar.html | The Zanzibar section on tour.html overlaps zanzibar.html. | Summary + link on tour.html. | Low |
| tour.html | Now also hosts the **Tourism & Hospitality Internship** "About this program" section, which mixes internship and tour intent on one URL. | Option: a separate `tourism-hospitality.html` page later. Not part of this pass unless you want it. | Med |
| conservation-lake-victoria vs wildlife-conservation | Similar themes, but distinct enough (lake/environment vs wildlife awareness). | Clear titles that keep them apart. | Low |

## 9. Core Web Vitals / performance

| Page | Problem | Fix | Priority |
|---|---|---|---|
| tour.html | Hero video `videos/tours_1.mp4` is **65 MB** and autoplays. It will wreck page speed (LCP) and mobile data. | Re-encode to ~720p H.264/WebM, about 3–6 MB, and skip autoplay on small screens or with Save-Data. Needs ffmpeg (I'll check it's installed). | High |
| accommodation.html | Hero video is 10 MB, has no `preload` attribute, and its poster is a 320 KB JPEG. | Add `preload="metadata"`, compress the video, and use a WebP poster. | Med |
| All | **207 `<img>` without width/height** (index 73, tour 29, mwanza-activities 19, our_team 16, accommodation 13 …). This causes layout shift (CLS). | Add the real width/height from the files. | High |
| All | 112 unique images, about **8.5 MB**; 92 are JPEG/JPG. The largest: engineer.webp 345 KB, A.jpg.jpeg 336 KB, a_1.jpeg 320 KB, Education1.JPG 265 KB, safari_package 259 KB, serengeti.jpg 247 KB (used on 5 pages). | Make WebP copies (max 1600 px wide) and serve them with `<picture>` and the original as fallback. | High |
| All | Lazy-loading is good: only the hero (1–2 images per page) is eager. | — | — |
| index.html | The hero image preload and responsive WebP hero are already in place. | — | — |
| Program/tour pages | No hero preload. | Preload each page's hero image. | Med |
| All | Google Fonts: 3 families, 14 weights, render-blocking CSS. Preconnect is present. | Preload the main body font (Inter) and trim unused weights. | Med |
| All | style.css is one file of 154 KB (7,600 lines) loaded on every page. | Out of scope for "minimal edits". Note only. | Low |
| 23 pages | The phone **country-code `<select>` is 14.4 KB of markup (232 options) repeated on each page**. That's about 330 KB raw site-wide, though gzip shrinks it a lot. community.html already uses a short 16-option list. script.js references TomSelect, which is never loaded (dead code). | Replace it with a short `<select>` built by script.js from one shared list. Keep `id`/`name`/`required` so the form keeps working. | Med |
| index.html | `translator.js` blocks rendering (see §3). | Remove it. | High |

## 10. AI-search visibility

| Fact | Status | Fix | Priority |
|---|---|---|---|
| Who / registered / since 2018 | In body text on the home page ("legally registered … 2018", "Est. 2018"). | — | — |
| Legal name "VOT Mwanza Limited" | Only in schema and llms.txt, **not visible on any page**. | Mention it in the Key facts block / footer. | Med |
| Where (Nyegezi, Mwanza; 8 km from the city) | Clear. | — | — |
| Price (USD 295/week; USD 25–61/week on-site contribution at some placements) | Clear on the home page and prices.html. Program pages show USD 295. | — | — |
| What's included | Clear in the home FAQ and prices.html. | — | — |
| How to apply | No plain "How to apply" step text; only buttons and a form. | Add one line of steps to the Key facts block (Apply form → confirmation → pre-arrival guidance), using wording already on the site. | Med |
| Program list in one place | Spread across cards. | Key facts block on the home page. | Med |
| llms.txt | **Already exists** (3.6 KB, accurate). | Update to add tours and Tourism & Hospitality; keep it factual. | Low |

---

## Facts to confirm before Phase 2

I won't change any of these until you tell me the correct value.

1. **Education stay length:** "1 to 12+ weeks" (facts card) or "1–24 weeks" (FAQ)?
2. **Healthcare stay length:** "2 to 12+ weeks" (facts card), or 1–24 weeks like the rest of the site? Is there a 2-week minimum for healthcare?
3. **Wildlife Conservation stay length:** "two to twelve weeks" (About text) or "1–24 weeks" (facts card)?
4. **Age:** can under-18s (with a guardian) join *every* program, or only some?
5. **Tour prices:** none of the tour pages show a price. Should TouristTrip schema leave out offers (my default), or do you have prices to publish?
6. **Tourism & Hospitality Internship:** keep it on tour.html, or give it its own page?
7. **Visa note on prices.html:** "Less than 3 months: Student visa (online or on arrival)". Please confirm this is still the visa you advise for volunteers.

## Proposed Phase 2 order (after approval)

1. Remove translator.js and compress the tour.html video (High).
2. JSON-LD: NGO/Organization `@id`, Service, TouristTrip, FAQPage and BreadcrumbList on every page, validated.
3. Titles ≤ 60, descriptions ≤ 155, with og/twitter in sync, and a per-page og:image (1200×630 crops of each page's main photo).
4. Image width/height on all `<img>` tags, WebP copies with fallbacks, hero preloads and a font preload.
5. Country-code list built by JS from one shared file.
6. Contextual links, plus root-relative links (if you confirm the file:// trade-off).
7. Apply the fact fixes you confirm.
8. vercel.json redirects (`/index.html`, trailing slash), favicon PNG/ICO, sitemap lastmod, llms.txt update.
9. Home page Key facts block (existing classes).
10. Test: render every page, submit the form in validation mode, parse JSON-LD, check links. Then list every changed file and stop for your approval.

---

## Phase 2 status (2026-10-22)

**Done:** translator.js removed; hero videos re-encoded (tours 65 MB → 6.3 MB, accommodation 10 MB → 3.5 MB); JSON-LD on all 25 pages (NGO `@id`, Service, TouristTrip, CollectionPage, Hostel, FAQPage from on-page text, BreadcrumbList; all parse); titles ≤ 60 / descriptions ≤ 155 with og/twitter in sync; per-page og:image in `images/og/`; width/height on every image; WebP copies in `images/webp/` served via `<picture>` with the original as fallback; hero preloads (tour, accommodation, safari, Mwanza activities); shared `country-codes.js` with a 16-country fallback list in the HTML; root-relative internal links; related links added (prices, accommodation, our_team; Healthcare on education); favicon.ico/PNG/apple-touch-icon; vercel.json `/index.html` redirect + `trailingSlash: false`; sitemap lastmod; llms.txt facts; home page Key facts block; placehold.co image replaced with a local copy; stray `</main>` in our_team.html removed.

**Correction to §10:** the home page already explains how to apply ("How it works", steps 1–3). The Key facts block links to it.

**Not done, needs a decision:** the stay-length, age and visa contradictions in §8 (waiting for your answers); shortening duplicate day-trip text on tour.html and mwanza-activities.html (this changes visible content); a separate Tourism & Hospitality page.

**Not done, with reason:**
- Font preload: Google Fonts file URLs change per browser and over time, so preloading them is brittle. Self-hosting the fonts would be the real fix.
- WebP for some large photos (a_1, a_5, serengeti, A.jpg): WebP saved less than 10%, so the original JPEGs stay.
- Apex → www in one hop: needs the Vercel dashboard, not code.
