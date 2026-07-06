# Local Development and Configuration

This document explains how to configure and run the `ca-mistertoy-frontend`
repository without relying on private setup notes.

## Repository Responsibilities

This repository contains the frontend application for the MisterToy Coding
Academy project.

The backend API is maintained separately in:

`https://github.com/aviad-benhamo/ca-mistertoy-backend`

Frontend responsibilities in this repository:

- React/Vite UI code
- frontend routing, state, and browser interactions
- frontend build output
- optional sync of the built frontend into a sibling backend checkout

Backend responsibilities in the separate backend repository:

- API routes
- authentication and session handling
- data access and persistence
- production server runtime

## Environment Variables

Create a local `.env` file when you need to provide browser-safe frontend
configuration values.

Use `.env.example` as the placeholder reference.

Currently used environment variables:

- `VITE_GOOGLE_MAPS_KEY`: browser key used by the About page map integration

Do not commit real keys. Use a restricted Google Maps browser key that is
limited by HTTP referrer and only enables the APIs required by this project.

## Google Maps Key Guidance

The frontend reads `VITE_GOOGLE_MAPS_KEY` from `import.meta.env` in the About
page.

Recommended restrictions for the Google Maps browser key:

- Restrict the key by HTTP referrer.
- Allow only the frontend origins you actually use for development or
  deployment.
- Enable only the Google Maps APIs required by the application.
- Rotate the key if it is ever exposed unintentionally.

## Service Modes

The frontend supports two service modes:

- Remote mode: uses the remote API service implementations
- Local mode: uses the local in-memory service implementations

The mode is selected by `VITE_LOCAL`:

- When `VITE_LOCAL=true`, the frontend uses the local toy and user services.
- When `VITE_LOCAL` is not set to `true`, the frontend uses the remote
  services.

The existing npm scripts already control the expected mode:

- `npm run dev`: starts the Vite dev server and uses remote services
- `npm run dev:remote`: same behavior as `npm run dev`
- `npm run dev:local`: starts the Vite dev server with `VITE_LOCAL=true`
- `npm run build`: creates the production frontend build in `dist/`
- `npm run preview`: serves the built frontend locally for preview
- `npm run build:backend`: builds the frontend and syncs the output into a
  sibling backend checkout

## Local Backend API Assumption

When the frontend runs in remote mode during development, the current local API
target is:

`http://localhost:3030/api/`

This target is defined in the frontend HTTP service for non-production usage.

To use remote mode locally, start the backend application separately from the
backend repository and make sure it is listening on port `3030`.

## Sibling Backend Checkout Expectation

The `npm run build:backend` workflow depends on this local folder layout:

```text
<parent-folder>/
  ca-mistertoy-frontend/
  ca-mistertoy-backend/
```

The sync script copies the frontend `dist/` output into:

`../ca-mistertoy-backend/public`

This is a repository-relative sibling-folder assumption only. It does not
require any specific personal machine path.

If the backend repository is not checked out as a sibling folder with the name
`ca-mistertoy-backend`, `npm run build:backend` will not be able to sync the
build output correctly.

## Typical Local Workflows

Use remote services against the local backend:

```powershell
npm install
npm run dev
```

Run the backend separately from the backend repository so the frontend can
reach `http://localhost:3030/api/`.

Use local in-memory services with no backend dependency:

```powershell
npm install
npm run dev:local
```

Build the frontend:

```powershell
npm run build
```

Preview the production build locally:

```powershell
npm run preview
```

Build and sync into a sibling backend checkout:

```powershell
npm run build:backend
```

## Validation Commands

Use these commands to verify the current frontend quality baseline locally:

```powershell
npm run lint
npm run build
```

The repository also includes a GitHub Actions quality workflow that runs:

- dependency installation with `npm ci`
- `npm run lint`
- `npm run build`
