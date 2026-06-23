# 8. Reliability under degraded data is not designed

**Status:** Mock data is always available and internally consistent.

`useCommandState` advances an in-memory scenario every second and feeds events
from local mocks. That means the prototype never experiences the hard production
cases: stale telemetry, duplicate reports, provider outage, partial feed loss,
conflicting observations, reconnect storms, clock skew, replayed events, or a
backend accepting a command while the UI is offline.

A production system needs explicit degraded-mode behavior:

- **Freshness indicators:** every feed and derived display should expose age,
  source status, and confidence.
- **Conflict handling:** contradictory reports need reconciliation rules and
  operator-visible uncertainty.
- **Idempotency:** command APIs need idempotency keys so retries do not duplicate
  alerts or dispatches.
- **Offline/reconnect behavior:** the UI should distinguish stale cached state
  from live state and safely recover after reconnect.
- **Dependency fallback:** map, auth, feed, and command-service outages need
  distinct UI states and operational runbooks.

**First step:** extend the domain types with source timestamp, received
timestamp, source id, confidence, and freshness status, even while the values
remain mocked.
