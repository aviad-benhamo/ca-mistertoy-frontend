# Changelog

All notable changes to this project are documented in this file.

This project follows Semantic Versioning.

The repository currently targets `0.1.0` as its initial release baseline while
the project remains in a pre-release state.

Keep all pending changes under `[Unreleased]` until a deliberate
release-preparation step moves them into a numbered version section.

Every release must use a Git tag in the format `vMAJOR.MINOR.PATCH`.

## [Unreleased]

### Added

* Added the baseline GRS repository files for licensing, security policy,
  editor consistency, runtime version pinning, release history, and roadmap
  planning.
* Added `.env.example` with placeholder-only frontend configuration guidance
  for the Google Maps browser key.
* Added `docs/local-development.md` to document local setup, service modes,
  backend repository assumptions, and the sibling-folder build sync workflow.
* Added a GitHub Actions quality workflow that installs dependencies, runs
  lint, and verifies the production build.

### Changed

* Fixed the existing frontend lint baseline so the current repository checks
  pass locally before CI runs them.
