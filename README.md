# ca-mistertoy-frontend

Frontend application for the Coding Academy MisterToy project, built with
React and Vite.

## Live Demo

Approved demo URL:

`https://mistertoy-app.onrender.com/`

The Render deployment is the current canonical live demo for this repository.
GitHub Pages is intentionally not used as an active demo target at this time.

## Deployment Notes

- The production frontend expects backend API routes under the same origin at
  `/api/`.
- Full remote functionality depends on the backend being available behind that
  production API path.
- Local development can also run in `VITE_LOCAL=true` mode with in-memory
  services for frontend-only work.
- `VITE_GOOGLE_MAPS_KEY` must remain a browser-safe placeholder in committed
  documentation and example files.

## Local Development

Project-specific setup, service modes, and backend integration notes are
documented in [docs/local-development.md](docs/local-development.md).

Common commands:

```powershell
npm install
npm run dev
npm run dev:local
npm run lint
npm run build
```

## Repository Status

This repository is still in a draft, pre-release state while GRS remediation
and final verification continue.
