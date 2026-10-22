# Keyword map & content plan — volunteertotanzania.com

Branch: `seo-2026` · Data: Google Search Console export, web search, "last 3 months" (data present 23 Sep – 19 Oct 2026) · Plan only: no site files changed.

## 1. What the data says

**Totals:** 27 clicks and 228 impressions in about 4 weeks. That's too little data to rank keywords by volume. Treat everything below as direction, not proof.

| Finding | Evidence | What it means |
|---|---|---|
| Google still shows the **old site's URLs** | All 7 pages in Pages.csv are old paths (`/opportunities`, `/about-us`, `/community`, `/prices`, `/zanzibar-island`, `/day-trip`) | The new pages aren't indexed yet. Submitting the sitemap and requesting indexing comes first. |
| **`/day-trip` is broken** | Live check: `/day-trip` → `/day-trip.html` → **404** (5 impressions, position 5.6) | Add a redirect. This is the only real bug the data found. |
| Brand/local searches work | Home position 4.2, prices 4.2, community 7.0; "vot" position 4.3; "mwanza" position 1 | Tanzania gives 123 of 228 impressions and 20 of 27 clicks, mostly local or brand searches. |
| **The core keyword is far off** | "volunteer in tanzania" and 12 close variants: about 47 impressions, positions **47–76**, 0 clicks | The main commercial term is on page 5–8. The home page should own it clearly. |
| Target markets barely see the site | UK 31 impressions (position 44), US 23 (position 27), Australia/NZ positions 46–62 | Same problem: weak rankings for the generic terms foreign volunteers search. |
| Zanzibar gets some reach | "zanzibar tanzania", "zanzibar", "zanzibar island", "zanzibar island location": 15 impressions, positions 11–25; `/zanzibar-island` 42 impressions, position 12.4 | The closest-to-page-1 topic after brand. Worth tightening. |
| Clicks come from hidden queries | Every listed query has 0 clicks, yet the site got 27 | Google hides rare queries, so this export can't say which terms convert. |
| Non-English searches exist | "voluntariado tanzania" (Spanish), "volontariato in tanzania" (Italian), "volunteer tansania" (German): 1 impression each | Too small to act on. Note only. |
| Mobile ranks better than desktop | Mobile average position 10.9 vs desktop 25.3 | No action; mostly reflects local mobile brand searches. |

**Missing input:** your message mentioned keyword research notes, but only the Search Console CSVs came through. This plan uses GSC data plus topic fit and doesn't claim search volumes. Send the notes and I'll fold them in before editing anything.

## 2. Keyword map (existing pages)

Evidence column: **GSC** = seen in your data · **Fit** = matches page content, no volume data.

| Page | Primary keyword | Secondary keywords | Evidence |
|---|---|---|---|
| `/` (home) | volunteer in Tanzania | volunteering in Tanzania · volunteer opportunities in Tanzania · volunteer work in Tanzania · Tanzania volunteer programs · internships in Tanzania | **GSC** (≈47 impressions, positions 47–76) |
| community.html | community volunteering Tanzania | community development volunteer Mwanza · volunteer with local communities Tanzania · NGO volunteering Mwanza | GSC (old `/community`, position 7) + Fit |
| education.html | teaching volunteer Tanzania | volunteer teaching Mwanza · teach English in Tanzania volunteer · school volunteer Tanzania | Fit |
| healthcare.html | medical volunteering Tanzania | healthcare internship Tanzania · hospital volunteer Mwanza · pre-med volunteer Africa | Fit |
| daycare-children.html | childcare volunteering Tanzania | daycare volunteer Mwanza · orphanage alternative volunteering Tanzania · work with children Tanzania | Fit |
| tecec-early-childhood.html | early childhood development volunteer Tanzania | preschool volunteer Mwanza · TECEC Mwanza · special needs children volunteer Tanzania | Fit |
| bmcc-day-care.html | BMCC Day Care Mwanza | day care volunteer Malimbe · church day care volunteering Mwanza | Fit (brand-specific; low competition) |
| conservation-lake-victoria.html | Lake Victoria conservation volunteer | environmental volunteering Tanzania · tree planting volunteer Mwanza · Saanane Island | Fit |
| wildlife-conservation.html | wildlife conservation volunteer Tanzania | conservation volunteering Serengeti · environmental education volunteer Tanzania | Fit |
| engineering.html | engineering internship Tanzania | civil engineering internship Africa · engineering volunteer Mwanza | Fit |
| geology.html | geology internship Tanzania | mining internship Tanzania · earth science field placement Africa | Fit |
| mass-communication.html | media internship Tanzania | journalism internship Tanzania · communications internship Africa · photography volunteer | Fit |
| prices.html | volunteer Tanzania cost | volunteering in Tanzania price · volunteer program fees Mwanza · cheap volunteering Tanzania | GSC (old `/prices`, position 4.2) + Fit |
| accommodation.html | volunteer accommodation Mwanza | volunteer house Tanzania · VOT Hostel · where volunteers stay Mwanza | Fit |
| tour.html | Tanzania tours for volunteers | day trips from Mwanza · volunteer and safari Tanzania · Mwanza tours | Fit (hub page) |
| safari-activities.html | safari from Mwanza | Serengeti safari from Mwanza · Ngorongoro safari · Tanzania safari packages | Fit |
| serengeti-day-trip.html | Serengeti day trip from Mwanza | Serengeti day tour · one day Serengeti safari · Big Four Serengeti | Fit + GSC (`/day-trip`) |
| zanzibar.html | Zanzibar Island tour | Zanzibar Tanzania · Zanzibar trip from Mwanza · Stone Town tour · Zanzibar spice tour | **GSC** (positions 11–25) |
| mwanza-activities.html | things to do in Mwanza | Mwanza attractions · Mwanza day trips · Lake Victoria activities | Fit + GSC ("mwanza", position 1) |
| mwanza-city-tour.html | Mwanza city tour | Bismark Rock · Capri Point Mwanza · Rock City Mwanza | Fit |
| ukerewe-island.html | Ukerewe Island | Ukerewe boat trip · largest inland island Africa · Lake Victoria island trip | Fit |
| bujora-cultural-museum.html | Bujora Sukuma Museum | Sukuma culture Mwanza · Bujora museum tour | Fit |
| kageye-historical-site.html | Kageye Mwanza | Kageye historical site · Stanley Kageye · Lake Victoria history | Fit |
| saut-visit.html | St. Augustine University of Tanzania visit | SAUT Mwanza · SAUT Malimbe campus | Fit |
| our_team.html | Volunteers of Tanzania team | VOT Mwanza staff · VOT Mwanza Limited | Brand |

## 3. Cannibalisation (pages competing for the same keyword)

| Keyword | Competing pages | Fix (owner page first) |
|---|---|---|
| volunteer in Tanzania | home · community.html · (proposed Mwanza guide) | **Home owns it.** community.html targets "community volunteering"; the Mwanza guide targets "volunteer in Mwanza". Each links up to home with that anchor text. |
| Zanzibar | zanzibar.html · tour.html (Zanzibar section) · safari-activities.html | **zanzibar.html owns it.** tour.html keeps a short Zanzibar summary linking to zanzibar.html (already flagged in SEO-AUDIT §8). |
| Serengeti / safari | safari-activities.html · serengeti-day-trip.html · tour.html · wildlife-conservation.html | Day trip → serengeti-day-trip.html; multi-day safari → safari-activities.html; tour.html is the hub only; wildlife is a volunteer program and links out. |
| Mwanza day trips / things to do | mwanza-activities.html · tour.html (day-trips section) · each tour page | **mwanza-activities.html owns "things to do in Mwanza"**; tour.html owns "tours for volunteers"; the tour pages own their place name. |
| childcare volunteering | daycare-children.html · bmcc-day-care.html · tecec-early-childhood.html · community.html | **daycare-children.html owns the generic term.** BMCC and TECEC target their own names; community links to all three. |
| Tourism internship | tour.html (internship section) vs tours intent | Proposed new page `tourism-hospitality-internship.html` (§5d). |

## 4. Proposed changes to existing pages (data-backed only)

| Page | Change | Why (data) |
|---|---|---|
| vercel.json | Redirect `/day-trip(.html)?` → `/serengeti-day-trip.html` (or `/tour.html#day-trips`, your call) | Live 404 that Google still lists (position 5.6) |
| `/` home | **Title:** "Volunteer in Tanzania \| Programs & Internships in Mwanza" (56 characters). **H1:** "Internship and Volunteering Programs in Tanzania." → "Volunteer in Tanzania: Internships & Volunteer Programs in Mwanza". **Meta:** lead with "Volunteer in Tanzania with VOT…". Keep the rest. | The core keyword cluster sits at positions 47–76; the current title says "Volunteer **to** Tanzania", which no query in your data uses. |
| `/` home FAQ | Add no new questions; rename "Where are the volunteer programs located?" → "Where can I volunteer in Tanzania?" (same answer) | Matches the query wording; on-page text stays. |
| zanzibar.html | **Title:** "Zanzibar Island Tour, Tanzania \| Trips for Volunteers \| VOT" (≤ 60). **H1:** "Zanzibar Island" → "Zanzibar Island, Tanzania". | "zanzibar tanzania" / "zanzibar island" at positions 11–25, the nearest page-1 opportunity. |
| zanzibar.html FAQ | Add "Where is Zanzibar and how do I get there from Mwanza?" **only if you give me the facts.** The page currently says nothing about location or travel. | Query "zanzibar island location" |
| community.html, prices.html | No change | Already positions 4–7 with decent click-through rate. |
| All other pages | No title/H1 changes; keyword map only | No data to support a change. |

## 5. New pages worth creating

All four use the existing program-page template: education.html structure (page-hero, gallery, detail cards, About block, FAQ, related links, contact form), existing classes only, with schema, og image, sitemap and llms.txt entries. They use real facts only, taken from the pages named.

| # | Page | Primary / secondary keywords | Content (sources on the site) | Blockers |
|---|---|---|---|---|
| a | **volunteer-mwanza.html** — "Volunteer in Mwanza: a guide for volunteers" | volunteer in Mwanza / Mwanza Tanzania guide · living in Mwanza as a volunteer · Mwanza volunteer programs | Host city (Rock City, Lake Victoria, 2nd-largest city), language, greetings, religion and dress code (home "Discover Your Host City"); VOT Hostel and distances (accommodation, home); airport transfer (FAQ); program list; things to do (mwanza-activities). | None |
| b | **safety-health-visa.html** — "Volunteering in Tanzania: safety, health & visas" | is it safe to volunteer in Tanzania / Tanzania volunteer visa · malaria Tanzania volunteer · travel insurance volunteering Tanzania | Home FAQs: "Is it safe to volunteer in Mwanza?", malaria, travel insurance, currency, solo travel, safeguarding, 24/7 guard and support; dress code. Visa section from prices.html. | **Visa wording needs your confirmation** (SEO-AUDIT question 7). Without it, I'd publish the page without the visa section. |
| c | **short-term-volunteering.html** — "Short-term volunteering in Tanzania (1–4 weeks)" | short term volunteer Tanzania / 1 week volunteering Tanzania · 2 week volunteer Africa · volunteer and safari Tanzania | Site-wide facts: 1–24 weeks, 2–4 weeks recommended, USD 295/week, what's included, combining with day trips and safaris (tour pages). Lists which programs suit short stays. | **Stay-length contradictions** (education "1 to 12+", healthcare "2 to 12+", wildlife "2–12") must be settled first, or this page would repeat the conflict. |
| d | **tourism-hospitality-internship.html** | tourism internship Tanzania / hospitality internship Tanzania · hotel internship Mwanza · tour operator internship Africa | Move the existing "About this program" block and quick facts from tour.html; tour.html keeps a one-line link. Point the existing `/tourism-hospitality` redirect here. Home card "Tourism & Hospitality Internship" links here. | Your OK to move it (SEO-AUDIT question 6). Please also confirm the description I wrote earlier (supervision, marketing tasks). |

**Not proposed (no evidence or would cannibalise home):** a separate "Volunteer in Tanzania" page; country-language pages (es/it/de, 1 impression each); a general "internships in Tanzania" hub (could come later if your notes show demand).

**Linking for new pages:** each gets links from the home Key facts block or related pages, plus the "You might also be interested in" blocks. It also gets a footer link where the footer already lists guides. No menu change.

## 6. After launch

- Request indexing for the new URLs plus home, zanzibar and prices in Search Console.
- Re-export GSC after 4–6 weeks. Compare positions for the "volunteer in Tanzania" cluster and the Zanzibar queries against this baseline (positions 47–76 and 11–25).

## 7. Decisions needed before I edit

1. `/day-trip` redirect target: **serengeti-day-trip.html** or **tour.html#day-trips**?
2. Approve the home and zanzibar title/H1 changes in §4?
3. Which new pages to build: a, b, c, d (all or some)?
4. Visa wording (for b) and stay lengths (for c), from the earlier audit questions.
5. Zanzibar location/travel facts, if you want that FAQ.
6. Your keyword research notes, if you'd like them included.
