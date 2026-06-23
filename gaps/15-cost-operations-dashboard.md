# 15. No long-running cost operations dashboard

**Status:** No FinOps or token-cost visibility.

The repo has no operational dashboard for tracking cost over time. That is
acceptable for a static mocked prototype, but it becomes a production risk once
the system moves to Azure services and especially if LLM-backed summarization,
classification, RAG, or operator-assist features are added. Azure spend and LLM
token usage can both grow quietly during incidents, load tests, replay jobs, or
long-running monitoring windows.

A production Apex deployment would need:

- **Azure cost visibility:** daily and monthly spend by subscription, resource
  group, service, environment, region, tag, and deployment version.
- **LLM cost visibility:** prompt tokens, completion tokens, cached tokens,
  model, feature, tenant/workspace, operator workflow, ingestion source, and
  request outcome.
- **Extended trend history:** rolling views over weeks, months, and quarters,
  not just current-incident or current-billing-period totals.
- **Budgets and anomaly detection:** alerts for spend spikes, token bursts,
  retry loops, runaway evaluation jobs, and unexpected model mix changes.
- **Unit economics:** cost per incident, alert, dispatch workflow, ingested
  record, generated summary, and active operator hour.
- **Governance hooks:** owner tags, chargeback/showback reporting, budget
  approvals, and exportable evidence for operational reviews.

Without this, the system could be technically healthy while becoming
financially unsafe to operate. For an emergency-response workload, cost controls
also need to avoid blunt throttling that hides or delays safety-critical
signals.

**First step:** define required cost dimensions and tags before building the
Azure architecture, then add a prototype dashboard backed by Azure Cost
Management exports and LLM request-level token accounting.
