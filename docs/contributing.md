# Contributing to soroban-ui-kit

Welcome! This repo is part of the [Drips Wave Program](https://drips.network) — you can earn on-chain streaming payments for resolving issues.

## How to Contribute

### 1. Find an Issue
Browse the [Issues tab](../../issues). Issues are labeled by complexity:

| Label | Scope |
|-------|-------|
| `drips:trivial` | Docs, single tests, minor fixes |
| `drips:medium` | New component variants, hook logic |
| `drips:high` | New component families, full test suites |

### 2. Claim It
Comment `/claim` on the issue. Only one contributor can hold a claim at a time.

### 3. Fork and Branch
```bash
git checkout -b feat/your-feature-name
```

### 4. Check Dependencies
Each issue lists its dependencies. Make sure those issues are merged before you start.

### 5. Before Opening a PR
Run these locally and make sure all pass:
```bash
npm run typecheck
npm run test
npm run build
```

### 6. Open a PR
Reference the issue in your PR description: Closes #XX

### 7. Get Paid
Once your PR is merged, your registered Drips wallet address starts receiving streaming payments.