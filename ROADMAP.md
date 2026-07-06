# Roadmap

This roadmap captures the remaining follow-through after the approved
`v0.1.0` documentation baseline for `ca-mistertoy-frontend`.

## Current State

- Core GRS repository baseline work is complete, including the README rewrite,
  local setup documentation, changelog, security policy, CI quality workflow,
  screenshot coverage, and release-readiness notes.
- Production dependency remediation has been completed for the current
  high-severity audit findings.
- The repository documentation and version references have been aligned to the
  approved `0.1.0` baseline.
- The package version has been updated to `0.1.0`.
- No Git tag has been created, and no GitHub Release has been published.
- `CHANGELOG.md`, `README.md`, and `docs/release-readiness.md` now reflect the
  approved release state while keeping publication as a separate step.

## Remaining Near-Term Work

### 1. Publication Step After Explicit Approval

- Create the `v0.1.0` Git tag only when explicit approval is given for that
  publication step.
- Publish the matching GitHub Release only when explicit approval is given for
  remote release publication.
- Keep the tag format as `vMAJOR.MINOR.PATCH`.

### 2. Post-Release Documentation Maintenance

- Add future repository or product updates under `[Unreleased]` after the
  `0.1.0` publication step is complete.
- Revisit roadmap priorities after the initial release is published so the file
  tracks new work rather than release-preparation history.
