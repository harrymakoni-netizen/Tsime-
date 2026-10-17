# From pitch demo to pilot

The attached specification spans a twelve-month programme. This release implements its test-data pitch-demo stage. The following remain before a real pilot can be operated.

## Infrastructure and security

- Provision PostgreSQL 16/PostGIS and private S3-compatible evidence storage. Implement the specification's normalized entities and transactional append-only double-entry ledger. Store phone/name fields encrypted with keyed phone hashes.
- Build a server API with role-based authorization, staff password/TOTP sign-in, registered/revocable devices, encrypted local records, PIN unlock and 30-day offline expiry. Do not reuse the demo's role switch as access control.
- Implement idempotent sync bootstrap/batches with server verification, conflict policy and evidence uploads. Store outbound codes only in the restricted gateway queue; exclude plaintext codes from field bootstrap.
- Add token rotation and allowlisting for inbound gateway endpoints, message delivery acknowledgements/retries, contact resolution, unknown sender callback handling, and raw message retention.
- Configure production monitoring, backups, restore verification, rate limits, audit of personal-data access, field-level permissions and security review.

## Telecom and field operations

- Choose the district/ward, sign service/access agreements, register actual site components, consents and contacts, then configure the dual-SIM Android gateway and dedicated line.
- Confirm free missed-call behavior, “please call me” support and callback working-hour rules. Add native-reviewed chiShona and isiNdebele GSM-7 templates, typo/keyword handling and sequential weekly-check correlation.
- Add weekly-check/reminder workers, service-target alarms, contact-change approval, source-dry evidence, preventive schedules and escalation tracking.
- Complete diagnostic measurements, field safety controls, approved closure fallbacks, retest scheduling, perceptual photo deduplication, repeat-failure flags and stock reconciliation.
- Replace the schematic with MapLibre geographic maps and licensed downloadable pilot tiles. Validate 14-day offline operation and sync recovery on low-memory Android devices.

## Financial and reporting controls

- Approve contract fees and rule versions. Agree payment policy for entirely dry periods and partial months. Implement per-contract reporting and invoices, not the demo's uniform illustrative fee.
- Configure signed garden agreements, per-garden splits, seasons, harvests, buyer/payment details, receipt uploads, payout confirmations and reversal entries. Statements should freeze a transaction set; later corrections require adjustments.
- Add report evidence links, partner-specific row-level permissions, aggregate-only public summaries and reporting against real verified data.

## Release gates

Complete end-to-end API/authorization/idempotency tests, gateway restart/network tests, device revocation tests, security assessment and a full-day field trial with real basic phones and forced loss of connection. Confirm the specification's regulatory and stakeholder arrangements before onboarding real villages.
