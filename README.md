# Tsime

**Rural water, cared for.** A responsive operations workspace implementing the pitch-demo milestone of the Tsime Platform Development Specification v1.0 (October 2026).

## Run

```sh
npm ci
npm run dev
npm test
npm run build
CHROMIUM_PATH=/usr/bin/chromium npm run test:e2e
```

Next.js 16, React, strict TypeScript, IndexedDB, a service worker, and Lucide icons. `npm run build` creates a static export in `out/` suitable for Vercel. Browser tests serve that production export. Install a Chromium browser and set `CHROMIUM_PATH` if yours is elsewhere.

## Implemented

- Responsive coordinator dashboard and read-only partner **demo view**.
- 35 clearly labelled sample water points; search, filters, baseline registration, status evidence and an illustrative clickable network map.
- Voice/missed-call/weekly-check fault simulation and numeric SMS parser. Two-hour ticket deduplication, triage and dispatch with generated four-digit confirmation codes.
- Offline device persistence; cached app shell; safety-gated repair checklist; compressed before/after images; 100 m location check; flow tests; salted confirmation hashes and five-attempt limit; parts deduction on closure.
- Stock receipts and reorder levels; garden transactions with unique receipts, monthly 50/25/25 statements, balanced integer-cent ledger posting, and simulated village summary messages.
- Water test register and positive-test alerts; audit trail; CSV partner/garden reports and JSON device backup.
- Pure tested rules: timeline clipping, low flow, source-dry exclusion, unverified time after 14 days, payment thresholds/rounding, revenue sharing, distance and code hashing.

## Try the core journey

1. Report a fault using SMS `4 2`.
2. In Fault reports, triage the new report and dispatch a technician.
3. Open Demo messages and note the generated caretaker code.
4. In Work orders, open the checklist, confirm isolation, complete checks, add two different photos and enter a flow reading.
5. Choose **Use sample-site location** (the sample sites are not your physical location), then enter the code and close the repair. This works after disconnecting the network.
6. See the point's status, inventory and report update. Reload to verify device persistence.

## Scope and limitations

This is a **test-data pitch demo, not a production pilot**. All mutations remain in the current browser's IndexedDB; no central database, API, real SMS, server sync, real staff authentication or authorization is deployed. Role switching changes the presentation only. The service worker caches the shell after the first online visit. Local storage is not encrypted, and clearing browser storage removes records. Demo confirmation codes intentionally appear in the simulated message log for the presenter.

The map is an explicitly labelled schematic, not a geographic basemap. Locations, people estimates, contracts, fees and the district are examples. Photos are checked for exact duplication only; perceptual detection is not implemented. Test recording covers faecal results and pH, not the full laboratory workflow. Statement posting is once per month in this demo; corrections and payouts are not implemented. Do not enter real personal or operational data.

See [production roadmap](docs/PRODUCTION.md) for the remaining infrastructure and specification work. No live telecom or SMS claims are made by this release.

## Reporting rules

Periods use Africa/Harare boundaries. Dry periods are excluded only while supported by evidence; all stale evidence becomes unverified after 14 days. An entirely dry period returns N/A with no inferred payout, pending the contract decision in section 19. Current-month reports are provisional. Payment amounts are illustrative, with a $10 monthly fee. Money is stored as integer cents and garden rounding remainders go to the village fund.
