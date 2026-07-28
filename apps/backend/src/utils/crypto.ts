/**
 * Cryptographic utilities for hashing and masking sensitive user data.
 *
 * Email and other PII should be hashed before storage in logs and
 * audit trails. The original value is needed for lookups (stored in DB),
 * but logs and API responses should use masked/hashed versions.
 */

import crypto from 'crypto'

/**
 * Hash a string (e.g. email) using SHA-256.
 * Used for audit logs and anywhere PII should not be stored in plaintext.
 */
export function hashPII(value: string): string {
    return crypto
        .createHash('sha256')
        .update(value.toLowerCase().trim())
        .digest('hex')
}

/**
 * Mask an email address for display in API responses and logs.
 * Example: "vinit.khandal@juspay.in" → "v***l@j***y.in"
 */
export function maskEmail(email: string): string {
    const [local, domain] = email.split('@')
    if (!local || !domain) return '***@***'

    const maskedLocal =
        local.length <= 2
            ? `${local[0]}***`
            : `${local[0]}***${local[local.length - 1]}`

    const domainParts = domain.split('.')
    const domainName = domainParts[0]
    const tld = domainParts.slice(1).join('.')

    const maskedDomain =
        domainName.length <= 2
            ? `${domainName[0]}***`
            : `${domainName[0]}***${domainName[domainName.length - 1]}`

    return `${maskedLocal}@${maskedDomain}${tld ? '.' + tld : ''}`
}

/**
 * Mask a display name for partial anonymization.
 * Example: "Vinit Khandal" → "V*** K***"
 */
export function maskDisplayName(
    name: string | null | undefined
): string | null {
    if (!name) return null
    return name
        .split(' ')
        .map((part) => (part.length <= 1 ? part : `${part[0]}***`))
        .join(' ')
}
