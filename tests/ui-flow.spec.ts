import { test, expect } from '@playwright/test';

test('User visits homepage and checks title', async ({ page }) => {
  await page.goto('https://example.com');

  await expect(page).toHaveTitle(/Example/);
});
