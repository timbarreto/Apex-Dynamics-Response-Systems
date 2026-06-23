# 4. No command authorization / approval chain

**Status:** Dispatch is an instant, self-authorizing click.

There is no military-style approval workflow. `dispatchUnit` commits
synchronously — check capacity, decrement, log — with no requester/approver
split, pending state, rank check, or record of who authorized it. The only
friction anywhere is the single-operator hold-to-confirm on the citywide alert.

A real command center needs:

- A dispatch **state machine** (`requested → pending → approved/denied →
  executed`), not an instant decrement.
- **Two-person / two-role authorization** (requester ≠ approver) for
  high-consequence actions, with threshold-based escalation by rank.
- **Full audit trail** (requester, approver, timestamp, justification) — the
  `SignalEvent` model has no such fields.

This layer sits on top of identity (#3) and a backend/ingestion layer (#7) and
cannot exist without them.
