import { test, expect } from '@playwright/test'

/**
 * Post-login redirect handling (audit #14, CWE-601).
 *
 * The dev server runs in demo mode, so visiting /login yields an
 * authenticated (mock) user immediately — which exercises exactly the
 * authenticated-redirect branch of the login route.
 */
test.describe('Login return-path handling', () => {
    test('honors same-origin in-app return paths', async ({ page }) => {
        await page.goto('/login?from=/monitor')

        await expect(page).toHaveURL(/\/monitor$/)
    })

    test('rejects protocol-relative open redirects', async ({ page }) => {
        await page.goto('/login?from=//evil.com')

        await expect(page).toHaveURL(/\/studio/)
    })

    test('rejects double-encoded protocol-relative redirects', async ({
        page,
    }) => {
        await page.goto('/login?from=%252F%252Fevil.com')

        await expect(page).toHaveURL(/\/studio/)
    })

    test('rejects backslash-based redirects', async ({ page }) => {
        await page.goto('/login?from=/\\evil.com')

        await expect(page).toHaveURL(/\/studio/)
    })

    test('rejects absolute URLs', async ({ page }) => {
        await page.goto('/login?from=https://evil.com')

        await expect(page).toHaveURL(/\/studio/)
    })

    test('rejects control characters smuggled into the path', async ({
        page,
    }) => {
        await page.goto('/login?from=/monitor%09.evil.com')

        await expect(page).toHaveURL(/\/studio/)
    })

    test('falls back to /studio when the return path is the login page', async ({
        page,
    }) => {
        await page.goto('/login?from=/login')

        await expect(page).toHaveURL(/\/studio/)
    })

    test('falls back to /studio when no return path is given', async ({
        page,
    }) => {
        await page.goto('/login')

        await expect(page).toHaveURL(/\/studio/)
    })
})
