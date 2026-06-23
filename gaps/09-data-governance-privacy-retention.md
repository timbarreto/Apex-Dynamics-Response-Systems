# 9. Data governance, privacy, and retention undefined

**Status:** No data classification or privacy model.

The README says the real system would fuse imagery, sensors, incident reports,
and public social signals. Those data classes can include location data,
images, emergency reports, personal data, sensitive infrastructure details, and
possibly protected or regulated information. The current prototype has no
classification labels, retention rules, redaction, export controls, data
lineage, consent/legal-basis notes, or access-review process.

A real Apex production deployment would require:

- **Data classification:** identify public, internal, confidential, restricted,
  and safety-critical data categories.
- **Retention/deletion:** define retention windows for raw feeds, normalized
  events, audit logs, model inputs/outputs, and operator actions.
- **Privacy controls:** minimize PII, redact where possible, restrict sensitive
  fields by role, and log access to sensitive records.
- **Residency/compliance:** document where data is stored and processed and
  which regulatory obligations apply.
- **Lineage:** preserve source, timestamp, transformation, confidence, and
  downstream decision links for every operational signal.

**First step:** create a data inventory covering each planned feed and command
artifact, then assign classification, retention, and access rules before
building ingestion.
