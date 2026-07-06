# Changelog

All notable changes to this project are documented in this file.

This project follows Semantic Versioning.

The repository currently targets `0.1.0` as its initial release baseline while
the project remains in a pre-release state.

Current release state:

- Draft / pre-release only
- No Git tag created yet
- No GitHub Release published yet
- `0.1.0` remains a future release candidate only after final GRS verification

Keep all pending changes under `[Unreleased]` until a deliberate
release-preparation step moves them into a numbered version section.

Every release must use a Git tag in the format `vMAJOR.MINOR.PATCH`.

## [Unreleased]

This section captures completed repository remediation work that is ready to be
grouped into a future initial release once final verification is complete.

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
* Added release-readiness notes that document the current draft state and the
  future `0.1.0` release candidate baseline without publishing a release.

### Changed

* Fixed the existing frontend lint baseline so the current repository checks
  pass locally before CI runs them.
* Replaced the Vite template favicon with a project-specific MisterToy favicon
  and removed the unused React template asset.
