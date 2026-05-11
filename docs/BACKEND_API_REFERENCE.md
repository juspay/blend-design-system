# Blend Token Studio — Backend API Reference

> Auto-generated from source code. Last updated: 2026-04-15

---

## Table of Contents

1. [Data Models](#data-models)
2. [Enums](#enums)
3. [API Endpoints](#api-endpoints)
    - [Auth](#1-auth-routes--apiauth)
    - [Branches](#2-branch-routes--apibranches)
    - [Tokens](#3-token-routes--apibranchesbranchidtokens)
    - [Users](#4-user-routes--apiusers)
    - [Organizations](#5-organization-routes--apiorganizations)
    - [Tags](#6-tag-routes--apitags)
    - [API Keys](#7-api-key-routes--apiapi-keys)
4. [Authentication](#authentication)
5. [Seed Data](#seed-data)

---

## Data Models

### Organization

| Column       | Type         | Constraints        | Description                               |
| ------------ | ------------ | ------------------ | ----------------------------------------- |
| `id`         | UUID         | PK, auto-generated | Unique identifier                         |
| `name`       | VARCHAR(255) | NOT NULL           | Organization display name                 |
| `slug`       | VARCHAR(100) | UNIQUE, NOT NULL   | URL-safe identifier (e.g. "blend-studio") |
| `created_at` | TIMESTAMP    | DEFAULT now()      | Creation timestamp                        |
| `updated_at` | TIMESTAMP    | AUTO updated       | Last update timestamp                     |

**Relations:** `members`, `branches`, `apiKeys`, `auditLogs`

---

### Member (Organization ↔ User join)

| Column            | Type      | Constraints                  | Description          |
| ----------------- | --------- | ---------------------------- | -------------------- |
| `id`              | UUID      | PK, auto-generated           | Unique identifier    |
| `organization_id` | UUID      | FK → organizations, NOT NULL | Belongs to org       |
| `user_id`         | UUID      | FK → users, NOT NULL         | Belongs to user      |
| `role`            | UserRole  | DEFAULT 'viewer'             | Role within this org |
| `joined_at`       | TIMESTAMP | DEFAULT now()                | When user joined org |

**Constraints:** `UNIQUE(organization_id, user_id)` — user can only be in an org once

---

### User

| Column         | Type         | Constraints        | Description                       |
| -------------- | ------------ | ------------------ | --------------------------------- |
| `id`           | UUID         | PK, auto-generated | Unique identifier                 |
| `google_id`    | VARCHAR(255) | UNIQUE, NULLABLE   | Google OAuth sub                  |
| `email`        | VARCHAR(255) | UNIQUE, NOT NULL   | User email                        |
| `display_name` | VARCHAR(255) | NULLABLE           | Full name                         |
| `photo_url`    | TEXT         | NULLABLE           | Avatar URL                        |
| `role`         | UserRole     | DEFAULT 'viewer'   | Global role (admin/editor/viewer) |
| `is_active`    | BOOLEAN      | DEFAULT true       | Account active flag               |
| `created_at`   | TIMESTAMP    | DEFAULT now()      | Creation timestamp                |
| `updated_at`   | TIMESTAMP    | AUTO updated       | Last update timestamp             |
| `last_login`   | TIMESTAMP    | NULLABLE           | Last login time                   |
| `deleted_at`   | TIMESTAMP    | NULLABLE           | Soft delete timestamp             |

**Relations:** `refreshTokens`, `tokenUploads`, `memberships`, `apiKeys`, `createdBranches`, `auditLogs`

**Indexes:** `email`, `deletedAt`

---

### RefreshToken

| Column       | Type         | Constraints          | Description                   |
| ------------ | ------------ | -------------------- | ----------------------------- |
| `id`         | UUID         | PK, auto-generated   | Unique identifier             |
| `user_id`    | UUID         | FK → users, NOT NULL | Token owner                   |
| `token_hash` | VARCHAR(255) | UNIQUE, NOT NULL     | SHA-256 hash of refresh token |
| `expires_at` | TIMESTAMP    | NOT NULL             | Token expiry                  |
| `created_at` | TIMESTAMP    | DEFAULT now()        | Creation timestamp            |

**Indexes:** `user_id`, `token_hash`, `expires_at`

---

### ApiKey

| Column            | Type         | Constraints                  | Description                                |
| ----------------- | ------------ | ---------------------------- | ------------------------------------------ |
| `id`              | UUID         | PK, auto-generated           | Unique identifier                          |
| `organization_id` | UUID         | FK → organizations, NOT NULL | Owning org                                 |
| `user_id`         | UUID         | FK → users, NOT NULL         | Creator                                    |
| `name`            | VARCHAR(255) | NOT NULL                     | Human-readable key name                    |
| `key_hash`        | VARCHAR(255) | UNIQUE, NOT NULL             | SHA-256 hash of raw key                    |
| `key_prefix`      | VARCHAR(8)   | NOT NULL                     | First 8 chars of raw key (e.g. "bts_1234") |
| `last_used_at`    | TIMESTAMP    | NULLABLE                     | Last time key was used                     |
| `expires_at`      | TIMESTAMP    | NULLABLE                     | Key expiry (null = never)                  |
| `created_at`      | TIMESTAMP    | DEFAULT now()                | Creation timestamp                         |
| `revoked_at`      | TIMESTAMP    | NULLABLE                     | Revocation timestamp (null = active)       |

**Indexes:** `key_hash`, `organization_id`, `user_id`, `revokedAt`

**Raw key format:** `bts_` + 64 hex chars (e.g. `bts_a1b2c3d4...`)

---

### Branch

| Column               | Type             | Constraints                  | Description                           |
| -------------------- | ---------------- | ---------------------------- | ------------------------------------- |
| `id`                 | UUID             | PK, auto-generated           | Unique identifier                     |
| `organization_id`    | UUID             | FK → organizations, NOT NULL | Owning org                            |
| `brand_id`           | VARCHAR(255)     | NOT NULL                     | Brand identifier (e.g. "hdfc/retail") |
| `name`               | VARCHAR(255)     | NOT NULL                     | Display name                          |
| `description`        | TEXT             | NULLABLE                     | Branch description                    |
| `parent_branch_id`   | UUID             | NULLABLE                     | Fork parent                           |
| `status`             | BranchStatus     | DEFAULT 'draft'              | Lifecycle status                      |
| `visibility`         | BranchVisibility | DEFAULT 'private'            | Access control                        |
| `brand_config`       | JSONB            | NOT NULL                     | Full BrandConfig object               |
| `published_versions` | INTEGER          | DEFAULT 0                    | Count of published versions           |
| `latest_version`     | VARCHAR(50)      | NULLABLE                     | Latest semver string                  |
| `created_by`         | UUID             | FK → users, NOT NULL         | Creator user ID                       |
| `created_by_name`    | VARCHAR(255)     | NOT NULL                     | Creator display name (denormalized)   |
| `created_at`         | TIMESTAMP        | DEFAULT now()                | Creation timestamp                    |
| `updated_at`         | TIMESTAMP        | AUTO updated                 | Last update timestamp                 |
| `deleted_at`         | TIMESTAMP        | NULLABLE                     | Soft delete timestamp                 |

**Constraints:** `UNIQUE(organization_id, brand_id)` — brand IDs are unique per org

**Relations:** `organization`, `creator`, `versions`, `snapshots`, `tokenUploads`, `tags`

**Indexes:** `organization_id`, `createdBy`, `status`, `visibility`, `updatedAt`, `deletedAt`, `brandId`

**BrandConfig JSONB shape:**

```json
{
  "brandId": "hdfc/retail",
  "name": "HDFC Bank",
  "version": "1.0.0",
  "colors": {
    "primary": { "50": "#EFF6FF", ..., "950": "#172554" },
    "gray": {}, "red": {}, "green": {}, "yellow": {}, "orange": {}, "purple": {}
  },
  "radius": { "8": "8px" },
  "shadows": { "md": "0 4px 6px ..." },
  "font": { "family": "Inter", "weight": { "regular": 400, "bold": 700 } }
}
```

---

### BranchVersion

| Column              | Type         | Constraints             | Description                             |
| ------------------- | ------------ | ----------------------- | --------------------------------------- |
| `id`                | UUID         | PK, auto-generated      | Unique identifier                       |
| `branch_id`         | UUID         | FK → branches, NOT NULL | Parent branch                           |
| `version`           | VARCHAR(50)  | NOT NULL                | Semver string (e.g. "1.0.0")            |
| `brand_config`      | JSONB        | NOT NULL                | Snapshot of BrandConfig at publish time |
| `changelog`         | TEXT         | NULLABLE                | Release notes                           |
| `is_breaking`       | BOOLEAN      | DEFAULT false           | Breaking change flag                    |
| `is_prerelease`     | BOOLEAN      | DEFAULT false           | Prerelease flag                         |
| `published_by`      | UUID         | FK → users, NOT NULL    | Publisher user ID                       |
| `published_by_name` | VARCHAR(255) | NOT NULL                | Publisher display name                  |
| `published_at`      | TIMESTAMP    | DEFAULT now()           | Publish timestamp                       |

**Constraints:** `UNIQUE(branch_id, version)` — versions are unique per branch

**Indexes:** `branch_id`, `published_at`, `(branch_id, published_at)`

---

### BranchSnapshot

| Column          | Type         | Constraints             | Description             |
| --------------- | ------------ | ----------------------- | ----------------------- |
| `id`            | UUID         | PK, auto-generated      | Unique identifier       |
| `branch_id`     | UUID         | FK → branches, NOT NULL | Parent branch           |
| `brand_config`  | JSONB        | NOT NULL                | Snapshot of BrandConfig |
| `label`         | VARCHAR(255) | NULLABLE                | Manual save label       |
| `is_auto_save`  | BOOLEAN      | DEFAULT false           | Auto-save vs manual     |
| `saved_by`      | UUID         | FK → users, NOT NULL    | Saver user ID           |
| `saved_by_name` | VARCHAR(255) | NOT NULL                | Saver display name      |
| `saved_at`      | TIMESTAMP    | DEFAULT now()           | Save timestamp          |

**Indexes:** `branch_id`, `saved_at`, `(branch_id, saved_at)`

---

### Tag

| Column       | Type         | Constraints        | Description                            |
| ------------ | ------------ | ------------------ | -------------------------------------- |
| `id`         | UUID         | PK, auto-generated | Unique identifier                      |
| `name`       | VARCHAR(100) | UNIQUE, NOT NULL   | Tag name (e.g. "banking", "dark-mode") |
| `created_at` | TIMESTAMP    | DEFAULT now()      | Creation timestamp                     |

---

### BranchTag (Join table)

| Column      | Type | Constraints             | Description      |
| ----------- | ---- | ----------------------- | ---------------- |
| `branch_id` | UUID | FK → branches, NOT NULL | Branch reference |
| `tag_id`    | UUID | FK → tags, NOT NULL     | Tag reference    |

**Constraints:** `PK(branch_id, tag_id)` — composite primary key

**Index:** `tag_id`

---

### TokenUpload

| Column             | Type         | Constraints             | Description           |
| ------------------ | ------------ | ----------------------- | --------------------- |
| `id`               | UUID         | PK, auto-generated      | Unique identifier     |
| `branch_id`        | UUID         | FK → branches, NOT NULL | Parent branch         |
| `file_name`        | VARCHAR(255) | NOT NULL                | Original filename     |
| `file_size`        | INTEGER      | NOT NULL                | File size in bytes    |
| `description`      | TEXT         | NULLABLE                | Upload description    |
| `parsed_config`    | JSONB        | NULLABLE                | Parsed JSON content   |
| `status`           | UploadStatus | DEFAULT 'pending'       | Processing state      |
| `uploaded_by`      | UUID         | FK → users, NOT NULL    | Uploader user ID      |
| `uploaded_by_name` | VARCHAR(255) | NOT NULL                | Uploader display name |
| `created_at`       | TIMESTAMP    | DEFAULT now()           | Upload timestamp      |
| `updated_at`       | TIMESTAMP    | AUTO updated            | Last update timestamp |

**Indexes:** `branch_id`, `uploaded_by`, `status`, `created_at`

---

### AuditLog

| Column            | Type         | Constraints                  | Description                            |
| ----------------- | ------------ | ---------------------------- | -------------------------------------- |
| `id`              | UUID         | PK, auto-generated           | Unique identifier                      |
| `organization_id` | UUID         | FK → organizations, NOT NULL | Owning org                             |
| `action`          | AuditAction  | NOT NULL                     | Action type enum                       |
| `actor_id`        | UUID         | FK → users, NOT NULL         | User who performed action              |
| `actor_email`     | VARCHAR(255) | NOT NULL                     | Actor email (denormalized)             |
| `target_type`     | VARCHAR(50)  | NOT NULL                     | Type of target (e.g. "branch", "user") |
| `target_id`       | UUID         | NOT NULL                     | ID of affected entity                  |
| `metadata`        | JSONB        | NULLABLE                     | Action-specific data                   |
| `created_at`      | TIMESTAMP    | DEFAULT now()                | Action timestamp                       |

**Indexes:** `organization_id`, `action`, `actor_id`, `(target_type, target_id)`, `created_at`, `(organization_id, created_at)`

**Metadata examples:**

- `branch_published`: `{ version: "1.0.0", isBreaking: false }`
- `user_role_changed`: `{ from: "viewer", to: "editor" }`
- `branch_updated`: `{ fieldsChanged: ["colors.primary.500"] }`

---

## Enums

| Enum               | Values                                                                                                                                                                                                                                           | Used By      |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| `UserRole`         | `admin`, `editor`, `viewer`                                                                                                                                                                                                                      | User, Member |
| `BranchStatus`     | `draft`, `published`, `archived`                                                                                                                                                                                                                 | Branch       |
| `BranchVisibility` | `private`, `team`, `public`                                                                                                                                                                                                                      | Branch       |
| `UploadStatus`     | `pending`, `processing`, `valid`, `invalid`                                                                                                                                                                                                      | TokenUpload  |
| `AuditAction`      | `branch_created`, `branch_updated`, `branch_deleted`, `branch_published`, `branch_archived`, `branch_forked`, `version_created`, `snapshot_created`, `token_uploaded`, `user_created`, `user_role_changed`, `api_key_created`, `api_key_revoked` | AuditLog     |

---

## API Endpoints

### Authentication

All authenticated endpoints require `Authorization: Bearer <token>` header.

Two auth methods supported:

1. **JWT** — Google OAuth flow generates access + refresh tokens
2. **API Key** — Tokens starting with `bts_` are validated as API keys

---

### 1. Auth Routes (`/api/auth`)

| #   | Method | Path                                 | Auth   | Description                                                 |
| --- | ------ | ------------------------------------ | ------ | ----------------------------------------------------------- |
| 1   | GET    | `/api/auth/google`                   | Public | Get Google OAuth authorization URL                          |
| 2   | GET    | `/api/auth/google/callback?code=...` | Public | Handle OAuth callback, create/login user, redirect with JWT |
| 3   | POST   | `/api/auth/refresh`                  | Cookie | Refresh access token using httpOnly cookie                  |
| 4   | POST   | `/api/auth/logout`                   | Auth   | Revoke current refresh token                                |
| 5   | POST   | `/api/auth/logout-all`               | Auth   | Revoke all refresh tokens (all devices)                     |
| 6   | GET    | `/api/auth/me`                       | Auth   | Get current user profile                                    |

**GET /api/auth/google**

- Response: `{ success: true, data: { url: "https://accounts.google.com/..." } }`

**GET /api/auth/google/callback**

- Query: `code` (required)
- Response: 302 redirect to `${FRONTEND_URL}/auth-callback?token=<accessToken>&newUser=<bool>`

**POST /api/auth/refresh**

- Input: httpOnly cookie `refreshToken`
- Response: `{ success: true, data: { accessToken, expiresIn } }`

**GET /api/auth/me**

- Response: `{ success: true, data: { user: { id, email, displayName, photoUrl, role, isActive } } }`

---

### 2. Branch Routes (`/api/branches`)

| #   | Method | Path                                  | Auth | Description                                           |
| --- | ------ | ------------------------------------- | ---- | ----------------------------------------------------- |
| 1   | GET    | `/api/branches`                       | Auth | List branches (paginated, filterable)                 |
| 2   | POST   | `/api/branches`                       | Auth | Create a new branch                                   |
| 3   | GET    | `/api/branches/:branchId`             | Auth | Get branch by ID                                      |
| 4   | PATCH  | `/api/branches/:branchId`             | Auth | Update branch (name, config, description, visibility) |
| 5   | DELETE | `/api/branches/:branchId`             | Auth | Soft delete branch                                    |
| 6   | POST   | `/api/branches/:branchId/fork`        | Auth | Fork a branch                                         |
| 7   | POST   | `/api/branches/:branchId/publish`     | Auth | Publish a new version                                 |
| 8   | GET    | `/api/branches/:branchId/versions`    | Auth | List published versions                               |
| 9   | POST   | `/api/branches/:branchId/resolve`     | Auth | Resolve brand config to component tokens              |
| 10  | GET    | `/api/branches/:branchId/snapshots`   | Auth | List snapshots                                        |
| 11  | POST   | `/api/branches/:branchId/snapshots`   | Auth | Create a snapshot                                     |
| 12  | POST   | `/api/branches/:branchId/tags/:tagId` | Auth | Add tag to branch                                     |
| 13  | DELETE | `/api/branches/:branchId/tags/:tagId` | Auth | Remove tag from branch                                |

**GET /api/branches**

- Query: `limit` (default 20), `cursor`, `createdBy`, `organizationId`, `status`, `visibility`, `search`, `tag`
- Response: `{ success: true, data: { branches: [...], nextCursor: string|null } }`

**POST /api/branches**

- Body: `{ name: string, organizationId: string, description?: string, visibility?: "private"|"team"|"public", brandConfig?: Partial<BrandConfig>, parentBranchId?: string }`
- Response: `{ success: true, data: { branch } }` (201)

**PATCH /api/branches/:branchId**

- Body: `{ name?: string, description?: string, visibility?: string, brandConfig?: Partial<BrandConfig> }`
- Response: `{ success: true, data: { branch } }`

**DELETE /api/branches/:branchId**

- Response: `{ success: true, message: "Branch deleted successfully" }`
- Note: Performs soft delete (sets `deleted_at`)

**POST /api/branches/:branchId/fork**

- Body: `{ name: string, organizationId: string }`
- Response: `{ success: true, data: { branch } }` (201)

**POST /api/branches/:branchId/publish**

- Body: `{ version: string, changelog?: string, isBreaking?: boolean, isPrerelease?: boolean }`
- Version must match `x.y.z` semver format
- Response: `{ success: true, message: "Branch published successfully" }`

**POST /api/branches/:branchId/resolve**

- Body: `{ theme?: "light"|"dark" }` (default: "light")
- Response: `{ success: true, data: { branchId, theme, componentTokens } }`

**POST /api/branches/:branchId/snapshots**

- Body: `{ brandConfig?: BrandConfig, label?: string, isAutoSave?: boolean }`
- Response: `{ success: true, data: { snapshot } }` (201)

**POST /api/branches/:branchId/tags/:tagId**

- Response: `{ success: true, message: "Tag added to branch" }`

**DELETE /api/branches/:branchId/tags/:tagId**

- Response: `{ success: true, message: "Tag removed from branch" }`

---

### 3. Token Routes (`/api/branches/:branchId/tokens`)

| #   | Method | Path                                               | Auth | Description                       |
| --- | ------ | -------------------------------------------------- | ---- | --------------------------------- |
| 1   | POST   | `/api/branches/:branchId/tokens/upload`            | Auth | Upload a token JSON file          |
| 2   | GET    | `/api/branches/:branchId/tokens`                   | Auth | List all token uploads for branch |
| 3   | GET    | `/api/branches/:branchId/tokens/:tokenId`          | Auth | Get token by ID                   |
| 4   | GET    | `/api/branches/:branchId/tokens/:tokenId/download` | Auth | Download token as JSON            |
| 5   | DELETE | `/api/branches/:branchId/tokens/:tokenId`          | Auth | Delete token upload               |

**POST /api/branches/:branchId/tokens/upload**

- Content-Type: `multipart/form-data`
- Body: `file` (required, .json), `description` (optional)
- Response: `{ success: true, data: { success: true, id, message, brandConfig } }` (201)

**GET /api/branches/:branchId/tokens/:tokenId/download**

- Response: Raw JSON with `Content-Type: application/json`

---

### 4. User Routes (`/api/users`)

| #   | Method | Path             | Auth         | Description                            |
| --- | ------ | ---------------- | ------------ | -------------------------------------- |
| 1   | GET    | `/api/users`     | Auth + Admin | List users (paginated, org-filterable) |
| 2   | GET    | `/api/users/:id` | Auth         | Get user by ID (own profile or admin)  |
| 3   | PATCH  | `/api/users/:id` | Auth         | Update profile (own) or role (admin)   |
| 4   | DELETE | `/api/users/:id` | Auth + Admin | Soft delete user                       |

**GET /api/users**

- Query: `page` (default 1), `limit` (default 20, max 100), `organizationId`
- Response: `{ success: true, data: { users: [...], pagination: { page, limit, total, pages } } }`

**PATCH /api/users/:id**

- Body: `{ displayName?: string, photoUrl?: string, role?: string }`
- Role changes require admin
- Response: `{ success: true, data: { user } }`

**DELETE /api/users/:id**

- Response: `{ success: true, message: "User deactivated" }`
- Note: Performs soft delete (sets `deleted_at` + `is_active=false`)

---

### 5. Organization Routes (`/api/organizations`)

| #   | Method | Path                                          | Auth         | Description             |
| --- | ------ | --------------------------------------------- | ------------ | ----------------------- |
| 1   | GET    | `/api/organizations`                          | Auth + Admin | List organizations      |
| 2   | GET    | `/api/organizations/:id`                      | Auth         | Get organization by ID  |
| 3   | POST   | `/api/organizations`                          | Auth + Admin | Create organization     |
| 4   | PATCH  | `/api/organizations/:id`                      | Auth + Admin | Update organization     |
| 5   | GET    | `/api/organizations/:id/members`              | Auth         | List org members        |
| 6   | POST   | `/api/organizations/:id/members`              | Auth + Admin | Add member to org       |
| 7   | DELETE | `/api/organizations/:id/members/:userId`      | Auth + Admin | Remove member from org  |
| 8   | PATCH  | `/api/organizations/:id/members/:userId/role` | Auth + Admin | Update member role      |
| 9   | GET    | `/api/organizations/:id/audit-logs`           | Auth         | List audit logs for org |

**POST /api/organizations**

- Body: `{ name: string, slug: string }`
- Response: `{ success: true, data: { organization } }` (201)

**POST /api/organizations/:id/members**

- Body: `{ userId: string, role?: string }`
- Response: `{ success: true, data: { member } }` (201)

**PATCH /api/organizations/:id/members/:userId/role**

- Body: `{ role: string }`
- Response: `{ success: true, data: { member } }`

**GET /api/organizations/:id/audit-logs**

- Query: `action`, `targetType`, `targetId`, `actorId`, `limit` (default 50), `cursor`
- Response: `{ success: true, data: { logs: [...], nextCursor } }`

---

### 6. Tag Routes (`/api/tags`)

| #   | Method | Path            | Auth         | Description                   |
| --- | ------ | --------------- | ------------ | ----------------------------- |
| 1   | GET    | `/api/tags`     | Auth         | List all tags (searchable)    |
| 2   | POST   | `/api/tags`     | Auth         | Create a tag (upsert by name) |
| 3   | DELETE | `/api/tags/:id` | Auth + Admin | Delete a tag                  |

**GET /api/tags**

- Query: `search` (case-insensitive contains), `limit` (default 100)
- Response: `{ success: true, data: { tags: [...] } }`

**POST /api/tags**

- Body: `{ name: string }`
- Response: `{ success: true, data: { tag } }` (201)
- Note: Upsert — if tag name already exists, returns existing tag

---

### 7. API Key Routes (`/api/api-keys`)

| #   | Method | Path                | Auth | Description          |
| --- | ------ | ------------------- | ---- | -------------------- |
| 1   | POST   | `/api/api-keys`     | Auth | Create API key       |
| 2   | GET    | `/api/api-keys`     | Auth | List user's API keys |
| 3   | DELETE | `/api/api-keys/:id` | Auth | Revoke API key       |

**POST /api/api-keys**

- Body: `{ organizationId: string, name: string, expiresAt?: string (ISO date) }`
- Response: `{ success: true, data: { apiKey: { id, name, keyPrefix, expiresAt, createdAt }, rawKey } }` (201)
- **IMPORTANT:** `rawKey` is only returned on creation. It cannot be retrieved again.

**GET /api/api-keys**

- Query: `organizationId` (optional filter)
- Response: `{ success: true, data: { apiKeys: [...] } }`
- Note: `keyHash` is never returned in the list

**DELETE /api/api-keys/:id**

- Response: `{ success: true, message: "API key revoked" }` or 404
- Note: Sets `revoked_at` timestamp (soft revoke)

---

## Authentication

### JWT Flow

1. User visits `GET /api/auth/google` → gets Google OAuth URL
2. User authenticates → Google redirects to `GET /api/auth/google/callback?code=...`
3. Backend exchanges code, creates/updates user, generates JWT
4. Redirects to `${FRONTEND_URL}/auth-callback?token=<accessToken>&newUser=<bool>`
5. Frontend stores access token; refresh token set as httpOnly cookie

### API Key Flow (CLI)

1. User creates key via `POST /api/api-keys` → gets `rawKey`
2. CLI sends `Authorization: Bearer bts_xxxxx...` on any authenticated endpoint
3. Middleware detects `bts_` prefix → validates against `api_keys` table
4. Sets `req.user` with `authMethod: 'api_key'` and `organizationId`

### Middleware

- `authenticate` — Requires valid JWT or API key. Populates `req.user`
- `requireRole(...roles)` — Requires user to have one of the specified roles
- `optionalAuth` — Populates `req.user` if token present, but doesn't fail if absent

### req.user shape (after auth)

```typescript
{
  id: string
  email: string
  role: string              // "admin" | "editor" | "viewer"
  displayName: string
  organizationId?: string   // populated for API key auth
  authMethod: "jwt" | "api_key"
}
```

---

## Seed Data

Running `npm run db:seed` creates:

| Entity       | Count | Details                                                                                                   |
| ------------ | ----- | --------------------------------------------------------------------------------------------------------- |
| Organization | 1     | "Blend Design Studio" (slug: `blend-studio`)                                                              |
| Users        | 3     | admin@blend.dev (admin), designer@blend.dev (editor), viewer@blend.dev (viewer)                           |
| Memberships  | 3     | All 3 users in the org with their respective roles                                                        |
| Tags         | 5     | banking, dark-mode, fintech, v2, default                                                                  |
| Branches     | 4     | HDFC Bank Retail (published), NeoBank Light (published), FinTech Green (draft), Blend Default (published) |
| Branch Tags  | 4     | HDFC→banking, NeoBank→dark-mode, FinTech→fintech, Default→default                                         |
| Versions     | 3     | HDFC v1.0.0, HDFC v1.2.0, NeoBank v1.0.0                                                                  |
| Snapshots    | 2     | FinTech manual save, FinTech auto-save                                                                    |
| Audit Logs   | 3     | branch_created (HDFC), branch_created (NeoBank), branch_published (HDFC)                                  |

---

## Endpoint Count Summary

| Domain        | Endpoints | Auth Required | Admin Only |
| ------------- | --------- | ------------- | ---------- |
| Auth          | 6         | 3             | 0          |
| Branches      | 13        | 13            | 0          |
| Tokens        | 5         | 5             | 0          |
| Users         | 4         | 4             | 2          |
| Organizations | 9         | 9             | 7          |
| Tags          | 3         | 3             | 1          |
| API Keys      | 3         | 3             | 0          |
| **Total**     | **43**    | **40**        | **10**     |

---

## Soft Delete Behavior

| Model          | Delete Type | Implementation                                                  |
| -------------- | ----------- | --------------------------------------------------------------- |
| User           | Soft delete | Sets `deleted_at` + `is_active=false`                           |
| Branch         | Soft delete | Sets `deleted_at`, filtered from queries with `deletedAt: null` |
| API Key        | Soft revoke | Sets `revoked_at`, filtered from validation                     |
| Organization   | Hard delete | Not recommended — cascades to all resources                     |
| BranchVersion  | No delete   | Immutable — cannot be deleted                                   |
| BranchSnapshot | No delete   | Only deletable via branch cascade                               |
| AuditLog       | No delete   | Immutable — never deleted                                       |

---

## Audit Logging

The following actions automatically create audit log entries:

| Action             | Trigger                          | Metadata                   |
| ------------------ | -------------------------------- | -------------------------- |
| `branch_created`   | `POST /api/branches`             | `{ name, brandId }`        |
| `branch_updated`   | `PATCH /api/branches/:id`        | `{ fieldsChanged: [...] }` |
| `branch_deleted`   | `DELETE /api/branches/:id`       | `{}`                       |
| `branch_published` | `POST /api/branches/:id/publish` | `{ version, isBreaking }`  |
| `branch_forked`    | `POST /api/branches/:id/fork`    | `{ sourceBranchId }`       |
| `api_key_created`  | `POST /api/api-keys`             | `{ name, prefix }`         |
| `api_key_revoked`  | `DELETE /api/api-keys/:id`       | `{}`                       |

Audit logs are queryable via `GET /api/organizations/:id/audit-logs` with filters for `action`, `targetType`, `targetId`, `actorId`.

---

## Health Check

| Endpoint          | Auth   | Response                                        |
| ----------------- | ------ | ----------------------------------------------- |
| `GET /health`     | Public | `{ status: "ok", timestamp, version: "0.1.0" }` |
| `GET /api/health` | Public | `{ status: "ok", timestamp, version: "0.1.0" }` |
