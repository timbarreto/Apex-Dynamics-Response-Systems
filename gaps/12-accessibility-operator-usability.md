# 12. Accessibility and operator usability not certified

**Status:** Some accessibility affordances exist; no formal validation.

The code includes good prototype-level affordances: ARIA roles, keyboard roster
selection, reduced-motion handling for the alert trigger, and tested map error
fallback. That is not enough for production. A real command center needs formal
WCAG validation and operator workflow testing, especially because this UI uses
dense panels, color-coded severity, motion, map overlays, and high-consequence
actions.

Production readiness would require:

- **WCAG audit:** keyboard-only use, screen-reader behavior, focus order, name
  and role accuracy, contrast, zoom, reduced motion, and non-color cues.
- **Workflow validation:** can an operator triage, select a target, understand
  uncertainty, request dispatch, approve dispatch, and recover from errors under
  stress?
- **Human factors:** alarms, severity language, confirmation timing, and
  escalation prompts need user research and policy review.
- **Localization/access needs:** incident response may require multilingual
  labels, time formats, units, and accessible alerting patterns.

**First step:** run an accessibility audit against the current dashboard and
turn failures into tracked issues before layering in real workflows.
