---
title: Release Checklist
description: Pre-deploy gates and branch-protection setup for publishing Titan Watch to GitHub Pages.
---

## Purpose

This checklist defines the gates that must pass before Titan Watch is deployed
to GitHub Pages. The deploy workflow (`.github/workflows/deploy.yml`) publishes
only from `main`, so every change reaches production through a reviewed,
gated pull request.

## Pre-deploy gates

Confirm each item is green on the pull request before merging to `main`:

* Lint passes (`npm run lint` via the CI `check` job)
* Tests pass (`npm test` via the CI `check` job)
* Build succeeds (`npm run build` via the CI `check` job)
* Dependency audit is clean (`npm audit --audit-level=high` via the CI `check` job)
* CodeQL analysis completes with no new high-severity alerts (CodeQL workflow)
* At least one reviewing approval is recorded
* Code owner review is satisfied for sensitive paths (see `.github/CODEOWNERS`)
* The `main` branch ruleset is enforced (see below)

## Branch protection as code

The repository ruleset in `.github/rulesets/main-protection.json` requires a
passing CI status check and at least one review before changes merge to `main`.
Applying a ruleset is a repository-admin action and is not run by the deploy
pipeline. A repository administrator applies it with the GitHub CLI:

```sh
# Create the ruleset (run once, from a repo admin context):
gh api \
  --method POST \
  -H "Accept: application/vnd.github+json" \
  /repos/{owner}/{repo}/rulesets \
  --input .github/rulesets/main-protection.json

# List existing rulesets to find the ruleset id:
gh api /repos/{owner}/{repo}/rulesets

# Update an existing ruleset after editing the JSON:
gh api \
  --method PUT \
  -H "Accept: application/vnd.github+json" \
  /repos/{owner}/{repo}/rulesets/{ruleset_id} \
  --input .github/rulesets/main-protection.json
```

> [!NOTE]
> The `required_status_checks` contexts in the ruleset (`check` and
> `Analyze (javascript-typescript)`) must match the actual check run names
> produced by the CI and CodeQL workflows. Adjust the contexts if a workflow or
> job name changes.

## Deploy

After the gates pass and the change merges to `main`, the deploy workflow runs
automatically. A maintainer can also trigger it manually from the Actions tab
via `workflow_dispatch`. The elevated Pages permissions are scoped to the
`deploy` job only; the `build` job runs read-only.

## Post-deploy verification

* Confirm the deploy workflow completed without errors
* Open the published Pages URL and verify the application loads
* Confirm the private `workshop/` content did not ship (the deploy job fails the
  build if it leaks into `dist/`)
