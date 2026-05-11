# Database Strategy: PostgreSQL Only

> **Decision: PostgreSQL-only. No Firestore. No Firebase.**
>
> Final decision made 2026-04-15. Single database for all data.
> Google OAuth for login, JWT for sessions, PostgreSQL for everything else.

---

## Quick Start (OrbStack)

```bash
cd apps/backend

# 1. Start PostgreSQL
docker compose up -d

# 2. Run migrations
npm run db:migrate

# 3. Seed test data
npm run db:seed

# 4. Start backend
npm run dev

# 5. Browse data visually
npm run db:studio    # → http://localhost:5555
```

Connection: `postgresql://blend:blend_secret@localhost:5432/blend_studio`

---

## Architecture

```
Google OAuth  →  Login  →  JWT tokens  →  PostgreSQL
                                             │
                                             ├── users
                                             ├── refresh_tokens
                                             ├── branches (brandConfig: JSONB)
                                             ├── branch_versions
                                             ├── branch_snapshots
                                             └── token_uploads
```

---

## Why PostgreSQL Only

### The Previous State (Two Databases)

The backend previously used **two databases simultaneously**:

| Database                 | What It Stores                     | Tables/Collections |
| ------------------------ | ---------------------------------- | ------------------ |
| **PostgreSQL** (Prisma)  | Users, RefreshTokens, TokenUploads | 3 tables           |
| **Firestore** (Firebase) | Branches, Versions, Snapshots      | 3 collections      |

### The Problem

- **Double cost** — two bills, two backups, two monitoring setups
- **No cross-DB joins** — a branch references `createdBy` (user in PostgreSQL), but Firestore has no foreign key to PostgreSQL
- **Orphaned data** — if a user is deleted from PostgreSQL, their branches in Firestore remain
- **Double dev setup** — local dev needs both PostgreSQL (Docker) and Firebase emulator
- **Inconsistent schema** — PostgreSQL has strict migrations, Firestore has no schema at all

---

## 2. Every Query The Platform Actually Makes

| #   | Query                                           | File                   | Complexity                             |
| --- | ----------------------------------------------- | ---------------------- | -------------------------------------- |
| 1   | Get branch by ID                                | `branch.repository.ts` | Simple — single doc lookup             |
| 2   | List branches (ordered + filter by `createdBy`) | `branch.repository.ts` | Simple — order + 1 filter              |
| 3   | Update branch                                   | `branch.repository.ts` | Simple — update by ID                  |
| 4   | Delete branch                                   | `branch.repository.ts` | Simple — delete by ID                  |
| 5   | Fork branch (read + create)                     | `branch.repository.ts` | Simple — read then write               |
| 6   | Create version + increment counter              | `branch.repository.ts` | Simple — create + FieldValue.increment |
| 7   | List versions (ordered)                         | `branch.repository.ts` | Simple — order by date                 |
| 8   | Get version by ID                               | `branch.repository.ts` | Simple — single doc lookup             |
| 9   | Create snapshot                                 | `branch.repository.ts` | Simple — create subcollection doc      |
| 10  | Get latest snapshot                             | `branch.repository.ts` | Simple — order + limit 1               |
| 11  | List users (paginated)                          | `users.routes.ts`      | Simple — pagination + order            |
| 12  | Get user by ID                                  | `users.routes.ts`      | Simple — single lookup                 |
| 13  | Update user profile                             | `users.routes.ts`      | Simple — update by ID                  |
| 14  | Find user by email                              | `auth.repository.ts`   | Simple — unique lookup                 |
| 15  | Find user by Google ID                          | `auth.repository.ts`   | Simple — unique lookup                 |
| 16  | Store / Find / Revoke refresh tokens            | `auth.repository.ts`   | Simple — CRUD by hash/userId           |
| 17  | Upload token file (metadata)                    | `token.service.ts`     | Simple — create doc                    |
| 18  | List tokens by branch                           | `token.service.ts`     | Simple — order by date                 |
| 19  | CLI: list branches with search                  | `cli/list.ts`          | Medium — name filter + pagination      |

**Verdict: All queries are simple. No joins, no aggregations, no fuzzy search yet.**

---

## 3. PostgreSQL — Deep Analysis

### Pros

| Advantage                 | Detail                                                                                       | Impact                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fuzzy search built-in** | `WHERE name ILIKE '%hdfc%'`, `pg_trgm` for trigram matching, `tsvector` for full-text search | The CLI already has `--search hdfc`. This works natively in PostgreSQL. Firestore **cannot** do this.                                                             |
| **SQL aggregations**      | `GROUP BY`, `COUNT`, `SUM`, `AVG`, `DATE_TRUNC`                                              | Monitor Dashboard needs "publishes per month", "most active branches", "users per team". One query each. In Firestore, you need pre-aggregated counter documents. |
| **Relational integrity**  | Foreign keys, cascading deletes, constraints                                                 | Deleting a user cascades to their branches, versions, snapshots. In Firestore, you write a Cloud Function to clean up.                                            |
| **Prisma ORM**            | Auto-generated TypeScript types, migrations, query builder                                   | Every schema change = `prisma migrate dev`. Types are always in sync. No `as Branch` casts needed.                                                                |
| **Schema enforcement**    | Migrations ensure every environment is identical                                             | White-label clients need guarantees. One bad Firestore write = garbage in production. PostgreSQL rejects invalid data.                                            |
| **Cost at scale**         | Supabase free tier: 500K rows, 5GB, unlimited queries                                        | At 1000 users doing 50 ops/day, PostgreSQL is still free. Firestore would be ~$27/mo for 1.5M reads/writes.                                                       |
| **JSONB support**         | Store BrandConfig as JSONB, query into it with `->>`                                         | Best of both worlds: document storage inside a relational DB. Index JSON paths.                                                                                   |
| **Audit trail**           | Time-series inserts + range queries                                                          | Banking/fintech compliance: "show all changes between date X and Y by user Z". SQL handles this trivially.                                                        |
| **Row-Level Security**    | `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`                                                  | Multi-tenant isolation at the DB level. Each client sees only their data. Firestore needs manual filtering on every query.                                        |
| **Standard tooling**      | `pg_dump` for backup, `pg_stat_statements` for slow queries, `pgAdmin` for debugging         | Mature ecosystem. Firestore has limited tooling.                                                                                                                  |
| **No vendor lock-in**     | Run on Supabase, Railway, Render, RDS, or self-host                                          | Firestore = Google Cloud only. Migrating away means rewriting all data access code.                                                                               |

### Cons

| Disadvantage                   | Detail                                                                               | Mitigation                                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Needs hosting**              | Minimum $0 (Supabase free) to $20/mo (production)                                    | Supabase free tier covers early stage. Scale later.                                                                                                      |
| **No real-time subscriptions** | No built-in "watch this query and push updates"                                      | Use Supabase Realtime (built on PostgreSQL logical replication) or Server-Sent Events. For a token editor, polling every 2-3 seconds is also acceptable. |
| **Schema migrations**          | Every change needs `prisma migrate dev`                                              | This is actually a **pro** for production — it prevents schema drift. But it adds a step in development.                                                 |
| **Connection pooling**         | Serverless functions need pooled connections                                         | Use Prisma's connection pooler or Supabase's built-in pooler. Solved problem.                                                                            |
| **BrandConfig in SQL**         | Nested JSON (7 color groups, radius map, shadows map) is less natural than documents | JSONB makes this work. You get indexing + querying into JSON paths. Trade-off is slightly more complex queries vs Firestore's native document model.     |
| **Operational overhead**       | Need to monitor connections, slow queries, disk space                                | Supabase handles this. Self-hosting requires DBA knowledge.                                                                                              |
| **Local dev needs Docker**     | `docker compose up postgres` or use Supabase local                                   | Supabase CLI provides local dev. Or a simple Docker container. Firestore emulator also exists, so this is comparable.                                    |

---

## 4. Firestore — Deep Analysis

### Pros

| Advantage                   | Detail                                                                                 | Impact                                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Zero ops**                | No server, no migrations, no connection pooling, no Docker                             | Fastest time to market. Just write code.                                                                                 |
| **Real-time subscriptions** | `onSnapshot()` — frontend gets live updates when data changes                          | Token editor can show live preview as another team member edits. PostgreSQL needs Supabase Realtime or custom SSE.       |
| **Free tier is generous**   | 50K reads/day, 20K writes/day, 1GB storage                                             | At <100 users, this is $0/mo. PostgreSQL free tier is also $0 (Supabase), but Firestore doesn't even need a credit card. |
| **Document-native**         | BrandConfig is JSON with 7 color groups, nested maps. Firestore stores this naturally. | No JSONB casting. No schema migration when you add a new color group. Just change the TypeScript interface.              |
| **Firebase Auth included**  | Google login, session management, custom claims (roles)                                | No User table, no RefreshToken table, no session management code. Firebase handles all of it.                            |
| **Frontend SDK**            | blend-studio already uses Firebase SDK. Direct Firestore reads from the browser.       | For simple queries, you can skip the backend entirely. Read branches directly from the client.                           |
| **Subcollections**          | `branches/{id}/versions` gives natural hierarchy                                       | No join needed. Get all versions for a branch = one query on the subcollection.                                          |
| **Auto-scaling**            | No capacity planning. Handles traffic spikes automatically                             | PostgreSQL needs connection pooling and read replicas at scale.                                                          |
| **Offline support**         | Firestore SDK works offline, syncs when online                                         | Blend Studio could work offline and sync later. Not possible with raw PostgreSQL.                                        |
| **Global distribution**     | Data replicated to nearest region automatically                                        | If you have users in US and India, Firestore handles latency. PostgreSQL needs read replicas ($).                        |

### Cons

| Disadvantage                   | Detail                                                                                          | Impact                                                                                                       | Cost to Fix                                                        |
| ------------------------------ | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **No fuzzy search**            | Cannot do `WHERE name LIKE '%hdfc%'`                                                            | CLI `--search` and studio search won't work                                                                  | Add Algolia ($25/mo minimum) or Typesense ($)                      |
| **No aggregations**            | Cannot do `GROUP BY`, `COUNT`, `SUM`                                                            | Monitor Dashboard analytics need pre-computed counters                                                       | Maintain counter documents in transactions. Fragile.               |
| **No relational integrity**    | No foreign keys, no cascading deletes                                                           | Delete a user → orphaned branches. Delete a branch → orphaned versions (if not in subcollection).            | Write Cloud Functions for cleanup. Extra code + latency.           |
| **No schema enforcement**      | Any code can write any shape to any collection                                                  | One bad deploy writes `{colors: "not-an-object"}` to a branch. No DB-level protection.                       | Add validation middleware on every write. Extra code.              |
| **Vendor lock-in**             | Tied to Google Cloud. Migrating = rewrite all data access.                                      | If Google raises prices or you need on-premise deployment for a banking client, you're stuck.                | No mitigation. This is a structural risk for white-label.          |
| **Per-operation pricing**      | $0.18 per 100K reads, $0.18 per 100K writes, $0.02 per GB stored                                | At 1000 users × 50 ops/day = 1.5M ops/month ≈ $27/mo. At 10K users = $270/mo.                                | PostgreSQL: $0 for queries. Only pay for storage + compute.        |
| **Query limitations**          | Cannot filter on one field and sort by another (without composite index). Cannot do OR queries. | `list branches where status=draft OR status=published, order by updatedAt` — impossible without two queries. | Create composite indexes manually. Restrict API design.            |
| **No backup tooling**          | No `pg_dump` equivalent. Scheduled exports to GCS are manual.                                   | Production incident? Restoring a specific document = manual JSON surgery.                                    | Use Firestore managed exports. Slow and coarse-grained.            |
| **Cold starts**                | First read after inactivity has higher latency                                                  | If the studio is idle for an hour, first page load is slow.                                                  | Unsolvable. Pay for minimum instances (increases cost).            |
| **Max document size: 1MB**     | Large BrandConfigs with all 7 color groups + all shadows could approach this                    | Unlikely now, but if you add more token types (spacing, typography scales, animation tokens), you'll hit it. | Split into multiple documents. Extra complexity.                   |
| **Max 500 writes per batch**   | Bulk operations limited                                                                         | Importing 1000 branches from a CSV = 2 batches instead of 1.                                                 | Minor inconvenience, but affects migration tooling.                |
| **Composite index management** | Every new query pattern needs a manually created index                                          | Add a new filter? Deploy, get an error in production, create index, wait 5 minutes.                          | Dev friction. PostgreSQL auto-creates indexes for common patterns. |

---

## 5. Feature-by-Feature Comparison

| Feature                                | PostgreSQL                                       | Firestore                                                                                                      | Who Wins?                                         |
| -------------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **Get branch by ID**                   | `prisma.branch.findUnique()`                     | `doc.get()`                                                                                                    | Tie                                               |
| **List branches + pagination**         | `OFFSET/LIMIT`                                   | Cursor-based pagination                                                                                        | Firestore (cursors are better for real-time)      |
| **Fuzzy search branch names**          | `ILIKE '%hdfc%'` or `pg_trgm`                    | **Not possible**                                                                                               | PostgreSQL                                        |
| **List branches by user**              | `WHERE createdBy = X`                            | `.where('createdBy', '==', X)`                                                                                 | Tie                                               |
| **Create version + increment counter** | Transaction: create + `UPDATE count = count + 1` | `FieldValue.increment(1)`                                                                                      | Firestore (built-in atomic increment)             |
| **Aggregation: publishes per month**   | `DATE_TRUNC('month') + GROUP BY + COUNT`         | Need pre-computed counter docs                                                                                 | PostgreSQL                                        |
| **Real-time token editing**            | Supabase Realtime or SSE (extra setup)           | `onSnapshot()` (built-in)                                                                                      | Firestore                                         |
| **Delete user + clean up data**        | `ON DELETE CASCADE` (automatic)                  | Cloud Function (manual)                                                                                        | PostgreSQL                                        |
| **Store BrandConfig JSON**             | JSONB column (queryable, indexable)              | Document (native)                                                                                              | Firestore for simplicity, PostgreSQL for querying |
| **Multi-tenant isolation**             | Row-Level Security                               | Add `teamId` to every query                                                                                    | PostgreSQL (DB-level enforcement)                 |
| **Schema evolution**                   | `prisma migrate dev` (explicit)                  | Just change TypeScript types                                                                                   | Depends on preference                             |
| **Offline support**                    | Not possible                                     | Built-in                                                                                                       | Firestore                                         |
| **Cost at 100 users**                  | Free (Supabase)                                  | Free                                                                                                           | Tie                                               |
| **Cost at 1,000 users**                | Free-$20/mo                                      | ~$27/mo                                                                                                        | PostgreSQL                                        |
| **Cost at 10,000 users**               | $20-50/mo                                        | ~$270/mo                                                                                                       | PostgreSQL                                        |
| **Vendor lock-in**                     | None (standard SQL)                              | Google Cloud only                                                                                              | PostgreSQL                                        |
| **White-label client deployment**      | Run their own PostgreSQL                         | Share your Firebase project (security risk) or create new Firebase projects per client (operational nightmare) | PostgreSQL                                        |

---

## 6. The White-Label Deal-Breaker

If you're selling Token Studio as a white-label solution:

| Scenario                                        | PostgreSQL                                         | Firestore                                                          |
| ----------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| Client wants on-premise deployment              | Run PostgreSQL in their VPC                        | **Impossible** — Firestore is Google Cloud only                    |
| Client wants their own database                 | Give them a PostgreSQL connection string           | Create a new Firebase project per client (manually, 30 min each)   |
| Client has compliance requirements (SOC 2, PCI) | PostgreSQL + audit logs = standard compliance path | Firestore compliance requires Google Cloud-specific certifications |
| Client wants to migrate away from your platform | `pg_dump` → standard SQL export                    | Firestore export → proprietary format, no standard tooling         |

**Firestore makes white-label deployment significantly harder.**

---

## 7. What Each Database Duplicates from the Other

### What PostgreSQL currently duplicates from Firebase:

| PostgreSQL Table                            | Firebase Equivalent                            | Can Remove?                               |
| ------------------------------------------- | ---------------------------------------------- | ----------------------------------------- |
| `User` (email, displayName, photoUrl, role) | Firebase Auth `getUser()` + custom claims      | **Yes** — Firebase Auth has all of this   |
| `RefreshToken` (tokenHash, expiresAt)       | Firebase Auth session management               | **Yes** — Firebase handles refresh tokens |
| `TokenUpload` (filePath, parsedConfig)      | Firestore subcollection `branches/{id}/tokens` | **Yes** — already stored in Firestore too |

### What Firestore currently duplicates from PostgreSQL:

| Firestore Collection        | PostgreSQL Equivalent                                | Can Remove?             |
| --------------------------- | ---------------------------------------------------- | ----------------------- |
| `branches`                  | Would be a `branches` table with JSONB `brandConfig` | N/A — only in Firestore |
| `versions` (subcollection)  | Would be a `versions` table with FK to branches      | N/A                     |
| `snapshots` (subcollection) | Would be a `snapshots` table with FK to branches     | N/A                     |

---

## 8. Recommendation Matrix

### Choose PostgreSQL-only if:

- [x] You want to sell white-label to enterprises (on-premise, compliance)
- [x] You need fuzzy search on branch names (CLI `--search`)
- [x] You need analytics/dashboard (Monitor page aggregations)
- [x] You want one technology that handles any future query pattern
- [x] You want referential integrity (delete user → clean up everything)
- [x] You want to avoid vendor lock-in
- [x] Cost matters at scale (1000+ users)

### Choose Firestore-only if:

- [x] You want the fastest possible time to market
- [x] Real-time collaboration is a core feature (not "nice to have")
- [x] You will never sell on-premise deployment
- [x] Your data is highly document-shaped and schema changes frequently
- [x] You want zero operational overhead
- [x] You want offline support
- [x] You're staying under 1000 users for the next 12+ months

### Choose Both if:

- [ ] **There is no good reason to run both databases for this product.**
- [ ] The only reason both exist today is that the spec said "Firestore for token data, PostgreSQL for monitor data" before the backend was built. In practice, the data is the same domain, the same users, the same app.

---

## 9. My Recommendation

**PostgreSQL-only.** Here's why, ranked by importance:

1. **White-label requires on-premise** — Banking clients will not accept "your data is in Google Cloud." They want it in their VPC. PostgreSQL runs anywhere. Firestore runs only on Google.

2. **Search is a core feature** — CLI `--search`, studio search bar, branch filtering. Firestore literally cannot do `ILIKE '%hdfc%'`. You'd need Algolia at $25/mo extra, which defeats the "cost effective" argument.

3. **Analytics are needed for Monitor Dashboard** — "Publishes per month", "most active branches", "user activity trends". These are `GROUP BY` queries. Firestore needs denormalized counters that are fragile and hard to maintain.

4. **Cost at scale** — At 1000 users, PostgreSQL = $0-20/mo. Firestore = ~$27/mo. At 10K users, PostgreSQL = $50/mo. Firestore = $270/mo. The gap only grows.

5. **Referential integrity** — Delete a user, all their branches, versions, and snapshots get cleaned up automatically. In Firestore, you write and maintain a Cloud Function. One bug = orphaned data forever.

6. **Prisma > manual Firestore queries** — Type-safe queries, auto-generated types, migrations, visual schema in `schema.prisma`. Firestore gives you `as Branch` type casts and no schema documentation.

7. **Firebase Auth can stay** — You don't need to remove Firebase Auth. Keep it for Google login and session management. But replace Firestore with PostgreSQL for data storage. This gives you the best of both: Firebase Auth (zero-ops auth) + PostgreSQL (powerful queries).

### What you lose with PostgreSQL-only:

- Real-time subscriptions (solve with Supabase Realtime or SSE)
- Offline support (not needed for a web dashboard)
- Schema flexibility (actually a pro for production — you want enforcement)

### Migration path:

1. Move `branches`, `versions`, `snapshots` collections → PostgreSQL tables with JSONB `brandConfig`
2. Move `users` → keep using Firebase Auth for auth, but also create a `users` table for app-level metadata (role, preferences)
3. Move `tokenUploads` → PostgreSQL table (already partially there)
4. Remove `firebase.ts`, `database.ts` becomes PostgreSQL-only
5. Keep Firebase Auth for login/sessions

**This gives you one database, one bill, one backup strategy, and zero query limitations.**
