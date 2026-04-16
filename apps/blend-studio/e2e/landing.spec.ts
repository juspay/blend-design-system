import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
    test('shows the landing page with key sections', async ({ page }) => {
        await page.goto('/')

        await expect(page.locator('h1')).toContainText('Customize Blend')
        await expect(page.getByText('What is Token Studio')).toBeVisible()
        await expect(page.getByText('How It Works')).toBeVisible()
        await expect(page.getByText('CLI Commands')).toBeVisible()
    })

    test('navigates to studio from CTA button', async ({ page }) => {
        await page.goto('/')
        const cta = page.getByRole('link', { name: /Open Token Studio/i })
        await expect(cta).toBeVisible()
    })
})
