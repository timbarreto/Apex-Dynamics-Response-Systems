# 2. Responsible AI (unaddressed)

**Status:** No AI in code; major unaddressed design domain.

There is no AI or ML anywhere in the codebase — no model, inference, training,
or heuristic classifier. What resembles classification (`deriveThreatLevel`,
`threatRank`) is a deterministic `max` over hardcoded mock values. The only
"RAI" reference is the dangling `amiedansby/RAI` branch wired into the deploy
workflow, which suggests intended-but-unlanded work.

RAI still matters because the product premise is a textbook high-risk AI
scenario: the system "fuses imagery, sensor networks, incident reports, and
public social signals" to drive "damage assessment, response prioritization,
and evacuation planning." If any of that were real, AI would inform high-stakes,
life-safety decisions about where to send help and whom to evacuate. For the
prototype this is an acceptable scope exclusion; for the real system it is a
major unbuilt domain. A real version would require:

- **Fairness / bias:** prioritization and evacuation ranking must not
  systematically deprioritize neighborhoods by demographics or data density.
  Social-signal ingestion is especially bias-prone (who posts, in what
  language, on which platform).
- **Transparency / explainability:** operators committing dispatch or a citywide
  alert need to see *why* a threat is ranked as it is, not an opaque score. The
  `SignalEvent` model carries no provenance or confidence today.
- **Human oversight:** the `TriggerAlertBar` hold-to-confirm is the closest thing
  to a human-in-the-loop control; a real system needs this formalized for every
  AI-influenced action, with override capability.
- **Reliability / uncertainty:** mocked feeds are always confident. Real models
  need calibrated confidence, graceful degradation, and explicit handling of
  stale or missing sensor data.
- **Accountability / audit:** ties to the auth/identity gap — RAI decisions need
  traceability to both a model version and an accountable operator.
- **Privacy:** public social-signal fusion raises PII and surveillance concerns
  requiring governance.

**Loose end:** the orphaned `amiedansby/RAI` deploy branch in
`.github/workflows/deploy.yml` should be either landed or removed.
