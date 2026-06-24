<!-- markdownlint-disable-file -->
<!-- markdown-table-prettify-ignore-start -->
# Project Titan Watch - Product Requirements Document (PRD)
Version 0.2 | Status Draft for review | Owner Tim Barreto | Team Apex Dynamics Engineering | Target TODO | Lifecycle Prototype-to-production uplift

## Progress Tracker
| Phase | Done | Gaps | Updated |
|-------|------|------|---------|
| Context | Yes | AI/LLM scope confirmed (deferred); providers prioritized | 2026-06-24 |
| Problem & Users | Yes | Validate personas with real operators | 2026-06-24 |
| Scope | Yes | MVP boundary and phasing confirmed | 2026-06-24 |
| Requirements | Yes | Targets confirmed; names pending | 2026-06-24 |
| Metrics & Risks | Yes | Measurable targets confirmed | 2026-06-24 |
| Operationalization | Partial | Confirm runbook ownership and on-call staffing | 2026-06-24 |
| Finalization | No | Pending sponsor sign-off and named owners | 2026-06-24 |
Unresolved Critical Questions: 1 | TBDs: 1

## 1. Executive Summary
### Context
Project Titan Watch is an emergency disaster-response command center. The intended platform fuses imagery, sensor networks, incident reports, and public social signals into a single situational picture that supports damage assessment, response prioritization, evacuation planning, dispatch, and shared situational awareness for first responders.

The current repository is a Vite + React frontend prototype. Feeds, state, and command actions are simulated in the browser: `useCommandState` drives everything from a `setInterval` heartbeat and a `scheduleNext` timer over in-memory mocks, and the only real network call is the map basemap. There is no backend, live data, authentication, authorization, audit trail, production hosting model, or operational control plane. The prototype demonstrates the operator experience but is not safe to run as a real emergency-response system.

### Core Opportunity
Convert a credible operator-experience prototype into a governed, secure, and reliable life-safety-adjacent platform. The prototype already proves the workflow; the opportunity is to replace mocks with governed live data, add identity and accountability controls, and stand up an operable Azure platform so the system can be trusted in real incidents.

### Goals
| Goal ID | Statement | Type | Baseline | Target | Timeframe | Priority |
|---------|-----------|------|----------|--------|-----------|----------|
| G-001 | Define real product scope, ownership, and legal boundaries | Outcome | Fictional prototype scope | Approved scope, owners, policies, support model | Pre-build | P1 |
| G-002 | Establish a governed Azure production platform | Outcome | No backend or hosting model | Environment separation, IaC, managed identity, durable stores, DR plan | Foundational | P1 |
| G-003 | Secure all operator access and consequential actions | Outcome | No access control | 100% authenticated, authorized, attributed, audited | Foundational | P1 |
| G-004 | Govern data and AI use responsibly | Outcome | No governance | Classification, retention, lineage, privacy, RAI controls complete before use | Pre-ingestion | P1 |
| G-005 | Replace mocks with reliable live ingestion | Outcome | Timer-driven mocks | Validated feeds with freshness and degraded-mode behavior | Capability | P2 |
| G-006 | Operate and release safely | Outcome | No telemetry or release gates | SLOs, telemetry, runbooks, release gates, rollback, vulnerability process | Capability | P2 |
| G-007 | Meet accessibility, performance, and cost-readiness gates | Outcome | Uncertified | WCAG target, performance budgets, load tests, cost dashboards/alerts | Gate | P3 |

### Objectives (Optional)
| Objective | Key Result | Priority | Owner |
|-----------|------------|----------|-------|
| Production-safe access | Zero anonymous or unattributed consequential actions | P1 | Security Owner |
| Trustworthy data | Every operational signal carries source, freshness, and confidence | P2 | Engineering Owner |
| Operable service | SLOs, runbooks, and rollback validated before go-live | P2 | Operations Lead |
| Cost transparency | Azure and LLM spend attributable and alertable | P3 | FinOps Owner |

## 2. Problem Definition
### Current Situation
The system is a frontend-only prototype. All "live" elements are local timers over mock data. There is no ingestion layer, API client, streaming transport, schema validation, backend, identity provider, or audit store. The UI presents a fictional kaiju-defense scenario with mascot assets and novelty copy that are useful for demonstration but unsuitable for production.

### Problem Statement
A command console for emergency response is a high-consequence, high-value system. In its current form Titan Watch cannot be safely operated: decisions that may influence evacuation and dispatch are driven by simulated data, anyone can perform consequential actions without authentication or attribution, and there is no governance over data, AI, releases, or operations.

### Root Causes
* The prototype was intentionally mocked end to end to demonstrate operator experience, not to run production workloads.
* No backend, identity, ingestion, or operational control plane has been built, so safety, security, and accountability controls do not yet exist.

### Impact of Inaction
Running the prototype as a real system risks unsafe decisions from unverified data, unauthorized or unauditable command actions, privacy and surveillance exposure, biased or opaque AI outputs, and unmanaged incident-driven Azure and LLM spend.

## 3. Users & Personas
| Persona | Goals | Pain Points | Impact |
|---------|-------|------------|--------|
| Emergency Operator | Maintain situational awareness, prioritize response, dispatch resources | Needs trustworthy, fresh data and clear confidence signals during stress | Primary daily user; safety-critical decisions |
| Incident Commander / Approver | Authorize high-consequence actions, accept risk | Needs requester/approver separation and audit visibility | Accountability and command integrity |
| Engineering / On-call | Operate, observe, and recover the platform | Needs telemetry, runbooks, SLOs, rollback | Service reliability and incident response |
| Security Owner | Enforce identity, RBAC, supply-chain and edge controls | No current access control or hardening | Protects a high-value target |
| Data Governance / Privacy Lead | Classify data, enforce retention, residency, lineage | No governance defined | Legal and privacy compliance |
| Responsible AI Lead | Ensure fairness, explainability, oversight, override | AI scope undefined | Trust in AI-influenced decisions |
| FinOps Owner | Track and control Azure and LLM cost | No cost visibility | Prevents runaway spend |

### Journeys (Optional)
Operator authenticates with SSO/MFA, reviews fused situational picture with freshness and confidence indicators, prioritizes incidents, and requests high-consequence actions that route to an approver. The approver reviews and authorizes; every action is attributed and audited. During degraded data or dependency outages the UI surfaces stale/live state and confidence so operators adjust decisions accordingly.

## 4. Scope
### In Scope
* Product and legal readiness; ownership and support model
* Governed Azure platform with environment separation and IaC
* Identity, MFA, and RBAC for all operators
* Command authorization and approval chain with immutable audit
* Data governance: classification, retention, privacy, residency, lineage
* Responsible AI controls for AI-influenced decisions (gating later AI capability)
* Typed live ingestion replacing mocks, onboarded in confirmed priority order (operational API and 1-2 hazard/CAD feeds in MVP)
* Degraded-mode reliability and dependency-failure behavior
* Observability, SLOs, and operational runbooks
* Release governance, supply-chain, and browser/edge hardening
* Accessibility certification (WCAG 2.2 AA) and operator workflow validation
* Performance/scale budgets and Azure/LLM cost operations
* Non-authoritative AI assistance only (summarization, search, drafting, triage notes)

### Out of Scope (justify if empty)
* Treating fictional prototype content as production content
* Procurement of specific third-party data providers
* Final technology selection beyond the stated Azure target
* Detailed implementation design
* AI/LLM decisioning in v1 (no automated evacuation ranking, dispatch recommendation, or alert decisioning)
* Imagery/CV overlays, social-signal ingestion, and multi-region active-active resilience (later phases)

### Assumptions
* Titan Watch is intended as a real, life-safety-adjacent service
* Azure is the target platform; identity is provided by Entra ID
* Real data providers will be available or procured per the confirmed priority order
* AI/LLM decisioning is deferred from v1; only non-authoritative AI assistance is permitted in v1

### Constraints
* Production decisions may influence evacuation and response, raising the safety bar
* The command console is a high-value attack target
* Location, imagery, PII, public signals, accessibility, and emergency-use obligations must be governed

## 5. Product Overview
### Value Proposition
A single, trustworthy situational picture for emergency response that fuses multiple live data sources with explicit freshness and confidence, secures and attributes every consequential action, and remains observable and operable during incidents.

### Differentiators (Optional)
* Accountability-first command model with requester/approver separation and immutable audit
* Degraded-mode design that keeps operators informed when data is stale or sources fail
* Governed AI use with explainability, oversight, and override

### UX / UI (Conditional)
Retain the proven command-center experience (situational dashboard, multi-source feed, severity telemetry, command map) while replacing novelty copy and mascot assets with approved product language. Severity and status must be conveyed with non-color indicators in addition to color. UX Status: Prototype validated; production content cleanup and WCAG 2.2 AA certification pending.

## 6. Functional Requirements
| FR ID | Title | Description | Goals | Personas | Priority | Acceptance | Notes |
|-------|-------|------------|-------|----------|----------|-----------|-------|
| FR-001 | Product scope and content cleanup | Replace fictional production surfaces with approved product identity, supported uses, unsupported uses, and operator responsibilities | G-001 | Product Owner, Operator | P1 | Scope approved; production UI has no novelty labels/assets | Gap 1; BR-001 |
| FR-002 | Legal and policy review | Complete review for privacy, data-source terms, third-party licensing, accessibility, and emergency-use disclaimers | G-001 | Legal/Compliance | P1 | Required policy artifacts signed off and published | Gap 1; BR-002 |
| FR-003 | Ownership and support model | Name product, engineering, security, support, and escalation owners | G-001 | Product Owner | P1 | Ownership and service-desk process published | Gap 1; BR-003 |
| FR-004 | Authenticated access (SSO/MFA/RBAC) | Require SSO/OIDC with MFA and RBAC for all operators | G-003 | Operator, Security Owner | P1 | No anonymous access; privileged actions require elevated roles | Gap 3; BR-004 |
| FR-005 | Action attribution | Attribute every consequential action to an authorized operator | G-003 | Operator, Approver | P1 | Alerts, dispatches, and landfall reports include actor, action, timestamp | Gap 3; BR-005 |
| FR-006 | Session lifecycle controls | Enforce session expiry, refresh, and idle lockout for always-on consoles | G-003 | Operator, Security Owner | P2 | Session controls meet policy | Gap 3; BR-006 |
| FR-007 | Approval chain separation | Require requester/approver separation for high-consequence actions | G-003 | Approver | P1 | Approval state machine enforced; requester cannot approve own request | Gap 4; BR-007 |
| FR-008 | Immutable command audit | Maintain immutable command audit records | G-003 | Approver, Security Owner | P1 | Requester, approver, timestamp, action, justification queryable | Gap 4; BR-008 |
| FR-009 | Data inventory and classification | Inventory and classify all feeds and command artifacts before ingestion | G-004 | Data Governance | P1 | Each data class has classification and owner | Gap 5; BR-009 |
| FR-010 | Retention and deletion rules | Define retention and deletion across feeds, events, audit logs, model I/O, actions | G-004 | Data Governance | P2 | Rules documented and enforced | Gap 5; BR-010 |
| FR-011 | Privacy controls | Minimize/redact PII; restrict and log sensitive access | G-004 | Privacy Lead | P2 | PII controls applied and audited | Gap 5; BR-011 |
| FR-012 | Residency and compliance | Document residency and regulatory obligations | G-004 | Data Governance, Legal | P2 | Storage/processing locations and obligations approved | Gap 5; BR-012 |
| FR-013 | Signal lineage | Preserve source, timestamps, transformations, confidence, and downstream links | G-004 | Data Governance, Operator | P2 | Lineage traceable end to end | Gap 5; BR-013 |
| FR-014 | Responsible AI controls | Apply fairness, explainability, oversight, uncertainty, override, and traceability to AI-influenced decisions. v1 permits only non-authoritative AI assistance (summarization, search, drafting, triage notes); no automated evacuation ranking, dispatch recommendation, or alert decisioning | G-004 | RAI Lead, Operator | P1 | RAI controls in place before any AI-influenced operational decision ships | Gap 6; BR-014; AI decisioning deferred |
| FR-015 | Governed Azure environments | Run on dev/test/stage/prod topology with IaC, managed identity, Key Vault, durable stores | G-002 | Engineering Owner | P1 | Governed environments exist | Gap 2; BR-015 |
| FR-016 | Resilience and recovery | Define and test RTO/RPO, backup/restore, failover, dependency-outage behavior | G-002 | Operations Lead | P2 | Resilience validated; RTO/RPO TODO | Gap 2; BR-016 |
| FR-017 | Typed live ingestion | Replace mocks with typed ingestion for hazard, sensor, incident/CAD, social, imagery, and asset streams | G-005 | Engineering Owner, Operator | P2 | Streams validate and normalize into domain types | Gap 7; BR-018 |
| FR-018 | Degraded-data handling | Support freshness, confidence, stale/live state, idempotency, reconnect, and outage states | G-005 | Operator | P2 | Degraded states operator-visible | Gap 8; BR-019 |
| FR-019 | Observability | Provide logs, metrics, traces, correlation IDs, source-health events, health checks, dashboards | G-006 | On-call | P2 | Observability stack operational | Gap 9; BR-020 |
| FR-020 | SLOs and runbooks | Define feed freshness, command latency, availability SLOs, alerts, escalation, runbooks | G-006 | Operations Lead | P2 | SLOs and runbooks active | Gap 9; BR-021 |
| FR-021 | Release governance | Enforce branch protection, required checks, code-owner/security review, approvals, release notes, rollback | G-006 | Engineering Owner | P2 | Release gates enforced | Gap 10; BR-022 |
| FR-022 | Supply-chain security | CVE gate, dependency updates, SBOM/provenance, pinned action SHAs, SECURITY.md | G-006 | Security Owner | P3 | Supply-chain controls active | Gap 11; BR-023 |
| FR-023 | Browser/edge hardening | Enforce CSP, security headers, reviewed third-party origins, production console hygiene | G-006 | Security Owner | P3 | Hardening enforced | Gap 12; BR-024 |
| FR-024 | Accessibility certification | Certify WCAG target and validate keyboard, screen reader, contrast, motion, stress, localization | G-007 | Accessibility Lead | P3 | WCAG target passed; TODO target level | Gap 13; BR-025 |
| FR-025 | Performance and scale | Meet shell load, map-ready, command latency, memory, throughput, fan-out budgets | G-007 | Engineering Owner | P3 | Budgets pass; targets TODO | Gap 14; BR-026 |
| FR-026 | Cost operations | Track Azure and LLM spend/token usage with budgets, anomaly alerts, unit economics | G-007 | FinOps Owner | P3 | Cost dashboard operational | Gap 15; BR-027 |

### Feature Hierarchy (Optional)
```plain
Titan Watch Production Platform
├── Product & Legal Readiness (FR-001..003)
├── Identity & Accountability (FR-004..008)  [Entra ID SSO/MFA/RBAC]
├── Data & AI Governance (FR-009..014)        [AI decisioning deferred to later phase]
├── Azure Platform & Resilience (FR-015..016)
├── Live Ingestion & Degraded Mode (FR-017..018)
├── Operability & Release (FR-019..021)
└── Production-Readiness Gates (FR-022..026)
```

## 7. Non-Functional Requirements
| NFR ID | Category | Requirement | Metric/Target | Priority | Validation | Notes |
|--------|----------|------------|--------------|----------|-----------|-------|
| NFR-001 | Security | All access authenticated, authorized, attributed | 0 anonymous/unattributed consequential actions | P1 | Pen test, access review | Gaps 3,4 |
| NFR-002 | Reliability | Recovery objectives met | RTO 30 min for core operator capability; RPO 0 for confirmed command/audit, <= 5 min for live feed/event state | P2 | DR test | Gap 2 |
| NFR-003 | Availability | Availability SLO | 99.95% monthly for core dashboard, auth, command APIs, live ingestion; 99.9% monthly for reporting/cost dashboards | P2 | SLO monitoring | Gap 9 |
| NFR-004 | Performance | Application shell interactive | <= 3 s on target field laptop/network | P3 | Load test | Gap 14 |
| NFR-005 | Performance | Tactical map ready | <= 5 s | P3 | Synthetic test | Gap 14 |
| NFR-006 | Performance | Command action round trip | <= 1 s p95, <= 2 s p99 | P2 | Telemetry | Gaps 9,14 |
| NFR-007 | Scalability | Concurrency and event fan-out | 500 concurrent operators and 1,000 events/min (v1 load test) | P3 | Load test | Gap 14 |
| NFR-008 | Reliability | Long-session memory growth | < 10% growth over 8 hours | P3 | Soak test | Gap 14 |
| NFR-009 | Privacy | PII minimized, redacted, access logged | 100% sensitive access logged | P2 | Audit review | Gap 5 |
| NFR-010 | Accessibility | WCAG conformance | WCAG 2.2 AA for all operator-facing production workflows | P3 | Accessibility audit | Gap 13 |
| NFR-011 | Observability | Traceability via correlation IDs | 100% of consequential paths traced | P2 | Trace review | Gap 9 |
| NFR-012 | Maintainability | Governed releases with rollback | All prod releases gated | P2 | Pipeline audit | Gap 10 |
| NFR-013 | Security | Supply-chain integrity | CVE gate + SBOM on every release | P3 | CI evidence | Gap 11 |
| NFR-014 | Compliance | Data residency obligations met | Approved storage/processing regions | P2 | Compliance review | Gap 5 |
| NFR-015 | Performance | Feed update visible after receipt | <= 500 ms p95 | P2 | Telemetry | Gaps 8,14 |
| NFR-016 | Performance | Ingestion-to-dashboard latency | <= 10 s p95 for operational feeds | P2 | Telemetry | Gaps 7,14 |

## 8. Data & Analytics (Conditional)
### Inputs
Data sources are onboarded through a typed ingestion seam in confirmed priority order: (1) authenticated internal operational API for command state and audit; (2) hazard telemetry (weather, flood, fire, seismic); (3) CAD/911 or incident-management reports; (4) resource/asset status (units, availability, dispatch state); (5) sensor/IoT feeds; (6) imagery (satellite, drone, damage overlays); (7) public social signals last, due to privacy, bias, credibility, and prompt-injection risk. All are currently mocked.

### Outputs / Events
Normalized domain events, source-health events, command/approval/audit events, and AI decision outputs with uncertainty and explanation metadata.

### Instrumentation Plan
| Event | Trigger | Payload | Purpose | Owner |
|-------|---------|--------|---------|-------|
| command.requested | Operator requests action | actor, action, target, timestamp | Audit, latency SLO | Engineering |
| command.approved | Approver authorizes | approver, request ID, justification, timestamp | Accountability | Engineering |
| source.health | Feed status change | source, freshness, latency, error rate, confidence | Reliability | Operations |
| ai.decision | AI-influenced output | model, inputs ref, confidence, explanation, override state | RAI traceability | RAI Lead |

### Metrics & Success Criteria
| Metric | Type | Baseline | Target | Window | Source |
|--------|------|----------|--------|--------|--------|
| Anonymous consequential actions | Security | Unknown | 0 | Continuous | Audit log |
| Feed freshness breaches | Reliability | N/A | TODO | Per SLO window | Source-health |
| Command latency | Performance | N/A | TODO | Rolling | Telemetry |
| Azure + LLM spend | Cost | N/A | Within budget | Monthly | Cost dashboard |

## 9. Dependencies
| Dependency | Type | Criticality | Owner | Risk | Mitigation |
|-----------|------|------------|-------|------|-----------|
| Azure platform and IaC | Infrastructure | High | Engineering | Foundational for all | Stand up governed environments first |
| Identity provider (OIDC) | Security | High | Security | Blocks access control | Integrate SSO/MFA early |
| Data providers (operational API, hazard, CAD, asset, sensor, imagery, social) | External | High | Product | Availability/procurement | Onboard per confirmed priority order; v1 targets 1-2 priority feeds |
| Map basemap (CARTO CDN) | External | Medium | Engineering | Third-party origin | Review CSP and origin trust |
| AI/LLM services | External | Low (v1) | RAI Lead | Decisioning deferred | v1 limited to non-authoritative assistance; RAI controls gate any operational AI |

## 10. Risks & Mitigations
| Risk ID | Description | Severity | Likelihood | Mitigation | Owner | Status |
|---------|-------------|---------|-----------|-----------|-------|--------|
| R-001 | Scope ambiguity from fictional prototype content | High | High | Resolve product/legal readiness before production design | Product Owner | Open |
| R-002 | Unauthorized or unaudited command actions | Critical | High | Deliver identity, RBAC, approval, audit as P1 gates | Security Owner | Open |
| R-003 | Privacy or surveillance exposure | High | Medium | Classify data; define retention, minimization, residency, lineage | Data Governance | Open |
| R-004 | Biased or opaque AI decisions | High | Medium | Require RAI controls before AI workflows ship | RAI Lead | Open |
| R-005 | Degraded or conflicting data during incidents | High | High | Build freshness, confidence, idempotency, outage behavior | Engineering | Open |
| R-006 | Compromised pipeline or dependencies | High | Medium | Supply-chain gates, pinned actions, SBOM, vuln response | Security Owner | Open |
| R-007 | Runaway Azure or LLM spend | Medium | Medium | Cost attribution, trends, budgets, anomaly alerts | FinOps Owner | Open |

## 11. Privacy, Security & Compliance
### Data Classification
All feeds and command artifacts must be inventoried and classified before ingestion, each with an assigned owner. Location, imagery, and public-signal data require heightened handling.

### PII Handling
Minimize and redact PII; restrict and log access to sensitive data; apply retention and deletion rules across raw feeds, normalized events, audit logs, model I/O, and operator actions.

### Threat Considerations
The command console is a high-value target with no current access control. STRIDE-class threats (spoofing, tampering, repudiation, information disclosure, denial of service, elevation) apply to identity, command, ingestion, and edge surfaces. Public social ingestion introduces prompt-injection and credibility risks.

### Regulatory / Compliance (Conditional)
| Regulation | Applicability | Action | Owner | Status |
|-----------|--------------|--------|-------|--------|
| Privacy/data-protection | TODO confirm jurisdictions | Privacy notice and controls | Legal/Privacy | Open |
| Accessibility (WCAG) | Operator UI | Certify target level | Accessibility Lead | Open |
| Emergency-use obligations | Life-safety service | Disclaimers and policy review | Legal | Open |
| Data residency | Storage/processing locations | Document and approve | Data Governance | Open |

## 12. Operational Considerations
| Aspect | Requirement | Notes |
|--------|------------|-------|
| Deployment | Governed Azure environments with IaC and release gates | Gaps 2,10 |
| Rollback | Validated rollback for every production release | Gap 10 |
| Monitoring | Logs, metrics, traces, health checks, dashboards | Gap 9 |
| Alerting | SLO-based alerts with escalation paths | Gap 9 |
| Support | Named owners and service-desk process | Gap 1 |
| Capacity Planning | Throughput/fan-out budgets validated under load | Gap 14 |

## 13. Rollout & Launch Plan
### MVP Boundary
The first releasable increment (MVP) includes: approved product/legal scope; Azure non-prod and prod environments; Entra ID auth with MFA and RBAC; immutable audit trail; command approval workflow; typed ingestion seam with 1-2 priority feeds; feed freshness/degraded-state UI; observability, SLOs, and runbooks; release governance and supply-chain gates; a WCAG 2.2 AA validation plan; and a cost dashboard for Azure and any LLM usage. Later phases add more providers, imagery/CV overlays, social-signal ingestion, AI decision support, advanced FinOps/unit economics, and multi-region active-active resilience.

### Phases / Milestones
| Phase | Date | Gate Criteria | Owner |
|-------|------|--------------|-------|
| MVP - Foundation | TODO | Product/legal scope, Azure non-prod/prod, Entra ID auth/MFA/RBAC (P1) | Product + Security |
| MVP - Accountability | TODO | Command approval workflow and immutable audit (P1) | Security |
| MVP - Live data | TODO | Typed ingestion with 1-2 priority feeds, freshness/degraded UI, data governance | Engineering + Governance |
| MVP - Operability | TODO | Observability, SLOs, runbooks, release governance, supply-chain gates | Operations |
| MVP - Readiness gates | TODO | WCAG 2.2 AA validation plan, cost dashboard, edge hardening | Security + FinOps |
| Phase 2+ | TODO | More providers, imagery/CV, social ingestion, AI decision support, advanced FinOps, multi-region active-active | Product + Engineering |

### Feature Flags (Conditional)
| Flag | Purpose | Default | Sunset Criteria |
|------|---------|--------|----------------|
| live-ingestion | Toggle live feeds vs. mocks during cutover | Off | All streams validated |
| ai-decisioning | Gate AI-influenced workflows | Off | RAI controls certified |

### Communication Plan (Optional)
Publish ownership, support, and escalation processes; communicate release notes and incident runbooks to operators and on-call staff.

## 14. Open Questions
| Q ID | Question | Owner | Deadline | Status |
|------|----------|-------|---------|--------|
| Q-001 | Confirm RTO/RPO, availability SLO, WCAG target, and performance budgets | Operations/Eng | 2026-06-24 | Resolved |
| Q-002 | Confirm named stakeholders and approval authorities | Sponsor | TODO | Open (role placeholders in use) |
| Q-003 | Confirm whether AI/LLM capabilities are in initial production scope | Sponsor/RAI | 2026-06-24 | Resolved (deferred; non-authoritative assist only) |
| Q-004 | Confirm target data providers and integration priorities | Product | 2026-06-24 | Resolved (priority order set) |
| Q-005 | Confirm MVP boundary and release phasing across requirements | Product | 2026-06-24 | Resolved |

## 15. Changelog
| Version | Date | Author | Summary | Type |
|---------|------|-------|---------|------|
| 0.1 | 2026-06-24 | Tim Barreto | Initial PRD derived from production-readiness BRD and gap analysis | Created |
| 0.2 | 2026-06-24 | Tim Barreto | Confirmed SLO/RTO/RPO, WCAG 2.2 AA, performance budgets; deferred AI decisioning; set provider priority, MVP boundary, and approval-authority roles | Updated |

## 16. References & Provenance
| Ref ID | Type | Source | Summary | Conflict Resolution |
|--------|------|--------|---------|--------------------|
| REF-001 | BRD | docs/brds/titan-watch-production-readiness-brd.md | Business requirements and acceptance outcomes | Authoritative for business intent |
| REF-002 | Gap analysis | gaps/01..15 | Detailed production-readiness gaps | Source of technical detail |
| REF-003 | Repo | README.md | Prototype scope and current architecture | Describes current state |

### Citation Usage
Functional requirements FR-001..FR-026 map directly to gaps 1..15 and BRD requirements BR-001..BR-027. Goals G-001..G-007 mirror BRD objectives OBJ-1..OBJ-7.

## 17. Appendices (Optional)
### Approval Authorities
Role-based placeholders are used until individuals are named.

| Role | Approves |
|------|----------|
| Executive Sponsor | Funding, risk acceptance, go-live |
| Product Owner | Scope, MVP, supported incident types |
| Engineering Owner | Architecture, delivery plan, release readiness |
| Security Owner | Auth, RBAC, threat model, supply-chain controls |
| Data Governance/Privacy Owner | Data classification, retention, residency, PII controls |
| Responsible AI Owner | RAI controls and AI/LLM release gates |
| Operations/On-call Owner | SLOs, runbooks, incident process |
| Accessibility Owner | WCAG 2.2 AA conformance |
| FinOps Owner | Budgets, cost dashboards, anomaly alerts |
| Legal/Compliance Owner | Policy text, disclaimers, licensing, emergency-use terms |

### Glossary
| Term | Definition |
|------|-----------|
| Degraded mode | Operating state where data is stale or sources have failed, surfaced to operators |
| Lineage | Traceable path from source signal to decision, including transformations and confidence |
| RAI | Responsible AI controls: fairness, explainability, oversight, uncertainty, override, traceability |
| SLO | Service Level Objective for freshness, latency, or availability |

### Additional Notes
This PRD intentionally states what must be true for production use without selecting implementation technologies beyond the stated Azure target. Items marked TODO require sponsor confirmation.

Generated 2026-06-24 by PRD Builder (mode: full)
<!-- markdown-table-prettify-ignore-end -->
