# 7. Missing data streams / no ingestion layer

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
  the prompt-injection/bias surface from Responsible AI (#6) and supply chain
  controls (#11).
- **Imagery** (satellite/drone + CV damage overlays) — claimed but absent.
- **Resource/asset management** — replaces the static dispatch panel with live
  unit/fleet state and two-way commit.

**First step:** build the typed ingestion seam (adapter → normalize to domain
types → streaming transport → state hook); every stream depends on it.
