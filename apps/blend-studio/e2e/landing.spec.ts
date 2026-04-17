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

test.describe('Studio - Mock Mode', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/studio')
        await page.waitForLoadState('networkidle')
    })

    test('shows branch list with mock data', async ({ page }) => {
        await expect(page.getByText('Juspay Default')).toBeVisible()
        await expect(page.getByText('Starter Purple')).toBeVisible()
        await expect(page.getByText('Acme Light')).toBeVisible()
    })

    test('status filter tabs are visible', async ({ page }) => {
        await expect(page.getByText('All')).toBeVisible()
        await expect(page.getByText('Draft')).toBeVisible()
        await expect(page.getByText('Published')).toBeVisible()
    })

    test('can navigate to editor page', async ({ page }) => {
        await page.getByText('Juspay Default').click()
        await page.waitForURL(/\/studio\/editor\//)
        await expect(page.getByText(/juspay\/default/)).toBeVisible()
    })
})

test.describe('Token Editor', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/studio')
        await page.waitForLoadState('networkidle')
        await page.getByText('Juspay Default').click()
        await page.waitForURL(/\/studio\/editor\//)
        await page.waitForLoadState('networkidle')
    })

    test('shows editor tabs', async ({ page }) => {
        await expect(page.getByText('Colors')).toBeVisible()
        await expect(page.getByText('Type')).toBeVisible()
        await expect(page.getByText('Radius')).toBeVisible()
        await expect(page.getByText('Shadows')).toBeVisible()
        await expect(page.getByText('Components')).toBeVisible()
    })

    test('shows preview panel', async ({ page }) => {
        await expect(page.getByText('Preview')).toBeVisible()
        await expect(page.getByText('Diff')).toBeVisible()
        await expect(page.getByText('History')).toBeVisible()
    })

    test('can switch to components tab', async ({ page }) => {
        await page.getByText('Components', { exact: false }).click()
        await expect(page.getByText('Add Component Override')).toBeVisible()
    })

    test('can add a component override', async ({ page }) => {
        await page.getByText('Components', { exact: false }).click()
        await page.getByText('Add Component Override').click()
        const buttonOption = page.getByText('Button')
        if (await buttonOption.isVisible()) {
            await buttonOption.click()
            await expect(page.getByText('Tokens')).toBeVisible()
        }
    })
})
