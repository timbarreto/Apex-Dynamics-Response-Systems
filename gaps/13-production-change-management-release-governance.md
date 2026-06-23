# 13. Production change management and release governance missing

**Status:** CI exists, but production governance is not present.

The repo has a useful CI workflow (`lint`, `test`, `build`) and a GitHub Pages
deploy workflow. For production, that is not enough. There is no branch
protection documented in-repo, no required security review, no environment
approval model beyond the Pages environment, no release notes, no rollback
process, no artifact signing, no SBOM, and no vulnerability response policy.

A production release process would need:

- **Branch and review gates:** required checks, code-owner review, security
  review for auth/ingestion/command paths, and protected release branches.
- **Artifact controls:** SBOM, provenance, signed build artifacts, pinned GitHub
  Action SHAs, and immutable deployment artifacts.
- **Environment promotion:** deterministic promotion from lower environments to
  production with approvals and audit records.
- **Vulnerability handling:** `SECURITY.md`, triage SLA, dependency update
  process, and emergency patch path.
- **Drift control:** IaC drift detection and configuration review.

**First step:** add `SECURITY.md`, Dependabot/CodeQL/audit gates, branch
protection documentation, and a release checklist before moving beyond demo
hosting.
