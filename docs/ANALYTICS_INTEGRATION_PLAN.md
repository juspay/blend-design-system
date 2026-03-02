# Analytics Integration Plan – Blend Prod (Ascent) Site

## 1. Overview

**Goal:** Add analytics to the **blend-prod** site (https://blend.juspay.design) that hosts the Ascent documentation (Next.js static export) and Storybook, so you can measure traffic, engagement, and content usage.

**Current state:**

- Ascent: Next.js 15 with `output: 'export'`, deployed to Firebase Hosting as static files.
- Feature flag: `features.analytics: false` in [`apps/ascent/lib/config/app.ts`](apps/ascent/lib/config/app.ts).
- No analytics scripts or SDKs in the app today.
- CSP in [`firebase.json`](firebase.json) allows `https://vitals.vercel-insights.com` in `connect-src` (unused so far).

**Scope (recommended):**

- **Phase 1:** Ascent app only (docs, blog, changelog, home).
- **Phase 2 (optional):** Storybook app, if you need component-usage metrics.

---

## 2. Analytics Option Comparison

| Criteria              | Google Analytics 4 (GA4)                       | Firebase Analytics (Web)                    |
| --------------------- | ---------------------------------------------- | ------------------------------------------- |
| **Best for**          | Web docs, marketing, content                   | Apps + web in same Firebase project         |
| **Setup**             | New GA4 property + Measurement ID              | Enable in existing Firebase project         |
| **Next.js**           | `next/script` + gtag.js or @next/third-parties | Firebase JS SDK (or gtag if linked to GA4)  |
| **Reporting**         | GA4 UI (audiences, funnels, attribution)       | Firebase Console + optional GA4 link        |
| **Privacy / consent** | Same (both use Google tags)                    | Same                                        |
| **Recommendation**    | **Preferred for docs site**                    | Use if you want one dashboard with Firebase |

**Recommendation:** Use **Google Analytics 4 (GA4)** for the blend-prod site. It’s built for web, fits static/Next.js, and gives you the standard GA4 reports. You can later link this GA4 property to your Firebase project (storybook-452807) if you want a single place for both.

---

## 3. Prerequisites and Setup (GA4)

### 3.1 Create GA4 property and data stream

1. Go to [Google Analytics](https://analytics.google.com/) and create or select an account.
2. Create a **Property** (e.g. “Blend Design System”).
3. Add a **Web** data stream:
    - URL: `https://blend.juspay.design`
    - Stream name: e.g. “Blend Prod (Ascent)”.
4. Copy the **Measurement ID** (e.g. `G-XXXXXXXXXX`). You’ll use this in the app and env.

### 3.2 Optional: Link to Firebase (storybook-452807)

- In Firebase Console → Project Settings → Integrations, link the GA4 property to the Firebase project if you want unified reporting.

### 3.3 Environment variables

- **Production (blend-prod):**
    - In the Ascent app, use a **build-time** env var so the static export includes the correct ID.
    - Add to `.env.prod` (or your prod CI env) and to Ascent’s env schema:
    - `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
- **Staging (blend-staging):**
    - Either:
        - Same ID with a GA4 filter to exclude non-prod, or
        - A separate GA4 property/stream for staging and `NEXT_PUBLIC_GA_MEASUREMENT_ID` set only in prod (staging build then has no ID and sends no data).
- **Local:**
    - Do not set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (or set it empty) so dev builds don’t send analytics.

Never commit real Measurement IDs; keep them in `.env.prod` / CI secrets and ensure `.env.prod` is gitignored.

---

## 4. Implementation Plan (Ascent App)

### 4.1 Feature flag and config

- In [`apps/ascent/lib/config/app.ts`](apps/ascent/lib/config/app.ts):
    - Keep `features.analytics` but drive it from env:
        - e.g. `analytics: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.length > 0 ?? false`, or an explicit `NEXT_PUBLIC_ANALYTICS_ENABLED=true` only in prod.
    - Use this flag so:
        - Scripts are only injected when analytics is enabled.
        - No gtag calls when the ID is missing (e.g. local or staging without ID).

### 4.2 Add GA4 script and page_view (root layout)

- **File:** [`apps/ascent/app/layout.tsx`](apps/ascent/app/layout.tsx).
- Use Next.js `next/script` with `strategy="afterInteractive"` (or `lazyOnload`) so analytics don’t block first paint.
- Inject the gtag snippet only when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set (and optionally when `features.analytics` is true).
- In the snippet:
    - Load `https://www.googletagmanager.com/gtag/js?id=MEASUREMENT_ID`.
    - Call `gtag('config', 'MEASUREMENT_ID', { send_page_view: true })` so automatic page_view works with client-side navigation.

Because Ascent uses static export and client-side navigation (likely Next.js router), ensure:

- The GA script is in the root layout so it loads once.
- Either:
    - Rely on gtag’s default `page_view` and ensure the script runs on each route change, or
    - Fire a custom `page_view` (or use `gtag('event','page_view', { page_path: pathname })`) from a client component that runs on route change (see 4.4).

### 4.3 CSP updates (firebase.json)

- **File:** [`firebase.json`](firebase.json), `blend-prod` hosting → `headers` where CSP is set (including the block that applies to `/storybook/**` if you later add GA to Storybook).
- Allow:
    - **Script:** `https://www.googletagmanager.com` (and optionally `https://www.google-analytics.com` if you use direct hits).
    - **Connect:** `https://www.google-analytics.com` and `https://www.googletagmanager.com` (and keep existing `connect-src` entries).
- Example (merge into existing CSP string; keep other directives as-is):
    - `script-src ... https://www.googletagmanager.com;`
    - `connect-src ... https://www.google-analytics.com https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;`
- Staging (`blend-staging`): add the same if you run GA on staging; otherwise leave as-is.

### 4.4 Page view and route change (SPA behavior)

- Static export means the first load is a full page load (gtag will see it). Subsequent navigations are client-side.
- Option A (simplest): Rely on full page loads and don’t track in-app route changes (good enough for many docs sites).
- Option B (recommended for accuracy): Add a small **client component** (e.g. `AnalyticsPageView`) that:
    - Uses `usePathname()` (App Router) and optionally `useSearchParams()`.
    - On pathname (and maybe query) change, calls `gtag('event', 'page_view', { page_path: pathname + search, page_title: document.title })` (or equivalent).
    - Renders nothing (or a fragment). Mount this once in root layout so it runs on every route.

### 4.5 Custom events (optional but valuable)

Define a small analytics helper (e.g. `lib/analytics.ts` or `lib/gtag.ts`) that:

- Checks for `typeof window !== 'undefined'` and presence of `gtag` and `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
- Exposes typed helpers, e.g.:
    - `trackEvent(eventName, params)`
    - `trackSearch(term, resultsCount)` for search usage
    - `trackOutboundLink(url, label)` for external links (e.g. GitHub, Storybook)
    - `trackDocSection(docPath, section)` if you want doc/section-level engagement

Use these from client components only (search bar, footer links, doc TOC, etc.). Keep event names and parameter keys consistent (e.g. snake_case) for GA4 reporting.

### 4.6 Consent and privacy (recommended)

- Decide policy: e.g. “analytics only with consent” (GDPR-friendly) or “no consent banner, anonymized usage only” (document in privacy policy).
- If you need consent:
    - Integrate a consent banner or use Google’s consent mode (e.g. `gtag('consent', 'default', { analytics_storage: 'denied' })` until user accepts; then set to `'granted'` and optionally run `gtag('config', 'MEASUREMENT_ID')` again).
    - Ensure no analytics cookies or identifiers are set before consent.
- Document in privacy policy: what you collect (e.g. page URLs, referrer, device type), retention, and that you use Google Analytics.

### 4.7 No analytics in development

- Do not set `NEXT_PUBLIC_GA_MEASUREMENT_ID` (or set it to empty) for local and non-prod builds so that:
    - No hits are sent from dev/staging unless you explicitly configure a staging stream.

---

## 5. Event Taxonomy (suggested)

| Event name                   | When to send                                       | Example params                            |
| ---------------------------- | -------------------------------------------------- | ----------------------------------------- |
| `page_view`                  | Every route change (if using Option B in 4.4)      | `page_path`, `page_title`                 |
| `search`                     | User uses docs search                              | `search_term`, `results_count` (optional) |
| `click` (or `outbound_link`) | User clicks external link (e.g. GitHub, Storybook) | `link_url`, `link_label`                  |
| `doc_view` (optional)        | Deep view of a doc page                            | `doc_path`, `doc_title`                   |
| `video_play` (optional)      | User plays launch/demo video                       | `video_title`, `video_src`                |

Use GA4’s “Custom definitions” (dimensions/metrics) for any custom parameters you want in reports.

---

## 6. Storybook (Phase 2, optional)

- Storybook is a separate static build copied to `dist/storybook/`. It does not use Ascent’s Next.js layout.
- To add analytics to Storybook:
    - Add the same gtag script to Storybook’s HTML (e.g. in Storybook’s `preview-head.html` or framework config).
    - Use the same `NEXT_PUBLIC_GA_MEASUREMENT_ID` (or a separate one) and the same CSP rules for the paths that serve Storybook.
- Consider a separate GA4 stream or property for “Blend Storybook” so docs traffic and component-playground traffic are easy to separate in reports.

---

## 7. Testing and Rollout

### 7.1 Local testing

- Set `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` in `.env.local` and run `npm run build` + preview (e.g. `npx serve apps/ascent/out` or your usual method).
- Open the site and navigate a few pages; use GA4 DebugView (add `?debug_mode=true` to the config or use the browser extension) to confirm `page_view` and any custom events.

### 7.2 Staging (blend-staging)

- Deploy to staging with analytics enabled (same or separate Measurement ID).
- Verify in GA4 that events appear and that filters (if any) work (e.g. exclude staging hostname if you use one ID for both).

### 7.3 Production (blend-prod)

- Enable analytics via env only in prod build (e.g. in CI: set `NEXT_PUBLIC_GA_MEASUREMENT_ID` and optionally `NEXT_PUBLIC_ANALYTICS_ENABLED` for prod).
- Run `./deploy.sh prod` (or your prod deploy pipeline).
- After deploy, check GA4 Realtime and DebugView again on https://blend.juspay.design.

### 7.4 Rollback

- To disable: remove or clear `NEXT_PUBLIC_GA_MEASUREMENT_ID` for the prod build and redeploy. No code change needed if the script is gated on the presence of the ID.

---

## 8. Files to Add or Modify (checklist)

| Action                 | File / location                                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Add/update env         | `.env.prod`, CI secrets: `NEXT_PUBLIC_GA_MEASUREMENT_ID`                                                                      |
| Feature flag           | `apps/ascent/lib/config/app.ts` – `features.analytics` driven by env                                                          |
| GA script + config     | `apps/ascent/app/layout.tsx` – `next/script` + gtag, conditional on ID                                                        |
| Route-change page_view | New client component e.g. `apps/ascent/app/components/AnalyticsPageView.tsx` (or under `(home)` / layout), use in root layout |
| Custom events          | New `apps/ascent/lib/analytics.ts` (or `gtag.ts`) and use from search/footer/etc.                                             |
| CSP                    | `firebase.json` – script-src and connect-src for Google Analytics / Tag Manager                                               |
| Docs                   | This plan; optionally a short “Analytics” section in `DEPLOYMENT.md` or `README`                                              |

---

## 9. Success Criteria

- GA4 receives `page_view` for all Ascent pages on blend-prod (and optionally staging).
- No analytics requests when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is unset (local/dev).
- CSP does not block gtag or analytics endpoints.
- Optional: search and outbound link events appear in GA4.
- Privacy approach (consent or anonymized) is documented and implemented.

---

## 10. Summary

- Use **GA4** for the blend-prod (Ascent) site, with Measurement ID in env and script injected in root layout behind a feature flag.
- Update **CSP** in `firebase.json` for script and connect for Google Analytics.
- Add **route-change page_view** and optional **custom events** (search, outbound links) for better insights.
- Keep analytics **off** in dev and configurable for staging; enable only in prod (or explicitly on staging) via env.
- Optionally add analytics to **Storybook** in a second phase and document everything in `DEPLOYMENT.md` or this doc.

This plan gives you a detailed, step-by-step path to integrate analytics on the blend-prod site in a controlled and maintainable way.
