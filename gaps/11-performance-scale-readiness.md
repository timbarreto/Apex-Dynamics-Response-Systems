# 11. Performance and scale readiness incomplete

**Status:** Local build passes, but no performance budget or scale validation.

`npm run build` succeeds, but Vite warns that the `maplibre-gl` chunk is large
after minification. The app already lazy-loads the map, which is a good
prototype optimization, but there are no performance budgets, target device
profiles, load tests, Web Vitals checks, bundle-size gates, or latency
acceptance criteria.

Production concerns include:

- **Frontend performance:** cold load, map load, interaction latency, memory
  growth during long-running console sessions, and behavior on low-powered
  field devices.
- **Backend scale:** event throughput, fan-out to many operators, command
  transaction latency, and backpressure during incident spikes.
- **Long-session stability:** an operations console may run for many hours, so
  timers, subscriptions, map resources, and logs need leak testing.
- **Budget enforcement:** CI should fail or warn on bundle growth and critical
  performance regressions.

**First step:** set budgets for initial shell load, map-ready time, command
round-trip latency, and memory growth over an extended session; add automated
bundle-size and browser performance checks.
