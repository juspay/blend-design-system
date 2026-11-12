-- Audit trail for system-admin operations on organizations they are not a
-- member of (security audit finding #13, CWE-566).
ALTER TYPE "AuditAction" ADD VALUE 'system_admin_cross_tenant_action';
