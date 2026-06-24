<!-- markdownlint-disable-file -->
<!-- markdown-table-prettify-ignore-start -->
# Project Titan Watch - Product Requirements Document

Version 0.3 | Status Draft for review | Owner Tim Barreto | Team Apex Dynamics Engineering | Updated 2026-06-24

## 1. Summary

Project Titan Watch is a command-center platform for emergency disaster
response. It should fuse live operational data into a trusted situational
picture for response prioritization, evacuation planning, dispatch, and shared
awareness.

The current repo is only a Vite/React prototype. State, feeds, and command
actions are simulated in the browser. There is no backend, live ingestion,
authentication, authorization, audit trail, production hosting model, or
operations plane. This PRD defines the product requirements to move from demo to
production-ready, life-safety-adjacent platform.

**v1 posture:** AI/LLM decisioning is deferred. v1 may include only
non-authoritative AI assistance such as summarization, search, drafting, or
triage notes. No automated evacuation ranking, dispatch recommendation, or alert
decisioning ships in v1.

## 2. Goals

| ID | Goal | Target |
| --- | --- | --- |
| G-001 | Define real product scope, ownership, and legal boundaries. | Approved scope, policies, owners, and support model. |
| G-002 | Establish governed Azure production foundations. | Dev/test/stage/prod, IaC, managed identity, Key Vault, durable stores, DR plan. |
| G-003 | Secure operator access and consequential actions. | 100% authenticated, authorized, attributed, and audited. |
| G-004 | Govern data and AI responsibly. | Classification, retention, privacy, lineage, and RAI gates before use. |
| G-005 | Replace mocks with reliable live ingestion. | Typed feeds with freshness, confidence, and degraded-mode behavior. |
| G-006 | Operate and release safely. | SLOs, telemetry, runbooks, release gates, rollback, vulnerability process. |
| G-007 | Meet readiness gates. | WCAG 2.2 AA, performance budgets, load tests, and cost dashboards. |

## 3. Users

| Persona | Needs |
| --- | --- |
| Emergency Operator | Fresh, trustworthy situational picture; clear confidence and degraded-state indicators. |
| Incident Commander / Approver | Approval workflow, risk context, and immutable audit. |
| Engineering / On-call | Telemetry, SLOs, runbooks, release gates, and rollback. |
| Security Owner | SSO/MFA, RBAC, audit, supply-chain, and browser/edge controls. |
| Data Governance / Privacy Lead | Classification, retention, residency, lineage, and PII controls. |
| Responsible AI Lead | Fairness, explainability, oversight, override, and model traceability. |
| FinOps Owner | Azure and LLM cost attribution, budgets, anomaly detection, and trend history. |

## 4. Scope

**MVP includes:** product/legal approval; named owners; Azure non-prod and prod
foundations; Entra ID SSO/MFA/RBAC; immutable audit; command approval workflow;
typed ingestion seam with one or two priority feeds; freshness/degraded-state
UI; observability, SLOs, runbooks; release and supply-chain gates; WCAG 2.2 AA
validation plan; Azure/LLM cost dashboard.

**Later phases:** additional providers; imagery/CV overlays; public social
signals; AI decision support; advanced unit economics; multi-region
active-active resilience.

**Out of scope for v1:** fictional prototype content as production content;
provider procurement details; final technology design beyond Azure; automated
AI evacuation, dispatch, or alert decisioning.

**Assumptions:** Titan Watch is intended for real life-safety-adjacent use;
Azure is the target cloud; Entra ID is the identity provider; data providers are
available or procurable.

## 5. Functional Requirements

| ID | Priority | Requirement | Acceptance |
| --- | --- | --- | --- |
| FR-001 | P1 | Replace fictional UI/content with approved product identity, supported uses, unsupported uses, and operator responsibilities. | Approved scope; production UI has no novelty labels/assets. |
| FR-002 | P1 | Complete legal review for privacy, data terms, licensing, accessibility, and emergency-use disclaimers. | Required policy artifacts signed off and published. |
| FR-003 | P1 | Name product, engineering, security, support, and escalation owners. | Ownership and service-desk process published. |
| FR-004 | P1 | Require SSO/OIDC, MFA, and RBAC for all operators. | No anonymous access; privileged actions require elevated roles. |
| FR-005 | P1 | Attribute every consequential action to an authorized operator. | Alerts, dispatches, and landfall reports include actor, action, timestamp. |
| FR-006 | P2 | Enforce session expiry, refresh, and idle lockout. | Session controls meet policy for always-on consoles. |
| FR-007 | P1 | Require requester/approver separation for high-consequence actions. | Approval state machine enforced; requester cannot approve own request. |
| FR-008 | P1 | Maintain immutable command audit records. | Requester, approver, action, timestamp, and justification are queryable. |
| FR-009 | P1 | Inventory and classify all feeds and command artifacts before ingestion. | Each data class has classification and owner. |
| FR-010 | P2 | Define retention and deletion for feeds, events, audit logs, model I/O, and actions. | Rules documented and enforced. |
| FR-011 | P2 | Minimize/redact PII and restrict/log sensitive access. | PII controls applied and auditable. |
| FR-012 | P2 | Document data residency and regulatory obligations. | Storage/processing locations and obligations approved. |
| FR-013 | P2 | Preserve signal lineage. | Source, timestamps, transformations, confidence, and downstream links traceable. |
| FR-014 | P1 | Gate AI-influenced decisions with fairness, explainability, oversight, uncertainty, override, and traceability. | Controls certified before operational AI ships; v1 decisioning deferred. |
| FR-015 | P1 | Provision governed Azure environments. | Dev/test/stage/prod, IaC, managed identity, Key Vault, durable stores exist. |
| FR-016 | P2 | Define and test resilience. | RTO/RPO, backup/restore, failover, and dependency-outage behavior validated. |
| FR-017 | P2 | Replace mocks with typed live ingestion. | Streams validate and normalize into domain types. |
| FR-018 | P2 | Surface degraded data states. | Freshness, confidence, stale/live state, idempotency, reconnect, and outage states visible. |
| FR-019 | P2 | Provide observability. | Logs, metrics, traces, correlation IDs, source-health events, health checks, dashboards. |
| FR-020 | P2 | Define SLOs, alerting, escalation, and runbooks. | Feed freshness, command latency, availability SLOs and runbooks active. |
| FR-021 | P2 | Enforce release governance. | Branch protection, required checks, reviews, approvals, release notes, rollback. |
| FR-022 | P3 | Secure the supply chain. | CVE gate, dependency updates, SBOM/provenance, pinned action SHAs, `SECURITY.md`. |
| FR-023 | P3 | Harden browser and edge posture. | CSP, security headers, reviewed origins, production console hygiene. |
| FR-024 | P3 | Certify accessibility and validate workflows. | WCAG 2.2 AA passed for operator-facing workflows. |
| FR-025 | P3 | Meet performance and scale budgets. | Load, soak, and latency tests pass. |
| FR-026 | P3 | Track Azure and LLM costs over time. | Cost dashboard, budgets, anomaly alerts, and unit economics active. |

## 6. Non-Functional Targets

| Category | Target |
| --- | --- |
| Availability | 99.95% monthly for dashboard, auth, command APIs, and live ingestion; 99.9% for reporting/cost dashboards. |
| Recovery | RTO 30 minutes for core operator capability; RPO 0 for confirmed command/audit transactions; RPO <= 5 minutes for live feed/event state. |
| Security | Zero anonymous or unattributed consequential actions; 100% sensitive access logged. |
| Accessibility | WCAG 2.2 AA for all operator-facing production workflows. |
| Shell load | Initial shell interactive <= 3 seconds on target field laptop/network. |
| Map load | Tactical map ready <= 5 seconds. |
| Command latency | <= 1 second p95 and <= 2 seconds p99. |
| Feed latency | Feed update visible <= 500 ms p95 after receipt; ingestion-to-dashboard <= 10 seconds p95. |
| Scale | v1 load test supports 500 concurrent operators and 1,000 events/minute. |
| Long session | Memory growth < 10% over 8 hours. |
| Release integrity | All production releases gated, auditable, and rollback-capable. |

## 7. Data, AI, and Analytics

**Provider onboarding order:** internal operational API for command/audit state;
hazard telemetry; CAD/911 or incident-management reports; resource/asset status;
sensor/IoT feeds; imagery; public social signals last due to privacy, bias,
credibility, and prompt-injection risk.

**Required events:** `command.requested`, `command.approved`, `source.health`,
and `ai.decision` when AI is introduced. Events must carry actor/source,
timestamp, correlation ID, outcome, and enough metadata for audit, SLOs, lineage,
and RAI review.

**Key reports:** command audit, source health, lineage, security/access review,
and Azure/LLM cost by subscription, service, environment, feature, workflow,
model, and trend period.

## 8. Rollout Plan

| Phase | Gate |
| --- | --- |
| Foundation | Product/legal scope, named owners, Azure environments, SSO/MFA/RBAC. |
| Accountability | Command approval workflow, immutable audit, session controls. |
| Live Data | Typed ingestion with one or two priority feeds, governance, freshness/degraded UI. |
| Operability | Observability, SLOs, runbooks, release gates, supply-chain controls. |
| Readiness | WCAG 2.2 AA validation, browser hardening, cost dashboard, load/soak tests. |
| Phase 2+ | Additional providers, imagery/CV, social ingestion, AI decision support, active-active resilience. |

Feature flags required for cutover: `live-ingestion` defaults off until streams
are validated; `ai-decisioning` defaults off until RAI controls are certified.

## 9. Risks

| Risk | Mitigation |
| --- | --- |
| Fictional prototype scope leaks into production. | Resolve product/legal readiness before production design. |
| Unauthorized or unaudited command actions. | Ship identity, RBAC, approval, and audit as P1 gates. |
| Privacy or surveillance exposure. | Classify data; define retention, minimization, residency, and lineage before ingestion. |
| Biased or opaque AI decisions. | Defer decisioning in v1; require RAI controls before operational AI ships. |
| Stale, conflicting, or degraded data during incidents. | Build freshness, confidence, idempotency, and outage behavior into ingestion and UI. |
| Compromised pipeline or dependencies. | Add supply-chain gates, pinned actions, SBOM, and vulnerability response. |
| Runaway Azure or LLM spend. | Implement cost attribution, trend history, budgets, anomaly alerts, and unit economics. |

## 10. Open Questions

| ID | Question | Status |
| --- | --- | --- |
| Q-001 | Confirm RTO/RPO, availability SLO, WCAG target, and performance budgets. | Resolved 2026-06-24. |
| Q-002 | Confirm named stakeholders and approval authorities. | Open; role placeholders in use. |
| Q-003 | Confirm AI/LLM initial scope. | Resolved: decisioning deferred; non-authoritative assist only. |
| Q-004 | Confirm data providers and integration priority. | Resolved: priority order set. |
| Q-005 | Confirm MVP boundary and release phasing. | Resolved. |

## 11. References

| Ref | Source | Use |
| --- | --- | --- |
| REF-001 | `docs/brds/titan-watch-production-readiness-brd.md` | Business intent and acceptance outcomes. |
| REF-002 | `gaps/01..15` | Production-readiness gap detail. |
| REF-003 | `README.md` | Prototype scope and current architecture. |

## 12. Changelog

| Version | Date | Summary |
| --- | --- | --- |
| 0.1 | 2026-06-24 | Initial PRD from BRD and gap analysis. |
| 0.2 | 2026-06-24 | Confirmed targets, AI scope, provider priority, MVP boundary, and approval roles. |
| 0.3 | 2026-06-24 | Condensed PRD, removed scaffolding, and consolidated requirements. |

<!-- markdown-table-prettify-ignore-end -->
