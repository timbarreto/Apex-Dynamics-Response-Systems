# Gaps

Tracked gaps for Apex Dynamics Response Systems (Project Titan Watch). This is a
mocked, frontend-only prototype — many items below are intentional scope
exclusions rather than defects. Each entry notes whether it is *deliberate* or
*unfinished* so "looks done" is not mistaken for "production-ready."

## 1. Authentication & authorization (absent)

**Status:** Unbuilt — largest missing domain.

The codebase has no authentication or authorization of any kind. There is no
login, token, session, identity, or role concept; the only `role` references in
the source are ARIA accessibility attributes. The app ships as a public static
SPA, so anyone who reaches the URL gets the full command center and can invoke
every action anonymously — including consequential ones like `dispatchUnit`,
`triggerAlert` (citywide alert), and `reportLandfall`.

For the prototype as scoped this is acceptable: with no backend and only mocked
state, there is nothing to protect. For the system it represents — an
emergency-response command center — it is the single largest unbuilt area. A
real version would require:

- **AuthN:** operator login, SSO/OIDC, and MFA (a defense console is a
  high-value target).
- **AuthZ:** role separation (e.g. viewer vs. dispatcher vs. commander), with
  privileged actions such as raising a citywide alert or committing dispatch
  gated behind elevated roles.
- **Identity in audit:** every dispatch/alert/landfall event should record the
  acting operator. The `SignalEvent` model currently has no `actor`/`operatorId`
  field, so actions are attributed only to "the system."
- **Session lifecycle:** token issuance, expiry, refresh, and idle lockout for
  an always-on console.
- **Authenticated transport:** a backend and authenticated API — there is
  currently no service seam to attach an identity to (see the "no data
  abstraction seam" gap).

**Cheapest honest first step:** add an `actor`/`operatorId` field to the
`SignalEvent` model (even hardcoded to a mock operator) so the data model has a
seam for identity later, mirroring how the map marks "where live tracks would
plug in."

## 2. Responsible AI (unaddressed)

**Status:** No AI in code; major unaddressed design domain.

There is no AI or ML anywhere in the codebase — no model, inference, training,
or heuristic classifier. What resembles classification (`deriveThreatLevel`,
`threatRank`) is a deterministic `max` over hardcoded mock values. The only
"RAI" reference is the dangling `amiedansby/RAI` branch wired into the deploy
workflow, which suggests intended-but-unlanded work.

RAI still matters because the product premise is a textbook high-risk AI
scenario: the system "fuses imagery, sensor networks, incident reports, and
public social signals" to drive "damage assessment, response prioritization,
and evacuation planning." If any of that were real, AI would inform high-stakes,
life-safety decisions about where to send help and whom to evacuate. For the
prototype this is an acceptable scope exclusion; for the real system it is a
major unbuilt domain. A real version would require:

- **Fairness / bias:** prioritization and evacuation ranking must not
  systematically deprioritize neighborhoods by demographics or data density.
  Social-signal ingestion is especially bias-prone (who posts, in what
  language, on which platform).
- **Transparency / explainability:** operators committing dispatch or a citywide
  alert need to see *why* a threat is ranked as it is, not an opaque score. The
  `SignalEvent` model carries no provenance or confidence today.
- **Human oversight:** the `TriggerAlertBar` hold-to-confirm is the closest thing
  to a human-in-the-loop control; a real system needs this formalized for every
  AI-influenced action, with override capability.
- **Reliability / uncertainty:** mocked feeds are always confident. Real models
  need calibrated confidence, graceful degradation, and explicit handling of
  stale or missing sensor data.
- **Accountability / audit:** ties to the auth/identity gap — RAI decisions need
  traceability to both a model version and an accountable operator.
- **Privacy:** public social-signal fusion raises PII and surveillance concerns
  requiring governance.

**Loose end:** the orphaned `amiedansby/RAI` deploy branch in
`.github/workflows/deploy.yml` should be either landed or removed.

## 3. Supply chain / npm risk (no scanning)

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

## 4. Missing data streams / no ingestion layer

**Status:** Every "live" element is a local timer over mock data, not a feed.

There is no ingestion layer — no API client, WebSocket/SSE, schema validation,
or service seam. `useCommandState` drives everything from a `setInterval`
heartbeat and a `scheduleNext` timer over in-memory mocks; the only real network
call is the map basemap. Making it real means replacing simulated state with
ingested state:

- **Hazard telemetry** (weather/fire/flood/seismic) — replaces the leviathan
  roster and scripted tracks, with per-track uncertainty.
- **Sensor networks** (IoT/SCADA) — replaces canned feed lines, with
  freshness/offline handling.
- **Incident reports** (CAD / 911) — not modeled at all.
- **Public social signals** — real ingestion (geotag, dedup, credibility);
  the prompt-injection/bias surface from #2–#3.
- **Imagery** (satellite/drone + CV damage overlays) — claimed but absent.
- **Resource/asset management** — replaces the static dispatch panel with live
  unit/fleet state and two-way commit.

**First step:** build the typed ingestion seam (adapter → normalize to domain
types → streaming transport → state hook); every stream depends on it.

## 5. No command authorization / approval chain

**Status:** Dispatch is an instant, self-authorizing click.

There is no military-style approval workflow. `dispatchUnit` commits
synchronously — check capacity, decrement, log — with no requester/approver
split, pending state, rank check, or record of who authorized it. The only
friction anywhere is the single-operator hold-to-confirm on the citywide alert.

A real command center needs:

- A dispatch **state machine** (`requested → pending → approved/denied →
  executed`), not an instant decrement.
- **Two-person / two-role authorization** (requester ≠ approver) for
  high-consequence actions, with threshold-based escalation by rank.
- **Full audit trail** (requester, approver, timestamp, justification) — the
  `SignalEvent` model has no such fields.

This layer sits on top of identity (#1) and a backend (#4) and cannot exist
without them.
