/*
  Refresh-token family revocation (security rescan hardening, CWE-522).

  Revocation becomes a tombstone (`revoked_at`) instead of a delete so that
  replaying a spent refresh token can be detected. Tokens carry a `family_id`
  that links a rotation chain back to the login that created it; replaying
  any revoked member of the family revokes every live token in that family,
  containing the damage of a stolen-then-rotated token.

  Backfill: each pre-existing token is its own family, so existing live
  sessions keep working and only lose protection they never had.
*/

-- AlterTable
ALTER TABLE "refresh_tokens" ADD COLUMN "family_id" UUID;
ALTER TABLE "refresh_tokens" ADD COLUMN "revoked_at" TIMESTAMP(3);

-- BackfillTableWithData
UPDATE "refresh_tokens" SET "family_id" = "id";

-- AlterTable
ALTER TABLE "refresh_tokens" ALTER COLUMN "family_id" SET NOT NULL;

-- CreateIndex
CREATE INDEX "refresh_tokens_family_id_idx" ON "refresh_tokens"("family_id");
