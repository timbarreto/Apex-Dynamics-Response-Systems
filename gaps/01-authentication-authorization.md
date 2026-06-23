# 1. Authentication & authorization (absent)

**Status:** Unbuilt — largest missing domain.

The codebase has no authentication or authorization of any kind. There is no
login, token, session, identity, or role concept; the only `role` references in
the source are ARIA accessibility attributes. The app ships as a public static
SPA, so anyone who reaches the URL gets the full command center and can invoke
every action anonymously — including consequential ones like `dispatchUnit`,
`triggerAlert` (citywide alert), and `reportLandfall`.

For the prototype as scoped this is acceptable: with no backend and only mocked
state, there is nothing to protect. For the system it represents — an
emergency-response command center — it is the single largest unbuilt area. A
real version would require:

- **AuthN:** operator login, SSO/OIDC, and MFA (a defense console is a
  high-value target).
- **AuthZ:** role separation (e.g. viewer vs. dispatcher vs. commander), with
  privileged actions such as raising a citywide alert or committing dispatch
  gated behind elevated roles.
- **Identity in audit:** every dispatch/alert/landfall event should record the
  acting operator. The `SignalEvent` model currently has no `actor`/`operatorId`
  field, so actions are attributed only to "the system."
- **Session lifecycle:** token issuance, expiry, refresh, and idle lockout for
  an always-on console.
- **Authenticated transport:** a backend and authenticated API — there is
  currently no service seam to attach an identity to (see the "no data
  abstraction seam" gap).

**Cheapest honest first step:** add an `actor`/`operatorId` field to the
`SignalEvent` model (even hardcoded to a mock operator) so the data model has a
seam for identity later, mirroring how the map marks "where live tracks would
plug in."
