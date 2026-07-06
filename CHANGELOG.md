# Changelog

All notable changes to this project are documented in this file.

This project follows Semantic Versioning.

The `0.1.0` release has been approved for documentation and version alignment,
while Git tag creation and GitHub Release publishing remain separate manual
steps.

Current release state:

- Approved `0.1.0` release baseline documented locally
- No Git tag created yet
- No GitHub Release published yet
- Future work should accumulate under `[Unreleased]` after `v0.1.0`

Keep new changes under `[Unreleased]` after this approved `0.1.0` baseline.

Every release must use a Git tag in the format `vMAJOR.MINOR.PATCH`.

## [Unreleased]

No post-`0.1.0` changes have been recorded yet.

## [0.1.0] - 2026-07-06

### Added

* Added the baseline GRS repository files for licensing, security policy,
  editor consistency, runtime version pinning, release history, and roadmap
  planning.
* Added `.env.example` with placeholder-only frontend configuration guidance
  for the Google Maps browser key.
* Added deployment and demo documentation that records the approved Render live
  site, clarifies the backend dependency for full functionality, and notes that
  GitHub Pages is intentionally not the active demo target.
* Added `docs/local-development.md` to document local setup, service modes,
  backend repository assumptions, and the sibling-folder build sync workflow.
* Added GRS media assets documentation plus a representative local-mode
  frontend screenshot under `assets/screenshots/` for future README use.
* Added a GitHub Actions quality workflow that installs dependencies, runs
  lint, and verifies the production build.
* Added release-readiness notes that document the approved `0.1.0` baseline
  and the separate publication steps that still require explicit approval.

### Changed

* Fixed the existing frontend lint baseline so the current repository checks
  pass locally before CI runs them.
* Updated production dependency resolutions to remove high-severity frontend
  audit findings from `axios`, `react-router-dom`, and Formik's Lodash chain.
* Refreshed `ROADMAP.md` so it reflects the completed remediation baseline and
  the remaining pre-release path toward a future `0.1.0` approval.
* Replaced the Vite template favicon with a project-specific MisterToy favicon
  and removed the unused React template asset.
* Rewrote `README.md` into a project-specific GRS-aligned frontend README with
  demo, screenshot, configuration, backend-relationship, development, and
  release-state documentation.
