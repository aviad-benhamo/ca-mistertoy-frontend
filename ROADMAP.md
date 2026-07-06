# Roadmap

This roadmap captures the remaining pre-release work for
`ca-mistertoy-frontend` after the main GRS remediation pass.

## Current State

- Core GRS repository baseline work is complete, including the README rewrite,
  local setup documentation, changelog, security policy, CI quality workflow,
  screenshot coverage, and release-readiness notes.
- Production dependency remediation has been completed for the current
  high-severity audit findings.
- The repository remains in a draft, pre-release state with package version
  `0.0.0`.
- No Git tag has been created, and no GitHub Release has been published.

## Remaining Near-Term Work

### 1. Release Preparation Alignment

- Review release-facing documents together before any release approval:
  `README.md`, `CHANGELOG.md`, `ROADMAP.md`, and `docs/release-readiness.md`.
- Confirm that `[Unreleased]` reflects the intended initial release scope
  without treating the repository as already published.
- Keep release preparation separate from Git tag creation and GitHub Release
  publishing.

### 2. Final Release-Readiness Verification

- Re-run the agreed validation baseline before any `v0.1.0` decision:
  `npm run lint`, `npm run build`, and
  `npm audit --omit=dev --audit-level=high`.
- Confirm that repository documentation, demo references, and current quality
  checks still match the actual project state.
- Record the final recommendation on whether the repository is ready to move
  into deliberate release preparation.

### 3. Approved Release Follow-Through

- If release preparation is explicitly approved, move the appropriate
  `[Unreleased]` entries into a `0.1.0` section in `CHANGELOG.md`.
- Create the `v0.1.0` Git tag and GitHub Release only as a separate,
  deliberate step after approval.
