---
title: "Project Titan Watch Production Readiness BRD"
description: "Concise Business Requirements Document for moving the Apex Dynamics Response Systems command-center prototype toward production readiness."
author: "Tim Barreto"
ms.date: 06/24/2026
ms.topic: reference
---

# Project Titan Watch Production Readiness BRD

## 1. Document Control

| Field | Value |
| --- | --- |
| Status | Draft for review |
| Version | 0.2 |
| Source material | `gaps/` production-readiness gap analysis |
| Initiative type | Prototype-to-production platform uplift |

This BRD defines business needs and acceptance outcomes for taking Project Titan
Watch from a mocked frontend prototype to a production-ready emergency-response
platform. It states what must be true before production use; it does not select
implementation technologies. Items marked **TODO** need sponsor confirmation.

## 2. Context

Project Titan Watch is a command-center concept for emergency disaster response.
The intended system fuses imagery, sensors, incident reports, and public signals
to support damage assessment, prioritization, evacuation planning, dispatch, and
shared situational awareness.

The current repo is a Vite/React prototype. Feeds, state, and command actions
are simulated in the browser. There is no backend, live data, authentication,
authorization, audit trail, production hosting model, or operational control
plane. The prototype demonstrates the operator experience, but it is not safe to
run as a real emergency-response system.

## 3. Business Drivers

| Driver | Need |
| --- | --- |
| Safety | Decisions may influence evacuation and response; failure can harm people. |
| Security | A command console is a high-value target and currently has no access control. |
| Compliance | Location, imagery, PII, public signals, accessibility, and emergency-use obligations must be governed. |
| Accountability | Alerts, dispatches, and overrides must be attributable to authorized operators. |
| Continuity | The service must be observable, resilient, recoverable, and operable during incidents. |
| Cost control | Azure and LLM usage must be tracked before incident-driven spend becomes unmanaged. |

## 4. Objectives

| ID | Objective | Success measure |
| --- | --- | --- |
| OBJ-1 | Define real product scope, ownership, and legal boundaries. | Approved scope, owners, policies, and support model. |
| OBJ-2 | Establish a governed Azure production platform. | Environment separation, IaC, managed identity, durable stores, DR plan. |
| OBJ-3 | Secure all operator access and consequential actions. | 100% authenticated, authorized, attributed, and audited. |
| OBJ-4 | Govern data and AI use responsibly. | Classification, retention, lineage, privacy, and RAI controls complete before use. |
| OBJ-5 | Replace mocks with reliable live ingestion. | Validated feeds, freshness indicators, degraded-mode behavior. |
| OBJ-6 | Operate and release safely. | SLOs, telemetry, runbooks, release gates, rollback, vulnerability process. |
| OBJ-7 | Meet accessibility, performance, and cost-readiness gates. | WCAG target, performance budgets, load tests, cost dashboards and alerts. |

## 5. Scope

**In scope:** product/legal readiness; Azure platform; identity and RBAC;
command approval; data governance; Responsible AI controls; typed ingestion;
degraded-mode reliability; observability; release governance; supply-chain and
browser hardening; accessibility; performance; Azure and LLM cost operations.

**Out of scope:** fictional prototype content as production content; procurement
of specific third-party providers; final technology selection beyond the stated
Azure target; detailed implementation design.

**Assumptions:** Titan Watch is intended as a real life-safety-adjacent service;
Azure is the target platform; real data providers will be available or procured;
AI/LLM scope is still **TODO**.

## 6. Stakeholders

| Role | Primary responsibility |
| --- | --- |
| Executive Sponsor | Funding, risk acceptance, production approval |
| Product Owner | Scope, supported incident types, operator responsibilities |
| Engineering Owner | Architecture, delivery, quality, release process |
| Security Owner | Identity, authorization, supply chain, edge security |
| Data Governance / Privacy | Classification, retention, residency, privacy |
| Responsible AI Lead | Fairness, explainability, oversight, model accountability |
| Legal / Compliance | Policies, licensing, disclaimers, legal review |
| Operations / On-call Lead | SLOs, telemetry, runbooks, incident response |
| Accessibility Lead | WCAG and operator workflow validation |
| FinOps Owner | Cost visibility, budgets, anomaly detection |
| Operators | Real-world usability, trust, workflow validation |

## 7. Requirements

Priority follows production-blocking risk: P1 = go-live blocker, P2 = required
before the related capability ships, P3 = production-readiness gate.

| ID | Priority | Requirement | Acceptance outcome |
| --- | --- | --- | --- |
| BR-001 | P1 | Replace fictional production surfaces with approved product identity, supported uses, unsupported uses, and operator responsibilities. | Scope approved; production UI has no novelty labels/assets. |
| BR-002 | P1 | Complete legal and policy review for privacy, data-source terms, third-party licensing, accessibility, and emergency-use disclaimers. | Required policy artifacts signed off and published where needed. |
| BR-003 | P1 | Name product, engineering, security, support, and escalation owners. | Ownership and service-desk process published. |
| BR-004 | P1 | Require SSO/OIDC with MFA and RBAC for all operators. | No anonymous access; privileged actions require elevated roles. |
| BR-005 | P1 | Attribute every consequential action to an authorized operator. | Alerts, dispatches, and landfall reports include actor, action, and timestamp. |
| BR-006 | P2 | Enforce session lifecycle controls for always-on consoles. | Expiry, refresh, and idle lockout meet policy. |
| BR-007 | P1 | Require requester/approver separation for high-consequence actions. | Approval state machine enforced; requester cannot approve own request. |
| BR-008 | P1 | Maintain immutable command audit records. | Requester, approver, timestamp, action, and justification are queryable. |
| BR-009 | P1 | Inventory and classify all feeds and command artifacts before ingestion. | Each data class has classification and owner. |
| BR-010 | P2 | Define retention and deletion rules. | Rules cover raw feeds, normalized events, audit logs, model I/O, and operator actions. |
| BR-011 | P2 | Apply privacy controls. | PII minimized/redacted; sensitive access restricted and logged. |
| BR-012 | P2 | Document residency and regulatory obligations. | Storage/processing locations and compliance obligations approved. |
| BR-013 | P2 | Preserve signal lineage. | Source, timestamps, transformations, confidence, and downstream links are traceable. |
| BR-014 | P2 | Apply Responsible AI controls to AI-influenced decisions. | Fairness, explainability, human oversight, uncertainty, override, and model/operator traceability are in place. |
| BR-015 | P1 | Run on governed Azure environments. | Dev/test/stage/prod topology, IaC, managed identity, Key Vault, and durable stores exist. |
| BR-016 | P2 | Define and test resilience. | RTO/RPO **TODO**, backup/restore, failover, and dependency-outage behavior validated. |
| BR-018 | P2 | Replace mocks with typed ingestion. | Hazard, sensor, incident/CAD, social, imagery, and asset streams validate and normalize into domain types. |
| BR-019 | P2 | Support degraded data and dependency failures. | Freshness, confidence, stale/live state, idempotency, reconnect, and outage states are operator-visible. |
| BR-020 | P2 | Provide observability. | Logs, metrics, traces, correlation IDs, source-health events, health checks, and dashboards exist. |
| BR-021 | P2 | Define SLOs and runbooks. | Feed freshness, command latency, availability SLOs, alerts, escalation, and runbooks are active. |
| BR-022 | P2 | Govern production releases. | Branch protection, required checks, code-owner/security review, approvals, release notes, and rollback are enforced. |
| BR-023 | P3 | Secure the software supply chain. | CVE gate, dependency updates, SBOM/provenance, pinned action SHAs, and `SECURITY.md` exist. |
| BR-024 | P3 | Harden browser and edge posture. | CSP, security headers, reviewed third-party origins, and production console hygiene are enforced. |
| BR-025 | P3 | Certify accessibility and validate operator workflows. | WCAG target **TODO** passed; keyboard, screen reader, contrast, motion, stress workflow, and localization checks complete. |
| BR-026 | P3 | Meet performance and scale budgets. | Shell load, map-ready time, command latency, memory growth, event throughput, and fan-out targets **TODO** pass. |
| BR-027 | P3 | Track Azure and LLM costs over time. | Cost dashboard shows spend/token usage by agreed dimensions with budgets, anomaly alerts, and unit economics. |

## 8. Future Operating Model

In production, operators authenticate with SSO/MFA, work within role-based
permissions, and use approval workflows for high-consequence actions. Live data
flows through validated ingestion seams with lineage, freshness, confidence, and
degraded-mode behavior. AI-influenced decisions are explainable, auditable, and
overridable. Engineering operates the platform with SLOs, telemetry, runbooks,
governed releases, security gates, accessibility validation, performance
budgets, and cost controls.

## 9. Reporting Requirements

| Report | Purpose |
| --- | --- |
| Audit | Immutable command history with actor, approver, timestamp, justification, and outcome. |
| Source health | Feed freshness, latency, error rate, confidence, and dependency status. |
| Lineage | Source-to-decision traceability for operational signals and AI outputs. |
| Security | Access reviews, privileged action reports, dependency risk, and vulnerability status. |
| Cost | Azure spend and LLM token usage by subscription, service, environment, feature, workflow, model, and trend period. |

## 10. Key Risks

| Risk | Mitigation |
| --- | --- |
| Scope ambiguity from fictional prototype content | Resolve product/legal readiness before production design. |
| Unauthorized or unaudited command actions | Deliver identity, RBAC, approval, and audit controls as P1 gates. |
| Privacy or surveillance exposure | Classify data and define retention, minimization, residency, and lineage before ingestion. |
| Biased or opaque AI decisions | Require RAI controls before AI-influenced workflows ship. |
| Degraded or conflicting data during incidents | Build freshness, confidence, idempotency, and outage behavior into ingestion and UI. |
| Compromised pipeline or dependencies | Add supply-chain gates, pinned actions, SBOM, and vulnerability response. |
| Runaway Azure or LLM spend | Implement cost attribution, trends, budgets, anomaly alerts, and unit economics. |

## 11. Open Items

- **TODO:** Confirm RTO/RPO, SLOs, WCAG target, and performance budgets.
- **TODO:** Confirm named stakeholders and approval authorities.
- **TODO:** Confirm whether AI/LLM capabilities are in initial production scope.
- **TODO:** Confirm target data providers and integration priorities.
- **TODO:** Confirm MVP boundary and release phasing across requirements.

## Appendix A: Gap Traceability

| Gap | Related requirements |
| --- | --- |
| 1. Product/legal readiness | BR-001-BR-003 |
| 2. Azure production architecture | BR-015, BR-016 |
| 3. Authentication and authorization | BR-004-BR-006 |
| 4. Command authorization / approval | BR-007, BR-008 |
| 5. Data governance, privacy, retention | BR-009-BR-013 |
| 6. Responsible AI | BR-014 |
| 7. Data streams / ingestion | BR-018 |
| 8. Reliability under degraded data | BR-019 |
| 9. Observability and runbooks | BR-020, BR-021 |
| 10. Change management and release governance | BR-022 |
| 11. Supply chain / npm risk | BR-023 |
| 12. Browser and edge security | BR-024 |
| 13. Accessibility and operator usability | BR-025 |
| 14. Performance and scale | BR-026 |
| 15. Cost operations dashboard | BR-027 |
