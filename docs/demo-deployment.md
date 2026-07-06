# Demo and Deployment Notes

This document records the currently approved public demo target for
`ca-mistertoy-frontend` and provides concise wording that can be reused in the
main README.

## Approved Live Demo

Canonical live demo URL:

`https://mistertoy-app.onrender.com/`

The existing Render deployment is the approved public demo reference for this
repository.

## Current Deployment Status

- The frontend demo is currently served from Render.
- GitHub Pages is intentionally not the active demo target for this repository.
- This task does not add, duplicate, or migrate deployment targets.

## Backend Dependency

The production frontend uses the same-origin API base path `/api/`.

This means full application behavior in the live demo depends on the deployed
backend being available behind that path.

For local frontend-only development, the repository also supports
`VITE_LOCAL=true` to switch to in-memory toy and user services.

## Documentation and Security Notes

- Public documentation should reference the Render URL above as the live demo.
- Do not document GitHub Pages as the current demo target.
- Keep `VITE_GOOGLE_MAPS_KEY` as a placeholder-only value in tracked files.
- Do not add real browser keys, secrets, or private deployment details to the
  repository.
