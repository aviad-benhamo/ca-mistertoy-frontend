# Security Policy

## Supported Versions

This repository currently supports the latest code available on the `main`
branch.

No tagged public release has been published yet. Until an initial release is
prepared, security fixes are handled on top of the active `main` branch.

## Reporting a Vulnerability

Please report suspected security issues privately to the repository owner
instead of opening a public GitHub issue.

Include:

- A clear description of the issue.
- Steps to reproduce it, when possible.
- The affected page, feature, or request flow.
- Relevant browser, operating system, or environment details.

The maintainer will review the report as soon as practical and coordinate a
fix before public disclosure when the issue is confirmed.

## Secrets Policy

Do not commit API keys, passwords, tokens, certificates, private keys, or real
user data to this repository.

Keep local environment files such as `.env` untracked. Use placeholder values
only in any future example configuration files.
