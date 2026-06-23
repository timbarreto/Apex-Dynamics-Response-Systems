# 1. Real product/legal readiness unresolved

**Status:** Prototype branding and fictional scenario remain embedded.

The app still presents a fictional kaiju-defense scenario, mascot assets, and
mock operational language. That is deliberate and useful for the prototype, but
a production Apex response system needs real product boundaries, user-facing
policy text, support ownership, and legal review. It must be clear what the
system is authorized to do, which data sources it uses, what confidence means,
and who is accountable when the system is wrong.

Production readiness would require:

- **Product scope:** documented supported incident types, unsupported uses, and
  operator responsibilities.
- **Legal/policy review:** privacy notice, data-source terms, third-party
  licensing, accessibility obligations, and emergency-use disclaimers.
- **Support model:** named product owner, engineering owner, security owner,
  escalation path, and service desk process.
- **Content cleanup:** replace fictional labels/assets with approved Apex
  product language and remove novelty copy from production surfaces.

**First step:** define the real Apex product scope and ownership model, then
split demo-only content from production-ready UI strings and assets.
