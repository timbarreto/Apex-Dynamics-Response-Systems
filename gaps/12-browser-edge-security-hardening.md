# 12. Browser and edge security hardening absent

**Status:** No security headers or browser policy controls.

The app is published as a static SPA and has no visible content-security policy,
HSTS, frame-ancestors restriction, referrer policy, permissions policy, or edge
configuration. It also loads Google Fonts from `fonts.googleapis.com` and map
basemap assets from `basemaps.cartocdn.com`, so a production policy would need
to explicitly account for those external origins or remove them.

The production console behavior is also inappropriate for an enterprise command
center: `printBootBanner()` runs in production and logs novelty text to the
browser console. That is harmless in the prototype, but production should keep
console output boring, minimal, and operationally relevant.

A production browser posture would require:

- **CSP:** restrict script, style, image, font, connect, worker, and frame
  origins; avoid broad wildcards.
- **Transport/browser headers:** HSTS, `frame-ancestors`, `X-Content-Type-Options`,
  referrer policy, and permissions policy.
- **Third-party origin review:** approve, self-host, or replace Google Fonts and
  third-party map tile dependencies.
- **Console hygiene:** remove novelty production logs and ensure client errors
  are routed to telemetry with safe redaction.

**First step:** gate `printBootBanner()` behind `import.meta.env.DEV`, decide
whether fonts and basemap tiles are self-hosted or approved third parties, then
define the CSP needed by that decision.
