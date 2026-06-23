# 11. Supply chain / npm risk (no scanning)

**Status:** No supply-chain controls; pipeline holds privileged tokens.

There is no dependency or supply-chain scanning: no `dependabot.yml`, CodeQL,
Renovate, `.snyk`, `SECURITY.md`, or `npm audit` gate in CI. Only the committed
`package-lock.json` provides install determinism via `npm ci`. The risk centers
on the *pipeline*, which deploys with privileged `pages: write` and
`id-token: write` tokens.

- **No CVE scanning / `npm audit` gate** — a vulnerable transitive dependency
  (e.g. via the large `maplibre-gl` graph) can reach `dist/` and deploy
  unnoticed.
- **No Dependabot/Renovate** — patches are never surfaced; caret ranges let
  `npm install` drift off the lockfile.
- **No provenance/integrity** — no SBOM, no pinned action SHAs (workflows use
  mutable tags like `actions/checkout@v4`), no npm provenance. A hijacked action
  or typosquatted package would run in CI with the privileged deploy tokens.

**First step:** add an `npm audit` step to CI and a `dependabot.yml`, then pin
action SHAs and add CodeQL.
