# 7. No observability or operational runbooks

**Status:** No production telemetry, alerting, or operating model.

The app has no structured logging, metrics, traces, health endpoints, live
status page, error reporting, synthetic checks, SLOs, or incident runbooks. The
only runtime logging is browser-console output (`printBootBanner` and component
error logging), which is useful for a demo but not for operating a
life-safety-adjacent system.

A real operations posture would require:

- **Telemetry:** structured client and server logs, correlation IDs, metrics,
  traces, and source-health events.
- **Dashboards:** operator-facing service health and engineering dashboards for
  latency, feed freshness, error rate, alert/dispatch outcomes, and dependency
  status.
- **Alerting:** actionable alerts routed to an accountable on-call team, with
  severity definitions and escalation paths.
- **Runbooks:** documented response for stale feeds, failed dispatch commits,
  degraded map service, auth outage, data-provider outage, and rollback.
- **Release operations:** deployment rings, smoke tests, rollback criteria, and
  post-deploy verification.

**First step:** define SLOs for feed freshness, command-action latency, and
dashboard availability, then wire basic telemetry and a synthetic availability
check before any real data source is connected.
