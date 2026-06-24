---
title: Security Policy
description: Vulnerability disclosure policy and supported versions for the Titan Watch platform.
---

## Reporting a vulnerability

Titan Watch supports life-safety-adjacent operations, so we treat security
reports with priority. If you discover a vulnerability, please report it
privately and give us a reasonable window to remediate before any public
disclosure.

Report security issues to the security contact below. Do not open a public
GitHub issue for security vulnerabilities.

* Disclosure contact: `security@example.com` (placeholder: replace with the
  Apex Dynamics Response Systems security distribution list before launch)
* Preferred channel: encrypted email or GitHub private vulnerability reporting
  when enabled for this repository

When you report, include as much of the following as you can:

* A description of the vulnerability and its potential impact
* Steps to reproduce, including affected URLs, inputs, or configuration
* Any proof-of-concept code, logs, or screenshots
* Your assessment of severity and suggested remediation, if available

## Our commitment

* We acknowledge new reports within three business days.
* We provide an initial assessment and remediation plan within ten business days.
* We coordinate a disclosure timeline with you and credit reporters who request it.
* We do not pursue legal action against good-faith research that respects this
  policy and avoids privacy violations, service disruption, or data destruction.

## Supported versions

This repository currently ships a single actively maintained line. Security
fixes land on the default branch (`main`) and are published through the standard
deploy process.

| Version    | Supported          |
|------------|--------------------|
| `main`     | Yes                |
| Older tags | No                 |

As the platform matures toward production, this table will be updated to track
released versions and their support windows.

## Scope

This policy covers the source code and deployment configuration in this
repository. Third-party dependencies are tracked through automated dependency
and code scanning; report issues in upstream projects to their respective
maintainers.
