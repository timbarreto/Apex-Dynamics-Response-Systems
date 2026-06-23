# 6. No Azure production architecture

**Status:** Static demo deployment only; no production hosting design.

The current deploy target is GitHub Pages. That is fine for a public prototype,
but it is not a production architecture for an emergency-response workload. The
repo has no Azure infrastructure-as-code, no environment separation, no backend
service, no private networking plan, no managed identity, no Key Vault, no
database, no disaster-recovery design, and no documented RTO/RPO. The Vite
`base` is hardcoded to the GitHub Pages project path, which further confirms the
current app is optimized for demo hosting rather than a production platform.

A Microsoft production path would need:

- **Environment topology:** dev/test/stage/prod subscriptions or resource
  groups with clear promotion gates.
- **Azure hosting:** an authenticated frontend host plus backend APIs, not a
  public static-only GitHub Pages site for command actions.
- **Managed service identity:** service-to-service access via managed identity,
  with secrets and certificates in Azure Key Vault.
- **Data stores:** durable operational state, audit records, source-health
  history, and dispatch workflow state.
- **Resilience design:** region strategy, backup/restore, failover, RTO/RPO,
  and dependency outage behavior.
- **Infrastructure as code:** Bicep/Terraform/Azure Developer CLI or equivalent,
  reviewed and promoted like application code.

**First step:** add an architecture decision record that names the Azure target
services, environments, identity model, data stores, and RTO/RPO; then scaffold
the minimal IaC for a non-production environment.
